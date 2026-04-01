---
name: suno-style
description: |
  Suno V5.5 向け Style/Exclude/YAML 生成。自由テキストで指示でき、足りない情報は対話で収集する。
  参照曲URL、ジャンル指示、歌詞ファイルなど何でも受け付ける。
  生成後は Tampermonkey 連携で Suno に自動入力可能。
  トリガー: /suno-style, スタイル作って, style prompt, Sunoのスタイル
argument-hint: "[任意 — 自然言語で指示可能]"
allowed-tools:
  - Read
  - Bash
  - Grep
  - Glob
  - WebSearch
  - WebFetch
compression-anchors:
  - "Suno V5.5 Style/Exclude/YAML生成スキル"
  - "自由テキスト入力 → 対話で情報収集"
  - "URL調査 or ジャンル指示からStyle生成"
  - "Tampermonkey連携でSunoに自動入力"
version: 2.0.0
---

# Suno Style Analyzer — Claude Code Skill

Suno V5.5 用の Style/Exclude/YAML を生成する。自由テキストで指示でき、足りない情報は対話で収集する。

## Knowledge Files

必要に応じて `Read` ツールで参照する。パスはリポジトリルートからの相対パス。

| ファイル | 内容 | いつ読むか |
|---------|------|-----------|
| `knowledge/suno_v55_reference.md` | V5.5機能、メタタグ、スライダー、Cover/Sample/Inspo | **初回は必ず読む** |
| `knowledge/yaml_template.md` | YAML+Style出力テンプレート | **初回は必ず読む** |
| `knowledge/style_catalog.md` | ジャンルテンプレ、楽器タグ、プロダクション語彙 | ジャンル詳細確認時 |

---

## 入力

引数は不要。`/suno-style` だけで発動し、必要な情報は対話で収集する。

引数やコマンドに自然言語が付いていれば、そこから読み取れるものは読み取る:

| 入力例 | 読み取れるもの | 残りの対話 |
|-------|-------------|-----------|
| `/suno-style` | なし | 全て聞く |
| `/suno-style 90年代シティポップ風` | ジャンル・雰囲気 | 歌詞の有無を聞く |
| `/suno-style https://youtube.com/...` | 参照曲URL | 歌詞の有無を聞く |
| `/suno-style https://youtube.com/... 歌詞は ~/lyrics.txt` | URL + 歌詞パス | 即実行 |
| `/suno-style ピアノとサックスのジャズ、歌詞つき` | ジャンル・楽器 + 歌詞フラグ | 歌詞の入力方法を聞く |
| `Sunoのスタイル作って。この曲みたいに（URL）で、暗めにして` | URL + 雰囲気調整 | 歌詞の有無を聞く |

### 対話フロー

```
Step A: スタイルの方向性
  「どんなスタイルにしますか？」
  受け付ける入力:
  - YouTube URL（参照曲として調査する）
  - ジャンル・雰囲気の自由テキスト（「90年代R&B」「暗いエレクトロ」）
  - 「前回と同じ」（会話コンテキストから再利用）
  - 楽器指定（「ピアノ中心」「ギターとドラムだけ」）
  - 複合指示（「この曲みたいだけどもっとテンポ速く」）

Step B: 歌詞の有無
  「歌詞はありますか？（なければ Style + Exclude のみ出力します）」
  受け付ける入力:
  - ファイルパス（~/lyrics.txt, ./歌詞.md）
  - その場でペーストされたテキスト
  - 「なし」「今回はスタイルだけ」→ Style + Exclude のみ
  - 「さっきのファイル」「さっき作った歌詞」（会話コンテキストから特定）
  - 「/suno-lyrics で作ったやつ」（直近の歌詞生成結果を参照）

Step C: 追加指示（任意）
  読み取った情報に矛盾や不足がなければスキップ。
  必要な場合のみ:
  - BPM/Key の指定確認
  - Cover/Sample/Inspo モードの確認
  - スライダー値のカスタマイズ
```

---

## モード判定

対話で収集した情報から、以下のモードを判定する:

### Mode A: URL参照（参照曲あり）
YouTube URL → Web検索でBPM/Key/Genre/Instruments調査 → Style生成

### Mode B: テキスト指示（参照曲なし）
ジャンル・雰囲気・楽器の自由テキスト → knowledgeファイル参照 → Style生成

### 歌詞の有無（どちらのモードでも）
- **歌詞あり** → Style + Exclude + YAML（歌詞付き）
- **歌詞なし** → Style + Exclude のみ

---

## 🚨 絶対ルール

1. **Mode A: URL調査時は必ずWeb検索してから回答する。** 推測・想像禁止
2. **🚨 歌詞の元曲は絶対に調査しない。** 歌詞は生テキストとして扱う
3. **Style と Exclude は全て英語。** 日本語混入 = エラー
4. **YAML メタデータは全て英語。** 歌詞テキストのみ日本語（ひらがな）可
5. **アーティスト名、曲名、アルバム名は Style に入れない**

---

## 出力順序

### 0) 調査レポート（Mode A のみ）

```
## 📋 調査報告
### 参照曲
- URL: <URL> | 曲名: <title> | アーティスト: <artist>

### Web検索（最低2件）
1. "<title> BPM" → <source URL> → 結果: <BPM>
2. "<title> genre instruments" → <source URL> → 結果: <genre, instruments>

### 推定根拠
Tempo: <X> BPM | Key: <Y> | Genre: <Z>（根拠: <source>）
```

Mode B の場合はスキップし、ユーザー指示を元に直接 Style を生成する。

### 1) Style（英語のみ、1000文字以内）

```text
# Style

<meta.vibe — 3-5 English words>

- BPM: <from investigation or user input>
- Key: <from investigation or user input>
- Signature: <from investigation, default 4/4>

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
- 全スペースを使い切る。詳細な記述

**超過時の削減順序:** Arrangement Notes → Texture → 副形容詞 → Mix Vision/Vocal Production

### 2) Exclude（英語、1行、200文字以内）

```text
# Exclude Styles

<comma-separated items, 2-5 items>
```

「no X」表現は使わない。アイテム名のみ。

### 3) YAML + Lyrics（歌詞ありの場合のみ、4500文字以内）

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

- [ ] Mode A: 調査報告に実際のWeb検索結果がある
- [ ] Mode B: ユーザー指示に基づいてknowledgeを参照した
- [ ] 歌詞の元曲は調査していない
- [ ] Style は100%英語、≤1000文字
- [ ] meta.vibe が Style 冒頭と末尾にある
- [ ] Exclude は英語、1行、≤200文字、2-5項目
- [ ] 歌詞あり: YAML メタデータは100%英語
- [ ] 歌詞あり: 漢字→ひらがな変換済み
- [ ] 歌詞あり: セクションが入力と一致
- [ ] 歌詞あり: YAML全体 ≤4500文字
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
| 歌詞（あれば） | `lyrics` | セクションタグ+アノテーション+歌詞全文 |
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
- 歌詞なしの場合: `lyrics` と `songName` は空文字にする
- スライダー値はユーザーが指定しない限りデフォルト値を使う
