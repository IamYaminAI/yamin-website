import Marquee from "@/components/ui/Marquee";
import { watchedSources } from "../_lib/content";

export default function WatchedSourcesSection() {
  return (
    <section
      aria-label="What Yamin watches"
      className="border-y border-cream/10 bg-night py-[26px]"
    >
      <Marquee
        lead="Yamin watches"
        items={watchedSources}
        label="Yamin watches Google Ads, Meta, GA4, Shopify, UX audits, mobile site audits, account audits, your creatives and competitor creatives."
      />
    </section>
  );
}
