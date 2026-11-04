"use client";
import { SelectButton } from "primereact/selectbutton";
import { cn } from "@/lib/class-names";

export type SelectOption<T extends string> = { label: string; value: T };

/**
 * Segmented control on PrimeReact SelectButton: a `role="group"` of
 * `aria-pressed` buttons with arrow-key support. A gold thumb slides behind
 * the selected option.
 */
export default function AppSelectButton<T extends string>({
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  options: readonly SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
}) {
  const selectedIndex = Math.max(
    0,
    options.findIndex((option) => option.value === value),
  );

  return (
    <SelectButton
      unstyled
      aria-label={ariaLabel}
      value={value}
      options={[...options]}
      allowEmpty={false}
      onChange={(event) => {
        const next = options.find((option) => option.value === event.value);
        if (next) onChange(next.value);
      }}
      className={cn(
        // The ::before thumb slides to the selected option via --index/--count.
        "relative inline-grid auto-cols-fr grid-flow-col rounded-full bg-ink p-[5px] before:absolute before:inset-y-[5px] before:left-[5px] before:w-[calc((100%-10px)/var(--count))] before:translate-x-[calc(var(--index)*100%)] before:rounded-full before:bg-gold before:transition-transform before:duration-[450ms] before:ease-cinematic before:content-[''] motion-reduce:before:transition-none",
        className,
      )}
      style={{ "--count": options.length, "--index": selectedIndex }}
      pt={{
        button: (options) => ({
          className: cn(
            "relative z-1 flex min-h-11 cursor-pointer items-center justify-center rounded-full px-[22px] text-sm font-medium transition-colors duration-300 select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light",
            options?.context.selected ? "text-ink" : "text-cream/75",
          ),
        }),
      }}
    />
  );
}
