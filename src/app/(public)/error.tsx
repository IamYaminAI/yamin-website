"use client";
import AppButton from "@/components/ui/AppButton";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";

export default function PublicError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <Container className="flex flex-col items-start gap-6 pt-40 pb-24">
      <Eyebrow>Something went wrong</Eyebrow>
      <DisplayHeading as="h1" className="text-[clamp(36px,5vw,72px)] text-ink">
        This page didn&apos;t load.
      </DisplayHeading>
      <p className="m-0 max-w-[520px] text-lg leading-[1.6] text-slate">
        It&apos;s usually temporary. Try again, and if it keeps happening, come
        back in a few minutes.
      </p>
      <AppButton variant="ink" size="lg" onClick={reset}>
        Try again
      </AppButton>
    </Container>
  );
}
