import { CreateBody } from "../create/body.js";

export const GENERATE_ENDPOINT = "https://studio-api-prod.suno.com/api/generate/v2-web/";

export interface GenerateSubmitter {
  submit(body: CreateBody): Promise<unknown>;
}

export class DisabledLiveGenerateSubmitter implements GenerateSubmitter {
  async submit(_body: CreateBody): Promise<unknown> {
    throw new Error("Live create submit is disabled. Use --dry-run unless manual owner GO has been granted.");
  }
}
