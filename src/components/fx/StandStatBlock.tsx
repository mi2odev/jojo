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

/** Iconic Stand stat block: a 6-axis hexagon radar + the A–E grade grid. */
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
        <div className="absolute inset-0 jojo-speedlines-gold animate-speed-spin opacity-40" />
        <svg viewBox={`${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`} width="100%" height="100%" className="relative z-10" aria-hidden>
          {rings.map((lvl, ri) => (
            <polygon
              key={ri}
              points={ORDER.map((_, i) => { const p = point(cx, cy, R, lvl, i, n); return `${p.x},${p.y}`; }).join(' ')}
              fill="none"
              stroke={hexA('#F4ECD6', 0.16)}
              strokeWidth={1}
            />
          ))}
          {ORDER.map((_, i) => {
            const p = point(cx, cy, R, 1, i, n);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={hexA('#F4ECD6', 0.12)} strokeWidth={1} />;
          })}
          <motion.polygon
            points={dataStr}
            fill={hexA(color, 0.4)}
            stroke={color}
            strokeWidth={2.5}
            strokeLinejoin="round"
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {ORDER.map((k, i) => {
            const p = point(cx, cy, R * 1.2, 1, i, n);
            const anchor = Math.abs(p.x - cx) < 6 ? 'middle' : p.x > cx ? 'start' : 'end';
            return (
              <text key={k} x={p.x} y={p.y} dy="0.32em" textAnchor={anchor} fill="#F4ECD6"
                style={{ fontFamily: font, fontWeight: 700, fontSize: size * 0.05 }}>
                {abbrev[k]}
              </text>
            );
          })}
        </svg>
      </div>

      {/* A–E grade grid */}
      <div className="mt-3 grid grid-cols-2 xs:grid-cols-3 gap-2">
        {ORDER.map((k) => (
          <div key={k} className="jojo-panel-gold rounded-md bg-jojo-ink/70 px-2 py-1.5 text-center">
            <div className="font-stat text-[10px] sm:text-[11px] uppercase tracking-wider text-jojo-cream/70 leading-tight break-words">
              {labels[k]}
            </div>
            <div className="font-display text-2xl sm:text-3xl leading-none jojo-stroke" style={{ color: GRADE_COLOR[stats[k]] }}>
              {stats[k]}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StandStatBlock;
