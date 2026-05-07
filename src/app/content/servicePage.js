import servicePage from "./pages/services.json";

const fallbackServicePage = {
  eyebrow: "SOLUTIONS",
  titleLines: ["現場に効く、", "3つの実装領域"],
  descriptionLines: [
    "GAMIのAI導入支援は、AIを単体で入れるのではなく、",
    "業務・ツール・顧客接点のあいだに実装するAI開発です。",
  ],
};

function toStringArray(value, fallback) {
  const items = Array.isArray(value)
    ? value.map((item) => String(item ?? "")).filter((item) => item.length > 0)
    : [];

  return items.length > 0 ? items : fallback;
}

export const servicePageContent = {
  eyebrow: servicePage.eyebrow || fallbackServicePage.eyebrow,
  titleLines: toStringArray(servicePage.titleLines, fallbackServicePage.titleLines),
  descriptionLines: toStringArray(servicePage.descriptionLines, fallbackServicePage.descriptionLines),
};
