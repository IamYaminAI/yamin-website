"use client";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/class-names";
import { startSceneLoop } from "@/lib/scroll-scenes";

/**
 * Drives every `[data-scene]` inside it (see lib/scroll-scenes). Children stay
 * Server Components; this only adds one animation-frame loop.
 */
export default function ScrollScenes({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (!rootRef.current) return;
    return startSceneLoop(rootRef.current, { reduceMotion });
  }, [reduceMotion]);

  return (
    <div
      ref={rootRef}
      data-scroll-root=""
      className={cn("relative overflow-x-clip", className)}
      style={{ "--vh": "900px", "--mx": 0, "--my": 0 }}
    >
      {children}
    </div>
  );
}
