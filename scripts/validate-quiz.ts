// Offline balance/accuracy harness for the personality assessment.
// Run: node --experimental-strip-types scripts/validate-quiz.ts
import {
  TRAIT_KEYS, characterVectors, ANSWER_LOADINGS,
  emptyVector, addDelta, correlate, rankKeys,
} from '../src/data/personality.ts';

type Key = keyof typeof characterVectors;
const KEYS = Object.keys(characterVectors) as Key[];

function centered(v: Record<string, number>) {
  const m = TRAIT_KEYS.reduce((s, t) => s + v[t], 0) / TRAIT_KEYS.length;
  return TRAIT_KEYS.map((t) => v[t] - m);
}

// --- 0. Trait mass + expected (mean) respondent --------------------------
const total: Record<string, number> = {};
TRAIT_KEYS.forEach((t) => (total[t] = 0));
const mean = emptyVector();
for (const answers of ANSWER_LOADINGS) {
  for (const d of answers) for (const t of Object.keys(d)) total[t] += (d as Record<string, number>)[t];
  // expected contribution of this question = average of its 4 answers
  for (const t of TRAIT_KEYS) {
    let s = 0;
    for (const d of answers) s += (d as Record<string, number>)[t] ?? 0;
    mean[t] += s / answers.length;
  }
}
console.log('=== Trait mass across all answers (want roughly even) ===');
console.log(TRAIT_KEYS.map((t) => `${t}:${total[t]}`).join('  '));
console.log('\n=== Character favored by the average random respondent ===');
rankKeys(mean).slice(0, 3).forEach((r) => console.log(`  ${r.key} ${r.pct}% (r=${r.r.toFixed(2)})`));

// --- 1. Pairwise character distinctiveness -------------------------------
console.log('\n=== Pairwise character vector correlations (lower = more distinct) ===');
let maxPair = -1, maxPairName = '';
for (let i = 0; i < KEYS.length; i++) {
  for (let j = i + 1; j < KEYS.length; j++) {
    const r = correlate(characterVectors[KEYS[i]], characterVectors[KEYS[j]]);
    if (r > maxPair) { maxPair = r; maxPairName = `${KEYS[i]}~${KEYS[j]}`; }
  }
}
console.log(`Most similar pair: ${maxPairName} r=${maxPair.toFixed(2)}`);

// --- 2. Archetype correctness --------------------------------------------
// Build the "ideal respondent" for a character: per question pick the answer
// whose loading best emphasises that character's distinctive (centered) traits.
function archetype(key: Key) {
  const c = characterVectors[key];
  const cen = centered(c);
  let v = emptyVector();
  for (const answers of ANSWER_LOADINGS) {
    let best = answers[0], bestScore = -Infinity;
    for (const d of answers) {
      let s = 0;
      for (const t of Object.keys(d) as (keyof typeof d)[]) {
        s += (d[t] as number) * cen[TRAIT_KEYS.indexOf(t as string)];
      }
      if (s > bestScore) { bestScore = s; best = d; }
    }
    v = addDelta(v, best);
  }
  return v;
}

console.log('\n=== Archetype accuracy (answer like X -> should match X) ===');
let correct = 0;
for (const k of KEYS) {
  const rank = rankKeys(archetype(k));
  const top = rank[0];
  const ok = top.key === k;
  if (ok) correct++;
  const gap = (rank[0].r - rank[1].r).toFixed(2);
  console.log(`${k.padEnd(9)} -> ${top.key.padEnd(9)} ${top.pct}%  gap=${gap}  ${ok ? 'OK' : '*** MISMATCH (2nd: ' + rank[1].key + ')'}`);
}
console.log(`Accuracy: ${correct}/${KEYS.length}`);

// --- 3. Monte Carlo win distribution (uniform-random respondents) --------
let seed = 2025;
const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const wins: Record<string, number> = {};
KEYS.forEach((k) => (wins[k] = 0));
const N = 300000;
for (let i = 0; i < N; i++) {
  let v = emptyVector();
  for (const answers of ANSWER_LOADINGS) v = addDelta(v, answers[Math.floor(rnd() * answers.length)]);
  wins[rankKeys(v)[0].key]++;
}
console.log(`\n=== Win distribution over ${N.toLocaleString()} random respondents (ideal = ${(100 / KEYS.length).toFixed(1)}%) ===`);
const sorted = KEYS.map((k) => [k, (wins[k] / N) * 100] as const).sort((a, b) => b[1] - a[1]);
for (const [k, pct] of sorted) console.log(`${k.padEnd(9)} ${pct.toFixed(1)}%`);
const spread = sorted[0][1] - sorted[sorted.length - 1][1];
console.log(`Spread (max-min): ${spread.toFixed(1)} pts`);
