import type { AnswerDelta, CharacterKey, TraitKey, TraitVector } from '@/types';

// ============================================================================
// PERSONALITY MATCHING MODEL
// ----------------------------------------------------------------------------
// This is the single source of truth for the assessment's mathematics. Both
// language question banks reference `ANSWER_LOADINGS` so scoring is identical in
// English and Arabic. The app never accumulates "character points"; instead it
// builds a user trait-vector and matches by Pearson correlation against each
// character's canon-derived trait-vector (see `rankKeys`).
// ============================================================================

export const TRAIT_KEYS: TraitKey[] = [
  'idealism', 'pragmatism', 'ambition', 'independence', 'sociability',
  'stoicism', 'adaptability', 'strategy', 'empathy', 'introspection',
];

// ----------------------------------------------------------------------------
// Character trait-vectors (0–100 per dimension), graded from canon manga/anime
// behaviour rather than fandom shorthand. Each profile's *shape* (which traits
// peak relative to the character's own mean) is what the matcher keys on.
// ----------------------------------------------------------------------------
//
// jonathan  — Phantom Blood. Selfless gentleman; an absolute moral code, dies
//             for others, bound by honour/tradition; warm and protective; not a
//             schemer and low in personal ambition (duty, not self-advancement).
//             Peaks: idealism, empathy.  Valleys: pragmatism, independence.
// joseph    — Battle Tendency. Trickster who wins by improvisation and reading
//             foes; loud, charming, hides feeling behind jokes; bends any rule.
//             Peaks: sociability, adaptability, strategy, pragmatism. Valley: stoicism.
// jotaro    — Stardust Crusaders. Reserved, blunt, acts over talks; ice-cold
//             composure; self-contained; punisher's justice; not creative.
//             Peaks: stoicism, independence, strategy. Valleys: sociability, ambition.
// josuke4   — Diamond is Unbreakable. Warm, sociable, fiercely fair; protects his
//             town/people; content rather than ambitious; restorative; hot temper.
//             Peaks: empathy, sociability, idealism. Valleys: ambition, pragmatism.
// giorno    — Golden Wind. Cold visionary; world-changing ambition pursued with
//             ruthless strategy and rule-bending; reserved, composed, unforgiving.
//             Peaks: ambition, strategy, stoicism, pragmatism. Valley: sociability.
// jolyne    — Stone Ocean. Free, defiant, self-reliant; expressive and bold;
//             resilient; fights hard for others once trust is earned.
//             Peaks: independence, adaptability, empathy, sociability. Valley: stoicism.
// johnny    — Steel Ball Run. Introspective and driven by personal redemption;
//             self-reliant to a fault, guarded, obsessive; grows through struggle.
//             Peaks: introspection, independence, ambition. Valleys: sociability, idealism.
// josuke8   — JoJolion. Curious, even-keeled investigator at peace with not
//             knowing; reads situations, adapts, searches for his own identity.
//             Peaks: introspection, adaptability, strategy, stoicism. Valley: ambition-extremes.
export const characterVectors: Record<CharacterKey, TraitVector> = {
  jonathan: { idealism: 92, pragmatism: 34, ambition: 47, independence: 42, sociability: 68, stoicism: 54, adaptability: 46, strategy: 53, empathy: 86, introspection: 47 },
  joseph:   { idealism: 45, pragmatism: 88, ambition: 50, independence: 60, sociability: 95, stoicism: 35, adaptability: 95, strategy: 85, empathy: 72, introspection: 50 },
  jotaro:   { idealism: 68, pragmatism: 65, ambition: 45, independence: 82, sociability: 28, stoicism: 96, adaptability: 58, strategy: 80, empathy: 65, introspection: 50 },
  josuke4:  { idealism: 74, pragmatism: 46, ambition: 36, independence: 46, sociability: 92, stoicism: 36, adaptability: 74, strategy: 56, empathy: 90, introspection: 44 },
  giorno:   { idealism: 82, pragmatism: 82, ambition: 98, independence: 70, sociability: 45, stoicism: 90, adaptability: 68, strategy: 95, empathy: 60, introspection: 65 },
  jolyne:   { idealism: 60, pragmatism: 62, ambition: 58, independence: 92, sociability: 78, stoicism: 42, adaptability: 82, strategy: 65, empathy: 80, introspection: 58 },
  johnny:   { idealism: 45, pragmatism: 72, ambition: 82, independence: 90, sociability: 35, stoicism: 70, adaptability: 60, strategy: 80, empathy: 62, introspection: 92 },
  josuke8:  { idealism: 52, pragmatism: 72, ambition: 50, independence: 70, sociability: 52, stoicism: 75, adaptability: 88, strategy: 82, empathy: 70, introspection: 92 },
};

// ----------------------------------------------------------------------------
// Per-question answer loadings, index-aligned with the question text banks in
// questions.ts. Each answer shifts the user along 2–4 trait dimensions. No
// answer is "correct"; each represents a distinct, realistic personality stance.
// ----------------------------------------------------------------------------
export const ANSWER_LOADINGS: AnswerDelta[][] = [
  // Q1 — role on joining a new group (stoicism vs sociability vs empathy vs strategy/ambition)
  [
    { stoicism: 3, introspection: 2, strategy: 1 },
    { sociability: 3, adaptability: 2 },
    { empathy: 3, idealism: 2 },
    { strategy: 3, ambition: 2, stoicism: 1 },
  ],
  // Q2 — a rule blocks a good outcome (idealism vs pragmatism vs adaptability vs independence)
  [
    { idealism: 3, empathy: 1 },
    { pragmatism: 3, ambition: 2 },
    { adaptability: 3, strategy: 2, pragmatism: 1 },
    { independence: 3, pragmatism: 1 },
  ],
  // Q3 — core driver (cause vs goal vs autonomy vs curiosity)
  [
    { idealism: 3, empathy: 2 },
    { ambition: 3, strategy: 1 },
    { independence: 3, ambition: 1 },
    { introspection: 3, adaptability: 1 },
  ],
  // Q4 — behaviour under sudden pressure
  [
    { stoicism: 3, strategy: 1 },
    { sociability: 3, adaptability: 2 },
    { independence: 2, empathy: 1, idealism: 1 },
    { adaptability: 3, strategy: 2 },
  ],
  // Q5 — how you show care
  [
    { empathy: 3, idealism: 2 },
    { stoicism: 3, empathy: 1, independence: 1 },
    { ambition: 2, strategy: 1, introspection: 1 },
    { sociability: 3, empathy: 2 },
  ],
  // Q6 — ideal free time
  [
    { sociability: 3 },
    { independence: 3, introspection: 2 },
    { introspection: 3, adaptability: 2 },
    { ambition: 3, strategy: 1 },
  ],
  // Q7 — a stranger is wronged in front of you
  [
    { idealism: 3, empathy: 2 },
    { independence: 2, pragmatism: 2, stoicism: 1 },
    { strategy: 3, stoicism: 1 },
    { independence: 2, sociability: 1, empathy: 1 },
  ],
  // Q8 — how you pursue a goal
  [
    { strategy: 3, ambition: 1 },
    { adaptability: 3, independence: 1 },
    { ambition: 2, stoicism: 2 },
    { introspection: 3, idealism: 1 },
  ],
  // Q9 — reliance on others
  [
    { independence: 3, stoicism: 1 },
    { empathy: 2, sociability: 2, idealism: 1 },
    { independence: 2, introspection: 1, adaptability: 1 },
    { ambition: 2, strategy: 2 },
  ],
  // Q10 — sense of right and wrong
  [
    { idealism: 3, empathy: 1 },
    { pragmatism: 3, adaptability: 1 },
    { idealism: 2, empathy: 1, stoicism: 1 },
    { pragmatism: 2, ambition: 2, strategy: 1 },
  ],
  // Q11 — in an argument
  [
    { stoicism: 3, strategy: 2 },
    { sociability: 2, empathy: 1, independence: 1 },
    { adaptability: 3, sociability: 2 },
    { introspection: 3, stoicism: 1 },
  ],
  // Q12 — the future that excites you
  [
    { empathy: 3, idealism: 1 },
    { independence: 3, ambition: 2 },
    { ambition: 3, strategy: 1, idealism: 1 },
    { introspection: 3, adaptability: 2 },
  ],
  // Q13 — after an important failure
  [
    { idealism: 2, ambition: 1, empathy: 1 },
    { strategy: 3, introspection: 1 },
    { ambition: 2, independence: 2 },
    { introspection: 3 },
  ],
  // Q14 — how people describe you
  [
    { empathy: 2, idealism: 2 },
    { sociability: 3, adaptability: 2 },
    { stoicism: 3, independence: 1 },
    { independence: 2, introspection: 2 },
  ],
  // Q15 — making a tough decision
  [
    { idealism: 3, empathy: 1 },
    { adaptability: 2, independence: 2 },
    { strategy: 3, stoicism: 2, pragmatism: 1 },
    { introspection: 3 },
  ],
  // Q16 — relationship with ambition
  [
    { empathy: 2, idealism: 1 },
    { ambition: 3, strategy: 1 },
    { introspection: 2, ambition: 2, independence: 1 },
    { adaptability: 3, introspection: 1 },
  ],
  // Q17 — when someone earns your loyalty
  [
    { idealism: 2, empathy: 2 },
    { stoicism: 2, empathy: 1, independence: 1 },
    { sociability: 2, empathy: 1, independence: 1 },
    { independence: 2, pragmatism: 1, introspection: 1 },
  ],
  // Q18 — what unsettles you most
  [
    { empathy: 3, idealism: 1 },
    { independence: 3, stoicism: 1 },
    { ambition: 3, strategy: 1 },
    { introspection: 3, adaptability: 1 },
  ],
  // Q19 — what you trust against a complex problem
  [
    { strategy: 3, ambition: 1 },
    { adaptability: 3 },
    { stoicism: 2, independence: 2 },
    { introspection: 2, strategy: 2, adaptability: 1 },
  ],
  // Q20 — what matters most at your core
  [
    { idealism: 3, empathy: 1 },
    { empathy: 3, sociability: 1 },
    { independence: 3, adaptability: 1 },
    { ambition: 2, introspection: 2 },
  ],
];

// ----------------------------------------------------------------------------
// Vector helpers + similarity matcher
// ----------------------------------------------------------------------------
export function emptyVector(): TraitVector {
  return TRAIT_KEYS.reduce((acc, t) => { acc[t] = 0; return acc; }, {} as TraitVector);
}

export function addDelta(base: TraitVector, delta: AnswerDelta): TraitVector {
  const next = { ...base };
  (Object.keys(delta) as TraitKey[]).forEach((t) => { next[t] = (next[t] ?? 0) + (delta[t] ?? 0); });
  return next;
}

export function subtractDelta(base: TraitVector, delta: AnswerDelta): TraitVector {
  const next = { ...base };
  (Object.keys(delta) as TraitKey[]).forEach((t) => { next[t] = (next[t] ?? 0) - (delta[t] ?? 0); });
  return next;
}

/**
 * Pearson correlation between two trait-vectors (used for diagnostics, e.g.
 * measuring how distinct two character profiles are). Returns [-1, 1].
 */
export function correlate(a: TraitVector, b: TraitVector): number {
  const n = TRAIT_KEYS.length;
  let ma = 0, mb = 0;
  for (const t of TRAIT_KEYS) { ma += a[t]; mb += b[t]; }
  ma /= n; mb /= n;
  let num = 0, da = 0, db = 0;
  for (const t of TRAIT_KEYS) {
    const x = a[t] - ma, y = b[t] - mb;
    num += x * y; da += x * x; db += y * y;
  }
  if (da === 0 || db === 0) return 0;
  return num / Math.sqrt(da * db);
}

// ----------------------------------------------------------------------------
// Whitening statistics (computed once at module load).
//
// The bank loads some traits far more than others, which would bias every
// result toward characters who peak on the heavy traits. To neutralise that we
// z-score each trait into a common frame:
//   • USER_MEAN/USER_STD — the closed-form mean and standard deviation of the
//     user accumulator per trait under uniform-random answering. Standardising
//     the user against these maps "average answering" to the origin, so no
//     character is favoured a priori — the system self-balances regardless of
//     how heavily a trait happens to be sampled.
//   • CHAR_MEAN/CHAR_STD — per-trait mean/SD across the eight characters, so a
//     trait on which characters barely differ can't dominate the match.
// Matching is then cosine similarity between the two standardised profiles.
// ----------------------------------------------------------------------------
const USER_MEAN: TraitVector = emptyVector();
const USER_VAR: TraitVector = emptyVector();
for (const answers of ANSWER_LOADINGS) {
  const m = answers.length;
  for (const t of TRAIT_KEYS) {
    let s = 0, s2 = 0;
    for (const d of answers) { const v = d[t] ?? 0; s += v; s2 += v * v; }
    const avg = s / m;
    USER_MEAN[t] += avg;            // expected per-question contribution
    USER_VAR[t] += s2 / m - avg * avg; // per-question variance (questions independent)
  }
}
const USER_STD: TraitVector = TRAIT_KEYS.reduce((acc, t) => {
  acc[t] = Math.sqrt(USER_VAR[t]) || 1; return acc;
}, {} as TraitVector);

const CHAR_KEYS = Object.keys(characterVectors) as CharacterKey[];
const CHAR_MEAN: TraitVector = emptyVector();
const CHAR_STD: TraitVector = emptyVector();
for (const t of TRAIT_KEYS) {
  let s = 0; for (const k of CHAR_KEYS) s += characterVectors[k][t];
  const m = s / CHAR_KEYS.length;
  let v = 0; for (const k of CHAR_KEYS) v += (characterVectors[k][t] - m) ** 2;
  CHAR_MEAN[t] = m;
  CHAR_STD[t] = Math.sqrt(v / CHAR_KEYS.length) || 1;
}
const CHAR_Z: Record<CharacterKey, number[]> = CHAR_KEYS.reduce((acc, k) => {
  acc[k] = TRAIT_KEYS.map((t) => (characterVectors[k][t] - CHAR_MEAN[t]) / CHAR_STD[t]);
  return acc;
}, {} as Record<CharacterKey, number[]>);

function standardizeUser(u: TraitVector): number[] {
  return TRAIT_KEYS.map((t) => ((u[t] ?? 0) - USER_MEAN[t]) / USER_STD[t]);
}

function cosine(a: number[], b: number[]): number {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) { dot += a[i] * b[i]; na += a[i] * a[i]; nb += b[i] * b[i]; }
  if (na === 0 || nb === 0) return 0;
  return dot / Math.sqrt(na * nb);
}

/**
 * Rank every character against a user's trait-vector by cosine similarity in
 * the whitened trait space. The match percentage maps similarity s∈[-1,1] onto
 * a friendly 5–99% scale (s=1 → 99, s=0 → 50). Sorted best-first.
 */
export function rankKeys(user: TraitVector): Array<{ key: CharacterKey; pct: number; r: number }> {
  const uz = standardizeUser(user);
  return CHAR_KEYS
    .map((key) => {
      const r = cosine(uz, CHAR_Z[key]);
      const pct = Math.max(5, Math.min(99, Math.round(r * 49 + 50)));
      return { key, pct, r };
    })
    .sort((a, b) => b.r - a.r);
}
