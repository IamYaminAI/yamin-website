import { act, renderHook } from "@testing-library/react";
import { useTypewriter } from "@/hooks/useTypewriter";

const phrases = ["ab"];

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());

test("types a phrase, holds it, then deletes it", () => {
  const { result } = renderHook(() =>
    useTypewriter(phrases, { startDelay: 100 }),
  );
  expect(result.current).toBe("");
  act(() => jest.advanceTimersByTime(100));
  expect(result.current).toBe("a");
  act(() => jest.advanceTimersByTime(70));
  expect(result.current).toBe("ab");
  act(() => jest.advanceTimersByTime(1800));
  expect(result.current).toBe("a");
});

test("stays empty when disabled", () => {
  const { result } = renderHook(() =>
    useTypewriter(phrases, { enabled: false, startDelay: 0 }),
  );
  act(() => jest.advanceTimersByTime(1000));
  expect(result.current).toBe("");
});
