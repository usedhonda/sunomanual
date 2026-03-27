# Suno Style Analyzer V5.5 — CustomGPT セットアップ

## 概要

YouTube URLから楽曲スタイルを解析し、Suno AI V5.5向けプロンプトを自動生成するカスタムGPT。

**2つの使い方:**
- **URLのみ** → Style Block + Exclude Block + 推奨スライダー
- **URL + 歌詞** → 上記 + 歌詞フォーマット変換（漢字→ひらがな、アノテーションタグ付加）

## セットアップ手順

### 1. GPT を作成

1. [ChatGPT](https://chatgpt.com) にアクセス
2. 左サイドバー → **Explore GPTs** → **Create**
3. **Configure** タブに切り替え

### 2. 基本設定

| 項目 | 値 |
|------|-----|
| **Name** | Suno Style Analyzer V5.5 |
| **Description** | YouTube URLから楽曲スタイルを解析しSuno V5.5向けプロンプトを生成。歌詞を添えればフォーマット変換も。 |

### 3. Instructions

`instructions.md` の**全内容**をコピーして、Instructions 欄に貼り付け。

### 4. Knowledge

以下の2ファイルを **Knowledge** にアップロード:

1. `knowledge/suno_v55_reference.md`
2. `knowledge/style_catalog.md`

### 5. Capabilities

| 機能 | 設定 |
|------|------|
| **Web Search** | ON（必須） |
| **DALL-E** | OFF |
| **Code Interpreter** | OFF |

### 6. 保存

**Save** → **Only me**（個人利用）または **Anyone with a link**（共有）

## 使い方

### パターンA: URLのみ
```
https://www.youtube.com/watch?v=xxxxx
```

### パターンB: URL + 歌詞
```
https://www.youtube.com/watch?v=xxxxx

[Verse 1]
街の灯りがゆれている
風が頬をなでる

[Chorus]
走り出せ今すぐに
夢の先へ

[Bridge]
立ち止まっていた日々も
今は力になる

[Outro]
走り出せ
```

## ファイル構成

```
customgpt/
├── README.md              ← このファイル
├── instructions.md        ← GPT Instructions に貼る
└── knowledge/
    ├── suno_v55_reference.md  ← Knowledge にアップロード
    └── style_catalog.md       ← Knowledge にアップロード
```
