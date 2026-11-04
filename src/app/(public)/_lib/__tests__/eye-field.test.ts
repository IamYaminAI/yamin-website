import { createEyeField, getFlyIn } from "@/app/(public)/_lib/eye-field";

test("small screens get fewer particles", () => {
  const small = createEyeField(true, () => 0.5);
  const large = createEyeField(false, () => 0.5);
  expect(small.points.length).toBeLessThan(large.points.length);
  // 900 sphere + 198 core + 288 ring points, six floats each.
  expect(small.points.length).toBe((900 + 198 + 288) * 6);
  expect(small.labels).toHaveLength(6);
});

test("fly-in eases from rest to fully inside and is off for reduced motion", () => {
  expect(getFlyIn(0, false)).toBe(0);
  expect(getFlyIn(0.66, false)).toBe(1);
  expect(getFlyIn(0.35, false)).toBeCloseTo(0.5, 1);
  expect(getFlyIn(0.66, true)).toBe(0);
});
