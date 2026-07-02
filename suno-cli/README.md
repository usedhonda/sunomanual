# suno-cli

Phase1 implements the browser-free retrieval layer:

- Clerk cookie -> Clerk JWT
- `POST https://studio-api-prod.suno.com/api/feed/v3`
- `status`, `urls`, and `download`
- JSON output with stable exit codes
- repo-external user data under `~/.local/share/suno-kit` by default

Create submit is intentionally out of scope for Phase1.

## Commands

```bash
npm run build
node dist/src/cli.js status <run-id|clip-id|song-url>
node dist/src/cli.js urls <run-id>
node dist/src/cli.js download <run-id|clip-id|song-url> --out <dir>
```

Set `SUNO_KIT_COOKIE` or `SUNO_KIT_COOKIE_FILE` for retrieval commands that call Suno.
