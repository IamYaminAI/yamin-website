import AppSkeleton from "@/components/ui/AppSkeleton";

const answerRows = [
  { label: "What changed", width: 1 },
  { label: "Why", width: 0.8 },
  { label: "Decision", width: 0.6 },
] as const;

export default function AskVisual() {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-[22px] bg-paper p-6">
      <div className="max-w-[86%] self-end rounded-[18px_18px_4px_18px] bg-ink px-[18px] py-3.5 text-base leading-[1.45] text-ivory">
        Why did returning-customer revenue move last week?
      </div>
      <div className="flex gap-1.5 px-1 py-1.5">
        {[0, 0.15, 0.3].map((delay) => (
          <span
            key={delay}
            className="inline-block size-[7px] animate-typing rounded-full bg-gold-deep motion-reduce:animate-none"
            style={{ animationDelay: `${delay}s` }}
          />
        ))}
      </div>
      <div className="flex flex-col gap-2.5 rounded-2xl border border-line bg-white p-[18px]">
        {answerRows.map(({ label, width }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="text-label w-24 text-[10px] text-bronze">
              {label}
            </span>
            <div className="flex-1">
              <AppSkeleton width={`${width * 100}%`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
