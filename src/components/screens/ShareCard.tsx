import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import type { Lang, LocalizedCharacter } from '@/types';
import { getUI } from '@/data/i18n';
import { cx, hexA } from '@/lib/utils';

interface Props {
  lang: Lang;
  character: LocalizedCharacter;
  matchPct: number;
  className?: string;
}

const W = 1080;
const H = 1350;

/** Rounded-rect path helper for the canvas composition. */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

/**
 * Downloadable JoJo profile card. Composes everything onto an OFFSCREEN canvas
 * (1080x1350) from same-origin assets, so toDataURL never taints.
 */
export function ShareCard({ lang, character, matchPct, className = '' }: Props) {
  const ui = getUI(lang);
  const [busy, setBusy] = useState(false);

  const draw = useCallback(
    (img: HTMLImageElement | null) => {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no-2d-context');

      const color = character.color;
      const accent = character.accent;

      // Language-aware fonts: Anton/Saira have no Arabic glyphs (canvas does no
      // per-glyph fallback), so Arabic must draw in Tajawal.
      const isAr = lang === 'ar';
      const headFont = (px: number) => (isAr ? `800 ${px}px Tajawal, sans-serif` : `800 ${px}px Anton, "Saira Condensed", system-ui, sans-serif`);
      const bodyFont = (px: number, w = 700) => (isAr ? `${w} ${px}px Tajawal, sans-serif` : `${w} ${px}px "Saira Condensed", system-ui, sans-serif`);
      const up = (s: string) => (isAr ? s : s.toUpperCase());
      ctx.direction = isAr ? 'rtl' : 'ltr';

      // Background gradient (dark JoJo night).
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0A0118');
      bg.addColorStop(0.5, '#120A22');
      bg.addColorStop(1, '#050505');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Color wash from the character.
      const wash = ctx.createRadialGradient(W / 2, H * 0.42, 60, W / 2, H * 0.42, W * 0.85);
      wash.addColorStop(0, hexA(color, 0.32));
      wash.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = wash;
      ctx.fillRect(0, 0, W, H);

      // Halftone dot feel.
      ctx.save();
      ctx.fillStyle = hexA(accent, 0.06);
      for (let y = 0; y < H; y += 26) {
        for (let x = 0; x < W; x += 26) {
          ctx.beginPath();
          ctx.arc(x, y, 2.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Outer frame.
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      roundRect(ctx, 28, 28, W - 56, H - 56, 36);
      ctx.stroke();
      ctx.strokeStyle = hexA(accent, 0.5);
      ctx.lineWidth = 3;
      roundRect(ctx, 48, 48, W - 96, H - 96, 26);
      ctx.stroke();

      // Brand kicker.
      ctx.textAlign = 'center';
      ctx.fillStyle = hexA('#F4ECD6', 0.85);
      ctx.font = '700 34px "Saira Condensed", system-ui, sans-serif';
      ctx.fillText('JoJo Personality Test', W / 2, 130);

      // Character artwork in a framed disc.
      const cx0 = W / 2;
      const cy0 = 470;
      const radius = 290;
      ctx.save();
      // glow
      const glow = ctx.createRadialGradient(cx0, cy0, radius * 0.4, cx0, cy0, radius * 1.25);
      glow.addColorStop(0, hexA(color, 0.55));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius * 1.25, 0, Math.PI * 2);
      ctx.fill();
      // clip + image
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = '#080510';
      ctx.fillRect(cx0 - radius, cy0 - radius, radius * 2, radius * 2);
      if (img) {
        const ar = img.width / img.height || 1;
        let dw = radius * 2;
        let dh = dw / ar;
        if (dh < radius * 2) {
          dh = radius * 2;
          dw = dh * ar;
        }
        ctx.drawImage(img, cx0 - dw / 2, cy0 - dh / 2, dw, dh);
      } else {
        ctx.fillStyle = color;
        ctx.font = '200px system-ui';
        ctx.textBaseline = 'middle';
        ctx.fillText(character.emoji, cx0, cy0);
        ctx.textBaseline = 'alphabetic';
      }
      ctx.restore();
      // disc ring
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Name.
      ctx.textAlign = 'center';
      ctx.fillStyle = '#F4ECD6';
      ctx.font = headFont(isAr ? 84 : 96);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#050505';
      ctx.strokeText(up(character.name), W / 2, 860);
      ctx.fillText(up(character.name), W / 2, 860);

      // Title.
      ctx.fillStyle = color;
      ctx.font = bodyFont(40);
      ctx.fillText(character.title, W / 2, 916);

      // Stand + Part line.
      ctx.fillStyle = hexA('#F4ECD6', 0.9);
      ctx.font = bodyFont(36, 500);
      ctx.fillText(`${ui.standLabel}: ${character.stand}  ·  ${ui.partLabel} ${character.part}`, W / 2, 974);

      // Match percentage badge.
      ctx.fillStyle = color;
      ctx.font = '800 150px Anton, system-ui, sans-serif';
      ctx.strokeStyle = '#050505';
      ctx.lineWidth = 10;
      const pctTxt = `${matchPct}%`;
      ctx.strokeText(pctTxt, W / 2, 1140);
      ctx.fillText(pctTxt, W / 2, 1140);
      ctx.fillStyle = hexA('#F4ECD6', 0.8);
      ctx.font = bodyFont(34, 700);
      ctx.fillText(up(ui.match), W / 2, 1186);

      // Trait chips.
      const traits = character.traits.slice(0, 3);
      ctx.font = bodyFont(30, 600);
      const gap = 24;
      const padX = 28;
      const widths = traits.map((tr) => ctx.measureText(tr).width + padX * 2);
      const totalW = widths.reduce((a, b) => a + b, 0) + gap * (traits.length - 1);
      let tx = (W - totalW) / 2;
      const ty = 1240;
      traits.forEach((tr, i) => {
        const tw = widths[i];
        ctx.fillStyle = hexA(color, 0.18);
        roundRect(ctx, tx, ty, tw, 56, 28);
        ctx.fill();
        ctx.strokeStyle = hexA(color, 0.7);
        ctx.lineWidth = 2;
        roundRect(ctx, tx, ty, tw, 56, 28);
        ctx.stroke();
        ctx.fillStyle = '#F4ECD6';
        ctx.textAlign = 'center';
        ctx.fillText(tr, tx + tw / 2, ty + 38);
        tx += tw + gap;
      });

      return canvas.toDataURL('image/png');
    },
    [character, matchPct, ui, lang],
  );

  const handleDownload = useCallback(() => {
    setBusy(true);
    const finish = (img: HTMLImageElement | null) => {
      try {
        const url = draw(img);
        const a = document.createElement('a');
        a.href = url;
        a.download = `jojo-${character.key}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch {
        // eslint-disable-next-line no-alert
        alert(ui.shareTitle);
      } finally {
        setBusy(false);
      }
    };

    const start = async () => {
      // Ensure the needed face is loaded so the first draw isn't a fallback (esp. Arabic Tajawal).
      try {
        if (document.fonts) {
          if (lang === 'ar') {
            await Promise.all([document.fonts.load('800 84px Tajawal'), document.fonts.load('700 40px Tajawal')]);
          } else {
            await Promise.all([document.fonts.load('800 96px Anton'), document.fonts.load('700 40px "Saira Condensed"')]);
          }
          await document.fonts.ready;
        }
      } catch {
        /* font preload best-effort */
      }
      try {
        const img = new Image();
        // Same-origin assets — no crossOrigin needed; canvas stays untainted.
        img.onload = () => finish(img);
        img.onerror = () => finish(null);
        img.src = character.image;
      } catch {
        finish(null);
      }
    };
    void start();
  }, [draw, character.image, character.key, ui, lang]);

  return (
    <motion.button
      type="button"
      onClick={handleDownload}
      disabled={busy}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={cx(
        'group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-stat uppercase tracking-[0.18em] text-sm',
        'jojo-panel-gold bg-jojo-ink/80 text-jojo-cream transition-colors disabled:opacity-60',
        className,
      )}
      style={{ boxShadow: `0 0 22px ${hexA(character.color, 0.4)}` }}
      aria-label={ui.downloadCard}
    >
      <svg viewBox="0 0 24 24" width={18} height={18} fill="none" aria-hidden>
        <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {busy ? ui.loading : ui.downloadCard}
    </motion.button>
  );
}

export default ShareCard;
