import AuditForm from "@/components/forms/AuditForm";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";

export default function FinalCtaSection() {
  return (
    <Section
      id="walkthrough"
      tone="ink"
      hasDots
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="cta-heading"
      className="overflow-hidden"
    >
      <Container className="flex flex-col items-center gap-10 pt-24 pb-24 text-center tablet:pt-[180px] tablet:pb-[140px]">
        <Eyebrow tone="gold">Start here</Eyebrow>
        <DisplayHeading
          id="cta-heading"
          className="max-w-[1200px] scale-[calc(1.18-clamp(0,calc((var(--p)-0.04)/0.36),1)*0.18)] text-[clamp(52px,8.4vw,144px)] text-ivory"
        >
          See what your marketing <Accent tone="gold">already knows.</Accent>
        </DisplayHeading>
        <p className="m-0 max-w-[560px] text-lg leading-[1.6] text-cream/80">
          Enter your website and Yamin checks the UX, the mobile site and how
          your accounts are set up. No commitment.
        </p>
        <div
          id="audit"
          className="flex w-[min(620px,100%)] scroll-mt-32 flex-col gap-3"
        >
          <AuditForm variant="inline" />
          <p className="m-0 text-sm text-cream/70">
            Free · UX, mobile site and account checks.
          </p>
        </div>
      </Container>
    </Section>
  );
}
