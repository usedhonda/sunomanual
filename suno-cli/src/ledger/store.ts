import fs from "node:fs/promises";
import path from "node:path";
import { toSongUrl } from "../http/feed.js";

export interface RunRecord {
  runId: string;
  transactionUuid?: string;
  batchId?: string;
  clipIds: string[];
  songUrls: string[];
  status: string;
  createdAt: string;
  updatedAt: string;
  downloadedFiles?: string[];
  requestHash?: string;
  creditsReserved?: number;
}

export interface LedgerFile {
  version: 1;
  runs: RunRecord[];
}

const LOCK_RETRY_MS = 50;
const LOCK_TIMEOUT_MS = 5000;

export class LedgerStore {
  constructor(public readonly ledgerPath: string) {}

  async read(): Promise<LedgerFile> {
    try {
      const text = await fs.readFile(this.ledgerPath, "utf8");
      const parsed = JSON.parse(text) as LedgerFile;
      if (parsed.version !== 1 || !Array.isArray(parsed.runs)) {
        throw new Error("invalid ledger schema");
      }
      return parsed;
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return { version: 1, runs: [] };
      }
      throw new Error(`Ledger is corrupt or unreadable: ${this.ledgerPath}`);
    }
  }

  async withLock<T>(fn: () => Promise<T>): Promise<T> {
    const lockPath = `${this.ledgerPath}.lock`;
    await fs.mkdir(path.dirname(this.ledgerPath), { recursive: true });
    const started = Date.now();
    let handle: fs.FileHandle | undefined;
    while (!handle) {
      try {
        handle = await fs.open(lockPath, "wx");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "EEXIST" || Date.now() - started > LOCK_TIMEOUT_MS) {
          throw new Error(`Could not acquire ledger lock: ${lockPath}`);
        }
        await new Promise((resolve) => setTimeout(resolve, LOCK_RETRY_MS));
      }
    }
    try {
      return await fn();
    } finally {
      await handle.close();
      await fs.unlink(lockPath).catch(() => undefined);
    }
  }

  async writeAtomic(next: LedgerFile): Promise<void> {
    await fs.mkdir(path.dirname(this.ledgerPath), { recursive: true });
    const tempPath = `${this.ledgerPath}.${process.pid}.${Date.now()}.tmp`;
    await fs.writeFile(tempPath, `${JSON.stringify(next, null, 2)}\n`, { mode: 0o600 });
    await fs.rename(tempPath, this.ledgerPath);
  }

  async upsertRun(record: RunRecord): Promise<RunRecord> {
    return this.withLock(async () => {
      const ledger = await this.read();
      const index = ledger.runs.findIndex((run) => run.runId === record.runId);
      if (index >= 0) {
        ledger.runs[index] = record;
      } else {
        ledger.runs.push(record);
      }
      await this.writeAtomic(ledger);
      return record;
    });
  }

  async findRun(target: string): Promise<RunRecord | undefined> {
    const ledger = await this.read();
    return ledger.runs.find((run) => {
      return run.runId === target ||
        run.batchId === target ||
        run.clipIds.includes(target) ||
        run.songUrls.includes(target);
    });
  }

  async reserveCreateRun(options: ReserveCreateOptions): Promise<RunRecord> {
    return this.withLock(async () => {
      const ledger = await this.read();
      const existing = ledger.runs.find((run) => run.runId === options.runId);
      if (existing?.transactionUuid) {
        if (existing.requestHash && existing.requestHash !== options.requestHash) {
          throw new Error("Budget gate blocked: run id already exists with a different request hash.");
        }
        return existing;
      }
      assertBudgetAllowsReserve(ledger, options.policy, options.now);
      const record: RunRecord = {
        runId: options.runId,
        transactionUuid: options.transactionUuid,
        clipIds: [],
        songUrls: [],
        status: "reserved",
        createdAt: options.now.toISOString(),
        updatedAt: options.now.toISOString(),
        requestHash: options.requestHash,
        creditsReserved: options.creditsReserved
      };
      ledger.runs.push(record);
      await this.writeAtomic(ledger);
      return record;
    });
  }
}

export interface BudgetPolicy {
  maxGenerationsPerDay: number;
  minMinutesBetweenCreates: number;
}

export interface ReserveCreateOptions {
  runId: string;
  transactionUuid: string;
  requestHash: string;
  creditsReserved: number;
  policy: BudgetPolicy;
  now: Date;
}

function assertBudgetAllowsReserve(ledger: LedgerFile, policy: BudgetPolicy, now: Date): void {
  const creates = ledger.runs.filter((run) => run.transactionUuid);
  const today = now.toISOString().slice(0, 10);
  const createsToday = creates.filter((run) => run.createdAt.slice(0, 10) === today);
  if (createsToday.length >= policy.maxGenerationsPerDay) {
    throw new Error(`Budget gate blocked: daily create limit ${policy.maxGenerationsPerDay} reached.`);
  }
  const latestCreate = creates
    .map((run) => Date.parse(run.createdAt))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => b - a)[0];
  if (latestCreate !== undefined) {
    const elapsedMinutes = (now.getTime() - latestCreate) / 60000;
    if (elapsedMinutes < policy.minMinutesBetweenCreates) {
      throw new Error(`Budget gate blocked: minMinutesBetweenCreates ${policy.minMinutesBetweenCreates} not satisfied.`);
    }
  }
}

export function makeDirectClipRun(clipId: string, status = "url_ready"): RunRecord {
  const now = new Date().toISOString();
  return {
    runId: `clip_${clipId}`,
    clipIds: [clipId],
    songUrls: [toSongUrl(clipId)],
    status,
    createdAt: now,
    updatedAt: now
  };
}
