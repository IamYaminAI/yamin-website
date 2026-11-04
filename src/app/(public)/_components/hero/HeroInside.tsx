import Accent from "@/components/ui/Accent";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/class-names";
import { hierarchyLevels } from "../../_lib/content";

/** What the camera finds inside the pupil: the brand → ad set hierarchy. */
export default function HeroInside() {
  const lastIndex = hierarchyLevels.length - 1;
  return (
    <div className="pointer-events-none scale-[calc(0.82+0.18*var(--in))] opacity-(--in) absolute inset-0 flex flex-col items-center justify-center gap-10 bg-mist px-6 text-center">
      <Eyebrow>Inside Yamin</Eyebrow>
      <DisplayHeading className="max-w-[1180px] text-[clamp(44px,7.4vw,124px)] text-ink">
        One view, from the brand <Accent>down to the ad set.</Accent>
      </DisplayHeading>
      <ol className="m-0 flex list-none flex-wrap items-center justify-center gap-3 p-0">
        {hierarchyLevels.map((level, index) => (
          <li key={level} className="flex items-center gap-3">
            <span
              className={cn(
                "[--on:clamp(0.18,calc(var(--ch)*5.4-var(--i)),1)] opacity-(--on)",
                "border-[rgb(18_22_44/calc(var(--on)*0.7))]",
                "rounded-full border px-[22px] py-3.5 text-[17px]",
                index === lastIndex ? "bg-ink text-mist" : "text-ink",
              )}
              style={{ "--i": index }}
            >
              {level}
            </span>
            {index < lastIndex && (
              <Icon
                name="arrow-right"
                size={22}
                strokeWidth={1.6}
                className="[--on:clamp(0.18,calc(var(--ch)*5.4-var(--i)),1)] stroke-bronze opacity-(--on)"
                style={{ "--i": index + 0.5 }}
              />
            )}
          </li>
        ))}
      </ol>
      <p className="[--then:clamp(0,calc((var(--ch)-0.8)*6),1)] translate-y-[calc((1-var(--then))*12px)] opacity-(--then) m-0 text-lg leading-normal text-slate">
        At every level: what changed, why, and what to decide.
      </p>
    </div>
  );
}
