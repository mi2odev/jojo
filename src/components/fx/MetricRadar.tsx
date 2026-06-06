import { motion } from 'framer-motion';
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

/** Animated 8-axis personality radar (custom SVG, draws on mount). */
export function MetricRadar({ metrics, abbrev, labels, color = '#FFD700', accent = '#FF008C', size = 300, lang = 'en' }: Props) {
  const n = ORDER.length;
  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;
  const pad = size * 0.18; // room for the axis-label ring (esp. longer Arabic words)
  const font = lang === 'ar' ? 'Tajawal, sans-serif' : 'Saira Condensed, sans-serif';

  const dataPts = ORDER.map((k, i) => point(cx, cy, R, (metrics[k] ?? 0) / 100, i, n));
  const dataStr = dataPts.map((p) => `${p.x},${p.y}`).join(' ');
  const rings = [0.25, 0.5, 0.75, 1];

  return (
    <>
      <ul className="sr-only">
        {ORDER.map((k) => (
          <li key={k}>{(labels?.[k] ?? abbrev[k])}: {metrics[k]}</li>
        ))}
      </ul>
    <svg viewBox={`${-pad} ${-pad} ${size + 2 * pad} ${size + 2 * pad}`} width="100%" height="100%" aria-hidden>
      <defs>
        <radialGradient id="radarFill" cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor={hexA(color, 0.4)} />
          <stop offset="100%" stopColor={hexA(color, 0.1)} />
        </radialGradient>
      </defs>
      {/* grid rings */}
      {rings.map((lvl, ri) => (
        <polygon
          key={ri}
          points={ORDER.map((_, i) => { const p = point(cx, cy, R, lvl, i, n); return `${p.x},${p.y}`; }).join(' ')}
          fill="none"
          stroke={hexA('#F4ECD6', 0.14)}
          strokeWidth={1}
        />
      ))}
      {/* axes */}
      {ORDER.map((_, i) => {
        const p = point(cx, cy, R, 1, i, n);
        return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke={hexA('#F4ECD6', 0.12)} strokeWidth={1} />;
      })}
      {/* data polygon (scales in) */}
      <motion.polygon
        points={dataStr}
        fill="url(#radarFill)"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* vertices */}
      {dataPts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={2.8}
          fill={accent}
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
            style={{ fontFamily: font, fontWeight: 700, fontSize: size * 0.042, letterSpacing: '0.04em' }}
          >
            {abbrev[k]}
          </text>
        );
      })}
    </svg>
    </>
  );
}

export default MetricRadar;
