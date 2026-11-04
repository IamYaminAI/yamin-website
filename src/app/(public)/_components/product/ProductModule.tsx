import DisplayHeading from "@/components/ui/DisplayHeading";
import type {
  ProductModule as ProductModuleData,
  ProductModuleId,
} from "../../_lib/content";
import AnalyticsVisual from "./visuals/AnalyticsVisual";
import AskVisual from "./visuals/AskVisual";
import AuditsVisual from "./visuals/AuditsVisual";
import CreativeVisual from "./visuals/CreativeVisual";
import DecisionsVisual from "./visuals/DecisionsVisual";

const visuals: Record<ProductModuleId, () => React.ReactNode> = {
  ask: AskVisual,
  audits: AuditsVisual,
  creative: CreativeVisual,
  analytics: AnalyticsVisual,
  decisions: DecisionsVisual,
};

export default function ProductModule({
  module,
  index,
}: {
  module: ProductModuleData;
  index: number;
}) {
  const Visual = visuals[module.id];
  return (
    <article
      className="w-full tablet:h-[min(calc(var(--vh)-230px),600px)] tablet:min-h-[440px] tablet:w-[min(880px,86vw)] grid shrink-0 gap-10 rounded-[30px] bg-white p-7 shadow-[0_30px_70px_rgb(18_22_44/0.08)] tablet:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] tablet:p-11"
      aria-labelledby={`module-${module.id}`}
    >
      <div className="flex flex-col justify-between gap-6">
        <span
          className="[-webkit-text-stroke:1.5px_var(--color-gold)] tablet:translate-x-[calc(var(--p)*140px)] text-display text-[120px] text-transparent"
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-3.5">
          <DisplayHeading
            as="h3"
            id={`module-${module.id}`}
            className="text-[48px] text-ink"
          >
            {module.title}
          </DisplayHeading>
          <p className="m-0 text-[17px] leading-[1.55] text-muted">
            {module.description}
          </p>
        </div>
      </div>
      <div aria-hidden="true" className="grid">
        <Visual />
      </div>
    </article>
  );
}
