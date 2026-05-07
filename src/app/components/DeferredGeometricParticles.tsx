import { useEffect, useState, type ComponentType } from "react";

type IdleWindow = Window &
  typeof globalThis & {
    requestIdleCallback?: (
      callback: IdleRequestCallback,
      options?: IdleRequestOptions,
    ) => number;
    cancelIdleCallback?: (handle: number) => void;
  };

export function DeferredGeometricParticles() {
  const [ParticleComponent, setParticleComponent] = useState<ComponentType | null>(null);

  useEffect(() => {
    const idleWindow = window as IdleWindow;
    const shouldSkipWebGl =
      window.matchMedia("(max-width: 767px)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldSkipWebGl) {
      return;
    }

    let cancelled = false;
    const loadParticles = () => {
      void import("./GeometricParticles").then((module) => {
        if (!cancelled) {
          setParticleComponent(() => module.GeometricParticles);
        }
      });
    };

    if (idleWindow.requestIdleCallback) {
      const idleHandle = idleWindow.requestIdleCallback(loadParticles, { timeout: 2400 });

      return () => {
        cancelled = true;
        idleWindow.cancelIdleCallback?.(idleHandle);
      };
    }

    const timeoutHandle = window.setTimeout(loadParticles, 1600);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutHandle);
    };
  }, []);

  return ParticleComponent ? <ParticleComponent /> : null;
}
