import type { Lang } from '@/types';
import { cx } from '@/lib/utils';

interface Props {
  lang?: Lang;
  className?: string;
}

/** "TO BE CONTINUED ➜" — the unmistakable JoJo episode card. */
export function ToBeContinued({ lang = 'en', className = '' }: Props) {
  return (
    <div dir="ltr" className={cx('inline-flex items-center gap-2 select-none', className)} aria-hidden="true">
      <span className="font-stat font-bold tracking-[0.18em] text-jojo-cream/90 text-xs sm:text-sm uppercase">
        {lang === 'ar' ? 'يتبع' : 'To Be Continued'}
      </span>
      <svg viewBox="0 0 64 28" className="w-12 h-6 animate-tbc-bob" fill="none">
        <path d="M2 14h40M34 4l16 10-16 10" stroke="#00F5FF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default ToBeContinued;
