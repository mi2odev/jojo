import type { Grade } from '@/types';

/** Tiny classnames joiner. */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}

/** Map a Stand stat grade (A–E / INF) to a 0–6 radius value. */
export const GRADE_VALUE: Record<Grade, number> = { A: 5, B: 4, C: 3, D: 2, E: 1, INF: 6 };

/** Signature color per grade. */
export const GRADE_COLOR: Record<Grade, string> = {
  A: '#FFD700', B: '#00C897', C: '#00F5FF', D: '#FF9F1C', E: '#C1121F', INF: '#FF008C',
};

/** Convert #RRGGBB + alpha(0–1) to an rgba() string. */
export function hexA(hex: string, alpha: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Clamp a number into [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
