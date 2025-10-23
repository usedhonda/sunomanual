# 🎶 Suno Manual – AI プロンプト & エージェント自動化のための統合リファレンス

**Suno Manual** へようこそ。**Suno V5** を使用した音楽プロンプトの生成、リライト、翻訳、リミックスのための統合リファレンスシステムです。

このリポジトリは、**人間のクリエイター**と **AIアシスタント（ChatGPT エージェントモード等）**の両方が、一貫性のあるマニュアル準拠の Suno プロンプトを自動生成できるよう設計されています。

---

## 🧭 概要

このプロジェクトは、**Suno の音楽プロンプト生成時に AI がどう考えるべきか**を定義します。
このドキュメントを最初に読むことで、AIアシスタント（または人間の協力者）は以下を理解できます：

- すべての Suno プロンプトが従うべきルール
- 各サブフロー（generate / rewrite / translate / remix / album）の動作
- 常に最新のマニュアルを参照する方法

---

## 📘 ファイル構造

```
/sunomanual/
 ├── SunoV5_Prompt_MASTER_REFERENCE.md   # コアルール（常に最初に取得）
 └── /agent/
     ├── suno_flow_generate.md           # 新曲生成
     ├── suno_flow_rewrite.md            # 再解釈・リライト
     ├── suno_flow_translate.md          # 歌詞翻訳・音節マッチング
     ├── suno_flow_remix.md              # リミックス・リアレンジ
     ├── suno_flow_album.md              # 複数曲（アルバム）生成
     └── suno_flow_style_extract.md      # 参照トラックからスタイル抽出
```

---

## ⚙️ 動作の仕組み（AI の視点）

ユーザーが以下のように言った場合：

> "Sunoで90年代アニメ風の曲を作って"
> "Sunoでこの曲をリライトして"
> "Suno用に英語版を作って"

AIエージェントは自動的に以下を実行します：

1. **最新版を取得**
   `SunoV5_Prompt_MASTER_REFERENCE.md`
   （すべての構文、タグ、禁止ワードを定義）

2. **タスクタイプを識別**
   - 「新曲」または "create" → `suno_flow_generate.md` を使用
   - 「リライト」→ `suno_flow_rewrite.md` を使用
   - 「英訳」または "translate" → `suno_flow_translate.md` を使用
   - 「リミックス」→ `suno_flow_remix.md` を使用
   - 「アルバム」→ `suno_flow_album.md` を使用
   - 「スタイル抽出」または "style extract" → `suno_flow_style_extract.md` を使用

3. **ルールをマージ**
   マスターリファレンス + 該当するフローファイル

4. **構造化された YAML プロンプトを生成**
   （エージェントモードの場合）自動的に [Suno.com](https://suno.com) を開いてフローを実行

---

## 🧠 設計思想

- **単一の真実の源（Single Source of Truth）:**
  すべての更新は GitHub で行われる — ローカルコピーやキャッシュされたプロンプトは不要
- **AI フレンドリーな構造:**
  Markdown ファイルは機械可読・人間可読の両方に対応
- **オープンコラボレーション:**
  誰でもフォーク・編集し、新しいプロンプトスタイルやフロー仕様を PR 可能
- **自動バージョン同期:**
  ChatGPT エージェントは実行時に常に最新の Markdown ファイルを取得

---

## 🚀 使い方

### 🧍 人間のユーザー向け

1. `/agent/suno_flow_generate.md` または必要なフローを開く
2. 記載された YAML + Lyrics 構造に従う
3. 生成したプロンプトを [Suno V5](https://suno.com) に貼り付ける

### 🤖 AI / ChatGPT ユーザー向け

1. 常にこの README を最初に読む
2. `SunoV5_Prompt_MASTER_REFERENCE.md` を取得
3. 該当する `/agent/suno_flow_*.md` を特定
4. マージ・生成し、（エージェントモードの場合）Suno.com で操作を実行

---

## 🧩 AI プロンプト動作の例

| ユーザー入力 | 読み込むファイル | 出力 |
|-------------|----------------|---------|
| "Sunoで夜のR&B曲を作って" | MASTER + generate.md | YAML プロンプト + 歌詞 |
| "この曲をSunoでリライト" | MASTER + rewrite.md | 変更された歌詞・構造 |
| "英語で歌いやすくして" | MASTER + translate.md | 音節調整された英語版 |
| "この曲をリミックスにして" | MASTER + remix.md | 新しいアレンジのリミックスプロンプト |
| "このテーマで5曲まとめて" | MASTER + album.md | 一貫性のあるテーマで5つのYAMLブロック |
| "この曲のスタイルを抽出して" | MASTER + style_extract.md | 参照トラックから抽出されたスタイルプロンプト |

---

## 🪄 バージョン管理

各ファイルにはヘッダーが含まれます：

```yaml
version: 1.0.0
last_updated: YYYY-MM-DD
```

AIシステムは GitHub API または直接取得により、常に **最新のコミットタイムスタンプ** を確認する必要があります。

---

## 📜 ライセンス & クレジット

Created by **usedhonda**
AI × 音楽制作におけるオープンコラボレーションのために

Licensed under **Creative Commons BY-NC 4.0**
（表示 - 非営利のみ）

---

> 🧠 **要約:**
> AI でも人間でも、まずこの README を読んでください。
> どう振る舞うべきか、次に何を読むべきか、そして完璧な Suno V5 プロンプトの作り方が分かります。
