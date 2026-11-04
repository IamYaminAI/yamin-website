import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Hanken_Grotesk,
  IBM_Plex_Mono,
  Instrument_Serif,
} from "next/font/google";
import "primeicons/primeicons.css";
import "./globals.css";
import Providers from "@/app/providers";
import { getPublicEnv } from "@/lib/env";
import { getSiteUrl } from "@/lib/site";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  // Optical sizing (opsz 12–96) gives large headlines the tighter display cut.
  axes: ["opsz"],
  variable: "--font-bricolage",
  display: "swap",
});
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

const fontVariables = [bricolage, hanken, instrument, plexMono]
  .map((font) => font.variable)
  .join(" ");

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: getPublicEnv().siteName,
    template: `%s | ${getPublicEnv().siteName}`,
  },
  description:
    "Marketing intelligence that reads every channel, audit and creative in one place.",
  applicationName: getPublicEnv().siteName,
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={fontVariables}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
