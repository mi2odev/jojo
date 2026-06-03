import { cx } from '@/lib/utils';

interface Props {
  variant?: 'gold' | 'silver';
  spin?: boolean;
  reverse?: boolean;
  className?: string;
}

/** Radial comic speed-lines. Drop behind a focal element. */
export function SpeedLines({ variant = 'gold', spin = true, reverse = false, className = '' }: Props) {
  return (
    <div
      aria-hidden
      className={cx(
        variant === 'gold' ? 'jojo-speedlines-gold' : 'jojo-speedlines',
        spin && (reverse ? 'animate-speed-spin-rev' : 'animate-speed-spin'),
        className,
      )}
    />
  );
}

export default SpeedLines;
