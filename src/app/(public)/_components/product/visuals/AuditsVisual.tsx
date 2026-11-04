import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/class-names";

const checks = [
  { label: "Mobile checkout", isRunning: false },
  { label: "Page speed", isRunning: false },
  { label: "Tracking tags", isRunning: true },
  { label: "Account structure", isRunning: false },
] as const;

export default function AuditsVisual() {
  return (
    <div className="relative flex flex-col justify-center gap-3 overflow-hidden rounded-[22px] bg-ink p-[26px]">
      <div className="absolute inset-x-0 top-0 h-[22%] animate-scan border-b border-gold/60 bg-[linear-gradient(180deg,rgb(201_168_106/0)_0%,rgb(201_168_106/0.16)_100%)] motion-reduce:animate-none" />
      {checks.map(({ label, isRunning }) => (
        <div
          key={label}
          className={cn(
            "flex items-center justify-between rounded-xl px-[18px] py-4 text-base text-ivory",
            isRunning ? "bg-gold/14" : "bg-cream/6",
          )}
        >
          {label}
          {isRunning ? (
            <span className="animate-blink motion-reduce:animate-none size-2.5 rounded-full bg-gold-light" />
          ) : (
            <Icon name="check" size={20} className="stroke-gold" />
          )}
        </div>
      ))}
    </div>
  );
}
