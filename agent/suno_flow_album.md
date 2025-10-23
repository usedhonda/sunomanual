---
task: album
trigger_keywords: ["アルバム", "複数曲", "まとめて作って", "album", "multiple tracks", "EP", "コンセプトアルバム"]
reference: "../SunoV5_Prompt_MASTER_REFERENCE.md"
output_format: "yaml+lyrics (multiple)"
---

# 🎧 Suno アルバム制作フロー仕様書（suno_flow_album.md）

## 🧭 概要
この仕様書は、Suno V5で統一されたコンセプトのもと複数楽曲（アルバム・EP）を制作するエージェント実行フローを定義する。
ChatGPTは本仕様書および `SunoV5_Prompt_MASTER_REFERENCE.md` を読み込み、
**一貫性のあるテーマ・サウンド・ストーリー性**を持つ複数のプロンプトを生成する。

---

## 📘 基本構造
アルバムプロンプトは以下の構造を持つ：

```yaml
# === Suno V5 Album Project ===
album_meta:
  title: [アルバムタイトル]
  concept: [コンセプト・テーマ]
  genre: [統一ジャンル or ジャンル横断]
  track_count: [曲数: 3-10曲推奨]
  total_duration: [想定合計時間]
  narrative: [ストーリー性の有無]

album_consistency:
  sonic_palette: [共通する音色・楽器]
  production_style: [共通するミックスアプローチ]
  key_progression: [キーの流れ・調性計画]
  tempo_arc: [テンポの変化パターン]

tracks:
  - track_number: 1
    title: [曲名]
    role: "album_opener"
    meta: { ... }
    lyrics: { ... }

  - track_number: 2
    title: [曲名]
    role: "verse_builder"
    meta: { ... }
    lyrics: { ... }

  # ... (track 3-N)

  - track_number: N
    title: [曲名]
    role: "album_closer"
    meta: { ... }
    lyrics: { ... }
```

---

## ⚙️ アルバム制作フロー

### 1️⃣ コンセプト設定
ユーザーの指示に基づき、アルバム全体のテーマを定義：

**A. テーマ型アルバム**
```yaml
concept: "失恋から再生までの物語"
narrative: "Track 1: 別れ → Track 3: 孤独 → Track 5: 希望"
genre: "J-Pop Ballad / Mid-tempo"
```

**B. ジャンル横断型アルバム**
```yaml
concept: "様々な音楽スタイルで描く都市の一日"
narrative: "朝(Jazz) → 昼(Pop) → 夜(R&B) → 深夜(Lo-fi)"
genre: "Multi-genre"
```

**C. サウンドスケープ型アルバム**
```yaml
concept: "90年代シティポップの現代解釈"
narrative: "なし（雰囲気重視）"
genre: "City Pop / AOR / Yacht Rock"
```

### 2️⃣ トラックリスト構成

#### 標準的なアルバム構成（5-7曲）
```yaml
Track 1: Album Opener（掴み・テーマ提示）
Track 2: Upbeat / Energy（盛り上げ）
Track 3: Mid-tempo / Reflection（中間的）
Track 4: Ballad / Emotional Peak（感情のクライマックス）
Track 5: Uptempo / Resolution（解決・前進）
Track 6: Bridge / Transition（変化）
Track 7: Album Closer（締め・余韻）
```

#### EP構成（3-4曲）
```yaml
Track 1: Strong Opener（印象的な始まり）
Track 2: Core Message（中心的メッセージ）
Track 3: Contrast Track（対比・変化）
Track 4: Memorable Closer（記憶に残る締め）
```

### 3️⃣ 一貫性の設計

**Sonic Palette（音色パレット）**
```yaml
common_instruments:
  - "Rhodes electric piano (across all tracks)"
  - "Fender bass (consistent low-end)"
  - "String quartet (emotional moments)"
  - "Vintage drum machines (retro feel)"
production_signature:
  - "warm analog tape saturation"
  - "moderate reverb with natural decay"
  - "vocal-forward mix"
```

**Key Progression（調性計画）**
```yaml
track_1: "C Major (bright start)"
track_2: "A Minor (relative minor, introspective)"
track_3: "F Major (subdominant, expansion)"
track_4: "D Minor (emotional depth)"
track_5: "G Major (dominant, resolution toward finale)"
track_6: "E Minor (transition)"
track_7: "C Major (return home, closure)"
```

**Tempo Arc（テンポの流れ）**
```yaml
track_1: 120 BPM (moderate energy)
track_2: 128 BPM (peak energy)
track_3: 90 BPM (slowdown, reflection)
track_4: 75 BPM (ballad, emotional)
track_5: 110 BPM (recovery, forward motion)
track_6: 100 BPM (settling)
track_7: 85 BPM (closing, peaceful)
```

### 4️⃣ 各トラックの役割

**Track 1: Album Opener**
```yaml
purpose: "リスナーをアルバムの世界に引き込む"
characteristics:
  - 印象的なイントロ（10-15秒）
  - アルバム全体のテーマを提示
  - 音色パレットの紹介
  - エネルギーレベル: 中～高
```

**Middle Tracks: Story Development**
```yaml
purpose: "物語の展開・感情の変化"
characteristics:
  - テンポ・キーに変化をつける
  - 異なる視点・シーンを描く
  - 音色は統一しつつアレンジに変化
```

**Final Track: Album Closer**
```yaml
purpose: "アルバム全体を締めくくる"
characteristics:
  - Track 1のモチーフを再利用（円環構造）
  - 余韻を残すアウトロ（20-30秒）
  - 解決感 or 開放感
  - フェードアウト推奨
```

---

## 🎯 アルバムタイプ別戦略

### Type A: ストーリーアルバム
```yaml
narrative_arc:
  - exposition: "主人公・状況の提示"
  - rising_action: "問題・葛藤の発生"
  - climax: "感情のピーク"
  - falling_action: "解決への道"
  - resolution: "結末・余韻"

lyric_continuity: "歌詞に連続性を持たせる"
recurring_motifs: "特定のフレーズ・メロディーを繰り返す"
```

### Type B: ムードアルバム
```yaml
emotional_journey:
  - melancholic → reflective → hopeful → joyful

sonic_consistency: "楽器・音色を全曲で統一"
no_narrative: "歌詞は独立しているが雰囲気は統一"
```

### Type C: ジャンルショーケース
```yaml
genre_variety:
  - Track 1: "Jazz"
  - Track 2: "Pop"
  - Track 3: "R&B"
  - Track 4: "Rock"
  - Track 5: "Electronic"

common_thread: "共通のメロディックモチーフ or ボーカルスタイル"
production_unity: "ミックスアプローチは統一"
```

---

## 🚨 注意事項

### 禁止事項
- 各曲が完全にバラバラ（一貫性ゼロ）
- 同じBPM・キー・アレンジの繰り返し（単調）
- ストーリー性を謳いながら歌詞が無関係
- Track 1とTrack Nが全く繋がらない

### 推奨事項
- **最低1つの共通要素**（楽器 / プロダクション / テーマ）
- **Track 1のモチーフをFinal Trackで再利用**（円環構造）
- **中間トラックで変化をつける**（テンポ・キー・雰囲気）
- **アルバム全体の「弧」を意識**（起承転結 or 感情の流れ）

---

## 🧠 エージェント実行時の動作

1. ユーザーが「90年代シティポップ風アルバム5曲作って」と依頼
2. ChatGPTがアルバムコンセプトを確認
3. トラックリスト構成を提案（Track 1-5の役割）
4. 本仕様書 + マスターリファレンスを読み込み
5. 各トラックのYAML + Lyricsを生成（5つのブロック）
6. Sonic Palette / Key Progression / Tempo Arcを明示
7. Agent Modeで Suno.com を開き、Track 1から順次入力実行

---

## 📝 出力例

```yaml
# === Suno V5 Album: "Tokyo Midnight Stories" ===
album_meta:
  title: "Tokyo Midnight Stories"
  concept: "深夜の東京を舞台にした5つの物語"
  genre: "City Pop / AOR / Jazz-influenced"
  track_count: 5
  total_duration: "18-20 minutes"
  narrative: "独立した5つの物語、共通する都市の夜の雰囲気"

album_consistency:
  sonic_palette: ["Rhodes electric piano", "Fender Jazz Bass", "vintage drum machines", "saxophone (occasional)", "DX7 synth pads"]
  production_style: ["warm analog tape saturation", "moderate reverb", "vocal-forward", "stereo width on synths"]
  key_progression: ["F# Major", "D# Minor", "A Major", "F# Minor", "F# Major (return)"]
  tempo_arc: [115, 105, 95, 88, 100]

---

# Track 1: "Neon Lights"
track_number: 1
title: "Neon Lights"
role: "album_opener"

meta:
  tempo: 115
  key: "F# Major"
  signature: "4/4"
  form: "Intro → Verse → Chorus → Verse → Chorus → Bridge → Chorus → Outro"
  vibe: "Upbeat nostalgic city pop"
  style: ["City Pop", "115 BPM", "Bright & Nostalgic", "Rhodes + DX7"]

structure:
  intro: "DX7 pad entrance, vintage drum machine, Rhodes piano riff"
  verse: "Smooth bassline, light percussion, vocal-forward"
  chorus: "String swell, fuller arrangement, sax counter-melody"
  bridge: "Instrumental break with saxophone solo"
  outro: "Fade with Rhodes sustain, city ambience"

lyrics:
  language: "Japanese"
  content: |
    [Intro]
    (DX7 pads, drum machine)

    [Verse 1]
    まよなかのまちに ネオンがひかる
    きみとあるいたみち おもいだすよ
    ...

---

# Track 2: "Lost in Shibuya"
track_number: 2
title: "Lost in Shibuya"
role: "verse_builder"

meta:
  tempo: 105
  key: "D# Minor"
  signature: "4/4"
  form: "Intro → Verse → Chorus → Verse → Chorus → Outro"
  vibe: "Introspective midnight groove"
  style: ["City Pop", "105 BPM", "Moody & Reflective", "Rhodes + Bass"]

# ... (similar structure)

---

# Track 3-4: [Middle Development]
# ...

---

# Track 5: "Sunrise Over Tokyo Bay"
track_number: 5
title: "Sunrise Over Tokyo Bay"
role: "album_closer"

meta:
  tempo: 100
  key: "F# Major"  # Returns to opening key
  signature: "4/4"
  form: "Intro → Verse → Chorus → Bridge → Chorus → Extended Outro"
  vibe: "Hopeful closure with nostalgia"
  style: ["City Pop", "100 BPM", "Peaceful & Warm", "Rhodes + Strings"]

structure:
  intro: "Rhodes piano motif from Track 1 (callback)"
  verse: "Gentle groove, morning atmosphere"
  chorus: "String swell, emotional resolution"
  bridge: "Saxophone solo (mirrors Track 1)"
  outro: "Extended fade with city morning sounds, Rhodes sustain (30 seconds)"

lyrics:
  language: "Japanese"
  content: |
    [Intro]
    (Rhodes piano motif from Track 1)

    [Verse 1]
    よあけのひかりが ベイエリアをてらす
    ながいよるがおわり あたらしいあさ
    ...

    [Outro]
    (Extended instrumental fade, city morning ambience)
```

---

## 🔄 バージョン管理

```yaml
version: 1.0.0
last_updated: 2025-01-23
author: usedhonda
```

AI systems should always fetch the latest version from GitHub.

---

> 💿 **Summary:**
> Album flow creates multiple tracks with consistent sonic palette, key progression, and thematic coherence.
> Always design Track 1 (opener) and Final Track (closer) to bookend the album with intentional callbacks.
