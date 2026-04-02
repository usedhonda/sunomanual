# Suno AI V5/V5.5 Prompt Manual

> **Language**: Japanese (日本語) — technical terms in English

Suno V5/V5.5 で曲を作るための実践マニュアル。プロンプト設計からポストプロダクションまで、曲作りの全工程をカバーします。

## 特長

- **プロンプト設計** — Style / Lyrics / Exclude の書き方、15テクニック（コミュニティ調査4回分を統合）
- **`/suno` スキル** — アーティスト設定 → 歌詞 → Style → Suno自動入力 → マスタリング → X投稿用動画、全部ひとつのスキルで
- **Suno特化オートマスタリング** — Spotify Pedalboard（JUCE/DAW品質）でSuno出力のクセ（シマー、泥、音量不足）をスキャン→判定→補正
- **X投稿用動画生成** — 5MB制限ギリギリまで使い切る動的ビットレート計算。メタデータ埋め込み付き
- **ChatGPT CustomGPT** — Style Analyzer + Lyrics Writer の2種。Instructions + Knowledge をそのまま移植可

## `/suno` スキル — Claude Code で曲を作る

`/suno` ひとつで、曲作りの全工程を対話で進められます。

```
/suno → アーティスト設定 → 歌詞生成 → Style/YAML生成 → Sunoに送る → マスタリング → X用動画
```

### できること

| ステップ | 内容 |
|---------|------|
| **アーティスト** | 対話で深掘り → Markdownプロファイル保存。全曲がアーティストに紐づく |
| **歌詞** | テーマから生成 or 持ち込み歌詞を保護。イテレーション（部分修正）対応。漢字版+ひらがな版の2ファイル出力 |
| **Style/YAML** | URL参照 or テキスト指示 → Style + Exclude + YAML。1000文字チェック付き |
| **Suno自動入力** | Tampermonkey連携。生成結果をクリップボード経由でSunoに一発入力 |
| **マスタリング** | WAVスキャン → Suno特有のクセを判定 → Pedalboard（DAW品質）で補正 → -14 LUFS ノーマライズ |
| **X用動画** | カバー画像+音声 → 5MB使い切り動画。ビットレート逆算+メタデータ埋め込み |

### セットアップ

1. `skills/suno/` フォルダを `~/.claude/skills/` にコピー
2. 完了。knowledgeファイルを内包しているのでフォルダ単体で動作します

### Suno自動入力（Tampermonkey）

1. [Tampermonkey](https://www.tampermonkey.net/) をブラウザにインストール
2. [`scripts/suno-autofill.user.js`](scripts/suno-autofill.user.js) を Tampermonkey に追加
3. `/suno` で「Sunoに送る」→ ブラウザが開いてフォームに自動入力

### オートマスタリング（Suno特化・DAW品質）

Suno の出力には共通する音のクセがあります。`/suno` スキルは WAV をスキャンしてからクセを判定し、必要な補正だけを適用します。盲目的なプリセットではありません。

**処理エンジン:** [Spotify Pedalboard](https://github.com/spotify/pedalboard)（JUCE ベース — DAW プラグインと同等品質の EQ / コンプ / リミッター）

**処理フロー:**
1. **スキャン** — ffmpeg で LUFS・ダイナミクス・周波数バランスを計測
2. **判断** — 計測値を見てどの補正が必要か判定、ユーザーに報告
3. **処理** — Pedalboard で条件付きチェーン実行（不要なエフェクトは入れない）
4. **ノーマライズ** — EBU R128 準拠（-14 LUFS）

| Suno出力の傾向 | 対処 |
|-------------|------|
| 3.5-5kHz のシマー（金属的な光沢） | 帯域分析で突出を検出 → PeakFilter でカット |
| 8kHz以上の刺さり | HighShelfFilter で控えめにカット |
| 200-400Hz の泥 | PeakFilter でカット |
| ダイナミクスが狭い（3-5dB幅） | Suno は大抵圧縮済み → コンプをスキップ |
| 音量が商業曲より小さい | Gain + Limiter + loudnorm で商業水準に |
| Sunoメタデータ | 自動除去（アーティスト名等を再埋め込み可） |

**リファレンスマッチ:** 「この曲みたいな音にして」と言えば [Matchering](https://github.com/sergree/matchering) で RMS/周波数特性/ステレオ幅を自動マッチ

### X (Twitter) 用動画生成

5MB 制限ギリギリまで使い切る動的ビットレート計算。曲の長さから音声ビットレートを逆算し、音質重視/長さ重視を選択できます。アーティストのカバー画像を静止画動画にし、メタデータ（タイトル、アーティスト名、ジャンル）も埋め込みます。

## ドキュメント構成

### 中核マニュアル

**[SunoV5_Prompt_MASTER_REFERENCE.md](SunoV5_Prompt_MASTER_REFERENCE.md)**

1. 基礎編 — V5 プロンプト設計の四本柱、ソニック形容詞、アンカーリング
2. 応用テクニック編 — Double-Layer 構造、Style フィールド運用
3. コミュニティ発見テクニック集 — Bracket Theory、15秒ビルディングブロック、アスタリスク効果等
4. V5.5 音声条件付けワークフロー — Cover/Sample/Inspo/Remaster の15テクニック（0327-0401調査統合）
5. Deep Research 統合ログ — 調査ごとの統合記録

### 用途別フロー（`agent/`）

| 用途 | ファイル |
|------|----------|
| 新曲生成 | [suno_flow_generate.md](agent/suno_flow_generate.md) |
| スタイル抽出 | [suno_flow_style_extract.md](agent/suno_flow_style_extract.md) |
| リライト | [suno_flow_rewrite.md](agent/suno_flow_rewrite.md) |
| 翻訳 | [suno_flow_translate.md](agent/suno_flow_translate.md) |
| リミックス | [suno_flow_remix.md](agent/suno_flow_remix.md) |
| アルバム制作 | [suno_flow_album.md](agent/suno_flow_album.md) |

### ChatGPT CustomGPT（2種）

| GPT | 用途 | セットアップ |
|-----|------|-------------|
| **Suno Style Analyzer V5.5** | YouTube URL からスタイル解析 → Style/Exclude/YAML 生成 | [mygpts/style-analyzer/README.md](mygpts/style-analyzer/README.md) |
| **Suno Lyrics Writer V5.5** | テーマから歌詞生成（ラップ・英語・バイリンガル対応） | [mygpts/lyrics-writer/README.md](mygpts/lyrics-writer/README.md) |

## V5.5 で押さえるべきポイント

- **Style は短いタグ列** — カンマ区切りの名詞句。散文より安定
- **Cover が逸脱したら Sample 全曲再生成** — Weird=0/Style=100/Audio=100 が定番レシピ
- **Audio Influence は 25% 起点 +5% 刻み** — 75% 超は劣化リスク
- **スライダー赤域を避ける** — 安全範囲は 15-85
- **Voices 使用時は Style を削る** — 声質・楽器記述が衝突する
- **ライブ感が混入したら** — `[studio recording]` タグ + Style を自然文で「場+禁止+保持」
- **モデル分業** — 伴奏=v5、ボーカル=v5.5（Audio 85-90%）で品質の良いとこ取り
- **Remaster は Subtle で微修正** — 複数回回して良いテイクを選ぶ
- **歌詞は 6-12 音節/行** — Suno の歌唱安定性のスイートスポット

## ファイルツリー

```
sunomanual/
├── README.md
├── LICENSE
├── SunoV5_Prompt_MASTER_REFERENCE.md   # 中核マニュアル（15テクニック+81引用）
├── agent/                              # 用途別フロー
├── knowledge/                          # 共通ナレッジ（原本）
│   ├── lyric_craft.md                  # 伏線、韻、フック、コーチング
│   ├── song_structures.md              # 8構成パターン、エネルギーカーブ
│   ├── style_catalog.md                # ジャンル別テンプレ、楽器/プロダクション語彙
│   ├── rap_and_flow.md                 # ラップ専用: フロー、韻スキーム、日本語ラップ
│   ├── english_lyrics.md               # 英語/バイリンガル: プロソディ、クロス韻
│   ├── suno_v55_reference.md           # V5.5 リファレンス
│   └── yaml_template.md               # YAML出力テンプレート
├── mygpts/                             # ChatGPT CustomGPT
│   ├── style-analyzer/
│   └── lyrics-writer/
├── scripts/
│   ├── suno-autofill.user.js           # Tampermonkey（Suno自動入力）
│   └── sync-knowledge.sh              # knowledge同期スクリプト
└── skills/
    └── suno/                           # /suno スキル（自己完結型）
        ├── SKILL.md
        └── knowledge/
```

## knowledge 更新時

`knowledge/`（原本）を更新したら:

```bash
./scripts/sync-knowledge.sh
```

skills 内のコピーが同期されます。

## 情報の立場

| 種類 | 扱い |
|------|------|
| **公式情報** | Suno ブログ・ヘルプ・FAQ に基づく |
| **コミュニティ情報** | Reddit 等で複数報告があるものを優先収録。再現性・副作用は文脈依存 |

ここに書いてある内容は「絶対解」ではありません。ただし「どこを触ると変わるか」「何を避けると壊れにくいか」は実務向けに整理してあります。

## 注意事項

- Suno の仕様は更新されるため、特に V5.5 周辺のパラメータは今後も変わり得ます
- コミュニティ技法は「効く場面」と「壊す場面」があります。小さく試してください
- 著作権保護のため、アーティスト名や曲名の直接指定ではなく音響特徴の言語化を推奨します

## License

[CC BY-NC 4.0](LICENSE) - Created by **usedhonda**
