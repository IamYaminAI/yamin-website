import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { renderWithProviders } from "@/test/renderWithProviders";
test("header navigation and mobile menu lead to public routes", async () => {
  const { store } = renderWithProviders(
    <>
      <Header />
      <Footer />
    </>,
  );
  const mainNav = screen.getByRole("navigation", { name: "Main navigation" });
  expect(
    within(mainNav).getByRole("link", { name: "Pricing" }),
  ).toHaveAttribute("href", "/#pricing");
  expect(
    screen.getByRole("link", { name: "Book a walkthrough" }),
  ).toHaveAttribute("href", "/#walkthrough");
  await userEvent.click(screen.getByRole("button", { name: "Open menu" }));
  expect(store.getState().ui.mobileMenuOpen).toBe(true);
  const mobileNav = screen.getByRole("navigation", {
    name: "Mobile navigation",
  });
  const pricingLink = within(mobileNav).getByRole("link", { name: "Pricing" });
  pricingLink.addEventListener("click", (event) => event.preventDefault());
  await userEvent.click(pricingLink);
  expect(store.getState().ui.mobileMenuOpen).toBe(false);
  const footerNav = screen.getByRole("navigation", { name: "Footer" });
  expect(
    within(footerNav).getByRole("link", { name: "Sitemap" }),
  ).toHaveAttribute("href", "/sitemap.html");
});
