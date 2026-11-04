import { cn } from "@/lib/class-names";

type Tile = { color: string; highlightDelay?: number };

const groups: ReadonlyArray<{ label: string; tiles: readonly Tile[] }> = [
  {
    label: "Yours",
    tiles: [
      { color: "bg-ink", highlightDelay: 0 },
      { color: "bg-ink-raised" },
      { color: "bg-stone" },
      { color: "bg-gold", highlightDelay: 3 },
    ],
  },
  {
    label: "Competitors",
    tiles: [
      { color: "bg-stone" },
      { color: "bg-ink", highlightDelay: 1.5 },
      { color: "bg-bronze-muted", highlightDelay: 4.5 },
      { color: "bg-ink-raised" },
    ],
  },
];

export default function CreativeVisual() {
  return (
    <div className="grid grid-cols-2 content-center gap-[18px] rounded-[22px] bg-paper p-6">
      {groups.map(({ label, tiles }) => (
        <div key={label} className="flex flex-col gap-2.5">
          <span className="text-label text-[10px] text-bronze">{label}</span>
          <div className="grid grid-cols-2 gap-2">
            {tiles.map((tile, index) => (
              <span
                key={index}
                className={cn(
                  "aspect-[4/5] rounded-[10px]",
                  tile.color,
                  tile.highlightDelay !== undefined &&
                    "animate-highlight motion-reduce:animate-none",
                )}
                style={
                  tile.highlightDelay
                    ? { animationDelay: `${tile.highlightDelay}s` }
                    : undefined
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
