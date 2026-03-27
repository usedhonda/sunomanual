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

**Target: 900-1000 characters (from "# Style" to final meta.vibe)**
**Absolute limit: 1000 characters.**
**100% English. Zero Japanese.**
**USE the full 1000 characters. Be rich and detailed based on URL investigation. Do NOT be brief.**

```text
# Style

<meta.vibe verbatim>

- BPM: <same as meta.tempo>
- Key: <same as meta.key>
- Signature: <same as meta.signature>

- Genre & Era: <max 2-genre pair; detailed era context and stylistic lineage>
  J-Pop meets Smooth Jazz; upbeat yet unhurried; rooted in late 80s city pop with modern production sensibility; sophisticated harmonic palette drawing from jazz standards.

- Instruments: <5-8 descriptors with rich detail drawn from the reference track>
  Rhodes electric piano (7th/9th/11th jazz voicings) and grand piano set warm silky harmonic bed; lush string quartet adds sweeping layers, gentle counter-melodies and sustained swells; finger bass with soft rounded attack and walking lines; tight syncopated drums with brush work and controlled dynamics; subtle shaker and tambourine for rhythmic texture; occasional flute or sax fills between phrases.

- Mix Vision: <detailed production characteristics>
  Clean front-center vocal with intimate proximity; generous spatial depth with layered reverbs; wide stereo field; warm analog glue compression binding elements together; crisp transients on percussion; rounded low-end without mud; airy high-end shimmer without harshness; strings placed wide left-right, supportive never overpowering.

- Texture: <vintage/modern character>
  Vintage warmth with subtle tape saturation undertone; short-to-medium plate reverb with natural room feel; no cavernous tails; tasteful space between elements; polished sheen with organic imperfection.

- Vocal Production: <delivery style and processing>
  Clear expressive lead vocal with articulate diction and emotional dynamics; subtle breaths audible for intimacy; light natural vibrato; close-harmony doubles layered on chorus for lift; no heavy autotune; minimal compression preserving natural dynamic range; gentle de-essing.

- Arrangement Notes: <section-by-section guidance>
  Intro: concise warm entrance, Rhodes and strings only. Verse: 2-3 mid-range instruments max, vocal-forward with rhythmic bass. Chorus: full bloom with stacked harmonies, graceful crescendo never brash. Bridge: stripped to piano and vocal, dynamic shift creating contrast. Transitions: smooth crossfades, no hard stops.

<meta.vibe verbatim>
```

### Style Character Limit Overflow — Reduction Priority
If Style exceeds 1000 characters, reduce in this order:
1. **Cut Arrangement Notes details** (highest priority)
2. **Compress Texture** (2-3 phrases)
3. **Remove secondary adjectives** (keep primary descriptors)
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
