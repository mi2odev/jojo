import { motion } from 'framer-motion';
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

/** Iconic Stand stat block: a clean 6-axis hexagon radar + the A–E grade grid. */
export function StandStatBlock({ stats, labels, abbrev, color = '#FFD700', size = 260, lang = 'en' }: Props) {
  const n = ORDER.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.33;
  const pad = size * 0.18; // room for the axis-label ring (esp. longer Arabic words)
  const font = lang === 'ar' ? 'Tajawal, sans-serif' : 'Saira Condensed, sans-serif';

  const dataPts = ORDER.map((k, i) => point(cx, cy, R, GRADE_VALUE[stats[k]] / 6, i, n));
  const dataStr = dataPts.map((p) => `${p.x},${p.y}`).join(' ');
  const rings = [0.33, 0.66, 1];

  return (
    <div className="w-full">
      <div className="relative mx-auto" style={{ maxWidth: size }}>
        <svg viewBox={`${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`} width="100%" height="100%" aria-hidden>
          <defs>
            <radialGradient id="standFill" cx="50%" cy="50%" r="65%">
              <stop offset="0%" stopColor={hexA(color, 0.45)} />
              <stop offset="100%" stopColor={hexA(color, 0.12)} />
            </radialGradient>
          </defs>
          {rings.map((lvl, ri) => (
            <polygon
              key={ri}
              points={ORDER.map((_, i) => { const p = point(cx, cy, R, lvl, i, n); return `${p.x},${p.y}`; }).join(' ')}
              fill="none"
              stroke={hexA('#F4ECD6', 0.14)}
              strokeWidth={1}
            />
          ))}
          {ORDER.map((_, i) => {
            const p = point(cx, cy, R, 1, i, n);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={hexA('#F4ECD6', 0.1)} strokeWidth={1} />;
          })}
          <motion.polygon
            points={dataStr}
            fill="url(#standFill)"
            stroke={color}
            strokeWidth={2}
            strokeLinejoin="round"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
          {dataPts.map((p, i) => (
            <circle key={`v${i}`} cx={p.x} cy={p.y} r={2.5} fill={color} />
          ))}
          {ORDER.map((k, i) => {
            const p = point(cx, cy, R * 1.22, 1, i, n);
            const anchor = Math.abs(p.x - cx) < 6 ? 'middle' : p.x > cx ? 'start' : 'end';
            return (
              <text key={k} x={p.x} y={p.y} dy="0.32em" textAnchor={anchor} fill={hexA('#F4ECD6', 0.7)}
                style={{ fontFamily: font, fontWeight: 700, fontSize: size * 0.046, letterSpacing: '0.06em' }}>
                {abbrev[k]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* A–E grade grid */}
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {ORDER.map((k) => (
          <div
            key={k}
            className="flex flex-col items-center justify-center gap-0.5 rounded-lg border border-jojo-cream/10 bg-jojo-black/40 py-2.5"
          >
            <span className="font-stat text-[10px] uppercase tracking-[0.18em] text-jojo-cream/45">{abbrev[k]}</span>
            <span className="font-display text-3xl leading-none" style={{ color: GRADE_COLOR[stats[k]] }}>
              {stats[k]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StandStatBlock;
