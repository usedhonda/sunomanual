# 🎶 Suno Manual – Unified Reference for AI Prompt & Agent Automation

Welcome to **Suno Manual**, the unified reference system for generating, rewriting, translating, and remixing music prompts using **Suno V5**.  
このリポジトリは、Sunoのプロンプトを正確に構成するための**統一ガイドライン**です。

---

## 🧩 導入方法（これをコピペするだけ）

このマニュアルを使う準備はとても簡単です。  
ChatGPTなどのAIに、次の内容をそのままコピペしてください👇

---

### 🎯 ChatGPTなどに貼り付ける文

~~~text
以下のURLにある「Suno Manual」を参照して、すべてのSuno V5プロンプト生成を行ってください。  
このマニュアルは常に最新のルール・禁止語・フォーマットを定義しています。  
URL: https://github.com/usedhonda/sunomanual/blob/main/README.md  

私が「Sunoで曲を作って」「Style解析して」「この曲をリライトして」などと言ったら、  
まずこのマニュアルを読み込んでから実行してください。
~~~

---

### 💡 使い方の例

> Sunoで夜のシティポップを作って  
→ マニュアルを参照してYAML構造の正しいプロンプトを生成。  

> Style解析して  
→ YouTubeやSpotifyの情報を自動で解析し、SunoのStyle欄に貼れる形式で出力。  

> この曲を英語で歌いやすくして  
→ 翻訳と音節最適化をマニュアルに沿って実施。

---

これで準備完了です。  
以後あなたが何を依頼しても、AIは自動的に最新のSunoマニュアルを読み込みます。  
複数のAI（ChatGPT、Claude、Cursorなど）でも同じコピペで利用可能です。

---

## 📘 File Structure

```
/sunomanual/
 ├── README.md
 ├── SunoV5_Prompt_MASTER_REFERENCE.md
 └── /agent/
     ├── suno_flow_generate.md
     ├── suno_flow_rewrite.md
     ├── suno_flow_translate.md
     ├── suno_flow_remix.md
     ├── suno_flow_album.md
     └── suno_flow_style_extract_search.md
```

---

## ⚙️ How It Works (AI Perspective)

1. `SunoV5_Prompt_MASTER_REFERENCE.md` を読み込み、ルールと禁止語を取得。  
2. 指示内容に応じて `/agent/suno_flow_*.md` の仕様書を参照。  
3. 両者を統合して構文的に正しいYAMLプロンプトを生成。  
4. AgentモードではSuno公式サイトに自動入力。

---

## 🧠 Design Philosophy

- **Single Source of Truth** — 常にGitHub上の最新版のみを使用。  
- **AI-Friendly Markdown** — 機械にも人にも読みやすい構成。  
- **Open Collaboration** — 誰でもフォークや拡張が可能。  
- **Automatic Sync** — ChatGPTやAgentは常に最新版を取得。

---

## 🚀 Example

| 入力 | 使用ファイル | 出力 |
|------|---------------|------|
| 「Sunoで夜のR&B曲を作って」 | MASTER + generate.md | YAMLプロンプト＋歌詞 |
| 「この曲をリライトして」 | MASTER + rewrite.md | 新しい歌詞構造 |
| 「英語で歌いやすくして」 | MASTER + translate.md | 音節最適化された英語歌詞 |
| 「この曲をリミックス」 | MASTER + remix.md | リミックス構成 |
| 「このテーマで5曲まとめて」 | MASTER + album.md | アルバム構成5曲分 |

---

## 🪄 Versioning

各ファイルには以下のヘッダーを含みます。

```yaml
version: 1.0.0
last_updated: YYYY-MM-DD
```

---

## 📜 License & Credit

Created by **Yuzuru Honda (Anison-labs / FreakOut Holdings)**  
Licensed under **CC BY-NC 4.0**（表示—非営利）

---

> 🧠 **要約**：  
> このREADMEを最初に読むだけで、Suno V5のすべての自動生成ルールと使用方法がわかります。