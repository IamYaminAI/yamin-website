import AppSkeleton from "@/components/ui/AppSkeleton";

export default function DecisionsVisual() {
  return (
    <div className="flex flex-col justify-center gap-4 rounded-[22px] bg-ink p-[26px]">
      <div className="flex items-center gap-3">
        <span className="text-label w-[76px] text-[10px] text-gold">
          Changed
        </span>
        <div className="flex-1">
          <AppSkeleton tone="dark" width="100%" />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-label w-[76px] text-[10px] text-gold">Why</span>
        <div className="flex-1">
          <AppSkeleton tone="dark" width="75%" />
        </div>
      </div>
      <div className="mt-2.5 flex gap-2.5">
        <span className="flex h-12 flex-1 items-center justify-center rounded-full bg-gold text-[15px] font-medium text-ink">
          Approve
        </span>
        <span className="flex h-12 flex-1 items-center justify-center rounded-full border border-cream/40 text-[15px] text-cream">
          Dig in
        </span>
      </div>
    </div>
  );
}
