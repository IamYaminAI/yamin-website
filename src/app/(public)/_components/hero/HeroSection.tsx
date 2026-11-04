import Link from "next/link";
import AuditForm from "@/components/forms/AuditForm";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import { heroOrbitLabels } from "../../_lib/content";
import HeroEyeCanvas from "./HeroEyeCanvas";
import HeroInside from "./HeroInside";

function Word({
  children,
  delay,
  className,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-block animate-rise opacity-0 motion-reduce:animate-none motion-reduce:opacity-100",
        className,
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

/** Scene 1: the eye. Scrolling flies through the pupil into the product. */
export default function HeroSection() {
  return (
    <Section
      id="top"
      tone="night"
      scene={{ kind: "pin", rest: 0 }}
      aria-labelledby="hero-heading"
      className="relative"
      style={{ height: "calc(var(--vh) * 3.2)" }}
    >
      <div className="scene-pin [--t:clamp(0,calc((var(--p)-0.06)/0.62),1)] [--h:clamp(0,calc(var(--p)/0.26),1)] [--in:clamp(0,calc((var(--p)-0.56)/0.2),1)] [--ch:clamp(0,calc((var(--p)-0.7)/0.24),1)]">
        <div
          className="absolute -inset-[60px] [transform:translate(calc(var(--mx)*-22px),calc(var(--my)*-22px))_scale(calc(1+var(--t)*0.5))]"
          aria-hidden="true"
        >
          <div className="bg-dots-cream absolute inset-0 [mask-image:radial-gradient(ellipse_62%_52%_at_50%_34%,transparent_0%,transparent_45%,#000_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgb(226_200_142/0.7)_1.3px,transparent_1.3px)] [background-size:30px_30px] [mask-image:radial-gradient(300px_circle_at_calc(50%+var(--mx)*50%)_calc(50%+var(--my)*50%),#000_0%,transparent_100%)]" />
        </div>
        <div
          className="absolute top-[calc(83%-33%*var(--t))] left-1/2 -mt-[310px] -ml-[310px] size-[620px] animate-breathe rounded-full bg-[radial-gradient(circle,rgb(201_168_106/0.1)_0%,rgb(201_168_106/0.025)_36%,rgb(11_14_31/0)_60%)] motion-reduce:animate-none tablet:top-[calc(58%-8%*var(--t))] tablet:-mt-[550px] tablet:-ml-[550px] tablet:size-[1100px]"
          aria-hidden="true"
        />
        <HeroEyeCanvas labels={heroOrbitLabels} />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(180deg,rgb(11_14_31/0)_0%,rgb(11_14_31/0.8)_100%)] [mask-image:radial-gradient(ellipse_160px_140%_at_50%_100%,transparent_55%,#000_100%)] opacity-[calc(1-var(--t)*4)]"
          aria-hidden="true"
        />

        <div
          className="absolute inset-x-[22px] top-24 flex flex-col items-center text-center tablet:inset-x-auto tablet:top-[max(100px,calc(var(--vh)*0.12))] tablet:left-1/2 tablet:w-[min(940px,calc(100%-96px))] tablet:-translate-x-1/2 before:pointer-events-none before:absolute before:-inset-x-[6%] before:-top-[10%] before:-bottom-[6%] before:-z-1 before:bg-[radial-gradient(ellipse_50%_50%_at_50%_46%,rgb(11_14_31/0.6)_0%,rgb(11_14_31/0.32)_60%,rgb(11_14_31/0)_100%)] before:opacity-[calc(1-var(--h))] before:content-['']"
          data-hero-copy=""
        >
          <div className="translate-y-[calc(var(--h)*40px)] opacity-[calc(1-var(--h)*1.6)]">
            <div
              className="animate-pop opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: "0.3s" }}
            >
              <Eyebrow
                tone="gold"
                hasTrailingLine
                className="max-tablet:text-[10.5px] max-tablet:tracking-[0.14em] max-xs:before:hidden max-xs:after:hidden"
              >
                Marketing intelligence, from within
              </Eyebrow>
            </div>
          </div>
          <DisplayHeading
            as="h1"
            id="hero-heading"
            className="pointer-events-none mt-[22px] text-[clamp(38px,10.6vw,72px)] leading-[0.9]! whitespace-nowrap text-ivory tablet:text-[min(6.4vw,calc(var(--vh)*0.1),104px)]"
          >
            <span className="block translate-x-[calc(var(--h)*-60vw+var(--mx)*-14px)] opacity-[calc(1-var(--h)*1.15)]">
              <Word delay={0.5}>The</Word> <Word delay={0.62}>marketing</Word>
            </span>{" "}
            <span className="block translate-x-[calc(var(--h)*60vw+var(--mx)*14px)] opacity-[calc(1-var(--h)*1.15)]">
              <Word delay={0.78}>that</Word>{" "}
              <Word
                delay={0.92}
                className="text-accent-serif text-[1.08em] tracking-[-0.02em]! text-gold"
              >
                knows itself.
              </Word>
            </span>
          </DisplayHeading>
          <div className="translate-y-[calc(var(--h)*40px)] opacity-[calc(1-var(--h)*1.6)] flex w-full flex-col items-center">
            <p
              className="mt-[26px] mb-0 max-w-[540px] text-[17px] leading-[1.55] text-cream/86 tablet:text-[19px] [@media(max-width:899.98px)_and_(max-height:760px)]:hidden animate-pop opacity-0 motion-reduce:animate-none motion-reduce:opacity-100"
              style={{ animationDelay: "1.3s" }}
            >
              Every channel, audit and creative in one place. Yamin tells you
              what changed, why, and what to decide.
            </p>
          </div>
        </div>

        <div
          className="absolute inset-x-0 bottom-[max(28px,calc(var(--vh)*0.05))] z-2 mx-auto flex w-[min(580px,calc(100%-44px))] flex-col items-center"
          data-hero-cta=""
        >
          <div className="translate-y-[calc(var(--h)*40px)] opacity-[calc(1-var(--h)*1.6)] w-full">
            <div
              className="animate-pop opacity-0 motion-reduce:animate-none motion-reduce:opacity-100 flex w-full flex-col items-center gap-3.5"
              style={{ animationDelay: "1.45s" }}
            >
              <AuditForm variant="pill" />
              <p className="m-0 flex flex-wrap items-center justify-center gap-x-3.5 gap-y-1.5 text-[13px] text-cream/72">
                <span>Free · UX, mobile site and account checks</span>
                <span
                  className="max-xs:hidden size-0.75 rounded-full bg-cream/40"
                  aria-hidden="true"
                />
                <Link
                  href="#how"
                  className="text-gold-light underline underline-offset-[3px] hover:text-white"
                >
                  See how it works
                </Link>
              </p>
            </div>
          </div>
        </div>

        <HeroInside />

        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-0.5 bg-cream/8"
        >
          <div className="origin-left scale-x-(--p) h-full bg-gold" />
        </div>
      </div>
    </Section>
  );
}
