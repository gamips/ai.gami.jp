import { getInsightBySlug } from "./insights.js";

const sodatsuCaseStudy = getInsightBySlug("sodatsu-mitsumori-case-study");

export const featuredNews = [
  {
    id: sodatsuCaseStudy.slug,
    date: sodatsuCaseStudy.dateLabel,
    publishedAt: sodatsuCaseStudy.publishedAt,
    category: sodatsuCaseStudy.category,
    title: sodatsuCaseStudy.title,
    description:
      "AIが見積案を作り、人が内容を確認して発注書や請求書へつなぐ設計を、実際の画面とともに紹介します。",
    href: `${sodatsuCaseStudy.path}/`,
  },
];

export const newsItems = [
  ...featuredNews,
  {
    id: 1,
    date: "2026.02.01",
    publishedAt: "2026-02-01",
    category: "お知らせ",
    title: "コーポレートサイトをリニューアルオープンしました。",
    description:
      "より分かりやすく、AI実装パートナーとしての取り組みをお伝えできるよう、サイト全体をリニューアルしました。",
  },
  {
    id: 2,
    date: "2026.01.15",
    publishedAt: "2026-01-15",
    category: "サービス",
    title: "新サービス「SaaS × AI 業務自動化プラン」の提供を開始しました。",
    description:
      "既存のSaaSツールとAIを連携させ、定型業務の自動化を実現する新プランをリリースしました。",
  },
];
