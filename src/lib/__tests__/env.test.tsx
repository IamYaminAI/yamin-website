import { getPublicEnv } from "@/lib/env";
test("validates optional site name", () => {
  const original = process.env.NEXT_PUBLIC_SITE_NAME;
  process.env.NEXT_PUBLIC_SITE_NAME = "Yamin";
  expect(getPublicEnv().siteName).toBe("Yamin");
  process.env.NEXT_PUBLIC_SITE_NAME = " ";
  expect(() => getPublicEnv()).toThrow(
    "NEXT_PUBLIC_SITE_NAME must not be empty",
  );
  delete process.env.NEXT_PUBLIC_SITE_NAME;
  expect(getPublicEnv().siteName).toBe("Yamin");
  if (original === undefined) delete process.env.NEXT_PUBLIC_SITE_NAME;
  else process.env.NEXT_PUBLIC_SITE_NAME = original;
});
