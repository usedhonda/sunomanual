# Output Templates for Suno Style Analyzer V5.5

This file contains the exact output templates. The GPT must follow these structures precisely.

---

## YAML Template (Pattern B: URL + Lyrics)

**Total character limit: 4000 characters (from "# META" to "=== LYRICS END ===")**
**Metadata target: 800-1000 chars. Lyrics use the rest.**
**ALL metadata MUST be in English. Only lyrics text may be Japanese (hiragana only).**

```yaml
# META (hints; do not sing)
version: v5.5
meta:
  tempo: <int>
  key: "<e.g., F# major>"
  signature: "4/4"
  form: "<concise ENGLISH form summary>"
  vibe: "<3-5 word ENGLISH vibe>"  # CRITICAL: used for anchoring in Style (first+last line)
language: "Japanese"
vocals:
  parts:
    - { id: F, name: "Female Lead", gender: female, tone: ["airy", "smooth", "expressive"] }
    - { id: M, name: "Male Harmony", gender: male, tone: ["warm", "supportive"] }
  rules:
    - "smooth phrasing with subtle vibrato; light breaths"
    - "close-harmony doubles on chorus for lift"
sections:
  - name: <must mirror input lyrics section exactly>
    vocals:
      lead: <F or M>
      harmony: { <opposite>: "<short English note or empty>" }
    cues:
      - "<English dynamic instruction, e.g., 'Rhodes pad entrance; string swell bar 4'>"
    remix_hints:
      weirdness: "<35-70%>"
      style_influence: "<45-85%>"
  # repeat for each section in the input lyrics
production_notes:
  - "no lead guitar in chorus"
  - "keep mid-range instruments to 2-3 max in verse"
notes:
  - "lock tempo/key across all sections"
=== LYRICS START (do not sing tags) ===
# V5.5 WARNING: Any text outside section tags WILL be sung.

[Verse 1 - intimate, acoustic, close vocal]
<lyrics from input, all kanji→hiragana, katakana and English kept as-is>

[Chorus - explosive, full band, powerful vocal]
<lyrics from input, hiragana only>

[Bridge - stripped, piano only, vulnerable]
<lyrics from input, hiragana only>

=== LYRICS END ===
```

### Kanji → Hiragana Conversion Examples
- 愛してる → あいしてる
- 夜空 → よぞら
- 走り出せ → はしりだせ
- 街 → まち
- 3時 → さんじ
- 1人 → ひとり
- 瞬間 → しゅんかん
- 女性 → じょせい
- Keep katakana as-is: ロマンチック → ロマンチック
- Keep English as-is: love → love

### Section Matching Rule
The `sections` in YAML and the lyrics sections MUST exactly match the input lyrics:
- Same section names
- Same order
- No additions, deletions, or reordering
- If input has [Verse], [Chorus], [Verse], [Chorus], [Bridge], [Chorus] — output must have exactly those 6 sections in that order

### Character Limit Overflow — Reduction Priority
If YAML block exceeds 4000 characters, reduce in this order:
1. **Simplify cues** (highest priority — cut to 1 short line per section)
2. **Reduce production_notes / notes** (keep 1-2 items only)
3. **Compress vocals.rules** (1-2 lines)
4. **Last resort: shorten lyrics** (2-3 lines per section)

---

## Style Template

**Character limit: 700 characters (from "# Style" to final meta.vibe)**
**100% English. Zero Japanese.**

```text
# Style

<meta.vibe verbatim>

- BPM: <same as meta.tempo>
- Key: <same as meta.key>
- Signature: <same as meta.signature>

- Genre & Era: <max 2-genre pair; e.g., "J-Pop meets Smooth Jazz; upbeat yet unhurried">

- Instruments: <4-7 descriptors, each 1-3 words>
  Rhodes and piano set warm bed; string quartet adds lush layers; finger bass with soft attack; tight drums with controlled dynamics.

- Mix Vision:
  Clean front-center vocal; spatial depth; stereo width; warm analog glue; crisp transients.

- Texture:
  Vintage warmth; short reverb with natural room feel; polished sheen.

- Vocal Production:
  Clear expressive lead; subtle breaths; light vibrato; harmony doubles on chorus.

- Arrangement Notes:
  Intro: warm entrance. Verse: vocal-forward. Chorus: bloom with harmonies. Bridge: dynamic shift.

<meta.vibe verbatim>
```

### Style Character Limit Overflow — Reduction Priority
If Style exceeds 700 characters, reduce in this order:
1. **Cut Arrangement Notes** (highest priority)
2. **Compress Texture** (1-2 phrases)
3. **Remove adjectives** (keep only essential keywords)
4. **Compress Mix Vision / Vocal Production**
Natural prose can be sacrificed for character limit compliance.

---

## Exclude Template

**Character limit: 200 characters, single line, comma-separated**
**2-5 items. English only. No "no X" phrasing.**

```text
# Exclude Styles

Trap, Dubstep, distorted guitars, EDM supersaws, female humming
```

---

## Remix Hints Recommended Values

| Section | Weirdness | Style Influence |
|---------|-----------|-----------------|
| Chorus | 35-45% | 70-85% |
| Verse | 40-55% | 55-70% |
| Bridge | 55-70% | 45-60% |
| Intro/Outro | 30-40% | 60-75% |

---

## Annotation Tag Vocabulary (for lyrics section headers)

### Intro
atmospheric, fade in, soft pads, ambient, building, sparse

### Verse
intimate, storytelling, close vocal, moderate energy, rhythmic, stripped, acoustic

### Pre-Chorus
building, rising energy, anticipation, layering, transitional

### Chorus
explosive, full band, powerful, anthemic, soaring vocal, wide stereo, peak energy, thick harmony

### Bridge
stripped, contrast, piano only, vulnerable, key change, minimal, emotional peak

### Outro
fade out, reverb tail, resolution, gentle ending, atmospheric, echoing
