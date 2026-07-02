import { createHash, randomUUID } from "node:crypto";

export interface CreateInput {
  title: string;
  style: string;
  exclude?: string;
  lyrics?: string;
  instrumental?: boolean;
  model?: string;
  vocalGender?: string;
  transactionUuid?: string;
  token?: string;
  tokenProvider?: string;
}

export interface CreateBody {
  tags: string;
  negative_tags: string;
  prompt: string;
  title: string;
  make_instrumental: boolean;
  mv: string;
  metadata: string;
  transaction_uuid: string;
  token: string;
  token_provider: string;
  override_fields: string;
  persona_id: null;
  cover_clip_id: null;
  cover_start_s: null;
  cover_end_s: null;
  continue_clip_id: null;
  continue_at: null;
  continued_aligned_prompt: null;
  artist_clip_id: null;
  artist_start_s: null;
  artist_end_s: null;
  user_uploaded_images_b64: null;
  generation_type: "TEXT";
}

const MODEL_ALIASES: Record<string, string> = {
  "v5.5": "chirp-fenix",
  "chirp-fenix": "chirp-fenix"
};

export function buildCreateBody(input: CreateInput): CreateBody {
  if (!input.title) throw new Error("create requires --title.");
  if (!input.style) throw new Error("create requires --style.");
  const model = MODEL_ALIASES[input.model ?? "v5.5"] ?? input.model ?? "chirp-fenix";
  const transactionUuid = input.transactionUuid ?? randomUUID();
  const metadata: Record<string, unknown> = {
    create_mode: "custom",
    is_max_mode: false,
    is_mumble: false
  };
  if (input.vocalGender) metadata.vocal_gender = input.vocalGender;
  return {
    tags: input.style,
    negative_tags: input.exclude ?? "",
    prompt: input.instrumental ? "" : input.lyrics ?? "",
    title: input.title,
    make_instrumental: input.instrumental ?? false,
    mv: model,
    metadata: JSON.stringify(metadata),
    transaction_uuid: transactionUuid,
    token: input.token ?? "__DRY_RUN_CAPTCHA_TOKEN__",
    token_provider: input.tokenProvider ?? "hcaptcha",
    override_fields: "[]",
    persona_id: null,
    cover_clip_id: null,
    cover_start_s: null,
    cover_end_s: null,
    continue_clip_id: null,
    continue_at: null,
    continued_aligned_prompt: null,
    artist_clip_id: null,
    artist_start_s: null,
    artist_end_s: null,
    user_uploaded_images_b64: null,
    generation_type: "TEXT"
  };
}

export function hashCreateBody(body: CreateBody): string {
  const copy = { ...body, token: "[REDACTED]", transaction_uuid: "[IDEMPOTENT]" };
  return createHash("sha256").update(JSON.stringify(copy)).digest("hex");
}
