import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { statusCommand } from "../src/commands/status.js";
import { FeedClient } from "../src/http/feed.js";
import { LedgerStore } from "../src/ledger/store.js";

const CLIP_ID = "829414b4-1234-4567-8abc-1234567890ab";

test("status returns url_ready and treats sil-100.mp3 as not audio-ready", async () => {
  const tempDir = await fsTempDir();
  const ledger = new LedgerStore(path.join(tempDir, "runs.json"));
  const fetcher = async () => new Response(JSON.stringify({
    clips: [{ id: CLIP_ID, status: "complete", title: "probe", audio_url: "https://cdn.suno.ai/sil-100.mp3" }]
  }), { status: 200, headers: { "content-type": "application/json" } });
  const feed = new FeedClient({ jwt: "test.jwt.secret", fetcher: fetcher as typeof fetch });
  const writes: string[] = [];
  const originalWrite = process.stdout.write;
  process.stdout.write = ((chunk: string | Uint8Array) => {
    writes.push(String(chunk));
    return true;
  }) as typeof process.stdout.write;
  try {
    const code = await statusCommand(CLIP_ID, { ledger, feed, dataDir: tempDir });
    assert.equal(code, 0);
  } finally {
    process.stdout.write = originalWrite;
  }
  const output = JSON.parse(writes.join(""));
  assert.equal(output.ok, true);
  assert.equal(output.status, "url_ready");
  assert.equal(output.clips[0].audioReady, false);
  assert.equal(output.clips[0].songUrl, `https://suno.com/song/${CLIP_ID}`);
});

async function fsTempDir(): Promise<string> {
  const { mkdtemp } = await import("node:fs/promises");
  return mkdtemp(path.join(os.tmpdir(), "suno-cli-test-"));
}
