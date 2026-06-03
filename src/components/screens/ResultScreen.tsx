import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Lang, RankedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { staggerContainer, staggerItem, slideUp } from '@/anim/variants';
import {
  MetricRadar,
  StandStatBlock,
  ToBeContinued,
  MenacingText,
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
      className={cx('jojo-panel relative overflow-hidden rounded-xl bg-jojo-ink/70 p-4', className)}
      style={{ borderColor: hexA(color, 0.75) }}
    >
      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
      <h3 className="mb-2 font-display uppercase text-lg tracking-wide text-jojo-cream">
        {title}
      </h3>
      <div className="text-start text-sm leading-relaxed text-jojo-cream/90">{children}</div>
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

  const shareText = useMemo(
    () => `${ui.shareTitle}: ${top.name} — ${matchPct}% ${ui.match}!`,
    [ui.shareTitle, ui.match, top.name, matchPct],
  );

  const handleShare = useCallback(async () => {
    const data = { title: ui.shareTitle, text: shareText, url: typeof window !== 'undefined' ? window.location.href : '' };
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* user cancelled or failed — fall through to copy */
      }
    }
    const payload = `${shareText} ${data.url}`.trim();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(payload);
        // eslint-disable-next-line no-alert
        alert(ui.shareCopied);
        return;
      }
    } catch {
      /* clipboard blocked — fall through to prompt */
    }
    // eslint-disable-next-line no-alert
    window.prompt(ui.shareTitle, payload);
  }, [shareText, ui.shareTitle, ui.shareCopied]);

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
            <motion.div variants={staggerItem} className="jojo-panel-gold rounded-xl bg-jojo-ink/70 p-5">
              <div className="mb-3 flex items-center justify-center gap-2">
                <MenacingText count={2} size="0.85rem" />
                <h3 className="font-display uppercase text-2xl tracking-wide jojo-gold-text">{ui.standStats}</h3>
              </div>
              <StandStatBlock stats={top.stats} labels={ui.statLabels} abbrev={ui.statAbbrev} color={color} lang={lang} />
            </motion.div>

            <motion.div variants={staggerItem} className="jojo-panel-gold rounded-xl bg-jojo-ink/70 p-5">
              <div className="mb-3 flex items-center justify-center gap-2">
                <MenacingText count={2} size="0.85rem" />
                <h3 className="font-display uppercase text-2xl tracking-wide jojo-gold-text">{ui.personalityRadar}</h3>
              </div>
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
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display uppercase tracking-wider text-base jojo-stroke text-jojo-black"
              style={{ background: color, boxShadow: `0 0 24px ${hexA(color, 0.55)}` }}
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
                <path d="M4 12a8 8 0 108-8M4 12V6m0 6h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {ui.takeAgain}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleShare}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-stat uppercase tracking-[0.18em] text-sm jojo-glass text-jojo-cream"
              style={{ borderColor: hexA(accent, 0.6), boxShadow: `0 0 20px ${hexA(accent, 0.35)}` }}
            >
              <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
                <path
                  d="M18 8a3 3 0 10-2.83-4M6 12a3 3 0 100 0m12 4a3 3 0 10-2.83 4M8.6 13.5l6.8 3.9M15.4 6.6l-6.8 3.9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {ui.shareResult}
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
