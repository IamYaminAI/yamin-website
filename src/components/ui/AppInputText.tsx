"use client";
import { InputText, type InputTextProps } from "primereact/inputtext";
import type { Ref } from "react";
import { cn } from "@/lib/class-names";

const appearances = {
  /** Standalone field with its own border and focus ring. */
  outlined:
    "border-cream/30 bg-night/60 px-[22px] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold aria-invalid:border-error",
  /** Borderless field inside a container that shows focus and errors. */
  bare: "border-transparent bg-transparent px-[18px] focus-visible:outline-none",
} as const;

type AppInputTextProps = Omit<InputTextProps, "unstyled" | "pt"> & {
  ref?: Ref<HTMLInputElement>;
  appearance?: keyof typeof appearances;
};

/**
 * PrimeReact InputText styled for dark brand surfaces. Layout (width, flex)
 * is the caller's job via `className`.
 */
export default function AppInputText({
  appearance = "outlined",
  className,
  ...props
}: AppInputTextProps) {
  return (
    <InputText
      unstyled
      className={cn(
        "h-13 rounded-full border font-sans text-[15px] text-ivory placeholder:text-cream/60",
        appearances[appearance],
        className,
      )}
      {...props}
    />
  );
}
