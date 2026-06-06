import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Lang, RankedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { staggerContainer, staggerItem, slideUp } from '@/anim/variants';
import {
  MetricRadar,
  StandStatBlock,
  ToBeContinued,
} from '@/components/fx';
import { cx, hexA } from '@/lib/utils';
import { ResultReveal } from './ResultReveal';
import { StandProfile } from './StandProfile';
import { CharacterGallery } from './CharacterGallery';
import { ShareCard } from './ShareCard';

interface Props {
  lang: Lang;
  ranking: RankedCharacter[];
  onRestart: () => void;
}

/** A single bordered manga panel for the details grid. */
function Panel({
  title,
  color,
  className,
  children,
}: {
  title: string;
  color: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className={cx(
        'group relative overflow-hidden rounded-2xl border border-jojo-cream/15 bg-jojo-ink/60 p-5',
        'shadow-[0_10px_30px_rgba(0,0,0,0.45)] backdrop-blur-sm',
        'transition-colors duration-300 hover:border-jojo-gold/60',
        className,
      )}
    >
      {/* Soft corner glow on hover (uniform frame, accent only here) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: hexA(color, 0.5) }}
      />
      <h3 className="mb-3 flex items-center gap-2.5 font-display uppercase text-lg tracking-wide text-jojo-cream">
        <span
          aria-hidden
          className="inline-block h-5 w-1.5 shrink-0 rounded-full rtl:order-last"
          style={{ background: color, boxShadow: `0 0 10px ${hexA(color, 0.7)}` }}
        />
        {title}
      </h3>
      <div className="relative text-start text-sm leading-relaxed text-jojo-cream/90">{children}</div>
    </motion.div>
  );
}

export default function ResultScreen({ lang, ranking, onRestart }: Props): React.JSX.Element {
  const ui = getUI(lang);
  const top = ranking[0].character;
  const matchPct = ranking[0].percentage;
  const color = top.color;
  const accent = top.accent;

  const [revealed, setRevealed] = useState(false);

  return (
    <div dir={ui.dir} className="relative z-10 min-h-[100dvh] w-full overflow-x-hidden">
      {/* CINEMATIC REVEAL */}
      <AnimatePresence>
        {!revealed && (
          <ResultReveal key="reveal" lang={lang} character={top} onDone={() => setRevealed(true)} />
        )}
      </AnimatePresence>

      {/* MAIN RESULT (mounts after reveal completes) */}
      {revealed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-12 sm:px-6 sm:py-16"
        >
          {/* HERO PROFILE */}
          <div className="relative z-10">
            <StandProfile lang={lang} character={top} matchPct={matchPct} />
          </div>

          {/* DETAILS GRID */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            <Panel title={ui.personalityOverview} color={color} className="md:col-span-2 lg:col-span-3">
              {top.description}
            </Panel>

            <Panel title={ui.strengths} color="#00C897">
              <ul className="flex flex-wrap gap-2">
                {top.strengths.map((s) => (
                  <li
                    key={s}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-jojo-cream"
                    style={{ background: hexA('#00C897', 0.18), border: '1px solid rgba(0,200,151,0.45)' }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={ui.weaknesses} color="#C1121F">
              <ul className="flex flex-wrap gap-2">
                {top.weaknesses.map((w) => (
                  <li
                    key={w}
                    className="rounded-md px-2.5 py-1 text-xs font-medium text-jojo-cream"
                    style={{ background: hexA('#C1121F', 0.2), border: '1px solid rgba(193,18,31,0.5)' }}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </Panel>

            <Panel title={ui.traits} color={accent}>
              <div className="flex flex-wrap gap-2">
                {top.traits.map((tr) => (
                  <span
                    key={tr}
                    className="rounded-full px-3 py-1 font-stat uppercase tracking-wider text-[11px] text-jojo-cream"
                    style={{ background: hexA(color, 0.16), border: `1px solid ${hexA(color, 0.5)}` }}
                  >
                    #{tr}
                  </span>
                ))}
              </div>
            </Panel>

            <Panel title={ui.leadershipStyle} color={color}>{top.leadershipStyle}</Panel>
            <Panel title={ui.combatStyle} color={color}>{top.combatStyle}</Panel>
            <Panel title={ui.emotionalProfile} color={color}>{top.emotionalProfile}</Panel>
            <Panel title={ui.lifePhilosophy} color={color} className="md:col-span-2 lg:col-span-3">
              <span className="font-editorial italic text-base">“{top.lifePhilosophy}”</span>
            </Panel>
          </motion.section>

          {/* ANALYSIS */}
          <motion.section
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-2"
          >
            <motion.div variants={staggerItem} className="jojo-panel-gold rounded-xl bg-jojo-ink/70 p-6">
              <h3 className="mb-1 text-center font-display uppercase text-xl tracking-[0.15em] jojo-gold-text">{ui.standStats}</h3>
              <div aria-hidden className="mx-auto mb-5 h-px w-16 bg-jojo-gold/40" />
              <StandStatBlock stats={top.stats} labels={ui.statLabels} abbrev={ui.statAbbrev} color={color} lang={lang} />
            </motion.div>

            <motion.div variants={staggerItem} className="jojo-panel-gold rounded-xl bg-jojo-ink/70 p-6">
              <h3 className="mb-1 text-center font-display uppercase text-xl tracking-[0.15em] jojo-gold-text">{ui.personalityRadar}</h3>
              <div aria-hidden className="mx-auto mb-3 h-px w-16 bg-jojo-gold/40" />
              <div className="mx-auto w-full max-w-sm">
                <MetricRadar metrics={top.metrics} abbrev={ui.metricAbbrev} labels={ui.metricLabels} color={color} accent={accent} lang={lang} />
              </div>
            </motion.div>
          </motion.section>

          {/* GALLERY */}
          <div className="relative z-10">
            <CharacterGallery lang={lang} ranking={ranking} />
          </div>

          {/* ACTIONS */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="relative z-10 flex flex-wrap items-center justify-center gap-3"
          >
            <motion.button
              type="button"
              onClick={onRestart}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-jojo-black px-6 py-3 font-display uppercase tracking-wider text-base font-bold text-jojo-black"
              style={{
                background: color,
                boxShadow: `0 3px 0 0 rgba(5,5,5,0.9), 0 0 24px ${hexA(color, 0.55)}`,
                textShadow: '0 1px 0 rgba(255,255,255,0.35)',
              }}
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
                <path d="M4 12a8 8 0 108-8M4 12V6m0 6h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {ui.takeAgain}
            </motion.button>

            <ShareCard lang={lang} character={top} matchPct={matchPct} />
          </motion.div>

          {/* OUTRO */}
          <div className="relative z-10 flex justify-center pb-4">
            <ToBeContinued lang={lang} />
          </div>
        </motion.div>
      )}
    </div>
  );
}
