import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Counts a number up from 0 to `target` over `duration` ms once `active`.
 * Respects prefers-reduced-motion (snaps to target).
 */
export function useCountUp(target: number, duration = 1400, active = true): number {
  const [value, setValue] = useState(0);
  const reduce = useReducedMotion();
  const raf = useRef<number | null>(null);

  useEffect(() => {
    if (!active) return;
    if (reduce) { setValue(target); return; }

    let start: number | null = null;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, duration, active, reduce]);

  return value;
}
