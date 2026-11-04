import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import { problemCards, type ProblemCard } from "../_lib/content";

const cardTones: Record<
  ProblemCard["tone"],
  { card: string; source: string; title: string; caption: string }
> = {
  white: {
    card: "bg-white border border-line shadow-[0_20px_50px_rgb(18_22_44/0.08)]",
    source: "text-bronze",
    title: "text-ink",
    caption: "text-muted",
  },
  ink: {
    card: "bg-ink shadow-[0_20px_50px_rgb(18_22_44/0.2)]",
    source: "text-gold",
    title: "text-ivory",
    caption: "text-cream/75",
  },
  gold: {
    card: "bg-gold shadow-[0_20px_50px_rgb(18_22_44/0.12)]",
    source: "text-ink",
    title: "text-ink",
    caption: "text-ink/80",
  },
};

/** Scene 2: four scattered data sources converge into one grid. */
export default function ProblemSection() {
  return (
    <Section
      tone="paper"
      scene={{ kind: "pin", rest: 1 }}
      aria-labelledby="problem-heading"
      className="relative"
      style={{ height: "calc(var(--vh) * 2.6)" }}
    >
      <div className="scene-pin bg-dots-ink [--c:clamp(0,calc((var(--p)-0.04)/0.46),1)] [--ce:calc(var(--c)*(2-var(--c)))] [--r:clamp(0,calc((var(--p)-0.5)/0.18),1)] [--e:clamp(0,calc((var(--p)-0.72)/0.18),1)]">
        <Container className="grid h-full content-center items-center gap-7 tablet:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] tablet:gap-14">
          <div className="flex flex-col gap-7">
            <Eyebrow>The problem</Eyebrow>
            <DisplayHeading
              id="problem-heading"
              className="text-[clamp(40px,5.6vw,92px)] text-ink"
            >
              Your data isn&apos;t the problem.{" "}
              <Accent className="translate-y-[calc((1-var(--r))*50px)] opacity-(--r) blur-[calc((1-var(--r))*10px)] motion-reduce:blur-none mt-3 block">
                The time it takes to read it is.
              </Accent>
            </DisplayHeading>
            <p className="translate-y-[calc((1-var(--e))*24px)] opacity-(--e) m-0 max-w-[460px] text-[19px] leading-[1.55] text-slate">
              By the time someone connects them, the budget has already been
              spent.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="size-[min(420px,88vw)] tablet:size-[min(540px,40vw)] relative">
              <div
                aria-hidden="true"
                className="scale-[calc(0.7+0.3*var(--e))] opacity-(--e) absolute -inset-[22px] rounded-[34px] border-[1.5px] border-dashed border-gold"
              />
              <ul className="absolute inset-0 m-0 list-none p-0">
                {problemCards.map((card, index) => {
                  const tone = cardTones[card.tone];
                  return (
                    <li
                      key={card.source}
                      className={cn(
                        "[transform:translate(calc(var(--dx)*(1-var(--ce))),calc(var(--dy)*(1-var(--ce))))_rotate(calc(var(--rot)*(1-var(--ce))))]",
                        index % 2 === 0 ? "left-0" : "right-0",
                        index < 2 ? "top-0" : "bottom-0",
                        "absolute flex size-[48.5%] flex-col justify-between rounded-[22px] p-[22px]",
                        tone.card,
                      )}
                      style={{
                        "--dx": `${card.scatter.x}px`,
                        "--dy": `${card.scatter.y}px`,
                        "--rot": `${card.scatter.rotate}deg`,
                      }}
                    >
                      <span
                        className={cn("text-label text-[11px]", tone.source)}
                      >
                        {card.source}
                      </span>
                      <span>
                        <span
                          className={cn(
                            "text-display block",
                            card.title.length > 12
                              ? "text-[clamp(22px,2.1vw,34px)]"
                              : "text-[clamp(26px,2.6vw,42px)]",
                            tone.title,
                          )}
                        >
                          {card.title}
                        </span>
                        <span className={cn("text-[15px]", tone.caption)}>
                          sits here.
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
