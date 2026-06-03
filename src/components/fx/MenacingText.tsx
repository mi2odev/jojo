import { motion, useReducedMotion } from 'framer-motion';
import { cx } from '@/lib/utils';

interface Props {
  count?: number;
  size?: string;
  className?: string;
}

/** Floating ゴゴゴ "menacing" symbols — the unmistakable JoJo aura. Static under reduced-motion. */
export function MenacingText({ count = 3, size = '1.5rem', className = '' }: Props) {
  const reduce = useReducedMotion();
  return (
    <span aria-hidden className={cx('inline-flex gap-0.5 font-display jojo-menace select-none', className)} style={{ fontSize: size }}>
      {Array.from({ length: count }).map((_, i) =>
        reduce ? (
          <span key={i}>ゴ</span>
        ) : (
          <motion.span
            key={i}
            animate={{ y: [0, -5, 0], opacity: [0.78, 1, 0.78], scale: [1, 1.06, 1] }}
            transition={{ duration: 2 + i * 0.25, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
          >
            ゴ
          </motion.span>
        ),
      )}
    </span>
  );
}

export default MenacingText;
