const newsModules = import.meta.glob("./news-items/*.json", {
  eager: true,
  import: "default",
});

function getFileId(filePath) {
  return filePath.split("/").pop()?.replace(/\.json$/i, "") ?? "";
}

function normalizeIsoDate(value) {
  if (!value) {
    return "";
  }

  return String(value).slice(0, 10);
}

function formatDate(value) {
  const isoDate = normalizeIsoDate(value);
  const [year, month, day] = isoDate.split("-");

  if (!year || !month || !day) {
    return String(value ?? "");
  }

  return `${year}.${month}.${day}`;
}

function normalizeNewsItem(filePath, item) {
  const id = item.id || getFileId(filePath);
  const isoDate = normalizeIsoDate(item.isoDate || item.date);

  return {
    id,
    date: item.displayDate || formatDate(isoDate),
    isoDate,
    category: item.category || "お知らせ",
    title: item.title || "",
    description: item.description || "",
    body: item.body || item.description || "",
    href: item.href || "",
    hrefLabel: item.hrefLabel || "関連リンク",
    published: item.published !== false,
  };
}

export const newsItems = Object.entries(newsModules)
  .map(([filePath, item]) => normalizeNewsItem(filePath, item))
  .filter((item) => item.published && item.id && item.title)
  .sort((a, b) => b.isoDate.localeCompare(a.isoDate));

export function getNewsTitle(item) {
  return `${item.titlePrefix ?? ""}${item.linkLabel ?? ""}${item.title ?? ""}${item.titleSuffix ?? ""}`;
}

export function getNewsPath(item) {
  return `/news/${item.id}`;
}

export function getNewsItemById(id) {
  return newsItems.find((item) => item.id === id);
}
