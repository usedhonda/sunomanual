import { CommandContext } from "./context.js";
import { commandError, ExitCode, writeJson } from "./output.js";
import { resolveTarget } from "./resolve-target.js";

export async function statusCommand(target: string, context: CommandContext): Promise<number> {
  const resolved = await resolveTarget(target, context.ledger);
  if (resolved.clipIds.length === 0) {
    writeJson(commandError("not_found", `No ledger run or clip id matched: ${target}`));
    return ExitCode.usage;
  }
  const clips = await context.feed.getClips(resolved.clipIds);
  const audioReady = clips.length > 0 && clips.every((clip) => clip.audioReady);
  const status = audioReady ? "audio_ready" : "url_ready";
  if (resolved.run) {
    await context.ledger.upsertRun({
      ...resolved.run,
      status,
      clipIds: clips.map((clip) => clip.clipId),
      songUrls: clips.map((clip) => clip.songUrl),
      updatedAt: new Date().toISOString()
    });
  }
  writeJson({
    ok: true,
    status,
    input: target,
    runId: resolved.run?.runId ?? null,
    clips: clips.map((clip) => ({
      clipId: clip.clipId,
      songUrl: clip.songUrl,
      status: clip.status,
      title: clip.title ?? null,
      audioReady: clip.audioReady,
      audioUrl: clip.audioUrl
    }))
  });
  return ExitCode.ok;
}
