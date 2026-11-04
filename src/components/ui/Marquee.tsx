import { Fragment } from "react";
import Accent from "@/components/ui/Accent";

/**
 * Endless horizontal ticker. Screen readers get one plain sentence; the
 * moving, duplicated track is hidden from them.
 */
export default function Marquee({
  lead,
  items,
  label,
}: {
  lead: string;
  items: readonly string[];
  label: string;
}) {
  const run = (
    <>
      <Accent tone="gold">{lead}</Accent>
      {items.map((item) => (
        <Fragment key={item}>
          <span>{item}</span>
          <span className="text-gold">·</span>
        </Fragment>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden">
      <p className="sr-only">{label}</p>
      <div
        className="flex w-max animate-marquee gap-10 font-display text-[44px] leading-[0.92] font-semibold tracking-[-0.03em] whitespace-nowrap text-cream/90 motion-reduce:animate-none"
        aria-hidden="true"
      >
        {run}
        {run}
      </div>
    </div>
  );
}
