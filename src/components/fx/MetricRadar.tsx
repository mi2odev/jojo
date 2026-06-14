import { motion, useReducedMotion } from 'framer-motion';
import type { Lang, MetricKey, Metrics } from '@/types';
import { hexA } from '@/lib/utils';

interface Props {
  metrics: Metrics;
  abbrev: Record<MetricKey, string>;
  labels?: Record<MetricKey, string>;
  color?: string;
  accent?: string;
  size?: number;
  lang?: Lang;
}

const ORDER: MetricKey[] = ['determination', 'charisma', 'intelligence', 'creativity', 'confidence', 'loyalty', 'strategy', 'willpower'];

function point(cx: number, cy: number, r: number, value: number, i: number, n: number) {
  const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
  return { x: cx + r * value * Math.cos(angle), y: cy + r * value * Math.sin(angle) };
}

/** Animated 8-axis personality radar rendered as an extruded 3D "Stand-vision" hologram. */
export function MetricRadar({ metrics, abbrev, labels, color = '#FFD700', accent = '#FF008C', size = 300, lang = 'en' }: Props) {
  const reduce = useReducedMotion();
  const n = ORDER.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;
  const pad = size * 0.18; // room for the axis-label ring (esp. longer Arabic words)
  const font = lang === 'ar' ? 'Tajawal, sans-serif' : 'Saira Condensed, sans-serif';

  const topPts = ORDER.map((k, i) => point(cx, cy, R, (metrics[k] ?? 0) / 100, i, n));
  const topStr = topPts.map((p) => `${p.x},${p.y}`).join(' ');
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <>
      <ul className="sr-only">
        {ORDER.map((k) => (
          <li key={k}>{(labels?.[k] ?? abbrev[k])}: {metrics[k]}</li>
        ))}
      </ul>
      <div className="relative">
        {/* Floor glow grounds the chart */}
        <div aria-hidden className="pointer-events-none absolute inset-x-10 bottom-3 h-6 rounded-[50%] blur-2xl" style={{ background: hexA(color, 0.3) }} />
        <div className="relative">
          <svg viewBox={`${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`} width="100%" aria-hidden style={{ display: 'block', width: '100%', height: 'auto' }}>
            <defs>
              <radialGradient id="mr-top" cx="38%" cy="28%" r="82%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
                <stop offset="32%" stopColor={hexA(color, 0.5)} />
                <stop offset="100%" stopColor={hexA(color, 0.12)} />
              </radialGradient>
              <radialGradient id="mr-grid" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="rgba(11,7,18,0.55)" />
                <stop offset="100%" stopColor="rgba(11,7,18,0)" />
              </radialGradient>
              <filter id="mr-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3.2" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* depth-shaded grid backdrop */}
            <circle cx={cx} cy={cy} r={R * 1.04} fill="url(#mr-grid)" />
            {rings.map((lvl, ri) => (
              <polygon
                key={ri}
                points={ORDER.map((_, i) => { const p = point(cx, cy, R, lvl, i, n); return `${p.x},${p.y}`; }).join(' ')}
                fill="none"
                stroke={hexA('#F4ECD6', ri === rings.length - 1 ? 0.22 : 0.12)}
                strokeWidth={1}
              />
            ))}
            {ORDER.map((_, i) => {
              const p = point(cx, cy, R, 1, i, n);
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={hexA('#F4ECD6', 0.12)} strokeWidth={1} />;
            })}

            {/* Flat data area (scales in) */}
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <polygon points={topStr} fill="url(#mr-top)" stroke={color} strokeWidth={2.5} strokeLinejoin="round" filter="url(#mr-glow)" />
            </motion.g>

            {/* Glowing nodes on the top face */}
            {topPts.map((p, i) => (
              <circle key={`h${i}`} cx={p.x} cy={p.y} r={5.5} fill={accent} opacity={0.35} filter="url(#mr-glow)" />
            ))}
            {topPts.map((p, i) => (
              <motion.circle
                key={`v${i}`}
                cx={p.x}
                cy={p.y}
                r={2.8}
                fill="#FFFFFF"
                stroke={accent}
                strokeWidth={1.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            ))}

            {/* labels */}
            {ORDER.map((k, i) => {
              const p = point(cx, cy, R * 1.2, 1, i, n);
              const anchor = Math.abs(p.x - cx) < 6 ? 'middle' : p.x > cx ? 'start' : 'end';
              return (
                <text
                  key={k}
                  x={p.x}
                  y={p.y}
                  dy="0.32em"
                  textAnchor={anchor}
                  fill="#F4ECD6"
                  style={{ fontFamily: font, fontWeight: 700, fontSize: size * 0.042, letterSpacing: '0.04em', paintOrder: 'stroke', stroke: 'rgba(5,5,5,0.85)', strokeWidth: 3 }}
                >
                  {abbrev[k]}
                </text>
              );
            })}
          </svg>
        </div>
      </div>
    </>
  );
}

export default MetricRadar;
