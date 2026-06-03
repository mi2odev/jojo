import { motion, useReducedMotion } from 'framer-motion';
import type { Lang } from '@/types';
import { getUI, t } from '@/data/i18n';
import { arcs, arcForQuestion } from '@/data/arcs';
import { cx, hexA, clamp } from '@/lib/utils';
import { JoestarStar } from '@/components/fx';

interface Props {
  lang: Lang;
  questionNumber: number;
  total: number;
}

/**
 * Top progress visual: the six JoJo Parts as nodes along a horizontal path.
 * Completed arcs are filled, the active arc glows in its color, and an
 * animated star indicator rides the active node. Reads L->R in both languages.
 */
export function DestinyPath({ lang, questionNumber, total }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();

  const activeIndex = arcForQuestion(questionNumber, total);
  const activeArc = arcs[activeIndex];
  const percent = clamp(Math.round((questionNumber / total) * 100), 0, 100);
  // Fraction of the path "filled" up to (and through) the active node.
  const fillFraction = clamp(questionNumber / total, 0, 1);

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-5 sm:pt-7">
      {/* Header row: label + counter + percent. dir=ltr so it reads consistently. */}
      <div dir="ltr" className="mb-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1.5">
        <div className="flex min-w-0 items-center gap-2">
          <JoestarStar size={16} className={reduce ? undefined : 'animate-star-spin'} />
          <span className="hidden font-stat text-xs font-bold uppercase tracking-[0.18em] text-jojo-gold xs:inline sm:text-sm">
            {ui.destinyPath}
          </span>
        </div>
        <div className="flex min-w-0 items-center gap-3">
          <span className="font-display text-sm tabular-nums text-jojo-cream/90 sm:text-base">
            {ui.questionUpper} {questionNumber} / {total}
          </span>
          <span
            className="rounded-full border border-jojo-gold/40 bg-jojo-black/40 px-2.5 py-0.5 font-stat text-xs font-bold tabular-nums text-jojo-gold"
            style={{ boxShadow: `0 0 12px ${hexA(activeArc.color, 0.4)}` }}
          >
            {percent}%
          </span>
        </div>
      </div>

      {/* The path itself — always L->R. */}
      <div dir="ltr" className="relative px-1">
        {/* Base track */}
        <div className="absolute left-3 right-3 top-[14px] h-[3px] rounded-full bg-jojo-cream/15" aria-hidden />
        {/* Animated fill */}
        <motion.div
          aria-hidden
          className="absolute left-3 top-[14px] h-[3px] origin-left rounded-full"
          style={{
            right: 12,
            background: `linear-gradient(90deg, ${arcs[0].color}, ${activeArc.color})`,
            boxShadow: `0 0 10px ${hexA(activeArc.color, 0.6)}`,
          }}
          initial={false}
          animate={{ scaleX: fillFraction }}
          transition={reduce ? { duration: 0 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Nodes */}
        <ol className="relative flex items-start justify-between">
          {arcs.map((arc, i) => {
            const done = i < activeIndex;
            const active = i === activeIndex;
            const nodeColor = arc.color;
            return (
              <li key={arc.key} className="flex min-w-0 flex-col items-center gap-1.5">
                <span className="relative grid place-items-center">
                  {active && !reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{ boxShadow: `0 0 0 0 ${hexA(nodeColor, 0.6)}` }}
                      animate={{ boxShadow: [`0 0 0 0 ${hexA(nodeColor, 0.5)}`, `0 0 0 10px ${hexA(nodeColor, 0)}`] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
                    />
                  )}
                  <span
                    className={cx(
                      'grid h-[30px] w-[30px] place-items-center rounded-full border-2 transition-colors duration-300',
                      active ? 'border-jojo-black' : 'border-jojo-cream/40',
                    )}
                    style={{
                      background: done || active ? nodeColor : hexA(nodeColor, 0.12),
                      boxShadow: active ? `0 0 16px ${hexA(nodeColor, 0.8)}` : 'none',
                    }}
                  >
                    {active ? (
                      <motion.span
                        animate={reduce ? undefined : { rotate: 360 }}
                        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                      >
                        <JoestarStar size={16} color="#050505" stroke={nodeColor} />
                      </motion.span>
                    ) : done ? (
                      <span aria-hidden className="font-display text-xs text-jojo-black">✓</span>
                    ) : (
                      <span aria-hidden className="font-stat text-[0.7rem] font-bold text-jojo-cream/70">
                        {arc.part}
                      </span>
                    )}
                  </span>
                </span>
                {/* Part label — show short code; full name only on the active node for context. */}
                <span
                  className={cx(
                    'max-w-[3.5rem] truncate text-center font-stat text-[0.6rem] font-bold uppercase leading-tight tracking-wide sm:max-w-[5rem] sm:text-[0.7rem]',
                    active ? 'text-jojo-cream' : 'text-jojo-cream/45',
                  )}
                  style={active ? { color: arc.textColor, textShadow: `0 0 8px ${hexA(nodeColor, 0.6)}` } : undefined}
                  title={t(arc.name, lang)}
                >
                  {t(arc.short, lang)}
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      {/* Active arc full name banner */}
      <div dir={ui.dir} className="mt-2 text-center">
        <span
          className="font-editorial text-sm italic sm:text-base"
          style={{ color: activeArc.textColor, textShadow: `0 0 14px ${hexA(activeArc.color, 0.5)}` }}
        >
          {t(activeArc.name, lang)}
        </span>
      </div>
    </div>
  );
}

export default DestinyPath;
