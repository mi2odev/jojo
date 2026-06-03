import { motion, useReducedMotion } from 'framer-motion';
import { hexA } from '@/lib/utils';
import { JoestarStar } from './JoestarStar';
import { MenacingText } from './MenacingText';
import { GoldParticles } from './GoldParticles';

interface Props {
  color?: string;
  accent?: string;
  particles?: boolean;
}

const MENACE = [
  { top: '8%', left: '6%', count: 3, size: '1.6rem' },
  { top: '14%', left: '88%', count: 3, size: '1.6rem' },
  { top: '72%', left: '5%', count: 2, size: '1.3rem' },
  { top: '78%', left: '90%', count: 2, size: '1.3rem' },
];

const STARS = [
  { top: '30%', left: '12%', size: 24, anim: 'animate-float-y' },
  { top: '44%', left: '90%', size: 20, anim: 'animate-float-slowy' },
  { top: '64%', left: '14%', size: 18, anim: 'animate-bob-rotate' },
  { top: '86%', left: '52%', size: 16, anim: 'animate-sway' },
];

/**
 * Persistent, evolving JoJo backdrop: drifting psychedelic blobs, rotating
 * speed-lines, halftone, floating ゴゴゴ + stars, and a gold particle field.
 * Rendered once at the app root; `color`/`accent` animate per screen.
 */
export function MangaBackground({ color = '#FFD700', accent = '#FF008C', particles = true }: Props) {
  const reduce = useReducedMotion();
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none jojo-grain">
      {/* Psychedelic drifting energy blobs (static under reduced-motion) */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[70vmax] h-[70vmax] rounded-full blur-[120px] will-change-transform"
        style={{ background: `radial-gradient(circle, ${hexA(color, 0.42)}, transparent 60%)` }}
        animate={reduce ? undefined : { x: ['0%', '10%', '0%'], y: ['0%', '8%', '0%'], scale: [1, 1.12, 1] }}
        transition={reduce ? undefined : { duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[62vmax] h-[62vmax] rounded-full blur-[120px] will-change-transform"
        style={{ background: `radial-gradient(circle, ${hexA(accent, 0.38)}, transparent 60%)` }}
        animate={reduce ? undefined : { x: ['0%', '-8%', '0%'], y: ['0%', '-10%', '0%'], scale: [1, 1.16, 1] }}
        transition={reduce ? undefined : { duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 left-1/2 w-[40vmax] h-[40vmax] rounded-full blur-[100px] will-change-transform"
        style={{ background: `radial-gradient(circle, ${hexA('#00F5FF', 0.16)}, transparent 60%)` }}
        animate={reduce ? { x: '-50%' } : { x: ['-50%', '-40%', '-60%', '-50%'], y: ['0%', '12%', '-6%', '0%'] }}
        transition={reduce ? undefined : { duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating speed-lines */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130vmax] h-[130vmax] jojo-speedlines animate-speed-spin opacity-[0.5]" />

      {/* Halftone comic texture */}
      <div className="absolute inset-0 jojo-halftone opacity-50" />

      {/* Floating menacing symbols */}
      {MENACE.map((m, i) => (
        <div key={`m${i}`} className="absolute" style={{ top: m.top, left: m.left }}>
          <MenacingText count={m.count} size={m.size} />
        </div>
      ))}

      {/* Drifting Joestar stars */}
      {STARS.map((s, i) => (
        <span key={`s${i}`} className={`absolute ${s.anim}`} style={{ top: s.top, left: s.left, opacity: 0.45 }}>
          <JoestarStar size={s.size} />
        </span>
      ))}

      {/* Gold particle field */}
      {particles && <GoldParticles count={44} color={color} className="absolute inset-0" />}

      {/* Vignette to keep content legible */}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, rgba(5,5,5,0) 55%, rgba(5,5,5,0.78) 100%)' }} />
    </div>
  );
}

export default MangaBackground;
