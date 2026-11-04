export type FaqItem = { question: string; answer: string };

/** Native <details> accordion: keyboard and screen-reader support built in. */
export default function FaqAccordion({ items }: { items: readonly FaqItem[] }) {
  return (
    <div className="border-b border-ink/15">
      {items.map(({ question, answer }) => (
        <details key={question} className="group border-t border-ink/14">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[26px] font-display text-[clamp(20px,2vw,26px)] font-semibold tracking-[-0.02em] text-ink focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold [&::-webkit-details-marker]:hidden after:font-sans after:text-[30px] after:font-normal after:text-bronze after:transition-transform after:duration-300 after:content-['+'] group-open:after:rotate-45 motion-reduce:after:transition-none">
            {question}
          </summary>
          <p className="mt-0 mb-[26px] max-w-[720px] text-[17px] leading-[1.6] text-slate">
            {answer}
          </p>
        </details>
      ))}
    </div>
  );
}
