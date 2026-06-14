import type { AnswerDelta, Lang, RankedCharacter, TraitVector } from '@/types';
import { getCharacters } from '@/data/characters';
import { addDelta, emptyVector, rankKeys, subtractDelta } from '@/data/personality';

// The accumulator is a user trait-vector, not per-character points. These thin
// wrappers keep the names the rest of the app already imports.
export function emptyScores(): TraitVector {
  return emptyVector();
}

export function addScores(base: TraitVector, delta: AnswerDelta): TraitVector {
  return addDelta(base, delta);
}

export function subtractScores(base: TraitVector, delta: AnswerDelta): TraitVector {
  return subtractDelta(base, delta);
}

/** Full ranking (descending) by trait-vector similarity to each character. */
export function computeRanking(user: TraitVector, lang: Lang): RankedCharacter[] {
  const chars = getCharacters(lang);
  return rankKeys(user).map((r, i) => ({
    character: chars[r.key],
    percentage: r.pct,
    rank: i + 1,
  }));
}
