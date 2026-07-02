import { randomUUID } from "node:crypto";
import { ClerkAuthOptions } from "../auth/clerk.js";
import { buildCreateBody, CreateInput, hashCreateBody } from "../create/body.js";
import { GENERATE_ENDPOINT, GenerateHttpError, GenerateSubmitter, HttpGenerateSubmitter } from "../http/generate.js";
import { BudgetPolicy, LedgerStore, RunRecord } from "../ledger/store.js";
import { commandError, ExitCode, writeJson } from "./output.js";

export interface CreateCommandOptions extends CreateInput {
  dryRun: boolean;
  live?: boolean;
  runId?: string;
  ledger: LedgerStore;
  policy: BudgetPolicy;
  authOptions?: ClerkAuthOptions;
  submitter?: GenerateSubmitter;
  now?: Date;
}

export async function createCommand(options: CreateCommandOptions): Promise<number> {
  if (!options.dryRun && !options.live) {
    writeJson({
      ok: false,
      status: "manual_gate_required",
      error: "Live create submit is disabled in this build. Re-run with --dry-run; live-fire requires explicit owner GO."
    });
    return ExitCode.blockedPaymentOrQuota;
  }
  if (options.live && !options.token) {
    writeJson(commandError("usage", "Usage: create --live requires --captcha-token."));
    return ExitCode.usage;
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
  if (options.sessionToken) bodyInput.sessionToken = options.sessionToken;
  if (options.userTier) bodyInput.userTier = options.userTier;
  const body = buildCreateBody(bodyInput);
  const finalRequestHash = hashCreateBody(body);
  if (options.live) {
    const submitter = options.submitter ?? new HttpGenerateSubmitter(options.authOptions ?? {});
    try {
      const result = await submitter.submit(body);
      const updated: RunRecord = {
        ...reserved,
        clipIds: result.clipIds,
        songUrls: result.songUrls,
        status: "submitted",
        updatedAt: (options.now ?? new Date()).toISOString()
      };
      if (result.batchId) updated.batchId = result.batchId;
      await options.ledger.upsertRun(updated);
      writeJson({
        ok: true,
        status: "submitted",
        endpoint: GENERATE_ENDPOINT,
        method: "POST",
        runId: reserved.runId,
        transactionUuid: reserved.transactionUuid,
        requestHash: finalRequestHash,
        creditsReserved: reserved.creditsReserved ?? 10,
        liveFire: true,
        clips: result.clipIds.map((clipId, index) => ({
          clipId,
          songUrl: result.songUrls[index] ?? `https://suno.com/song/${clipId}`
        })),
        response: result.response
      });
      return ExitCode.ok;
    } catch (error) {
      if (error instanceof GenerateHttpError) {
        writeJson(commandError(error.status, error.message, error.details));
        return error.exitCode;
      }
      throw error;
    }
  }
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
