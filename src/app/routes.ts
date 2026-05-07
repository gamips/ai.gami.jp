import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Home } from "./pages/Home";
import { Concept } from "./pages/Concept";
import { About } from "./pages/About";
import { Services } from "./pages/Services";
import { ServiceDetail } from "./pages/ServiceDetail";
import { News } from "./pages/News";
import { Contact } from "./pages/Contact";
import { Price } from "./pages/Price";
import { NotFound } from "./pages/NotFound";
import { ContactThanks } from "./pages/ContactThanks";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "concept", Component: Concept },
      { path: "about", Component: About },
      { path: "services", Component: Services },
      { path: "services/:serviceSlug", Component: ServiceDetail },
      { path: "price", Component: Price },
      { path: "news", Component: News },
      { path: "contact", Component: Contact },
      { path: "contact/thanks", Component: ContactThanks },
      { path: "*", Component: NotFound },
    ],
  },
]);
