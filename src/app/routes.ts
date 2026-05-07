import { Root } from "./components/Root";

export const appRoutes = [
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Home")).Home }) },
      { path: "concept", lazy: async () => ({ Component: (await import("./pages/Concept")).Concept }) },
      { path: "about", lazy: async () => ({ Component: (await import("./pages/About")).About }) },
      { path: "services", lazy: async () => ({ Component: (await import("./pages/Services")).Services }) },
      {
        path: "services/:serviceSlug",
        lazy: async () => ({ Component: (await import("./pages/ServiceDetail")).ServiceDetail }),
      },
      { path: "price", lazy: async () => ({ Component: (await import("./pages/Price")).Price }) },
      { path: "news", lazy: async () => ({ Component: (await import("./pages/News")).News }) },
      { path: "news/:newsSlug", lazy: async () => ({ Component: (await import("./pages/NewsDetail")).NewsDetail }) },
      { path: "contact", lazy: async () => ({ Component: (await import("./pages/Contact")).Contact }) },
      {
        path: "contact/thanks",
        lazy: async () => ({ Component: (await import("./pages/ContactThanks")).ContactThanks }),
      },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).NotFound }) },
    ],
  },
] as const;
