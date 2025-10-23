# バージョン履歴

| バージョン | 日付 | 主要変更 | 関連ドキュメント / ログ |
| :-- | :-- | :-- | :-- |
| v1.1.2 | 2025-10-22 | METAテンプレから`sources`行を削除し、プロンプトは生成に必要な指示のみ記載する方針を明示。READMEを更新。 | `SunoV5_Prompt_MASTER_REFERENCE.md`, `README.md`, `docs/log/codex/004.md` |
| v1.1.1 | 2025-10-22 | Double-LayerセクションにMETA+Lyricsテンプレを追加、参照表記を`[n]`形式へ統一。 | `SunoV5_Prompt_MASTER_REFERENCE.md`, `docs/log/codex/003.md` |
| v1.1.0 | 2025-10-22 | Scenes/Hoooks運用、Persistent Memory、Remaster Variation Strength、発音対策などの追加。README整備とバージョン管理フロー確立。 | `SunoV5_Prompt_MASTER_REFERENCE.md`, `README.md`, `docs/log/codex/001.md`, `docs/log/codex/002.md` |
| v1.0.0 | 不明（初期公開） | 「Suno V5 プロンプト裏マニュアル」原稿を初版として公開。基礎プロンプトと応用テクニックを収録。 | `SunoV5_Prompt_MASTER_REFERENCE.md` |

## リリース手順メモ
1. 変更内容を整理し、必要に応じて作業ログを `docs/log/codex/` に追加する。
2. 新しいバージョン番号と日付、要約を上表に追記する。
3. 変更ファイルを確認し、`git commit` -> `git tag vX.Y.Z` -> push（必要に応じて）を行う。
4. READMEや関連文書のバージョン記述が最新か確認する。

> **メモ:** v1.0.0 のリリース日は記録が残っていないため、今後調査できた段階で更新してください。
