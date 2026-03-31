# 英語歌詞とバイリンガル設計 — 韻・プロソディ・日英ミックス

## 1. 英語韻体系

### 基本ルール
- 英語歌詞では rhyme は「見た目」より**音**で判定する。
- perfect rhyme だけだと子どもっぽくなりやすい。verse では slant rhyme や internal echo も使う。
- hook は強めの rhyme、verse は自然さ優先、bridge は外してコントラストを作ってよい。
- 英語の rhyme 設計を日本語へ移すときは、stress の一致ではなく**意味重心 + モーラ配置**へ翻訳する。

### 例

```text
perfect rhyme   : light / night
slant rhyme     : shape / late
assonance       : slow road / cold smoke
consonance      : blank / think
alliteration    : silver smoke, summer skin
eye rhyme       : love / move
```

### 韻体系表

| 類型 | 定義 | 使いどころ | 注意点 |
|------|------|------------|--------|
| perfect rhyme | 最後の stressed vowel と後続音が一致 | chorus, anthem, title line | 連発すると nursery-rhyme 化しやすい |
| slant rhyme | 完全一致しない近似韻 | verse, indie, confessional | 音が遠すぎると散る |
| assonance | 母音反復 | sung melody, rap, internal glue | 母音だけで押し切ると弱くなることもある |
| consonance | 子音反復 | texture, subtle binding | 母音が遠いと印象が薄い |
| alliteration | 語頭子音反復 | hook の立ち上がり、印象付け | 過剰だと tongue twister になる |
| eye rhyme | 綴りだけ似る | printed lyric, spoken word | 歌では伝わりにくい |

---

## 2. メーター / 韻律

### 基本ルール
- 英語 lyric の rhythm は syllable count だけでなく、**stressed / unstressed の並び**で決まる。
- meter を完全固定する必要はないが、基調となる foot を持つと line に安定感が出る。
- song lyric では poetic meter の厳密再現より、**自然発話と melodic shape の一致**が優先。

### 例

```text
iambic    : to-NIGHT we STAY
trochaic  : BRO-ken TA-ble
anapestic : in the DARK
dactylic  : MER-ri-ly
```

### foot 類型表

| 類型 | パターン | 感触 | 歌詞での使いどころ |
|------|----------|------|------------------|
| iambic | 弱 -> 強 | 会話的、自然、上昇 | verse, confessional pop |
| trochaic | 強 -> 弱 | 断定的、chant 的 | slogan hook, rock, anthem |
| anapestic | 弱 -> 弱 -> 強 | 走る、弾む | pre-hook, pop-rap, uplift |
| dactylic | 強 -> 弱 -> 弱 | 転がる、演劇的 | novelty, theatrical section |

---

## 3. プロソディ

### 基本ルール
- stressed syllable は強拍か melodic peak に置く。
- `the / of / in` のような軽い function word を高音や line end に置きすぎない。
- syncopation 自体は悪くないが、ずらすなら**意図的な支点**を残す。
- 高い音は意味上の重みを増幅する。hook word, title phrase, emotional keyword をそこへ置く。

### 例

**自然な配置**
```text
I STILL be-LIEVE in YOU to-NIGHT
```

**悪い配置の考え方**
```text
re-CORD を RE-cord のように歌わせる
```

### 実務表

| 項目 | ルール | 効果 |
|------|--------|------|
| strong beat | stressed syllable を置く | 自然で歌いやすい |
| melodic peak | 核心語を置く | 記憶に残る |
| line ending | content word で締める | 余韻が強くなる |
| syncopation | 支点を残してずらす | 推進感、緊張感 |
| phrasing | strong bar / weak bar を意味と合わせる | 安定 / 不安定の演出 |

---

## 4. 英語フック設計

### 基本ルール
- hook は 3-6 語の核句を先に決める。
- earworm は「短い」「反復できる」「歌える」「stress が自然」の4条件で強くなる。
- 重要語は downbeat, melodic peak, line ending のどれかへ置く。
- 反復は同句コピペだけでなく、**1語差分の variation**を混ぜる。

### 例

```text
Stay where the fire knows my name
Stay where the fire knows
```

### フック設計表

| 項目 | ルール | 悪化パターン |
|------|--------|-------------|
| 長さ | 3-6語で核句を作る | 1行が長すぎて sing-along 不能 |
| stress | hook word を強拍か頂点に置く | peak note に `the / and / of` |
| repetition | 同句反復 + 1語差分 | 完全コピペのみで単調化 |
| singability | 開口母音や言いやすい子音を使う | 子音クラスター過多 |

---

## 5. バイリンガル戦略

### 基本ルール
- 日英ミックスは「飾り」ではなく、**役割分担**として設計する。
- 英語はクールさ、距離感、宣言、普遍メッセージに強い。
- 日本語は親密さ、内省、情緒、情景描写に強い。
- コードスイッチは section boundary が最も安定。mid-line は意図が明確なときだけ使う。

### 例

```text
Verse  : 日本語で情景
Chorus : 英語の短い宣言
Bridge : 英語に全面切替して距離感を作る
```

### 配置パターン表

| パターン | 向く場面 | 英語比率の目安 |
|---------|---------|---------------|
| サビ英語 / Verse日本語 | J-Pop, anime, pop ballad | 15-35% |
| Hook 英語 / 本文日本語 | mainstream pop, city pop | 10-25% |
| ブリッジ英語 | 感情距離、転換、夜景感 | 15-30% |
| ラップだけ英語混在 | hip hop, trap, drill | 30-50% |
| 交互 line switch | bilingual identity, experimental pop | 40-60% |

### コードスイッチングのルール
- section boundary で切り替えるのが最も自然
- mid-line switch は hook 効果か rhyme 効果があるときだけ
- 助詞の直後に不自然な英語挿入は避ける
- カタカナ外来語を緩衝材にすると切替が滑らかになる

---

## 6. クロスランゲージ韻

### 基本ルール
- 日英韻は「辞書的な正解」より、**母音列と聴感**で判定する。
- 完全同音、近似母音、カタカナアンカー、行中 echo を使い分ける。
- 英語ネイティブ発音に寄せる場所と、カタカナ的に歌わせる場所を混ぜない。

### 例

```text
night / ないと
so / そう
free / 不利
fire / はいや
```

### 日英韻ペア表

| 英語 | 日本語 | タイプ |
|------|--------|--------|
| night | ないと | 完全同音 |
| so | そう | 近似同音 |
| go | ぞ / go | フック用アンカー |
| say | せい | 母音近似 |
| free | フリー / 不利 | 音像近似 |
| fire | ファイヤー / はいや | 母音列アンカー |
| my way | 迷い | 母音韻 |

### 実務ルール
- 英語行末と日本語行末の**末尾母音**を揃える
- カタカナ外来語を rhyme buffer に使う
- ABAB の A を日本語、B を英語にしても母音列が合えば成立する
- 行末だけでなく行中の英単語でも echo を足す

---

## 7. 日本語への応用

### 基本ルール
- 英語の stress は、日本語では**意味重心 + モーラ配置 + メロディ頂点**へ翻訳する。
- pitch accent は厳密再現より、極端な不自然さの回避を目標にする。
- 助詞は弱位置へ、内容語は強位置へ。
- 英語のクールさ、日本語の親密さという**感情レジスタ差**を意図的に使い分ける。

### 例

```text
英語: I won't let go
日本語: はなさないよ
```

- 英語版は宣言的で硬い
- 日本語版は近く、温度が高い

### 応用表

| 英語の概念 | 日本語での置き換え | 実務メモ |
|-----------|------------------|---------|
| stress | 意味語の核モーラ | 拍頭や高音へ置く |
| unstressed | 助詞・機能語 | 弱位置へ逃がす |
| melodic peak | サビの頂点語 | 抽象語より具体語が強い |
| cool distance | 英語 phrase | title, hook, 宣言に向く |
| intimate warmth | 日本語 phrase | confession, memory, regret に向く |

### GPT への落とし込み
- `language_mode`: ja / en / bilingual
- `rhyme_type`: perfect / slant / assonance / consonance / mixed
- `prosody_mode`: natural / syncopated / chant / floating
- `hook_focus`: first-word / end-word / peak-note word
- `bilingual_ratio`: low / mid / high
- `switch_style`: section_boundary / mid_line / tag_only
