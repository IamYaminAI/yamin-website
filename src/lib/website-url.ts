/**
 * Turn what a visitor types ("yourbrand.com", "https://yourbrand.com/shop")
 * into a canonical http(s) URL, or null when it is not a usable website.
 */
export function normalizeWebsiteUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed || /\s/.test(trimmed)) return null;

  const withScheme = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;

  let url: URL;
  try {
    url = new URL(withScheme);
  } catch {
    return null;
  }

  if (!["http:", "https:"].includes(url.protocol)) return null;
  if (!url.hostname.includes(".") || url.hostname.endsWith(".")) return null;
  if (url.username || url.password) return null;

  const path = url.pathname === "/" ? "" : url.pathname;
  return `${url.origin}${path}`;
}
