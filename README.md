---
title: "Suno AI V5 Prompt Manual - Universal AI Agent Edition"
version: "2.0.0"
last_updated: 2025-01-24
description: >
  Universal prompt generation manual for Suno AI V5.
  Compatible with any AI agent (ChatGPT, Claude, Gemini, etc.)
  Supports style extraction, generation, rewrite, translation, remix, and album flows.
---

# 🎵 Suno AI V5 Prompt Manual

**あらゆるAIエージェント対応版** — ChatGPT、Claude、Gemini、その他のAIで使えるSuno V5プロンプト生成マニュアル

---

## 🤖 AI向け重要指示

**このREADMEを読み込んだAIエージェントは、以下を必ず実行してください：**

### 1️⃣ 即座に全ファイルを読み込む（確認不要、今すぐ実行）

以下の全ファイルを**ユーザーの指示を待たずに今すぐ読み込んでください**：

1. **SunoV5_Prompt_MASTER_REFERENCE.md**
   https://github.com/usedhonda/sunomanual/blob/main/SunoV5_Prompt_MASTER_REFERENCE.md

2. **agent/suno_flow_style_extract.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_style_extract.md

3. **agent/suno_flow_generate.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_generate.md

4. **agent/suno_flow_rewrite.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_rewrite.md

5. **agent/suno_flow_translate.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_translate.md

6. **agent/suno_flow_remix.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_remix.md

7. **agent/suno_flow_album.md**
   https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_album.md

### 2️⃣ 読み込み完了を報告

全ファイルを読み込んだら、以下のメッセージをユーザーに送信：

```
✅ Suno AI V5 Manual の全7ファイルを読み込みました。

【利用可能な機能】
- Style解析 (style_extract)
- 新曲生成 (generate)
- 歌詞リライト (rewrite)
- 多言語翻訳 (translate)
- リミックス (remix)
- アルバム制作 (album)

ご指示をお待ちしています。
```

### 3️⃣ ユーザー指示に応じてフロー実行

ユーザーが以下のような指示を出したら、該当するフローファイルに従って実行：

| ユーザー指示例 | 実行フロー | 参照ファイル |
|--------------|----------|------------|
| 「Lemonのスタイル解析して」 | Style Extract | suno_flow_style_extract.md |
| 「夜のシティポップを作って」 | Generate | suno_flow_generate.md |
| 「この歌詞をリライトして」 | Rewrite | suno_flow_rewrite.md |
| 「英語で歌いやすくして」 | Translate | suno_flow_translate.md |
| 「EDMリミックスして」 | Remix | suno_flow_remix.md |
| 「5曲のアルバムを作って」 | Album | suno_flow_album.md |

---

## 👤 ユーザー向けセットアップ

### 初回セットアップ（全AIエージェント共通）

使用するAIエージェント（ChatGPT、Claude、Gemini等）で、以下のテキストを送信するだけ：

```text
今すぐ以下のREADMEを開いて読んでください。
https://github.com/usedhonda/sunomanual/blob/main/README.md
```

> ✅ **これだけでOK**
> AIが自動的に全ファイルを読み込み、Suno V5プロンプト生成が可能になります。

---

## 🎮 使用例

### Style解析
```
ユーザー: 「米津玄師のLemonのスタイルを解析して」
AI: Style解析を実行 → Style欄とExclude欄のテキストを生成 → 出力
```

### 新曲生成
```
ユーザー: 「夜のシティポップを作って」
AI: YAML形式でプロンプト生成 → Lyrics、Style、Song Descriptionを出力
```

### 歌詞リライト
```
ユーザー: 「この歌詞をもっと感情的にして」
AI: 元の歌詞を解析 → リライト → 新しい歌詞を出力
```

### 多言語翻訳
```
ユーザー: 「この日本語の歌詞を英語で歌いやすくして」
AI: 音節数を考慮した翻訳 → 英語歌詞を出力
```

### リミックス
```
ユーザー: 「この曲をEDMリミックスして」
AI: EDMスタイルのプロンプトを生成 → 出力
```

### アルバム制作
```
ユーザー: 「冬をテーマに5曲のアルバムを作って」
AI: 5曲分のプロンプトを生成 → 各曲のYAMLを出力
```

---

## 🧠 各AIエージェントでの使用方法

### ChatGPT（Atlas Browser Mode対応）

**特徴**: Suno.comに直接自動入力可能

1. 上記のREADME URLを送信
2. 「Lemonのスタイル解析して」などと指示
3. ChatGPTが自動的にSuno.comのCreate画面を開いて入力
4. ユーザーは「Create」ボタンを押すだけ

> ⚙️ **Atlas Agentモード**が自動起動し、ブラウザ操作を代行します

---

### Claude（Code / Projects対応）

**特徴**: 詳細なYAML出力とファイル管理

1. 上記のREADME URLを送信（または直接ファイルを添付）
2. 「夜のシティポップを作って」などと指示
3. ClaudeがYAML形式でプロンプトを生成
4. 出力をコピーしてSuno.comに手動で貼り付け

> 📋 **構造化された出力**が得られ、ファイルとして保存も可能

---

### Gemini（Google AI Studio対応）

**特徴**: マルチモーダル対応

1. 上記のREADME URLを送信
2. 画像や動画を添付して「このMVの雰囲気で曲を作って」などと指示
3. Geminiがマルチモーダル情報を解析してプロンプト生成
4. 出力をSuno.comに手動で貼り付け

> 🖼️ **画像・動画からのスタイル抽出**が可能

---

### その他のAIエージェント

**Perplexity、Poe、OpenRouter等**でも同様に使用可能：

1. README URLを送信
2. Suno関連の指示を出す
3. 生成されたYAMLをSuno.comにコピー&ペースト

---

## 📁 ファイル構成

```
sunomanual/
├── README.md（このファイル）
├── SunoV5_Prompt_MASTER_REFERENCE.md（コアルール）
└── agent/
    ├── suno_flow_style_extract.md（Style解析フロー）
    ├── suno_flow_generate.md（新曲生成フロー）
    ├── suno_flow_rewrite.md（リライトフロー）
    ├── suno_flow_translate.md（翻訳フロー）
    ├── suno_flow_remix.md（リミックスフロー）
    └── suno_flow_album.md（アルバム制作フロー）
```

---

## 🎯 Design Philosophy

### Single Source of Truth
- GitHub上の最新版のみを参照
- ローカルコピーは不要

### AI-Agnostic
- 特定のAIエージェントに依存しない
- ChatGPT、Claude、Gemini等すべてで動作

### Auto-Loading
- README読み込みだけで全機能が使える
- 複雑なセットアップ不要

### Universal Output
- YAML形式での標準化された出力
- どのAIでも同じフォーマット

### Collaborative
- オープンソース
- 誰でもフォーク・拡張可能

---

## 🔄 フロー実行の基本ルール（全AI共通）

### Style Extract（スタイル解析）
1. 楽曲情報を収集（Wikipedia、Spotify、YouTube等）
2. Style欄用のテキスト生成（最大1000文字）
3. Exclude欄用のテキスト生成（カンマ区切り）
4. **重要**: Style欄とExclude欄は**完全に独立した別の入力欄**
5. 使用した情報源を報告

### Generate（新曲生成）
1. MASTER_REFERENCEに従ってプロンプト生成
2. YAML形式で出力（Lyrics、Style、Song Description）
3. メタタグ、楽器指定、禁止語回避を含む

### Rewrite（リライト）
1. 元の歌詞を解析
2. 指定された方向性（感情的、シンプル等）でリライト
3. 音節数とリズムを維持

### Translate（翻訳）
1. 元の歌詞の音節数を分析
2. ターゲット言語で歌いやすい翻訳
3. 韻律とリズムを最優先

### Remix（リミックス）
1. 元曲のStyleを分析
2. 指定されたジャンルに変換
3. 新しいStyleブロックを生成

### Album（アルバム制作）
1. テーマに沿った複数曲を生成
2. 各曲のコンセプトを統一
3. 曲順とトラック番号を含む

---

## ⚙️ YAML出力フォーマット（全フロー共通）

```yaml
# Suno V5 Prompt
title: "曲のタイトル"
style: "Genre/Subgenre; BPM; Key; Mood; Instruments"
song_description: "曲の説明"
exclude_style: "除外要素1, 除外要素2, 除外要素3"

lyrics: |
  [Intro: meta.vibe]
  Verse lyrics here

  [Verse]
  More lyrics

  [Chorus]
  Chorus lyrics

  [Outro]
```

---

## 🚨 重要な注意事項（全AI共通）

### Style欄とExclude欄の分離
- **絶対禁止**: Exclude要素をStyle欄に含めない
- Style欄とExclude欄は**完全に独立した別の入力欄**
- Suno.comのAdvanced Optionsを展開してExclude欄を表示

### 情報源の透明性
- 使用した情報源（Wikipedia、Spotify等）を必ず報告
- URLを含めて明示

### 禁止語の回避
- MASTER_REFERENCEの禁止語リストを厳守
- 著作権侵害のリスクを回避

### メタタグの正しい使用
- `[meta.vibe]`、`[meta.mood]`等を適切に配置
- 最初の20-30語が最も影響力が大きい

---

## 🔗 関連リンク

- **Suno公式サイト**: https://suno.com
- **Suno Create**: https://suno.com/create
- **GitHub Repository**: https://github.com/usedhonda/sunomanual
- **Jack Righteous Guide**: https://www.reddit.com/r/SunoAI/comments/1d0mh5b/
- **Suno Wiki**: https://sunoaiwiki.com

---

## 📜 License & Credit

Created by **usedhonda**
Licensed under **CC BY-NC 4.0（表示—非営利）**

> 🧭 **要約：**
> このマニュアルは非営利目的で自由に使用・改変可能です。
> 営利利用には著作者の許可が必要です。

---

## 🆕 Version History

### 2.0.0 (2025-01-24)
- **全面リニューアル**: Atlas専用からユニバーサルAIエージェント対応に変更
- ChatGPT、Claude、Gemini等すべてのAIで使用可能
- AI向け自動読み込み指示を追加
- 各AIエージェントごとの使用方法を明記

### 1.1.0
- Atlas Auto-Agent機能追加
- Style/Exclude欄の分離強化

### 1.0.0
- 初回リリース

---

**🎵 さあ、あなたの使うAIエージェントでSuno V5プロンプトを生成しましょう！**
