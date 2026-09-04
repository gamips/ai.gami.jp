# SEO learnings

再利用できる学びだけを、根拠、信頼度、適用範囲、見直し条件とともに残す。

## 2026-09-04

- 学び: ai.gami.jp は指名検索の比率が高く、非指名queryはまだ少数。平均順位だけで成長を判断しない。
  - 根拠: Search Console 2026-06-02から2026-09-01は4 clicks、96 impressions。開示queryの中心は gami ai。
  - 信頼度: high
  - 適用範囲: KPI判断と記事優先順位
  - 見直し条件: 非指名clicksが安定して月10以上になったとき
- 学び: 観測データは約2日遅れる。3時間ごとに同じ確定日を取り直しても新しい判断材料にならない。
  - 根拠: 2026-09-03時点の latestReturnedDate は2026-09-01。
  - 信頼度: high
  - 適用範囲: Search Console取得頻度
  - 見直し条件: freshnessの遅延傾向が変わったとき
- 学び: Newsの固定配列だけでは検索に出せる個別情報が増えない。記事本文、一覧、head、schema、sitemapを一つの正本から作る。
  - 根拠: 2026-09-03まで個別記事URLがなく、sitemapは10 URLだった。
  - 信頼度: high
  - 適用範囲: Insightsと事例の制作基盤
  - 見直し条件: 別CMSまたはSSGへ移行したとき
