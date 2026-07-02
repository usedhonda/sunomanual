#!/usr/bin/env node
import { createCommandContext } from "./commands/context.js";
import { downloadCommand } from "./commands/download.js";
import { commandError, ExitCode, writeJson } from "./commands/output.js";
import { statusCommand } from "./commands/status.js";
import { urlsCommand } from "./commands/urls.js";
import { redactString } from "./safety/redact.js";

interface ParsedArgs {
  command?: string | undefined;
  target?: string | undefined;
  dataDir?: string | undefined;
  cookieFile?: string | undefined;
  outDir?: string | undefined;
  pollMs?: number | undefined;
  timeoutMs?: number | undefined;
}

async function main(argv: string[]): Promise<number> {
  const args = parseArgs(argv);
  if (!args.command || args.command === "--help" || args.command === "-h") {
    usage();
    return ExitCode.ok;
  }
  if (!["status", "urls", "download"].includes(args.command)) {
    writeJson(commandError("usage", `Unsupported Phase1 command: ${args.command}`));
    return ExitCode.usage;
  }
  if (!args.target) {
    writeJson(commandError("usage", `${args.command} requires <run-id|clip-id|song-url>.`));
    return ExitCode.usage;
  }
  const contextOptions: { dataDir?: string; cookieFile?: string } = {};
  if (args.dataDir) contextOptions.dataDir = args.dataDir;
  if (args.cookieFile) contextOptions.cookieFile = args.cookieFile;
  const context = await createCommandContext(contextOptions);
  if (args.command === "status") return statusCommand(args.target, context);
  if (args.command === "urls") return urlsCommand(args.target, context);
  if (!args.outDir) {
    writeJson(commandError("usage", "download requires --out <dir>."));
    return ExitCode.usage;
  }
  return downloadCommand(args.target, {
    outDir: args.outDir,
    pollMs: args.pollMs ?? 5000,
    timeoutMs: args.timeoutMs ?? 0
  }, context);
}

function parseArgs(argv: string[]): ParsedArgs {
  const result: ParsedArgs = {};
  const rest: string[] = [];
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--data-dir") {
      result.dataDir = argv[index + 1];
      index += 1;
    } else if (arg === "--cookie-file") {
      result.cookieFile = argv[index + 1];
      index += 1;
    } else if (arg === "--out") {
      result.outDir = argv[index + 1];
      index += 1;
    } else if (arg === "--poll-ms") {
      result.pollMs = Number(argv[index + 1]);
      index += 1;
    } else if (arg === "--timeout-ms") {
      result.timeoutMs = Number(argv[index + 1]);
      index += 1;
    } else if (arg === "--json") {
      continue;
    } else if (arg?.startsWith("--")) {
      throw new Error(`Unknown option: ${arg}`);
    } else if (arg) {
      rest.push(arg);
    }
  }
  result.command = rest[0];
  result.target = rest[1];
  return result;
}

function usage(): void {
  writeJson({
    ok: true,
    usage: [
      "suno-cli status <run-id|clip-id|song-url> [--json] [--data-dir <dir>] [--cookie-file <file>]",
      "suno-cli urls <run-id|clip-id|song-url> [--json] [--data-dir <dir>] [--cookie-file <file>]",
      "suno-cli download <run-id|clip-id|song-url> --out <dir> [--timeout-ms <ms>] [--poll-ms <ms>]"
    ]
  });
}

main(process.argv.slice(2))
  .then((code) => {
    process.exitCode = code;
  })
  .catch((error: unknown) => {
    const message = error instanceof Error ? error.message : String(error);
    writeJson(commandError("error", redactString(message)));
    process.exitCode = message.includes("cookie is required") ? ExitCode.blockedLogin : ExitCode.internal;
  });
