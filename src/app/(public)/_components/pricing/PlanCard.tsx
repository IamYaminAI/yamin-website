import ButtonLink from "@/components/ui/ButtonLink";
import CheckList from "@/components/ui/CheckList";
import type { ButtonVariant } from "@/components/ui/buttonStyles";
import { cn } from "@/lib/class-names";
import type { Plan } from "../../_lib/content";

export type Billing = "monthly" | "yearly";

function PlanPrice({ plan, billing }: { plan: Plan; billing: Billing }) {
  if (plan.price.kind === "fixed") {
    return <p className="text-display m-0 text-[64px]">{plan.price.label}</p>;
  }
  const price = plan.price[billing];
  if (!price) {
    return <p className="text-display m-0 text-[52px]">On request</p>;
  }
  return (
    <p className="text-display m-0 text-[52px]">
      {price.amount}
      <span className="font-sans text-base font-normal tracking-normal opacity-70">
        {" "}
        {price.period}
      </span>
    </p>
  );
}

function getPlanTheme(plan: Plan): {
  surface: string;
  ctaVariant: ButtonVariant;
} {
  if (plan.isRecommended) {
    return {
      surface: "bg-ink text-cream shadow-[0_40px_80px_rgb(18_22_44/0.32)]",
      ctaVariant: "gold",
    };
  }
  if (plan.id === "audit") {
    return {
      surface: "border border-sand bg-parchment text-ink",
      ctaVariant: "ink",
    };
  }
  return {
    surface: "border border-sand bg-white text-ink",
    ctaVariant: "outline",
  };
}

export default function PlanCard({
  plan,
  billing,
  tilt,
  delay,
}: {
  plan: Plan;
  billing: Billing;
  /** Rotation (deg) the card rises from as the section reveals. */
  tilt: number;
  delay: number;
}) {
  const isDark = Boolean(plan.isRecommended);
  const { surface, ctaVariant } = getPlanTheme(plan);

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "group [--q:clamp(0,calc((var(--p)-0.08-var(--d,0))*5),1)] opacity-(--q) transition-shadow duration-500 [transform:translateY(calc((1-var(--q))*120px))_rotate(calc((1-var(--q))*var(--rz,0deg)))]",
        "relative rounded-[30px] px-9 py-10",
        surface,
      )}
      style={{ "--d": delay, "--rz": `${tilt}deg` }}
    >
      <div className="transition-transform duration-500 ease-cinematic group-hover:-translate-y-1.5 motion-reduce:transition-none flex h-full flex-col gap-[26px]">
        {plan.isRecommended && (
          <span className="text-label absolute top-[22px] right-[22px] rounded-full bg-gold px-3 py-[7px] text-[10px] text-ink">
            Recommended
          </span>
        )}
        <div className="flex flex-col gap-2.5">
          <h3
            id={`plan-${plan.id}`}
            className={cn(
              "text-label m-0 text-[11px]",
              isDark ? "text-gold" : "text-bronze",
            )}
          >
            {plan.name}
          </h3>
          <div className={isDark ? "text-ivory" : "text-ink"}>
            <PlanPrice plan={plan} billing={billing} />
          </div>
          <p
            className={cn(
              "m-0 text-base leading-normal",
              isDark ? "text-cream/80" : "text-muted",
            )}
          >
            {plan.description}
          </p>
        </div>
        <CheckList
          items={plan.features}
          tone={isDark ? "gold" : "deep"}
          className={cn(
            "flex-1 border-t pt-6",
            isDark ? "border-cream/15" : "border-sand",
          )}
        />
        <ButtonLink href={plan.cta.href} variant={ctaVariant} size="lg">
          {plan.cta.label}
        </ButtonLink>
      </div>
    </article>
  );
}
