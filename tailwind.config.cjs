/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: '400px',
      },
      colors: {
        // ===== JoJo AAA palette =====
        jojo: {
          purple: '#4B0082',
          violet: '#6A0DAD',
          gold: '#FFD700',
          goldlight: '#FFEC8B',
          magenta: '#FF008C',
          pink: '#FF2D95',
          cyan: '#00F5FF',
          emerald: '#00C897',
          crimson: '#C1121F',
          silver: '#E5E5E5',
          black: '#050505',
          ink: '#0B0712',
          night: '#160E26',
          dusk: '#241445',
          cream: '#F4ECD6',
          // Canonical Joestar costume tones (formalized so per-character theming stays in-system)
          blue: '#2E7BE5',
          green: '#1FB85A',
          azure: '#4D7CFF',
        },
        // ===== Per-Part (arc) signature colors =====
        arc: {
          phantom: '#C1121F',   // Part 1 — Phantom Blood
          battle: '#FF9F1C',    // Part 2 — Battle Tendency
          stardust: '#7C4DFF',  // Part 3 — Stardust Crusaders
          diamond: '#FF2D95',   // Part 4 — Diamond is Unbreakable
          golden: '#FFD700',    // Part 5 — Golden Wind
          stone: '#00F5FF',     // Part 6 — Stone Ocean
        },
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        editorial: ['"Bodoni Moda"', '"Playfair Display"', 'serif'],
        bungee: ['Bungee', 'cursive'],
        stat: ['"Saira Condensed"', 'Oswald', 'sans-serif'],
        ui: ['Poppins', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        manga: '7px 7px 0 0 rgba(5,5,5,0.92)',
        'manga-sm': '4px 4px 0 0 rgba(5,5,5,0.9)',
        'manga-gold': '6px 6px 0 0 #FFD700',
        glass: '0 8px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        neon: '0 0 18px rgba(255,215,0,0.5), 0 0 44px rgba(255,0,140,0.3)',
        'neon-cyan': '0 0 18px rgba(0,245,255,0.55), 0 0 44px rgba(0,200,151,0.3)',
      },
      dropShadow: {
        gold: ['0 0 14px rgba(255,215,0,0.55)', '0 4px 0 rgba(5,5,5,0.6)'],
        magenta: ['0 0 16px rgba(255,0,140,0.6)'],
      },
      keyframes: {
        menacing: {
          '0%, 100%': { transform: 'translateY(0) scale(1)', opacity: '0.85' },
          '50%': { transform: 'translateY(-6px) scale(1.06)', opacity: '1' },
        },
        'speed-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'gold-shimmer': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        'aura-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.08)', opacity: '0.9' },
        },
        'star-spin': {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.12)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        'tbc-bob': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(8px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)', opacity: '1' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -2px)' },
          '80%': { transform: 'translate(1px, 2px)' },
        },
        'energy-wave': {
          '0%': { transform: 'scale(0.6)', opacity: '0.7' },
          '100%': { transform: 'scale(2.2)', opacity: '0' },
        },
        'hue-rotate': {
          '0%': { filter: 'hue-rotate(0deg)' },
          '100%': { filter: 'hue-rotate(360deg)' },
        },
        scanline: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '70%, 100%': { transform: 'scale(1.6)', opacity: '0' },
        },
      },
      animation: {
        menacing: 'menacing 2.6s ease-in-out infinite',
        'speed-spin': 'speed-spin 32s linear infinite',
        'speed-spin-rev': 'speed-spin 26s linear infinite reverse',
        'gold-shimmer': 'gold-shimmer 4s linear infinite',
        'aura-pulse': 'aura-pulse 3.4s ease-in-out infinite',
        'star-spin': 'star-spin 14s ease-in-out infinite',
        'tbc-bob': 'tbc-bob 1.6s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        glitch: 'glitch 2.4s steps(2) infinite',
        'energy-wave': 'energy-wave 2.6s ease-out infinite',
        'hue-rotate': 'hue-rotate 12s linear infinite',
        scanline: 'scanline 7s linear infinite',
        'pulse-ring': 'pulse-ring 2.8s ease-out infinite',
      },
    },
  },
  plugins: [],
};
