import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ButtonLink from "@/components/ui/ButtonLink";
import FaqAccordion from "@/components/ui/FaqAccordion";
import Icon from "@/components/ui/Icon";
import JsonLd from "@/components/seo/JsonLd";
import Marquee from "@/components/ui/Marquee";
import Section from "@/components/ui/Section";

test("ButtonLink is a real link", () => {
  render(
    <ButtonLink href="/sitemap.html" variant="ghost">
      Talk to us
    </ButtonLink>,
  );
  expect(screen.getByRole("link", { name: "Talk to us" })).toHaveAttribute(
    "href",
    "/sitemap.html",
  );
});

// Native <details>/<summary>: browsers also toggle it with Enter and Space.
test("FAQ answers open from their question", async () => {
  render(
    <FaqAccordion
      items={[{ question: "Is it free?", answer: "The audit is." }]}
    />,
  );
  const summary = screen.getByText("Is it free?");
  const details = summary.closest("details");
  expect(details).not.toHaveAttribute("open");
  await userEvent.click(summary);
  expect(details).toHaveAttribute("open");
});

test("Marquee reads once to screen readers and hides the moving copy", () => {
  const { container } = render(
    <Marquee lead="Watching" items={["A", "B"]} label="Watching A and B." />,
  );
  expect(screen.getByText("Watching A and B.")).toBeInTheDocument();
  expect(container.querySelector('[aria-hidden="true"]')).toHaveTextContent(
    "WatchingA·B·WatchingA·B·",
  );
});

test("Section registers scroll scenes with a resting progress", () => {
  render(<Section aria-label="Demo" scene={{ kind: "view", rest: 0.6 }} />);
  const section = screen.getByRole("region", { name: "Demo" });
  expect(section).toHaveAttribute("data-scene", "view");
  expect(section.style.getPropertyValue("--p")).toBe("0.6");
});

test("JsonLd escapes markup in its payload", () => {
  const { container } = render(
    <JsonLd data={{ "@type": "Thing", name: "<b>" }} />,
  );
  expect(container.querySelector("script")?.innerHTML).toBe(
    '{"@type":"Thing","name":"\\u003cb>"}',
  );
});

test("Icon references the shared sprite and stays decorative", () => {
  const { container } = render(
    <Icon name="arrow-long" strokeWidth={1.6} className="stroke-gold" />,
  );
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("aria-hidden", "true");
  expect(svg).toHaveAttribute("width", "44");
  expect(svg).toHaveAttribute("stroke-width", "1.6");
  expect(container.querySelector("use")).toHaveAttribute(
    "href",
    "/icons/sprite.svg#arrow-long",
  );
});

test("filled icons use currentColor fill instead of a stroke", () => {
  const { container } = render(<Icon name="play" size={34} />);
  const svg = container.querySelector("svg");
  expect(svg).toHaveAttribute("fill", "currentColor");
  expect(svg).toHaveAttribute("stroke", "none");
});
