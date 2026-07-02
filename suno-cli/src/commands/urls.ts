import { CommandContext } from "./context.js";
import { commandError, ExitCode, writeJson } from "./output.js";
import { resolveTarget } from "./resolve-target.js";

export async function urlsCommand(target: string, context: CommandContext): Promise<number> {
  const resolved = await resolveTarget(target, context.ledger);
  if (resolved.clipIds.length === 0) {
    writeJson(commandError("not_found", `No ledger run or clip id matched: ${target}`));
    return ExitCode.usage;
  }
  const runId = resolved.run?.runId ?? null;
  const clips = resolved.clipIds.map((clipId) => ({
    clipId,
    songUrl: `https://suno.com/song/${clipId}`
  }));
  writeJson({
    ok: true,
    status: "url_ready",
    input: target,
    runId,
    clips
  });
  return ExitCode.ok;
}
