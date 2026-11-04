import { ImageResponse } from "next/og";

export const alt = "Yamin: the marketing that knows itself.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Site-wide social card in the brand palette. */
export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background:
          "radial-gradient(circle at 70% 60%, rgba(201,168,106,0.22) 0%, rgba(11,14,31,0) 55%), #0B0E1F",
        color: "#F5EFE0",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 22,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: "#C9A86A",
        }}
      >
        Yamin · Marketing intelligence
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          fontSize: 96,
          fontWeight: 800,
          lineHeight: 0.95,
          letterSpacing: -4,
        }}
      >
        <span>The marketing</span>
        <span style={{ color: "#C9A86A" }}>that knows itself.</span>
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: "rgba(238,229,210,0.8)",
        }}
      >
        Google Ads · Meta · GA4 · Shopify · Audits · Creatives
      </div>
    </div>,
    size,
  );
}
