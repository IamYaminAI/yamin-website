import Link from "next/link";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { footerLinks } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-ink bg-dots-cream text-cream">
      <Container className="flex flex-wrap items-center justify-between gap-5 border-t border-cream/15 pt-8 pb-10">
        <Logo />
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-cream/70 underline-offset-4 hover:text-white hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <p className="m-0 text-sm text-cream/70">
          Built by Lyxel &amp; Flamingo.
        </p>
      </Container>
    </footer>
  );
}
