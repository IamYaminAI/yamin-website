import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/(public)/page";
import SitemapPage from "@/app/(public)/sitemap.html/page";
import NotFound from "@/app/not-found";
import Loading from "@/app/(public)/loading";
import { renderWithProviders } from "@/test/renderWithProviders";

beforeAll(() => {
  // jsdom has no canvas; the hero eye skips drawing when no context exists.
  jest.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
});

test("home has one h1 and a labelled section for each part of the story", () => {
  renderWithProviders(<HomePage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: "The marketing that knows itself.",
    }),
  ).toBeInTheDocument();
  for (const name of [
    "Your data isn't the problem. The time it takes to read it is.",
    "Ask. Audit. See. Measure. Decide.",
    "See how it reads your account.",
    "antaryāmin",
    "Start with an audit. Grow into the rest.",
    "See what your marketing already knows.",
  ]) {
    expect(screen.getByRole("region", { name })).toBeInTheDocument();
  }
  expect(
    screen.getAllByRole("heading", {
      level: 3,
      name: /Ask Yamin|Audits|Creative Intelligence|Analytics|Decisions/,
    }),
  ).toHaveLength(5);
});

test("home keeps placeholder figures out of the page", () => {
  const { container } = renderWithProviders(<HomePage />);
  const visible = container.cloneNode(true) as HTMLElement;
  visible.querySelectorAll("script").forEach((script) => script.remove());
  expect(visible.textContent).not.toMatch(/\[[^\]]+\]/);
  expect(
    screen.queryByRole("heading", { name: "Counted, not estimated." }),
  ).not.toBeInTheDocument();
  const growth = screen.getByRole("article", { name: "Growth" });
  expect(within(growth).getByText("On request")).toBeInTheDocument();
  expect(
    screen.queryByRole("group", { name: "Billing period" }),
  ).not.toBeInTheDocument();
});

test("home describes itself with structured data", () => {
  const { container } = renderWithProviders(<HomePage />);
  const script = container.querySelector('script[type="application/ld+json"]');
  const data: Array<{ "@type": string }> = JSON.parse(
    script?.textContent ?? "[]",
  );
  expect(data.map((item) => item["@type"])).toEqual([
    "Organization",
    "WebSite",
    "SoftwareApplication",
    "FAQPage",
  ]);
});

test("home audit forms and the ticker are accessible", () => {
  renderWithProviders(<HomePage />);
  expect(screen.getAllByLabelText("Your website address")).toHaveLength(2);
  expect(
    screen.getByText(/^Yamin watches Google Ads, Meta, GA4/),
  ).toBeInTheDocument();
});

test("special public content has a way back", () => {
  const notFound = render(<NotFound />);
  expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute(
    "href",
    "/",
  );
  notFound.unmount();
  render(<Loading />);
  expect(screen.getByRole("status")).toHaveTextContent("Loading page");
});

test("HTML sitemap links to the home page and its sections", () => {
  render(<SitemapPage />);
  const nav = within(screen.getByRole("navigation", { name: "Sitemap" }));
  expect(nav.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
  expect(nav.getByRole("link", { name: "Pricing" })).toHaveAttribute(
    "href",
    "/#pricing",
  );
  expect(nav.queryByRole("link", { name: "About" })).not.toBeInTheDocument();
  expect(nav.queryByRole("link", { name: "Contact" })).not.toBeInTheDocument();
});

test("walkthrough calls to action stay on the page", () => {
  renderWithProviders(<HomePage />);
  for (const link of screen.getAllByRole("link", {
    name: /Book a walkthrough|Talk to us|Book a live walkthrough/,
  })) {
    expect(link.getAttribute("href")).toMatch(/^\/?#walkthrough$/);
  }
});
