import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/class-names";

type DisplayHeadingProps = ComponentPropsWithoutRef<"h2"> & {
  as?: "h1" | "h2" | "h3";
};

/** Brand headline: heavy grotesk, tight tracking. Size is set per use. */
export default function DisplayHeading({
  as: Tag = "h2",
  className,
  ...props
}: DisplayHeadingProps) {
  return <Tag className={cn("text-display m-0", className)} {...props} />;
}
