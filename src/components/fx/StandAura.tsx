import { hexA, cx } from '@/lib/utils';

interface Props {
  color?: string;
  rings?: number;
  className?: string;
}

/** A pulsing Stand aura: soft radial glow + expanding energy rings. Absolutely fills its parent. */
export function StandAura({ color = '#FFD700', rings = 3, className = '' }: Props) {
  return (
    <div aria-hidden className={cx('pointer-events-none absolute inset-0', className)}>
      <div
        className="absolute inset-0 rounded-full blur-2xl animate-aura-pulse"
        style={{ background: `radial-gradient(circle, ${hexA(color, 0.6)}, transparent 70%)` }}
      />
      {Array.from({ length: rings }).map((_, i) => (
        <span
          key={i}
          className="absolute inset-0 rounded-full border-2 animate-pulse-ring"
          style={{ borderColor: hexA(color, 0.5), animationDelay: `${i * 0.85}s` }}
        />
      ))}
    </div>
  );
}

export default StandAura;
