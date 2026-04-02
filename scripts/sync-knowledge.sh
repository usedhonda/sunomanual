#!/bin/bash
# knowledge/ → skills/suno/knowledge/ へ同期
# knowledge を更新したら実行すること
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

cp "$ROOT/knowledge/"*.md "$ROOT/skills/suno/knowledge/"

echo "Synced knowledge/ -> skills/suno/knowledge/"
