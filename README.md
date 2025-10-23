# 🚀 Suno Manual for Atlas Agent Mode (Auto-Agent Edition)

Atlasブラウザ上で、ChatGPTとエージェントモードを連携させて  
Suno公式サイト（https://suno.com/create）を自動操作するためのマニュアルです。

---

## 🧭 初回セットアップ（これだけでOK）

AtlasのChatGPTモードで、新しいチャットを開き、以下を貼り付けて送信👇

~~~text
以下のREADMEを読み込んで、記載されている全てのファイルリンクも一緒に読み込んでください。
https://github.com/usedhonda/sunomanual/blob/main/README.md

READMEには以下のファイルへのリンクがあります。これらを全て今すぐ読み込んでください：
1. SunoV5_Prompt_MASTER_REFERENCE.md（コアルール）
2. agent/suno_flow_style_extract.md（Style解析）
3. agent/suno_flow_generate.md（新曲生成）
4. agent/suno_flow_rewrite.md（リライト）
5. agent/suno_flow_translate.md（翻訳）
6. agent/suno_flow_remix.md（リミックス）
7. agent/suno_flow_album.md（アルバム）

これらを全て読み込んだ後、私が「Style解析して」「Sunoで曲を作って」などと言ったら、該当するフローに従って実行してください。
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

Created by **Yuzuru Honda (Anison-labs / FreakOut Holdings)**  
Licensed under **CC BY-NC 4.0（表示—非営利）**

> 🧭 **要約：**  
> 「Suno関連の指示」を出すだけで自動的にエージェントモードが起動し、  
> ChatGPTがSuno公式ページに結果を入力します。