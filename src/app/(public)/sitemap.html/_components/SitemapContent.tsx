import Link from "next/link";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import { primaryLinks, publicPages } from "@/lib/site";

const linkClassName =
  "text-display text-[clamp(28px,3vw,40px)] text-ink no-underline hover:text-bronze focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold";

export default function SitemapContent() {
  return (
    <section className="bg-paper">
      <Container className="flex flex-col gap-12 pt-40 pb-24">
        <div className="flex flex-col gap-[22px]">
          <Eyebrow>Sitemap</Eyebrow>
          <DisplayHeading
            as="h1"
            className="text-[clamp(44px,6vw,96px)] text-ink"
          >
            Every page, <Accent>in one place.</Accent>
          </DisplayHeading>
        </div>
        <nav aria-label="Sitemap">
          <ul className="m-0 flex list-none flex-col p-0">
            {publicPages
              .filter(({ path }) => path !== "/sitemap.html")
              .map(({ path, label, description }) => (
                <li
                  key={path}
                  className="flex flex-col gap-2 border-t border-ink/15 py-8"
                >
                  <Link className={linkClassName} href={path}>
                    {label}
                  </Link>
                  <p className="m-0 max-w-[560px] text-[17px] leading-[1.6] text-slate">
                    {description}
                  </p>
                  {path === "/" && (
                    <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
                      {primaryLinks.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="text-base text-bronze underline-offset-4 hover:underline"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
