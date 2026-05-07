export type ServiceSlug = "ai-saas" | "ai-marketing" | "ai-web";

type ServiceCard = {
  title: string;
  description: string;
};

type ServiceColumn = {
  title: string;
  items: string[];
};

type ServiceFlowStep = {
  step: string;
  label: string;
  title: string;
  description: string;
};

type ServiceFlow = {
  title: string;
  intro: string;
  steps: ServiceFlowStep[];
};

type ServiceEngagementNote = {
  label: string;
  title: string;
  description: string;
};

type ServiceEngagement = {
  title: string;
  intro: string;
  notes: ServiceEngagementNote[];
};

type ServiceDetailBox =
  | {
      type: "columns";
      title: string;
      columns: ServiceColumn[];
    }
  | {
      type: "points";
      title: string;
      points: string[];
    };

export type ServiceContent = {
  adminTitle?: string;
  sortOrder: number;
  slug: ServiceSlug;
  path: string;
  number: string;
  titleLines: string[];
  searchLead: string;
  overviewDescription: string;
  homeDescriptionLines: string[];
  homeBullets: string[];
  cards: ServiceCard[];
  flow: ServiceFlow;
  engagement: ServiceEngagement;
  detailBox: ServiceDetailBox;
};

const serviceModules = import.meta.glob("./service-items/*.json", {
  eager: true,
  import: "default",
}) as Record<string, Partial<ServiceContent>>;

function toStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => String(item ?? "")).filter((item) => item.length > 0)
    : [];
}

function toCards(value: unknown): ServiceCard[] {
  return Array.isArray(value)
    ? value.map((item) => ({
        title: String(item?.title ?? ""),
        description: String(item?.description ?? ""),
      }))
    : [];
}

function toFlow(value: Partial<ServiceFlow> | undefined): ServiceFlow {
  return {
    title: String(value?.title ?? ""),
    intro: String(value?.intro ?? ""),
    steps: Array.isArray(value?.steps)
      ? value.steps.map((step) => ({
          step: String(step?.step ?? ""),
          label: String(step?.label ?? ""),
          title: String(step?.title ?? ""),
          description: String(step?.description ?? ""),
        }))
      : [],
  };
}

function toEngagement(value: Partial<ServiceEngagement> | undefined): ServiceEngagement {
  return {
    title: String(value?.title ?? ""),
    intro: String(value?.intro ?? ""),
    notes: Array.isArray(value?.notes)
      ? value.notes.map((note) => ({
          label: String(note?.label ?? ""),
          title: String(note?.title ?? ""),
          description: String(note?.description ?? ""),
        }))
      : [],
  };
}

function toDetailBox(value: Partial<ServiceDetailBox> | undefined): ServiceDetailBox {
  if (value?.type === "points") {
    return {
      type: "points",
      title: String(value.title ?? ""),
      points: toStringArray(value.points),
    };
  }

  return {
    type: "columns",
    title: String(value?.title ?? ""),
    columns: Array.isArray(value?.columns)
      ? value.columns.map((column) => ({
          title: String(column?.title ?? ""),
          items: toStringArray(column?.items),
        }))
      : [],
  };
}

function normalizeService(service: Partial<ServiceContent>, index: number): ServiceContent {
  const slug = String(service.slug ?? "ai-saas") as ServiceSlug;

  return {
    adminTitle: service.adminTitle,
    sortOrder: Number(service.sortOrder ?? index + 1),
    slug,
    path: String(service.path ?? `/services/${slug}/`),
    number: String(service.number ?? ""),
    titleLines: toStringArray(service.titleLines),
    searchLead: String(service.searchLead ?? ""),
    overviewDescription: String(service.overviewDescription ?? ""),
    homeDescriptionLines: toStringArray(service.homeDescriptionLines),
    homeBullets: toStringArray(service.homeBullets),
    cards: toCards(service.cards),
    flow: toFlow(service.flow),
    engagement: toEngagement(service.engagement),
    detailBox: toDetailBox(service.detailBox),
  };
}

export const services: ServiceContent[] = Object.values(serviceModules)
  .map((service, index) => normalizeService(service, index))
  .filter((service) => service.slug && service.titleLines.length > 0)
  .sort((a, b) => a.sortOrder - b.sortOrder);

export function getServiceBySlug(slug?: string) {
  return services.find((service) => service.slug === slug);
}
