import { useEffect } from "react";

function isWindows(): boolean {
  if (typeof navigator === "undefined") return false;

  return /Windows/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
}

export function WindowsInertialScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isWindows()) return;

    let velocity = 0;
    let rafId: number | null = null;
    let lastFrameTime = 0;

    const FRAME_BUDGET_MS = 33;
    const MAX_VELOCITY = 140;
    const FRICTION = 0.94;
    const INPUT_DAMPING = 0.12;

    const applyScroll = (scrollY: number) => {
      const maxScrollTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const clamped = Math.max(0, Math.min(maxScrollTop, scrollY));
      window.scrollTo(0, clamped);
    };

    const tick = (time: number) => {
      if (lastFrameTime === 0) {
        lastFrameTime = time;
      }

      const deltaTime = Math.min(FRAME_BUDGET_MS, time - lastFrameTime);
      lastFrameTime = time;

      const normalizedVelocity = velocity * (deltaTime / 16.6667);
      const nextScrollTop = window.scrollY + normalizedVelocity;
      applyScroll(nextScrollTop);

      velocity *= Math.pow(FRICTION, deltaTime / 16.6667);

      if (Math.abs(velocity) > 0.5) {
        rafId = window.requestAnimationFrame(tick);
      } else {
        velocity = 0;
        rafId = null;
      }
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) {
        return;
      }

      event.preventDefault();
      velocity += event.deltaY * INPUT_DAMPING;
      velocity = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, velocity));

      if (rafId === null) {
        lastFrameTime = 0;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return null;
}
