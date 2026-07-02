import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { cliMain } from "../src/cli.js";
import { buildCreateBody } from "../src/create/body.js";
import { LedgerStore } from "../src/ledger/store.js";

test("buildCreateBody maps R6 create fields", () => {
  const body = buildCreateBody({
    title: "verify probe",
    style: "lo-fi piano, mellow",
    exclude: "brass",
    lyrics: "hello",
    model: "v5.5",
    vocalGender: "m",
    transactionUuid: "tx-1",
    token: "captcha-secret",
    tokenProvider: "hcaptcha"
  });
  assert.equal(body.tags, "lo-fi piano, mellow");
  assert.equal(body.negative_tags, "brass");
  assert.equal(body.prompt, "hello");
  assert.equal(body.mv, "chirp-fenix");
  assert.equal(body.transaction_uuid, "tx-1");
  assert.equal(body.token, "captcha-secret");
  assert.equal(body.token_provider, "hcaptcha");
  assert.equal(body.override_fields, "[]");
  assert.equal(body.persona_id, null);
  assert.equal(JSON.parse(body.metadata).vocal_gender, "m");
  assert(!("control_sliders" in JSON.parse(body.metadata)));
});

test("create dry-run maps persona id to top-level persona_id", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_persona"),
    "--persona-id", "abc123"
  ]));
  assert.equal(output.code, 0);
  assert.equal(output.json.body.persona_id, "abc123");
  assert(!("persona_id" in JSON.parse(output.json.body.metadata)));
});

test("create dry-run keeps persona_id null when unspecified", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain(baseCreateArgs(tempDir, "run_no_persona")));
  assert.equal(output.code, 0);
  assert.equal(output.json.body.persona_id, null);
});

test("create dry-run rejects empty persona id", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_empty_persona"),
    "--persona-id", ""
  ]));
  assert.equal(output.code, 2);
  assert.equal(output.json.status, "error");
  assert.match(output.json.error, /--persona-id/);
});

test("create dry-run maps weirdness and style influence to metadata control_sliders", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_sliders"),
    "--weirdness", "45",
    "--style-influence", "70"
  ]));
  const metadata = JSON.parse(output.json.body.metadata);
  assert.equal(output.code, 0);
  assert.equal(metadata.control_sliders.weirdness_constraint, 0.45);
  assert.equal(metadata.control_sliders.style_weight, 0.7);
  assert.equal(output.json.body.override_fields, "[]");
});

test("create body omits control_sliders when sliders are unspecified", () => {
  const body = buildCreateBody({
    title: "verify probe",
    style: "lo-fi piano",
    lyrics: "rain",
    transactionUuid: "tx-omit"
  });
  const metadata = JSON.parse(body.metadata);
  assert(!("control_sliders" in metadata));
  assert.equal(body.override_fields, "[]");
});

test("create body includes only specified slider key", () => {
  const body = buildCreateBody({
    title: "verify probe",
    style: "lo-fi piano",
    lyrics: "rain",
    transactionUuid: "tx-one",
    weirdness: 0.33
  });
  const sliders = JSON.parse(body.metadata).control_sliders;
  assert.equal(sliders.weirdness_constraint, 0.33);
  assert(!("style_weight" in sliders));
  assert.equal(body.override_fields, "[]");
});

test("create dry-run rejects slider values outside 0-100", async () => {
  const tempDir = await fsTempDir();
  const low = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_low"),
    "--weirdness", "-1"
  ]));
  const high = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_high"),
    "--style-influence", "101"
  ]));
  const nonNumeric = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_nan"),
    "--weirdness", "nope"
  ]));
  assert.equal(low.code, 2);
  assert.equal(low.json.status, "error");
  assert.match(low.json.error, /--weirdness/);
  assert.equal(high.code, 2);
  assert.match(high.json.error, /--style-influence/);
  assert.equal(nonNumeric.code, 2);
  assert.match(nonNumeric.json.error, /--weirdness/);
});

test("create --dry-run emits redacted body without live network", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain([
    "create",
    "--dry-run",
    "--data-dir", tempDir,
    "--title", "verify probe",
    "--style", "lo-fi piano",
    "--lyrics", "rain",
    "--captcha-token", "captcha-secret",
    "--token-provider", "hcaptcha",
    "--run-id", "run_dry"
  ]));
  assert.equal(output.code, 0);
  assert.equal(output.json.status, "dry_run");
  assert.equal(output.json.endpoint, "https://studio-api-prod.suno.com/api/generate/v2-web/");
  assert.equal(output.json.body.tags, "lo-fi piano");
  assert.equal(output.json.body.token, "[REDACTED]");
  assert.equal(output.json.liveFire, false);
});

test("create dry-run reuses transaction_uuid for same run id", async () => {
  const tempDir = await fsTempDir();
  const first = await captureStdout(() => cliMain(baseCreateArgs(tempDir, "run_same")));
  const second = await captureStdout(() => cliMain(baseCreateArgs(tempDir, "run_same")));
  assert.equal(first.code, 0);
  assert.equal(second.code, 0);
  assert.equal(second.json.transactionUuid, first.json.transactionUuid);
});

test("create dry-run blocks same run id with different request", async () => {
  const tempDir = await fsTempDir();
  const first = await captureStdout(() => cliMain(baseCreateArgs(tempDir, "run_mismatch")));
  const second = await captureStdout(() => cliMain([
    "create",
    "--dry-run",
    "--data-dir", tempDir,
    "--title", "different",
    "--style", "lo-fi piano",
    "--lyrics", "rain",
    "--run-id", "run_mismatch",
    "--min-minutes-between-creates", "0"
  ]));
  assert.equal(first.code, 0);
  assert.equal(second.code, 32);
});

test("create budget gate fails closed", async () => {
  const tempDir = await fsTempDir();
  const ledger = new LedgerStore(path.join(tempDir, "runs.json"));
  const now = new Date().toISOString();
  await ledger.upsertRun({
    runId: "prior",
    transactionUuid: "prior-tx",
    clipIds: [],
    songUrls: [],
    status: "reserved",
    createdAt: now,
    updatedAt: now
  });
  const output = await captureStdout(() => cliMain([
    ...baseCreateArgs(tempDir, "run_block"),
    "--max-generations-per-day", "1",
    "--min-minutes-between-creates", "0"
  ]));
  assert.equal(output.code, 32);
  assert.equal(output.json.ok, false);
});

test("ledger reserve writes atomically without temp leftovers", async () => {
  const tempDir = await fsTempDir();
  const ledger = new LedgerStore(path.join(tempDir, "runs.json"));
  await ledger.reserveCreateRun({
    runId: "atomic_run",
    transactionUuid: "atomic-tx",
    requestHash: "hash",
    creditsReserved: 10,
    policy: { maxGenerationsPerDay: 4, minMinutesBetweenCreates: 0 },
    now: new Date()
  });
  const stored = await ledger.findRun("atomic_run");
  const files = await fs.readdir(tempDir);
  assert.equal(stored?.transactionUuid, "atomic-tx");
  assert(!files.some((file) => file.endsWith(".tmp")));
});

test("create live-fire path is blocked without manual gate", async () => {
  const tempDir = await fsTempDir();
  const output = await captureStdout(() => cliMain([
    "create",
    "--data-dir", tempDir,
    "--title", "verify probe",
    "--style", "lo-fi piano"
  ]));
  assert.equal(output.code, 32);
  assert.equal(output.json.status, "manual_gate_required");
});

function baseCreateArgs(tempDir: string, runId: string): string[] {
  return [
    "create",
    "--dry-run",
    "--data-dir", tempDir,
    "--title", "verify probe",
    "--style", "lo-fi piano",
    "--lyrics", "rain",
    "--run-id", runId,
    "--min-minutes-between-creates", "0"
  ];
}

async function captureStdout(fn: () => Promise<number>): Promise<{ code: number; json: any; text: string }> {
  const writes: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    writes.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  try {
    const code = await fn();
    const text = writes.join("");
    return { code, json: JSON.parse(text), text };
  } finally {
    process.stdout.write = originalWrite;
  }
}

async function fsTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), "suno-cli-test-"));
}
