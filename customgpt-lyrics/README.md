# Suno Lyrics Writer V5.5 — CustomGPT セットアップ

## 概要

少ない指示から Suno AI V5.5 対応の歌詞を自動生成するカスタムGPT。

- 「夏の終わりの切ない恋」→ 完全な歌詞（セクションタグ＋アノテーション付き）
- 曲構成を8パターン内蔵（Pop / Ballad / EDM / Rock / Hip Hop 等）
- 漢字→ひらがな自動変換済み
- そのままSunoに貼れるフォーマット

## セットアップ

### 1. GPT を作成

ChatGPT → Explore GPTs → Create → Configure

### 2. 基本設定

| 項目 | 値 |
|------|-----|
| **Name** | Suno Lyrics Writer V5.5 |
| **Description** | テーマを伝えるだけでSuno V5.5対応の歌詞を生成。セクションタグ・アノテーション付き。 |

### 3. Instructions

`instructions.md` の全内容を Instructions 欄に貼り付け。

### 4. Knowledge

以下の2ファイルを Knowledge にアップロード:

1. `knowledge/song_structures.md`
2. `knowledge/style_catalog.md`

### 5. Capabilities

| 機能 | 設定 |
|------|------|
| **Web Search** | OFF（不要） |
| **DALL-E** | OFF |
| **Code Interpreter** | OFF |

### 6. 保存

Save → Only me

## 使い方

```
夏の終わりの切ない恋、city pop風
```

```
失恋ソング、バラード、男性視点、ピアノ弾き語り
```

```
EDM、クラブで踊れる曲、英語mix
```

```
孤独
```

## ファイル構成

```
customgpt-lyrics/
├── README.md
├── instructions.md
└── knowledge/
    ├── song_structures.md
    └── style_catalog.md
```
