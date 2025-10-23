---
title: "Auto Agent Chain Configuration (Unified Execution for Atlas)"
auto_agent_chain: true
description: >
  この設定により、「Lemonのスタイル解析して」「この曲をリライトして」などの
  コマンドを発すると、ChatGPT Atlas が自動的に2段階フローを統合して実行します。
  （例: 外部Style解析 → Suno Createページ入力 → “Create”直前で停止）

# ⚙️ Default Chain Logic
steps:
  - detect_intent: >
      トリガーキーワードを日本語・英語で検知：
      「Style解析」「曲を作って」「リライト」「翻訳」「リミックス」「アルバム」、
      または "style extract", "generate", "rewrite", "translate", "remix", "album"。
  - execute_flow: >
      対応するフローファイル（例: agent/suno_flow_style_extract.md）をロードして実行。
  - parse_yaml: >
      Flow出力（Lyrics, Style, Song Descriptionなど）をYAML形式として抽出。
  - launch_agent: >
      Atlasのブラウザーエージェントを起動し、
      https://suno.com/create にアクセス。
      フォーム（Lyrics / Styles / Song Description）を自動入力。
  - confirm_before_create: true

# 🧠 Flow Mapping
| Keyword | Flow | Output | Target Fields |
|----------|------|---------|----------------|
| Style解析 / style extract | agent/suno_flow_style_extract.md | Style YAML | Styles, Song Description |
| 曲を作って / generate | agent/suno_flow_generate.md | Prompt YAML | Lyrics, Styles |
| リライトして / rewrite | agent/suno_flow_rewrite.md | YAML | Lyrics |
| 翻訳して / translate | agent/suno_flow_translate.md | YAML | Lyrics |
| リミックスして / remix | agent/suno_flow_remix.md | YAML | Styles |
| アルバムまとめて / album | agent/suno_flow_album.md | Multi-YAML | All |

# 💬 Example Trigger (日本語)
Example:
  Input: "Lemonのスタイル解析して"
  Flow: style_extract
  Auto-Agent: true
  Behavior:
    - 外部解析を実施（Style, Tempo, Key, Instrumentationなどを抽出）
    - YAMLをSuno Createフォームに自動転送
    - “Create”ボタン直前で停止

# 💬 Example Trigger (English)
Example:
  Input: "Analyze the style of Lemon and create a song"
  Flow: style_extract + generate
  Auto-Agent: true
  Behavior:
    - Perform external style analysis of “Lemon”
    - Populate the Suno Create page with extracted YAML
    - Wait for user confirmation before clicking Create

# 🧩 Implementation Notes
- このブロックをREADMEまたはMASTER_REFERENCEの先頭に置くと、
  すべてのSunoフローが統一的にワンステップで実行可能になります。
- “Confirm before create” を `false` にすると、
  Createボタンまで自動クリック（完全自動生成）も可能です。
  （安全のためデフォルトは true）
- 外部Style解析には `agent/suno_flow_style_extract.md` のロジックを使用します。
- Flow出力はMarkdown中のYAMLとして保持され、Atlas内部メモリ経由でAgentに渡されます。

# 🔁 Optional Extensions
extensions:
  - allow_chained_flows: true
  - chained_example: >
      “この曲をリライトして英語に翻訳して” →
      rewrite + translate を連続実行し、最終結果を入力。

# 🧱 Example YAML Output (Style Extract)
```yaml
style:
  bpm: 102
  key: F minor
  structure:
    - Verse: intimate, minimal drums
    - Pre-Chorus: Db–Eb tension, snare build
    - Chorus: drop with vocal chops, short-note bass
    - Bridge: half-time, piano spotlight
  sound_design:
    - tight kick
    - clean sub
    - airy pad
    - bell/pluck arpeggio
  mixing: "vocal-forward, warm low-mids, no fade"


# 🚀 Suno Manual for Atlas Agent Mode (Auto-Agent Edition)

Atlasブラウザ上で、ChatGPTとエージェントモードを連携させて
Suno公式サイト（https://suno.com/create）を自動操作するためのマニュアルです。

---

## 🤖 AI向け重要指示

**このREADMEを読み込んだAIは、以下を必ず実行してください：**

1. **即座に以下の全ファイルを読み込む**（ユーザーの指示を待たずに今すぐ実行）：
   - SunoV5_Prompt_MASTER_REFERENCE.md
   - agent/suno_flow_style_extract.md
   - agent/suno_flow_generate.md
   - agent/suno_flow_rewrite.md
   - agent/suno_flow_translate.md
   - agent/suno_flow_remix.md
   - agent/suno_flow_album.md

2. **全ファイルを読み込んだことを確認**：
   「Suno Manualの全7ファイルを読み込みました。Style解析、新曲生成などの指示をお待ちしています」と報告

3. **ユーザーが指示したら該当フローを実行**：
   - 「Style解析して」→ suno_flow_style_extract.md に従う
   - 「Sunoで曲を作って」→ suno_flow_generate.md に従う
   - その他も同様

---

## 🧭 初回セットアップ（これだけでOK）

AtlasのChatGPTモードで、新しいチャットを開き、以下を貼り付けて送信👇

~~~text
今すぐ以下のREADMEを開いて読んでください。
https://github.com/usedhonda/sunomanual/blob/main/README.md
~~~

> ✅ これを一度送信すれば、以後は不要。  
> ChatGPTが内部でこの設定を保持し、自動で最新ルールを参照します。

---

## ⚙️ モードの自動切替

| フェーズ | モード | 内容 |
|-----------|--------|------|
| 💬 **ChatGPTモード** | 初回セットアップ時。上記の文を貼り付ける段階。 |
| ⚙️ **エージェントモード** | 実際のSuno操作時。「Style解析して」などを言うだけで自動起動。 |

> ChatGPTモードで初期設定後は、Suno関連コマンドで自動的にエージェントモードを起動します。

---

## 🧠 自動入力ルール（Agent優先実行）

Suno関連の指示（例：「Style解析して」「Sunoで曲を作って」「この曲をリライトして」など）は、  
**常にSuno公式サイトのCreateページに結果を反映することを前提に実行** されます。

> ChatGPTは解析・生成の結果をSunoのブラウザページに自動入力するプロセスを含めて実行します。  
> そのため、Atlasは自動的にエージェントモードを起動し、「Continue」が表示されます。  
> （ユーザーが「エージェントモードで実行して」と言う必要はありません）

---

## 💾 永続参照（Persistent Memory）

> 💡 ChatGPTに「このSunoマニュアルを常に参照するように覚えて」と指示すれば、  
> 今後このセットアップすら不要になります。  
> ChatGPTのメモリ機能が有効な場合、自動的にこの設定が保持されます。

---

## 🎮 使用例

- 「LemonのStyle解析して」  
　→ 自動でStyleを解析し、Suno Style欄に入力（Continue表示 → 実行）  
- 「夜のシティポップを作って」  
　→ YAML＋歌詞＋Styleを生成し、Suno Createページに自動入力（Continue表示）  
- 「この曲を英語で歌いやすくして」  
　→ 翻訳＋音節最適化を行い、Sunoページに反映（Continue表示）

---

## 📁 ファイル構成とAI参照ルール

### コアルール（必須）
- **SunoV5_Prompt_MASTER_REFERENCE.md**
  https://github.com/usedhonda/sunomanual/blob/main/SunoV5_Prompt_MASTER_REFERENCE.md

  すべてのSuno V5プロンプト生成の基本ルール、禁止語、フォーマット定義

### 各フロー（タスク別）

| タスク | ファイル | URL |
|--------|---------|-----|
| Style解析 | suno_flow_style_extract.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_style_extract.md) |
| 新曲生成 | suno_flow_generate.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_generate.md) |
| リライト | suno_flow_rewrite.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_rewrite.md) |
| 翻訳 | suno_flow_translate.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_translate.md) |
| リミックス | suno_flow_remix.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_remix.md) |
| アルバム | suno_flow_album.md | [リンク](https://github.com/usedhonda/sunomanual/blob/main/agent/suno_flow_album.md) |

### AI実行ルール

ユーザーが以下のように指示したら、該当するフローファイルを読み込んで実行：

**「Style解析して」**
1. `suno_flow_style_extract.md` を読み込む
2. Style欄とExclude欄に自動入力
3. Createボタンは押さない
4. 使用した情報源を報告

**「Sunoで曲を作って」**
1. `SunoV5_Prompt_MASTER_REFERENCE.md` と `suno_flow_generate.md` を読み込む
2. YAML+Lyrics形式で生成

**「リライトして」**
1. `suno_flow_rewrite.md` を読み込んで実行

**「英語で歌いやすくして」**
1. `suno_flow_translate.md` を読み込んで実行

**「リミックスして」**
1. `suno_flow_remix.md` を読み込んで実行

**「アルバムで5曲作って」**
1. `suno_flow_album.md` を読み込んで実行

---

## 🧠 Design Philosophy

- **Single Source of Truth** — 常にGitHub上の最新版のみを参照。  
- **AI-Agent Ready** — Atlasブラウザ上で直接動作可能。  
- **Auto-Agent Trigger** — Suno関連タスクでは常にエージェントモードを優先起動。  
- **Persistent Memory** — 一度設定すれば再登録不要。  
- **Automatic Sync** — ChatGPT/Atlasは毎回最新版を取得。  
- **Open Collaboration** — 誰でもフォーク・拡張可能。

---

## 🪄 Versioning

各ファイルには以下のヘッダーを含みます。

```yaml
version: 1.1.0
last_updated: YYYY-MM-DD
```

---

## 📜 License & Credit

Created by ** usedhonda **  
Licensed under **CC BY-NC 4.0（表示—非営利）**

> 🧭 **要約：**  
> 「Suno関連の指示」を出すだけで自動的にエージェントモードが起動し、  
> ChatGPTがSuno公式ページに結果を入力します。