import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import AppMessage from "@/components/ui/AppMessage";
import AppSelectButton from "@/components/ui/AppSelectButton";
import AppSidebar from "@/components/ui/AppSidebar";
import AppSkeleton from "@/components/ui/AppSkeleton";
import AppTag from "@/components/ui/AppTag";
import { renderWithProviders } from "@/test/renderWithProviders";

function BillingToggle() {
  const [value, setValue] = useState<"monthly" | "yearly">("monthly");
  return (
    <AppSelectButton
      ariaLabel="Billing period"
      options={[
        { label: "Monthly", value: "monthly" },
        { label: "Yearly", value: "yearly" },
      ]}
      value={value}
      onChange={setValue}
    />
  );
}

test("AppSelectButton is a labelled group of pressed-state buttons", async () => {
  renderWithProviders(<BillingToggle />);
  expect(
    screen.getByRole("group", { name: "Billing period" }),
  ).toBeInTheDocument();
  const yearly = screen.getByRole("button", { name: "Yearly" });
  await userEvent.click(yearly);
  expect(yearly).toHaveAttribute("aria-pressed", "true");
  // Clicking the selected option keeps it selected (no empty state).
  await userEvent.click(yearly);
  expect(yearly).toHaveAttribute("aria-pressed", "true");
});

test("AppMessage announces errors", () => {
  renderWithProviders(<AppMessage id="err" text="Something went wrong." />);
  const alert = screen.getByRole("alert");
  expect(alert).toHaveAttribute("id", "err");
  expect(alert).toHaveTextContent("Something went wrong.");
});

test("AppTag renders its value", () => {
  render(<AppTag value="Meta" tone="dark" />);
  expect(screen.getByText("Meta")).toBeInTheDocument();
});

test("AppSidebar shows its content only when visible", () => {
  const view = renderWithProviders(
    <AppSidebar visible={false} onHide={() => {}} header="Menu">
      <p>Drawer content</p>
    </AppSidebar>,
  );
  expect(screen.queryByText("Drawer content")).not.toBeInTheDocument();
  view.rerender(
    <AppSidebar visible onHide={() => {}} header="Menu">
      <p>Drawer content</p>
    </AppSidebar>,
  );
  expect(screen.getByText("Drawer content")).toBeInTheDocument();
});

test("AppSkeleton takes its size from width and height", () => {
  const { container } = render(<AppSkeleton width="75%" />);
  const bar = container.firstElementChild as HTMLElement;
  expect(bar).toHaveAttribute("aria-hidden", "true");
  expect(bar.style.width).toBe("75%");
  expect(bar.style.height).toBe("10px");
});
