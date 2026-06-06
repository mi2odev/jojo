import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
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
/** Public site the QR resolves to. */
const SITE_URL = 'https://jojomi2o.netlify.app/';
const SITE_LABEL = 'jojomi2o.netlify.app';

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

/** Draws a filled (and optionally stroked) five-pointed Joestar star. */
function drawStar(
  ctx: CanvasRenderingContext2D,
  cx0: number,
  cy0: number,
  outer: number,
  inner: number,
  fill: string,
  stroke?: string,
): void {
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const a = -Math.PI / 2 + (i * Math.PI) / 5;
    const x = cx0 + Math.cos(a) * r;
    const y = cy0 + Math.sin(a) * r;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = stroke;
    ctx.stroke();
  }
}

/** Radial manga speed-line sunburst (alternating wedges) centered at cx/cy. */
function drawRadialBurst(
  ctx: CanvasRenderingContext2D,
  cx0: number,
  cy0: number,
  r: number,
  count: number,
  color: string,
): void {
  ctx.save();
  ctx.fillStyle = color;
  for (let i = 0; i < count; i++) {
    const a0 = (i / count) * Math.PI * 2;
    const a1 = a0 + (Math.PI * 2) / count / 2;
    ctx.beginPath();
    ctx.moveTo(cx0, cy0);
    ctx.arc(cx0, cy0, r, a0, a1);
    ctx.closePath();
    ctx.fill();
  }
  ctx.restore();
}

/** L-shaped corner bracket ornament. */
function drawCorner(ctx: CanvasRenderingContext2D, x: number, y: number, len: number, dx: number, dy: number, color: string): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 6;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x, y + dy * len);
  ctx.lineTo(x, y);
  ctx.lineTo(x + dx * len, y);
  ctx.stroke();
}

/** Truncate text with an ellipsis so it never overruns its allotted width. */
function fitText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string {
  if (ctx.measureText(text).width <= maxWidth) return text;
  let t = text;
  while (t.length > 1 && ctx.measureText(t + '…').width > maxWidth) t = t.slice(0, -1);
  return t.trimEnd() + '…';
}

/**
 * Downloadable JoJo profile card. Composes everything onto an OFFSCREEN canvas
 * (1080x1350) from same-origin assets + a locally-generated QR, so toDataURL
 * never taints. Rich layout: header, portrait disc, name/match, traits,
 * battle-cry quote, info rows, and a scannable footer.
 */
export function ShareCard({ lang, character, matchPct, className = '' }: Props) {
  const ui = getUI(lang);
  const [busy, setBusy] = useState(false);

  const draw = useCallback(
    (img: HTMLImageElement | null, qr: HTMLCanvasElement | null) => {
      const canvas = document.createElement('canvas');
      canvas.width = W;
      canvas.height = H;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('no-2d-context');

      const color = character.color;
      const accent = character.accent;
      const cream = '#F4ECD6';
      const ink = '#080510';

      // Language-aware fonts: Anton/Saira have no Arabic glyphs (canvas does no
      // per-glyph fallback), so Arabic must draw in Tajawal.
      const isAr = lang === 'ar';
      const headFont = (px: number) => (isAr ? `800 ${px}px Tajawal, sans-serif` : `800 ${px}px Anton, "Saira Condensed", system-ui, sans-serif`);
      const bodyFont = (px: number, w = 700) => (isAr ? `${w} ${px}px Tajawal, sans-serif` : `${w} ${px}px "Saira Condensed", system-ui, sans-serif`);
      const up = (s: string) => (isAr ? s : s.toUpperCase());
      ctx.direction = isAr ? 'rtl' : 'ltr';

      // ---- Background ---------------------------------------------------
      const bg = ctx.createLinearGradient(0, 0, W, H);
      bg.addColorStop(0, '#0A0118');
      bg.addColorStop(0.5, '#120A22');
      bg.addColorStop(1, '#050505');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Manga speed-line sunburst radiating from behind the portrait.
      drawRadialBurst(ctx, W / 2, 360, 1500, 72, hexA(color, 0.05));

      // Diagonal energy streaks for motion.
      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(-0.32);
      ctx.translate(-W / 2, -H / 2);
      for (let i = -2; i <= 6; i++) {
        const sx = i * 220 - 100;
        const grad = ctx.createLinearGradient(sx, 0, sx + 60, H);
        grad.addColorStop(0, 'rgba(0,0,0,0)');
        grad.addColorStop(0.5, hexA(i % 2 === 0 ? color : accent, 0.05));
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(sx, -200, 26, H + 400);
      }
      ctx.restore();

      // Color wash from the character.
      const wash = ctx.createRadialGradient(W / 2, H * 0.32, 60, W / 2, H * 0.32, W * 0.85);
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

      // Giant faint ゴゴゴ "menacing" marks in the corners.
      const menaceFont = '900 130px "Yu Gothic", "Hiragino Kaku Gothic Pro", "Noto Sans JP", "MS Gothic", sans-serif';
      ctx.save();
      ctx.font = menaceFont;
      ctx.fillStyle = hexA(color, 0.05);
      ctx.textAlign = 'center';
      ctx.translate(150, 690);
      ctx.rotate(-0.18);
      ctx.fillText('ゴ', 0, 0);
      ctx.fillText('ゴ', 16, 120);
      ctx.restore();
      ctx.save();
      ctx.font = menaceFont;
      ctx.fillStyle = hexA(accent, 0.045);
      ctx.textAlign = 'center';
      ctx.translate(W - 150, 1020);
      ctx.rotate(0.16);
      ctx.fillText('ゴ', 0, 0);
      ctx.fillText('ゴ', -16, 120);
      ctx.restore();

      // Scattered star field (both theme colors, varied sizes/opacity).
      const stars: Array<[number, number, number, string, number]> = [
        [140, 760, 26, color, 0.1],
        [950, 700, 22, accent, 0.1],
        [90, 1130, 16, color, 0.09],
        [990, 1170, 20, accent, 0.09],
        [110, 470, 14, accent, 0.08],
        [970, 470, 18, color, 0.08],
        [70, 900, 12, color, 0.07],
        [1010, 940, 13, accent, 0.07],
        [W / 2 - 360, 980, 11, color, 0.07],
        [W / 2 + 360, 880, 12, accent, 0.07],
      ];
      stars.forEach(([sx, sy, sr, sc, sa]) => drawStar(ctx, sx, sy, sr, sr * 0.45, hexA(sc, sa)));

      // Edge vignette to settle the busy background and lift the foreground.
      const vig = ctx.createRadialGradient(W / 2, H * 0.44, H * 0.24, W / 2, H * 0.52, H * 0.72);
      vig.addColorStop(0, 'rgba(5,3,12,0)');
      vig.addColorStop(1, 'rgba(5,3,12,0.6)');
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      // ---- Frame + corner ornaments ------------------------------------
      ctx.strokeStyle = color;
      ctx.lineWidth = 10;
      roundRect(ctx, 28, 28, W - 56, H - 56, 36);
      ctx.stroke();
      ctx.strokeStyle = hexA(accent, 0.5);
      ctx.lineWidth = 3;
      roundRect(ctx, 48, 48, W - 96, H - 96, 26);
      ctx.stroke();
      const cl = 46;
      drawCorner(ctx, 70, 70, cl, 1, 1, color);
      drawCorner(ctx, W - 70, 70, cl, -1, 1, color);
      drawCorner(ctx, 70, H - 70, cl, 1, -1, color);
      drawCorner(ctx, W - 70, H - 70, cl, -1, -1, color);

      // ---- Header -------------------------------------------------------
      const headY = 118;
      const brandX = isAr ? W - 96 : 96;
      const labelX = isAr ? 96 : W - 96;
      drawStar(ctx, isAr ? W - 110 : 110, headY - 12, 22, 9, color, ink);
      ctx.textAlign = isAr ? 'right' : 'left';
      ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = color;
      ctx.font = headFont(56);
      ctx.fillText('JOJO', isAr ? W - 142 : 142, headY);
      ctx.textAlign = isAr ? 'left' : 'right';
      ctx.fillStyle = hexA(cream, 0.55);
      ctx.font = bodyFont(30, 700);
      const oldSpacing = (ctx as unknown as { letterSpacing?: string }).letterSpacing;
      try { (ctx as unknown as { letterSpacing: string }).letterSpacing = '6px'; } catch { /* not supported */ }
      ctx.fillText('PERSONALITY TEST', labelX, headY - 8);
      try { (ctx as unknown as { letterSpacing: string }).letterSpacing = oldSpacing ?? '0px'; } catch { /* noop */ }

      // header underline
      ctx.strokeStyle = hexA(color, 0.4);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(96, 150);
      ctx.lineTo(W - 96, 150);
      ctx.stroke();

      // ---- Portrait disc ------------------------------------------------
      const cx0 = W / 2;
      const cy0 = 348;
      const radius = 168;
      ctx.save();
      const glow = ctx.createRadialGradient(cx0, cy0, radius * 0.4, cx0, cy0, radius * 1.3);
      glow.addColorStop(0, hexA(color, 0.55));
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius * 1.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.fillStyle = ink;
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
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(character.emoji, cx0, cy0);
        ctx.textBaseline = 'alphabetic';
      }
      ctx.restore();
      // disc ring (double)
      ctx.strokeStyle = color;
      ctx.lineWidth = 8;
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = hexA(accent, 0.6);
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx0, cy0, radius + 10, 0, Math.PI * 2);
      ctx.stroke();

      // ---- Name + title -------------------------------------------------
      ctx.textAlign = 'center';
      ctx.fillStyle = color;
      ctx.font = bodyFont(30, 700);
      ctx.fillText(up(ui.yourCharacterIs), W / 2, 572);

      // Auto-shrink the name so long names never overrun the frame.
      let nameSize = isAr ? 70 : 80;
      ctx.font = headFont(nameSize);
      while (nameSize > 44 && ctx.measureText(up(character.name)).width > W - 180) {
        nameSize -= 4;
        ctx.font = headFont(nameSize);
      }
      ctx.fillStyle = cream;
      ctx.lineWidth = 7;
      ctx.strokeStyle = ink;
      ctx.strokeText(up(character.name), W / 2, 648);
      ctx.fillText(up(character.name), W / 2, 648);

      ctx.fillStyle = color;
      ctx.font = bodyFont(34);
      ctx.fillText(fitText(ctx, character.title, W - 200), W / 2, 696);

      // ---- Match badge --------------------------------------------------
      const bw = 320;
      const bh = 78;
      const bx = (W - bw) / 2;
      const by = 722;
      ctx.fillStyle = hexA(color, 0.14);
      roundRect(ctx, bx, by, bw, bh, 42);
      ctx.fill();
      ctx.strokeStyle = hexA(color, 0.7);
      ctx.lineWidth = 3;
      roundRect(ctx, bx, by, bw, bh, 42);
      ctx.stroke();
      // Percent + label centered as a measured pair (% left, label right) so
      // both languages stay aligned without overlap.
      const pctStr = `${matchPct}%`;
      const matchStr = up(ui.match);
      ctx.textBaseline = 'middle';
      ctx.textAlign = 'left';
      ctx.font = headFont(52);
      const pctW = ctx.measureText(pctStr).width;
      ctx.font = bodyFont(30, 700);
      const matchW = ctx.measureText(matchStr).width;
      const pairGap = 18;
      const startX = W / 2 - (pctW + pairGap + matchW) / 2;
      ctx.fillStyle = color;
      ctx.font = headFont(52);
      ctx.fillText(pctStr, startX, by + bh / 2 + 4);
      ctx.fillStyle = hexA(cream, 0.85);
      ctx.font = bodyFont(30, 700);
      ctx.fillText(matchStr, startX + pctW + pairGap, by + bh / 2 + 2);
      ctx.textBaseline = 'alphabetic';

      // ---- Trait chips --------------------------------------------------
      const traits = character.traits.slice(0, 3);
      ctx.font = bodyFont(30, 600);
      const cgap = 20;
      const cpadX = 26;
      const cwidths = traits.map((tr) => ctx.measureText(tr).width + cpadX * 2);
      const ctotal = cwidths.reduce((a, b) => a + b, 0) + cgap * (traits.length - 1);
      let tcx = (W - ctotal) / 2;
      const tcy = 822;
      traits.forEach((tr, i) => {
        const tw = cwidths[i];
        ctx.fillStyle = hexA(accent, 0.16);
        roundRect(ctx, tcx, tcy, tw, 52, 26);
        ctx.fill();
        ctx.strokeStyle = hexA(accent, 0.7);
        ctx.lineWidth = 2;
        roundRect(ctx, tcx, tcy, tw, 52, 26);
        ctx.stroke();
        ctx.fillStyle = cream;
        ctx.textAlign = 'center';
        ctx.fillText(tr, tcx + tw / 2, tcy + 35);
        tcx += tw + cgap;
      });

      // ---- Battle-cry quote --------------------------------------------
      ctx.textAlign = 'center';
      ctx.fillStyle = hexA(cream, 0.9);
      ctx.font = `italic 600 34px ${isAr ? 'Tajawal' : '"Bodoni Moda", Georgia'}, serif`;
      ctx.fillText(fitText(ctx, `“${character.quote}”`, W - 200), W / 2, 916);

      // ---- Info rows ----------------------------------------------------
      const rows: Array<[string, string]> = [
        [ui.standLabel, character.stand],
        [ui.combatStyle, character.combatStyle],
        [ui.strengths, character.strengths.slice(0, 3).join(' · ')],
      ];
      const rx1 = 96;
      const rx2 = W - 96;
      let ry = 974;
      const rowStep = 46;
      rows.forEach(([label, value]) => {
        ctx.font = bodyFont(30, 800);
        ctx.fillStyle = color;
        const labelX2 = isAr ? rx2 : rx1;
        ctx.textAlign = isAr ? 'right' : 'left';
        ctx.fillText(up(label), labelX2, ry);
        const labelW = ctx.measureText(up(label)).width;

        ctx.font = bodyFont(30, 500);
        ctx.fillStyle = hexA(cream, 0.92);
        ctx.textAlign = isAr ? 'left' : 'right';
        const valueX = isAr ? rx1 : rx2;
        const avail = rx2 - rx1 - labelW - 30;
        ctx.fillText(fitText(ctx, value, avail), valueX, ry);

        // row separator
        ctx.strokeStyle = hexA(cream, 0.1);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(rx1, ry + 14);
        ctx.lineTo(rx2, ry + 14);
        ctx.stroke();
        ry += rowStep;
      });

      // ---- Star divider -------------------------------------------------
      const dvy = ry + 6;
      ctx.strokeStyle = hexA(color, 0.4);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(rx1, dvy);
      ctx.lineTo(W / 2 - 34, dvy);
      ctx.moveTo(W / 2 + 34, dvy);
      ctx.lineTo(rx2, dvy);
      ctx.stroke();
      drawStar(ctx, W / 2, dvy, 18, 8, color, ink);

      // ---- Footer: QR + scan call-to-action -----------------------------
      const qrSize = 132;
      const footY = dvy + 28;
      const qrX = isAr ? W - 96 - qrSize : 96;
      // white plate behind the QR for scannability
      ctx.fillStyle = '#FFFFFF';
      roundRect(ctx, qrX - 12, footY - 12, qrSize + 24, qrSize + 24, 18);
      ctx.fill();
      ctx.strokeStyle = hexA(color, 0.8);
      ctx.lineWidth = 3;
      roundRect(ctx, qrX - 12, footY - 12, qrSize + 24, qrSize + 24, 18);
      ctx.stroke();
      if (qr) ctx.drawImage(qr, qrX, footY, qrSize, qrSize);

      // text beside the QR (opposite side)
      const textX = isAr ? qrX - 36 : qrX + qrSize + 36;
      ctx.textAlign = isAr ? 'right' : 'left';
      const fcy = footY + qrSize / 2;
      ctx.fillStyle = cream;
      ctx.font = bodyFont(34, 800);
      ctx.fillText(fitText(ctx, ui.scanToDiscover, isAr ? textX - rx1 : rx2 - textX), textX, fcy - 26);
      ctx.fillStyle = accent;
      ctx.font = bodyFont(32, 700);
      ctx.fillText(SITE_LABEL, textX, fcy + 18);
      ctx.fillStyle = hexA(cream, 0.55);
      ctx.font = bodyFont(24, 500);
      ctx.fillText(fitText(ctx, ui.cardCredit, isAr ? textX - rx1 : rx2 - textX), textX, fcy + 56);

      return canvas.toDataURL('image/png');
    },
    [character, matchPct, ui, lang],
  );

  const handleDownload = useCallback(() => {
    setBusy(true);
    const finish = (img: HTMLImageElement | null, qr: HTMLCanvasElement | null) => {
      try {
        const url = draw(img, qr);
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
            await Promise.all([
              document.fonts.load('800 96px Anton'),
              document.fonts.load('700 40px "Saira Condensed"'),
              document.fonts.load('italic 600 36px "Bodoni Moda"'),
            ]);
          }
          await document.fonts.ready;
        }
      } catch {
        /* font preload best-effort */
      }

      // Generate the QR locally so the canvas stays untainted.
      let qr: HTMLCanvasElement | null = null;
      try {
        qr = document.createElement('canvas');
        await QRCode.toCanvas(qr, SITE_URL, {
          width: 360,
          margin: 1,
          errorCorrectionLevel: 'M',
          color: { dark: '#0A0118', light: '#FFFFFF' },
        });
      } catch {
        qr = null;
      }

      try {
        const img = new Image();
        // Same-origin assets — no crossOrigin needed; canvas stays untainted.
        img.onload = () => finish(img, qr);
        img.onerror = () => finish(null, qr);
        img.src = character.image;
      } catch {
        finish(null, qr);
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
