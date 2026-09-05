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
