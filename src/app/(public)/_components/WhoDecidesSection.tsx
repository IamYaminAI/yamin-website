import { Fragment } from "react";
import Reveal from "@/components/motion/Reveal";
import Container from "@/components/ui/Container";
import DisplayHeading from "@/components/ui/DisplayHeading";
import Eyebrow from "@/components/ui/Eyebrow";
import Icon from "@/components/ui/Icon";
import Logo from "@/components/ui/Logo";
import Section from "@/components/ui/Section";
import { cn } from "@/lib/class-names";
import { teamDoes, yaminDoes } from "../_lib/content";

const yaminWords = ["Yamin", "decides", "what", "needs", "changing."];
const teamWords = ["You", "decide", "whether", "to", "change", "it."];

/** Words light up in reading order as the section scrolls through. */
export default function WhoDecidesSection() {
  return (
    <Section
      tone="white"
      scene={{ kind: "view", rest: 0.6 }}
      aria-labelledby="who-heading"
    >
      <Container className="flex flex-col gap-14 py-24 tablet:pt-[170px] tablet:pb-[150px]">
        <Eyebrow>Who decides what</Eyebrow>
        <DisplayHeading
          id="who-heading"
          className="text-[clamp(44px,6.6vw,112px)] text-ink"
        >
          {[...yaminWords, ...teamWords].map((word, index) => (
            <Fragment key={index}>
              <span
                className={cn(
                  "inline-block opacity-[clamp(0.14,calc((var(--p)*1.7-0.2)*16-var(--i)),1)] transition-opacity duration-100",
                  index >= yaminWords.length && "text-accent-serif text-bronze",
                )}
                style={{ "--i": index }}
              >
                {word}
              </span>{" "}
            </Fragment>
          ))}
        </DisplayHeading>
        <Reveal delay={0.3}>
          <p className="m-0 max-w-[560px] text-[19px] leading-[1.6] text-slate">
            It audits, attributes, flags and recommends. Budget shifts and
            launches stay with your team.
          </p>
        </Reveal>
        <Reveal
          delay={0.34}
          className="grid items-center tablet:grid-cols-[minmax(0,1fr)_140px_minmax(0,1fr)]"
        >
          <div className="flex flex-col gap-[18px] rounded-3xl border border-line p-[30px]">
            <Logo background="light" size="sm" className="self-start" />
            <ul className="m-0 grid list-none grid-cols-2 gap-2.5 p-0">
              {yaminDoes.map((task) => (
                <li
                  key={task}
                  className="rounded-xl bg-paper p-4 text-base text-ink"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="flex flex-col items-center gap-2 py-[18px]"
            aria-hidden="true"
          >
            <span className="text-label text-[10px] text-bronze">Hand-off</span>
            <Icon
              name="arrow-long"
              strokeWidth={1.6}
              className="stroke-gold max-tablet:rotate-90"
            />
          </div>
          <div className="flex flex-col gap-[18px] rounded-3xl bg-ink p-[30px]">
            <span className="text-label text-[11px] text-gold">Your team</span>
            <ul className="m-0 grid list-none grid-cols-3 gap-2.5 p-0">
              {teamDoes.map((task) => (
                <li
                  key={task}
                  className="rounded-xl bg-cream/8 px-3 py-4 text-base text-ivory"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
