import AppTag from "@/components/ui/AppTag";

const channels = ["Google Ads", "Meta", "GA4", "Shopify"] as const;

export default function AnalyticsVisual() {
  return (
    <div className="flex flex-col justify-center gap-[22px] rounded-[22px] bg-ink p-[26px]">
      <svg
        width="100%"
        height="180"
        viewBox="0 0 320 180"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0 45H320M0 90H320M0 135H320"
          stroke="rgb(238 229 210 / 0.1)"
          strokeWidth="1"
        />
        <path
          className="animate-draw [stroke-dasharray:700] motion-reduce:animate-none"
          d="M0 150 C40 140 60 120 90 124 S140 96 170 100 S220 52 250 60 S300 26 320 20"
          stroke="var(--color-gold)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          className="animate-draw [stroke-dasharray:700] motion-reduce:animate-none"
          style={{ animationDelay: "0.6s" }}
          d="M0 160 C50 150 80 152 110 140 S170 132 200 120 S270 110 320 96"
          stroke="rgb(238 229 210 / 0.45)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-wrap gap-2">
        {channels.map((channel) => (
          <AppTag key={channel} tone="dark" value={channel} />
        ))}
      </div>
    </div>
  );
}
