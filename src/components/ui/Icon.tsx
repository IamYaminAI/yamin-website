import type { SVGProps } from "react";

/** One cached file holds every UI icon; each use is a lightweight reference. */
const SPRITE_URL = "/icons/sprite.svg";

const icons = {
  "arrow-right": { paint: "stroke", width: 24, height: 24 },
  "arrow-long": { paint: "stroke", width: 44, height: 24 },
  check: { paint: "stroke", width: 24, height: 24 },
  play: { paint: "fill", width: 24, height: 24 },
} as const;

export type IconName = keyof typeof icons;

type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  name: IconName;
  /** Square size in px; use width/height for non-square icons. */
  size?: number;
};

/**
 * Decorative icon from public/icons/sprite.svg. Colour follows `currentColor`
 * (or a `stroke-*` / `fill-*` class) and stroke width follows `strokeWidth`.
 * Always hidden from assistive tech; label the surrounding control instead.
 */
export default function Icon({
  name,
  size,
  width,
  height,
  strokeWidth = 2,
  ...props
}: IconProps) {
  const icon = icons[name];
  const isStroke = icon.paint === "stroke";
  return (
    <svg
      width={width ?? size ?? icon.width}
      height={height ?? size ?? icon.height}
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : "none"}
      strokeWidth={isStroke ? strokeWidth : undefined}
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <use href={`${SPRITE_URL}#${name}`} />
    </svg>
  );
}
