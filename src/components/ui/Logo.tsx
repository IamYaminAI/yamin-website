import Image from "next/image";
import { cn } from "@/lib/class-names";

const sources = {
  dark: "/brand/yamin-logo-on-dark.svg",
  light: "/brand/yamin-logo-on-light.svg",
} as const;

// Height is a prop, not a className override, so it never competes with a
// default height class.
const sizes = { md: "h-[26px]", sm: "h-[22px]" } as const;

/** Yamin wordmark. `background` is the surface it sits on. */
export default function Logo({
  background = "dark",
  size = "md",
  className,
}: {
  background?: keyof typeof sources;
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <Image
      src={sources[background]}
      alt="Yamin"
      width={148}
      height={36}
      className={cn("block w-auto", sizes[size], className)}
    />
  );
}
