import Reveal from "@/components/motion/Reveal";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

export default function MaximiseSection() {
  return (
    <Section
      tone="ink"
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="maximise-heading"
      className="[--k:clamp(0,calc((var(--p)-0.28)/0.18),1)] [--m:clamp(0,calc((var(--p)-0.4)/0.2),1)]"
    >
      <Container className="flex flex-col gap-16 py-24 tablet:py-[170px]">
        <Reveal className="flex max-w-[1000px] flex-col gap-[22px]">
          <Eyebrow tone="gold">Maximisation, not optimisation</Eyebrow>
          <DisplayHeading
            id="maximise-heading"
            className="text-[clamp(32px,3.8vw,60px)] text-ivory"
          >
            Optimising makes the current plan a bit better.{" "}
            <Accent tone="gold">
              Maximising asks whether it&apos;s the right plan.
            </Accent>
          </DisplayHeading>
        </Reveal>
        <dl className="m-0 flex flex-col gap-9">
          <div className="opacity-[calc(1-var(--k)*0.62)] flex flex-col gap-2.5">
            <dt className="text-label text-[11px] text-cream/60">Optimising</dt>
            <dd className="m-0 flex flex-col gap-2.5">
              <span className="relative self-start">
                <span className="text-display text-[clamp(36px,5.6vw,92px)] text-cream">
                  &quot;How do we tweak this?&quot;
                </span>
                <span
                  aria-hidden="true"
                  className="origin-left scale-x-(--k) absolute -inset-x-[1%] top-[52%] h-1.5 bg-gold"
                />
              </span>
              <span className="text-[17px] text-cream/70">
                Same plan, a little better.
              </span>
            </dd>
          </div>
          <div className="origin-left scale-[calc(0.92+var(--m)*0.08)] opacity-[calc(0.25+var(--m)*0.75)] flex flex-col gap-2.5">
            <dt className="text-label text-[11px] text-gold">Maximising</dt>
            <dd className="m-0 flex flex-col gap-2.5">
              <span className="text-display text-[clamp(36px,5.6vw,92px)] text-gold">
                &quot;Where&apos;s the money we&apos;re leaving behind?&quot;
              </span>
              <span className="text-[17px] text-cream">
                The right plan, read across the full funnel.
              </span>
            </dd>
          </div>
        </dl>
        <Reveal delay={0.3}>
          <p className="m-0 max-w-[680px] text-lg leading-[1.6] text-cream/80">
            Yamin reads the full funnel and the context around it, so the
            question shifts from &quot;how do we tweak this&quot; to
            &quot;where&apos;s the money we&apos;re leaving behind.&quot;
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
