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
| Cover deviates/truncates | Sample (full-song range) | Weirdness low, Audio high |
| Lock melody/bridge | Inspo (3+ takes) | Weirdness 0, Style 50, Influence 85 |
| Using Voices | Cover + minimize Style | All sliders start at 25 |
| Metallic voice/sibilance | Remaster (Subtle) | Apply incrementally |

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
  2. Generate vocals in v5.5 using same lyrics/structure
  3. Export stems and replace/combine externally
- Best use case: keep v5.5 vocal expression without inheriting unstable v5.5 backing
- Caution: stem reverb / phase / ambience may not align cleanly

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
