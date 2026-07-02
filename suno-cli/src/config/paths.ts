import os from "node:os";
import path from "node:path";

export interface PathConfig {
  dataDir: string;
  ledgerPath: string;
  cookieFile?: string;
}

export function defaultDataDir(): string {
  if (process.env.SUNO_KIT_DATA_DIR) {
    return path.resolve(process.env.SUNO_KIT_DATA_DIR);
  }
  if (process.platform === "darwin") {
    return path.join(os.homedir(), "Library", "Application Support", "suno-kit");
  }
  return path.join(os.homedir(), ".local", "share", "suno-kit");
}

export function resolvePathConfig(options: { dataDir?: string; cookieFile?: string } = {}): PathConfig {
  const dataDir = path.resolve(options.dataDir ?? defaultDataDir());
  const envCookieFile = process.env.SUNO_KIT_COOKIE_FILE;
  const cookieFile = options.cookieFile ?? envCookieFile;
  return {
    dataDir,
    ledgerPath: path.join(dataDir, "runs.json"),
    ...(cookieFile ? { cookieFile: path.resolve(cookieFile) } : {})
  };
}
