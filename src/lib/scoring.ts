import type { CharacterKey, Lang, RankedCharacter, Scores } from '@/types';
import { characterKeys, getCharacters } from '@/data/characters';
import { MAX_SCORE } from '@/data/questions';

export function emptyScores(): Scores {
  return characterKeys.reduce((acc, k) => { acc[k] = 0; return acc; }, {} as Scores);
}

export function addScores(base: Scores, delta: Partial<Record<CharacterKey, number>>): Scores {
  const next = { ...base };
  (Object.keys(delta) as CharacterKey[]).forEach((k) => {
    next[k] = (next[k] ?? 0) + (delta[k] ?? 0);
  });
  return next;
}

export function subtractScores(base: Scores, delta: Partial<Record<CharacterKey, number>>): Scores {
  const next = { ...base };
  (Object.keys(delta) as CharacterKey[]).forEach((k) => {
    next[k] = Math.max(0, (next[k] ?? 0) - (delta[k] ?? 0));
  });
  return next;
}

/** Full ranking (descending) with match percentages relative to the max score. */
export function computeRanking(scores: Scores, lang: Lang): RankedCharacter[] {
  const chars = getCharacters(lang);
  return characterKeys
    .map((key) => ({
      character: chars[key],
      percentage: Math.round(((scores[key] ?? 0) / MAX_SCORE) * 100),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .map((r, i) => ({ character: r.character, percentage: r.percentage, rank: i + 1 }));
}

export function topCharacterKey(scores: Scores): CharacterKey {
  return characterKeys.reduce((a, b) => (scores[a] >= scores[b] ? a : b));
}
