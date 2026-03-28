---
title: "Suno AI V5/V5.5 Prompt Manual"
version: "3.1.0"
last_updated: 2026-03-28
description: >
  Public-facing manual for building Suno V5/V5.5 prompts.
  Covers core prompt design, community-tested techniques, Cover/Sample/Inspo
  workflows, and companion GPT setups for style analysis and lyric writing.
---

# Suno AI V5/V5.5 Prompt Manual

Suno V5/V5.5 向けのプロンプト設計マニュアルです。  
公式ドキュメントの整理だけでなく、コミュニティで再現性が高いと報告されているワークフローも統合しています。

このリポジトリは、次の3つを公開対象として扱います。

- `SunoV5_Prompt_MASTER_REFERENCE.md`
  - 中核マニュアル。Style、Lyrics、Exclude、メタタグ、Double-Layer、V5.5 音声条件付けワークフローを統合。
- `agent/`
  - 用途別フロー。新曲生成、スタイル抽出、翻訳、リライト、リミックス、アルバム制作の実行手順。
- `customgpt/` / `customgpt-lyrics/`
  - ChatGPT の Custom GPT にそのまま移植できる Instructions / Knowledge セット。

## このリポジトリで扱うこと

- Suno V5 / V5.5 の Style Prompt 設計
- Lyrics とメタタグによる構造制御
- Double-Layer 構造による分離設計
- Cover / Sample / Inspo / Remaster の使い分け
- Voices / Custom Models / My Taste を前提にした運用
- Japanese lyrics の歌唱可能性改善

## 読み始める順序

### 1. まず中核マニュアル

最初に [SunoV5_Prompt_MASTER_REFERENCE.md](SunoV5_Prompt_MASTER_REFERENCE.md) を読んでください。  
V5/V5.5 の基本設計、応用テクニック、コミュニティ発見テクニック、音声条件付けワークフローまでを一冊にまとめています。

### 2. 次に用途別フロー

必要な作業に応じて `agent/` 配下を参照します。

| 用途 | ファイル |
|------|----------|
| スタイル抽出 | [agent/suno_flow_style_extract.md](agent/suno_flow_style_extract.md) |
| 新曲生成 | [agent/suno_flow_generate.md](agent/suno_flow_generate.md) |
| リライト | [agent/suno_flow_rewrite.md](agent/suno_flow_rewrite.md) |
| 翻訳 | [agent/suno_flow_translate.md](agent/suno_flow_translate.md) |
| リミックス | [agent/suno_flow_remix.md](agent/suno_flow_remix.md) |
| アルバム制作 | [agent/suno_flow_album.md](agent/suno_flow_album.md) |

### 3. Custom GPT を作る場合

ChatGPT の Custom GPT として使いたい場合は、以下の README を参照してください。

- [customgpt/README.md](customgpt/README.md)
- [customgpt-lyrics/README.md](customgpt-lyrics/README.md)

## V5.5 で特に重要な更新点

今回の公開版で強く押さえているのは次の点です。

- **Style は短いタグ列を優先**
  - 長文散文よりも、短いカンマ区切りの名詞句タグの方が安定しやすい。
- **Cover / Sample / Inspo は別物として扱う**
  - Cover が逸脱するなら Sample 全尺、メロディ固定なら Inspo 複数テイク、という切り分けが重要。
- **Audio Influence は 25% 起点で探る**
  - いきなり高くせず、`25%` から `+5%` 刻みで上げる。
  - `75%` 超は副作用が出やすいため非推奨。
- **スライダーは赤域を避ける**
  - Weirdness / Style Influence / Audio Influence は `15-85` を安全帯として扱う。
- **Voices 使用時は Style を削る**
  - 声質や楽器の説明を Style に盛りすぎると、Voice 条件付けと衝突しやすい。
- **歌詞は 6-12 音節/行を基本にする**
  - 長すぎる行や密度差のないセクションは、Suno の歌唱で崩れやすい。

## このマニュアルの立場

本リポジトリは、情報を次の2系統で整理しています。

- **公式情報**
  - Suno の公式ブログ、ヘルプ、FAQ。
- **コミュニティ情報**
  - Reddit などで複数報告があるものを優先。
  - 公式保証ではないため、再現性や副作用は文脈依存。

つまり、ここに書いてある内容は「全部が絶対解」ではありません。  
ただし、少なくとも「どこを触ると変わるか」「何を避けると壊れにくいか」は、かなり実務向けに整理してあります。

## 推奨ワークフロー

### A. 新曲を作る

1. `SunoV5_Prompt_MASTER_REFERENCE.md` で Style / Lyrics / Exclude の役割を確認
2. `agent/suno_flow_generate.md` の出力構造に沿って組み立てる
3. 必要なら Double-Layer で Style と Lyrics を分離する

### B. 既存曲の雰囲気を抽出する

1. `agent/suno_flow_style_extract.md` を使う
2. 楽曲のジャンル、テンポ、ムード、楽器、ミックスを抽出
3. アーティスト名ではなく、音の特徴に還元して Style に落とす

### C. Cover / Sample / Inspo を使う

1. まず Cover を試す
2. 後半で逸脱するなら Sample 全尺に切り替える
3. メロディ保持が必要なら Inspo 複数テイクを使う
4. 金属声や歯擦音が出たら Remaster(Subtle) を検討する

### D. 歌詞専用 GPT を使う

1. `customgpt-lyrics/README.md` の手順で GPT を組む
2. 6-12 音節、句読点リズム、フォネティック修正のルールを反映させる

## ファイル構成

```text
sunomanual/
├── README.md
├── SunoV5_Prompt_MASTER_REFERENCE.md
├── agent/
│   ├── suno_flow_album.md
│   ├── suno_flow_generate.md
│   ├── suno_flow_remix.md
│   ├── suno_flow_rewrite.md
│   ├── suno_flow_style_extract.md
│   └── suno_flow_translate.md
├── customgpt/
│   ├── README.md
│   ├── instructions.md
│   └── knowledge/
└── customgpt-lyrics/
    ├── README.md
    ├── instructions.md
    └── knowledge/
```

## 注意事項

- Suno の仕様は更新されるため、特に V5.5 周辺の UI やパラメータは今後も変わり得ます。
- コミュニティ技法は「効く場面」と「壊す場面」が両方あります。必ず小さく試してください。
- 著作権保護の観点から、アーティスト名や曲名の直接指定ではなく、音響的特徴の言語化を推奨します。

## License

Created by **usedhonda**  
Licensed under **CC BY-NC 4.0**

## Version History

### 3.1.0 (2026-03-28)
- README を公開向けに全面整理
- V5.5 音声条件付けワークフローを反映
- Cover / Sample / Inspo の使い分けを導線に追加
- Custom GPT 用 README への導線を整理

### 3.0.0 (2026-03-27)
- V5.5 対応
- Voices / Custom Models / My Taste を反映
- Style タグ形式とアノテーションタグを整理

### 2.0.0
- AI エージェント横断で使える構成に再編

### 1.0.0
- 初回公開
