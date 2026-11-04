import { serializeJsonLd, type JsonLdObject } from "@/lib/structured-data";

/**
 * Structured data for search engines. dangerouslySetInnerHTML is required for
 * a JSON script body; the source is our own data and `<` is escaped.
 */
export default function JsonLd({
  data,
}: {
  data: JsonLdObject | JsonLdObject[];
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
