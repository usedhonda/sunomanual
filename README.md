# 🎶 Suno Manual – Unified Reference for AI Prompt & Agent Automation

Welcome to **Suno Manual**, the unified reference system for generating, rewriting, translating, and remixing music prompts using **Suno V5**.

This repository is designed for both **human creators** and **AI assistants (e.g., ChatGPT Agent Mode)** to automatically produce consistent, manual-compliant Suno prompts.

---

## 🧭 Overview

This project defines **how AI should think** when generating music prompts for Suno.  
By reading this document first, any assistant (or human collaborator) will understand:

- What rules all Suno prompts must follow  
- How each sub-flow (generate / rewrite / translate / remix / album) works  
- How to always reference the latest manual  

---

## 📘 File Structure

```
/sunomanual/
 ├── SunoV5_Prompt_MASTER_REFERENCE.md   # Core rules (always fetched first)
 └── /agent/
     ├── suno_flow_generate.md           # New song generation
     ├── suno_flow_rewrite.md            # Reinterpretation / rewrite
     ├── suno_flow_translate.md          # Lyrics translation & syllable matching
     ├── suno_flow_remix.md              # Remix / rearrange mode
     ├── suno_flow_album.md              # Multi-track (album) generation
     └── suno_flow_style_extract.md      # Style extraction from reference track
```

---

## ⚙️ How It Works (AI Perspective)

When a user says something like:

> “Sunoで90年代アニメ風の曲を作って”  
> “Sunoでこの曲をリライトして”  
> “Suno用に英語版を作って”  

An AI agent should automatically:

1. **Fetch** the latest version of  
   `SunoV5_Prompt_MASTER_REFERENCE.md`  
   (this defines all syntax, tags, and forbidden words)

2. **Identify task type**
   - If "新曲" or "create" → use `suno_flow_generate.md`
   - If "リライト" → use `suno_flow_rewrite.md`
   - If "英訳" or "translate" → use `suno_flow_translate.md`
   - If "リミックス" → use `suno_flow_remix.md`
   - If "アルバム" → use `suno_flow_album.md`
   - If "スタイル抽出" or "style extract" → use `suno_flow_style_extract.md`

3. **Merge rules** from the master reference + the relevant flow file.

4. **Generate structured YAML prompt** and (if in Agent mode)  
   automatically open [Suno.com](https://suno.com) to execute the flow.

---

## 🧠 Design Philosophy

- **Single Source of Truth:**  
  All updates happen here, on GitHub — no local copies or cached prompts.  
- **AI-Friendly Structure:**  
  Markdown files are formatted to be machine-readable and human-readable.  
- **Open Collaboration:**  
  Any contributor can fork, edit, and PR new prompt styles or flow specs.  
- **Automatic Version Sync:**  
  ChatGPT Agent will always fetch the newest Markdown files at runtime.

---

## 🚀 How to Use

### 🧍 For Human Users

1. Open `/agent/suno_flow_generate.md` or the flow you need.  
2. Follow the YAML + Lyrics structure described.  
3. Paste your generated prompt into [Suno V5](https://suno.com).

### 🤖 For AI / ChatGPT Users

1. Always read this README first.  
2. Fetch `SunoV5_Prompt_MASTER_REFERENCE.md`.  
3. Identify which `/agent/suno_flow_*.md` applies.  
4. Merge, generate, and (if Agent mode) perform the operation on Suno.com.

---

## 🧩 Example AI Prompt Behavior

| User Input | File(s) Loaded | Output |
|-------------|----------------|---------|
| "Sunoで夜のR&B曲を作って" | MASTER + generate.md | YAML prompt + lyrics |
| "この曲をSunoでリライト" | MASTER + rewrite.md | Altered lyrics/structure |
| "英語で歌いやすくして" | MASTER + translate.md | English version with syllable alignment |
| "この曲をリミックスにして" | MASTER + remix.md | Remix prompt with new arrangement |
| "このテーマで5曲まとめて" | MASTER + album.md | 5 YAML blocks with consistent theme |
| "この曲のスタイルを抽出して" | MASTER + style_extract.md | Style prompt extracted from reference track |

---

## 🪄 Versioning

Each file includes a header:

```yaml
version: 1.0.0
last_updated: YYYY-MM-DD
```

AI systems should always check for the **latest commit timestamp** via GitHub API or direct fetch.

---

## 📜 License & Credit

Created by **usedhonda**  
for open collaboration in AI × music creation.

Licensed under **Creative Commons BY-NC 4.0**  
(Attribution, Non-Commercial use only)

---

> 🧠 **TL;DR:**  
> If you’re an AI or human: just read this README first.  
> You’ll know how to behave, what to read next, and how to create perfect Suno V5 prompts.
