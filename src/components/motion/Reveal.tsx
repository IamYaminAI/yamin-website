import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/class-names";

/**
 * Fades and lifts content in as its scene's `--p` grows. `delay` shifts the
 * start in progress units (0.06 ≈ a short stagger). Outside a scene it is static.
 */
export default function Reveal({
  delay = 0,
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<"div"> & { delay?: number }) {
  return (
    <div
      className={cn(
        "[--q:clamp(0,calc((var(--p)-0.05-var(--d,0))*6),1)] translate-y-[calc((1-var(--q))*56px)] opacity-(--q)",
        className,
      )}
      style={{ "--d": delay, ...style }}
      {...props}
    />
  );
}
