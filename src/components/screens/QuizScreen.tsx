import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { CharacterKey, Lang, Question } from '@/types';
import { getUI } from '@/data/i18n';
import { arcForQuestion, arcs } from '@/data/arcs';
import { cx, hexA } from '@/lib/utils';
import { mangaPanel, staggerContainer } from '@/anim/variants';
import { SpeedLines, MenacingText, JoestarStar } from '@/components/fx';
import { DestinyPath } from './DestinyPath';
import { AnswerCard } from './AnswerCard';

interface Props {
  lang: Lang;
  question: Question;
  questionNumber: number;
  total: number;
  canGoBack: boolean;
  onAnswer: (scores: Partial<Record<CharacterKey, number>>) => void;
  onBack: () => void;
}

// A small palette to give each answer card its own neon identity.
const CARD_THEME: ReadonlyArray<{ color: string; accent: string }> = [
  { color: '#FFD700', accent: '#FF008C' }, // gold / magenta
  { color: '#00F5FF', accent: '#7C4DFF' }, // cyan / violet
  { color: '#FF2D95', accent: '#FFD700' }, // pink / gold
  { color: '#00C897', accent: '#00F5FF' }, // emerald / cyan
  { color: '#7C4DFF', accent: '#FF2D95' }, // violet / pink
  { color: '#FF9F1C', accent: '#FFD700' }, // amber / gold
];

/**
 * The Quiz confrontation screen. A Destiny-Path progress header, a cinematic
 * manga-panel question card that swaps via AnimatePresence, and a responsive
 * grid of collectible Stand answer cards. Fully bilingual (EN/AR, RTL-aware).
 */
export function QuizScreen({
  lang,
  question,
  questionNumber,
  total,
  canGoBack,
  onAnswer,
  onBack,
}: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();

  const activeArcIndex = arcForQuestion(questionNumber, total);
  const activeArc = arcs[activeArcIndex];
  // 1 column on phones, 2 columns when there are enough answers and room.
  const twoCol = question.answers.length > 1;

  return (
    <main
      dir={ui.dir}
      className="relative z-10 flex min-h-[100dvh] flex-col pb-24"
    >
      {/* ===== Destiny Path progress (top) ===== */}
      <DestinyPath lang={lang} questionNumber={questionNumber} total={total} />

      {/* ===== Body ===== */}
      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 pt-6 sm:pt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.section
            key={questionNumber}
            variants={mangaPanel}
            initial="hidden"
            animate="show"
            exit="exit"
            style={{ perspective: 1000 }}
            className="flex flex-1 flex-col"
          >
            {/* ----- Question card ----- */}
            <div className="relative overflow-hidden rounded-3xl jojo-panel-gold jojo-halftone-gold px-5 py-6 sm:px-8 sm:py-8">
              {/* Speed-line flourish behind the prompt */}
              <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-30">
                <SpeedLines variant="gold" spin={!reduce} className="absolute inset-0" />
              </div>

              {/* ゴ-framed QUESTION n badge */}
              <div
                className={cx(
                  'mb-4 flex items-center gap-3',
                  ui.dir === 'rtl' && 'flex-row-reverse',
                )}
              >
                <MenacingText count={3} size="1.1rem" className="text-jojo-gold/80" />
                <span
                  className="inline-flex items-center gap-2 rounded-full border-2 border-jojo-black bg-jojo-black/70 px-3 py-1 font-stat text-xs font-bold uppercase tracking-[0.2em] text-jojo-gold shadow-manga-sm"
                  style={{ boxShadow: `0 0 18px ${hexA(activeArc.color, 0.45)}` }}
                >
                  <JoestarStar size={13} />
                  {ui.questionUpper} {questionNumber}
                </span>
                <MenacingText count={3} size="1.1rem" className="text-jojo-gold/80" />
              </div>

              {/* Prompt */}
              <h1 className="text-balance font-display text-2xl leading-tight jojo-stroke-gold text-jojo-cream text-start sm:text-3xl md:text-[2.1rem]">
                {question.prompt}
              </h1>

              {/* Accent rule */}
              <div
                aria-hidden
                className="mt-4 h-[3px] w-24 rounded-full"
                style={{ background: `linear-gradient(90deg, ${activeArc.color}, transparent)` }}
              />
            </div>

            {/* ----- Answer cards ----- */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className={cx(
                'mt-5 grid gap-3 sm:mt-6 sm:gap-4',
                twoCol ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1',
              )}
            >
              {question.answers.map((answer, i) => {
                const theme = CARD_THEME[i % CARD_THEME.length];
                return (
                  <AnswerCard
                    key={`${questionNumber}-${i}`}
                    answer={answer}
                    index={i}
                    lang={lang}
                    color={theme.color}
                    accent={theme.accent}
                    onSelect={onAnswer}
                  />
                );
              })}
            </motion.div>
          </motion.section>
        </AnimatePresence>

        {/* ===== Back control ===== */}
        <div className={cx('mt-7 flex sm:mt-8', ui.dir === 'rtl' ? 'justify-end' : 'justify-start')}>
          <button
            type="button"
            onClick={onBack}
            disabled={!canGoBack}
            aria-label={ui.back}
            className={cx(
              'group inline-flex items-center gap-2 rounded-full border-2 px-5 py-2.5',
              'jojo-glass font-stat text-sm font-bold uppercase tracking-[0.18em] text-jojo-cream',
              'border-jojo-cream/30 transition-all duration-200',
              'hover:border-jojo-gold hover:text-jojo-gold',
              'focus:outline-none focus-visible:ring-4 focus-visible:ring-jojo-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-jojo-black',
              'disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-jojo-cream/30 disabled:hover:text-jojo-cream',
            )}
          >
            <span
              aria-hidden
              className="font-display text-base transition-transform duration-200 group-enabled:group-hover:-translate-x-0.5 rtl:rotate-180 rtl:group-enabled:group-hover:translate-x-0.5"
            >
              ◀
            </span>
            {ui.back}
          </button>
        </div>
      </div>
    </main>
  );
}

export default QuizScreen;
