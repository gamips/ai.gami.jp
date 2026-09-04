import { useEffect } from "react";
import {
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_THEME_COLOR,
  SITE_LOCALE,
  SITE_NAME,
  getSeoEntry,
  toAbsoluteUrl,
  toCanonicalUrl,
} from "../seo/pageSeo.js";

type SeoOverride = {
  path?: string;
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  imageAlt?: string;
  ogType?: string;
  publishedAt?: string;
  updatedAt?: string;
  category?: string;
  canonical?: string | null;
  noindex?: boolean;
  schemas?: Record<string, unknown>[];
};

function upsertMeta(
  key: "name" | "property",
  value: string,
  content?: string,
) {
  const selector = `meta[${key}="${value}"]`;
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!content) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(key, value);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href?: string, extraAttrs?: Record<string, string>) {
  const selectorParts = [`link[rel="${rel}"]`];

  if (extraAttrs) {
    for (const [key, value] of Object.entries(extraAttrs)) {
      selectorParts.push(`[${key}="${value}"]`);
    }
  }

  const selector = selectorParts.join("");
  let element = document.head.querySelector<HTMLLinkElement>(selector);

  if (!href) {
    element?.remove();
    return;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    if (extraAttrs) {
      for (const [key, value] of Object.entries(extraAttrs)) {
        element.setAttribute(key, value);
      }
    }
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function PageSeo({ path, ...override }: SeoOverride) {
  const baseEntry = path ? getSeoEntry(path) : undefined;
  const entry = {
    ...baseEntry,
    ...override,
  };

  useEffect(() => {
    if (!entry.title || !entry.description) {
      return;
    }

    const canonicalUrl = entry.canonical === null
      ? undefined
      : toCanonicalUrl(entry.canonical ?? entry.path ?? path ?? "/");
    const imageUrl = toAbsoluteUrl(entry.image ?? "/og/home.png");
    const robots = entry.noindex
      ? "noindex,nofollow"
      : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

    document.documentElement.lang = "ja";
    document.title = entry.title;

    upsertMeta("name", "description", entry.description);
    upsertMeta("name", "robots", robots);
    upsertMeta("name", "author", SITE_NAME);
    upsertMeta("name", "application-name", SITE_NAME);
    upsertMeta("name", "theme-color", DEFAULT_THEME_COLOR);
    upsertMeta("name", "format-detection", "telephone=no");

    upsertMeta("property", "og:locale", SITE_LOCALE);
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:type", entry.ogType ?? "website");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:title", entry.title);
    upsertMeta("property", "og:description", entry.description);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:secure_url", imageUrl);
    upsertMeta("property", "og:image:type", "image/png");
    upsertMeta("property", "og:image:width", String(DEFAULT_OG_IMAGE_WIDTH));
    upsertMeta("property", "og:image:height", String(DEFAULT_OG_IMAGE_HEIGHT));
    upsertMeta("property", "og:image:alt", entry.imageAlt ?? entry.title);
    upsertMeta("property", "article:published_time", entry.ogType === "article" ? entry.publishedAt : undefined);
    upsertMeta("property", "article:modified_time", entry.ogType === "article" ? entry.updatedAt : undefined);
    upsertMeta("property", "article:section", entry.ogType === "article" ? entry.category : undefined);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", entry.title);
    upsertMeta("name", "twitter:description", entry.description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertMeta("name", "twitter:image:alt", entry.imageAlt ?? entry.title);

    upsertLink("canonical", canonicalUrl);

    for (const script of document.head.querySelectorAll('script[data-seo-schema="true"]')) {
      script.remove();
    }

    for (const schema of entry.schemas ?? []) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoSchema = "true";
      script.text = JSON.stringify(schema).replace(/</g, "\\u003c");
      document.head.appendChild(script);
    }
  }, [
    entry.description,
    entry.canonical,
    entry.category,
    entry.image,
    entry.imageAlt,
    entry.keywords,
    entry.noindex,
    entry.ogType,
    entry.path,
    entry.publishedAt,
    entry.schemas,
    entry.title,
    entry.updatedAt,
    path,
  ]);

  return null;
}
