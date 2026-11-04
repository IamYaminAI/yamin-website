import { normalizeWebsiteUrl } from "@/lib/website-url";

test.each([
  ["yourbrand.com", "https://yourbrand.com"],
  [
    "  yourbrand.com/products/bestseller ",
    "https://yourbrand.com/products/bestseller",
  ],
  ["http://shop.example.co.uk/", "http://shop.example.co.uk"],
  ["HTTPS://Example.com", "https://example.com"],
])("normalizes %p", (input, expected) => {
  expect(normalizeWebsiteUrl(input)).toBe(expected);
});

test.each([
  "",
  "   ",
  "not a site",
  "localhost",
  "ftp://example.com",
  "javascript:alert(1)",
  "https://user:pw@example.com",
  "example.",
])("rejects %p", (input) => {
  expect(normalizeWebsiteUrl(input)).toBeNull();
});
