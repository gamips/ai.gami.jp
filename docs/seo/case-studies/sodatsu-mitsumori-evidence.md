# 育つ見積 事例一次資料

内部運用専用。公開ページへこの資料、証拠パス、検証メモを表示しない。

## 証拠スナップショット

- 確認日時: 2026-09-05T01:49:09+09:00
- 製品repo: `C:\Users\Akira Ishigami\PhpstormProjects\sodatsu-mitsumori`
- 確認commit: `118a83be21e9f4929e15c22c0316fd500fd1afbb`
- 公開サイト: `https://sodatsu-mitsumori.net/`
- 公開確認: トップ、運営会社、AI見積、書類変換、画像3点がHTTP 200
- sitemap: HTTP 200、37 URL
- 注意: 製品repoには既存の未commit差分がある。現行コードだけで本番反映を断定せず、公開サイトの表示と組み合わせて判断する。

## 事例ページの責任範囲

- owner URL: `https://ai.gami.jp/insights/sodatsu-mitsumori-case-study/`
- 固有意図: 自社開発・運用するAI見積書・請求書システムで、入力からAI見積案、人の確認、書類管理までをどう実装したか。
- 製品の使い方・料金は製品サイト、GAMIへ依頼できる範囲は `/services/ai-saas/`、一般的なAI導入の進め方は既存Insightsをownerとする。
- schemaは`Article`。`Product`や`SoftwareApplication`は製品サイト側に任せる。

## 公開できる確認済み事実

| 事実 | 確認根拠 | 公開時の言い方 |
| --- | --- | --- |
| 「育つ見積」は株式会社ガミが提供する自社SaaS | `public/aboutus/index.html:26-54`と公開運営会社ページ | 「株式会社ガミが企画・開発・運用する見積書・請求書作成支援サービス」 |
| 見積依頼文や資料から明細・工数・金額案を整理する | `public/features/ai-quote-generation/index.html:171-172`と公開AI見積ページ | 「AIが最初の見積案を作る」 |
| 不足情報をAthanor QAで確認し、人が回答して見積案を更新する | 同ファイル`297-305`、`src/components/athanor-quote-qa-panel.tsx:16-49,90-139,188-212` | 「AIの質問へ人が回答し、案を整える」 |
| AI案は編集画面で摘要、数量、単価、税率、金額を確認できる | 同ファイル`286-295`と公開スクリーンキャプチャ | 「人が確認・修正してから書類へ進める」 |
| 見積書から発注書・納品書・請求書へ内容を引き継げる | 公開書類変換ページ、`src/components/document-preview-page.tsx:78-92,607-654,849-929` | 「見積後の書類作成まで同じ情報をつなぐ」 |
| PDF出力と共有リンクに対応する | 公開機能一覧と製品画面 | 機能名だけを簡潔に掲載する |
| 見積生成前の文字情報マスクは、処理できない場合に外部AI呼び出しを止める | `src/ai/flows/athanor-quote-draft-flow.ts:2973-2999`と公開AI見積ページ | 「対象の文字情報を送信前にマスクし、処理できない場合は送信を止める」 |
| 氏名、メール、電話、住所、会社名の追加マスクは初期OFF | `src/lib/athanor/local-mask-preferences.ts:1-30` | 記事で安全性を断定せず、詳しい対象範囲は製品ページへ委ねる |

## 公開前に実証が必要な事項

- AI案と人が直した最終案の差分を保存し、ユーザー別の次回生成材料へ渡すコードは、`src/app/api/athanor/learn-from-preview/route.ts:564-635`と`src/lib/athanor/user-adaptive-quote.ts:474-565`で確認できる。
- ただし、保存済み実データ、次回生成へ実際に渡された入力、次の見積結果への反映は今回確認していない。事例原稿では学習効果や次回反映を保留し、runtime evidenceを確認してから扱う。

## 安全に使える画面

次の3点は一般的なWeb制作の例で、実顧客の個人情報を含まないことを目視確認した。AI.GAMIへ掲載するときは製品repoから複製し、公開URLへのhotlinkは使わない。

1. 入力欄と生成設定
   - repo: `public/assets/images/features/ai-quote-generation/athanor-input-highlight.png`
   - 公開URL: `https://sodatsu-mitsumori.net/assets/images/features/ai-quote-generation/athanor-input-highlight.png`
   - 1090 × 720、131956 bytes
   - SHA-256: `29A49108336179CD9B8DA4F14F639A1311EE0CD88D15AC2DF157B5A56545CD10`
2. 見積編集とAthanor QA
   - repo: `public/assets/images/features/ai-quote-generation/quote-editor-line-items.png`
   - 公開URL: `https://sodatsu-mitsumori.net/assets/images/features/ai-quote-generation/quote-editor-line-items.png`
   - 1265 × 712、309899 bytes
   - SHA-256: `4716827C60D6D68F2EA0A33C1DC63F6E94E3C4E799BF1AF09ADCBFA5CBAD4CD8`
   - 掲載時は左サイドバー、日付、見積番号を必要に応じて切り、明細とQAを中心にする。
3. Athanor QA
   - repo: `public/assets/images/features/ai-quote-generation/athanor-qa-workspace.png`
   - 公開URL: `https://sodatsu-mitsumori.net/assets/images/features/ai-quote-generation/athanor-qa-workspace.png`
   - 1265 × 712、302005 bytes
   - SHA-256: `82BBB3BCB2599023579AD431168C3661672EA60170AADB3C2B6506F5F3487473`

管理画面、共有見積、外部AI連携、添付解析の既存画像は、原文、ID、テスト名、staging URL、ダミー連絡先などが写り得るため、そのまま再利用しない。

## 原稿の最小構成

1. 開発したもの
2. 見積素材をAI案へ整理する流れ
3. AIの質問と人の確認
4. 見積からPDF・共有・請求書へつなぐ設計
5. 運用しながら改善する仕組み。学習や次回反映はruntime evidence確認後だけ掲載する
6. 同様の業務システム開発として`/services/ai-saas/`へ案内

## 公開しない内容

- 未確認の作業時間短縮率、精度、利用者数、顧客成果、開発期間、開発費
- 「完全自動」「完全匿名化」「正確」「使うほど必ず改善する」
- 変わりやすいAIモデル名、料金額、クレジット量
- 実顧客の会社名、入力内容、金額、共有URL
- staging URL、repoパス、API名、内部ログ、管理画面、プロンプト
- 検索意図、実験ID、baseline、reviewAt、freeze、AI下書きなどの運用メタ情報
- 独立した「参考資料」セクション

## 次の実装ゲート

- 公開コピーでは正式名称を「育つ見積」に統一する。
- Claude CLIのサブスクリプションで原稿を起草またはレビューし、Codexが簡潔さ、事実、重複、導線を確認する。
- 既存Insightsの一列型レイアウトを使い、画像はカード化せず本文幅の`figure`を2点まで置く。
- 画像をAI.GAMI側へ複製し、公開前に個人情報、テスト情報、文字の可読性を再確認する。
- build、static fallback、Article schema、sitemap、内部リンク、desktop/mobile、console、横あふれを確認してから公開する。
