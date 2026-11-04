import ScrollScenes from "@/components/motion/ScrollScenes";
import JsonLd from "@/components/seo/JsonLd";
import {
  faqJsonLd,
  organizationJsonLd,
  softwareApplicationJsonLd,
  websiteJsonLd,
} from "@/lib/structured-data";
import DetectionSection from "./_components/DetectionSection";
import FinalCtaSection from "./_components/FinalCtaSection";
import HeroSection from "./_components/hero/HeroSection";
import HowItWorksSection from "./_components/HowItWorksSection";
import MaximiseSection from "./_components/MaximiseSection";
import NameSection from "./_components/NameSection";
import PricingSection from "./_components/pricing/PricingSection";
import ProblemSection from "./_components/ProblemSection";
import ProductSection from "./_components/product/ProductSection";
import ProofSection from "./_components/ProofSection";
import WatchedSourcesSection from "./_components/WatchedSourcesSection";
import WhoDecidesSection from "./_components/WhoDecidesSection";
import { faqs, plans, productModules, proofStats } from "./_lib/content";
import { homeDescription, homeMetadata } from "./_metadata/metadata";

export const metadata = homeMetadata;

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          organizationJsonLd(),
          websiteJsonLd(homeDescription),
          softwareApplicationJsonLd({
            description: homeDescription,
            featureList: productModules.map(({ title }) => title),
          }),
          faqJsonLd(faqs),
        ]}
      />
      <ScrollScenes className="bg-night">
        <HeroSection />
        <WatchedSourcesSection />
        <ProblemSection />
        <DetectionSection />
        <ProductSection />
        <HowItWorksSection />
        <WhoDecidesSection />
        <MaximiseSection />
        <NameSection />
        <ProofSection stats={proofStats} />
        <PricingSection plans={plans} faqs={faqs} />
        <FinalCtaSection />
      </ScrollScenes>
    </>
  );
}
