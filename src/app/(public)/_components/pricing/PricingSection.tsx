import Reveal from "@/components/motion/Reveal";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import Section from "@/components/ui/Section";
import type { Plan } from "../../_lib/content";
import PricingPlans from "./PricingPlans";

export default function PricingSection({
  plans,
  faqs,
}: {
  plans: readonly Plan[];
  faqs: readonly FaqItem[];
}) {
  return (
    <Section
      id="pricing"
      tone="cream"
      hasDots
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="pricing-heading"
    >
      <Container className="flex flex-col gap-16 py-24 tablet:py-40">
        <PricingPlans
          plans={plans}
          heading={
            <Reveal className="flex max-w-[860px] flex-col gap-[22px]">
              <Eyebrow>Pricing</Eyebrow>
              <DisplayHeading
                id="pricing-heading"
                className="text-[clamp(48px,6.6vw,112px)] text-ink"
              >
                Start with an audit. <Accent>Grow into the rest.</Accent>
              </DisplayHeading>
            </Reveal>
          }
        />
        <Reveal
          delay={0.2}
          className="mt-8 grid gap-12 tablet:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]"
        >
          <DisplayHeading
            as="h3"
            className="text-[clamp(34px,3.6vw,56px)] text-ink"
          >
            Questions, <Accent>answered.</Accent>
          </DisplayHeading>
          <FaqAccordion items={faqs} />
        </Reveal>
      </Container>
    </Section>
  );
}
