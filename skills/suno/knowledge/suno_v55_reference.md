# Suno AI V5/V5.5 Reference Guide

## V5.5 New Features (2026-03-26)

### Voices
- Upload your own voice (15s-4min audio, Pro/Premier only)
- Verification required (read displayed text aloud)
- When using Voices: start Audio Influence at 25%, increase +5% per attempt (never exceed 75%)
- Clean acapella recordings work best
- Suno performs stem separation on uploaded audio
- ⚠️ When using Voices for Cover: minimize Style Prompt (remove voice/instrument descriptions to avoid collision)
- Start all sliders at 25/25/25 when Voices is active

### Custom Models
- Train V5.5 on your own songs (min 6 songs, max 3 models)
- Must own rights to all uploaded songs
- Models are private, non-shareable
- Creation takes 2-5 minutes

### My Taste
- Preference learning from your Suno usage patterns
- Magic Wand in Create screen auto-generates personalized Style
- When My Taste is ON: keep Style shorter (3-5 tags) to leave room for auto-completion
- Can be viewed, edited, disabled

### Personas → Voices
- Voices replaces Personas in the Create menu
- Style Personas still available within Voices menu

---

## The Four Pillars of Effective Style Prompts

Every Style Block should address these 4 areas:

| Pillar | What to specify | Example tags |
|--------|----------------|--------------|
| 1. Genre & Style | Specific subgenre, era, fusion | "90s alt-rock", "gospel trap", "dark synthwave" |
| 2. Mood & Emotion | Atmosphere, tone, energy | "melancholic", "anthemic", "high tension" |
| 3. Instruments & Production | Key instruments, sonic qualities | "pulsing 808 bass", "analog pad", "tape saturation" |
| 4. Vocal Settings | Voice type, delivery, effects | "sultry female vocal", "whispery", "robotic male vocal" |

### V5.5 Style Format Rules
- **Tag format**: Short comma-separated noun phrases (NOT prose sentences)
- **Front-load**: genre → BPM → key → mood → vocal → instruments → mix
- **Optimal**: 4-7 descriptors total
- **Limit**: Under 120 characters
- **Max genres**: 2 genre pairs (3+ becomes unstable)

---

## Metatags for Lyrics (Section Tags)

### Standard Section Tags
```
[Intro]       [Verse]        [Verse 1]      [Verse 2]
[Pre-Chorus]  [Chorus]       [Post-Chorus]   [Bridge]
[Solo]        [Breakdown]    [Build]         [Drop]
[Interlude]   [Outro]        [Hook]          [Refrain]
```

### V5.5 Annotation Tags
Add production hints inside the tag bracket:
```
[Verse 1 - intimate, acoustic, close vocal]
[Chorus - explosive, full band, powerful]
[Bridge - stripped, piano only, vulnerable]
[Outro - fade out, reverb tail, atmospheric]
```

Annotation text is NOT sung — it's a production instruction to Suno.

### Special Tags
```
[Instrumental]     — no vocals in this section
[Acapella]         — vocals only, no instruments
[Spoken Word]      — spoken delivery, not singing
[Whispered]        — whispered vocal
[ALL CAPS CUE]     — gets stronger attention from model
```

### Vocal Tags (inside lyrics)
```
[Male Vocal]       [Female Vocal]
[Deep Baritone]    [High Soprano]
[Rap]              [Harmony]
[Falsetto]         [Growl]
```

---

## Creative Sliders

### Weirdness (Safe ↔ Chaos)
- 0-30%: Safe, conventional, predictable
- 35-50%: Standard, balanced (default)
- 55-70%: Explorative, experimental touches
- 75-100%: Chaotic, unexpected, may break structure

### Style Influence (Loose ↔ Strong)
- 0-30%: Loose, creative freedom
- 35-50%: Balanced
- 55-70%: Moderate adherence to Style tags
- 75-100%: Strong, strict tag compliance

### Audio Influence (for Voices/audio upload)
- 0%: No audio reference
- 15-25%: Starting point for Cover/Sample tuning
- 25-50%: Moderate reference (increment +5% to find "latch on")
- 60-75%: Featured, voice-forward (Cover sweet spot)
- >75%: ⚠️ WARNING — artifacts, pronunciation breakdown, diminishing returns

### Section-Specific Recommendations

| Section | Weirdness | Style Influence | Rationale |
|---------|-----------|-----------------|-----------|
| Chorus | 35-45% | 70-85% | Consistency, recognizable hook |
| Verse | 40-55% | 55-70% | Balanced, room for variation |
| Bridge | 55-70% | 45-60% | Exploration, contrast |
| Intro/Outro | 30-40% | 60-75% | Clean entry/exit |

### Slider Safety: Red Zone Warning
- UI turns red near 0 and 100 — these extremes cause breakage
- Safe operating range for all sliders: **15-85**
- Red zone (0-14, 86-100) → unpredictable output, structure collapse
- Default values are often the safest starting point

### V5.5 Combo Finding
- Weirdness HIGH + Style Influence HIGH = better lyric tag compliance
- Section tags, vocal assignments are more strictly followed
- Useful when precise structure control is needed

---

## Cover / Sample / Inspo Mode Selection (V5.5)

### Mode Decision

| Situation | Recommended Mode | Settings |
|-----------|-----------------|----------|
| Faithful recreation of original | Cover | Audio 25% start, +5% increments |
| Cover deviates/truncates | **Sample (full-song range)** | **Weird=0, Style=100, Audio=100** |
| Lock melody/bridge | Inspo (3+ takes) | Weirdness 0, Style 50, Influence 85 |
| Using Voices | Cover + minimize Style | All sliders start at 25 |
| Metallic voice/sibilance | Remaster (Subtle) | Apply incrementally, multiple takes |
| Vocals only upgrade | v5 instrumental → v5.5 Add Vocals | Audio 85-90% |
| FX generation (riser/swoosh) | Studio: switch to v5 | Use Studio model dropdown |

### Decision Flow
1. Start with Cover → if deviation → switch to Sample (full range)
2. If melody still off → Inspo with 3+ takes
3. If Voices active → strip voice/instrument descriptions from Style
4. If metallic voice → Remaster at Subtle strength

### Remaster Workflow
- Subtle strength first (not Standard)
- If still harsh: try staged Remaster (v4.5 → v5 → v5.5)
- Results are source-dependent — not guaranteed
- If Cover changes too much: treat Remaster as a lighter full-song replace/regenerate path
- Franken-track workflow: stitch best sections externally, then Remaster to unify tone
- **Strength guide**: Subtle = safest micro-fix, Normal = small change, High = near-complete regen
- **Micro-fix pattern**: run Subtle multiple times, pick best take. Style: "Only fix: [specific issue]"

### Performance Direction in Style
- V5.5 responds better to performance-direction prose than pure tag soup in some cases
- Use role labels inside Style:
  - `Verse: restrained, talk-sung, conversational`
  - `Chorus: louder, rougher, borderline shouted`
  - `Band: heavy, slightly behind the beat`
- Best use case: when genre is correct but delivery/attitude is wrong
- Caution: over-hyped directives can produce exaggerated ad-libs later in the song

### [studio recording] Tag for Anti-Live Control
- Problem: v5.5 Cover may inject fake crowd / clapping / "live" ambience
- Fix:
  - Write Style as full-sentence environment control, not only comma tags
  - Put `[studio recording]` at the top of Lyrics
- Example Style:
  - `Remove fake crowd cheering and clapping.`
  - `This should feel like a small studio room, not a stadium.`
  - `Keep the lead vocal controlled, not shouted.`
- Use when negative prompting alone fails

### v5.5 → v5.0 Downgrade Cleanup
- Workaround for hiss / white noise / top-end shimmer in v5.5 outputs
- Two paths:
  - v5.5 song → v5.0 Subtle Remaster
  - v5.5 song → v5.0 Cover
- This is a cleanup pass, not a permanent fix

### Model Split Workflow
- If vocals are better in v5.5 but accompaniment is steadier in v4.5+/v5:
  1. Build instrumental in v4.5+ or v5
  2. Generate vocals in v5.5 using Add Vocals / Cover (Audio: 85-90% recommended)
  3. Export stems and replace/combine externally
- Best use case: keep v5.5 vocal expression without inheriting unstable v5.5 backing
- Audio=100% maximizes preservation but increases glitch risk
- ⚠️ Add Vocals path may not support Voices/Persona — use Cover if Persona is needed
- Caution: stem reverb / phase / ambience may not align cleanly

### Whole-song Sampling (Cover Alternative)
- When Cover breaks mid-song or deviates too far, use **Sample mode** with full-song selection
- **Recipe**: Weirdness=0% / Style=100% / Audio=100% (maximum preservation)
- Alternative: Weirdness low / Style mid-high / Audio max
- Style example: `Keep exact melody and chords. Only improve: tighter drums, cleaner bass, reduce hiss.`
- More stable than Cover for maintaining song structure while improving quality
- Note: endings and break positions may shift slightly

### Studio Model Switch
- Studio has a small dropdown in the Style field to switch between v5.5 / v5 / v4.5
- Use case: v5.5 struggles with certain FX (riser, swoosh) — switch to v5 for those
- Style/Lyrics character limits may fluctuate (1000/5000 vs 200/1250) depending on UI state
- Not all users may see the same UI (gradual rollout possible)

---

## Community-Discovered Techniques

### 1. Anchoring Strategy
Repeat critical vibe/mood terms at the START and END of Style Block.
Increases keyword weight, prevents style drift in long generations.

### 2. The 4-7 Descriptors Rule
Optimal: 4-7 descriptors per section. More than 50 tags causes "prompt fatigue" (generic output, robotic vocals).

### 3. Top-Anchor Technique
Information at the very beginning of Style Block gets strongest attention.
Always lead with genre and tempo.

### 4. Vocal Anchor Method
Repeat vocal descriptors (e.g., "deep male baritone") multiple times in lyrics to force vocal consistency.

### 5. Avoid "Tag Soup"
More tags ≠ better. Keep it focused. 5000+ song validation confirms 4-7 is the sweet spot.

### 6. Negative Space Technique
Using silence/pause markers `[...]` or `[Silence]` to control timing between sections.

### 7. Phonetic Spelling Hack
For homophones: "live" → "lyve", "bass" → "basss" to get intended pronunciation.

---

## Odd Time Signature / 変拍子プロンプト戦略

5/4・7/8 等の奇数拍子（odd meter）を Suno V5.5 で「当てに行く」ための体系的戦略。
公式 KB・Reddit・日本語コミュニティ記事・音楽理論資料からの統合知見。
**大半の技法は出典元でも「未検証」と明記されている**点に注意。

### Fundamental Caveat（まず知るべき事実）

- **Suno Studio の time signature 設定は edit grid 専用で、モデル条件には送られない**（Suno 公式 KB）。Studio で拍子を指定しても新規生成には影響しない
- **直接 `5/4` / `7/8` と書いても 4/4 に吸われやすい**。ラベルは高い確率で無視される
- **「ラベルを信じず必ず数えろ」が鉄則**。出力が出たら人間がカウントして検証する
- 成功率は曲調・モデル・スライダー・シード有無で大きく変動する
- 変拍子は「当たればラッキー」ではなく「**当てに行く工程設計**」が必要

### Strategy Ladder（推奨順・堅牢性の順）

#### A. 連符語彙戦略（基本）

拍子記号ではなく「連符（tuplet）語彙」で 5/7 のまとまりを作る。Reddit で最も再現性が高いと報告されている手法:

- `quintuplet` / `quintuplet groove` / `quintuplet subdivision` / `5-note grouping` → 5 拍子狙い
- `septuplet` / `septuplet groove` / `septuplet subdivision` / `7-note grouping` → 7 拍子狙い

Style にも Lyrics にも分散配置する。

#### B. メトリック・モジュレーション（BPM 関係式）

テンポ変換の理屈で「実質の拍子」を作る手法。Suno はテンポ変更は扱える前提。

**式**: `new_tempo = base_tempo / tuplet_division × meter_base`

**例**: 5:4 感を狙う場合 → 120 BPM を 120 / 5 × 4 = **96 BPM** に。Style/Lyrics に `base 120 BPM, metric modulation 5:4, derived 96 BPM` のように書く。

#### C. 不規則グルーヴ語彙（補助）

以下の語彙で「変拍子っぽさ」を誘発できるという報告:

`irregular meter` / `shifting rhythms` / `polyrhythmic` / `contrametric` / `extra-metric`

※ `polymeter` は報告では効かないとされる。避ける。

#### D. アクセント分割の明示

奇数拍子の体感は「等分」ではなく「非対称分割」で生まれる:

- **5拍子**: `accent 3+2` または `accent 2+3`
- **7拍子**: `accent 2+2+3`（最典型）/ `3+2+2` / `2+3+2`

これらを Style にもセクションタグにも書く。例: `[Verse - quintuplet feel, accent 3+2]`

#### E. シード戦略（最堅牢）

**言語誘導より堅い**。Upload Audio で 5/4 や 7/8 のクリック/ドラムループを入れ、Extend で延長する。公式の Upload Audio は 6-60 秒（Pro/Premier は最大 120 秒）。

拍頭が分かるよう、各拍頭にクラッシュ/キック等を明確に入れるのがコツ（日本語コミュニティ検証記事より）。

#### F. Song Editor で拍数指定

公式の Song Editor は「追加セクションの拍（beats）数」を調整できる。拍子そのものの保証にはならないが、奇数拍のフレーズ長を保ちやすくなる。

### Slider Settings for Odd Meter

変拍子は構造が壊れやすいので、Weirdness は低め・Style Influence は高めで安定させる:

| スライダー | 推奨値 | 理由 |
|-----------|-------|------|
| Weirdness | 25-40 | 低め → 構造崩壊を防ぐ |
| Style Influence | 70-85 | 高め → 連符語彙・アクセント分割への追従を強める |
| Audio Influence | 60-75（シード使用時のみ） | シード拍頭を維持する |

### Prompt Templates

#### Example A: 5/4 狙い（progressive rock, 英語）

**Style:**
```
progressive rock, tight drums, base 120 BPM, quintuplet-driven groove, accent 3+2, clear downbeats, no straight four-on-the-floor
```

**Lyrics (Intro):**
```
[Intro - instrumental, count-in, quintuplet feel, accent 3+2]
one two three | one two
```

#### Example B: 7/8 狙い（math rock, 日本語）

**Style:**
```
マスロック、140 BPM、septuplet（7連）グルーヴ、7/8 フィール、アクセント 2+2+3、歯切れの良いギター、タイトなスネア、拍頭明確
```

**Lyrics (Intro):**
```
[Intro - インスト、カウント、7/8 feel, accent 2+2+3]
いち に｜いち に｜いち に さん
```

#### Example C: シード前提（Upload Audio + Extend）

**Style:**
```
math rock, quintuple meter feel, accent 3+2, locked to uploaded click track, dry drums
```

**運用:**
1. 5/4 や 7/8 のクリック/ドラムループ（6-60秒）を Upload Audio
2. Extend で曲を構築
3. Style に「locked to uploaded click track」を含める
4. Audio Influence 60-75% でシード拍頭を維持

### Lyrics Design for Odd Meter（Step 2 連携）

#### Pattern A（テーマから生成 — ゼロから書く場合）

- フレーズ長を奇数拍に合わせる: 5拍子なら「3音節 + 2音節」の息づかい、7拍子なら「2 + 2 + 3」
- セクション冒頭にカウント歌詞を置く（`one two three | one two` / `いち に さん｜いち に`）
- アクセント分割をアノテーションタグに明示: `[Verse - quintuplet feel, accent 3+2]`
- 行の音節数は 4/4 用の 6-12 音節ルールを無理に適用しない。**拍数のまとまりを優先**

#### Pattern B（持ち込み歌詞 — ユーザー提供）

🚨 **Pattern B 絶対ルール: 歌詞本文は一字一句変更しない**。変拍子狙いでも歌詞保護は破らない。

できること:
- アノテーションタグに変拍子指示を追加: `[Verse - 7/8 feel, accent 2+2+3]`
- Style 側に連符語彙・アクセント分割・スライダー推奨値を反映
- ユーザーに「この歌詞は 4/4 前提で書かれている可能性が高い。変拍子のフレーズ長と噛み合わないリスクがある」と注意喚起する

できないこと:
- 歌詞の行分割・単語追加・カウント歌詞挿入（歌詞保護違反）

### Troubleshooting Flow（4/4 に戻ってしまう場合）

コスト（クレジット）と試行回数を抑える順序:

1. **カウントして確認**: まずラベルを信じず人間が数える。これで「本当に 4/4 か」を確定させる
2. **連符語彙 + アクセント分割を追加**: `quintuplet` / `septuplet` / `accent 3+2` / `accent 2+2+3` を Style と Lyrics タグに散りばめる
3. **シードに切り替え**: 言語誘導で効かなければ Upload Audio に 5/4 or 7/8 クリック → Extend（最も強い）
4. **Song Editor で拍数調整**: セクションの beats 数を指定してフレーズ長を奇数拍に固定
5. **スライダー再調整**: Weirdness を下げ、Style Influence を上げる

### Vocabulary Cheat Sheet

**効きやすい語:**
- `quintuplet` / `septuplet`
- `quintuple meter` / `septuple meter`
- `5-note grouping` / `7-note grouping`
- `accent 3+2` / `accent 2+2+3` / `accent 3+2+2` / `accent 2+3+2`
- `polyrhythmic` / `contrametric` / `extra-metric`
- `irregular meter` / `shifting rhythms`
- `metric modulation` / `5:4 modulation` / `7:8 modulation`
- `clear downbeats` / `strong downbeat` / `tight drums` / `locked to click track`

**避けるべき:**
- 直接的な `5/4` / `7/8` 記号**だけ**に依存すること（4/4 に吸われやすい）
- `polymeter`（報告では効かない）
- 曖昧な「odd time」だけで具体指示なし

---

## Critical Safety Rules

### Command Text Gets Sung
NEVER put instruction text in the lyrics field outside of brackets. Suno will sing it literally.
- BAD: `ここでテンポを上げる` (this will be sung)
- GOOD: `[Bridge - tempo increase, building energy]`

### Exclude Best Practices
- Keep to 2-5 specific items
- Use the Exclude field, NOT "no X" in Style
- "no fiddles" can cause fiddles to appear (word gets emphasized)
- Sometimes removing ALL Exclude items improves output

### Kanji → Hiragana Conversion
Critical for Japanese lyrics. Suno's voice synthesis requires hiragana.
- ALL kanji → hiragana
- ALL numbers → hiragana (3 → さん, 100 → ひゃく)
- Keep katakana as-is
- Keep English as-is

### Copyright Safety
- Never include artist names in Style Block
- Never include song titles in Style Block
- Never include album names
- Describe the SOUND, not the SOURCE

---

## V5.5 Official Sources
- https://suno.com/blog/v5-5
- https://help.suno.com/en/articles/11362305
- https://help.suno.com/en/articles/11362369 (Voices)
- https://help.suno.com/en/articles/11362497 (Custom Models)
- https://help.suno.com/en/articles/11362561 (My Taste)
