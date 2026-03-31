# Suno AI V5/V5.5 Prompt Manual

> **Language**: Japanese (日本語) — technical terms in English

Suno V5/V5.5 向けのプロンプト設計マニュアル。公式ドキュメントの整理に加え、コミュニティで再現性が報告されているテクニックやワークフローを統合しています。

## 何ができるか

- **Style / Lyrics / Exclude の設計**: 効果的なプロンプトの書き方
- **Cover / Sample / Inspo の使い分け**: 音声条件付けモードの意思決定フロー
- **歌詞生成**: ラップ、英語、バイリンガル、J-Pop、EDM 等ジャンル別の作詞技法
- **Custom GPT**: ChatGPT にそのまま移植できる Instructions + Knowledge セット（2種）
- **Claude Code Skills**: `/suno-lyrics` で歌詞イテレーション、`/suno-style` でスタイル生成

## ドキュメント構成

### 中核マニュアル

**[SunoV5_Prompt_MASTER_REFERENCE.md](SunoV5_Prompt_MASTER_REFERENCE.md)**

1. 基礎編 — V5 プロンプト設計の四本柱、ソニック形容詞、アンカーリング
2. 応用テクニック編 — Double-Layer 構造、Style フィールド運用
3. コミュニティ発見テクニック集 — Bracket Theory、15秒ビルディングブロック、アスタリスク効果等
4. V5.5 音声条件付けワークフロー — Cover/Sample/Inspo/Remaster の6テクニック
5. Deep Research 統合ログ — 調査ごとの統合記録

### 用途別フロー（`agent/`）

| 用途 | ファイル |
|------|----------|
| 新曲生成 | [suno_flow_generate.md](agent/suno_flow_generate.md) |
| スタイル抽出 | [suno_flow_style_extract.md](agent/suno_flow_style_extract.md) |
| リライト | [suno_flow_rewrite.md](agent/suno_flow_rewrite.md) |
| 翻訳 | [suno_flow_translate.md](agent/suno_flow_translate.md) |
| リミックス | [suno_flow_remix.md](agent/suno_flow_remix.md) |
| アルバム制作 | [suno_flow_album.md](agent/suno_flow_album.md) |

### Custom GPT（2種）

| GPT | 用途 | セットアップ |
|-----|------|-------------|
| **Suno Style Analyzer V5.5** | YouTube URL からスタイル解析 → Style/Exclude/YAML 生成 | [mygpts/style-analyzer/README.md](mygpts/style-analyzer/README.md) |
| **Suno Lyrics Writer V5.5** | テーマから歌詞生成（ラップ・英語・バイリンガル対応） | [mygpts/lyrics-writer/README.md](mygpts/lyrics-writer/README.md) |

### Claude Code Skills（2種）

| Skill | 用途 |
|-------|------|
| `/suno-lyrics` | 歌詞生成+イテレーション。テーマ投入→生成→部分修正→完成 |
| `/suno-style` | YouTube URL からスタイル解析 → Style/Exclude/YAML 生成 |

## V5.5 で押さえるべきポイント

- **Style は短いタグ列** — カンマ区切りの名詞句。散文より安定
- **Cover が逸脱したら Sample 全尺** — メロディ固定なら Inspo 複数テイク
- **Audio Influence は 25% 起点 +5% 刻み** — 75% 超は劣化リスク
- **スライダー赤域を避ける** — 安全範囲は 15-85
- **Voices 使用時は Style を削る** — 声質・楽器記述が衝突する
- **歌詞は 6-12 音節/行** — Suno の歌唱安定性のスイートスポット

## ファイルツリー

```
sunomanual/
├── README.md
├── LICENSE
├── SunoV5_Prompt_MASTER_REFERENCE.md
├── agent/
│   ├── suno_flow_generate.md
│   ├── suno_flow_style_extract.md
│   ├── suno_flow_rewrite.md
│   ├── suno_flow_translate.md
│   ├── suno_flow_remix.md
│   └── suno_flow_album.md
├── knowledge/                          # 共通ナレッジ（原本）
│   ├── lyric_craft.md
│   ├── song_structures.md
│   ├── style_catalog.md
│   ├── rap_and_flow.md
│   ├── english_lyrics.md
│   ├── suno_v55_reference.md
│   └── yaml_template.md
├── mygpts/                             # ChatGPT CustomGPT
│   ├── style-analyzer/
│   │   ├── README.md
│   │   └── instructions.md
│   └── lyrics-writer/
│       ├── README.md
│       └── instructions.md
├── skills/                             # Claude Code Skills
│   ├── suno-lyrics/
│   │   └── SKILL.md
│   └── suno-style/
│       └── SKILL.md
```

## 情報の立場

| 種類 | 扱い |
|------|------|
| **公式情報** | Suno ブログ・ヘルプ・FAQ に基づく |
| **コミュニティ情報** | Reddit 等で複数報告があるものを優先収録。再現性・副作用は文脈依存 |

ここに書いてある内容は「絶対解」ではありません。ただし「どこを触ると変わるか」「何を避けると壊れにくいか」は実務向けに整理してあります。

## 注意事項

- Suno の仕様は更新されるため、特に V5.5 周辺のパラメータは今後も変わり得ます
- コミュニティ技法は「効く場面」と「壊す場面」があります。小さく試してください
- 著作権保護のため、アーティスト名や曲名の直接指定ではなく音響特徴の言語化を推奨します

## License

[CC BY-NC 4.0](LICENSE) - Created by **usedhonda**
