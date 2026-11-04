import {
  faqJsonLd,
  organizationJsonLd,
  serializeJsonLd,
} from "@/lib/structured-data";

const originalSiteUrl = process.env.SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = originalSiteUrl;
});

test("serialized JSON-LD cannot close its script tag", () => {
  const output = serializeJsonLd({
    "@type": "Thing",
    name: "</script><script>alert(1)</script>",
  });
  expect(output).not.toContain("<");
  expect(JSON.parse(output).name).toBe("</script><script>alert(1)</script>");
});

test("organization uses absolute URLs from the configured origin", () => {
  process.env.SITE_URL = "https://example.com";
  expect(organizationJsonLd()).toMatchObject({
    "@type": "Organization",
    url: "https://example.com/",
    logo: "https://example.com/brand/yamin-logo-on-light.svg",
  });
});

test("FAQ items become questions with accepted answers", () => {
  expect(faqJsonLd([{ question: "Q?", answer: "A." }])).toEqual({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Q?",
        acceptedAnswer: { "@type": "Answer", text: "A." },
      },
    ],
  });
});
