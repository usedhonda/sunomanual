---
name: suno
description: |
  Suno V5.5 統合スキル。アーティスト設定 → 歌詞生成 → 楽曲(Style/Exclude/YAML)生成の3ステップで曲を作る。
  自由テキストで指示でき、足りない情報は対話で収集する。
  全ての曲はアーティストに紐づく。アーティスト設定があれば歌詞・楽曲から開始。
  トリガー: /suno, 曲作って, 歌詞書いて, スタイル作って, アーティスト作って
argument-hint: "[任意 — 自然言語で指示可能]"
allowed-tools:
  - Read
  - Write
  - Bash
  - Grep
  - Glob
  - WebSearch
  - WebFetch
compression-anchors:
  - "Suno V5.5 統合スキル"
  - "アーティスト → 歌詞 → 楽曲 パイプライン"
  - "アーティスト設定をYAMLで保存・再利用"
  - "歌詞イテレーション+コーチング"
  - "Tampermonkey連携でSunoに自動入力"
version: 1.0.0
---

# Suno — 統合楽曲制作スキル

アーティスト設定 → 歌詞生成 → 楽曲(Style/Exclude/YAML)生成。全ての曲はアーティストに紐づく。

## Knowledge Files

このスキルフォルダ内の `knowledge/` を `Read` ツールで参照する。ジャンルに応じて必要なファイルだけ読む。

| ファイル | 内容 | いつ読むか |
|---------|------|-----------|
| `knowledge/lyric_craft.md` | 伏線、韻、フック、禁止事項、感情アーク、コーチング | 歌詞生成時 |
| `knowledge/song_structures.md` | 曲構成パターン、セクション機能、エネルギーカーブ | 歌詞生成時 |
| `knowledge/style_catalog.md` | ジャンル別テンプレ、アノテーション語彙、フック特性 | 全般 |
| `knowledge/rap_and_flow.md` | フロー類型、韻スキーム、16小節構成、日本語ラップ | ラップ/Hip Hop時 |
| `knowledge/english_lyrics.md` | 英語韻体系、プロソディ、バイリンガル戦略 | 英語/バイリンガル時 |
| `knowledge/suno_v55_reference.md` | V5.5機能、メタタグ、スライダー、Cover/Sample/Inspo | 楽曲生成時 |
| `knowledge/yaml_template.md` | YAML+Style出力テンプレート | 楽曲生成時 |

---

## 入力

`/suno` だけで発動し、必要な情報は対話で収集する。
引数に自然言語が付いていれば、そこから読み取れるものは読み取る。

| 入力例 | 動作 |
|-------|------|
| `/suno` | 対話開始。まずアーティストを聞く |
| `/suno アーティスト作って` | Step 1 へ直行 |
| `/suno used::honda で失恋ラップ` | アーティスト読み込み → 歌詞生成 |
| `/suno 歌詞は ~/lyrics.txt` | アーティストを聞いてから歌詞整形 |
| `/suno スタイルだけ、90年代R&B` | アーティストを聞いてからStyle生成 |
| `/suno used::honda で全部やって、テーマは夜の街` | 全ステップ一気通貫 |

---

## 作業フォルダの管理イメージ

ユーザーは特定のフォルダで CC を使って曲を作り続ける。以下の構造を推奨する（強制ではない）:

```
my-music/                         # 作業フォルダ（ユーザーが CC を起動する場所）
├── artists/                      # アーティスト設定
│   ├── used-honda.md
│   └── another-artist.md
├── songs/                        # 曲ごとのフォルダ
│   ├── midnight-run/
│   │   ├── lyrics.md             # 歌詞（オリジナル・漢字あり・人間用）
│   │   ├── lyrics-suno.md        # 歌詞（ひらがな変換済み・Suno投入用）
│   │   ├── style.md              # Style + Exclude
│   │   └── notes.md              # メモ（任意）
│   ├── neon-rain/
│   │   ├── lyrics.md
│   │   └── style.md
│   └── ...
└── drafts/                       # 下書き・ボツ（任意）
```

**ルール（緩め）:**
- `artists/` にアーティスト設定を保存。名前でファイルを指定できる
- `songs/<曲名>/` に曲の成果物を保存。曲名はユーザーと相談して決める
- 「完成」時に自動で保存先を提案する（ユーザーが変えてもOK）
- 既存のフォルダ構造があれば、それに合わせる（押し付けない）

---

## Step 1: アーティスト設定

### 既存アーティストの読み込み

ユーザーがアーティスト名やファイルパスを指定したら `Read` で読み込み、全ステップに反映する。

### 既存指示からの抽出

ユーザーが過去に書いた自由形式のテキスト（歌詞ルール・出力ルール・アーティスト設定が混在）を渡された場合:
- アーティストに属する要素（人格、一貫したルール）を抽出してプロファイルに整形
- 曲固有のルール（特定テーマ、特定ムード）は分離し、「これは曲側の設定ですね」とフィードバック
- 判断基準は後述の「アーティスト vs 曲の境界」テーブルを使う

### 新規アーティストの作成

「作って」「新しく」等の指示、またはアーティストがない場合、**対話で深掘り**してプロファイルを作る。

**対話の進め方:**

一問一答ではなく、まず雑な説明をもらい、そこから掘り下げる:

```
CC: 「どんなアーティストですか？雑でいいので教えてください」
ユーザー: 「企業経営者の裏の顔のラッパー。社会風刺系で、NUジャズが好き」
CC: （ここから掘り下げ質問。一度に2-3問ずつ。空気を読んで深追いしすぎない）
```

**掘り下げ質問プール（必要なものだけ聞く）:**

| カテゴリ | 質問例 | 目的 |
|---------|-------|------|
| 声・歌い方 | 「声のイメージは？（低い/高い、囁く/叫ぶ、ラップ/歌い上げ等）」 | voice セクション |
| 言語 | 「日本語メイン？英語はどう混ぜる？」 | language 設定 |
| 韻の好み | 「韻は硬く踏む派？自然に流す派？」 | rhyme_style |
| 歌詞の態度 | 「歌詞で一番大事にしたいことは？」 | themes, stance |
| 避けるもの | 「絶対やらないこと、言わないことは？」 | avoid |
| 音の好み | 「好きな楽器、好きな音のテクスチャは？」 | instruments, mix |
| リスナー | 「誰に聴いてほしい？」 | target_audience |
| 参照 | 「近いと思うアーティストや曲は？（音の方向性として）」 | roots の補強 |

**短縮判定 — 以下が揃ったら掘り下げを終了してプロファイル提示に移る:**
- identity（人物像 + 態度）が明確
- genres が1つ以上確定
- voice（声質 or 歌い方）に方向性がある
- avoid（やらないこと）が1つ以上ある

全フィールドを埋める必要はない。空欄は「制約なし＝自由」として扱う。推測できるところはAIが埋めて「こんな感じですか？」と確認する。

### アーティストプロファイル出力

対話が終わったら Markdown 形式で出力し、ファイルとして保存する。
YAML frontmatter に構造化データ、本文に自由記述。Obsidian でそのまま管理できる。

```markdown
---
name: "<アーティスト名>"
genres: ["<得意ジャンル>"]
language: "<メイン言語>"
tempo_range: "<BPM範囲>"
source_channels: ["<ネタ元1>", "<ネタ元2>"]
cover: "[[artists/<name>-cover.png]]"
tags: [artist, suno]
---

![[<name>-cover.png]]

# <アーティスト名>

## 人物像
<persona 1-2文>
<歌詞の根底にある態度>

## 音楽的ルーツ
- <ルーツ1>、<ルーツ2>
- 時代感: <era_vibe>
- 音の参照: <音の特徴で記述。アーティスト名ではなく>

## 声・歌い方
- 声質: <tone>
- デリバリー: <delivery>
- 英語の使い方: <english_mix>

## 歌詞
- テーマ: <themes>
- ネタ元: <X、ニュース、実体験、映画、etc.>
- 視点: <pov>
- 語彙: <vocabulary>
- 韻: <rhyme_style>
- フック: <hooks>
- 伏線: <foreshadow>
- **避けること**: <avoid>

## プロダクション
- 楽器: <instruments>
- ミックス: <mix>

## リスナー
- ターゲット: <target>
- 聴いたときの気分: <mood>
```

**保存:** ユーザーに保存先を確認し、`Write` ツールで保存。デフォルト: `./artists/<name>.md`（作業フォルダ基準）

**Obsidian連携:** 曲の歌詞ファイルからアーティストへ `[[artists/<name>]]` でリンクできる。

**確認:** 「これでいいですか？変えたいところがあれば言ってください」→ 修正してから保存。

---

## アーティスト設定 vs 曲設定の判断基準

| 判断基準 | アーティスト（全曲共通） | 曲（個別） |
|---------|----------------------|-----------|
| 一貫性 | 全曲で守るルール | 曲ごとに変わる |
| 例: 韻 | 「多音節韻を重視」 | 「今回はAABBで」 |
| 例: テーマ | 「社会風刺が軸」 | 「今回は夜の街」 |
| 例: 言語 | 「日本語ベース、フックに英語」 | 「今回は全英語」 |
| 例: 禁止 | 「自己紹介禁止」「センチ禁止」 | — |
| 例: ムード | — | 「ダーク」「アップテンポ」 |
| 例: BPM | tempo_range（幅） | 具体BPM |
| 例: ネタ元 | 「Xで話題のもの」 | 「今日見たニュース」 |

**迷ったら:** 「次の曲でも同じルールを適用したいか？」で判断。Yes → アーティスト、No → 曲。

---

## Step 2: 歌詞生成

アーティストの人格で歌詞を書く。アーティスト設定の全項目を反映する:
- `voice` → アノテーションタグのボーカル記述
- `lyrics.themes` → テーマの方向性
- `lyrics.vocabulary` → 語彙の選び方
- `lyrics.rhyme_style` → 韻の踏み方
- `lyrics.avoid` → 使わない表現
- `lyrics.pov` → 視点
- `lyrics.hooks` → フックの設計方針

### 入力パターン

**Pattern A（テーマから生成）:** テーマ、ムード、ジャンル指定 → アーティストの人格でゼロから書く
**Pattern B（歌詞あり）:** ファイルパス or ペースト → 保護して整形（漢字→ひらがな、タグ付与）

### 内部処理（ユーザーには見せない）

1. **ジャンル検出**: アーティスト設定の genres + ユーザー指示から
2. **言語モード**: アーティスト設定の language + english_mix から
3. **核イメージ**: テーマの奥にある感情
4. **人物と関係性**: 誰が、誰に対して
5. **感情のズレ**: 言いたいのに言えないこと
6. **具体物（モチーフ）**: 伏線の種
7. **コントラスト**: 対比構造
8. **フック**: アーティストの hooks 設定に沿った設計

### 歌詞の掟

- **情景で語れ**: 感情語を使わない。温度、光、距離、動作で描く
- **伏線を仕込め**: 同語反転、情景反転、台詞反転、欠落補完（毎回1つ）
- **韻を踏め**: アーティスト設定の rhyme_style に沿って
- **フックを立てろ**: Chorus 1行目で核を言い切る
- **歌えること**: 6-12音節/行、セクション間で密度コントラスト
- **禁止**: 感情語連打、説明口調、比喩盛りすぎ、抽象名詞連打

### Pattern B の絶対ルール

- ユーザーの歌詞は **一字一句変えない**
- やっていいこと: 漢字→ひらがな変換、アノテーションタグ付与のみ
- セクション構成の順序・名前・数を変えない（追加はOK）

### デフォルト構成（4-5分曲）

| セクション | 行数上限 | 回数 |
|-----------|---------|------|
| Verse | 4行 | ×2 |
| Pre-Chorus | 2行 | ×2 |
| Chorus | 4行 | ×2（Final Chorusで伏線回収） |
| Bridge | 2行 | ×1 |
| Intro/Outro | 0-1行 | 指定時のみ |

### Suno 制約

- **目標: 4400-4600文字、絶対上限: 4800文字**（タグ・アノテーション・歌詞・空行すべて含む）
- V5.5 アノテーションタグ: `[Chorus - explosive, full band, powerful vocal]`（英語、2-5語）
- **日本語モード:** コードブロック内は漢字→ひらがな。コードブロック外は通常の日本語
- 句読点リズム制御、フォネティック・スペル対応

### 出力フォーマット

**歌詞は2版出力する:**

1. **オリジナル版**（漢字あり） — 人間が読む用。コードブロックで出力
2. **Suno版**（ひらがな変換済み） — Suno貼り付け用。コードブロックで出力

「完成」時に `lyrics.md`（オリジナル）と `lyrics-suno.md`（ひらがな）の2ファイルを保存する。
イテレーション中はSuno版のみ表示し、完成時に両方出す。

**lyrics.md のフォーマット:**
```markdown
---
title: "<曲タイトル>"
artist: "[[artists/<name>]]"
genre: "<ジャンル>"
date: <YYYY-MM-DD>
tags: [lyrics, suno]
---

# <曲タイトル>

[Verse 1]
漢字ありのオリジナル歌詞
...
```

**lyrics-suno.md:** frontmatter なし。Suno にそのまま貼れるプレーンテキスト（タグ+アノテーション+ひらがな歌詞）。

**コーチングセクション（毎回）:**
1. **設計図**: 伏線、韻の仕掛け、フック分析、構成意図、感情アーク
2. **強み / 磨ける**: 具体的な行を引用
3. **次の一手**: 3-5個の番号付き選択肢（理由つき）
4. **作詞ワンポイント**: 関連テクニック1つ（任意）

### イテレーション

- 指示された箇所だけ変更、他は触らない
- 常に全文をコードブロックで再出力
- `📝 変更: [内容]` を1行で明示
- 番号選択（「3で」）→ コーチングの選択肢を実行
- 「完成」→ Step 3 へ

---

## Step 3: 楽曲（Style / Exclude / YAML）

アーティスト設定の音楽性 + 歌詞の内容から、Suno V5.5 用の出力を生成する。

### スタイルの方向性

以下のいずれかから決定:
- **アーティスト設定から自動**: `music.genres`, `production`, `voice` をベースに生成
- **参照曲URL**: Web検索で BPM/Key/Genre/Instruments 調査
- **ユーザーのテキスト指示**: ジャンル・ムード・楽器指定
- **複合**: 「アーティストのベースだけど、今回はもっとダーク」

### 🚨 絶対ルール

1. URL参照時は必ずWeb検索。推測禁止
2. 歌詞の元曲は調査しない
3. Style と Exclude は全て英語
4. YAML メタデータは全て英語。歌詞のみ日本語（ひらがな）可
5. アーティスト名、曲名は Style に入れない

### 出力

**1) 調査レポート（URL参照時のみ）**

**2) Style（英語のみ、絶対上限 1000文字）**
```
<meta.vibe>
- BPM / Key / Signature
- Genre & Era（最大2ペア）
- Instruments（5-8 descriptors）
- Mix Vision / Texture / Vocal Production / Arrangement Notes
<meta.vibe>（アンカリング）
```

**🚨 Style 文字数チェック（必須）:**
1. Style を生成したら**まず文字数を数える**
2. 1000文字を超えていたら以下の順でトリムする:
   - Arrangement Notes を短縮
   - Texture を短縮
   - 副形容詞を削除
   - Mix Vision / Vocal Production を圧縮
3. トリム後に**再カウント**し、1000文字以内を確認してから出力
4. 1000文字以内になるまでこのループを繰り返す

**3) Exclude（英語、1行、200文字以内、2-5項目）**

**4) YAML + Lyrics（歌詞ありの場合、4500文字以内）**
```yaml
# META (hints; do not sing)
version: v5.5
meta:
  tempo: <int>
  key: "<key>"
  signature: "4/4"
  form: "<section flow>"
  vibe: "<3-5 word vibe>"
language: "<from artist>"
vocals: ...
production_notes: ...
=== LYRICS START ===
[セクションタグ + アノテーション]
<歌詞>
=== LYRICS END ===
```

**5) 文字数カウント**

---

## Suno 自動入力（Tampermonkey連携）

出力完了後、**「Sunoに送る？」** と確認し、承認されたら Tampermonkey 対応URLでブラウザを開く。

### 送信データ

| 生成結果 | JSON フィールド |
|---------|---------------|
| Style | `styleAndFeel` |
| Exclude | `excludeStyles` |
| 歌詞 | `lyrics` |
| 曲タイトル | `songName` |
| スライダー | `weirdness`, `styleInfluence`, `audioInfluence` |

### 送信方法: クリップボードモード（標準）

日本語ひらがな歌詞は URL エンコードで膨張する（1文字→9文字）ため、クリップボードモードを標準にする。

```bash
python3 -c "
import json, subprocess
data = json.dumps({
    'styleAndFeel': '''STYLE''',
    'songName': '''NAME''',
    'lyrics': '''LYRICS''',
    'excludeStyles': '''EXCLUDE''',
    'weirdness': 50,
    'styleInfluence': 70,
    'audioInfluence': 25
}, ensure_ascii=False)
subprocess.run(['pbcopy'], input=data.encode('utf-8'))
subprocess.run(['open', 'https://suno.com/create#suno=clip'])
"
```

**動作:** JSON をクリップボードにコピー → `#suno=clip` トリガーURL を開く → Tampermonkey がクリップボードから読み取る

**フォールバック（短いデータ用）:** Style + Exclude のみ（歌詞なし）の場合は従来の直接ハッシュも使える:
```bash
url = 'https://suno.com/create#suno=' + urllib.parse.quote(data, safe='')
```

---

## Step 4: ポストプロダクション（任意）

曲が完成した後の処理。ユーザーが WAV ファイルや「Xにアップしたい」と言ったら対応する。

### 4-A. オートマスタリング（Suno V5/V5.5 特化）

Suno の WAV 出力には共通する音のクセがある。汎用マスタリングではなく、**Suno 出力の特性を前提とした修復的アプローチ**で処理する。
仕様は ChatGPT × Gemini のクロス議論（2026-04）で策定。

#### Suno 出力の既知の特性

| 特性 | 詳細 | 汎用マスタリングとの違い |
|------|------|----------------------|
| **シマー（金属的光沢）** | 3.8-5.2kHz に集中。Udio より高め | 汎用では想定しない帯域の問題 |
| **高域の刺さり** | 8-12kHz がキツい（v5.5 で顕著） | v5.5 固有 |
| **低域の泥** | 95-120Hz 付近が膨らむ | 汎用と共通だが Suno は典型的に発生 |
| **ダイナミクスが既に狭い** | LRA 3-5dB（既に圧縮済み） | 汎用ではコンプが主役だが、Suno では**コンプをスキップすることが多い** |
| **音量が小さい** | LUFS -22〜-18 前後 | 商業曲より 6-8dB 低い |
| **Suno sheen** | 特有のリバーブ/アンビエンス | EQ で軽減可能だが完全除去は難しい |
| **二重マスタリングリスク** | Suno 内部で既にマスタリング済み | 強い外部処理を重ねると濁る・歪む |

**基本方針: 削る→整える→持ち上げる。足す処理（エキサイター等）はデフォルトOFF。**
**Suno は押し込むほど AI っぽさが露呈する。やりすぎない。**

#### Pass 1: スキャン（分析）

まず曲をスキャンして数値を取る。**処理の前に必ず実行する。**

```bash
# ラウドネス分析（LUFS, LRA, True Peak）
ffmpeg -i "<input.wav>" -af loudnorm=print_format=json -f null - 2>&1

# 統計分析（RMS, Peak, Crest factor, Noise floor）
ffmpeg -i "<input.wav>" -af astats=metadata=1:reset=0 -f null - 2>&1

# 周波数帯域分析（シマー判定用）
ffmpeg -i "<input.wav>" -af aspectralstats=measure=mean:win_size=4096 -f null - 2>&1
```

#### Pass 2: 判断（CC が分析値を見て決定）

分析値を読んで、以下の条件テーブルに照らし合わせる。
**「削る」方向を優先。全部当てはめるのではなく、該当するものだけ処理に入れる。**

| 計測値 | 条件 | 処理 | 処理しない条件 |
|-------|------|------|--------------|
| Integrated LUFS | < -20 | 最終段で loudnorm | -16〜-14 なら軽く |
| LRA | < 5 dB | **コンプ不要**（Suno は大抵ここ） | > 8 dB なら軽くコンプ |
| 3.8-5.2kHz エネルギー | 他帯域より突出 | シマーカット **-1.0〜-2.0dB** (Q 1.2-2.0) | 突出なしならスキップ |
| 95-120Hz RMS | 膨らんでいる | 泥カット **-0.5〜-1.5dB** (Q 0.7-1.0) | 正常ならスキップ |
| 9-12kHz エネルギー | 高い（刺さり） | シェルフカット **-0.5〜-1.5dB** | 正常ならスキップ |
| True Peak | > -1.5 dBTP | リミッター必要 | -1.5以下なら不要 |

**ガードレール（やりすぎ防止）:**
- EQ は **1バンドあたり ±2.0dB 以内**（まれに 2.5dB まで）
- Compressor の合計 GR は **1〜2dB、最大3dB未満**
- エキサイター / 高域の足し込みは **デフォルトOFF**（Suno のシマーを悪化させるリスク大）
- Suno Remaster 済みの WAV には **処理を軽くする**（二重マスタリング回避）

**判断結果をユーザーに報告してから処理に進む:**
```
📊 スキャン結果:
- LUFS: -21.5 → ノーマライズ必要
- LRA: 3.8 dB → コンプ不要（Suno 典型: 既に圧縮済み）
- 4.2kHz: 突出あり → シマーカット -1.5dB
- 10kHz: やや高い → シェルフ -1.0dB
- 低域: 正常 → スキップ
→ この内容で処理します
```

#### Pass 3: 処理（Pedalboard — JUCE/DAW品質）

Spotify 製 Pedalboard ライブラリでマスタリングチェーンを組む。
初回のみ `pip install pedalboard` が必要。

判断結果に基づいて、以下のチェーンから**必要なエフェクトだけ**を組み合わせる。
順序は固定: **HPF → 減算EQ → コンプ（条件付き） → Gain → Limiter**

```python
from pedalboard import (
    Pedalboard, Compressor, Gain, Limiter,
    HighpassFilter, HighShelfFilter, PeakFilter
)
from pedalboard.io import AudioFile

# --- Pass 2 の判断結果に基づいてチェーンを構築 ---
effects = []

# 1. ハイパス 30Hz（常に適用）
effects.append(HighpassFilter(cutoff_frequency_hz=30))

# 2. 減算EQ（条件付き — Pass 2 で必要と判断したもののみ追加）

# シマー除去: 3.8-5.2kHz が突出している場合のみ
# effects.append(PeakFilter(cutoff_frequency_hz=4200, gain_db=-1.5, q=1.5))

# 泥カット: 95-120Hz が膨らんでいる場合のみ
# effects.append(PeakFilter(cutoff_frequency_hz=100, gain_db=-1.0, q=0.8))

# 高域刺さり: 9-12kHz が高い場合のみ
# effects.append(HighShelfFilter(cutoff_frequency_hz=10000, gain_db=-1.0))

# 3. コンプ（LRA > 8dB の場合のみ。Suno は大抵スキップ）
# effects.append(Compressor(
#     threshold_db=-20, ratio=1.8,
#     attack_ms=25, release_ms=120
# ))
# ※ GR が 1-2dB を超えないよう threshold を調整

# 4. Gain（ノーマライズ前の補正）
effects.append(Gain(gain_db=2))

# 5. Limiter（Pedalboard は True Peak limiter ではないため安全マージンを取る）
effects.append(Limiter(threshold_db=-1.5))

board = Pedalboard(effects)

# --- 処理実行 ---
with AudioFile('<input.wav>') as f:
    audio = f.read(f.frames)
    samplerate = f.samplerate

processed = board(audio, samplerate)

with AudioFile('<output.wav>', 'w', samplerate, audio.shape[0]) as f:
    f.write(processed)
```

**チェーン構築のルール:**
- コメントアウトされた行は Pass 2 で必要と判断した場合のみ有効化する
- EQ の gain_db は ±2.0dB 以内に収める
- コンプは Suno 出力の大半で不要（LRA 3-5dB）。入れても ratio 2:1 以下、GR 1-2dB
- Limiter threshold は **-1.5dBFS**（Pedalboard は True Peak 保証なし → 安全マージン）
- **エキサイター、M/S処理、マルチバンドコンプはデフォルトOFF**

#### ラウドネスノーマライズ（Pedalboard 処理後）

Pedalboard にはラウドネスノーマライズがないため、最終段は ffmpeg で:

```bash
ffmpeg -i "<pedalboard_output.wav>" -af loudnorm=I=-14:TP=-1:LRA=11 "<mastered.wav>"
```

**ジャンル別の目安:**
| ジャンル | ターゲット LUFS |
|---------|---------------|
| アコースティック / ジャズ | -16〜-14 |
| ポップ / ロック | -14.5〜-13.5 |
| EDM / Hyperpop | -13〜-12（Suno は押し込みに弱いので注意） |

#### メタ情報の削除

マスタリングの最後に Suno メタデータを除去:

```bash
ffmpeg -i "<mastered.wav>" -map_metadata -1 -c copy "<clean.wav>"
```

#### Matchering（オプション: リファレンス曲がある場合）

ユーザーがリファレンス曲（「この曲みたいな音にして」）を指定した場合、Pedalboard チェーンの**代わり**に使う:

```python
import matchering as mg  # pip install matchering
mg.process(
    target='<input.wav>',
    reference='<reference.wav>',
    results=[mg.pcm16('<mastered.wav>')],
)
```

Matchering は RMS・周波数特性・ステレオ幅をリファレンスに自動マッチする。

#### 出力（複数フォーマット対応）

マスタリング後、以下のフォーマットで出力する。ユーザーに「どの形式で出す？」と聞く。指定がなければ WAV + MP3 の両方。

```python
from pedalboard.io import AudioFile

# WAV 24bit（高品質アーカイブ用）
with AudioFile('songs/<曲名>/<曲名>_mastered.wav', 'w', samplerate, processed.shape[0], bit_depth=24) as f:
    f.write(processed)

# MP3 160kbps（配布・ストリーミング用）
with AudioFile('songs/<曲名>/<曲名>_mastered.mp3', 'w', samplerate, processed.shape[0], quality='160k') as f:
    f.write(processed)
```

最後にメタ情報を処理:
```bash
# Suno メタデータ除去 + アーティスト情報埋め込み（WAV）
ffmpeg -i "<mastered.wav>" -map_metadata -1 \
  -metadata title="<曲タイトル>" -metadata artist="<アーティスト名>" \
  -metadata genre="<ジャンル>" -metadata date="<YYYY>" \
  -c copy "<clean.wav>"

# カバー画像を縮小（300px, 低画質）
ffmpeg -i "<cover.png>" -vf "scale=300:300:force_original_aspect_ratio=decrease" -q:v 8 "/tmp/cover_thumb.jpg"

# MP3: メタ情報 + カバー画像（アルバムアート）埋め込み
ffmpeg -i "<mastered.mp3>" -i "/tmp/cover_thumb.jpg" -map 0:a -map 1:0 \
  -map_metadata -1 \
  -metadata title="<曲タイトル>" -metadata artist="<アーティスト名>" \
  -metadata genre="<ジャンル>" -metadata date="<YYYY>" \
  -metadata:s:v title="Album cover" -metadata:s:v comment="Cover (front)" \
  -disposition:v attached_pic \
  -c:a copy -c:v mjpeg \
  "<clean.mp3>"
```

| 出力ファイル | 用途 |
|------------|------|
| `<曲名>_mastered.wav` | 高品質アーカイブ、DAW取り込み |
| `<曲名>_mastered.mp3` | 配布用（160kbps + カバー画像埋め込み） |
| `<曲名>_x.mp4` | X (Twitter) 投稿用動画 |

### 4-B. X (Twitter) アップロード用動画生成

X の動画制限: **5MB / 動画のみ（音声ファイル不可）**。
アーティストのカバー画像を使い、超低ビットレート動画を生成する。

**X の制約:** 5MB / 動画のみ / AAC LC のみ（Opus・HE-AAC 非サポート）

**基本方針: 5MBをギリギリまで使い切る。** 曲の長さから逆算して音声ビットレートを最大化する。

ユーザーに「音質重視？長さ重視？」と聞く:
- **音質重視**: 全5MBを使って最高音質。曲が長すぎれば末尾カット
- **長さ重視**: 全曲入れる。その範囲で音質を最大化

#### ビットレート逆算ロジック

```bash
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "<audio.wav>")

python3 -c "
dur = float('$DURATION')
budget_kbit = 5 * 8 * 1024          # 40960 kbit
video_kbps = 5                       # 静止画は最小限

# 音質重視: 音声上限 128kbps、入らなければ曲をカット
quality_audio = 128
quality_max_sec = budget_kbit / (quality_audio + video_kbps)

# 長さ重視: 全曲入れる前提で音声ビットレートを逆算
length_audio = max(48, int(budget_kbit / dur) - video_kbps)  # 最低 48kbps
length_max_sec = dur

print(f'曲の長さ: {dur:.0f}秒 ({dur/60:.1f}分)')
print(f'音質重視: AAC {quality_audio}kbps / 最大 {quality_max_sec:.0f}秒 ({quality_max_sec/60:.1f}分)')
print(f'長さ重視: AAC {length_audio}kbps / 全曲 {length_max_sec:.0f}秒 ({length_max_sec/60:.1f}分)')
"
```

#### 対話での選択

```
CC: 「X用動画を作ります」
  曲の長さ: 4分32秒
  - 音質重視: AAC 128kbps（最大5分7秒 → 全曲入る）
  - 長さ重視: AAC 128kbps（全曲入る。同じ結果になります）
  → 音質重視で作りますね
```

```
CC: 「X用動画を作ります」
  曲の長さ: 7分15秒
  - 音質重視: AAC 128kbps（最大5分7秒 → 末尾2分カット）
  - 長さ重視: AAC 89kbps（全曲入る）
  どちらにしますか？
```

#### ffmpeg 実行

```bash
ffmpeg -loop 1 -i "<cover.png>" -i "<audio.wav>" \
  -c:v libx264 -tune stillimage -pix_fmt yuv420p \
  -vf "scale=480:480:force_original_aspect_ratio=decrease,pad=ceil(iw/2)*2:ceil(ih/2)*2" \
  -r 1 -b:v 5k -crf 51 \
  -c:a aac -b:a <逆算したビットレート>k \
  -t <使用する秒数> \
  -metadata title="<曲タイトル>" \
  -metadata artist="<アーティスト名>" \
  -metadata album="<アルバム名（あれば）>" \
  -metadata genre="<ジャンル>" \
  -metadata date="<YYYY>" \
  -metadata comment="Made with Suno V5.5" \
  -shortest -movflags +faststart \
  "<output.mp4>"
```

**メタ情報の取得元:**
- `title` → 歌詞ファイルの frontmatter `title`、またはユーザー指定
- `artist` → アーティストプロファイルの `name`
- `genre` → アーティストプロファイルの `genres[0]`、または Step 3 で使ったジャンル
- `date` → 作成年
- `album` → ユーザー指定があれば。なければ省略
- `comment` → 固定文 or ユーザー指定

#### 手順
1. カバー画像を特定（`artists/<name>-cover.png` またはユーザー指定）
2. 音声ファイルのパスと曲の長さを取得
3. ビットレートを逆算して選択肢を提示
4. ffmpeg 実行
5. **出力ファイルサイズを確認** → 5MB超なら音声を5kbps下げて再実行（VBRの揺れ対策）
6. 出力: `songs/<曲名>/<曲名>_x.mp4`

---

## Cover / Sample / Inspo 対応

- スライダー安全範囲: **15-85**
- Audio Influence: 25%開始、+5%刻み、75%超えない
- Voices使用時: Style から声・楽器記述を最小化

### V5.5 テクニック

- パフォーマンスディレクション（Verse:/Chorus: で歌い方記述）
- `[studio recording]` タグ（ライブ感抑制）
- ダウングレード整形（v5.5→v5.0）
- 全曲Sample再生成（Weird=0/Style=100/Audio=100）
- Studioモデル切替ドロップダウン
- Remaster Subtle でマイクロ修正
