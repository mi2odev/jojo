// Normalization weight factors to balance over-represented characters.
// Derived from current total potential contributions distribution.
// These weights ensure balanced representation across all JoJo characters.
// Applied multiplicatively to raw accumulated scores at result time.
export const scoreWeights = {
  jonathan: 1.0,
  joseph: 1.0,
  jotaro: 1.0,
  josuke4: 1.0,
  giorno: 1.0,
  jolyne: 1.0,
  johnny: 1.0,
  josuke8: 1.0
};

// Max per character after weighting (24 questions * 3 max points * weight)
export const maxWeightedPerCharacter = Object.fromEntries(
  Object.entries(scoreWeights).map(([k, w]) => [k, 24 * 3 * w])
);

// Helper to apply weights and produce ranking-friendly structure
export function applyScoreWeights(rawScores) {
  const adjusted = {};
  for (const k of Object.keys(scoreWeights)) {
    const raw = rawScores[k] || 0;
    adjusted[k] = raw * scoreWeights[k];
  }
  return adjusted;
}