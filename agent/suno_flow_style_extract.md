---
task: style_extract
trigger_keywords: ["YouTube URL", "Style解析", "スタイル解析して", "この曲のスタイル", "曲の雰囲気を調べて"]
reference: "../SunoV5_Prompt_MASTER_REFERENCE.md"
output_format: "style_block"
---

# 🎛️ Suno Style Extraction Flow（suno_flow_style_extract_search.md）

## 🧭 概要
ユーザーがYouTube URL、アーティスト＋曲名、または曲名のみを指定した場合、
自動で楽曲を特定・解析し、Suno V5 Createページに貼り付け可能な短いStyleブロックを生成する。
出力は1000字以内、`SunoV5_Prompt_MASTER_REFERENCE.md`に準拠。

---

## 🔍 手順
1. **曲の特定**
　- YouTube URL指定時 → 直接解析。
　- アーティスト＋曲名指定時 → 検索・一致精度確認後、続行。
　- 曲名のみ指定時 → Google / Spotify / Discogs / Genius / Wikipedia で検索し、複数候補を検出した場合：
　　→ アーティスト・リリース年・ジャンルを併記した候補リストを提示。
　　→ 「どれを解析しますか？」とユーザーに尋ね、選択結果を用いて続行。

2. **情報収集**
　- 確定した楽曲のタイトル、アーティスト、ジャンル、BPM、Key（調性）、楽器構成、雰囲気、年代を抽出。
　- 必要に応じて複数ソースから補完（Wikipedia, Spotify, Discogs, Genius など）。

3. **Styleブロック構成**
　- Sunoマニュアル定義に従い以下を含む：
　　ジャンル／BPM／ムード／楽器構成／地域・年代／Key。
　- 英数字・半角・英語で表現。
　- **最大1000文字まで記述可能**なので、十分な情報を含める：
　　・詳細な楽器構成（主要楽器、リズムセクション、メロディー楽器）
　　・具体的な音響特徴（リバーブ、EQ特性、ミックスバランス等）
　　・演奏スタイル（ストローク、アーティキュレーション等）
　　・プロダクション要素（サウンドテクスチャ、空間感、ダイナミクス等）

4. **Exclude Styleブロック構成**
　- 楽曲の分析結果から、**明らかに存在しない要素**を抽出：
　　例: EDMなのにアコースティックギター除外、バラードなのにトラップハイハット除外
　- ジャンル対極の要素を含める：
　　例: ジャズ → EDM synths, trap beats除外
　　例: ロック → smooth jazz, lo-fi beats除外
　- **必ずカンマ区切りで列挙**（例: "trap hats, EDM synths, distorted guitars, autotune"）
　- 200字以内推奨

---

## 🧾 出力フォーマット

### Style欄（最大1000文字）
詳細な情報を含めた英語の記述：
```
<Genre>/<Subgenre>; <BPM>; <Mood>; <Instrumental structure>; <Era/Region>; Key:<調性>

Detailed instrumentation: <主要楽器の詳細説明>
Production: <音響特徴、ミックス、エフェクト>
Performance style: <演奏スタイル、アーティキュレーション>
Sound texture: <サウンドテクスチャ、空間感>
```

### Exclude Style欄（Advanced Options内、カンマ区切り）
```
<除外要素1>, <除外要素2>, <除外要素3>, ...
```

---

## ✅ 出力例

### Style欄（詳細版 - 約800文字）
```
2010s Pop Ballad / J-Pop; 86 BPM; emotional and cinematic; Tokyo 2018; Key: C# minor

Detailed instrumentation: Grand piano with warm reverb, playing arpeggiated chords and melodic fills; string quartet (2 violins, viola, cello) providing lush harmonic layers and counter-melodies; soft acoustic drums with brushed snare and light kick; subtle electric bass with fingerstyle playing; occasional ambient synth pads for atmospheric depth.

Production: Clean, polished mix with vocal-forward balance; moderate hall reverb on strings (2.5s decay); short room reverb on piano (0.8s); gentle compression on vocals for intimacy; wide stereo field for strings; centered mono for piano and vocals; minimal EQ boosting warmth in low-mids (200-400Hz); airy high-end without harshness (8kHz+).

Performance style: Piano: expressive dynamics with rubato phrasing, sustain pedal usage for smooth transitions. Strings: legato bowing with gentle vibrato, occasional pizzicato accents. Drums: restrained playing, light touch on cymbals, minimal fills. Vocals: breathy delivery with controlled vibrato, emotional peaks in chorus.

Sound texture: Warm analog character with subtle tape saturation; intimate close-mic feel on vocals; natural room ambience; polished yet organic; cinematic swells in chorus; delicate and refined overall aesthetic.
```

### Exclude Style欄（カンマ区切り）
```
EDM synths, trap hats, distorted guitars, aggressive bass, autotune, dubstep wobbles, heavy metal drums, screaming vocals
```

---

## ⚙️ エージェント操作（必須実行フロー）

### 🚨 重要：即座に実行すること
このフローは**情報収集→即座にSuno入力**が必須です。分析だけして終わりにしないこと。

### 実行手順
1. **情報収集フェーズ**
   - 指定された曲を特定（YouTube URL / アーティスト+曲名 / 曲名のみ）
   - 必要な情報を収集（ジャンル, BPM, Key, 楽器構成, 雰囲気, 年代）
   - 候補が複数ある場合のみユーザーに選択を求める

2. **Styleブロック生成フェーズ**
   - 出力フォーマットに従ってStyleブロックを構成
   - 1000字以内に収める
   - 英語・半角で記述

3. **🚨 Suno自動入力フェーズ（必ず実行）**
   - **即座に** Suno.com の Createページを開く
   - **自動的に** Style欄に生成したStyleブロックを入力（最大1000文字まで記述可能）
   - **Advanced Options を展開**し、その中の Exclude Style 欄を探す
   - **自動的に** Exclude Style欄に除外要素を**カンマ区切り**で入力
   - ⚠️ **重要**: 「Create」ボタンは押さない（入力のみで停止）
   - 入力完了を確認してユーザーに報告

### 禁止事項
- ❌ Styleブロックを生成しただけで終了（ユーザーに手動コピペさせる）
- ❌ 「これをコピーしてSunoに貼り付けてください」と指示して終わる
- ❌ Suno入力を「次のステップ」として先延ばしにする
- ❌ Exclude Style欄を空のまま放置（必ず適切な除外要素を入力）
- ❌ **Exclude Styleを箇条書きや改行で記述**（必ずカンマ区切りの1行）
- ❌ **Advanced Optionsを展開せずにExclude欄を探す**（必ず展開すること）
- ❌ **「Create」ボタンを押してしまう**（入力のみで停止すること）
- ❌ 情報源を報告しない（透明性の欠如）
- ❌ Style欄を簡潔にしすぎる（1000文字まで使って十分な情報を含める）

### 正しい動作
- ✅ 情報収集→Styleブロック生成→**即座にSuno入力（Style + Exclude両方）**を一連の流れで実行
- ✅ 「Sunoに入力しました（Createボタンは押していません）」と完了報告
- ✅ **使用した情報源を明記**（例: Wikipedia, Spotify, YouTube, Discogs等）
- ✅ ユーザーが確認できるようスクリーンショットまたは入力内容を提示

---

## 📊 完了報告フォーマット

Suno入力完了後、必ず以下の形式で報告すること：

```
✅ Suno V5 への入力が完了しました

【入力内容】
Style欄: [生成したStyleブロック]
Exclude Style欄: [生成したExcludeブロック]

【使用した情報源】
- [サイト名1]: [URL] - [取得した情報]
- [サイト名2]: [URL] - [取得した情報]
例:
- Wikipedia: https://en.wikipedia.org/wiki/... - ジャンル、リリース年
- Spotify Web API: BPM 120, Key: C Major
- YouTube: https://youtube.com/... - 楽器構成、雰囲気

⚠️ 注意: 「Create」ボタンは押していません。
必要に応じて歌詞を入力後、手動でCreateを押してください。
```

---

## 🚫 注意
- 著作権保護素材の直接引用は禁止（要約分析のみ使用）。
- 不適切表現・禁止語を自動除外。
- 出力は常に1000字以内に収める。
- ユーザーが「明るく」「夜っぽく」等を指定した場合は、そのニュアンスを再反映。
- **必ず情報源を明記**し、どのサイトから何を取得したかを透明化する。
