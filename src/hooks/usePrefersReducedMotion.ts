import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function getMediaQuery(): MediaQueryList | null {
  return typeof window.matchMedia === "function"
    ? window.matchMedia(QUERY)
    : null;
}

function subscribe(onChange: () => void) {
  const mediaQuery = getMediaQuery();
  mediaQuery?.addEventListener("change", onChange);
  return () => mediaQuery?.removeEventListener("change", onChange);
}

/** Server renders assume motion is allowed; the client corrects on hydration. */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => getMediaQuery()?.matches ?? false,
    () => false,
  );
}
