import {
  getSceneProgress,
  getStageHeight,
  startSceneLoop,
} from "@/lib/scroll-scenes";

test("pinned scenes progress while their stage is stuck", () => {
  expect(getSceneProgress("pin", { top: 0, height: 3000 }, 1000)).toBe(0);
  expect(getSceneProgress("pin", { top: -1000, height: 3000 }, 1000)).toBe(0.5);
  expect(getSceneProgress("pin", { top: -5000, height: 3000 }, 1000)).toBe(1);
});

test("in-view scenes progress from entering to leaving the viewport", () => {
  expect(getSceneProgress("view", { top: 1000, height: 1000 }, 1000)).toBe(0);
  expect(getSceneProgress("view", { top: 0, height: 1000 }, 1000)).toBe(0.5);
  expect(getSceneProgress("view", { top: -1000, height: 1000 }, 1000)).toBe(1);
});

test("stage height is clamped and fixed on very tall screens", () => {
  expect(getStageHeight(400)).toBe(560);
  expect(getStageHeight(800)).toBe(800);
  expect(getStageHeight(1600)).toBe(900);
});

test("the loop writes scene progress and stops on cleanup", () => {
  let queued: FrameRequestCallback | undefined;
  jest.spyOn(window, "requestAnimationFrame").mockImplementation((callback) => {
    queued = callback;
    return 1;
  });
  const cancel = jest
    .spyOn(window, "cancelAnimationFrame")
    .mockImplementation(() => {});

  const root = document.createElement("div");
  root.innerHTML =
    '<section data-scene="view" data-scene-rest="0.6"></section>';
  const scene = root.querySelector("section")!;
  jest
    .spyOn(scene, "getBoundingClientRect")
    .mockReturnValue({ top: 0, height: 768 } as DOMRect);

  const stop = startSceneLoop(root, { reduceMotion: true });
  queued?.(0);
  expect(root.style.getPropertyValue("--vh")).toBe("768px");
  expect(scene.style.getPropertyValue("--p")).toBe("0.5000");

  stop();
  expect(cancel).toHaveBeenCalled();
  jest.restoreAllMocks();
});
