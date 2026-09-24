/**
 * @typedef {Object} ServiceSummary
 * @property {string} path
 * @property {[string, string?]} titleLines
 * @property {string} overviewDescription
 * @property {[string, string, string]} homeBullets
 */

/** @type {Record<"ai-saas" | "ai-marketing" | "ai-web", ServiceSummary>} */
export const serviceSummaries = {
  "ai-saas": {
    path: "/services/ai-saas/",
    titleLines: ["AI × SaaS", "AI × DX"],
    overviewDescription:
      "AIシステム開発の力で、自社専用の業務システム開発や基幹システム開発を従来より速く低コストで立ち上げます。必要に応じてAI機能まで組み込み、独自の業務基盤として育てていけます。",
    homeBullets: [
      "自社要件に合わせた業務システム開発",
      "基幹システム開発と既存SaaS活用の見極めを支援",
      "OEM・外部パッケージ化も視野に設計",
    ],
  },
  "ai-marketing": {
    path: "/services/ai-marketing/",
    titleLines: ["AI × Growth", "AI × Support"],
    overviewDescription:
      "AIマーケティング、AIライティング、AIサポートを軸に、発信・分析・問い合わせ対応の下書きを整えます。ブログ、プレスリリース、SNS運用、SEO記事作成、顧客対応の一次整理までを、月2万円〜のAI導入支援として無理なく始めます。",
    homeBullets: [
      "SEO記事作成やプレスリリースのドラフト生成",
      "SNS運用と分析の改善提案を継続学習",
      "問い合わせ対応や社内サポートの一次整理",
    ],
  },
  "ai-web": {
    path: "/services/ai-web/",
    titleLines: ["AI × Brand", "AI × Site"],
    overviewDescription:
      "AI Web制作の導入で、LP制作やコーポレートサイト制作は企画設計から実装へ直行できるようになりました。時間もコストも大きかった従来の工程を見直し、公開速度と改善速度を引き上げます。",
    homeBullets: [
      "AI Web制作で企画設計→実装→公開へ再設計",
      "LP制作とコーポレートサイト制作をAIで高速化",
      "予算に応じて段階的にスケールアップ",
    ],
  },
};
