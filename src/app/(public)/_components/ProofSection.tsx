import Reveal from "@/components/motion/Reveal";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import type { ProofStat } from "../_lib/content";

const tones: Record<
  ProofStat["tone"],
  { card: string; label: string; value: string; detail: string }
> = {
  white: {
    card: "bg-white border border-line",
    label: "text-bronze",
    value: "text-ink",
    detail: "text-muted",
  },
  ink: {
    card: "bg-ink",
    label: "text-gold",
    value: "text-ivory",
    detail: "text-cream/75",
  },
};

/** Counted client results. Renders nothing until real figures exist. */
export default function ProofSection({
  stats,
}: {
  stats: readonly ProofStat[];
}) {
  if (stats.length === 0) return null;
  return (
    <Section
      tone="paper"
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="proof-heading"
    >
      <Container className="flex flex-col gap-14 py-24 tablet:py-40">
        <Reveal className="flex flex-col gap-[22px]">
          <Eyebrow>Proof</Eyebrow>
          <DisplayHeading
            id="proof-heading"
            className="text-[clamp(48px,7vw,120px)] text-ink"
          >
            Counted, <Accent>not estimated.</Accent>
          </DisplayHeading>
        </Reveal>
        <div className="grid gap-6 tablet:grid-cols-2">
          {stats.map((stat, index) => {
            const tone = tones[stat.tone];
            return (
              <Reveal
                key={stat.label}
                delay={0.06 * (index + 1)}
                className={cn(
                  "flex min-h-80 flex-col justify-between gap-[18px] rounded-[28px] p-10",
                  tone.card,
                )}
              >
                <span className={cn("text-label text-[11px]", tone.label)}>
                  {stat.label}
                </span>
                <span
                  className={cn(
                    "text-display text-[clamp(44px,5vw,96px)]",
                    tone.value,
                  )}
                >
                  {stat.value}
                </span>
                <span className={cn("text-base leading-normal", tone.detail)}>
                  {stat.detail}
                </span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
