import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { downloadCommand } from "../src/commands/download.js";
import { urlsCommand } from "../src/commands/urls.js";
import { FeedClient } from "../src/http/feed.js";
import { LedgerStore } from "../src/ledger/store.js";
import { RunRecord } from "../src/ledger/store.js";

const CLIP_ID = "929414b4-1234-4567-8abc-1234567890ab";

test("urls returns ledger song URLs", async () => {
  const tempDir = await fsTempDir();
  const ledger = new LedgerStore(path.join(tempDir, "runs.json"));
  await ledger.upsertRun(makeRun());
  const feed = new FeedClient({ jwt: "test.jwt.secret", fetcher: failFetch });
  const output = await captureStdout(() => urlsCommand("run_1", { ledger, feed, dataDir: tempDir }));
  assert.equal(output.code, 0);
  assert.equal(output.json.status, "url_ready");
  assert.equal(output.json.clips[0].songUrl, `https://suno.com/song/${CLIP_ID}`);
});

test("download writes ready audio and updates ledger", async () => {
  const tempDir = await fsTempDir();
  const outDir = path.join(tempDir, "out");
  const ledger = new LedgerStore(path.join(tempDir, "runs.json"));
  await ledger.upsertRun(makeRun());
  const fetcher = async (input: string | URL | Request) => {
    const url = String(input);
    if (url.includes("feed")) {
      return new Response(JSON.stringify({
        clips: [{ id: CLIP_ID, status: "complete", audio_url: "https://cdn.suno.ai/audio.mp3" }]
      }), { status: 200, headers: { "content-type": "application/json" } });
    }
    return new Response(Buffer.from("mp3"), { status: 200 });
  };
  const feed = new FeedClient({ jwt: "test.jwt.secret", endpoint: "https://example.test/feed", fetcher: fetcher as typeof fetch });
  const output = await captureStdout(() => downloadCommand("run_1", {
    outDir,
    pollMs: 1,
    timeoutMs: 0,
    fetcher: fetcher as typeof fetch
  }, { ledger, feed, dataDir: tempDir }));
  assert.equal(output.code, 0);
  assert.equal(output.json.status, "downloaded");
  assert.equal(await fs.readFile(path.join(outDir, `${CLIP_ID}.mp3`), "utf8"), "mp3");
  const updated = await ledger.findRun("run_1");
  assert.equal(updated?.status, "downloaded");
});

test("corrupt ledger fails closed", async () => {
  const tempDir = await fsTempDir();
  const ledgerPath = path.join(tempDir, "runs.json");
  await fs.writeFile(ledgerPath, "{not-json");
  const ledger = new LedgerStore(ledgerPath);
  await assert.rejects(() => ledger.read(), /corrupt or unreadable/);
});

function makeRun(): RunRecord {
  const now = new Date().toISOString();
  return {
    runId: "run_1",
    clipIds: [CLIP_ID],
    songUrls: [`https://suno.com/song/${CLIP_ID}`],
    status: "url_ready",
    createdAt: now,
    updatedAt: now
  };
}

async function captureStdout(fn: () => Promise<number>): Promise<{ code: number; json: any }> {
  const writes: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    writes.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  try {
    const code = await fn();
    return { code, json: JSON.parse(writes.join("")) };
  } finally {
    process.stdout.write = originalWrite;
  }
}

async function fsTempDir(): Promise<string> {
  return fs.mkdtemp(path.join(os.tmpdir(), "suno-cli-test-"));
}

const failFetch = (async () => {
  throw new Error("fetch should not be called");
}) as typeof fetch;
