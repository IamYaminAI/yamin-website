import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/class-names";
import type { SceneKind } from "@/lib/scroll-scenes";

const tones = {
  night: "bg-night text-cream",
  ink: "bg-ink text-cream",
  paper: "bg-paper text-ink",
  mist: "bg-mist text-ink",
  white: "bg-white text-ink",
  cream: "bg-cream text-ink",
} as const;

const darkTones = new Set<SectionTone>(["night", "ink"]);

export type SectionTone = keyof typeof tones;

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  tone?: SectionTone;
  hasDots?: boolean;
  /** Registers the section with ScrollScenes; `rest` is its static progress. */
  scene?: { kind: SceneKind; rest: number };
};

export default function Section({
  tone = "paper",
  hasDots = false,
  scene,
  className,
  style,
  ...props
}: SectionProps) {
  const isDark = darkTones.has(tone);
  return (
    <section
      data-scene={scene?.kind}
      data-scene-rest={scene?.rest}
      className={cn(
        tones[tone],
        hasDots && (isDark ? "bg-dots-cream" : "bg-dots-ink"),
        className,
      )}
      style={scene ? { "--p": scene.rest, ...style } : style}
      {...props}
    />
  );
}
