"use client";
import { useState } from "react";
import AppSelectButton, {
  type SelectOption,
} from "@/components/ui/AppSelectButton";
import type { Plan } from "../../_lib/content";
import PlanCard, { type Billing } from "./PlanCard";

const billingOptions: readonly SelectOption<Billing>[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const cardTilts = [-5, 0, 5];

/**
 * Plan grid with the monthly/yearly toggle. The toggle only appears once a
 * plan has a confirmed billed price; `heading` is server-rendered.
 */
export default function PricingPlans({
  heading,
  plans,
}: {
  heading: React.ReactNode;
  plans: readonly Plan[];
}) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const hasBilledPrices = plans.some(
    ({ price }) => price.kind === "billed" && (price.monthly || price.yearly),
  );

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-8">
        {heading}
        {hasBilledPrices && (
          <AppSelectButton
            ariaLabel="Billing period"
            options={billingOptions}
            value={billing}
            onChange={setBilling}
          />
        )}
      </div>
      <div className="grid items-stretch gap-5 tablet:grid-cols-3">
        {plans.map((plan, index) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            billing={billing}
            tilt={cardTilts[index] ?? 0}
            delay={index * 0.06}
          />
        ))}
      </div>
    </>
  );
}
