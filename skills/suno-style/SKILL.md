---
name: suno-style
description: |
  Suno V5.5 向け Style/Exclude/YAML 生成。YouTube URL を投げると参照曲を調査し、Style Block + Exclude + YAML を出力。
  歌詞も一緒に渡すと、歌詞付きYAMLパッケージを生成。
  トリガー: /suno-style, スタイル作って, style prompt
argument-hint: "<YouTube URL> [歌詞テキスト（任意）]"
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
  - WebSearch
  - WebFetch
compression-anchors:
  - "Suno V5.5 Style/Exclude/YAML生成スキル"
  - "Pattern A=URL only, Pattern B=URL+Lyrics"
  - "必ずWeb検索してBPM/Key/Genre/Instrumentsを調査"
  - "Style英語のみ、YAML META英語、歌詞ひらがな"
version: 1.0.0
---

# Suno Style Analyzer — Claude Code Skill

参照トラック（YouTube URL）を調査し、Suno V5.5 用の Style/Exclude/YAML を生成する。

## Knowledge Files

必要に応じて `Read` ツールで参照する。パスはリポジトリルートからの相対パス。

| ファイル | 内容 | いつ読むか |
|---------|------|-----------|
| `knowledge/suno_v55_reference.md` | V5.5機能、メタタグ、スライダー、Cover/Sample/Inspo | **初回は必ず読む** |
| `knowledge/yaml_template.md` | YAML+Style出力テンプレート | **初回は必ず読む** |
| `knowledge/style_catalog.md` | ジャンルテンプレ、楽器タグ、プロダクション語彙 | ジャンル詳細確認時 |

---

## 入力パターン判定

**Pattern A（URL only）**: YouTube URL のみ → 調査レポート + Style + Exclude
**Pattern B（URL + Lyrics）**: YouTube URL + 歌詞テキスト → 調査レポート + YAML + Style + Exclude

URL が参照トラック（= コピーしたいスタイル）。歌詞はユーザーのオリジナル（= そのスタイルで歌う歌詞）。

---

## 🚨 絶対ルール — ハルシネーション防止

1. **URL に実際にアクセスし、Web検索してから回答する。** 推測・想像禁止。検証済みデータのみ使用
2. **URL の曲（入力 a）のみ調査する。** アーティスト、ジャンル、BPM、キー、楽器編成を検索
3. **🚨 歌詞（入力 b）は絶対に調査しない。** 既知の曲の歌詞であっても、その曲を調べない。歌詞は生テキストとして扱う
4. **Style と Exclude は全て英語。** 日本語混入 = エラー
5. **YAML メタデータは全て英語。** 歌詞テキストのみ日本語（ひらがな）可

---

## 出力順序

### 0) 調査レポート（必ず最初）

コードブロック外で:

```
## 📋 調査報告
### 参照曲（a）← 🚨 この曲の情報のみ使用
- URL: <URL> | 曲名: <title> | アーティスト: <artist>

### Web検索（aについて最低2件）
1. "<title> BPM" → <source URL> → 結果: <BPM>
2. "<title> genre instruments" → <source URL> → 結果: <genre, instruments>

### 推定根拠（全てaから）
Tempo: <X> BPM | Key: <Y> | Genre: <Z>（根拠: <source>）

🚨 注意: 歌詞の元曲は調べていません。URLの曲情報のみ使用。
```

### 1) Style（英語のみ、1000文字以内）

```text
# Style

<meta.vibe — 3-5 English words>

- BPM: <from investigation>
- Key: <from investigation>
- Signature: <from investigation>

- Genre & Era: <max 2-genre pair with era context>

- Instruments: <5-8 descriptors with rich detail>

- Mix Vision: <spatial depth, stereo field, compression, frequency>

- Texture: <vintage/modern character, reverb, saturation>

- Vocal Production: <delivery, effects, dynamics>

- Arrangement Notes: <section-by-section guidance, energy curve>

<meta.vibe — same as first line>
```

**ルール:**
- 英語のみ。日本語ゼロ
- meta.vibe を冒頭と末尾に（アンカリング）
- 最大2ジャンルペア
- アーティスト名、曲名、アルバム名は禁止
- 目標 900-1000文字、絶対上限 1000文字
- 全スペースを使い切る。調査結果を反映した詳細な記述

**超過時の削減順序:** Arrangement Notes → Texture → 副形容詞 → Mix Vision/Vocal Production

### 2) Exclude（英語、1行、200文字以内）

```text
# Exclude Styles

<comma-separated items, 2-5 items>
```

「no X」表現は使わない。アイテム名のみ。

### 3) YAML + Lyrics（Pattern B のみ、4500文字以内）

```yaml
# META (hints; do not sing)
version: v5.5
meta:
  tempo: <int>
  key: "<e.g., F# major>"
  signature: "4/4"
  form: "<section flow>"
  vibe: "<3-5 word ENGLISH vibe>"
language: "Japanese"
vocals:
  parts:
    - { id: F, tone: ["<adjectives>"] }
    - { id: M, tone: ["<adjectives>"] }
  rules:
    - "<1 line>"
production_notes:
  - "<1 line>"
notes:
  - "lock tempo/key across all sections"
=== LYRICS START (do not sing tags) ===

[Verse 1 - intimate, acoustic, close vocal]
<lyrics, all kanji→hiragana>

[Chorus - explosive, full band, powerful vocal]
<lyrics, hiragana>

=== LYRICS END ===
```

**YAML ルール:**
- 全メタデータ = 英語のみ
- 歌詞テキスト = 漢字→ひらがな（カタカナ・英語はそのまま）
- セクション名と順序は入力歌詞と完全一致
- META は 400-600文字（per-section配列は書かない）
- **文字数配分**: 歌詞文字数を先に確定 → 残り(4500-歌詞)でMETAを書く
- **🚨 歌詞は絶対に削らない**
- JIS X 0208 範囲内の文字のみ

**超過時の削減順序（METAのみ。歌詞は触らない）:**
1. production_notes/notes を最小化
2. vocals.rules を最短形に
3. アノテーションタグを1-2語に

### 4) 文字数カウント（最終行）

`出力: YAML 文字数: <X> / Style 文字数: <Y> / Exclude 文字数: <Z>`

---

## Cover / Sample / Inspo 対応

ユーザーが Cover、Sample、Inspo モードに言及したら:
- `audio_influence` を remix_hints に含める
- Voices 使用時: Style から声・楽器の記述を最小化（Voices音声と衝突回避）
- スライダー安全範囲: **15-85**（0-14, 86-100 は赤域 = 構造崩壊）
- Audio Influence: 25%開始、+5%刻み、75%超えない

### V5.5 Style テクニック

- **パフォーマンスディレクション**: `Verse: restrained, talk-sung. Chorus: louder, borderline shouted.` のように歌い方をStyleに記述
- **[studio recording] タグ**: Coverでライブ感が入る場合、Lyrics先頭に `[studio recording]` を配置
- **ダウングレード整形**: v5.5のヒス/ノイズ → v5.0にSubtle Remaster
- **モデル間分業**: 伴奏=v4.5+/v5、ボーカル=v5.5で外部合成

---

## セルフバリデーション（出力前に確認）

- [ ] 調査報告に実際のWeb検索結果がある
- [ ] 歌詞の元曲は調査していない
- [ ] Style は100%英語、≤1000文字
- [ ] meta.vibe が Style 冒頭と末尾にある
- [ ] Exclude は英語、1行、≤200文字、2-5項目
- [ ] 歌詞あり: YAML メタデータは100%英語
- [ ] 歌詞あり: 漢字→ひらがな変換済み
- [ ] 歌詞あり: セクションが入力と一致
- [ ] 歌詞あり: YAML全体 ≤4500文字
- [ ] meta.tempo == Style BPM, meta.key == Style Key
- [ ] ジャンル最大2ペア

---

## Suno 自動入力（Tampermonkey連携）

出力完了後、**「Sunoに送る？」とユーザーに確認**し、承認されたら Tampermonkey 対応URLでブラウザを開く。

### 前提
- ユーザーのブラウザに Tampermonkey + monkey_prompt スクリプトがインストール済み
- macOS の `open` コマンドでブラウザを起動

### 送信データのマッピング

| 生成結果 | JSON フィールド | 備考 |
|---------|---------------|------|
| Style Block のテキスト | `styleAndFeel` | meta.vibe 行は除く。英語のみ |
| Exclude テキスト | `excludeStyles` | カンマ区切り |
| 歌詞（Pattern B時） | `lyrics` | セクションタグ+アノテーション+歌詞全文 |
| 曲タイトル（推定） | `songName` | 歌詞から推定、またはユーザー指定 |
| スライダー推奨値 | `weirdness`, `styleInfluence`, `audioInfluence` | デフォルト: 50, 70, 25 |

### URL構築手順

Bash ツールで以下の python3 スクリプトを実行する。変数部分を実際の生成結果で置換。

```bash
python3 -c "
import json, urllib.parse, subprocess

data = json.dumps({
    'styleAndFeel': '''STYLE_TEXT_HERE''',
    'songName': '''SONG_NAME_HERE''',
    'lyrics': '''LYRICS_TEXT_HERE''',
    'excludeStyles': '''EXCLUDE_TEXT_HERE''',
    'weirdness': 50,
    'styleInfluence': 70,
    'audioInfluence': 25
}, ensure_ascii=False)

url = 'https://suno.com/create#suno=' + urllib.parse.quote(data, safe='')
subprocess.run(['open', url])
"
```

**注意:**
- `'''` (トリプルクォート) で改行を含む歌詞テキストを安全に埋め込む
- `ensure_ascii=False` で日本語（ひらがな）をそのまま保持
- `urllib.parse.quote(safe='')` で全特殊文字をエンコード
- Pattern A（URLのみ）の場合: `lyrics` と `songName` は空文字にする
- スライダー値はユーザーが指定しない限りデフォルト値を使う
