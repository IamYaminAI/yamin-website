"use client";
import { Tag, type TagProps } from "primereact/tag";
import { cn } from "@/lib/class-names";

const tones = {
  dark: "border-cream/25 text-cream",
  light: "border-ink/20 text-ink",
} as const;

type AppTagProps = Omit<
  TagProps,
  "unstyled" | "pt" | "severity" | "rounded"
> & {
  /** The background the tag sits on. */
  tone?: keyof typeof tones;
};

/** PrimeReact Tag as a small outlined pill, e.g. a channel name. */
export default function AppTag({
  tone = "light",
  className,
  ...props
}: AppTagProps) {
  return (
    <Tag
      unstyled
      className={cn(
        "inline-flex rounded-full border px-3.5 py-2 text-[13px]",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
