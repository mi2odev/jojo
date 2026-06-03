import { useEffect } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { Lang, LocalizedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { EASE_DRAMATIC, EASE_OUT } from '@/anim/variants';
import { StandAura, SpeedLines, MenacingText } from '@/components/fx';
import { cx, hexA } from '@/lib/utils';

interface Props {
  lang: Lang;
  character: LocalizedCharacter;
  onDone: () => void;
}

/**
 * The ~2.2s cinematic awakening: black → heartbeat → aura bloom → ink fog →
 * silhouette rises → NAME slams → "Your Stand Awakens". Fully self-contained;
 * fires onDone when the reveal completes (or instantly if reduced motion).
 */
export function ResultReveal({ lang, character, onDone }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const rtl = ui.dir === 'rtl';
  const color = character.color;
  const accent = character.accent;

  useEffect(() => {
    const ms = reduce ? 150 : 2350;
    const id = window.setTimeout(onDone, ms);
    return () => window.clearTimeout(id);
  }, [reduce, onDone]);

  const heartbeat: Variants = {
    hidden: { scale: 0.6, opacity: 0 },
    show: {
      scale: reduce ? 1 : [0.6, 1.12, 0.92, 1.18, 1],
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.9, ease: EASE_OUT, times: reduce ? undefined : [0, 0.25, 0.5, 0.78, 1] },
    },
  };

  const nameSlam: Variants = {
    hidden: { opacity: 0, scale: reduce ? 1 : 1.9, filter: reduce ? 'blur(0px)' : 'blur(12px)', rotate: reduce ? 0 : (rtl ? 4 : -4) },
    show: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      rotate: 0,
      transition: { delay: reduce ? 0 : 1.55, duration: reduce ? 0.2 : 0.55, ease: EASE_DRAMATIC },
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'radial-gradient(circle at 50% 45%, #0c0420 0%, #050505 70%)' }}
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE_OUT } }}
      dir={ui.dir}
      role="status"
      aria-label={ui.yourStandAwakens}
    >
      {/* Ink fog wash */}
      {!reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: `radial-gradient(circle at 50% 55%, ${hexA(accent, 0.22)}, transparent 60%)` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0.5] }}
          transition={{ delay: 0.9, duration: 1, ease: EASE_OUT }}
        />
      )}

      {/* Aura bloom + speed lines */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: reduce ? 0.6 : [0, 0.85, 0.6], scale: 1 }}
        transition={{ delay: reduce ? 0 : 0.7, duration: reduce ? 0.2 : 1.1, ease: EASE_OUT }}
      >
        <div className="relative h-full w-full">
          <StandAura color={color} rings={4} />
          <SpeedLines variant="gold" className="absolute inset-0 opacity-40" />
        </div>
      </motion.div>

      {/* Heartbeat core → silhouette/image rises */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        variants={heartbeat}
        initial="hidden"
        animate="show"
      >
        <motion.div
          className="relative h-44 w-44 sm:h-56 sm:w-56 overflow-hidden rounded-full border-4"
          style={{ borderColor: color, boxShadow: `0 0 60px ${hexA(color, 0.6)}` }}
          initial={{ y: reduce ? 0 : 30, opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.85 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: reduce ? 0 : 1.05, duration: reduce ? 0.2 : 0.7, ease: EASE_DRAMATIC }}
        >
          <img src={character.image} alt="" aria-hidden className="h-full w-full object-cover object-top" />
          <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, transparent 40%, ${hexA('#050505', 0.5)})` }} />
        </motion.div>
      </motion.div>

      {/* Name slam */}
      <motion.h2
        className={cx('relative z-10 mt-6 text-center font-display uppercase jojo-stroke leading-[0.9]',
          'text-5xl sm:text-6xl md:text-7xl')}
        style={{ color }}
        variants={nameSlam}
        initial="hidden"
        animate="show"
      >
        {character.name}
      </motion.h2>

      {/* Kicker */}
      <motion.div
        className="relative z-10 mt-4 flex items-center gap-3 font-stat uppercase tracking-[0.3em] text-jojo-cream/85 text-sm sm:text-base"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: reduce ? 0.05 : 2.0, duration: 0.5, ease: EASE_OUT }}
      >
        <MenacingText count={3} size="1rem" />
        <span className="text-glow-gold">{ui.yourStandAwakens}</span>
        <MenacingText count={3} size="1rem" />
      </motion.div>
    </motion.div>
  );
}

export default ResultReveal;
