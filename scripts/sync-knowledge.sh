#!/bin/bash
# knowledge/ → skills/*/knowledge/ へ同期
# knowledge を更新したら実行すること
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# suno-lyrics
cp "$ROOT/knowledge/lyric_craft.md" "$ROOT/skills/suno-lyrics/knowledge/"
cp "$ROOT/knowledge/song_structures.md" "$ROOT/skills/suno-lyrics/knowledge/"
cp "$ROOT/knowledge/style_catalog.md" "$ROOT/skills/suno-lyrics/knowledge/"
cp "$ROOT/knowledge/rap_and_flow.md" "$ROOT/skills/suno-lyrics/knowledge/"
cp "$ROOT/knowledge/english_lyrics.md" "$ROOT/skills/suno-lyrics/knowledge/"

# suno-style
cp "$ROOT/knowledge/suno_v55_reference.md" "$ROOT/skills/suno-style/knowledge/"
cp "$ROOT/knowledge/yaml_template.md" "$ROOT/skills/suno-style/knowledge/"
cp "$ROOT/knowledge/style_catalog.md" "$ROOT/skills/suno-style/knowledge/"

echo "Synced knowledge/ -> skills/*/knowledge/"
