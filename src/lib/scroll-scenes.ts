/**
 * Scroll-driven scene engine. Each `[data-scene]` element inside the root gets
 * a `--p` custom property (0 → 1) that CSS turns into motion with calc(), so
 * React never re-renders on scroll.
 *
 * - `data-scene="pin"`: progress while a tall section scrolls past its sticky stage.
 * - `data-scene="view"`: progress from entering to leaving the viewport.
 * - `data-scene-rest`: the resting value used on very tall screens and before hydration.
 * - `[data-scene-track]` children receive `--dist`, their overflow width, for horizontal travel.
 */

export type SceneKind = "pin" | "view";

/** Above this viewport height the page shows each scene at rest instead of animating. */
const STILL_VIEWPORT_HEIGHT = 1300;
const STILL_STAGE_HEIGHT = 900;
const MIN_STAGE_HEIGHT = 560;
const TRACK_MIN_WIDTH = 900;
const SCROLL_EASE = 0.14;
const POINTER_EASE = 0.06;

export function getSceneProgress(
  kind: SceneKind,
  rect: { top: number; height: number },
  viewportHeight: number,
): number {
  const raw =
    kind === "pin"
      ? -rect.top / Math.max(1, rect.height - viewportHeight)
      : (viewportHeight - rect.top) / (viewportHeight + rect.height);
  return Math.min(1, Math.max(0, raw));
}

export function getStageHeight(innerHeight: number): number {
  return innerHeight > STILL_VIEWPORT_HEIGHT
    ? STILL_STAGE_HEIGHT
    : Math.max(MIN_STAGE_HEIGHT, innerHeight);
}

type SceneState = { el: HTMLElement; progress?: number; distance?: number };

export function startSceneLoop(
  root: HTMLElement,
  { reduceMotion }: { reduceMotion: boolean },
): () => void {
  const scenes: SceneState[] = Array.from(
    root.querySelectorAll<HTMLElement>("[data-scene]"),
    (el) => ({ el }),
  );
  const pointerTarget = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0 };
  let stageHeight = 0;
  let frameId = 0;

  const handlePointerMove = (event: PointerEvent) => {
    pointerTarget.x = (event.clientX / Math.max(1, window.innerWidth)) * 2 - 1;
    pointerTarget.y = (event.clientY / Math.max(1, window.innerHeight)) * 2 - 1;
  };

  const frame = () => {
    frameId = window.requestAnimationFrame(frame);
    const isStill = window.innerHeight > STILL_VIEWPORT_HEIGHT;
    const nextStageHeight = getStageHeight(window.innerHeight);
    if (nextStageHeight !== stageHeight) {
      stageHeight = nextStageHeight;
      root.style.setProperty("--vh", `${stageHeight}px`);
    }

    const ease = reduceMotion ? 1 : SCROLL_EASE;
    for (const scene of scenes) {
      const target = isStill
        ? Number(scene.el.dataset.sceneRest ?? 0)
        : getSceneProgress(
            scene.el.dataset.scene === "pin" ? "pin" : "view",
            scene.el.getBoundingClientRect(),
            stageHeight,
          );
      let current = scene.progress ?? target;
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.0004) current = target;
      if (current !== scene.progress) {
        scene.progress = current;
        scene.el.style.setProperty("--p", current.toFixed(4));
      }

      const track = scene.el.querySelector<HTMLElement>("[data-scene-track]");
      if (track) {
        const distance =
          window.innerWidth > TRACK_MIN_WIDTH
            ? Math.max(0, track.offsetWidth - window.innerWidth)
            : 0;
        if (distance !== scene.distance) {
          scene.distance = distance;
          scene.el.style.setProperty("--dist", `${distance}px`);
        }
      }
    }

    if (!reduceMotion && !isStill) {
      pointer.x += (pointerTarget.x - pointer.x) * POINTER_EASE;
      pointer.y += (pointerTarget.y - pointer.y) * POINTER_EASE;
      root.style.setProperty("--mx", pointer.x.toFixed(3));
      root.style.setProperty("--my", pointer.y.toFixed(3));
    }
  };

  if (!reduceMotion) {
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
  }
  frameId = window.requestAnimationFrame(frame);

  return () => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("pointermove", handlePointerMove);
  };
}
