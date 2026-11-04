"use client";
import Link from "next/link";
import AppButton from "@/components/ui/AppButton";
import AppSidebar from "@/components/ui/AppSidebar";
import type { NavLink } from "@/lib/site";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeMobileMenu, openMobileMenu } from "@/store/slices/uiSlice";
export default function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const dispatch = useAppDispatch();
  const visible = useAppSelector((state) => state.ui.mobileMenuOpen);
  return (
    <div className="tablet:hidden">
      <AppButton
        icon="pi pi-bars"
        aria-label="Open menu"
        variant="plain"
        size="icon"
        onClick={() => dispatch(openMobileMenu())}
      />
      <AppSidebar
        visible={visible}
        onHide={() => dispatch(closeMobileMenu())}
        position="right"
        header="Menu"
      >
        <nav className="flex flex-col gap-5" aria-label="Mobile navigation">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg text-ink no-underline hover:text-bronze"
              onClick={() => dispatch(closeMobileMenu())}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </AppSidebar>
    </div>
  );
}
