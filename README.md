# Suno AI V5/V5.5 Prompt Manual

> **Language**: Japanese (日本語) — technical terms in English

Suno V5/V5.5 で曲を作るための実践マニュアル。プロンプト設計からポストプロダクションまで、曲作りの全工程をカバーします。

## 特長

- **プロンプト設計** — Style / Lyrics / Exclude の書き方、15テクニック（コミュニティ調査4回分を統合）
- **`/suno` スキル** — アーティスト設定 → 歌詞 → Style → Suno自動入力 → マスタリング → X投稿用動画、全部ひとつのスキルで
- **Suno特化オートマスタリング** — Suno の音のクセ（シマー、泥、既圧縮、音量不足）を知った上でスキャン→判定→補正。汎用マスタリングとは違うアプローチ
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

`/suno` スキルで生成した Style・歌詞・Exclude・スライダー設定を、Suno の画面に自動入力します。Tampermonkey はブラウザにユーザースクリプトを追加する拡張機能です。

#### 1. Tampermonkey をインストール

| ブラウザ | リンク |
|---------|-------|
| Chrome | [Chrome Web Store](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/) |
| Safari | [Mac App Store](https://apps.apple.com/app/tampermonkey/id1482490089) |
| Edge | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |

#### 2. スクリプトを追加

1. ブラウザのツールバーに表示された **Tampermonkey アイコン**（四角いアイコン）をクリック
2. **「新規スクリプトを作成」** を選択
3. エディタが開くので、中身を **全選択（Ctrl+A / Cmd+A）→ 削除**
4. [`scripts/suno-autofill.user.js`](scripts/suno-autofill.user.js) の内容を **全文コピーして貼り付け**
5. **Ctrl+S / Cmd+S** で保存 → タブを閉じる

#### 3. 使い方

`/suno` スキルで Style や歌詞を生成した後:
1. 「Sunoに送る？」と聞かれたら「はい」
2. スキルが JSON をクリップボードにコピーし、ブラウザで `suno.com/create` を開く
3. Tampermonkey がクリップボードから読み取り、フォームに自動入力

#### 注意点

- **初回のみ**: ブラウザがクリップボードの読み取り許可を求める場合があります → 「許可」を選択
- **Suno にログイン済み**の状態で使ってください
- スクリプトが動かない場合: Tampermonkey アイコン → スクリプトが有効（ON）になっているか確認

### オートマスタリング — Suno の音のクセを知っているから、ちゃんと直せる

汎用マスタリングツールは「良い録音素材を磨く」前提で作られています。でも Suno の出力は違う — 既にマスタリング済みで、特有のクセを持った「加工済みレンダリング結果」です。汎用ツールで押し込んでも AI っぽさが露呈するだけ。

このスキルは **Suno V5/V5.5 の出力特性を前提とした修復的アプローチ** を取ります。仕様は ChatGPT × Gemini のクロス議論で策定しました。

**処理エンジン:** [Spotify Pedalboard](https://github.com/spotify/pedalboard)（JUCE ベース — DAW プラグインと同等品質）

**処理フロー:**
1. **スキャン** — ffmpeg で LUFS・ダイナミクス・周波数バランスを計測
2. **判断** — Suno 特有の問題がどの程度あるか数値で判定、ユーザーに報告
3. **処理** — Pedalboard で条件付きチェーン（不要な処理は入れない）
4. **ノーマライズ** — ジャンル別ターゲット LUFS

| Suno 固有の問題 | なぜ起きるか | このスキルの対処 |
|---------------|------------|----------------|
| 3.8-5.2kHz のシマー | Suno のレンダリングエンジン由来の金属的光沢 | スキャンで突出検出 → -1〜-2dB カット |
| 8-12kHz の刺さり | v5.5 で顕著。ボーカル/シンバルがキツい | シェルフ -0.5〜-1.5dB |
| 95-120Hz の泥 | 低域が膨らむ典型パターン | 条件付きカット |
| ダイナミクスが既に狭い | Suno 内部で圧縮済み（LRA 3-5dB） | **コンプをスキップ**（汎用と逆） |
| 音量が商業曲より小さい | LUFS -22〜-18 で出力される | Gain + Limiter + loudnorm |
| 二重マスタリングリスク | Suno Remaster 済みに外部処理を重ねると濁る | 処理量を自動制限 |

**基本方針: 削る → 整える → 持ち上げる。エキサイター等「足す」処理はデフォルト OFF。**

**リファレンスマッチ:** 「この曲みたいな音にして」と言えば [Matchering](https://github.com/sergree/matchering) で自動マッチ

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
├── mygpts/                             # ChatGPT CustomGPT
│   ├── style-analyzer/
│   └── lyrics-writer/
├── scripts/
│   └── suno-autofill.user.js           # Tampermonkey（Suno自動入力）
└── skills/
    └── suno/                           # /suno スキル（自己完結型・正本）
        ├── SKILL.md
        └── knowledge/                  # 共通ナレッジ（正本）
            ├── lyric_craft.md          # 伏線、韻、フック、コーチング
            ├── song_structures.md      # 構成パターン、エネルギーカーブ
            ├── style_catalog.md        # ジャンル別テンプレ、楽器/プロダクション語彙
            ├── rap_and_flow.md         # ラップ専用: フロー、韻スキーム、日本語ラップ
            ├── english_lyrics.md       # 英語/バイリンガル: プロソディ、クロス韻
            ├── suno_v55_reference.md   # V5.5 リファレンス
            └── yaml_template.md        # YAML出力テンプレート
```

## knowledge 更新時

knowledge ファイルは `skills/suno/knowledge/` を直接編集する。スキルが自己完結しているため別途同期は不要。

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
