import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Lang } from '@/types';
import { getUI } from '@/data/i18n';
import { cx } from '@/lib/utils';
import { GoldParticles, MenacingText } from '@/components/fx';
import { EASE_DRAMATIC, EASE_OUT } from '@/anim/variants';

interface Props {
  lang: Lang;
  onComplete: () => void;
}

/** Each flashing manga panel: angle, color, and a halftone tint. */
const PANELS: Array<{ rotate: number; color: string; halftone: string; from: string }> = [
  { rotate: -8, color: '#4B0082', halftone: 'jojo-halftone', from: '-120%' },
  { rotate: 6, color: '#FF008C', halftone: 'jojo-halftone-gold', from: '120%' },
  { rotate: -4, color: '#00F5FF', halftone: 'jojo-halftone', from: '-120%' },
  { rotate: 10, color: '#FFD700', halftone: 'jojo-halftone-gold', from: '120%' },
];

const panelVariants: Variants = {
  hidden: (from: string) => ({ x: from, opacity: 0, skewX: -12 }),
  show: { x: '0%', opacity: 1, skewX: -12, transition: { duration: 0.22, ease: EASE_OUT } },
  exit: (from: string) => ({
    x: from === '-120%' ? '120%' : '-120%',
    opacity: 0,
    transition: { duration: 0.22, ease: 'easeIn' },
  }),
};

/**
 * One-time cinematic load animation. Full-screen black overlay -> rapid angled
 * manga-panel flashes -> ink-splash burst -> logo slam with gold flash + particles
 * -> hold -> fade out -> onComplete(). Skippable; honors reduced-motion.
 */
export default function IntroSequence({ lang, onComplete }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const done = useRef(false);
  // 0=black, 1=panels, 2=ink-splash, 3=logo slam, 4=fade out
  const [phase, setPhase] = useState(0);
  const [visible, setVisible] = useState(true);

  const finish = useRef(() => {
    if (done.current) return;
    done.current = true;
    onComplete();
  }).current;

  useEffect(() => {
    if (reduce) {
      const t = window.setTimeout(finish, 420);
      return () => window.clearTimeout(t);
    }

    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));

    at(120, () => setPhase(1)); // panel flashes begin
    at(900, () => setPhase(2)); // ink splash
    at(1300, () => setPhase(3)); // logo slam + gold flash
    at(2300, () => setPhase(4)); // begin fade out
    at(2620, () => setVisible(false)); // unmount -> onComplete via exit
    at(2950, finish); // backstop: no-op if onExitComplete already fired (done ref guards)

    return () => timers.forEach(window.clearTimeout);
  }, [reduce, finish]);

  return (
    <AnimatePresence onExitComplete={finish}>
      {visible && (
        <motion.div
          dir={ui.dir}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-jojo-black"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase >= 4 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.32, ease: EASE_OUT }}
        >
          {/* Skip — top end corner */}
          <button
            type="button"
            onClick={finish}
            className="absolute top-4 end-4 z-[110] rounded-full border border-jojo-gold/40 bg-jojo-black/60 px-4 py-1.5 font-stat text-xs uppercase tracking-[0.2em] text-jojo-cream/80 backdrop-blur transition hover:border-jojo-gold hover:text-jojo-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-jojo-gold/70"
          >
            {ui.skip}
          </button>

          {/* Phase 1: rapid angled manga-panel flashes */}
          <AnimatePresence>
            {phase === 1 && (
              <div className="absolute inset-0">
                {PANELS.map((p, i) => (
                  <motion.div
                    key={i}
                    custom={p.from}
                    variants={panelVariants}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    transition={{ delay: i * 0.14 }}
                    className={cx('absolute -inset-x-[20%] origin-center', p.halftone)}
                    style={{
                      top: `${i * 24}%`,
                      height: '32%',
                      rotate: `${p.rotate}deg`,
                      background: `linear-gradient(110deg, ${p.color}, #050505 85%)`,
                      boxShadow: '0 0 0 4px #050505, 0 18px 40px rgba(0,0,0,0.6)',
                    }}
                  />
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Phase 2: ink-splash burst */}
          <AnimatePresence>
            {phase === 2 && (
              <motion.div
                key="ink"
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.18 } }}
              >
                <motion.div
                  className="h-[60vmin] w-[60vmin] rounded-full"
                  initial={{ scale: 0.1, opacity: 0 }}
                  animate={{ scale: 2.6, opacity: [0, 1, 0] }}
                  transition={{ duration: 0.5, ease: EASE_DRAMATIC }}
                  style={{
                    background:
                      'radial-gradient(circle, #050505 30%, rgba(75,0,130,0.7) 55%, transparent 72%)',
                    filter: 'blur(2px)',
                  }}
                />
                <MenacingText count={6} size="2.25rem" className="absolute text-jojo-gold" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 3+: logo slam with gold flash + particles */}
          {phase >= 3 && (
            <div className="relative flex flex-col items-center justify-center">
              {/* Gold flash sheet */}
              <motion.div
                className="pointer-events-none absolute inset-0 -m-[40vmax]"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
                style={{
                  background:
                    'radial-gradient(circle, rgba(255,215,0,0.9), transparent 60%)',
                }}
              />
              {/* Drifting gold particles */}
              <div className="pointer-events-none absolute inset-0 -m-[30vmax]">
                <GoldParticles count={40} />
              </div>
              <motion.img
                src="/images/logo.png"
                alt="JoJo's Bizarre Adventure"
                className="relative z-10 w-[68vw] max-w-md drop-shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                initial={{ scale: 2.4, opacity: 0, rotate: -6, filter: 'blur(10px)' }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  filter: 'blur(0px)',
                  transition: { type: 'spring', stiffness: 320, damping: 18 },
                }}
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
