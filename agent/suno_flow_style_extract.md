---
task: style_extract
trigger_keywords: ["YouTube URL", "Style解析", "スタイル解析して", "この曲のスタイル", "曲の雰囲気を調べて"]
reference: "../SunoV5_Prompt_MASTER_REFERENCE.md"
output_format: "style_block"
---

# 🎛️ Suno Style Extraction Flow（suno_flow_style_extract_search.md）

## 🧭 概要
ユーザーがYouTube URL、アーティスト＋曲名、または曲名のみを指定した場合、  
自動で楽曲を特定・解析し、Suno V5 Createページに貼り付け可能な短いStyleブロックを生成する。  
出力は1000字以内、`SunoV5_Prompt_MASTER_REFERENCE.md`に準拠。

---

## 🔍 手順
1. **曲の特定**  
　- YouTube URL指定時 → 直接解析。  
　- アーティスト＋曲名指定時 → 検索・一致精度確認後、続行。  
　- 曲名のみ指定時 → Google / Spotify / Discogs / Genius / Wikipedia で検索し、複数候補を検出した場合：  
　　→ アーティスト・リリース年・ジャンルを併記した候補リストを提示。  
　　→ 「どれを解析しますか？」とユーザーに尋ね、選択結果を用いて続行。  

2. **情報収集**  
　- 確定した楽曲のタイトル、アーティスト、ジャンル、BPM、Key（調性）、楽器構成、雰囲気、年代を抽出。  
　- 必要に応じて複数ソースから補完（Wikipedia, Spotify, Discogs, Genius など）。  

3. **Styleブロック構成**  
　- Sunoマニュアル定義に従い以下を含む：  
　　ジャンル／BPM／ムード／楽器構成／地域・年代／Key。  
　- 英数字・半角・簡潔な英語で表現。  
　- 全体を1000字以内に制限。  

---

## 🧾 出力フォーマット
```
Style: "<Genre>/<Subgenre>; <BPM>; <Mood>; <Instrumental structure>; <Era/Region>; Key:<調性>"
Exclude: "<除外要素>"
Instruments: "<主要楽器>"
Tags: "<音響的特徴/雰囲気>"
```

---

## ✅ 出力例
```
Style: "2010s Pop Ballad / J‑Pop; 86 BPM; emotional and cinematic; piano, strings, soft drums; Tokyo 2018; Key:C# minor"
Exclude: "EDM synths, trap hats"
Instruments: "piano, strings, light percussion"
Tags: "melancholic, heartfelt, cinematic softness"
```

---

## ⚙️ エージェント操作
1. ChatGPTが自動で情報収集→Styleブロック生成。  
2. 候補が複数ある場合はユーザーに選択を求める。  
3. 確定後、AgentがSuno CreateページのStyle欄に貼り付けて保存。

---

## 🚫 注意
- 著作権保護素材の直接引用は禁止（要約分析のみ使用）。  
- 不適切表現・禁止語を自動除外。  
- 出力は常に1000字以内に収める。  
- ユーザーが「明るく」「夜っぽく」等を指定した場合は、そのニュアンスを再反映。