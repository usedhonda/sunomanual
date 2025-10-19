# Suno V5 プロンプト裏マニュアル

## 目次
- [1. 基礎編（裏マニュアル1 原文）](#1-基礎編裏マニュアル1-原文)
- [2. 応用テクニック編（裏マニュアル2 原文）](#2-応用テクニック編裏マニュアル2-原文)
  - [2-A. Double-Layer構造補遺](#2-a-double-layer構造補遺)
- [参照先URL一覧（リンクのみ）](#参照先url一覧リンクのみ)

## 1. 基礎編（裏マニュアル1 原文）



### **Suno V5 プロンプト作成の裏マニュアル：プロデューサーレベルの制御とワークフロー**

#### **I. Suno V5 プロンプト設計の基礎：V4.5からの脱却と新パラダイム**

Suno V5モデルは、オーディオ生成技術において大きな進化を遂げており、従来のバージョン、特にV4.5以前と比較して、音質（Audio Quality）とボーカルのリアリティ（Vocals）が飛躍的に向上しています 1。V5は、「スタジオレベル」と形容されるフルレンジのバランスと最小限のグリッチを備えたクリアなミックスを提供します 1。ボーカルは、呼吸やビブラートを含む「本物の人間らしい」発声に近づいており、プロの歌手に近い表現を可能にしています 1。

##### **1\. V5モデルの特性と「V5パラドックス」の理解**

V5の高度な性能は、そのモデルがセクションレベルの制御により強固に追従し、長尺の曲を生成する際にもスタイルドリフト（一貫性の喪失）が大幅に減少した点に現れています 1。しかし、この技術的洗練は、プロンプト設計における新たな課題も生み出しました。

V5の課題の一つは、特定のコミュニティの報告によれば、プロンプトが具体的でない場合、生成結果が「ジェネリックで退屈」になりやすいという点です 4。これは、モデルがメインストリームの高品質な音楽データに強く訓練されているため、曖昧な指示（例：「Pop Song」）に対しては、最も安全で、無難な（すなわち、クリシェ的で汎用的な）ポップ構造を選びがちになる傾向に起因します 4。

この「V5パラドックス」を克服するためには、単にジャンルをタグ付けするのではなく、「どのようにミックスされ、どのように演奏されるか」という**プロダクション指示書**を作成する義務がユーザーに生じます。高品質な出力を得るためには、年代、サブジャンル、影響元、そして具体的な音響特性を組み合わせた、極めて詳細な指示が必須となります 4。

##### **2\. プロンプト構成の「四本柱」再定義（The Four Pillars）**

効果的なV5プロンプトの構成は、従来の基本要素をさらに高い粒度で記述する必要があります 5。

Table 1: スタイルプロンプト設計の「四本柱」チェックリスト

| 柱（Pillar） | 要素（必須度：高） | 裏マニュアルの推奨事項（例：英語プロンプト） | 出典 |
| :---- | :---- | :---- | :---- |
| 1\. ジャンル & スタイル | 具体的サブジャンル、年代、融合 | "90s Alt-Rock with Britpop undertones," "Gospel Trap with Persona," "Dark synthwave" | 7 |
| 2\. ムード & 感情 | 楽曲全体の雰囲気、トーン | "Melancholic mood," "Uplifting and anthemic," "high tension" | 5 |
| 3\. 楽器 & プロダクション | 主要な楽器、音響特性（重要） | "Pulsing 808 bass," "Analog pad, spatial depth, tape saturation" | 7 |
| 4\. ボーカル設定 | 声質、性別、歌い方、エフェクト | "Sultry female vocals, whispery delivery," "Robotic male vocals" | 5 |

##### **3\. スタイルプロンプトの「解剖学」とプロデューサーレベルの表現**

###### **A. 理想的な4部構成テンプレートの適用**

プロデューサーレベルの制御を実現するために、スタイルプロンプトは以下の4つのセクションに明確に分割し、モデルに与える情報を構造化することが推奨されます 9。

1. **Genre:** 具体的でニッチなサブジャンル（例：「Tech House / Trance」） 9  
2. **Exclude:** 望まない要素（ネガティブプロンプト）。（例：「Vocals, Trap, Dubstep」） 9  
3. **Instruments:** 主要な楽器とボーカル処理。（例：「soft female vocals; supersaw leads; pounding percussion」） 9  
4. **Tags:** BPM、ムード、ドロップの種類、その他の付加情報。（例：「136 BPM; extended build; euphoric peak」） 9

このテンプレートを使用することで、モデルの解釈のブレを最小限に抑え、特定の音楽的目標に焦点を当てた出力を得ることが可能になります 9。

###### **B. 核心技術：プロダクション品質タグ（ソニック形容詞）の活用**

V5のモデルは、従来のV4.5よりも音響的な詳細記述、すなわち「ソニック形容詞」に非常に強く反応することが確認されています 10。これは、音の最終的なミキシングと音色を定義するための指示であり、V5の「スタジオ品質」を最大限に引き出すために不可欠です 1。

例えば、単に「synth」と記述する代わりに、**音色/質感**を指示する「analog pad」や「reverb-drenched pluck」、「spectral keys」といった具体的なタグを使用します 10。また、Lo-Fiやヴィンテージ感を強調するために、「tape saturation」や「vinyl hiss」、「lo-fi texture」といったテクスチャタグも有効です 3。

さらに、**ミキシングと空間処理**に関するタグも重要です。V5は音の配置（空間深度）をより正確に処理できるため、「clarity (明瞭さ)」、「separation (分離度)」、「spatial depth (空間の深さ)」、「warmth (暖かさ)」、「punch (迫力)」、「stereo width (ステレオ幅)」、「analog glue compression (アナログコンプ感)」といった専門用語を組み込むことで、生成されたトラックのミキシング品質をプロレベルに近づけることができます 7。

###### **C. 裏技：アンカーリング戦略による一貫性のロックイン**

V5で一貫性の高いVibe（雰囲気）を維持する実用的なハックとして、「アンカーリング戦略」が知られています。これは、曲の根幹となるクリティカルなスタイルやムードの用語（例：「cinematic」「emotional」）を、スタイルプロンプトの**最初と最後**の両方に配置するというものです 1。

モデルの解釈メカニズムにおいて、プロンプトの先頭と末尾に繰り返されたキューは、そのキーワードの重みを増す効果があり、特に長い生成チェーンにおけるスタイルドリフト（一貫性の喪失）を防ぐための強力な手段として機能します 1。

###### **D. ジャンル融合の最適化**

V5では、ジャンル融合（Fusion Genres）の安定性が大幅に向上しました 3。V4.5では不安定になりがちだった複数のジャンルの組み合わせも、V5では「2つのジャンルペア」に限定することで、安定した音楽的で予測可能な結果が得られます 3。例えば、「Pop \+ EDM」や「Gospel \+ Trap」、「Jazz \+ Hip Hop」といった組み合わせが推奨されます 3。しかし、3つ以上のジャンルを重ねると、再び不安定化するリスクが高まります 3。

#### **III. カスタム歌詞とメタタグによる構造制御の完全マニュアル**

V5における高度な楽曲制御は、Custom Lyrics入力フィールド内で使用されるメタタグ（\`\`）によって実現される「二層制御構造」に基づいています 3。Style Promptが「音の素材とミキシング」を指示するのに対し、Custom Lyrics内のメタタグは「構成、パフォーマンス、タイミング」を直接制御します 3。

##### **1\. メタタグの役割とV5での強化点**

V5では、メタタグがStudio機能（Remake, Rewrite, Extend）と連携した際の信頼性が大きく向上しています。特に、長尺の曲を生成する際や、特定のセクションを編集する際に、タグによる指示がより確実に尊重されます 3。

Table 2: V4.5とV5におけるメタタグ処理挙動の比較

| 挙動 | V4.5（過去の挙動） | V5（現在の強化挙動） | 出典 |
| :---- | :---- | :---- | :---- |
| プロンプト構造化 | タグは使用可能だが、コールバックは無視されがち | **Studioがタグを尊重し、コールバックが確実に機能** | 3 |
| 感情タグ | 時折曖昧になる | **より明確な感情マッピング** | 3 |
| ジャンル融合 | 3つ以上のスタイルで不安定化 | **2つのジャンルペアは安定し、音楽的** | 3 |
| 拡張（Extend）チェーン | 30～60秒後にスタイルドリフトが発生しやすい | **ファ less drift across multi-minute chains** | 3 |
| セクション置換 (Replace) | コーラス/ブリッジに限定 | **スムーズなトランジションでセクション全体を置換可能** | 3 |
| Personas | セクション間で一貫性がない | **曲全体で一貫したトーンメモリ** | 3 |

この比較からわかるのは、V5のモデルアーキテクチャがセクション単位での文脈（コンテキスト）を深く理解するようになったことです 3。これにより、ユーザーは曲全体ではなく、問題のある特定のセクション（例：退屈なブリッジ）に対してのみタグを変更し、Remakeアクションを適用することで、効率的に楽曲を修正できます 2。

##### **2\. 構造タグとダイナミック・インストラクションの埋め込み（Producer Hack）**

構造タグは、楽曲の基本構造をAIに強制します。これには、一般的な\[Intro\], \[Verse\], \[Chorus\], , \`\[Outro\]\`に加えて、EDMやダイナミックなジャンルで使用される\`\[Pre-Chorus\]\`, , , が含まれます 15。

さらに、V5では、歌詞内に時間指定や具体的な楽器指示を埋め込む「ダイナミック・インストラクション」が強力な裏技として機能します 1。これにより、特定のセクションの特定の瞬間に音楽的なハイライト（ソロやブレイク）を強制することができます。

* **ダイナミック・インストラクションの例:**  
  * \`\` (ブリッジで15秒間のアコーディオンソロを強制) 1。  
  * \`\` (歪んだベースのドロップを強制) 1。

##### **3\. ボーカル制御の精度向上タグリスト**

V5のボーカルは非常にリアルになったため、声のトーン、エフェクト、感情を細かく指定することで、その表現力を最大限に引き出すことができます 11。

Table 3: V5対応：高度なボーカル・インストゥルメンタル表現タグ

| カテゴリ | タグ例 (English Prompt) | 目的とV5での効果 | 出典 |
| :---- | :---- | :---- | :---- |
| **構造制御 (動的)** | , , \`\` | EDMやロックにおけるエネルギーの変化を強制 15 | 15 |
| **ボーカルスタイル** | \[raspy lead vocal\], \[whispery delivery\], \[anthemic chorus\] | 歌唱者の声質、表現方法を指定 3 | 3 |
| **ボーカルエフェクト** | \[autotuned delivery\], \[stacked harmonies\], \[vocoder\], \[granular vocals\] | ポストプロダクション効果を指定 10 | 10 |
| **楽器表現** | \[808 sub bass\], \[60s jangly guitar rhythm\], \[pedal steel guitar\] | ジャンル固有の楽器と奏法を指定 15 | 15 |
| **テクスチャ/ループ** | , | ヴィンテージ感を付与し、クロスフェードの安定化を促す 3 | 3 |

#### **IV. 高度な応用技術とマルチ・ワークフロー**

##### **1\. 裏技：複数ボーカル生成の非線形ワークフロー**

Suno V5は、現時点では、一つの生成リクエストで複数の声色やペルソナを同時に生成させようとすると失敗します 20。複数のボーカル（例：デュエット、ラッパーの交代）を成功させるためには、Studio機能を使った「セグメント化された非線形ワークフロー」が必須となります 20。

このプロセスでは、まず**Voice 1**のスタイルで最初のセクション（コーラスまたはヴァース）を生成し、これをベースステムとします 20。Voice 1のセクションをExtendやReplace Sectionで完成させた後、**Voice 2**のセクションを生成する際に、AIに対して「声が変わった」という強い信号を送る必要があります 20。

* **セグメント化とシンコペーション変化の強制:** Voice 2の導入部を生成する直前で、編集画面の開始点を**正確に前のVoice 1の最後の音の直後**に設定し、新しいプロンプトで以下の変化を強制します 20。  
  1. **ボーカルタグ:** \`\`など、性別やスタイルを明記する 20。  
  2. **シンコペーション/音節数の変化:** Voice 1がゆっくりとした4音節/行で歌っている場合、Voice 2のパートを意図的に速い10音節/行に設定します。V5は音節数の変化をスタイルの切り替え（例：歌からラップへ）として認識しやすくなります 20。

このように、人間がDAWで行うように、セクションごとに音源を切り替え（Extendの開始点の精密な設定）、AIに対して「ここで別の人が歌い始める」という強い信号を送ることで、複数ボーカルの共存を実現します 20。

##### **2\. BPMとキー制御の限界とDAW補正の必要性**

BPM（テンポ）やキー（調性）の指定（例: 120 BPM, A minor 7）は、V5でも依然として厳密な再現性に欠け、「気まぐれ」な挙動を示すことがコミュニティで報告されています 22。特にExtend機能を使用して曲を長くした場合、テンポがドリフトしやすいという問題があります 22。

* **BPM固定のハックと限界:**  
  1. グローバルプロンプト（Style of Music）と、各セクションノート（カスタム歌詞の上部）の両方にBPMを明記する 25。  
  2. Studioでタイミングがブレたセクションに対して、BPM/キーを再記述し、Remakeを適用して修正を試みる 25。

V5は音楽生成ツールとして優れていますが、テンポやハーモニーといった音楽の基礎理論の厳密な再現性には限界があるという事実を受け入れる必要があります 22。したがって、プロレベルの音楽制作者は、Sunoの出力を「アイデアのたたき台」または「素材」とみなし、Studioでの微調整と、DAWでの精密な時間軸・周波数補正を前提とした**ハイブリッドワークフロー**を組むことが、商業的な品質を保証するために不可欠です 25。

##### **3\. 発音と音節の強制：ホモグラフ問題へのフォネティック・スペル修正**

V5は多言語と英語の発音が向上しましたが、英語の**ホモグラフ**（同綴異義語：例 read \[reed/red\] や live \[liv/laiv\]）の誤読が発生する可能性があります 2。

この問題への解決策は、AIに発音させたい音に合わせたフォネティック・スペル（音声的なつづり）を歌詞に記述することです 2。

* **フォネティック修正の例:**  
  * "live" (コンサートの意図) → "lyve" 2。  
  * "bass" (楽器の意図) → "basss" or "bahss" 2。  
  * "tear" (泣くの意図) → "teer" 2。

また、非英語のプロンプトでは、シンプルに保ち（例：「Emotional ballad in Spanish, piano and strings」）、歌詞は完全な文章で記述して構文を維持し、1つのセクション内では言語を統一することが推奨されます 2。

#### **V. Suno Studioとプロフェッショナルなワークフロー**

V5 Studioの強化された編集機能は、プロンプトの不確実性を埋め、楽曲を完成させるためのプロトコルを提供します 2。

##### **1\. Creative Control Slidersの操作術：セクション別最適設定**

V5では、以下の3つのスライダーを調整して、セクションごとの出力を微調整します 2。特に、セクションをRemakeまたはRewriteする際に、これらの設定を戦略的に調整することが重要です 25。

Table 4: V5 Studioワークフロー：セクション別スライダー推奨設定

| セクション | Weirdness (多様性) | Style Influence (忠実度) | 目的 | 出典 |
| :---- | :---- | :---- | :---- | :---- |
| Chorus（コーラス） | 35–45% (一貫性重視) | 70–85% (スタイル固定) | フックの安定とキャッチーさの確保 | 25 |
| Verse（ヴァース） | 40–55% (適度な変化) | 55–70% (スタイル維持) | 安定しつつもボーカルに集中させる | 25 |
| Bridge（ブリッジ） | 55–70% (高め) | 45–60% (低め) | 構成の転換、実験的なテクスチャの探求 | 25 |
| Audio Influence (Upload時) | N/A | 60–75% (リード) / 20–40% (テクスチャ) | 外部オーディオの影響度を制御 | 25 |

「Weirdness」スライダーは、一貫性が必要なコーラスでは低く保ち 25、「Style Influence」スライダーは、プロンプトへの忠実度を維持するために高く設定します 25。一方、ブリッジでは、構成的な転換を促すため、「Weirdness」を上げて新しいアイデアを探索することが効果的です 25。

##### **2\. アレンジャーの視点：楽器の重なりを防ぐヒューリスティクス**

V5は音の質は高いものの、アレンジが過剰になり「Muddy Mix（濁ったミックス）」が発生しやすいという問題があります 2。プロの音楽制作の観点から、各セクションの楽器構成を意図的にシンプルに保つヒューリスティクス（経験則）を適用することが推奨されます 25。

* **Verse（ヴァース）:** 中音域の楽器を最大2〜3つに制限し、ボーカルを妨げるリード楽器を排除します 25。  
* **Pre-Chorus（プリコーラス）:** ライザーやタムフィルなど、エネルギーを持ち上げる要素を1つだけ追加します 25。  
* **Chorus（コーラス）:** 1つのフックとなる楽器とクリアなリードボーカルを中心に、他のパートはサポート役に徹します 25。  
* **ネガティブプロンプトの活用:** 意図的に「no lead guitar in chorus」や「minimal low-mid pads in verse」といったネガティブな指示を埋め込むことで、パートの多すぎるアレンジを未然に防止します 25。

##### **3\. ハイブリッドワークフロー：外部オーディオの統合**

Pro/Premierユーザーが利用可能なオーディオアップロード機能は 27、既存のボーカルや演奏（WAVファイル）をAI生成と組み合わせるハイブリッドワークフローを可能にします 2。

* **アップロードのベストプラクティス:**  
  * クリーンな44.1 kHz WAVを使用し、タイミングが安定していることを確認する 25。  
  * アップロードの役割（"featured vocal/riff" or "ambient texture"）とBPM/キーを明確に記述する 25。  
  * **Audio Influenceスライダーの制御:** アップロードを主役にしたい場合は60〜75%に、背景のテクスチャとして使いたい場合は20〜40%に設定します 25。アップロードがミックスを支配しすぎた場合は、このスライダーを下げて「texture」としてマークすることで対応します 25。

##### **4\. 構成破綻・テンポドリフトの修正：Studioでの最小範囲Remake戦略**

生成された曲に欠陥（フックの不一致、セクションのスキップ、タイミングのずれ）がある場合、全体を再生成するのではなく、Studio機能を用いて最小限の範囲で修正することが、クレジット効率と創造的制御の観点から最も優れています 2。

例えば、フックが一貫しない場合、Weirdnessが高すぎるのが原因である可能性が高いです。この場合、該当するChorusセクションをRemakeし、Weirdnessを下げ、Style Influenceを上げるという局所的な戦略を適用します 25。また、トランジションが硬い場合は、Extend機能でセクションを1〜2小節残し、プロンプトに「soft transition / no hard stop」を追加することで、スムーズな切り替わりを促します 25。

#### **VI. トラブルシューティングとネガティブプロンプトの応用戦略**

##### **1\. ネガティブプロンプトの二重戦略**

SunoのCustom Modeで利用できる「Exclude Styles（除外スタイル）」ボックスは、特定のジャンルや楽器を確実に排除する機能ですが 28、真の制御はこれをStyle Prompt内のネガティブフレーズと組み合わせる「二重戦略」によって達成されます 25。

* **戦略 1: Exclude Styles（フィルター）:** ジャンルや楽器レベルの大きな要素を排除するために使用します。例えば、「electronic」（アコースティックを目指す場合）や「drums」（インストゥルメンタルでパーカッションのみを使用したい場合）などが有効です 29。特にMetalやTrapで意図しない「flute」が入るケースなど、特定の楽器の混入を防ぐのに役立ちます 31。  
* **戦略 2: Style Prompt内ネガティブフレーズ（バランス補正）:** ミックスやプロダクションレベルの微細な指示を行うために使用します。例として、「no lead guitar in chorus」や「minimal low-mid pads in verse」、「natural vocal tone; avoid heavy processing」といった指示をStyle Promptに埋め込むことで、音の濁りや意図しないリード楽器の出現を防ぐことができます 25。

##### **2\. V5の「癖」への対処法**

V5はR\&Bやポップミュージックの構造にバイアスを持つ傾向があり、プロンプトに関わらず意図しない要素（ハミング、コーラス、特定の楽器）が出現することがあります 23。

* **意図しない要素の排除:** 「Exclude Styles」で「choir」や「female humming」を明示的に排除します 23。また、Weirdnessスライダーを低く設定することで、モデルがトレーニングデータ外の創造的な逸脱をするのを防ぎます 25。  
* **ボーカル性別の強制:** Style Promptで「Vocals: Male」と指定しても、Exclude Stylesで「female vocals」を排除しても、V5が無視するケースが報告されています 23。この場合、複数の試行を重ねるか、Custom Lyrics内でより具体的なトーンタグ（例：「Deep male baritone, raw delivery」）を繰り返し使用して、AIを誘導する必要があります 11。

##### **3\. 歌詞が歌われない、セクションがスキップされる問題の解決**

V5が歌詞を無視したり、特定のセクション（BridgeやOutro）をスキップしたりする問題が発生することがあります 32。

* **原因と修正:**  
  * **複雑なプロンプトやメタタグ:** 過度に複雑なプロンプトや実験的なメタタグはAIを混乱させる可能性があります。プロンプトを簡素化し、必須要素のみに絞ります 33。  
  * **競合する指示:** Style PromptとCustom Lyrics内の指示が矛盾していないか確認します 33。  
  * **構造タグの誤用:** 構造タグ\[Verse\], \[Chorus\]は、歌詞の行や音節数を考慮して配置する必要があります。コーラスとヴァースの音節数を意図的に変えることで、AIがセクションの違いを認識しやすくなります 21。  
  * **バグへの対処:** Style Promptが歌詞として歌われてしまうバグが発生した場合は、\[ \]内が歌詞と接触していないか、または長すぎる指示になっていないかを確認し、新しい行で区切るなどの対策を試みます 34。

#### **VII. 商用利用権と著作権の法的側面（日本市場における留意点）**

プロのクリエイターがSuno V5を商用利用する上で最も重要なのは、法的側面の理解です。

##### **1\. プラン別利用権の差異**

Sunoの利用規約に基づき、楽曲の権利はプランによって明確に区別されます 35。

| プラン | 楽曲の所有権 | 商用利用権 | 制限事項 |
| :---- | :---- | :---- | :---- |
| **Basic (無料)** | Sunoが所有 | 非商用利用のみ | 収益化不可。無料期間に作成した楽曲は、後から有料プランに変更しても商用利用権は付与されない 36。 |
| **Pro / Premier (有料)** | ユーザーが所有 | 商用利用ライセンスを付与 | ユーザーは曲の販売、ストリーミング配信（Spotifyなど）、収益化が可能 35。 |

有料プランの購読者は、Sunoから商業利用ライセンスを付与され、「曲を所有する」ことになります。これにより、第三者の商業活動を妨げられることなく、ストリーミングサービスへの配信や収益化が可能です 35。

##### **2\. AI生成音楽の著作権：現行法と法的保護戦略**

有料プランの購入は「商業活動の許可証」ではありますが、「著作権の保証書」ではありません 35。AI生成物に対する著作権法は地域によって異なり、現在も法整備が進んでいる途上にあります 36。多くの法的な解釈では、著作権は人間の創作活動に与えられる権利であり、純粋なAIの生成部分が自動的に著作権保護の対象となるか否かは曖昧です 35。

この法的曖昧さに対処し、法的保護の可能性を最大化するためには、クリエイターが「創造的制御」を最大限に行使していることを証明するワークフローが重要となります 38。

* **法的保護戦略としてのプロンプト技術:** ユーザーがプロンプト、歌詞、構造、アップロードした音源を通じて「創作意図」と「制御」を強く示した作品は、純粋なAI任せの作品よりも法的に保護される可能性が高まります 38。高度なプロンプト技術（カスタム歌詞、ハイブリッドアップロード、Studio編集）は、単なる音質向上だけでなく、**法的に保護されやすい要素を意図的に組み込む**ための重要な戦略と位置づけられます 38。  
* **ステム利用のプロトコル:** V5のマルチステム（最大12ステム）エクスポート機能は、最終的な商業品質を達成するために不可欠です 2。ステムをDAWに持ち込み、外部のプロセッサ（EQ, コンプレッサー, リミッター）を使用してマスタリングを行うことで、Sunoの出力では実現できない最終的なラウドネスと音響調整を行います 25。これにより、楽曲は商業的な品質基準を満たし、最終的な制作プロセスにおける人間の介入と制御の度合いを明確に示すことができます 25。

##### **3\. リリースに向けた最終的な品質管理とデリバラブル**

商用リリースを念頭に置く場合、以下のデリバラブル（納品物）のセットを準備する必要があります 25。

* フルミックス WAV (Full mix WAV) 25  
* インストゥルメンタル (Instrumental) 25  
* アカペラ (A cappella) 25  
* パフォーマンス/TVミックス（リードアドリブなし） 25  
* マルチステム (Multi-stems): DAWでのマスタリング/編集に必要。 25

最終的な品質管理（QC）として、コーラスの一貫性、低音量およびモノラル再生での聴取可能性、およびトランジションのスムーズさを確認することが、プロフェッショナルな仕上げとして求められます 25。

#### **結論と推奨事項**

Suno V5は、AI音楽制作を「アイデア生成」の段階から「プロフェッショナルなプロダクション」の段階へと引き上げました。しかし、その高性能を引き出すためには、ユーザーはもはや単なる「ユーザー」ではなく、「プロダクションの指揮者」としての役割を担う必要があります 2。

本マニュアルで詳述した高度なプロンプト技術は、V5モデルの**汎用的なバイアス**を打ち破り 6、意図した通りのユニークで一貫性のある楽曲を生成するための必須戦略です。

##### **アクション可能な推奨事項**

1. **プロンプトの構造化:** スタイルプロンプトは必ず「Genre, Exclude, Instruments, Tags」の4部構成テンプレートを採用し 9、\*\*ソニック形容詞（例: spatial depth, tape saturation）\*\*を組み込んで、ミキシング品質を直接指示すること 7。  
2. **一貫性の確保:** クリティカルなスタイル要素をプロンプトの最初と最後に繰り返す**アンカーリング戦略**を適用し 1、長尺生成時のスタイルドリフトを最小限に抑えること 3。  
3. **セクション制御の徹底:** Custom Lyrics内のメタタグを構造制御の主軸とし、\`\`のような**ダイナミック・インストラクション**を駆使して、曲のハイライトを強制すること 1。  
4. **ハイブリッドワークフローの導入:** BPM/キーの厳密な制御が困難なため 22、商業利用を目指す作品については、StudioでのRemake戦略に加えて、ステムをDAWに持ち込み、テンポ補正や最終マスタリングを人間が行う**ハイブリッドワークフロー**を前提とすること 25。  
5. **リスク管理:** 複数ボーカルの生成には、セグメント化とシンコペーション変化の強制による**非線形ワークフロー**を採用し 20、誤読されやすい英語のホモグラフには**フォネティック・スペル修正**を施すこと 2。これにより、生成プロセスにおける創造的制御の度合いを高め、法的保護の可能性を最大化すること 38。


## 2. 応用テクニック編（裏マニュアル2 原文）

### 2-A. Double-Layer構造補遺

#### Suno V5 ダブルレイヤー運用ルール（YAML正／歌詞ミラー）



###### 1A. Styleフィールド運用（Suno専用・最大1000文字）

###### Styleサンプル：J‑Pop × Smooth Jazz（ユーザー提示要素の反映）
以下の要素から**1000文字以内のStyle**へ整形する例です。

**Given bullets**
- Genre: A blend of J-Pop’s catchy melodies and Smooth Jazz’s mellow grooves, combining upbeat rhythms with sophisticated harmonic textures  
- Mood: Balanced, introspective, warm, subtly energetic  
- Vocal: Female Solo with clear, expressive articulation and nuanced emotional delivery  
- Instrumentation: Centered on Piano, Rhodes electric piano for smooth, warm tones, and String Quartet providing rich harmonic layers and gentle dynamic swells  

**Style（英語・約700–900 chars）**
J‑Pop meets Smooth Jazz: upbeat yet unhurried, with catchy top‑line hooks riding a mellow pocket. Piano and Rhodes set a warm, silky bed; a string quartet adds lush harmonic layers, gentle swells, and elegant counter‑lines. Keep the groove tight and lightly syncopated; favor soft attack, controlled dynamics, and tasteful space between phrases. Female solo vocal—clear, expressive, and emotionally nuanced—leads with articulate diction; use subtle breaths, light vibrato, and occasional close‑harmony doubles for lift. Choruses should bloom with a polished sheen while staying graceful, never brash; intros remain concise, transitions smooth and musical. Harmony leans on extended tones and color voicings (9ths/11ths), resolving with sophistication rather than spectacle. Mix vision: clean and intimate front‑center vocal, Rhodes and piano in a balanced stereo field, strings supportive not overpowering, rounded low‑end, airy high‑end without glare. Avoid aggressive distorted guitars or EDM supersaws; keep reverbs short to medium with natural room feel. Overall vibe: balanced, introspective, warm—subtly energetic and inviting.

**ワンライナー変換ルール（Bullet → Style）**
- `Genre` → 冒頭の1文で「○○ meets ○○」＋テンポ感・ノリを明示  
- `Mood` → 形容詞を3–5語で**トーン宣言**（balanced/warm等）を本文に散らす  
- `Vocal` → 声質・表現・テクニック（articulate, light vibrato, doubles）を具体語で  
- `Instrumentation` → 土台（Piano/Rhodes）＋彩り（Strings）の**役割**を動詞で記述  
- 最後に **Mix vision / Avoid** を1–2文で締める（1000字内）


**Sunoは「Style」欄を別入力として受け付けます。** 本ガイドのYAMLは「設計図」ですが、**実際の生成では「Style」が最も強く効く**場面が多いため、以下の方針で運用します。

- **Styleは別枠提出**：YAMLの`project / groove / mix / mood / references / vocal tone要旨`を要約・拡張して**Styleに書く**。  
- **歌詞は歌詞、Styleは指示文**：歌詞欄には歌詞＋短いタグのみ。Styleに**詳細な文言（英語推奨）**を記述。  
- **長さ目安**：**600–900文字（最大1000文字）**。過度に短いと効果が薄く、冗長だと要点が希釈。

###### Styleに含めるべき内容（推奨順）
1) **Genre / Substyle / Era vibe**（例: UK acid‑jazz, 90s club funk）  
2) **Groove & Tempo feel**（tight pocket, half‑time drops, syncopated ghost notes）  
3) **Instrumentation & arrangement**（Rhodes 7/9/11, finger bass, short horn tags, sax feature）  
4) **Vocal concept**（F1: slim‑husky agile lead / M1: soft baritone harmonies, call‑and‑response）  
5) **Hook & structure cues**（big stacked choruses, short intro, 12s sax solo in bridge）  
6) **Mix vision**（clean, wide image, short room, crisp transients, lead‑forward）  
7) **Hard constraints / avoid**（no distorted guitars, no EDM supersaw, restrained reverb tails）  
8) **Reference vibe（固有名を避けつつ比喩）**（e.g., “90s London acid‑jazz club energy”）

###### 書き方の原則
- **宣言口調で簡潔に**：長い段落より**箇条書き or 短文列挙**が効く。  
- **否定指定は短く強く**：Avoidは**3点以内**。  
- **“歌われ得る文”は入れない**：歌詞側に回す。  
- **数値は控えめ**：諸秒数はYAMLや歌詞タグのCUE参照に任せ、Styleでは**抽象的に**。

###### Styleテンプレ（英語・約700–900 chars）
```
UK acid-jazz / club funk with a tight pocket; brisk but unhurried feel. Rhodes 7/9/11 voicings, melodic finger bass, dry tight drums with syncopated ghost notes, short horn tags, and tasteful sax feature. Female lead is slim-husky, agile phrasing with airy top; male baritone supports with low harmonies and occasional doubles for call-and-response. Keep intros short and impactful; build into big, stacked choruses that feel uplifting and clean. Bridge introduces a brief halftime pocket and features a concise sax solo (~12s), then return with heightened ad-libs and a strong final hook. Mix vision: clean and wide image, crisp transients, minimal room, lead-forward vocals, balanced horn presence, and punchy but controlled low end. Avoid distorted guitars, EDM-style supersaws, and long cavernous reverbs. Overall vibe: modern polish with a '90s London acid-jazz club energy—danceable, musical, and sophisticated.
```

###### Style出力の運用ルール
- **提出物は常に二本立て**：
  - **Style**（上のテンプレに準拠し、最大1000文字で濃密記述）
  - **Lyrics**（本ガイドのタグ設計に従う）
- YAMLの`cues/roles/rules`は**Styleにコピペしない**（DRY）。必要要旨のみ要約。
- A/B比較では**Styleのみ差し替え**て効果検証可能にする（seed固定）。





### **Suno V5 プロンプト裏マニュアル：プロデューサーレベルの制御と実践ワークフロー**

Suno V5は、AI音楽生成を「スタジオプロダクション」のレベルに引き上げましたが、そのポテンシャルを引き出すには、ユーザーが「プロデューサー」として詳細かつ構造化された指示を与える必要があります 1。あいまいな指示（例: "Pop Song"）は、V5のトレーニングデータの傾向により、**ジェネリックで面白味のない**結果を生み出しがちです 4。

#### **I. V5プロンプト設計の「プロダクション指示書」**

効果的なV5プロンプトは、単語の羅列ではなく、まるでDAWプロジェクトの設計図のように、明確に構造化された4部構成で記述します。

##### **1\. 基礎構造：プロンプトの「YAML的」4部構成テンプレート**

プロンプトは、以下の4つのセクション（キー）に分けて記述することで、AIの解釈のブレを最小限に抑えます 。

| 構成要素（キー） | 目的と制御 | 具体的な英語記述例 | 出典 |
| :---- | :---- | :---- | :---- |
| **Genre & Era** | 音楽的土台、年代、BPM、キーを定義。 | 90s Alt-Rock with Britpop undertones, Progressive Trance, 136 BPM, C minor |  |
| **Exclude** | 望まないスタイルや楽器を確実に排除する（ネガティブプロンプト）。 | Vocals, Trap, Dubstep, Flute, female humming, choir |  |
| **Instruments & Vox** | 使用楽器、ボーカルスタイル、**音響特性**を指示。 | raspy female vocals; supersaw leads; sub-heavy kick; muted trumpet |  |
| **Tags & Mix Notes** | ムード、エフェクト、ミキシング調整（最重要）。 | cinematic; stereo width; spatial depth; tape saturation |  |

**実践例：プロデューサーレベルの構造化プロンプト**

Genre: Deep House / Tech House, 126 BPM, hypnotic groove  
Exclude: Dubstep, Trap, Rock  
Instruments: dry punchy kick; warm analog pad; minimal chords; crisp hats; subtle vox chops  
Tags: low-swing; late-night vibe; clarity; spatial depth; loop-friendly

##### **2\. 核心技術：プロダクション品質タグ（ソニック形容詞）の活用**

V5の「スタジオ品質」を最大限に引き出すためには、音の質感やミキシングに関する「ソニック形容詞」の記述が不可欠です 。これらのタグは、音の最終的なミキシング品質を向上させます 。

| カテゴリ | タグ例 (English Prompt) | V5での効果（ミキシング/音色） | 出典 |
| :---- | :---- | :---- | :---- |
| **音色/質感** | analog pad, reverb-drenched pluck, spectral keys, granular vocals | 楽器の音色やテクスチャを具体的に指定し、リアリティを向上 |  |
| **ヴィンテージ感** | tape saturation, vinyl hiss, lo-fi texture | 温かみやレトロな質感、ノイズを付与する 3 | 3 |
| **ミキシング** | clarity, separation, spatial depth, warmth, punch, stereo width | 音の明瞭度、空間の深さ、迫力、ステレオ広がりを指示 |  |
| **特殊効果** | autotuned delivery, stacked harmonies, vocoder, gated percussion | ボーカルやパーカッションのポストプロダクション処理を指定 |  |

##### **3\. 裏技：アンカーリング戦略による一貫性の固定**

曲の根幹となるスタイル用語やムード（例：cinematic, emotional）を、スタイルプロンプトの**最初と最後**の両方に配置します 。これは、AIがプロンプトの先頭と末尾に繰り返されたキューを優先的に解釈し、長時間の生成におけるスタイルドリフトを防ぐ強力な手段となります 。

**実践例：アンカーリングプロンプト**

Cinematic outlaw country, bluesy pedal steel, raw and emotional vocal... cinematic southern soul

##### **4\. ジャンル融合の最適化と具体例**

V5は**2つのジャンルペア**の融合において高い安定性を持ちます 8。3つ以上のジャンルを重ねると、結果が不安定になるリスクが高まります 8。

| 成功したジャンルペア | 具体的なプロンプト例 | 出典 |
| :---- | :---- | :---- |
| **Gospel House** | Gospel House, female choir vocals, supersaw drop, high tension build | 8 |
| **Nu Metal Trap** | Nu Metal Trap, heavy distortion, pulsing 808 bass, glitched percussion | 10 |
| **Trashcore Cumbia** | Trashcore metal cumbia, danceable ska rhythm, comedic vibe | 11 |
| **Synthwave Fusion** | Dark Synthwave / Electro, 100-115 BPM, analog bass, tape delay, cinematic atmosphere | 12 |

#### **II. カスタム歌詞とメタタグによる「非線形制御」**

Custom Lyrics内のメタタグ（\`\`）は、V5 Studio機能と連携し、楽曲の構成、パフォーマンス、タイミングを直接制御する「二層制御構造」の核です 4。

##### **1\. ダイナミック・インストラクションの埋め込み（高度な制御）**

V5は、歌詞内の特定の位置に時間指定や楽器のハイライトを強制する「ダイナミック・インストラクション」に強く反応します 。

* **ダイナミック・インストラクションの例:**  
  * \[Verse 1\] Soft vocals rise (ブリッジで15秒間のアコーディオンソロを強制) 。  
  * \`\` (歪んだベースのドロップを強制) 。  
  * \`\` (ギターソロを強制) 。

##### **2\. 発音と音節の強制：ホモグラフ問題への対策**

V5でも、英語の**ホモグラフ**（同綴異義語、例：live）の誤読が発生する可能性があります 2。この問題を解決するため、歌詞を意図的に**フォネティック・スペル**（音声的なつづり）で記述する裏技が有効です 2。

また、AIがセクションの違いを認識しやすくするために、**音節数の変化**を利用します。ヴァースとコーラスで歌詞の音節数を意図的に大きく変える（例：遅い4音節/行 $\\rightarrow$ 速い10音節/行）と、AIはセクションの切り替わりをより明確に認識しやすくなります 。

Table 5: 英語ホモグラフへのフォネティック修正

| 単語 (意図) | 誤読リスク | 修正スペル (Optimized Spelling) | 出典 |
| :---- | :---- | :---- | :---- |
| live (コンサートの意図) | liv (住む) | lyve | 2 |
| bass (楽器の意図) | base (基礎) | basss or bahss | 2 |
| tear (泣くの意図) | tare (引き裂く) | teer | 2 |

#### **III. Studioとハイブリッドワークフロー：プロの編集戦略**

V5 Studioの機能（Remake, Rewrite, Extend）は、プロンプトの不確実性を埋め、局所的な修正を可能にします 。

##### **1\. Creative Control Slidersの戦略的運用**

Weirdness（多様性）とStyle Influence（忠実度）のスライダーは、セクションの目的に合わせて戦略的に調整します 。

Table 6: V5 Studioワークフロー：セクション別スライダー推奨設定

| セクション | Weirdness (多様性) | Style Influence (忠実度) | 目的と実践例 | 出典 |
| :---- | :---- | :---- | :---- | :---- |
| Chorus（コーラス） | 35–45% (低め) | 70–85% (高め) | **フックの安定**と一貫性の確保。Remake時も設定を固定 13。 | 13 |
| Bridge（ブリッジ） | 55–70% (高め) | 45–60% (低め) | **構成の転換**、新しいアイデアや実験的なテクスチャの探求 13。 | 13 |
| Audio Influence (Upload時) | N/A | 60–75% (リード) / 20–40% (テクスチャ) | 外部オーディオの影響度を制御。 | 13 |

##### **2\. 裏技：複数ボーカル生成の非線形ワークフロー**

Suno V5は、一つのリクエストで複数の声色を同時に出すのが苦手です 。デュエットやラッパーの交代を成功させるためには、Studioを使った「セグメント化された非線形ワークフロー」が必須です 。

1. **Voice 1でベースを生成しロックする**。  
2. **Voice 2の導入部で強制切り替え（スマートカッティング）**：Studioで新しいセクションの開始点を**前のVoice 1の最後の音の直後**に正確に設定します 15。  
3. **強い信号の送信:** 新しいセクションのCustom Lyricsプロンプトで、**ボーカルタグ**（例: \`\`）と**音節数の変化**の両方を強制することで、AIに声の切り替えを認識させます 。

##### **3\. BPM/キー制御の限界とDAW補正の必要性**

BPMやキー（調性）の指定は、V5でも依然として厳密さに欠けます 。

* **BPM固定のハック:** BPMとキーをグローバルプロンプトと、**各セクションノート**の**両方**に明記します 。  
* **DAW補正の前提:** 商業的な品質を保証するためには、Sunoの出力をDAWに持ち込み、ステムをベースにテンポとハーモニーの精密な補正を行う**ハイブリッドワークフロー**が不可欠です 。

##### **4\. アレンジャーの視点：ミックスの濁り（Muddy Mix）防止**

V5はアレンジが過剰になりやすいため 14、以下の経験則（ヒューリスティクス）を適用し、パートの重なりを防ぎます 。

* **Verse（ヴァース）:** 中音域の楽器を最大2〜3つに制限し、ボーカルを妨げるリード楽器を排除します 。  
* **Chorus（コーラス）:** 1つのフック楽器とクリアなリードボーカルを中心に据え、他のパートはサポート役に徹します 。  
* **ネガティブプロンプトの応用:** Style Prompt内に「no lead guitar in chorus」や「minimal low-mid pads in verse」といった指示を埋め込みます 。

#### **IV. トラブルシューティングと商用利用の最終プロトコル**

##### **1\. トラブルシューティング：構造破綻とノイズの除去**

| 症状 | 原因の可能性 | 修正戦略（In-Suno Fix） | 出典 |
| :---- | :---- | :---- | :---- |
| Hookが一貫しない | ChorusのWeirdnessが高すぎる | RemakeでChorusを修正。Weirdness $\\downarrow$, Style $\\uparrow$で固定 13。 | 13 |
| 意図しない要素の混入 | V5のポップ/R\&Bへのバイアス | Exclude Stylesにfemale humming, choir, fluteなどを明示的に追加 。 |  |
| 歌詞が歌われない | プロンプトが複雑すぎる/競合 | Style Promptを簡素化し、\[ \]タグの前後を改行で区切る 。 |  |
| Style Promptが歌詞として歌われる | \[ \]タグの配置ミス、または歌詞とタグが接触 | タグが歌詞と接触していないか確認し、新しい行で区切る 16。 | 16 |
| 構成のスキップ | BridgeやOutroのタグが無視される | 該当セクションの前に\`\`タグを挿入し、その後Remakeを試みる 。 |  |

##### **2\. 商用利用権と法的保護戦略**

Pro/Premierプランで作成した楽曲には、商業利用ライセンスが付与されます 17。

* **法的保護戦略:** AI生成音楽の著作権は法的に未確定なため、**高度なプロンプト構造、ステムのDAW編集、Hybrid Workflow**を通じて「創造的制御」を強く行使した証拠を残すことが、将来的な法的保護の可能性を最大化します 18。

##### **3\. ステムエクスポートとDAW補正（Final Mix）**

Pro/Premierユーザーは最大12トラックのマルチステムをエクスポートできます 20。商業利用では、Sunoの出力では不十分な**ラウドネスと周波数バランス**をDAWで修正することが必須です 。

* **最終QCチェックリスト:**  
  1. ステムをDAWに持ち込み、テンポドリフトを修正（ワープ機能などを使用） 。  
  2. Sunoのミックスで埋もれがちな**ハイハットや高周波数帯域**をEQで持ち上げ、クリアリティを向上させる 。  
  3. 外部のプロセッサ（コンプレッサー、リミッター）を使用して、商業的なラウドネス基準を満たすよう最終マスタリングを行う 13。  
  4. 最終納品物として、フルミックスWAV、インストゥルメンタル、アカペラ、マルチステムを準備する 13。


## 引用文献（統合・番号付き）

1. https://www.reddit.com/r/SunoAI/comments/1np21fx/what_is_suno_v5_and_best_prompt_tips_of_suno_v5/
2. https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-v5-series-complete-guides-workflows
3. https://jackrighteous.com/pages/suno-ai-meta-tags-guide
4. https://www.reddit.com/r/SunoAI/comments/1nyybi7/suno_v5_impressions/
5. https://skywork.ai/skypage/en/Mastering-Suno-Prompts:-The-Ultimate-2025-Guide-to-AI-Music-Creation/1975069867135528960
6. https://medium.com/@creativeaininja/suno-v5-and-studio-the-complete-guide-to-professional-ai-music-production-d55c0747a48e
7. https://sider.ai/blog/ai-tools/top-20-prompts-for-suno-v5-to-generate-realistic-songs-with-vocals-instrumentation
8. https://travisnicholson.medium.com/how-to-write-suno-ai-prompts-with-examples-46700d2c3003
9. https://www.reddit.com/r/SunoAI/comments/1n8lq6u/suno_style_prompt_guide_20/
10. https://www.reddit.com/r/SunoAI/comments/1nrjmnn/example_of_a_good_v5_prompt/
11. https://howtopromptsuno.com/making-music/voice-tags
12. https://www.reddit.com/r/SunoAI/comments/1l77atq/what_is_your_favorite_genre_fusions_to_play/
13. https://www.reddit.com/r/SunoAI/comments/1fn8zh8/i_analyzed_100_ai_songs_to_learn_what_works_with/
14. https://www.youtube.com/watch?v=0zyBGn4d_Fc
15. https://www.reddit.com/r/SunoAI/comments/1mym1dm/the_guide_to_meta_tags_in_suno_ai_take_control_of/
16. https://www.youtube.com/watch?v=jpkVhnUk6ZE
17. https://travisnicholson.medium.com/complete-list-of-prompts-styles-for-suno-ai-2024-33ecee85f180
18. https://travisnicholson.medium.com/complete-list-of-instruments-to-use-for-suno-ai-921d6571d39a
19. https://howtopromptsuno.com/making-music/instrumental-tags
20. https://www.reddit.com/r/SunoAI/comments/1ji0g3c/guide_how_to_make_good_songs_with_multiple_voices/
21. https://www.reddit.com/r/SunoAI/comments/1d5xsud/the_secret_of_the_perfect_prompt_part_1/
22. https://www.reddit.com/r/SunoAI/comments/1nkfhkl/how_do_i_get_suno_to_stick_to_a_specific_bpm/
23. https://www.reddit.com/r/SunoAI/comments/1nvso0g/v5_is_absolutely_unusable/
24. https://www.reddit.com/r/SunoAI/comments/1krfsjd/how_to_control_key_and_key_change/
25. https://jackrighteous.com/en-us/blogs/guides-using-suno-ai-music-creation/suno-v5-to-release-inside-suno
26. https://www.youtube.com/watch?v=wguOfyXgfNc
27. https://suno.com/
28. https://help.suno.com/en/articles/3161921
29. https://www.reddit.com/r/SunoAI/comments/1nrc518/full_guide_to_creating_music_wai_suno_v5_tutorial/
30. https://jackrighteous.com/blogs/guides-using-suno-ai-music-creation/suno-ais-exclude-styles-feature-solves-vocal-and-instrument-control-issues
31. https://www.reddit.com/r/SunoAI/comments/1npdcwv/everybody_that_is_getting_good_results_on_v5/
32. https://www.reddit.com/r/SunoAI/comments/1gz1ssg/suno_ai_users_are_you_struggling_with_prompts_not/
33. https://howtopromptsuno.com/common-problems/why-cant-i-hear-my-lyrics
34. https://www.reddit.com/r/SunoAI/comments/1o7vqnu/serious_bug_found/
35. https://help.suno.com/en/articles/2746945
36. https://help.suno.com/en/categories/550145
37. https://www.reddit.com/r/SunoAI/comments/1i2u22g/paid_for_suno_ai_pro_but_wheres_the_license_they/
38. https://www.reddit.com/r/SunoAI/comments/1ksh8uf/commercial_rights/
