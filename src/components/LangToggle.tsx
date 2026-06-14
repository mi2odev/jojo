import { useQuiz } from '@/state/QuizContext';
import { cx } from '@/lib/utils';

interface Props {
  /** Extra positioning/utility classes (e.g. alignment within a header). */
  className?: string;
}

/**
 * Self-contained EN/AR language switch. Reads `lang`/`toggleLang` straight from
 * the quiz context so it can be dropped onto any page without prop threading.
 * Styled to match the landing-page toggle for a consistent look across screens.
 */
export function LangToggle({ className }: Props) {
  const { lang, ui, toggleLang } = useQuiz();

  return (
    <button
      type="button"
      onClick={toggleLang}
      aria-label={ui.switchLanguage}
      className={cx(
        'jojo-glass rounded-full px-4 py-2 font-stat text-xs font-bold uppercase tracking-widest',
        'text-jojo-gold transition hover:shadow-neon sm:text-sm',
        className,
      )}
    >
      {lang === 'en' ? 'العربية' : 'English'}
    </button>
  );
}

export default LangToggle;
