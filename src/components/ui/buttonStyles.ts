import { cn } from "@/lib/class-names";

export type ButtonVariant =
  "gold" | "ghost" | "ink" | "outline" | "light" | "plain";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "icon";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-full border font-medium no-underline transition-[background-color,color,border-color,transform] duration-300 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold motion-safe:hover:-translate-y-0.5 cursor-pointer";

// Each variant owns its border colour; a shared default would win or lose by CSS order.
const variants: Record<ButtonVariant, string> = {
  gold: "border-transparent bg-gold text-ink hover:bg-gold-light hover:text-ink",
  ghost: "border-cream/40 text-cream hover:border-cream hover:text-white",
  ink: "border-transparent bg-ink text-ivory hover:bg-ink-raised hover:text-ivory",
  outline: "border-ink text-ink hover:bg-ink hover:text-ivory",
  light: "border-transparent bg-mist text-ink hover:bg-white hover:text-ink",
  plain: "border-transparent bg-transparent text-cream hover:bg-cream/10",
};

const sizes: Record<ButtonSize, string> = {
  sm: "min-h-11 px-5 text-sm",
  md: "min-h-12 px-6 text-[15px]",
  lg: "min-h-[54px] px-6 text-[15px]",
  xl: "h-16 px-9 text-[17px]",
  icon: "size-11 p-0 text-base",
};

/** Shared by ButtonLink and AppButton so links and buttons look the same. */
export function buttonClassName({
  variant = "gold",
  size = "md",
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
} = {}) {
  return cn(base, variants[variant], sizes[size], className);
}
