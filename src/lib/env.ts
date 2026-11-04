/** Validate optional public configuration without exposing server-only values. */
export function getPublicEnv() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Yamin";
  if (!siteName.trim())
    throw new Error("NEXT_PUBLIC_SITE_NAME must not be empty");
  return { siteName };
}
