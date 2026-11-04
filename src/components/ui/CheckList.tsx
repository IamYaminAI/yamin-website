import Icon from "@/components/ui/Icon";
import { cn } from "@/lib/class-names";

const tones = {
  gold: "stroke-gold",
  deep: "stroke-gold-deep",
} as const;

/** List of included features, each with a check mark. */
export default function CheckList({
  items,
  tone = "deep",
  className,
}: {
  items: readonly string[];
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <ul className={cn("m-0 flex list-none flex-col gap-3.5 p-0", className)}>
      {items.map((item) => (
        <li
          key={item}
          className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 text-base leading-[1.45]"
        >
          <Icon name="check" size={20} className={tones[tone]} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
