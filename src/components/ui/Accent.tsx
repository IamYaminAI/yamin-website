import { cn } from "@/lib/class-names";

const tones = { gold: "text-gold", bronze: "text-bronze" } as const;

/** Italic serif phrase inside a display headline. */
export default function Accent({
  children,
  tone = "bronze",
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <span className={cn("text-accent-serif", tones[tone], className)}>
      {children}
    </span>
  );
}
