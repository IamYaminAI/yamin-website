export const publicPages = [
  {
    path: "/",
    label: "Home",
    description:
      "Marketing intelligence across Google Ads, Meta, GA4 and Shopify, with free audits.",
  },
  {
    path: "/sitemap.html",
    label: "Sitemap",
    description: "Every public page on the Yamin website.",
  },
] as const;

export type NavLink = { href: string; label: string };

/** Home-page sections, linked from every page's header. */
export const primaryLinks: readonly NavLink[] = [
  { href: "/#product", label: "Product" },
  { href: "/#how", label: "How it works" },
  { href: "/#name", label: "The name" },
  { href: "/#pricing", label: "Pricing" },
];

/** No booking tool exists yet, so walkthrough CTAs lead to the closing CTA section. */
export const walkthroughLink: NavLink = {
  href: "/#walkthrough",
  label: "Book a walkthrough",
};

export const footerLinks: readonly NavLink[] = publicPages
  .filter(({ path }) => path !== "/")
  .map(({ path, label }) => ({ href: path, label }));

/**
 * Vercel exposes host names (no protocol) at build and run time. The project's
 * production domain is preferred so preview builds still point canonical URLs
 * at production; the per-deployment host is the last resort.
 */
function getVercelOrigin(): string | undefined {
  const host =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return host ? `https://${host}` : undefined;
}

export function getSiteUrl(): URL {
  const value = process.env.SITE_URL || getVercelOrigin();

  if (!value) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SITE_URL must be set to the public website origin in production",
      );
    }
    return new URL("http://localhost:3000");
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("SITE_URL must be a valid absolute HTTP or HTTPS URL");
  }

  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.pathname !== "/" ||
    url.search ||
    url.hash ||
    url.username ||
    url.password
  ) {
    throw new Error("SITE_URL must be an HTTP or HTTPS origin without a path");
  }

  return url;
}

/**
 * Whether crawlers may index the site. Defaults to false so a pre-launch
 * deployment is never indexed by accident; set SITE_INDEXABLE=true at launch.
 */
export function isSiteIndexable(): boolean {
  const value = process.env.SITE_INDEXABLE;
  if (value === undefined || value === "" || value === "false") return false;
  if (value === "true") return true;
  throw new Error('SITE_INDEXABLE must be "true" or "false"');
}
