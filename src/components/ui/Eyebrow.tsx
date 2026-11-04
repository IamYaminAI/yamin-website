import { cn } from "@/lib/class-names";

const tones = { gold: "text-gold", bronze: "text-bronze" } as const;

/** Small uppercase label above a section heading, with a leading rule. */
export default function Eyebrow({
  children,
  tone = "bronze",
  hasTrailingLine = false,
  className,
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
  hasTrailingLine?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-label m-0 inline-flex items-center gap-3 before:h-px before:w-7 before:bg-current before:opacity-70 before:content-['']",
        hasTrailingLine &&
          "after:h-px after:w-7 after:bg-current after:opacity-70 after:content-['']",
        tones[tone],
        className,
      )}
    >
      {children}
    </p>
  );
}
