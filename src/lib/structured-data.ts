import { getPublicEnv } from "@/lib/env";
import { getSiteUrl } from "@/lib/site";

export type JsonLdObject = { "@context"?: string; "@type": string } & Record<
  string,
  unknown
>;

/**
 * Serialize JSON-LD for an inline <script>. Escaping `<` prevents a value such
 * as "</script>" from closing the tag early (see Next.js JSON-LD guide).
 */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function absoluteUrl(path: string): string {
  return new URL(path, getSiteUrl()).href;
}

export function organizationJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: getPublicEnv().siteName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/yamin-logo-on-light.svg"),
  };
}

export function websiteJsonLd(description: string): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: getPublicEnv().siteName,
    url: absoluteUrl("/"),
    description,
  };
}

export function softwareApplicationJsonLd({
  description,
  featureList,
}: {
  description: string;
  featureList: readonly string[];
}): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: getPublicEnv().siteName,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: absoluteUrl("/"),
    description,
    featureList: [...featureList],
  };
}

export function faqJsonLd(
  items: readonly { question: string; answer: string }[],
): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}
