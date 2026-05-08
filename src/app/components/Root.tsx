import { lazy, Suspense, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { WindowsInertialScroll } from "./WindowsInertialScroll";

const Header = lazy(() => import("./Header").then((module) => ({ default: module.Header })));
const Footer = lazy(() => import("./Footer").then((module) => ({ default: module.Footer })));

export function Root() {
  const { pathname } = useLocation();
  const hasServerChrome = typeof window !== "undefined" && (window as any).__gamiServerChrome === true;

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen text-zinc-900">
      <WindowsInertialScroll />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-zinc-900 focus:px-4 focus:py-2 focus:text-white"
      >
        コンテンツへスキップ
      </a>
      {hasServerChrome ? null : (
        <Suspense fallback={null}>
          <Header />
        </Suspense>
      )}
      <main id="main-content">
        <Outlet />
      </main>
      {hasServerChrome ? null : (
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
}
