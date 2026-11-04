import Reveal from "@/components/motion/Reveal";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

/** Illustrative comparison: problems found late vs. flagged by Yamin. */
export default function DetectionSection() {
  return (
    <Section
      tone="ink"
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="detection-heading"
      className="[--f:clamp(0,calc((var(--p)-0.18)/0.42),1)]"
    >
      <Container className="flex flex-col gap-16 py-24 tablet:py-[150px]">
        <Reveal className="flex max-w-[980px] flex-col gap-[22px]">
          <Eyebrow tone="gold">Time-to-detection</Eyebrow>
          <DisplayHeading
            id="detection-heading"
            className="text-[clamp(34px,4.4vw,68px)] text-ivory"
          >
            The gap that matters is{" "}
            <Accent tone="gold">time-to-detection:</Accent> how long a problem
            runs before anyone sees it.
          </DisplayHeading>
        </Reveal>
        <div className="flex flex-col gap-11">
          <div className="flex flex-col gap-3.5">
            <div className="flex justify-between gap-4">
              <span className="text-label text-[11px] text-cream/70">
                Problem starts
              </span>
              <span className="opacity-[clamp(0,calc((var(--f)-0.92)*14),1)] text-label text-[11px] text-cream/90">
                Someone sees it
              </span>
            </div>
            <div
              className="h-3.5 overflow-hidden rounded-full bg-cream/8"
              aria-hidden="true"
            >
              <div className="origin-left scale-x-(--f) bg-[repeating-linear-gradient(90deg,rgb(238_229_210/0.55)_0_10px,rgb(238_229_210/0.25)_10px_20px)] h-full rounded-full" />
            </div>
            <p className="m-0 text-base text-cream/75">
              Spend keeps running while no one is looking.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex items-center gap-4">
              <span className="text-label text-[11px] text-cream/70">
                Problem starts
              </span>
              <span className="opacity-[clamp(0,calc((var(--f)-0.16)*14),1)] text-label text-[11px] text-gold">
                Yamin flags it
              </span>
            </div>
            <div
              className="h-3.5 overflow-hidden rounded-full bg-cream/8"
              aria-hidden="true"
            >
              <div className="h-full w-[18%]">
                <div className="origin-left scale-x-[clamp(0,calc(var(--f)*5),1)] h-full rounded-full bg-gold" />
              </div>
            </div>
          </div>
          <p className="text-label m-0 text-[11px] text-cream/55">
            Illustrative.
          </p>
        </div>
      </Container>
    </Section>
  );
}
