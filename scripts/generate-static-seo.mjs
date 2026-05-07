import fs from "node:fs/promises";
import path from "node:path";
import { staticSeoEntries, toAbsoluteUrl } from "../src/app/seo/pageSeo.js";

const distDir = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDir, "index.html");
const markerStart = "<!-- SEO_HEAD_START -->";
const markerEnd = "<!-- SEO_HEAD_END -->";
const bodyMarkerStart = "<!-- SEO_FALLBACK_BODY_START -->";
const bodyMarkerEnd = "<!-- SEO_FALLBACK_BODY_END -->";

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildSeoHead(entry) {
  const canonicalUrl = toAbsoluteUrl(entry.path);
  const imageUrl = toAbsoluteUrl(entry.image ?? "/og/home.png");
  const imageAlt = entry.imageAlt ?? entry.title;
  const robots = entry.noindex
    ? "noindex,nofollow"
    : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
  const schemaTags = (entry.schemas ?? [])
    .map(
      (schema) =>
        `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`,
    )
    .join("\n    ");

  return `${markerStart}
    <title>${escapeHtml(entry.title)}</title>
    <meta name="description" content="${escapeHtml(entry.description)}" />
    <meta name="keywords" content="${escapeHtml(entry.keywords ?? "")}" />
    <meta name="robots" content="${robots}" />
    <meta name="author" content="GAMI" />
    <meta name="application-name" content="GAMI" />
    <link rel="canonical" href="${canonicalUrl}" />
    <meta property="og:locale" content="ja_JP" />
    <meta property="og:site_name" content="GAMI" />
    <meta property="og:type" content="${entry.ogType ?? "website"}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:title" content="${escapeHtml(entry.title)}" />
    <meta property="og:description" content="${escapeHtml(entry.description)}" />
    <meta property="og:image" content="${imageUrl}" />
    <meta property="og:image:secure_url" content="${imageUrl}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(entry.title)}" />
    <meta name="twitter:description" content="${escapeHtml(entry.description)}" />
    <meta name="twitter:image" content="${imageUrl}" />
    <meta name="twitter:image:alt" content="${escapeHtml(imageAlt)}" />
    ${schemaTags}
    ${markerEnd}`;
}

function stripTitleSuffix(title = "") {
  return String(title)
    .replace(/\s*\|.*$/, "")
    .replace(/\s+AI速度、人間品質。$/, "")
    .trim();
}

const contactThanksStaticFallback = `
  <div class="pt-24">
    <header class="bg-white py-16 md:py-20">
      <div class="container mx-auto px-6">
        <p class="text-cyan-500 font-medium tracking-widest mb-6">CONTACT / THANKS</p>
        <h1 class="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-zinc-900">
          お問い合わせ
          <br />
          <span class="text-cyan-500">送信完了</span>
        </h1>
      </div>
    </header>

    <section class="py-24 bg-zinc-50">
      <div class="container mx-auto px-6">
        <div class="mx-auto max-w-6xl">
          <div class="py-8">
            <h2 class="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
              送信ありがとうございます。
              <br />
              <span class="text-cyan-500">ご連絡を準備しております。</span>
            </h2>
            <p class="mt-6 text-lg text-zinc-600 leading-relaxed max-w-4xl">
              お問い合わせ内容を受け付けました。
              担当者が内容を確認のうえ、営業日基準でご返信いたします。
              しばらくお時間がかかる場合は、迷惑メールフィルタをご確認ください。
            </p>
            <div class="mt-8">
              <a href="/" class="inline-flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-medium transition-colors">トップページへ</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>`;

function stripFallbackBlock(template) {
  if (!template.includes(bodyMarkerStart) || !template.includes(bodyMarkerEnd)) {
    return template;
  }

  return template.replace(
    new RegExp(`${bodyMarkerStart}[\\s\\S]*?${bodyMarkerEnd}`, "m"),
    "",
  );
}

function replaceRootContent(template, html) {
  return template.replace('<div id="root"></div>', `<div id="root">${html}</div>`);
}

function injectSeoBody(template, entry) {
  const withoutFallback = stripFallbackBlock(template);

  if (entry.path === "/contact/thanks") {
    return replaceRootContent(withoutFallback, contactThanksStaticFallback);
  }

  return withoutFallback;
}

function injectSeoHead(template, entry) {
  return template
    .replace(/<html lang="[^"]*">/i, '<html lang="ja">')
    .replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "m"),
      buildSeoHead(entry),
    );
}

async function writeRouteHtml(entry, template) {
  const withHead = injectSeoHead(template, entry);
  const html = injectSeoBody(withHead, entry);
  const outputPath =
    entry.path === "/"
      ? path.join(distDir, "index.html")
      : path.join(distDir, entry.path.replace(/^\//, ""), "index.html");

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, html, "utf8");
}

async function main() {
  const template = await fs.readFile(templatePath, "utf8");

  if (!template.includes(markerStart) || !template.includes(markerEnd)) {
    throw new Error("SEO markers were not found in dist/index.html");
  }

  for (const entry of staticSeoEntries) {
    await writeRouteHtml(entry, template);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
