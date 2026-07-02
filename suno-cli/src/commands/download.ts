import fs from "node:fs/promises";
import path from "node:path";
import { CommandContext } from "./context.js";
import { commandError, ExitCode, writeJson } from "./output.js";
import { resolveTarget } from "./resolve-target.js";

export interface DownloadOptions {
  outDir: string;
  pollMs: number;
  timeoutMs: number;
  fetcher?: typeof fetch;
}

export async function downloadCommand(target: string, options: DownloadOptions, context: CommandContext): Promise<number> {
  const resolved = await resolveTarget(target, context.ledger);
  if (resolved.clipIds.length === 0) {
    writeJson(commandError("not_found", `No ledger run or clip id matched: ${target}`));
    return ExitCode.usage;
  }
  const clips = await pollAudioReady(resolved.clipIds, options, context);
  const notReady = clips.filter((clip) => !clip.audioReady || !clip.audioUrl);
  if (notReady.length > 0) {
    writeJson({
      ok: false,
      status: "retryable_unknown",
      input: target,
      message: "Audio is not ready yet.",
      clips: clips.map((clip) => ({
        clipId: clip.clipId,
        songUrl: clip.songUrl,
        audioReady: clip.audioReady,
        audioUrl: clip.audioUrl
      }))
    });
    return ExitCode.retryableUnknown;
  }

  await fs.mkdir(options.outDir, { recursive: true });
  const fetcher = options.fetcher ?? fetch;
  const downloadedFiles: string[] = [];
  for (const clip of clips) {
    const audioUrl = clip.audioUrl;
    if (!audioUrl) continue;
    const response = await fetcher(audioUrl);
    if (!response.ok) {
      writeJson(commandError("retryable_unknown", `Audio download failed: HTTP ${response.status}`));
      return ExitCode.retryableUnknown;
    }
    const arrayBuffer = await response.arrayBuffer();
    const filePath = path.join(options.outDir, `${clip.clipId}.mp3`);
    await fs.writeFile(filePath, Buffer.from(arrayBuffer), { mode: 0o600 });
    downloadedFiles.push(filePath);
  }

  if (resolved.run) {
    await context.ledger.upsertRun({
      ...resolved.run,
      status: "downloaded",
      downloadedFiles,
      updatedAt: new Date().toISOString()
    });
  }
  writeJson({
    ok: true,
    status: "downloaded",
    input: target,
    runId: resolved.run?.runId ?? null,
    downloadedFiles,
    clips: clips.map((clip) => ({
      clipId: clip.clipId,
      songUrl: clip.songUrl,
      audioReady: clip.audioReady,
      audioUrl: clip.audioUrl
    }))
  });
  return ExitCode.ok;
}

async function pollAudioReady(clipIds: string[], options: DownloadOptions, context: CommandContext) {
  const started = Date.now();
  for (;;) {
    const clips = await context.feed.getClips(clipIds);
    if (clips.every((clip) => clip.audioReady)) return clips;
    if (Date.now() - started >= options.timeoutMs) return clips;
    await new Promise((resolve) => setTimeout(resolve, options.pollMs));
  }
}
