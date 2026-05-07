import { renderToString } from "react-dom/server";
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from "react-router";
import { appRoutes } from "../routes";

const { query, dataRoutes } = createStaticHandler(appRoutes);

export async function renderStaticPage(pathname: string) {
  const request = new Request(new URL(pathname, "https://ai.gami.jp").toString(), {
    method: "GET",
  });
  const context = await query(request);

  if (context instanceof Response) {
    throw new Error(`Static render failed for ${pathname}: ${context.status} ${context.statusText}`);
  }

  const router = createStaticRouter(dataRoutes, context);
  const staticRenderTarget = globalThis as typeof globalThis & {
    __gamiStaticRender?: boolean;
  };

  staticRenderTarget.__gamiStaticRender = true;

  try {
    return renderToString(
      <StaticRouterProvider router={router} context={context} hydrate={false} />,
    );
  } finally {
    delete staticRenderTarget.__gamiStaticRender;
  }
}
