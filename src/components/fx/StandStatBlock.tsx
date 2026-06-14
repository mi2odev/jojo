import { motion, useReducedMotion } from 'framer-motion';
import type { Lang, StandStatKey, StandStats } from '@/types';
import { GRADE_COLOR, GRADE_VALUE, hexA } from '@/lib/utils';

interface Props {
  stats: StandStats;
  labels: Record<StandStatKey, string>;
  abbrev: Record<StandStatKey, string>;
  color?: string;
  size?: number;
  lang?: Lang;
}

const ORDER: StandStatKey[] = ['power', 'speed', 'range', 'durability', 'precision', 'potential'];

function point(cx: number, cy: number, r: number, value: number, i: number, n: number) {
  const angle = ((-90 + (i * 360) / n) * Math.PI) / 180;
  return { x: cx + r * value * Math.cos(angle), y: cy + r * value * Math.sin(angle) };
}

/** Iconic Stand stat block: an extruded 3D hexagon radar + an embossed A–E grade grid. */
export function StandStatBlock({ stats, labels, abbrev, color = '#FFD700', size = 260, lang = 'en' }: Props) {
  const reduce = useReducedMotion();
  const n = ORDER.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.33;
  const pad = size * 0.18; // room for the axis-label ring (esp. longer Arabic words)
  const font = lang === 'ar' ? 'Tajawal, sans-serif' : 'Saira Condensed, sans-serif';

  const topPts = ORDER.map((k, i) => point(cx, cy, R, GRADE_VALUE[stats[k]] / 6, i, n));
  const topStr = topPts.map((p) => `${p.x},${p.y}`).join(' ');
  const rings = [0.33, 0.66, 1];

  return (
    <div className="w-full">
      <div className="relative mx-auto" style={{ maxWidth: size }}>
        {/* Floor glow */}
        <div aria-hidden className="pointer-events-none absolute inset-x-10 bottom-2 h-5 rounded-[50%] blur-2xl" style={{ background: hexA(color, 0.28) }} />
        <div className="relative">
          <svg viewBox={`${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`} width="100%" aria-hidden style={{ display: 'block', width: '100%', height: 'auto' }}>
            <defs>
              <radialGradient id="ss-top" cx="38%" cy="28%" r="82%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.45)" />
                <stop offset="32%" stopColor={hexA(color, 0.5)} />
                <stop offset="100%" stopColor={hexA(color, 0.14)} />
              </radialGradient>
              <radialGradient id="ss-grid" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stopColor="rgba(11,7,18,0.55)" />
                <stop offset="100%" stopColor="rgba(11,7,18,0)" />
              </radialGradient>
              <filter id="ss-glow" x="-40%" y="-40%" width="180%" height="180%">
                <feGaussianBlur stdDeviation="3" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            <circle cx={cx} cy={cy} r={R * 1.04} fill="url(#ss-grid)" />
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
              return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={hexA('#F4ECD6', 0.1)} strokeWidth={1} />;
            })}

            {/* Flat data area */}
            <motion.g
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={reduce ? { duration: 0 } : { duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <polygon points={topStr} fill="url(#ss-top)" stroke={color} strokeWidth={2.5} strokeLinejoin="round" filter="url(#ss-glow)" />
            </motion.g>

            {/* Glowing nodes */}
            {topPts.map((p, i) => (
              <circle key={`h${i}`} cx={p.x} cy={p.y} r={5} fill={color} opacity={0.35} filter="url(#ss-glow)" />
            ))}
            {topPts.map((p, i) => (
              <circle key={`v${i}`} cx={p.x} cy={p.y} r={2.6} fill="#FFFFFF" stroke={color} strokeWidth={1.4} />
            ))}

            {ORDER.map((k, i) => {
              const p = point(cx, cy, R * 1.22, 1, i, n);
              const anchor = Math.abs(p.x - cx) < 6 ? 'middle' : p.x > cx ? 'start' : 'end';
              return (
                <text key={k} x={p.x} y={p.y} dy="0.32em" textAnchor={anchor} fill={hexA('#F4ECD6', 0.8)}
                  style={{ fontFamily: font, fontWeight: 700, fontSize: size * 0.046, letterSpacing: '0.06em', paintOrder: 'stroke', stroke: 'rgba(5,5,5,0.85)', strokeWidth: 3 }}>
                  {abbrev[k]}
                </text>
              );
            })}
          </svg>
        </div>
      </div>

      {/* A–E grade grid — embossed 3D chips */}
      <div className="mt-6 grid grid-cols-3 gap-2.5">
        {ORDER.map((k) => {
          const g = GRADE_COLOR[stats[k]];
          return (
            <div
              key={k}
              className="relative flex flex-col items-center justify-center gap-0.5 overflow-hidden rounded-lg border-2 py-2.5"
              style={{
                borderColor: hexA(g, 0.5),
                background: 'linear-gradient(180deg, rgba(36,20,69,0.85), rgba(5,5,5,0.92))',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -6px 14px rgba(0,0,0,0.55), 0 5px 12px rgba(0,0,0,0.5), 0 0 16px ${hexA(g, 0.28)}`,
              }}
            >
              <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-1/2" style={{ background: `linear-gradient(180deg, ${hexA(g, 0.14)}, transparent)` }} />
              <span className="relative font-stat text-[10px] uppercase tracking-[0.18em] text-jojo-cream/50">{abbrev[k]}</span>
              <span className="relative font-display text-3xl leading-none" style={{ color: g, textShadow: `0 0 14px ${hexA(g, 0.7)}, 0 2px 0 rgba(5,5,5,0.6)` }}>
                {stats[k]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default StandStatBlock;
