"use client";
import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { createEyeField, drawEyeField } from "../../_lib/eye-field";

/** Past this progress the "inside" panel fully covers the canvas. */
const HIDDEN_AFTER_PROGRESS = 0.78;
const SMALL_SCREEN_WIDTH = 760;

function readNumberVar(el: HTMLElement | null, name: string): number {
  return Number.parseFloat(el?.style.getPropertyValue(name) ?? "") || 0;
}

/**
 * Decorative particle eye. Reads scene progress (`--p`) and pointer tilt
 * (`--mx/--my`) written by ScrollScenes, and positions the orbit labels.
 */
export default function HeroEyeCanvas({
  labels,
}: {
  labels: readonly string[];
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const scene = canvas.closest<HTMLElement>("[data-scene]");
    const root = canvas.closest<HTMLElement>("[data-scroll-root]");
    const copy = scene?.querySelector<HTMLElement>("[data-hero-copy]");
    const cta = scene?.querySelector<HTMLElement>("[data-hero-cta]");
    const field = createEyeField(window.innerWidth < SMALL_SCREEN_WIDTH);
    const pointer = { x: -9999, y: -9999 };
    let copyBottom: number | undefined;
    let ctaTop: number | undefined;
    let frameId = 0;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
    };

    const draw = () => {
      frameId = window.requestAnimationFrame(draw);
      const rect = canvas.getBoundingClientRect();
      const progress = readNumberVar(scene, "--p");
      const isOffscreen = rect.bottom < 0 || rect.top > window.innerHeight;
      if (!rect.width || !rect.height || isOffscreen) return;
      if (progress > HIDDEN_AFTER_PROGRESS) return;

      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const pixelWidth = Math.round(rect.width * dpr);
      const pixelHeight = Math.round(rect.height * dpr);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Measure the copy and form only while the hero is at rest, so the eye
      // does not chase the parting headline.
      if (copy && cta && (progress < 0.01 || copyBottom === undefined)) {
        copyBottom = copy.getBoundingClientRect().bottom - rect.top;
        ctaTop = cta.getBoundingClientRect().top - rect.top;
      }

      const placements = drawEyeField(ctx, field, {
        width: rect.width,
        height: rect.height,
        progress,
        reduceMotion,
        now: performance.now(),
        tilt: {
          x: readNumberVar(root, "--mx"),
          y: readNumberVar(root, "--my"),
        },
        pointer: { x: pointer.x - rect.left, y: pointer.y - rect.top },
        copyBottom,
        ctaTop,
      });

      placements.forEach(({ x, y, opacity }, index) => {
        const label = labelRefs.current[index];
        if (!label) return;
        label.style.transform = `translate(${x.toFixed(1)}px,${y.toFixed(1)}px) translate(-50%,-50%)`;
        label.style.opacity = opacity.toFixed(3);
      });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    frameId = window.requestAnimationFrame(draw);
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [reduceMotion]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 block size-full"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {labels.map((label, index) => (
          <div
            key={label}
            ref={(el) => {
              labelRefs.current[index] = el;
            }}
            className="absolute top-0 left-0 opacity-0 will-change-[transform,opacity] max-tablet:hidden"
          >
            <span className="inline-flex items-center gap-2 px-0.5 py-1 font-mono text-[10.5px] font-medium tracking-[0.16em] whitespace-nowrap text-cream/88 uppercase [text-shadow:0_0_10px_var(--color-night),0_0_4px_var(--color-night)] before:size-[5px] before:rounded-full before:bg-gold before:content-['']">
              {label}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
