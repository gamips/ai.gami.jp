import fs from "node:fs/promises";
import path from "node:path";
import { staticSeoEntries, toAbsoluteUrl } from "../src/app/seo/pageSeo.js";

const distDir = path.resolve(process.cwd(), "dist");
const templatePath = path.join(distDir, "index.html");
const markerStart = "<!-- SEO_HEAD_START -->";
const markerEnd = "<!-- SEO_HEAD_END -->";

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

function injectSeoHead(template, entry) {
  return template
    .replace(/<html lang="[^"]*">/i, '<html lang="ja">')
    .replace(
      new RegExp(`${markerStart}[\\s\\S]*?${markerEnd}`, "m"),
      buildSeoHead(entry),
    );
}

async function writeRouteHtml(entry, template) {
  const html = injectSeoHead(template, entry);
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
