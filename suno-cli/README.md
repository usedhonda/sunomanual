# suno-cli

`suno-cli` is the execution helper for `suno-kit`.

Current status:

- Phase1 retrieval is implemented: `status`, `urls`, and `download`.
- Phase2 create is code-complete only for `--dry-run`: it builds the verified Suno request body and reserves an idempotent `transaction_uuid`, but it does not spend credits.
- Live create submit is blocked unless the owner explicitly gives manual GO.

## Install And Build

Requirements:

- Node.js 22 or newer
- A logged-in Suno account in your browser

```bash
cd suno-cli
npm install
npm run build
node dist/src/cli.js --help
```

## Data Directory

Runtime state is stored outside the repository. The default path is:

```text
~/.local/share/suno-kit/
```

The ledger file is `~/.local/share/suno-kit/runs.json`. It is written with a per-ledger lock and atomic temp-file rename. If the ledger is corrupt, the CLI fails closed instead of silently resetting state.

Override the data directory when testing:

```bash
node dist/src/cli.js status <clip-id> --data-dir /tmp/suno-kit-test
```

## Clerk Cookie

Retrieval commands call Suno's private HTTP API with a Clerk session token. The CLI derives that token from your browser cookie.

### Get `__session` From Browser DevTools

1. Open `https://suno.com/create` in a browser where you are logged in.
2. Open DevTools.
3. Go to `Application` -> `Storage` -> `Cookies` -> `https://suno.com`.
4. Find the cookie named `__session`.
5. Copy only its value.
6. Build the cookie string locally by joining the cookie name, an equals sign, and the copied value.

Do not paste cookies into chat, issues, logs, or commit history.

### Environment Variable

Use this for quick local runs:

```bash
SUNO_SESSION_VALUE='<copied-value>'
export SUNO_KIT_COOKIE="$(printf '%s%s' '__session' "=${SUNO_SESSION_VALUE}")"
node dist/src/cli.js status <clip-id>
```

### Cookie File

Use this when you do not want the cookie in shell history:

```bash
mkdir -p ~/.local/share/suno-kit
SUNO_SESSION_VALUE='<copied-value>'
printf '%s%s\n' '__session' "=${SUNO_SESSION_VALUE}" > ~/.local/share/suno-kit/cookie.txt
chmod 600 ~/.local/share/suno-kit/cookie.txt

export SUNO_KIT_COOKIE_FILE=~/.local/share/suno-kit/cookie.txt
node dist/src/cli.js status <clip-id>
```

`SUNO_KIT_COOKIE` wins over `SUNO_KIT_COOKIE_FILE`. The `--cookie-file <file>` flag can also be used per command.

## Commands

All commands print JSON. `--json` is accepted for readability, but JSON is already the default.

### status

```bash
node dist/src/cli.js status <clip-id>
node dist/src/cli.js status https://suno.com/song/<clip-id>
node dist/src/cli.js status <run-id>
```

Returns URL-ready vs audio-ready state. `sil-100.mp3` is treated as not audio-ready.

### urls

```bash
node dist/src/cli.js urls <run-id>
node dist/src/cli.js urls <clip-id>
```

Returns canonical song URLs:

```text
https://suno.com/song/<clip-id>
```

### download

```bash
node dist/src/cli.js download <run-id> --out ./downloads
node dist/src/cli.js download <clip-id> --out ./downloads --timeout-ms 600000 --poll-ms 10000
```

Downloads ready MP3 files. If audio is not ready, the command returns a retryable JSON error and does not treat `sil-100.mp3` as success.

### create `--dry-run`

```bash
node dist/src/cli.js create --dry-run \
  --title "verify probe" \
  --style "lo-fi piano, mellow, rain, tape hiss" \
  --exclude "brass, aggressive" \
  --lyrics "rain on the window" \
  --vocal-gender m \
  --weirdness 45 \
  --style-influence 70
```

Dry-run builds the verified request shape for:

```text
POST https://studio-api-prod.suno.com/api/generate/v2-web/
```

It also reserves a local `transaction_uuid` in the ledger so retries for the same `--run-id` reuse the same UUID.

Useful retry check:

```bash
node dist/src/cli.js create --dry-run --run-id test-run --title "probe" --style "lo-fi piano" --lyrics "rain"
node dist/src/cli.js create --dry-run --run-id test-run --title "probe" --style "lo-fi piano" --lyrics "rain"
```

Both outputs should use the same `transactionUuid`.

Optional create controls:

| Flag | Input | Request field | Omitted behavior |
|---|---:|---|---|
| `--weirdness <n>` | 0-100 | `metadata.control_sliders.weirdness_constraint` as `n / 100` | key omitted |
| `--style-influence <n>` | 0-100 | `metadata.control_sliders.style_weight` as `n / 100` | key omitted |

When neither flag is provided, `metadata.control_sliders` is omitted entirely. `override_fields` remains `[]`.

Live create without `--dry-run` is intentionally blocked in this build.

## Exit Codes

| Code | Name | Meaning |
|---:|---|---|
| 0 | `ok` | Success |
| 2 | `usage` | Bad arguments, missing target, or unknown id |
| 30 | `blockedLogin` | Missing or unusable Clerk cookie |
| 32 | `blockedPaymentOrQuota` | Live-fire blocked, quota/payment/budget/manual gate |
| 40 | `schemaDrift` | Corrupt ledger or incompatible local state |
| 50 | `retryableUnknown` | Network failure or audio not ready |
| 70 | `internal` | Unexpected internal error |

Errors are JSON and are redacted before output.

## Safety

- Cookies, JWTs, bearer tokens, Clerk tokens, and `create_session_token` are redacted from JSON output.
- Runtime data is kept outside the repo by default.
- `node_modules/` and `dist/` are ignored in this package.
- Phase2 live create is not automated here because it can spend Suno credits.

## Manual Live-Fire Checklist

Do not run this checklist without explicit owner GO.

1. Confirm the owner approved one paid Suno create test in the current conversation.
2. Confirm the current credit balance and expected credit cost.
3. Confirm `npm test` is green.
4. Confirm `create --dry-run` emits the expected body and reuses `transactionUuid` for retry.
5. Use a dedicated browser profile for hCaptcha/passive token handling.
6. Submit exactly one create request through the future stealth browser submit layer.
7. Record the returned `clips[].id` values only; do not log captcha token, Clerk JWT, cookie, or `create_session_token`.
8. Use `status`, `urls`, and `download` to retrieve results.

This repository task does not execute that live-fire step.
