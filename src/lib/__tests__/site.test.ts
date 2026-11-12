import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { getSiteUrl, isSiteIndexable } from "@/lib/site";

const originalSiteUrl = process.env.SITE_URL;
const originalIndexable = process.env.SITE_INDEXABLE;
const vercelKeys = ["VERCEL_PROJECT_PRODUCTION_URL", "VERCEL_URL"] as const;
const originalVercel = vercelKeys.map((key) => process.env[key]);

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = originalSiteUrl;
  if (originalIndexable === undefined) delete process.env.SITE_INDEXABLE;
  else process.env.SITE_INDEXABLE = originalIndexable;
  vercelKeys.forEach((key, index) => {
    const original = originalVercel[index];
    if (original === undefined) delete process.env[key];
    else process.env[key] = original;
  });
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

test("site URL falls back to the Vercel production domain", () => {
  delete process.env.SITE_URL;
  process.env.VERCEL_PROJECT_PRODUCTION_URL = "yamin.vercel.app";
  process.env.VERCEL_URL = "yamin-abc123.vercel.app";
  expect(getSiteUrl().href).toBe("https://yamin.vercel.app/");
});

test("site URL falls back to the deployment host when no production domain exists", () => {
  delete process.env.SITE_URL;
  delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  process.env.VERCEL_URL = "yamin-abc123.vercel.app";
  expect(getSiteUrl().href).toBe("https://yamin-abc123.vercel.app/");
});

test("explicit SITE_URL takes precedence over Vercel hosts", () => {
  process.env.SITE_URL = "https://www.example.com";
  process.env.VERCEL_PROJECT_PRODUCTION_URL = "yamin.vercel.app";
  expect(getSiteUrl().href).toBe("https://www.example.com/");
});
