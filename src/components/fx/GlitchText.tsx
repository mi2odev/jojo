import { cx } from '@/lib/utils';

interface Props {
  text: string;
  className?: string;
  /** Render the main fill as the shimmering gold foil (jojo-gold-text). */
  goldFoil?: boolean;
}

/**
 * RGB-split glitch text — cyan/magenta layers jitter behind the fill.
 * Each layer sets its own -webkit-text-fill-color so it renders even when an
 * ancestor uses background-clip:text (which would otherwise inherit transparent).
 */
export function GlitchText({ text, className = '', goldFoil = false }: Props) {
  return (
    <span className={cx('relative inline-block', className)}>
      <span
        aria-hidden
        className="absolute inset-0 text-jojo-cyan opacity-70 animate-glitch mix-blend-screen"
        style={{ clipPath: 'inset(0 0 55% 0)', transform: 'translateX(-2px)', WebkitTextFillColor: 'currentColor' }}
      >
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 text-jojo-magenta opacity-70 animate-glitch mix-blend-screen"
        style={{ clipPath: 'inset(55% 0 0 0)', transform: 'translateX(2px)', animationDelay: '0.12s', WebkitTextFillColor: 'currentColor' }}
      >
        {text}
      </span>
      <span className={cx('relative z-10', goldFoil && 'jojo-gold-text')}>{text}</span>
    </span>
  );
}

export default GlitchText;
