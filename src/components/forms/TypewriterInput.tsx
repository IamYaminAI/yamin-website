"use client";
import type { ComponentProps } from "react";
import AppInputText from "@/components/ui/AppInputText";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useTypewriter } from "@/hooks/useTypewriter";

type TypewriterInputProps = Omit<
  ComponentProps<typeof AppInputText>,
  "placeholder"
> & {
  /** Example values typed into the placeholder. Keep the array stable. */
  phrases: readonly string[];
  prefix: string;
  /** Static placeholder used when the visitor prefers reduced motion. */
  staticPlaceholder: string;
};

/** Text input whose placeholder types out example values. */
export default function TypewriterInput({
  phrases,
  prefix,
  staticPlaceholder,
  ...props
}: TypewriterInputProps) {
  const reduceMotion = usePrefersReducedMotion();
  const typed = useTypewriter(phrases, { enabled: !reduceMotion });
  return (
    <AppInputText
      placeholder={reduceMotion ? staticPlaceholder : `${prefix}${typed}`}
      {...props}
    />
  );
}
