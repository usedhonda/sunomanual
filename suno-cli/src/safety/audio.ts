export function isSilencePlaceholder(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.pathname.toLowerCase().includes("sil-100.mp3");
  } catch {
    return url.toLowerCase().includes("sil-100.mp3");
  }
}

export function isAudioReady(url: string | null | undefined): boolean {
  return Boolean(url) && !isSilencePlaceholder(url);
}
