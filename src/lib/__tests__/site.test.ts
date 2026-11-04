import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getSiteUrl, isSiteIndexable } from "@/lib/site";

const originalSiteUrl = process.env.SITE_URL;
const originalIndexable = process.env.SITE_INDEXABLE;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = originalSiteUrl;
  if (originalIndexable === undefined) delete process.env.SITE_INDEXABLE;
  else process.env.SITE_INDEXABLE = originalIndexable;
});

test("sitemap uses the configured public origin", () => {
  process.env.SITE_URL = "https://example.com";

  expect(sitemap().map(({ url }) => url)).toEqual([
    "https://example.com/",
    "https://example.com/sitemap.html",
  ]);
});

test("robots blocks all crawlers until indexing is enabled", () => {
  delete process.env.SITE_INDEXABLE;
  expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });

  process.env.SITE_INDEXABLE = "false";
  expect(robots()).toEqual({ rules: { userAgent: "*", disallow: "/" } });
});

test("robots allows crawling and lists the sitemap once indexable", () => {
  process.env.SITE_URL = "https://example.com";
  process.env.SITE_INDEXABLE = "true";
  expect(robots()).toEqual({
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://example.com/sitemap.xml",
  });
});

test("indexing flag rejects unexpected values", () => {
  process.env.SITE_INDEXABLE = "yes";
  expect(() => isSiteIndexable()).toThrow('"true" or "false"');
});

test("site URL rejects paths that would break canonical URLs", () => {
  process.env.SITE_URL = "https://example.com/subpath";
  expect(() => getSiteUrl()).toThrow("without a path");
});
