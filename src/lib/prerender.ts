// True while the build-time prerenderer (scripts/prerender.mjs) is taking a
// snapshot, or when the visitor prefers reduced motion. Animated counters use
// it to show their final values at once, so crawlers never capture "0".
export const skipCountUp = (): boolean =>
  typeof window !== "undefined" &&
  ((window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__ === true ||
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true);
