import Accent from "@/components/ui/Accent";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import { productModules } from "../../_lib/content";
import ProductModule from "./ProductModule";

/** Scene 3: vertical scroll travels horizontally through the five modules. */
export default function ProductSection() {
  return (
    <Section
      id="product"
      tone="mist"
      scene={{ kind: "pin", rest: 0 }}
      aria-labelledby="product-heading"
      className="[--dist:0px] tablet:h-[calc(var(--vh)*4.6)] relative"
    >
      <div className="flex flex-col tablet:sticky tablet:top-0 tablet:h-(--vh) tablet:overflow-hidden">
        <div className="px-[22px] pt-24 pb-8 tablet:px-12 tablet:pt-[104px] tablet:pb-7 flex items-center justify-between gap-6">
          <Eyebrow>The product</Eyebrow>
          <div
            className="flex w-[min(320px,40vw)] items-center gap-4 max-tablet:hidden"
            aria-hidden="true"
          >
            <div className="h-0.5 flex-1 bg-ink/12">
              <div className="origin-left scale-x-(--p) h-full bg-ink" />
            </div>
            <span className="text-label text-[11px] text-ink">Scroll</span>
          </div>
        </div>
        <div className="flex flex-1 items-center">
          <div
            data-scene-track=""
            className="flex flex-col gap-8 px-[22px] pb-[72px] will-change-transform tablet:w-max tablet:translate-x-[calc(var(--p)*var(--dist)*-1)] tablet:flex-row tablet:items-stretch tablet:px-12 tablet:pb-0"
          >
            <div className="flex w-[min(560px,80vw)] shrink-0 flex-col justify-center gap-7 pr-10 max-tablet:w-auto max-tablet:pr-0">
              <DisplayHeading
                id="product-heading"
                className="text-[clamp(52px,6.8vw,116px)] text-ink"
              >
                Ask. Audit. <Accent>See.</Accent> Measure.{" "}
                <Accent>Decide.</Accent>
              </DisplayHeading>
              <p className="m-0 max-w-[420px] text-[19px] leading-[1.55] text-slate">
                Every channel, audit and creative in one place.
              </p>
            </div>
            {productModules.map((module, index) => (
              <ProductModule key={module.id} module={module} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
