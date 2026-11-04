import type { MetadataRoute } from "next";
import { getSiteUrl, publicPages } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return publicPages.map(({ path }) => ({
    url: new URL(path, siteUrl).toString(),
  }));
}
