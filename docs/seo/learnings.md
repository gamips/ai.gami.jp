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
- 学び: このrepoではpush remote名を`origin`と仮定しない。
  - 根拠: 2026-09-04時点の設定済みremoteは`gamips`だけだった。
  - 信頼度: high
  - 適用範囲: heartbeat開始時の同期確認と本番push
  - 見直し条件: remote構成を変更したとき
- 学び: static HTMLのschemaには所有マーカーを付け、画面起動後に同じ集合へ置き換える。
  - 根拠: マーカーのない旧実装は画面起動後に同じJSON-LDを追加していた。`data-seo-schema`で置換後、記事のschema数はraw/画面起動後とも4件で一致した。
  - 信頼度: high
  - 適用範囲: 現行のstatic shellとReact PageSeo
  - 見直し条件: SSRまたは別head管理へ移行したとき
