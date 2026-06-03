import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { CharacterKey, Lang } from '@/types';
import type { Answer } from '@/types';
import { getUI } from '@/data/i18n';
import { cx, hexA } from '@/lib/utils';
import { cardPop } from '@/anim/variants';
import { StandAura } from '@/components/fx';

interface Props {
  answer: Answer;
  index: number;
  lang: Lang;
  /** Theme color for this card's glow (cycles per index from the caller). */
  color: string;
  accent: string;
  disabled?: boolean;
  onSelect: (scores: Partial<Record<CharacterKey, number>>) => void;
}

/**
 * A single answer rendered as a collectible "Stand" card.
 * Glassmorphism + neon outline + gold letter badge. Hover tilts/glows;
 * on click it flashes a Stand-aura/ink burst, then fires onSelect.
 */
export function AnswerCard({ answer, index, lang, color, accent, disabled = false, onSelect }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const [firing, setFiring] = useState(false);
  const letter = String.fromCharCode(65 + index);

  const fire = () => {
    if (disabled || firing) return;
    if (reduce) {
      onSelect(answer.scores);
      return;
    }
    setFiring(true);
    // Brief aura/ink flash, then commit. Parent swaps the question on its own.
    window.setTimeout(() => onSelect(answer.scores), 260);
  };

  return (
    <motion.button
      type="button"
      variants={cardPop}
      disabled={disabled}
      onClick={fire}
      aria-label={`${ui.answer} ${letter}: ${answer.text}`}
      whileHover={reduce ? undefined : { scale: 1.025, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
      whileTap={reduce ? undefined : { scale: 0.97 }}
      animate={firing ? { scale: [1, 1.04, 0.99], rotate: 0 } : undefined}
      transition={{ duration: 0.26 }}
      className={cx(
        'group relative isolate w-full overflow-hidden rounded-2xl text-start',
        'jojo-glass neon-frame px-4 py-4 sm:px-5 sm:py-5',
        'transition-shadow duration-300',
        'focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-jojo-black',
        'disabled:cursor-not-allowed disabled:opacity-60',
      )}
      style={{
        borderColor: hexA(color, 0.55),
        boxShadow: `0 0 0 1px ${hexA(color, 0.25)}, 0 8px 30px ${hexA(color, 0.18)}`,
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
      {/* Click-time Stand aura / ink flash */}
      {firing && (
        <span aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <StandAura color={accent} rings={3} />
          <span
            className="absolute inset-0 animate-energy-wave"
            style={{ background: `radial-gradient(circle at 50% 50%, ${hexA(accent, 0.55)}, transparent 65%)` }}
          />
        </span>
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
