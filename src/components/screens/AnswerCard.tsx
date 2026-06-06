import { motion, useReducedMotion } from 'framer-motion';
import type { CharacterKey, Lang } from '@/types';
import type { Answer } from '@/types';
import { getUI } from '@/data/i18n';
import { cx, hexA } from '@/lib/utils';
import { cardPop } from '@/anim/variants';

interface Props {
  answer: Answer;
  index: number;
  lang: Lang;
  /** Theme color for this card's glow (cycles per index from the caller). */
  color: string;
  accent: string;
  /** This card is the chosen answer — plays the confirm burst. */
  selected?: boolean;
  /** A selection is in progress somewhere; ignore further input. */
  locked?: boolean;
  onSelect: (scores: Partial<Record<CharacterKey, number>>) => void;
}

/**
 * A single answer rendered as a collectible "Stand" card.
 * Glassmorphism + neon outline + gold letter badge. Hover tilts/glows.
 * Selection is owned by the parent: the chosen card pops + glows with a
 * confirmation ring while its siblings dim out and all input locks.
 */
export function AnswerCard({
  answer,
  index,
  lang,
  color,
  accent,
  selected = false,
  locked = false,
  onSelect,
}: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const letter = String.fromCharCode(65 + index);
  // A sibling was chosen — this card fades to the background.
  const dimmed = locked && !selected;

  const fire = () => {
    if (locked) return;
    onSelect(answer.scores);
  };

  // Selection feedback runs through `animate`; while idle it stays `undefined`
  // so the staggered entrance variant (cardPop) is free to play first.
  const selectAnimate = reduce
    ? undefined
    : selected
      ? { scale: [1, 1.05, 1.015], rotate: 0, opacity: 1 }
      : dimmed
        ? { scale: 0.97, opacity: 0.4, filter: 'blur(1px)' }
        : undefined;

  return (
    <motion.button
      type="button"
      variants={cardPop}
      aria-disabled={locked}
      onClick={fire}
      aria-label={`${ui.answer} ${letter}: ${answer.text}`}
      whileHover={reduce || locked ? undefined : { scale: 1.025, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      whileTap={reduce || locked ? undefined : { scale: 0.97 }}
      animate={selectAnimate}
      transition={{ duration: selected ? 0.34 : 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={cx(
        'group relative isolate w-full overflow-hidden rounded-2xl text-start',
        'jojo-glass neon-frame px-4 py-4 sm:px-5 sm:py-5',
        'transition-shadow duration-300',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-jojo-black',
        locked && 'pointer-events-none',
        dimmed && 'cursor-default',
      )}
      style={{
        borderColor: selected ? hexA(accent, 0.95) : hexA(color, 0.55),
        boxShadow: selected
          ? `0 0 0 2px ${hexA(accent, 0.9)}, 0 0 42px ${hexA(accent, 0.5)}, 0 10px 44px ${hexA(color, 0.4)}`
          : `0 0 0 1px ${hexA(color, 0.25)}, 0 8px 30px ${hexA(color, 0.18)}`,
        // @ts-expect-error -- CSS custom property for the focus ring color.
        '--tw-ring-color': hexA(accent, 0.85),
      }}
    >
      {/* Hover energy wash */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(120% 120% at 0% 0%, ${hexA(color, 0.28)}, transparent 60%)` }}
      />
      {/* Selection ink flash */}
      {selected && !reduce && (
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <motion.span
            className="absolute inset-0"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            style={{ background: `radial-gradient(120% 120% at 50% 50%, ${hexA(accent, 0.5)}, transparent 70%)` }}
          />
        </span>
      )}

      {/* Confirmation ring sweep on select */}
      {selected && !reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: [0, 1, 0], scale: 1.04 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ boxShadow: `inset 0 0 0 2px ${hexA(accent, 0.95)}, inset 0 0 24px ${hexA(accent, 0.45)}` }}
        />
      )}

      <span className="flex items-start gap-3 sm:gap-4">
        {/* Gold letter badge */}
        <span
          aria-hidden
          className={cx(
            'relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border-2 border-jojo-black',
            'font-display text-lg leading-none text-jojo-black',
            'shadow-manga-sm sm:h-11 sm:w-11 sm:text-xl',
          )}
          style={{ background: `linear-gradient(135deg, ${hexA('#FFD700', 1)}, ${hexA(color, 0.9)})` }}
        >
          {letter}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-xl opacity-60 group-hover:animate-gold-shimmer"
          />
        </span>

        <span className="min-w-0 flex-1 pt-0.5">
          <span className="block font-ui text-[0.95rem] font-medium leading-snug text-jojo-cream sm:text-base">
            {answer.text}
          </span>
        </span>

        {/* Decorative selection chevron (logical end) */}
        <span
          aria-hidden
          className="mt-0.5 shrink-0 self-center font-display text-xl opacity-40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-90 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          style={{ color: accent }}
        >
          ▶
        </span>
      </span>

      {/* Neon underline that grows on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-4 bottom-2 h-[2px] origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100 rtl:origin-right"
        style={{ background: `linear-gradient(90deg, ${color}, ${accent})` }}
      />
    </motion.button>
  );
}

export default AnswerCard;
