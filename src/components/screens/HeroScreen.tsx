import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import type { Lang } from '@/types';
import { getUI } from '@/data/i18n';
import { cx } from '@/lib/utils';
import {
  JoestarStar,
  SpeedLines,
  StandAura,
  GlitchText,
  ToBeContinued,
} from '@/components/fx';
import {
  EASE_OUT,
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
} from '@/anim/variants';

interface Props {
  lang: Lang;
  onStart: () => void;
  onToggleLang: () => void;
}

interface Feature {
  title: string;
  desc: string;
  color: string;
}

/** Premium gold-framed glass CTA: floating idle + hover energy burst / light sweep. */
function PremiumCTA({ label, onStart, reduce }: { label: string; onStart: () => void; reduce: boolean }) {
  const idle = reduce
    ? {}
    : { y: [0, -6, 0], transition: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' as const } };

  return (
    <motion.button
      type="button"
      onClick={onStart}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.2 }}
      whileHover={reduce ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="group relative isolate inline-flex items-center justify-center overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-jojo-cyan/50"
    >
      {/* Floating idle wrapper */}
      <motion.span animate={idle} className="relative block">
        {/* Neon glow halo */}
        <span
          aria-hidden
          className="absolute -inset-2 rounded-3xl bg-jojo-gold/40 blur-2xl transition-opacity duration-300 group-hover:bg-jojo-gold/70"
        />
        {/* Gold frame + glass body */}
        <span className="relative block rounded-2xl bg-gradient-to-br from-jojo-gold via-jojo-goldlight to-jojo-gold p-[2px] shadow-neon">
          <span className="jojo-glass relative block overflow-hidden rounded-[14px] bg-jojo-black/70 px-8 py-4 sm:px-12 sm:py-5">
            {/* Energy burst on hover */}
            <span
              aria-hidden
              className="absolute inset-0 origin-center scale-0 rounded-[14px] bg-gradient-to-r from-jojo-magenta/30 via-jojo-gold/40 to-jojo-cyan/30 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100"
            />
            {/* Light sweep */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 -skew-x-12 bg-white/30 blur-md transition-transform duration-700 group-hover:translate-x-[400%]"
            />
            <span className="relative z-10 flex items-center gap-3 font-display text-xl uppercase tracking-[0.12em] text-jojo-gold text-glow-gold sm:text-2xl">
              <JoestarStar size={20} />
              {label}
              <JoestarStar size={20} />
            </span>
          </span>
        </span>
      </motion.span>
    </motion.button>
  );
}

const logoVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: -10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT } },
};

/** The landing hero. Logo + speed-lines/aura, kicker, foil title, subtitle, premium CTA, feature panels, stats. */
export default function HeroScreen({ lang, onStart, onToggleLang }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion() ?? false;

  const features: Feature[] = [
    { title: ui.howItWorks, desc: ui.howItWorksDesc, color: '#FF008C' },
    { title: ui.whatYouGet, desc: ui.whatYouGetDesc, color: '#FFD700' },
    { title: ui.accuracyFocus, desc: ui.accuracyFocusDesc, color: '#00F5FF' },
  ];

  const stats: string[] = [ui.statsQuestions, ui.statsCharacters, ui.statsReplays];

  return (
    <div
      dir={ui.dir}
      className="relative z-10 flex min-h-[100dvh] flex-col overflow-hidden px-4 pb-16 pt-4 sm:px-6"
    >
      {/* ── Top bar (end-aligned) ── */}
      <motion.header
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="flex w-full items-center justify-end gap-2 sm:gap-3"
      >
        <a
          href="https://onepiecemi2o.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="jojo-glass rounded-full px-4 py-2 font-stat text-xs uppercase tracking-widest text-jojo-cream/90 transition hover:text-jojo-cyan hover:shadow-neon-cyan sm:text-sm"
        >
          {ui.onePieceQuiz}
        </a>
        <button
          type="button"
          onClick={onToggleLang}
          aria-label={ui.switchLanguage}
          className="jojo-glass rounded-full px-4 py-2 font-stat text-xs font-bold uppercase tracking-widest text-jojo-gold transition hover:shadow-neon sm:text-sm"
        >
          {lang === 'en' ? 'العربية' : 'English'}
        </button>
      </motion.header>

      {/* ── Hero core ── */}
      <motion.main
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col items-center justify-center gap-6 py-8 text-center sm:gap-8"
      >
        {/* Massive logo with speed-lines + aura */}
        <motion.div
          variants={logoVariants}
          className="relative flex items-center justify-center"
        >
          <SpeedLines
            variant="gold"
            spin={!reduce}
            className="absolute -inset-[40%] opacity-50"
          />
          <div className="absolute inset-0 scale-150">
            <StandAura color="#FFD700" rings={3} />
          </div>
          <img
            src="/images/logo.png"
            alt="JoJo's Bizarre Adventure"
            className="relative z-10 w-[70vw] max-w-sm drop-shadow-[0_8px_28px_rgba(0,0,0,0.6)] sm:max-w-md"
          />
        </motion.div>

        {/* Kicker between two stars */}
        <motion.div
          variants={staggerItem}
          className="flex items-center justify-center gap-3"
        >
          <JoestarStar size={18} className="animate-star-spin" />
          <span className="font-stat text-xs uppercase tracking-[0.35em] text-jojo-gold/90 sm:text-sm">
            {ui.brandKicker}
          </span>
          <JoestarStar size={18} className="animate-star-spin" />
        </motion.div>

        {/* Huge foil title */}
        <motion.h1
          variants={staggerItem}
          className="max-w-4xl font-display text-4xl uppercase leading-[0.95] xs:text-5xl sm:text-6xl lg:text-7xl"
        >
          {reduce ? (
            <span className="jojo-gold-text">{ui.heroTitle}</span>
          ) : (
            <GlitchText text={ui.heroTitle} goldFoil />
          )}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={staggerItem}
          className="max-w-2xl font-ui text-base text-jojo-cream/85 sm:text-lg"
        >
          {ui.heroSubtitle}
        </motion.p>

        {/* Premium CTA + To Be Continued */}
        <motion.div
          variants={staggerItem}
          className="flex flex-col items-center gap-4 pt-2"
        >
          <PremiumCTA label={ui.cta} onStart={onStart} reduce={reduce} />
          <ToBeContinued lang={lang} />
        </motion.div>
      </motion.main>

      {/* ── Feature manga-panels ── */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
      >
        {features.map((f) => (
          <motion.article
            key={f.title}
            variants={staggerItem}
            className="jojo-panel jojo-halftone relative overflow-hidden rounded-xl bg-jojo-ink/70 p-5 text-start sm:p-6"
          >
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: f.color }}
            />
            <h3
              className="mb-2 font-display text-lg uppercase tracking-wide sm:text-xl"
              style={{ color: f.color }}
            >
              {f.title}
            </h3>
            <p className="font-ui text-sm leading-relaxed text-jojo-cream/80">
              {f.desc}
            </p>
          </motion.article>
        ))}
      </motion.section>

      {/* ── Stats row ── */}
      <motion.div
        variants={slideUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto mt-8 flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-6 gap-y-3 sm:gap-x-10"
      >
        {stats.map((s) => (
          <div key={s} className="flex items-center gap-2">
            <JoestarStar size={16} />
            <span className="font-stat text-sm uppercase tracking-[0.2em] text-jojo-cream/90 sm:text-base">
              {s}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
