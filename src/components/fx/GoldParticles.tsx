import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import { cx } from '@/lib/utils';

interface Props {
  count?: number;
  color?: string;
  className?: string;
}

interface Particle {
  x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number;
}

/** Build a small pre-blurred radial-gradient glow sprite once (cheap to blit). */
function makeSprite(color: string): HTMLCanvasElement {
  const s = 32;
  const c = document.createElement('canvas');
  c.width = s;
  c.height = s;
  const g = c.getContext('2d');
  if (g) {
    const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    grad.addColorStop(0, color);
    grad.addColorStop(0.4, color);
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, s, s);
  }
  return c;
}

/** Canvas-based drifting golden particle field. Pre-blurred sprite blit — no per-frame shadowBlur. */
export function GoldParticles({ count = 48, color = '#FFD700', className = '' }: Props) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const sprite = makeSprite(color);
    let w = 0;
    let h = 0;
    let raf = 0;

    const spawn = (): Particle => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.6,
      vx: (Math.random() - 0.5) * 0.0003,
      vy: -(Math.random() * 0.0006 + 0.0002),
      a: Math.random() * 0.6 + 0.2,
      tw: Math.random() * Math.PI * 2,
    });
    const particles: Particle[] = Array.from({ length: count }, spawn);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.y += p.vy;
        p.x += p.vx;
        p.tw += 0.05;
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random(); }
        const twinkle = (Math.sin(p.tw) + 1) / 2;
        ctx.globalAlpha = p.a * (0.35 + 0.65 * twinkle);
        const d = p.r * 6; // sprite glow is ~3x the core radius
        ctx.drawImage(sprite, p.x * w - d / 2, p.y * h - d / 2, d, d);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [count, color, reduce]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cx('pointer-events-none', className)}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
}

export default GoldParticles;
