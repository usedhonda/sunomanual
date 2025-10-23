# 🚀 Suno Manual for Atlas Agent Mode (Auto-Agent Edition)

Atlasブラウザ上で、ChatGPTとエージェントモードを連携させて  
Suno公式サイト（https://suno.com/create）を自動操作するためのマニュアルです。

---

## 🧭 初回セットアップ（これだけでOK）

AtlasのChatGPTモードで、新しいチャットを開き、以下を貼り付けて送信👇

~~~text
以下のURLにある「Suno Manual」を参照して、すべてのSuno V5プロンプト生成を行ってください。  
URL: https://github.com/usedhonda/sunomanual/blob/main/README.md  

私が「Sunoで曲を作って」「Style解析して」「この曲をリライトして」などと言ったら、  
まずこのマニュアルを読み込んでから実行してください。
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

## 📁 構成

```
/sunomanual/
 ├── README_Atlas_AutoAgent.md（本ファイル）
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