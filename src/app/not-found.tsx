import Link from "next/link";
import Accent from "@/components/ui/Accent";
import ButtonLink from "@/components/ui/ButtonLink";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Logo from "@/components/ui/Logo";

export default function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-8 bg-night bg-dots-cream px-[22px] py-24 text-center text-cream">
      <Link href="/" aria-label="Yamin home" className="mb-4">
        <Logo />
      </Link>
      <Eyebrow tone="gold">Error 404</Eyebrow>
      <DisplayHeading
        as="h1"
        className="max-w-[900px] text-[clamp(44px,7vw,104px)] text-ivory"
      >
        Nothing to see <Accent tone="gold">here.</Accent>
      </DisplayHeading>
      <p className="m-0 max-w-[480px] text-lg leading-[1.6] text-cream/80">
        The link may be out of date, or the page has moved.
      </p>
      <ButtonLink href="/" size="lg">
        Back to home
      </ButtonLink>
    </main>
  );
}
