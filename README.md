# JoJo Personality Quiz — Find your Stand

An animated personality quiz inspired by *JoJo's Bizarre Adventure*. Answer the questions and get matched with a character, with a Stand stat block, a radar chart of your traits and a shareable result card.

## Features

- Cinematic intro, manga backgrounds, speed lines, "menacing" text and glitch effects
- Scored quiz with personality metrics and a radar chart of the result
- Character gallery and Stand profile pages
- Shareable result card with a QR code
- Two languages with a language toggle (LTR / RTL)

## Stack

React · TypeScript · Vite · Tailwind CSS · Framer Motion · Recharts · React Router · qrcode

## Run it

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build in dist/
npm run preview  # preview the build
```

## Structure

```
src/
  components/fx/       visual effects (aura, particles, speed lines, radar…)
  components/screens/  hero, intro, quiz, result, share card, gallery
  data/                questions, characters, personality metrics, i18n
  lib/scoring.ts       quiz scoring
  routes/              Home, Quiz, Result
```
