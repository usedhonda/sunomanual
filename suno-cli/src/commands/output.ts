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
