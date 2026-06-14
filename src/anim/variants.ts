import type { Variants, Transition } from 'framer-motion';

// Shared easings
export const EASE_OUT: number[] = [0.16, 1, 0.3, 1];
export const EASE_DRAMATIC: number[] = [0.2, 0.8, 0.2, 1];

export const spring: Transition = { type: 'spring', stiffness: 260, damping: 26 };

// Generic fade / slide
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.3 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, scale: 0.96, transition: { duration: 0.3 } },
};

// Staggered groups
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.045, delayChildren: 0.04 } },
  exit: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

// Manga-panel question transition (the cinematic swap between questions)
export const mangaPanel: Variants = {
  hidden: { opacity: 0, scale: 0.92, rotateX: 12, filter: 'blur(8px)' },
  show: {
    opacity: 1, scale: 1, rotateX: 0, filter: 'blur(0px)',
    transition: { duration: 0.42, ease: EASE_DRAMATIC },
  },
  exit: {
    opacity: 0, scale: 1.04, rotateX: -10, filter: 'blur(8px)',
    transition: { duration: 0.22, ease: 'easeIn' },
  },
};

// Stand reveal (results)
export const standReveal: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.88, filter: 'blur(10px)' },
  show: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_DRAMATIC },
  },
};

// Answer / collectible card pop-in
export const cardPop: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: EASE_OUT } },
};
