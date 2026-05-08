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
    "AI導入支援からAI開発、AIマーケティング、AI Web制作までをAI基準で再設計する開発パートナーです。",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "ja-JP",
  description:
    "AI導入支援、AI開発、AIマーケティング、AI Web制作を通じてSaaS、Growth、Brand SiteをAI基準で再設計するGAMIのコーポレートサイト。",
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
  numberOfItems: 3,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      url: toCanonicalUrl("/services/ai-saas"),
      item: {
        "@type": "Service",
        name: "AI × SaaS / AI × DX",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      url: toCanonicalUrl("/services/ai-marketing"),
      item: {
        "@type": "Service",
        name: "AI × Growth / AI × Writing",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
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
      price: "600000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI × SaaS / AI × DX",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "100000",
      category: "Initial setup",
      itemOffered: {
        "@type": "Service",
        name: "AI × Growth / AI × Writing",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "50000",
      category: "Monthly agent rental",
      itemOffered: {
        "@type": "Service",
        name: "AI × Growth / AI × Writing",
      },
    },
    {
      "@type": "Offer",
      priceCurrency: "JPY",
      price: "600000",
      category: "Monthly",
      itemOffered: {
        "@type": "Service",
        name: "AI × Brand / AI × Site",
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
      "AI導入支援とAI開発を一体で進めるGAMI。AI × SaaS / DX、AI × Growth / Writing、AI × Brand / Site を通じて、業務システム開発、AIマーケティング、AI Web制作をAI基準で再設計します。",
    keywords:
      "AI導入支援,AI開発会社,AI開発,AI実装,AIシステム開発,AIマーケティング,AI Web制作",
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
          "AI導入支援からAI開発、AIマーケティング、AI Web制作までをAI基準で再設計する開発パートナーです。",
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
    title: "Services | AI導入支援・AI開発の3領域 | GAMI",
    description:
      "GAMIが提供するAI導入支援・AI開発の3領域。AI × SaaS / DX、AI × Growth / Writing、AI × Brand / Site を通じて、業務システム開発、AIマーケティング、AI Web制作をAI基準で再設計します。",
    keywords: "AI導入支援,AI開発,AIシステム開発,AIマーケティング,AI Web制作,業務システム開発",
    image: "/og/services.png",
    imageAlt: "Services page open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services",
        title: "Services | GAMI",
        description:
          "GAMIが提供するAI導入支援・AI開発の3領域を一覧で紹介するページです。",
        type: "CollectionPage",
      }),
      serviceCatalogSchema,
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
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
    title: "AI × Growth / AI × Writing | AIマーケティング・AIライティング | GAMI",
    description:
      "AIマーケティングとAIライティングを通じて、SEO記事作成、SNS運用、プレスリリースのドラフト生成と改善ループを回すサービス。初期学習と月額レンタルで運用を支えます。",
    keywords: "AIマーケティング,AIライティング,SEO記事作成,SNS運用,AI秘書,AI Writing",
    image: "/og/service-ai-growth.png",
    imageAlt: "AI Growth and AI Writing service open graph image",
    ogType: "website",
    schemas: [
      organizationSchema,
      createBaseWebPageSchema({
        path: "/services/ai-marketing",
        title: "AI × Growth / AI × Writing | GAMI",
        description:
          "AIマーケティングとAIライティングで発信・分析・改善を回すサービス紹介ページです。",
      }),
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "AI × Growth / AI × Writing",
        serviceType: "AIマーケティング支援",
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
          "SEO記事作成やSNS運用を含む発信・分析・改善を回すAIマーケティング支援サービスです。",
      },
      createBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Services", path: "/services" },
        { name: "AI × Growth / AI × Writing", path: "/services/ai-marketing" },
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
      "GAMIのAI導入支援・AI開発の料金と契約モデルを紹介。月単位契約を基本に、AIシステム開発、AIマーケティング、AI Web制作の価格目安と進め方を整理しています。",
    keywords: "AI導入支援 料金,AI開発 料金,AIシステム開発 費用,AI Web制作 料金,AIマーケティング 料金",
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
