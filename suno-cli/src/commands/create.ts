import { randomUUID } from "node:crypto";
import { buildCreateBody, CreateInput, hashCreateBody } from "../create/body.js";
import { GENERATE_ENDPOINT } from "../http/generate.js";
import { BudgetPolicy, LedgerStore } from "../ledger/store.js";
import { ExitCode, writeJson } from "./output.js";

export interface CreateCommandOptions extends CreateInput {
  dryRun: boolean;
  runId?: string;
  ledger: LedgerStore;
  policy: BudgetPolicy;
  now?: Date;
}

export async function createCommand(options: CreateCommandOptions): Promise<number> {
  if (!options.dryRun) {
    writeJson({
      ok: false,
      status: "manual_gate_required",
      error: "Live create submit is disabled in this build. Re-run with --dry-run; live-fire requires explicit owner GO."
    });
    return ExitCode.blockedPaymentOrQuota;
  }
  const provisionalBody = buildCreateBody(options);
  const requestHash = hashCreateBody(provisionalBody);
  const runId = options.runId ?? `run_${randomUUID()}`;
  const reserved = await options.ledger.reserveCreateRun({
    runId,
    transactionUuid: provisionalBody.transaction_uuid,
    requestHash,
    creditsReserved: 10,
    policy: options.policy,
    now: options.now ?? new Date()
  });
  const transactionUuid = reserved.transactionUuid ?? provisionalBody.transaction_uuid;
  const bodyInput: CreateInput = {
    title: options.title,
    style: options.style,
    transactionUuid
  };
  if (options.exclude) bodyInput.exclude = options.exclude;
  if (options.lyrics) bodyInput.lyrics = options.lyrics;
  if (options.instrumental !== undefined) bodyInput.instrumental = options.instrumental;
  if (options.model) bodyInput.model = options.model;
  if (options.vocalGender) bodyInput.vocalGender = options.vocalGender;
  if (options.token) bodyInput.token = options.token;
  if (options.tokenProvider) bodyInput.tokenProvider = options.tokenProvider;
  if (options.weirdness !== undefined) bodyInput.weirdness = options.weirdness;
  if (options.styleInfluence !== undefined) bodyInput.styleInfluence = options.styleInfluence;
  if (options.personaId) bodyInput.personaId = options.personaId;
  if (options.coverClipId) bodyInput.coverClipId = options.coverClipId;
  if (options.coverStartS !== undefined) bodyInput.coverStartS = options.coverStartS;
  if (options.coverEndS !== undefined) bodyInput.coverEndS = options.coverEndS;
  if (options.audioInfluence !== undefined) bodyInput.audioInfluence = options.audioInfluence;
  const body = buildCreateBody(bodyInput);
  const finalRequestHash = hashCreateBody(body);
  writeJson({
    ok: true,
    status: "dry_run",
    endpoint: GENERATE_ENDPOINT,
    method: "POST",
    runId: reserved.runId,
    transactionUuid: reserved.transactionUuid,
    requestHash: finalRequestHash,
    creditsReserved: reserved.creditsReserved ?? 10,
    liveFire: false,
    body
  });
  return ExitCode.ok;
}
