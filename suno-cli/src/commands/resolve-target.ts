import { LedgerStore, RunRecord, makeDirectClipRun } from "../ledger/store.js";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export interface ResolvedTarget {
  input: string;
  run?: RunRecord;
  clipIds: string[];
}

export async function resolveTarget(input: string, ledger: LedgerStore): Promise<ResolvedTarget> {
  const clipFromUrl = parseSongUrl(input);
  const normalized = clipFromUrl ?? input;
  const run = await ledger.findRun(normalized);
  if (run) {
    return { input, run, clipIds: run.clipIds };
  }
  if (isClipId(normalized)) {
    const direct = makeDirectClipRun(normalized);
    return { input, run: direct, clipIds: [normalized] };
  }
  return { input, clipIds: [] };
}

export function parseSongUrl(input: string): string | undefined {
  try {
    const url = new URL(input);
    if (url.hostname === "suno.com" && url.pathname.startsWith("/song/")) {
      const id = url.pathname.split("/").filter(Boolean)[1];
      return id || undefined;
    }
  } catch {
    return undefined;
  }
  return undefined;
}

export function isClipId(input: string): boolean {
  return UUID_RE.test(input);
}
