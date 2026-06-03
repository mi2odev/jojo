import { motion, useReducedMotion } from 'framer-motion';
import { useCountUp } from '@/hooks/useCountUp';
import { hexA, cx, clamp } from '@/lib/utils';
import { SpeedLines } from './SpeedLines';

interface Props {
  percentage: number;
  color?: string;
  accent?: string;
  label?: string;
  size?: number;
  active?: boolean;
  className?: string;
}

/**
 * The "Stand Energy Core" — a glowing orb whose energy liquid rises to the
 * match percentage while the number counts upward. Replaces the plain ring gauge.
 */
export function EnergyCore({
  percentage, color = '#FFD700', accent = '#FF008C', label = 'Match', size = 220, active = true, className = '',
}: Props) {
  const reduce = useReducedMotion();
  const value = useCountUp(percentage, 1600, active);
  const fill = clamp(percentage, 0, 100);

  return (
    <div className={cx('relative', className)} style={{ width: size, height: size }} role="img" aria-label={`${fill}% ${label}`}>
      <SpeedLines variant="gold" className="absolute inset-[-14%] opacity-50" />
      <div
        className="absolute inset-[-10%] rounded-full blur-2xl animate-aura-pulse"
        style={{ background: `radial-gradient(circle, ${hexA(color, 0.5)}, transparent 70%)` }}
      />

      {/* Orb */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden border-2"
        style={{
          borderColor: color,
          boxShadow: `0 0 32px ${hexA(color, 0.5)}, inset 0 0 30px ${hexA(accent, 0.3)}`,
          background: 'rgba(5,5,5,0.72)',
        }}
      >
        {/* Rising energy liquid */}
        <motion.div
          className="absolute left-0 bottom-0 w-full"
          style={{ background: `linear-gradient(180deg, ${hexA(accent, 0.85)}, ${hexA(color, 0.92)})` }}
          initial={{ height: 0 }}
          animate={{ height: active ? `${fill}%` : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <svg className="absolute -top-3 left-0 w-[200%] h-6" viewBox="0 0 120 12" preserveAspectRatio="none">
            <motion.path
              d="M0 6 Q 15 0 30 6 T 60 6 T 90 6 T 120 6 V12 H0 Z"
              fill={hexA(color, 0.92)}
              animate={reduce ? {} : { x: ['0%', '-50%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          <div className="absolute inset-0 jojo-halftone opacity-30" />
        </motion.div>

        {/* Gloss highlight */}
        <div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.35), transparent 45%)' }}
        />
      </div>

      {/* Counter */}
      <div aria-hidden className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display jojo-stroke leading-none text-white" style={{ fontSize: size * 0.3 }}>
          {value}
          <span style={{ fontSize: size * 0.14 }}>%</span>
        </span>
        <span className="font-stat uppercase tracking-[0.25em] text-jojo-cream/85" style={{ fontSize: size * 0.062 }}>
          {label}
        </span>
      </div>
    </div>
  );
}

export default EnergyCore;
