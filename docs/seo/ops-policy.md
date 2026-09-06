# AI.GAMI SEO運用方針

更新日: 2026-09-06

## 目的

広告費を使わず、検索・AI検索・紹介・無料パブリシティからの有効流入と問い合わせを増やす。表示回数だけを追わず、GAMIへ相談する可能性がある人へ、実務で役立つ情報を届ける。

## 変えない原則

- ブランドを壊さず、シンプルで美しい一列型の編集デザインを守る。
- 結論を先に置き、短く、簡単な日本語で伝える。
- 公開文に制作メモ、狙い、検索語、競合メモ、プロンプト、検証状況を出さない。
- 記事末に「参考資料」の一覧を設けない。一次情報は内部の事実確認に使い、本文は読者に必要な内容だけを簡潔に伝える。
- 根拠を示せない効率化率、品質率、期間、実績、体験談を書かない。
- 薄い記事の大量生成、言い換えだけのページ、リンク購入、PBN、無差別投稿を行わない。
- 技術的な title、description、canonical、OG、schema は本文と分けて正しく管理する。
- 有料広告、有料掲載、有料ツールを使わない。

## 実行モデル

統括を single writer とする。サブエージェントは調査、分析、原稿案、レビューを並行して行えるが、編集、commit、push、本番公開、状態更新、automation 更新は統括だけが行う。

各実行では、計測、記事、既存ページ、内部リンク、技術SEO、無料パブリシティ、運用改善のどれか一つ以上で検証済みの成果を完了する。観測待ちの施策は observation queue へ移し、別URLまたは別レーンの作業を続ける。

## 優先レーン

1. 検索エンジンが正しく読める技術基盤
2. 実務で役立つ Insights と実装事例
3. 既存サービスページの明瞭さと内部リンク
4. Search Console による観測と改善
5. 自社の実績を使った無料の紹介・パブリシティ

一般論の量産より、実際の相談内容、設計判断、運用経験、実画面、検証結果を優先する。

## 計測

Search Console の sc-domain:ai.gami.jp を当面の正本とする。最初に freshness を確認し、latestReturnedDate を確定境界として比較期間を作る。同一確定日・同一結果は24時間以内に重複保存しない。

記事の観測日には、登録状況も読み取る。

```powershell
./tools/gsc-searchconsole.ps1 -Action inspect -InspectionUrl 'https://ai.gami.jp/'
```

対象URLを指定し、取得結果を `reports/seo/inspections/` へ日付付きで残す。`source: google-index` はGoogleに記録された状態で、現在のページのライブテストではない。取得時刻と最終クロール日時を分け、欠損の `null` やAPIの不明値から異常を推測しない。`-Raw` は同じ結果をPowerShellオブジェクトで返す。

sitemap API の `contents[].indexed` は廃止済みなので使わない。送信受付、sitemapの取得、個々のページの登録は別々に確認する。

主KPI:

- 非指名 organic clicks
- organic 経由の有効な訪問と問い合わせ

先行指標:

- index 済みの Insights・事例URL数
- 非指名 impressions
- 表示された非指名 query 数
- query と owner URL の初回接続

property total、query、page、device を混ぜない。匿名化、取得不能、母数不足をゼロや推測で補わない。結果は confirmed、disproven、inconclusive、not-yet-measurable のいずれかに分類する。

## 実験

- 一つのURLでは同時に一つの変更変数だけを観測する。
- 新規記事は、本文、head、schema、sitemap、内部リンクを含む一つの page package として扱える。
- baseline、期待するsignal、最低証拠量、reviewAt、freeze範囲、rollbackを記録する。
- 誤情報、表示崩れ、index事故は観測期間中でもすぐ直す。
- 結果待ちの間も、競合しない別URLの施策を進める。

## 公開と検証

原稿は ANTHROPIC_API_KEY を外した Claude CLI のサブスクリプションで起草またはレビューし、Codexが事実、簡潔さ、重複、導線、公開メモ混入を確認する。SVGが必要な場合はGeminiのサブスクリプションを使い、Codexがレビューする。

UI変更では現行デザインシステムを使い、Lazywebの実在例を確認する。カードを増やさず、余白、タイポグラフィ、罫線、必要最小限の図解で構成する。

検証は差分とリスクに合わせる。記事追加はbuildと対象記事・一覧の静的確認、本番HTTP・head・schema・sitemap・内部リンク、PC・スマホ表示を確認する。共有UIを変えない場合はlocalと本番の画面確認を重複させない。軽微な文言修正や運用文書だけなら、全件buildや画面確認は不要。共有テンプレートやルーティングを変えた場合は影響範囲の回帰確認も行う。

## cadence

- 現在の実行時刻はautomationの保存設定を正本とする。3時間は初期値であり、別途変更された最新設定を初期値で上書きしない。
- ready施策が3件以上ある間は3時間を維持する。
- 3回連続で observe または meta のみで、discover後も ready施策が2件未満なら6時間を検討する。
- ready施策、新しいSearch Console signal、公開直後の確認が増えたら3時間へ戻す。
- 誤noindex、canonical異常、公開障害、deploy失敗時のみ一時1時間とし、24時間以内に再評価する。
- cadence変更時は理由、期間、復帰条件を state と同じ automation に記録する。

## promptの成長

毎回、停止、重複観測、役割衝突、検証漏れ、成果密度、cadenceを短く監査する。同じ問題が2回以上続いた場合、4回程度の実作業でレーン配分が合わないと分かった場合、またはcadence条件を満たした場合は、同じ automation の prompt と schedule を必要最小限更新する。

長い履歴や一時的な数値は prompt に足さない。戦術はこの方針、現在状態は state.json、URL責任は content-inventory.json、実験は experiments.jsonl、再利用可能な学びだけを learnings.md に置く。同目的の automation を増やさない。

実際の定期promptはheartbeat-prompt.mdを読む短い起動指示とし、詳細ルールを二重管理しない。ユーザーの方針変更はすぐに反映し、更新後は保存された設定を読み戻す。
