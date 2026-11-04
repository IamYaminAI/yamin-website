import Link from "next/link";
import MobileMenu from "@/components/layout/MobileMenu";
import ButtonLink from "@/components/ui/ButtonLink";
import Logo from "@/components/ui/Logo";
import { footerLinks, primaryLinks, walkthroughLink } from "@/lib/site";

const mobileLinks = [...primaryLinks, ...footerLinks];

export default function Header() {
  return (
    <header className="fixed inset-x-4 top-4 z-50 flex items-center justify-between gap-4 rounded-full border border-cream/12 bg-night/65 py-2.5 pr-2.5 pl-[22px] backdrop-blur-[14px]">
      <Link
        href="/"
        aria-label="Yamin home"
        className="flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
      >
        <Logo />
      </Link>
      <nav
        className="hidden items-center gap-[22px] tablet:flex"
        aria-label="Main navigation"
      >
        {primaryLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-1.5 py-3 text-sm text-cream/80 no-underline hover:text-white focus-visible:outline-2 focus-visible:outline-gold"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        {/* Wrapper owns visibility; the button's own inline-flex would override `hidden`. */}
        <div className="hidden xs:block">
          <ButtonLink href={walkthroughLink.href} size="sm">
            {walkthroughLink.label}
          </ButtonLink>
        </div>
        <MobileMenu links={mobileLinks} />
      </div>
    </header>
  );
}
