---
task: generate
trigger_keywords: ["新曲", "曲を作って", "プロンプトを作って", "create", "generate", "compose"]
reference: "../SunoV5_Prompt_MASTER_REFERENCE.md"
output_format: "yaml+lyrics"
---

# 🎧 Suno 新曲生成フロー仕様書（suno_flow_generate.md）

## 🧭 概要
この仕様書は、Suno V5を用いて新しい楽曲のプロンプトを生成するためのエージェント実行フローを定義する。  
ChatGPTは本仕様書および `SunoV5_Prompt_MASTER_REFERENCE.md` を読み込み、  
マニュアル準拠のYAML形式プロンプトを生成したうえで、エージェントによりSuno公式サイトへ自動入力を行う。

---

## 📘 基本構造
生成されるプロンプトは以下のブロック構造を持つ：

```yaml
# === Suno V5 Prompt ===
meta:
  style: [ジャンル, テンポ, 雰囲気, 参考曲など]
  language: [主言語, サブ言語]
  keywords: [主題語句・感情ワード]
  reference_url: [必要に応じてYouTubeやSpotifyのURL]

structure:
  intro: [楽器構成, 雰囲気, ハーモニーの特徴]
  verse: [グルーヴ・展開・リズム感]
  chorus: [盛り上がり方, コード感, サビの特徴]
  bridge: [変化, ブレイク, テンポシフトなど]
  outro: [エンディングの方向性]

lyrics:
  language: auto
  structure: [Intro, Verse, Chorus, Bridge, Outro]
  content: |
    [ここに歌詞本文が入る。日本語・英語・混成自由]
