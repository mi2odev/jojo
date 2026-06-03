import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Lang, RankedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { cardPop, staggerContainer, EASE_OUT } from '@/anim/variants';
import { JoestarStar, MenacingText, SpeedLines } from '@/components/fx';
import { cx, hexA, clamp } from '@/lib/utils';

interface Props {
  lang: Lang;
  ranking: RankedCharacter[];
}

/** Collectible-card gallery of all matches + an accessible detail modal. */
export function CharacterGallery({ lang, ranking }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const [openRank, setOpenRank] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const selected = openRank != null ? ranking.find((r) => r.rank === openRank) ?? null : null;

  const close = useCallback(() => {
    setOpenRank(null);
    triggerRef.current?.focus();
  }, []);

  // Escape to close + focus the close button on open.
  useEffect(() => {
    if (!selected) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])',
        );
        if (f.length === 0) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected, close]);

  return (
    <section className="relative mx-auto w-full max-w-6xl">
      <header className="mb-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <MenacingText count={3} size="0.9rem" />
          <h2 className="font-display uppercase jojo-gold-text text-3xl sm:text-4xl">{ui.completeAnalysis}</h2>
          <MenacingText count={3} size="0.9rem" />
        </div>
        <p className="mt-1 font-stat uppercase tracking-[0.2em] text-jojo-cream/65 text-xs sm:text-sm">
          {ui.seeHowYouMatch}
        </p>
      </header>

      <motion.ul
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4"
      >
        {ranking.map((r) => {
          const c = r.character;
          const isTop = r.rank === 1;
          const pct = clamp(r.percentage, 0, 100);
          return (
            <motion.li key={c.key} variants={cardPop}>
              <button
                type="button"
                onClick={(e) => {
                  triggerRef.current = e.currentTarget;
                  setOpenRank(r.rank);
                }}
                className={cx(
                  'group relative block w-full overflow-hidden rounded-xl p-3 text-start transition-transform',
                  'hover:-translate-y-1 focus:-translate-y-1 focus:outline-none',
                  isTop ? 'neon-frame' : 'jojo-glass',
                )}
                style={
                  isTop
                    ? { boxShadow: `0 0 26px ${hexA(c.color, 0.55)}`, borderColor: c.color }
                    : { borderColor: hexA(c.color, 0.4) }
                }
                aria-label={`${c.name} — ${r.percentage}% ${ui.match}. ${ui.viewProfile}`}
              >
                {isTop && (
                  <span
                    className="absolute end-2 top-2 z-20 inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-stat uppercase tracking-wider text-[10px] text-jojo-black"
                    style={{ background: '#FFD700', boxShadow: '0 0 14px rgba(255,215,0,0.7)' }}
                  >
                    <JoestarStar size={11} color="#050505" stroke="#050505" />
                    {ui.bestMatch}
                  </span>
                )}

                {/* Rank chip */}
                <span
                  className="absolute start-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full font-display text-sm jojo-stroke"
                  style={{ background: hexA(c.color, 0.9), color: '#050505' }}
                >
                  {r.rank}
                </span>

                <div className="relative mx-auto mb-3 aspect-square w-full overflow-hidden rounded-lg">
                  {isTop && <SpeedLines variant="gold" className="absolute inset-0 opacity-30" />}
                  <div className="absolute inset-0" style={{ background: `radial-gradient(circle, ${hexA(c.color, 0.35)}, transparent 70%)` }} />
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="relative z-10 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="font-display uppercase text-jojo-cream text-lg leading-none truncate">{c.name}</div>
                <div className="font-stat uppercase tracking-wider text-[11px] text-jojo-cream/60 truncate">{c.partName}</div>

                {/* Match bar */}
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-jojo-black/60">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: `linear-gradient(90deg, ${c.color}, ${c.accent})` }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${pct}%` }}
                    viewport={{ once: true }}
                    transition={reduce ? { duration: 0 } : { duration: 1, ease: EASE_OUT }}
                  />
                </div>
                <div className="mt-1 text-end font-display text-sm" style={{ color: c.color }}>
                  {r.percentage}%
                </div>
              </button>
            </motion.li>
          );
        })}
      </motion.ul>

      {/* DETAIL MODAL */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            dir={ui.dir}
          >
            <button
              type="button"
              aria-label={ui.close}
              tabIndex={-1}
              onClick={close}
              className="absolute inset-0 bg-jojo-black/80 backdrop-blur-sm"
            />
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-label={selected.character.name}
              className="relative z-10 max-h-[88dvh] w-full max-w-lg overflow-y-auto rounded-2xl jojo-panel bg-jojo-ink/95 p-5"
              style={{ borderColor: selected.character.color, boxShadow: `0 0 50px ${hexA(selected.character.color, 0.5)}` }}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div
                    className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2"
                    style={{ borderColor: selected.character.color }}
                  >
                    <img src={selected.character.image} alt={selected.character.name} className="h-full w-full object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="font-display uppercase jojo-stroke text-2xl leading-none" style={{ color: selected.character.color }}>
                      {selected.character.name}
                    </h3>
                    <p className="font-stat uppercase tracking-wider text-xs text-jojo-cream/65">
                      {selected.character.partName} · {selected.percentage}% {ui.match}
                    </p>
                  </div>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={close}
                  aria-label={ui.close}
                  className="shrink-0 rounded-full p-2 text-jojo-cream/80 transition-colors hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                >
                  <svg viewBox="0 0 24 24" width={20} height={20} fill="none" aria-hidden>
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              <p className="mt-4 text-start text-sm leading-relaxed text-jojo-cream/90">{selected.character.description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {selected.character.traits.map((tr) => (
                  <span
                    key={tr}
                    className="rounded-full px-3 py-1 font-stat uppercase tracking-wider text-[11px] text-jojo-cream"
                    style={{ background: hexA(selected.character.color, 0.18), border: `1px solid ${hexA(selected.character.color, 0.5)}` }}
                  >
                    #{tr}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default CharacterGallery;
