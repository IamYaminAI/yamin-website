import {
  closeMobileMenu,
  openMobileMenu,
  toggleMobileMenu,
  uiSlice,
} from "@/store/slices/uiSlice";
test("mobile menu opens, toggles, and closes", () => {
  const open = uiSlice.reducer(undefined, openMobileMenu());
  expect(open.mobileMenuOpen).toBe(true);
  expect(uiSlice.reducer(open, toggleMobileMenu()).mobileMenuOpen).toBe(false);
  expect(uiSlice.reducer(open, closeMobileMenu()).mobileMenuOpen).toBe(false);
});
