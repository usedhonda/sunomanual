import { isAudioReady } from "../safety/audio.js";

export interface FeedClip {
  id: string;
  status?: string;
  title?: string;
  audio_url?: string | null;
  video_url?: string | null;
  [key: string]: unknown;
}

export interface NormalizedClip {
  clipId: string;
  songUrl: string;
  status: string;
  title?: string;
  audioReady: boolean;
  audioUrl: string | null;
  raw: FeedClip;
}

export interface FeedClientOptions {
  jwt: string;
  fetcher?: typeof fetch;
  endpoint?: string;
}

const DEFAULT_FEED_ENDPOINT = "https://studio-api-prod.suno.com/api/feed/v3";

export class FeedClient {
  private readonly jwt: string;
  private readonly fetcher: typeof fetch;
  private readonly endpoint: string;

  constructor(options: FeedClientOptions) {
    this.jwt = options.jwt;
    this.fetcher = options.fetcher ?? fetch;
    this.endpoint = options.endpoint ?? DEFAULT_FEED_ENDPOINT;
  }

  async getClips(clipIds: string[]): Promise<NormalizedClip[]> {
    const response = await this.fetcher(this.endpoint, {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.jwt}`,
        accept: "application/json",
        "content-type": "application/json"
      },
      body: JSON.stringify({ ids: clipIds })
    });
    if (!response.ok) {
      throw new Error(`Suno feed request failed: HTTP ${response.status}`);
    }
    const payload = await response.json();
    const clips = extractFeedClips(payload);
    return clips.map(normalizeClip);
  }
}

export function normalizeClip(clip: FeedClip): NormalizedClip {
  const audioUrl = typeof clip.audio_url === "string" && clip.audio_url.length > 0 ? clip.audio_url : null;
  const audioReady = isAudioReady(audioUrl);
  const status = audioReady ? "audio_ready" : (clip.status ?? "url_ready");
  return {
    clipId: clip.id,
    songUrl: toSongUrl(clip.id),
    status,
    ...(typeof clip.title === "string" ? { title: clip.title } : {}),
    audioReady,
    audioUrl,
    raw: clip
  };
}

export function extractFeedClips(payload: unknown): FeedClip[] {
  const candidates = collectCandidates(payload);
  return candidates.filter((item): item is FeedClip => {
    return Boolean(item && typeof item === "object" && "id" in item && typeof (item as { id?: unknown }).id === "string");
  });
}

export function toSongUrl(clipId: string): string {
  return `https://suno.com/song/${clipId}`;
}

function collectCandidates(payload: unknown): unknown[] {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  const record = payload as Record<string, unknown>;
  for (const key of ["clips", "songs", "items", "data"]) {
    const value = record[key];
    if (Array.isArray(value)) return value;
    if (value && typeof value === "object") {
      const nested = collectCandidates(value);
      if (nested.length > 0) return nested;
    }
  }
  return [];
}
