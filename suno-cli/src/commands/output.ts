import { safeJson } from "../safety/redact.js";

export const ExitCode = {
  ok: 0,
  usage: 2,
  blockedLogin: 30,
  blockedPaymentOrQuota: 32,
  schemaDrift: 40,
  retryableUnknown: 50,
  internal: 70
} as const;

export function writeJson(value: unknown): void {
  process.stdout.write(safeJson(value));
}

export function commandError(status: string, message: string, details?: unknown): { ok: false; status: string; error: string; details?: unknown } {
  return {
    ok: false,
    status,
    error: message,
    ...(details === undefined ? {} : { details })
  };
}

export function classifyError(error: unknown): number {
  const message = error instanceof Error ? error.message : String(error);
  if (message.includes("cookie is required")) return ExitCode.blockedLogin;
  if (message.startsWith("Usage:")) return ExitCode.usage;
  if (message.includes("Ledger is corrupt")) return ExitCode.schemaDrift;
  if (message.includes("Budget gate blocked")) return ExitCode.blockedPaymentOrQuota;
  if (message.includes("fetch") || message.includes("network") || message.includes("request failed")) return ExitCode.retryableUnknown;
  return ExitCode.internal;
}
