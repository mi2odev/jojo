import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import type { Lang, RankedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { cardPop, staggerContainer, EASE_OUT } from '@/anim/variants';
import { JoestarStar, MenacingText, SpeedLines, StandAura, GoldParticles } from '@/components/fx';
import { cx, hexA, clamp } from '@/lib/utils';

interface Props {
  lang: Lang;
  ranking: RankedCharacter[];
}

interface MedalSpec {
  metal: string; // gold / silver / bronze base tone
  light: string; // metallic highlight (top of the gradient / shine)
  ped: string;   // pedestal height (1st tallest → podium silhouette)
  avatar: string; // avatar panel width (aspect-square)
  order: string; // flex order so 1st is centered, 2nd left, 3rd right
  roman: string; // engraved pedestal numeral
}

const MEDAL: Record<number, MedalSpec> = {
  1: { metal: '#FFD700', light: '#FFF3B0', ped: 'h-28 sm:h-36', avatar: 'w-28 sm:w-36', order: 'order-2', roman: 'I' },
  2: { metal: '#D7DBE0', light: '#FFFFFF', ped: 'h-20 sm:h-28', avatar: 'w-24 sm:w-28', order: 'order-1', roman: 'II' },
  3: { metal: '#CD7F32', light: '#E8A968', ped: 'h-14 sm:h-20', avatar: 'w-24 sm:w-28', order: 'order-3', roman: 'III' },
};

/** Collectible-card gallery of all matches + an accessible detail modal. */
export function CharacterGallery({ lang, ranking }: Props) {
  const ui = getUI(lang);
  const reduce = useReducedMotion();
  const [openRank, setOpenRank] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const selected = openRank != null ? ranking.find((r) => r.rank === openRank) ?? null : null;

  // Top three go on the podium; everyone else falls into the card grid below.
  const podium = ranking.slice(0, 3);
  const rest = ranking.slice(3);

  // Open the detail modal, remembering the trigger so focus can return to it.
  const open = (rank: number) => (e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setOpenRank(rank);
  };

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

      {/* ===== PODIUM (top 3) — JoJo "Stand stage" ===== */}
      <div className="relative mx-auto mb-12 max-w-2xl">
        {/* Comic speed-line burst + menacing aura behind the champion */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 -top-6 bottom-10 z-0 overflow-hidden">
          <SpeedLines variant="gold" spin={!reduce} className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-25" />
        </div>
        <MenacingText count={3} size="1.4rem" className="absolute -top-2 left-1/2 -translate-x-1/2 opacity-70" />

        {/* Stage floor — soft reflection puddle + glowing front edge */}
        <div aria-hidden className="pointer-events-none absolute inset-x-6 bottom-1 z-0 h-5 rounded-[50%] blur-xl" style={{ background: 'rgba(255,215,0,0.18)' }} />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[3px] rounded-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)' }} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative z-10 flex items-end justify-center gap-2 sm:gap-4"
        >
          {podium.map((r) => {
            const c = r.character;
            const m = MEDAL[r.rank];
            const champ = r.rank === 1;
            const pct = clamp(r.percentage, 0, 100);
            return (
              <motion.button
                key={c.key}
                type="button"
                variants={cardPop}
                whileTap={{ scale: 0.97 }}
                onClick={open(r.rank)}
                aria-label={`#${r.rank} — ${c.name} — ${r.percentage}% ${ui.match}. ${ui.viewProfile}`}
                className={cx(
                  'group relative flex flex-1 flex-col items-center focus:outline-none',
                  m.order, // visual order: 1st centered, 2nd left, 3rd right
                )}
              >
                {/* Crown — spinning Joestar star for the champion */}
                <div className="mb-1 flex h-7 items-end justify-center">
                  {champ && <JoestarStar size={26} className={reduce ? undefined : 'animate-star-spin'} />}
                </div>

                {/* Avatar — manga panel with hard comic shadow + Stand aura */}
                <div className="relative transition-transform duration-300 group-hover:-translate-y-1.5">
                  {champ && (
                    <div aria-hidden className="absolute -inset-3 z-0">
                      <StandAura color={c.color} rings={3} />
                    </div>
                  )}
                  <div
                    className={cx('relative z-10 aspect-square overflow-hidden rounded-xl border-[3px] border-jojo-black jojo-halftone', m.avatar)}
                    style={{ boxShadow: `4px 4px 0 0 rgba(5,5,5,0.92), 0 0 26px ${hexA(m.metal, 0.55)}` }}
                  >
                    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 35%, ${hexA(c.color, 0.45)}, transparent 72%)` }} />
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className="relative z-10 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Metallic inner frame */}
                    <span aria-hidden className="absolute inset-0 rounded-xl" style={{ boxShadow: `inset 0 0 0 2px ${hexA(m.metal, 0.9)}` }} />
                    {/* Champion gold dust */}
                    {champ && (
                      <div aria-hidden className="pointer-events-none absolute inset-0 z-20">
                        <GoldParticles count={18} color={c.color} />
                      </div>
                    )}
                  </div>
                  {/* Corner medal */}
                  <span
                    className="absolute -start-2.5 -top-2.5 z-30 grid h-8 w-8 place-items-center rounded-full border-2 border-jojo-black font-display text-base text-jojo-black"
                    style={{ background: `radial-gradient(circle at 35% 30%, ${m.light}, ${m.metal})`, boxShadow: `0 2px 6px rgba(0,0,0,0.5), 0 0 12px ${hexA(m.metal, 0.7)}` }}
                  >
                    {m.roman}
                  </span>
                  {/* BEST MATCH foil ribbon for the champion */}
                  {champ && (
                    <span
                      className="absolute -bottom-2.5 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1 whitespace-nowrap rounded-full border-2 border-jojo-black px-2 py-0.5 font-stat text-[9px] font-bold uppercase tracking-wider text-jojo-black"
                      style={{ background: 'linear-gradient(90deg,#B8860B,#FFD700 35%,#FFF6C2 50%,#FFD700 65%,#B8860B)', boxShadow: '0 0 16px rgba(255,215,0,0.75)' }}
                    >
                      <JoestarStar size={10} color="#050505" stroke="#050505" />
                      {ui.bestMatch}
                    </span>
                  )}
                </div>

                {/* Name + part + percent + match bar */}
                <div className={cx('relative z-10 w-full px-0.5 text-center', champ ? 'mt-4' : 'mt-3')}>
                  <div
                    className={cx(
                      'truncate font-display uppercase leading-none',
                      champ ? 'jojo-gold-text text-base sm:text-lg' : 'jojo-stroke text-jojo-cream text-xs sm:text-sm',
                    )}
                  >
                    {c.name}
                  </div>
                  <div className="truncate font-stat uppercase tracking-wider text-[9px] text-jojo-cream/55 sm:text-[10px]">{c.partName}</div>
                  <div className="font-display text-sm sm:text-base" style={{ color: c.color, textShadow: `0 0 12px ${hexA(c.color, 0.6)}` }}>
                    {r.percentage}%
                  </div>
                  <div className="mx-auto mt-1 h-1.5 w-4/5 overflow-hidden rounded-full bg-jojo-black/60">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, ${c.color}, ${c.accent})` }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={reduce ? { duration: 0 } : { duration: 1, ease: EASE_OUT, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Pedestal — engraved metallic step */}
                <div
                  className={cx('relative z-10 mt-2 flex w-full justify-center overflow-hidden rounded-t-md border-[3px] border-b-0 border-jojo-black', m.ped)}
                  style={{
                    background: `linear-gradient(180deg, ${m.light} 0%, ${m.metal} 42%, ${hexA(m.metal, 0.5)} 100%)`,
                    boxShadow: `0 0 26px ${hexA(m.metal, 0.5)}, inset 0 3px 0 rgba(255,255,255,0.5)`,
                  }}
                >
                  {/* Diagonal shine sweep — periodic glint across the metal */}
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute top-0 h-full w-1/3 -skew-x-12 bg-white/40 blur-md"
                    initial={{ left: '-40%' }}
                    animate={reduce ? { left: '-40%' } : { left: ['-40%', '140%'] }}
                    transition={reduce ? { duration: 0 } : { duration: 1.4, repeat: Infinity, repeatDelay: 2.4 + r.rank * 0.4, ease: 'easeInOut' }}
                  />
                  <span
                    className="relative mt-1.5 font-display leading-none text-jojo-black/85"
                    style={{ fontSize: champ ? '2.6rem' : '2rem', textShadow: '0 1px 0 rgba(255,255,255,0.45)' }}
                  >
                    {m.roman}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* ===== Remaining matches ===== */}
      {rest.length > 0 && (
        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 gap-4 xs:grid-cols-2 lg:grid-cols-4"
        >
          {rest.map((r) => {
            const c = r.character;
            const pct = clamp(r.percentage, 0, 100);
            return (
              <motion.li key={c.key} variants={cardPop}>
                <button
                  type="button"
                  onClick={open(r.rank)}
                  className={cx(
                    'group relative block w-full rounded-xl p-3 text-start transition-transform jojo-glass',
                    'hover:-translate-y-1 focus:-translate-y-1 focus:outline-none',
                  )}
                  style={{ borderColor: hexA(c.color, 0.4) }}
                  aria-label={`${c.name} — ${r.percentage}% ${ui.match}. ${ui.viewProfile}`}
                >
                  {/* Rank medallion — cream numeral + dark outline reads on any color. */}
                  <span
                    className="absolute start-2 top-2 z-20 flex h-7 w-7 items-center justify-center rounded-full border-2 border-jojo-black font-display text-sm text-jojo-cream jojo-stroke shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
                    style={{ background: c.color }}
                  >
                    {r.rank}
                  </span>

                  <div className="relative mx-auto mb-3 aspect-square w-full overflow-hidden rounded-lg">
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
      )}

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
