import type { Arc } from '@/types';

// The JoJo "Destiny Path" — quiz progress is visualized as advancing
// through the six classic Parts. With 24 questions that's 4 per arc.
export const arcs: Arc[] = [
  { key: 'phantom',  part: 1, color: '#C1121F', textColor: '#FF6B6B', name: { en: 'Phantom Blood',        ar: 'فانتوم بلود' },        short: { en: 'Part I',   ar: 'الجزء ١' } },
  { key: 'battle',   part: 2, color: '#FF9F1C', textColor: '#FFBE5C', name: { en: 'Battle Tendency',      ar: 'باتل تندنسي' },         short: { en: 'Part II',  ar: 'الجزء ٢' } },
  { key: 'stardust', part: 3, color: '#7C4DFF', textColor: '#B39DFF', name: { en: 'Stardust Crusaders',   ar: 'ستاردست كروسيدرز' },   short: { en: 'Part III', ar: 'الجزء ٣' } },
  { key: 'diamond',  part: 4, color: '#FF2D95', textColor: '#FF7CBD', name: { en: 'Diamond is Unbreakable', ar: 'دايموند إز أنبريكابل' }, short: { en: 'Part IV',  ar: 'الجزء ٤' } },
  { key: 'golden',   part: 5, color: '#FFD700', textColor: '#FFE680', name: { en: 'Golden Wind',          ar: 'جولدن ويند' },          short: { en: 'Part V',   ar: 'الجزء ٥' } },
  { key: 'stone',    part: 6, color: '#00F5FF', textColor: '#7AFBFF', name: { en: 'Stone Ocean',          ar: 'ستون أوشن' },           short: { en: 'Part VI',  ar: 'الجزء ٦' } },
];

/** Which arc index (0–5) a given question number (1-based) belongs to. */
export function arcForQuestion(questionNumber: number, totalQuestions: number): number {
  const perArc = totalQuestions / arcs.length;
  return Math.min(arcs.length - 1, Math.floor((questionNumber - 1) / perArc));
}
