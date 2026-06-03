// ============================================================
// Core domain types for the JoJo Personality Test
// ============================================================

export type Lang = 'en' | 'ar';

export type CharacterKey =
  | 'jonathan' | 'joseph' | 'jotaro' | 'josuke4'
  | 'giorno' | 'jolyne' | 'johnny' | 'josuke8';

export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'INF';

export type StandStatKey =
  | 'power' | 'speed' | 'range' | 'durability' | 'precision' | 'potential';

// The 8-axis personality radar metrics (0–100)
export type MetricKey =
  | 'determination' | 'charisma' | 'intelligence' | 'creativity'
  | 'confidence' | 'loyalty' | 'strategy' | 'willpower';

/** A string available in both supported languages. */
export type Loc = Record<Lang, string>;
/** A list of strings available in both languages. */
export type LocList = Record<Lang, string[]>;

export type Scores = Record<CharacterKey, number>;
export type StandStats = Record<StandStatKey, Grade>;
export type Metrics = Record<MetricKey, number>;

/** Raw, bilingual character definition (source of truth). */
export interface CharacterData {
  key: CharacterKey;
  name: Loc;
  part: number;
  partName: Loc;
  stand: string;          // Stand name (kept stylized, not translated)
  standType: Loc;
  title: Loc;
  description: Loc;
  quote: Loc;
  cry: Loc;
  traits: LocList;
  strengths: LocList;
  weaknesses: LocList;
  leadershipStyle: Loc;
  combatStyle: Loc;
  emotionalProfile: Loc;
  lifePhilosophy: Loc;
  color: string;          // primary theme color
  accent: string;         // secondary accent color
  image: string;
  emoji: string;
  stats: StandStats;      // 6-axis Stand stat block (A–E)
  metrics: Metrics;       // 8-axis personality radar (0–100)
}

/** Character with every localizable field resolved to one language. */
export interface LocalizedCharacter {
  key: CharacterKey;
  name: string;
  part: number;
  partName: string;
  stand: string;
  standType: string;
  title: string;
  description: string;
  quote: string;
  cry: string;
  traits: string[];
  strengths: string[];
  weaknesses: string[];
  leadershipStyle: string;
  combatStyle: string;
  emotionalProfile: string;
  lifePhilosophy: string;
  color: string;
  accent: string;
  image: string;
  emoji: string;
  stats: StandStats;
  metrics: Metrics;
}

export interface Answer {
  text: string;
  scores: Partial<Record<CharacterKey, number>>;
}

export interface Question {
  id: number;
  prompt: string;
  answers: Answer[];
}

/** One of the six JoJo Parts, used for the Destiny Path progress bar. */
export interface Arc {
  key: string;
  part: number;
  name: Loc;
  short: Loc;
  color: string;
  /** A lightened variant of `color` that clears AA contrast on the dark UI for small text. */
  textColor: string;
}

/** A character + its computed match percentage, used in rankings. */
export interface RankedCharacter {
  character: LocalizedCharacter;
  percentage: number;
  rank: number;
}
