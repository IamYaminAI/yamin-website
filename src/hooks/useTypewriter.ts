import { useEffect, useState } from "react";

const TYPE_DELAY = 70;
const DELETE_DELAY = 35;
const HOLD_DELAY = 1800;
const NEXT_PHRASE_DELAY = 400;

/**
 * Types each phrase out, holds it, deletes it, then moves to the next.
 * Pass a stable `phrases` array (e.g. a module constant) to avoid restarts.
 */
export function useTypewriter(
  phrases: readonly string[],
  { enabled = true, startDelay = 1800 } = {},
): string {
  const [text, setText] = useState("");

  useEffect(() => {
    if (!enabled || phrases.length === 0) return;
    let index = 0;
    let length = 0;
    let isDeleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const phrase = phrases[index];
      let wait = TYPE_DELAY;
      if (!isDeleting) {
        length += 1;
        if (length >= phrase.length) {
          isDeleting = true;
          wait = HOLD_DELAY;
        }
      } else {
        length -= 1;
        wait = DELETE_DELAY;
        if (length <= 0) {
          isDeleting = false;
          index = (index + 1) % phrases.length;
          wait = NEXT_PHRASE_DELAY;
        }
      }
      setText(phrase.slice(0, length));
      timer = setTimeout(tick, wait);
    };

    timer = setTimeout(tick, startDelay);
    return () => clearTimeout(timer);
  }, [enabled, phrases, startDelay]);

  return enabled ? text : "";
}
