import { useState, useEffect, useRef } from 'react';

/**
 * Animates from 0 to `end` over `duration` ms using requestAnimationFrame.
 */
export function useAnimatedCounter(end: number, duration = 600): number {
  const [display, setDisplay] = useState(0);
  const prevEnd = useRef(end);

  useEffect(() => {
    const startVal = prevEnd.current;
    prevEnd.current = end;
    if (startVal === end) return;

    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startVal + (end - startVal) * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(step);
    }

    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);

  return display;
}
