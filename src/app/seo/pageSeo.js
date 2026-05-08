export const SITE_NAME = "GAMI";
export const SITE_LEGAL_NAME = "株式会社Gami";
export const SITE_URL = "https://ai.gami.jp";
export const SITE_LOCALE = "ja_JP";
export const DEFAULT_THEME_COLOR = "#04050d";
export const DEFAULT_OG_IMAGE_WIDTH = 1200;
export const DEFAULT_OG_IMAGE_HEIGHT = 630;

export function toAbsoluteUrl(path = "/") {
  if (!path) {
    return SITE_URL;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return new URL(path, SITE_URL).toString();
}

export function toCanonicalUrl(path = "/") {
  const url = new URL(toAbsoluteUrl(path));

  if (url.origin === SITE_URL && url.pathname !== "/" && !url.pathname.endsWith("/")) {
    url.pathname = `${url.pathname}/`;
  }

  return url.toString();
}

function createBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: toCanonicalUrl(item.path),
    })),
  };
}

function createBaseWebPageSchema({ path, title, description, type = "WebPage" }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    name: title,
    description,
    url: toCanonicalUrl(path),
    inLanguage: "ja-JP",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
      alternateName: SITE_NAME,
      url: SITE_URL,
    },
  };
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL,
  image: toAbsoluteUrl("/og/home.png"),
  description:
    "AI導入支援からAIエージェント導入支援、RAG構築、AI開発、AIマーケティング、AI Web制作までをAI基準で再設計する開発パートナーです。",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ja-JP",
  description:
    "AI導入支援、AIエージェント導入支援、RAG構築、AI開発、AIマーケティング、AI Web制作をAI基準で再設計するGAMIのコーポレートサイト。",
  publisher: {
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    url: SITE_URL,
  },
};

const serviceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "GAMI Services",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: toCanonicalUrl("/services/ai-implementation"),
      item: {
        "@type": "Service",
        name: "AI導入支援 月2万円〜",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      url: toCanonicalUrl("/services/ai-agent"),
      item: {
        "@type": "Service",
        name: "AIエージェント導入支援",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      url: toCanonicalUrl("/services/rag-chatbot"),
      item: {
        "@type": "Service",
        name: "RAG構築・社内AIチャットボット",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      url: toCanonicalUrl("/services/ai-saas"),
      item: {
        "@type": "Service",
        name: "AI × SaaS / AI × DX",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      url: toCanonicalUrl("/services/ai-marketing"),
      item: {
        "@type": "Service",
        name: "AI × Growth / AI × Support",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      url: toCanonicalUrl("/services/ai-web"),
      item: {
        "@type": "Service",
        name: "AI × Brand / AI × Site",
      },
    },
  ],
};

const priceCatalogSchema = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  name: "GAMI Pricing",
  url: toCanonicalUrl("/price"),
  itemListElement: [
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "20000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI導入支援 月2万円〜",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "300000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI × SaaS / AI × DX",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "20000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AIエージェント導入支援",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "20000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "RAG構築・社内AIチャットボット",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "20000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI × Growth / AI × Support",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "300000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI × Brand / AI × Site",
      },
    },
  ],
};

const aiImplementationFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "AI導入支援は月2万円から相談できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "相談テーマを絞ったヒアリング、プロンプト改善、テンプレート整備、使い方の整理、定例相談は月2万円〜を目安に始められます。実装や運用代行が必要な場合は範囲を分けて見積もります。",
      },
    },
    {
      "@type": "Question",
      name: "ChatGPTやClaudeをすでに使っている状態でも相談できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "既存のChatGPT、Claude、Geminiなどの利用状況を前提に、業務で使えるプロンプト、テンプレート、確認手順、活用ルールを整えます。",
      },
    },
    {
      "@type": "Question",
      name: "AIエージェントやRAG構築まで依頼できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "AI導入支援で効果が見えた業務は、AIエージェント導入支援、RAG構築、業務システム開発へ段階的に広げられます。",
      },
    },
  ],
};

const aiAgentFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "AIエージェント導入支援では何から始めますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "営業、広報、問い合わせ対応、社内事務などから、AIに任せる業務、任せない判断、権限、レビュー体制、停止条件を整理するところから始めます。",
      },
    },
    {
      "@type": "Question",
      name: "AIエージェント導入支援は月2万円から相談できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "小さな業務設計、プロンプト、運用ルール、レビュー導線の整理は月2万円〜を目安に始められます。外部ツール連携や自動実行は個別見積もりです。",
      },
    },
    {
      "@type": "Question",
      name: "AIエージェントを社外返信や公開作業に使えますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "使えますが、社外送信や公開前に人間が確認する条件、AIが止まる条件、ログ確認の方法を先に設計します。",
      },
    },
  ],
};

const ragChatbotFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "RAG構築では最初に何を整理しますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "社内マニュアル、FAQ、規程、議事録、対応履歴などから、AIに読ませる資料、読ませない資料、答える質問、答えない質問を整理します。",
      },
    },
    {
      "@type": "Question",
      name: "社内AIチャットボットは月2万円から相談できますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "RAG構築前の資料棚卸し、質問範囲の整理、回答ルール設計は月2万円〜を目安に始められます。実装や社内システム連携は個別見積もりです。",
      },
    },
    {
      "@type": "Question",
      name: "RAGで回答できない質問はどう扱いますか？",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "推測で回答しないように、参照元表示、回答保留、担当者確認、エスカレーション条件を設計します。",
      },
    },
  ],
};

const newsListSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "GAMI News",
  url: toCanonicalUrl("/news"),
  hasPart: [
    {
      "@type": "NewsArticle",
      headline: "コーポレートサイトをリニューアルオープンしました。",
      datePublished: "2026-02-01",
      articleSection: "お知らせ",
      url: toCanonicalUrl("/news#news-1"),
    },
    {
      "@type": "NewsArticle",
      headline: "新サービス「SaaS × AI 業務自動化プラン」の提供を開始しました。",
      datePublished: "2026-01-15",
      articleSection: "サービス",
      url: toCanonicalUrl("/news#news-2"),
    },
  ],
};

export const pageSeoByPath = {
  "/": {
    path: "/",
    title: "GAMI | AI導入支援・AI開発会社 | AI速度、人間品質。",
    description:
      "AI導入支援とAI開発を一体で進めるGAMI。月2万円〜の生成AI導入支援から、AIエージェント導入支援、RAG構築、AI × SaaS / DX、AI × Growth / Support、AI × Brand / Site までをAI基準で再設計します。",
    keywords:
      "AI導入支援,AIエージェント導入支援,RAG構築,社内AIチャットボット,AI開発会社,AI開発,AIシステム開発,AIマーケティング,AI Web制作",
    image: "/og/home.png",
    imageAlt: "GAMI home open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      websiteSchema,
      createBaseWebPageSchema({
        path: "/",
        title: "GAMI",
        description:
          "AI導入支援からAIエージェント導入支援、RAG構築、AI開発、AIマーケティング、AI Web制作までをAI基準で再設計する開発パートナーです。",
      }),
      serviceCatalogSchema,
    ],
  },
  "/concept": {
    path: "/concept",
    title: "Concept | AI導入支援とAI開発の考え方 | GAMI",
    description:
      "AI Base, Human Craft. を軸に、AI導入支援とAI開発をどうAI基準で進めるかを整理したGAMIの開発思想ページです。",
    keywords: "AI導入支援,AI開発,生成AI導入支援,AI開発思想,AI Base,Human Craft",
    image: "/og/concept.png",
    imageAlt: "Concept page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/concept",
        title: "Concept | GAMI",
        description:
          "AI導入支援とAI開発をAI基準で進めるためのGAMIの開発思想。",
      type: "WebPage",
      }),
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Concept", path: "/concept" },
      ]),
    ],
  },
  "/services": {
    path: "/services",
    title: "Services | AI導入支援・AI開発サービス | GAMI",
    description:
      "GAMIが提供するAI導入支援・AI開発サービス。月2万円〜の生成AI導入支援を入口に、AIエージェント導入支援、RAG構築、AIシステム開発、AIマーケティング、AIサポート、AI Web制作へ段階的に広げます。",
    keywords: "AI導入支援,生成AI導入支援,AIエージェント導入支援,RAG構築,社内AIチャットボット,AI開発,AIシステム開発,AIマーケティング,AI Web制作",
    image: "/og/services.png",
    imageAlt: "Services page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services",
        title: "Services | GAMI",
        description:
          "GAMIが提供するAI導入支援・AI開発サービスを一覧で紹介するページです。",
        type: "CollectionPage",
      }),
      serviceCatalogSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
      ]),
    ],
  },
  "/services/ai-implementation": {
    path: "/services/ai-implementation",
    title: "AI導入支援 月2万円〜 | 中小企業向け生成AI活用支援 | GAMI",
    description:
      "中小企業向けAI導入支援。ChatGPT、Claude、Geminiなどの生成AIを業務でどう使うかをヒアリングし、月2万円〜でプロンプト、テンプレート、運用ルールを整えます。",
    keywords:
      "AI導入支援,生成AI導入支援,中小企業 AI導入支援,AI導入支援 月額,AI導入支援 料金,ChatGPT 導入支援,AI活用支援",
    image: "/og/services.png",
    imageAlt: "AI implementation support service open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-implementation",
        title: "AI導入支援 月2万円〜 | GAMI",
        description:
          "中小企業向けに、生成AIを業務へどう導入するかをヒアリングから整理するAI導入支援サービスです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI導入支援 月2万円〜",
        serviceType: "生成AI導入支援",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "JPY",
          price: "20000",
          category: "Monthly",
          availability: "https://schema.org/InStock",
        },
        url: toCanonicalUrl("/services/ai-implementation"),
        description:
          "ChatGPT、Claude、Geminiなどの生成AIを業務で使える形に整える、中小企業向けAI導入支援です。",
      },
      aiImplementationFaqSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI導入支援 月2万円〜", path: "/services/ai-implementation" },
      ]),
    ],
  },
  "/services/ai-agent": {
    path: "/services/ai-agent",
    title: "AIエージェント導入支援 | 業務自動化・AI活用支援 | GAMI",
    description:
      "AIエージェント導入支援。営業、広報、問い合わせ対応、社内事務などで、AIに任せる業務範囲、権限、レビュー体制、停止条件を設計します。月2万円〜の小さな業務設計から相談できます。",
    keywords:
      "AIエージェント導入支援,AIエージェント 業務自動化,AI業務自動化,AI秘書,AI活用支援,生成AI導入支援",
    image: "/og/services.png",
    imageAlt: "AI agent implementation support open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-agent",
        title: "AIエージェント導入支援 | GAMI",
        description:
          "AIに任せる業務範囲、権限、レビュー体制、停止条件を整理するAIエージェント導入支援サービスです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AIエージェント導入支援",
        serviceType: "AI業務自動化支援",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "JPY",
          price: "20000",
          category: "Monthly",
          availability: "https://schema.org/InStock",
        },
        url: toCanonicalUrl("/services/ai-agent"),
        description:
          "営業、広報、問い合わせ対応、社内事務などの反復業務にAIエージェントを導入するための設計支援です。",
      },
      aiAgentFaqSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AIエージェント導入支援", path: "/services/ai-agent" },
      ]),
    ],
  },
  "/services/rag-chatbot": {
    path: "/services/rag-chatbot",
    title: "RAG構築・社内AIチャットボット導入支援 | GAMI",
    description:
      "RAG構築・社内AIチャットボット導入支援。社内マニュアル、FAQ、規程、議事録、対応履歴をAIで探せる状態にするため、資料整理、回答範囲、参照元表示、エスカレーション条件を設計します。",
    keywords:
      "RAG構築,社内AIチャットボット,社内マニュアル AI検索,生成AI 社内ナレッジ,AIチャットボット 導入支援,AI導入支援",
    image: "/og/services.png",
    imageAlt: "RAG and internal AI chatbot support open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/rag-chatbot",
        title: "RAG構築・社内AIチャットボット導入支援 | GAMI",
        description:
          "社内マニュアルやFAQをAIで探せる状態にするRAG構築・社内AIチャットボット導入支援サービスです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "RAG構築・社内AIチャットボット導入支援",
        serviceType: "RAG構築・社内ナレッジ検索",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        offers: {
          "@type": "Offer",
          priceCurrency: "JPY",
          price: "20000",
          category: "Monthly",
          availability: "https://schema.org/InStock",
        },
        url: toCanonicalUrl("/services/rag-chatbot"),
        description:
          "社内資料をAIで検索・回答できる状態にするためのRAG構築と社内AIチャットボット導入支援です。",
      },
      ragChatbotFaqSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "RAG構築・社内AIチャットボット", path: "/services/rag-chatbot" },
      ]),
    ],
  },
  "/services/ai-saas": {
    path: "/services/ai-saas",
    title: "AI × SaaS / AI × DX | AIシステム開発・業務システム開発 | GAMI",
    description:
      "業務システム開発・基幹システム開発をAI基準で進めるサービス。自社要件に合わせたAIシステム開発、AI機能の組み込み、既存SaaSとの見極めにも対応します。",
    keywords: "AIシステム開発,業務システム開発,基幹システム開発,SaaS開発,AI DX",
    image: "/og/service-ai-saas.png",
    imageAlt: "AI SaaS and AI DX service open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-saas",
        title: "AI × SaaS / AI × DX | GAMI",
        description:
          "AIシステム開発で業務システムや基幹領域を立ち上げるサービス紹介ページです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI × SaaS / AI × DX",
        serviceType: "AI業務基盤開発",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        url: toCanonicalUrl("/services/ai-saas"),
        description:
          "自社要件に合わせた業務システム開発や基幹システム開発を、AI基準で速く立ち上げるサービスです。",
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI × SaaS / AI × DX", path: "/services/ai-saas" },
      ]),
    ],
  },
  "/services/ai-marketing": {
    path: "/services/ai-marketing",
    title: "AI × Growth / AI × Support | AIマーケティング・AIサポート | GAMI",
    description:
      "AIマーケティング、AIライティング、AIサポートを通じて、SEO記事作成、SNS運用、プレスリリース、問い合わせ対応の下書きと改善ループを整えるAI導入支援です。",
    keywords: "AIマーケティング,AIライティング,AIサポート,SEO記事作成,SNS運用,問い合わせ対応 AI,AIエージェント導入支援",
    image: "/og/service-ai-growth.png",
    imageAlt: "AI Growth and AI Writing service open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-marketing",
        title: "AI × Growth / AI × Support | GAMI",
        description:
          "AIマーケティングとAIサポートで発信・対応・改善を回すサービス紹介ページです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI × Growth / AI × Support",
        serviceType: "AIマーケティング・AIサポート導入支援",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        url: toCanonicalUrl("/services/ai-marketing"),
        description:
          "SEO記事作成、SNS運用、問い合わせ対応の下書きと改善を回すAI導入支援サービスです。",
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI × Growth / AI × Support", path: "/services/ai-marketing" },
      ]),
    ],
  },
  "/services/ai-web": {
    path: "/services/ai-web",
    title: "AI × Brand / AI × Site | AI Web制作・LP制作・コーポレートサイト制作 | GAMI",
    description:
      "AI Web制作でLP制作やコーポレートサイト制作を高速立ち上げ。企画設計から実装へ直行し、AIで70%まで進め、人間が品質とブランド表現を仕上げます。",
    keywords: "AI Web制作,LP制作,コーポレートサイト制作,Webサイト制作,AIサイト開発",
    image: "/og/service-ai-brand.png",
    imageAlt: "AI Brand and AI Site service open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-web",
        title: "AI × Brand / AI × Site | GAMI",
        description:
          "AI Web制作でLPやコーポレートサイトを高速立ち上げするサービス紹介ページです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI × Brand / AI × Site",
        serviceType: "AI Web開発",
        provider: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        areaServed: {
          "@type": "Country",
          name: "Japan",
        },
        url: toCanonicalUrl("/services/ai-web"),
        description:
          "LP制作やコーポレートサイト制作をAI基準のフローで高速立ち上げするサービスです。",
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI × Brand / AI × Site", path: "/services/ai-web" },
      ]),
    ],
  },
  "/price": {
    path: "/price",
    title: "Price | AI導入支援・AI開発の料金 | GAMI",
    description:
      "GAMIのAI導入支援・AI開発の料金と契約モデル。月2万円〜の生成AI導入支援から、AIシステム開発、AIマーケティング、AI Web制作の価格目安まで整理しています。",
    keywords: "AI導入支援 料金,AI導入支援 月額,生成AI導入支援 料金,AI開発 料金,AIシステム開発 費用,AI Web制作 料金,AIマーケティング 料金",
    image: "/og/price.png",
    imageAlt: "Price page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/price",
        title: "Price | GAMI",
        description: "GAMIのAI導入支援・AI開発の料金目安と月単位契約の考え方を整理したページです。",
        type: "CollectionPage",
      }),
      priceCatalogSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Price", path: "/price" },
      ]),
    ],
  },
  "/news": {
    path: "/news",
    title: "News | AI導入支援・AI開発のお知らせ | GAMI",
    description:
      "GAMIのAI導入支援・AI開発に関する最新情報、お知らせ、サービスアップデートを掲載しています。",
    keywords: "AI導入支援,AI開発,お知らせ,サービス更新,GAMI",
    image: "/og/news.png",
    imageAlt: "News page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/news",
        title: "News | GAMI",
        description: "GAMIのAI導入支援・AI開発に関する最新情報とサービス更新を掲載するニュース一覧ページです。",
        type: "CollectionPage",
      }),
      newsListSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "News", path: "/news" },
      ]),
    ],
  },
  "/about": {
    path: "/about",
    title: "About | AI導入支援・AI開発会社 GAMIについて",
    description:
      "AI導入支援とAI開発を通じて、AIで前に進む会社を増やす。GAMIの考え方、価値観、会社情報を紹介します。",
    keywords: "AI導入支援 会社,AI開発会社,AI実装パートナー,GAMI,会社情報",
    image: "/og/about.png",
    imageAlt: "About page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/about",
        title: "About | GAMI",
        description: "GAMIのAI導入支援・AI開発に対する考え方、価値観、会社情報を紹介するページです。",
        type: "AboutPage",
      }),
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  },
  "/contact": {
    path: "/contact",
    title: "Contact | AI導入支援・AI開発のご相談 | GAMI",
    description:
      "AI導入支援、AI開発、業務改善、AI Web制作のご相談はこちら。どこにAIを入れるべきか、現場の導線から整理します。",
    keywords: "AI導入相談,AI開発相談,AI導入支援,業務改善相談,AI Web制作 相談",
    image: "/og/contact.png",
    imageAlt: "Contact page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/contact",
        title: "Contact | GAMI",
        description: "GAMIへのAI導入支援・AI開発相談のお問い合わせページです。",
        type: "ContactPage",
      }),
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  },
  "/contact/thanks": {
    path: "/contact/thanks",
    title: "送信完了 | Contact | GAMI",
    description:
      "お問い合わせフォームからのお問い合わせを受け付けました。担当者よりご連絡いたします。",
    keywords: "お問い合わせ 送信完了,AI導入支援 お問い合わせ,AI開発 お問い合わせ,GAMI",
    image: "/og/contact.png",
    imageAlt: "Contact thanks page open graph image",
    ogType: "website",
    noindex: true,
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/contact/thanks",
        title: "送信完了 | GAMI",
        description:
          "GAMIへのお問い合わせを受け付けた後のサンクスページです。折り返しご連絡いたします。",
        type: "WebPage",
      }),
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
        { name: "Thanks", path: "/contact/thanks" },
      ]),
    ],
  },
};

export const staticSeoEntries = Object.values(pageSeoByPath);

export function getSeoEntry(path) {
  return pageSeoByPath[path];
}
