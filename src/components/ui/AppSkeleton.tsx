"use client";
import { Skeleton, type SkeletonProps } from "primereact/skeleton";
import { cn } from "@/lib/class-names";

const tones = {
  light:
    "bg-[linear-gradient(90deg,var(--color-skeleton)_0,var(--color-paper)_40%,var(--color-skeleton)_80%)]",
  dark: "bg-[linear-gradient(90deg,rgb(238_229_210/0.08)_0,rgb(238_229_210/0.2)_40%,rgb(238_229_210/0.08)_80%)]",
} as const;

// PrimeReact Skeleton ignores `style`; size it with width/height instead.
type AppSkeletonProps = Omit<SkeletonProps, "unstyled" | "pt" | "style"> & {
  /** The background the skeleton sits on. */
  tone?: keyof typeof tones;
};

/** PrimeReact Skeleton with the brand shimmer (stops for reduced motion). */
export default function AppSkeleton({
  tone = "light",
  className,
  height = "10px",
  borderRadius = "6px",
  ...props
}: AppSkeletonProps) {
  return (
    <Skeleton
      unstyled
      height={height}
      borderRadius={borderRadius}
      className={cn(
        "animate-shimmer [background-size:520px_100%] motion-reduce:animate-none",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
