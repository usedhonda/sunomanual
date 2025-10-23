---
task: remix
trigger_keywords: ["リミックス", "remix", "rearrange", "アレンジ変更", "ビート変えて"]
reference: "../SunoV5_Prompt_MASTER_REFERENCE.md"
output_format: "yaml+lyrics"
---

# 🎧 Suno リミックスフロー仕様書（suno_flow_remix.md）

## 🧭 概要
この仕様書は、既存楽曲をSuno V5でリミックス・リアレンジするためのエージェント実行フローを定義する。
ChatGPTは本仕様書および `SunoV5_Prompt_MASTER_REFERENCE.md` を読み込み、
元曲の歌詞とメロディーを保ちつつ、**ビート・アレンジ・雰囲気を大胆に変更**したプロンプトを生成する。

---

## 📘 基本構造
リミックスプロンプトは以下の情報を含む：

```yaml
# === Suno V5 Remix Prompt ===
meta:
  original_reference: [元曲URL・タイトル]
  remix_type: [Club Mix / Acoustic / Lo-fi / Trap / etc.]
  original_tempo: [元のBPM]
  remix_tempo: [新しいBPM]
  original_key: [元のキー]
  remix_key: [新しいキー or 維持]
  style: [リミックス後のジャンル・雰囲気]
  keywords: [リミックスの方向性]

remix_parameters:
  weirdness: "50-70%"        # 変化度合い
  style_influence: "60-85%"  # 元曲からの乖離度
  arrangement: [追加楽器・削除楽器]
  fx_processing: [リバーブ・ディレイ・フィルター等]

structure:
  intro: [新しいイントロ構成]
  verse: [ビート・グルーヴ変更]
  chorus: [サビのリミックスアプローチ]
  bridge: [ブレイクダウン・ビルドアップ]
  outro: [エンディングの方向性]

lyrics:
  approach: "keep_original"  # 歌詞は基本維持
  structure: [元曲と同じ or セクション追加]
  content: |
    [元曲の歌詞をそのまま使用]
    [必要に応じてフックの繰り返し追加]
```

---

## ⚙️ リミックス実行フロー

### 1️⃣ 元曲の分析
- **ジャンル・テンポ・キー**を特定
- **コード進行・メロディーライン**を把握
- **特徴的な楽器・フレーズ**を抽出
- **歌詞の構造**を確認（Verse/Chorus/Bridge）

### 2️⃣ リミックスタイプの決定
ユーザーの指示に基づき、以下のいずれかを選択：

#### Type A: Club Remix（EDM/House/Techno系）
```yaml
changes:
  - BPM: 120-130に加速
  - 4つ打ちキック追加
  - シンセベース・パッド追加
  - ビルドアップ・ドロップ構造
  - サイドチェイン圧縮
```

#### Type B: Acoustic Remix（生楽器中心）
```yaml
changes:
  - 電子音を生楽器に置き換え
  - アコギ・ピアノ・ストリングス中心
  - テンポ緩やか化（-10~20 BPM）
  - リバーブ多め・温かみ重視
```

#### Type C: Lo-fi / Chill Remix
```yaml
changes:
  - BPM: 70-90にスロー化
  - ビニールノイズ・テープサチュレーション
  - ジャズコード・ネオソウル要素
  - ビート簡素化・スペース重視
```

#### Type D: Trap / Hip Hop Remix
```yaml
changes:
  - 808ベース・トラップハイハット
  - BPM: 140-160（ハーフタイム感）
  - ボーカルチョップ・ピッチシフト
  - ヘビーな低音・スネアロール
```

#### Type E: Jazz / Swing Remix
```yaml
changes:
  - スウィングビート・シャッフル
  - ブラスセクション・ウォーキングベース
  - ピアノ・オルガンコンピング
  - インプロビゼーション要素
```

### 3️⃣ Remix Parameters設定

**Weirdness（変化度）**
```yaml
35-45%: 控えめなリミックス（ジャンル維持）
50-60%: 標準的なリミックス（アレンジ大幅変更）
65-75%: 攻めたリミックス（原曲の面影薄い）
```

**Style Influence（スタイルの影響度）**
```yaml
45-60%: 元曲の雰囲気を保持
65-75%: 新しいジャンルに大胆シフト
80-90%: ほぼ別曲（歌詞とメロディーのみ共通）
```

### 4️⃣ アレンジメント戦略

**Intro（イントロ）**
- 元曲と全く違うアプローチで開始
- リミックスのジャンルを即座に提示
- 例: Club Remix → シンセパッド + ライザー

**Verse（ヴァース）**
- 元のメロディーは保持
- ビート・ベースライン・バッキングを変更
- 例: Acoustic → 生ドラム + アコギストローク

**Chorus（サビ）**
- 最もエネルギーを出す部分
- リミックスの個性が最も出る
- 例: Lo-fi → ビートドロップ + フィルターオープン

**Bridge（ブリッジ）**
- ブレイクダウン or ビルドアップ
- 元曲にない展開を追加可能
- 例: Trap → 808ドロップ + ボーカルチョップ

**Outro（アウトロ）**
- フェードアウト or 急激なカットオフ
- リミックスらしい締め方
- 例: Jazz → ピアノソロ + ブラシドラム

---

## 🎛️ Production Quality Tags（Remix特化）

### Club Remix向け
```yaml
sonic_tags:
  - "pumping sidechain compression"
  - "wide stereo synths"
  - "punchy kick drum"
  - "crisp hi-hats"
  - "deep sub bass"
  - "festival-ready mix"
```

### Acoustic Remix向け
```yaml
sonic_tags:
  - "natural room ambience"
  - "warm analog recording"
  - "intimate close-mic vocals"
  - "gentle string sustain"
  - "fingerpicking detail"
  - "organic texture"
```

### Lo-fi Remix向け
```yaml
sonic_tags:
  - "vinyl crackle"
  - "tape saturation"
  - "dusty atmosphere"
  - "muffled low-pass filter"
  - "nostalgic warmth"
  - "bedroom producer aesthetic"
```

---

## 🚨 注意事項

### 禁止事項
- 歌詞の大幅な変更（元曲の歌詞は維持）
- 元曲のメロディーを完全に無視
- BPMの極端な変更（±50 BPM以上は要注意）
- 著作権表記の削除

### 推奨事項
- **元曲の「フック」は必ず残す**（認識可能なリミックスに）
- **Remix Hintsを活用**（weirdness/style_influence）
- **ジャンル特有の楽器を明記**（808, Rhodes, brass等）
- **エフェクト処理を具体的に指定**（reverb, delay, filter）

---

## 🧠 エージェント実行時の動作

1. ユーザーが「この曲をClub Remixして」と依頼
2. ChatGPTが元曲情報・歌詞を取得
3. 元曲のBPM・キー・ジャンルを分析
4. 本仕様書 + マスターリファレンスを読み込み
5. リミックスタイプをユーザーに確認（必要に応じて）
6. Remix Parameters設定
7. YAML + Lyrics形式でプロンプト生成
8. Agent Modeで Suno.com を開き、自動入力実行

---

## 📝 出力例

```yaml
# === Suno V5 Remix: Lo-fi Chill Remix ===
meta:
  original_reference: "Original upbeat pop song (120 BPM)"
  remix_type: "Lo-fi / Chill Hop"
  original_tempo: 120
  remix_tempo: 75
  original_key: "C Major"
  remix_key: "C Major (maintain)"
  style: ["Lo-fi Hip Hop", "Chill", "Nostalgic", "Bedroom Pop"]
  keywords: ["vinyl crackle", "jazzy chords", "mellow", "study beats"]

remix_parameters:
  weirdness: "55%"
  style_influence: "70%"
  arrangement: ["add: vinyl noise, tape saturation, jazzy piano", "remove: bright synths, energetic drums"]
  fx_processing: ["low-pass filter on vocals", "warm tape delay", "subtle reverb"]

structure:
  intro: "Vinyl crackle fade-in, dusty piano chords, mellow kick pattern"
  verse: "Simple boom-bap beat, jazzy Rhodes, laid-back bassline, vocal sits in mix"
  chorus: "Beat drops slightly, low-pass filter sweep, warm pad entrance"
  bridge: "Beat break with vinyl static, piano solo, gradual return"
  outro: "Fade out with vinyl crackle, sustained piano chord"

lyrics:
  approach: "keep_original"
  structure: [Intro, Verse 1, Chorus, Verse 2, Chorus, Bridge, Chorus, Outro]
  content: |
    [Intro]
    (vinyl crackle, piano chords)

    [Verse 1]
    [元曲の歌詞そのまま]
    あさのひかりがさしこむへやで
    きみのこえがきこえてくる

    [Chorus]
    [元曲の歌詞そのまま]
    いつまでもこのままで
    ときがとまればいいのに
    ...
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

> 🎛️ **Summary:**
> Remix flow transforms the original song's arrangement, tempo, and genre while preserving lyrics and core melody.
> Use weirdness/style_influence parameters to control the degree of transformation.
