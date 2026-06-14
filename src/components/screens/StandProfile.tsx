import { motion } from 'framer-motion';
import type { Lang, LocalizedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { EnergyCore, StandAura, SpeedLines, MenacingText, JoestarStar, GlitchText } from '@/components/fx';
import { slideUp, staggerContainer, staggerItem } from '@/anim/variants';
import { cx, hexA } from '@/lib/utils';

interface Props {
  lang: Lang;
  character: LocalizedCharacter;
  matchPct: number;
}

interface Badge {
  label: string;
  value: string;
}

/** The hero result panel: framed artwork + identity badges + match EnergyCore + battle cry. */
export function StandProfile({ lang, character, matchPct }: Props) {
  const ui = getUI(lang);
  const color = character.color;
  const accent = character.accent;

  const badges: Badge[] = [
    { label: ui.standLabel, value: character.stand },
    { label: ui.partLabel, value: `${character.part} · ${character.partName}` },
    { label: ui.typeLabel, value: character.standType },
  ];

  return (
    <motion.section
      variants={slideUp}
      initial="hidden"
      animate="show"
      className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
    >
      {/* ARTWORK */}
      <div className="relative mx-auto w-full max-w-md">
        <SpeedLines variant="gold" className="absolute inset-[-12%] opacity-40" />
        <div className="relative">
          <StandAura color={color} rings={3} className="scale-110" />
          <motion.div
            className="relative overflow-hidden rounded-2xl jojo-panel"
            style={{ borderColor: color, boxShadow: `0 0 50px ${hexA(color, 0.45)}` }}
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 jojo-halftone-gold opacity-20" />
            <img
              src={character.image}
              alt={character.name}
              className="relative z-10 aspect-[4/5] w-full object-cover object-top"
              loading="eager"
            />
            <div
              className="pointer-events-none absolute inset-0 z-20"
              style={{ background: `linear-gradient(180deg, transparent 55%, ${hexA('#050505', 0.85)})` }}
            />
            <div className="absolute bottom-3 left-1/2 z-30 -translate-x-1/2">
              <MenacingText count={3} size="1.4rem" className="text-glow-gold" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* IDENTITY */}
      <div className="text-center lg:text-start">
        <div className="flex items-center justify-center gap-2 lg:justify-start">
          <JoestarStar size={18} color={accent} />
          <span className="font-stat uppercase tracking-[0.3em] text-jojo-cream/75 text-xs sm:text-sm">
            {ui.yourCharacterIs}
          </span>
          <JoestarStar size={18} color={accent} />
        </div>

        <h1
          className="mt-2 font-display uppercase jojo-stroke leading-[0.92] text-5xl sm:text-6xl"
          style={{ color }}
        >
          {character.name}
        </h1>
        <p className="mt-1 font-editorial italic text-lg text-jojo-cream/80">{character.title}</p>

        {/* Badge row */}
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="mt-5 flex flex-wrap justify-center gap-2 lg:justify-start"
        >
          {badges.map((b) => (
            <motion.li
              key={b.label}
              variants={staggerItem}
              className="jojo-glass rounded-lg px-3 py-2 text-start"
              style={{ borderColor: hexA(color, 0.5) }}
            >
              <div className="font-stat uppercase tracking-wider text-[10px] text-jojo-cream/60">{b.label}</div>
              <div className="font-display text-sm sm:text-base text-jojo-cream leading-tight">{b.value}</div>
            </motion.li>
          ))}
        </motion.ul>

        {/* Quote */}
        <motion.blockquote
          variants={slideUp}
          className="mt-5 border-s-4 ps-4 text-start font-editorial italic text-jojo-cream/90 text-base sm:text-lg"
          style={{ borderColor: color }}
        >
          “{character.quote}”
        </motion.blockquote>

        {/* Match + battle cry */}
        <div className="mt-7 flex flex-col items-center gap-6 sm:flex-row sm:items-center lg:justify-start">
          <EnergyCore percentage={matchPct} color={color} accent={accent} label={ui.match} size={190} />

          <div className="flex-1">
            <div className="font-stat uppercase tracking-[0.25em] text-xs text-jojo-cream/60">{ui.battleCry}</div>
            <div
              className={cx('mt-1 inline-block w-full rounded-lg px-4 py-3 font-display uppercase jojo-stroke text-xl sm:text-2xl leading-tight')}
              style={{
                color: accent,
                background: hexA(color, 0.14),
                boxShadow: `inset 0 0 0 2px ${hexA(color, 0.6)}, 0 0 24px ${hexA(accent, 0.3)}`,
              }}
            >
              <GlitchText text={character.cry} className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default StandProfile;
