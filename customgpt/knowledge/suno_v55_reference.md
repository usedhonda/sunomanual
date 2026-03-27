# Suno AI V5/V5.5 Reference Guide

## V5.5 New Features (2026-03-26)

### Voices
- Upload your own voice (15s-4min audio, Pro/Premier only)
- Verification required (read displayed text aloud)
- When using Voices: increase Audio Influence slider (60-80%)
- Clean acapella recordings work best
- Suno performs stem separation on uploaded audio

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
- 20-40%: Subtle texture/background
- 60-75%: Featured, voice-forward
- 80-100%: Maximum voice adherence

### Section-Specific Recommendations

| Section | Weirdness | Style Influence | Rationale |
|---------|-----------|-----------------|-----------|
| Chorus | 35-45% | 70-85% | Consistency, recognizable hook |
| Verse | 40-55% | 55-70% | Balanced, room for variation |
| Bridge | 55-70% | 45-60% | Exploration, contrast |
| Intro/Outro | 30-40% | 60-75% | Clean entry/exit |

### V5.5 Combo Finding
- Weirdness HIGH + Style Influence HIGH = better lyric tag compliance
- Section tags, vocal assignments are more strictly followed
- Useful when precise structure control is needed

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
