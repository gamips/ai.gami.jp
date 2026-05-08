import { useEffect, useState } from "react";

type GeometricParticlesComponent = typeof import("./GeometricParticles").GeometricParticles;

type IdleWindow = typeof window & {
  requestIdleCallback?: (callback: IdleRequestCallback, options?: IdleRequestOptions) => number;
  cancelIdleCallback?: (handle: number) => void;
};

export function DeferredGeometricParticles() {
  const [Particles, setParticles] = useState<GeometricParticlesComponent | null>(null);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const isMobile = idleWindow.matchMedia("(max-width: 767px)").matches;
    const prefersReducedMotion = idleWindow.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isMobile || prefersReducedMotion) {
      return;
    }

    let isMounted = true;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const loadParticles = () => {
      void import("./GeometricParticles").then((module) => {
        if (isMounted) {
          setParticles(() => module.GeometricParticles);
        }
      });
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      idleId = idleWindow.requestIdleCallback(loadParticles, { timeout: 1800 });
    } else {
      timeoutId = idleWindow.setTimeout(loadParticles, 1200);
    }

    return () => {
      isMounted = false;

      if (idleId !== null && typeof idleWindow.cancelIdleCallback === "function") {
        idleWindow.cancelIdleCallback(idleId);
      }

      if (timeoutId !== null) {
        idleWindow.clearTimeout(timeoutId);
      }
    };
  }, []);

  return Particles ? <Particles /> : null;
}
