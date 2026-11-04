import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { Plan } from "@/app/(public)/_lib/content";
import PricingPlans from "../PricingPlans";

const plans: Plan[] = [
  {
    id: "growth",
    name: "Growth",
    price: {
      kind: "billed",
      monthly: { amount: "$500", period: "/mo" },
      yearly: { amount: "$400", period: "/mo, billed yearly" },
    },
    description: "Everything.",
    features: ["Ask Yamin"],
    cta: { label: "Book a walkthrough", href: "#walkthrough" },
    isRecommended: true,
  },
];

test("billing toggle switches the price and pressed state", async () => {
  render(<PricingPlans heading={<h2>Pricing</h2>} plans={plans} />);
  const card = screen.getByRole("article", { name: "Growth" });
  const monthly = screen.getByRole("button", { name: "Monthly" });
  const yearly = screen.getByRole("button", { name: "Yearly" });

  expect(monthly).toHaveAttribute("aria-pressed", "true");
  expect(within(card).getByText("$500")).toBeInTheDocument();

  await userEvent.click(yearly);
  expect(yearly).toHaveAttribute("aria-pressed", "true");
  expect(monthly).toHaveAttribute("aria-pressed", "false");
  expect(within(card).getByText("$400")).toBeInTheDocument();
  expect(within(card).getByText("/mo, billed yearly")).toBeInTheDocument();
});
