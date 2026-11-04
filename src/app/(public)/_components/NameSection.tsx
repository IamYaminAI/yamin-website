import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import { nameLetters } from "../_lib/content";

const fullName = nameLetters.map(({ char }) => char).join("");

/** The name's letters drift apart and settle as the section scrolls. */
export default function NameSection() {
  return (
    <Section
      id="name"
      tone="night"
      scene={{ kind: "view", rest: 0.5 }}
      aria-labelledby="name-heading"
      className="relative overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="scale-[calc(0.6+var(--p)*0.8)] opacity-[calc(0.2+var(--p)*0.8)] shadow-[inset_0_0_120px_rgb(201_168_106/0.12)] absolute top-1/2 left-1/2 -mt-[450px] -ml-[450px] size-[900px] rounded-full border border-gold/25"
      />
      <Container className="relative flex flex-col items-center gap-10 py-24 text-center tablet:py-[200px]">
        <Eyebrow tone="gold">The name</Eyebrow>
        <DisplayHeading
          id="name-heading"
          aria-label={fullName}
          className="text-[clamp(64px,14vw,240px)] tracking-[-0.06em]! whitespace-nowrap text-ivory"
        >
          {nameLetters.map((letter, index) => (
            <span
              key={index}
              aria-hidden="true"
              className={cn(
                "inline-block translate-y-[calc((var(--p)-0.5)*var(--s)*1px)]",
                "isAccent" in letter &&
                  "text-accent-serif px-[0.04em] text-gold",
              )}
              style={{ "--s": letter.drift }}
            >
              {letter.char}
            </span>
          ))}
        </DisplayHeading>
        <Reveal>
          <p className="m-0 text-[22px] leading-normal text-cream/85">
            From the Sanskrit, the inner controller.
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="text-accent-serif m-0 text-[clamp(30px,3.4vw,52px)] leading-[1.15] text-gold">
            The intelligence that sees from within.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
