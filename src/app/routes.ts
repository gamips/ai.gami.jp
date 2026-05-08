import { createElement } from "react";
import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";

function RouteHydrateFallback() {
  return null;
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    hydrateFallbackElement: createElement(RouteHydrateFallback),
    children: [
      { index: true, lazy: async () => ({ Component: (await import("./pages/Home")).Home }) },
      { path: "concept", lazy: async () => ({ Component: (await import("./pages/Concept")).Concept }) },
      { path: "about", lazy: async () => ({ Component: (await import("./pages/About")).About }) },
      { path: "services", lazy: async () => ({ Component: (await import("./pages/Services")).Services }) },
      { path: "services/:serviceSlug", lazy: async () => ({ Component: (await import("./pages/ServiceDetail")).ServiceDetail }) },
      { path: "price", lazy: async () => ({ Component: (await import("./pages/Price")).Price }) },
      { path: "news", lazy: async () => ({ Component: (await import("./pages/News")).News }) },
      { path: "contact", lazy: async () => ({ Component: (await import("./pages/Contact")).Contact }) },
      { path: "contact/thanks", lazy: async () => ({ Component: (await import("./pages/ContactThanks")).ContactThanks }) },
      { path: "*", lazy: async () => ({ Component: (await import("./pages/NotFound")).NotFound }) },
    ],
  },
]);
