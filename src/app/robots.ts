import type { MetadataRoute } from "next";
import { getSiteUrl, isSiteIndexable } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isSiteIndexable()) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: new URL("/sitemap.xml", getSiteUrl()).toString(),
  };
}
