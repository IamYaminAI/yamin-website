import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/class-names";

/** Centered 1280px content column with the brand side gutters. */
export default function Container({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-7xl px-[22px] tablet:px-12",
        className,
      )}
      {...props}
    />
  );
}
