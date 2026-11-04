import Reveal from "@/components/motion/Reveal";
import Accent from "@/components/ui/Accent";
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import { walkthroughLink } from "@/lib/site";
import { howSteps, walkthroughVideo } from "../_lib/content";

function WalkthroughFrame() {
  if (walkthroughVideo.src) {
    return (
      <video
        className="size-full object-cover"
        src={walkthroughVideo.src}
        controls
        preload="metadata"
        aria-label="Yamin product walkthrough"
      />
    );
  }
  // Until the video exists, the frame offers a live walkthrough instead.
  return (
    <>
      <div className="bg-dots-cream absolute inset-0" aria-hidden="true" />
      <ButtonLink
        href={walkthroughLink.href}
        aria-label="Book a live walkthrough"
        className="relative size-[104px] p-0"
      >
        <Icon name="play" size={34} className="fill-ink" />
      </ButtonLink>
      <span className="relative text-base text-cream">
        Book a live walkthrough
      </span>
    </>
  );
}

export default function HowItWorksSection() {
  return (
    <Section
      id="how"
      tone="paper"
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="how-heading"
      className="[--v:clamp(0,calc((var(--p)-0.04)/0.36),1)]"
    >
      <Container className="flex flex-col gap-16 py-24 tablet:py-40">
        <Reveal className="flex flex-col gap-[22px]">
          <Eyebrow>How it works</Eyebrow>
          <DisplayHeading
            id="how-heading"
            className="text-[clamp(44px,6.4vw,108px)] text-ink"
          >
            See how it reads <Accent>your account.</Accent>
          </DisplayHeading>
        </Reveal>
        <div className="scale-[calc(0.84+0.16*var(--v))] rounded-[calc(56px-32px*var(--v))] relative flex aspect-video flex-col items-center justify-center gap-[22px] overflow-hidden bg-ink">
          <WalkthroughFrame />
        </div>
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-[30px] h-px bg-ink/12 max-tablet:hidden"
          >
            <div className="origin-left scale-x-[clamp(0,calc((var(--p)-0.4)/0.28),1)] h-full bg-gold" />
          </div>
          <ol className="relative m-0 grid list-none gap-10 p-0 tablet:grid-cols-3">
            {howSteps.map((step, index) => {
              const isLast = index === howSteps.length - 1;
              return (
                <li key={step.title} className="flex flex-col gap-3.5">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "text-display flex size-[60px] items-center justify-center rounded-full text-[22px] tracking-normal",
                      isLast ? "bg-gold text-ink" : "bg-ink text-gold",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <DisplayHeading as="h3" className="mt-2 text-[34px] text-ink">
                    {step.title}
                  </DisplayHeading>
                  <p className="m-0 text-[17px] leading-[1.55] text-muted">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
