import type { Lang, Loc, MetricKey, StandStatKey } from '@/types';

/** Resolve a bilingual value to the active language. */
export function t(loc: Loc, lang: Lang): string {
  return loc[lang];
}

export interface UIStrings {
  dir: 'ltr' | 'rtl';
  brandKicker: string;
  heroTitle: string;
  heroSubtitle: string;
  cta: string;
  skip: string;
  enterHint: string;
  onePieceQuiz: string;
  tryOnePieceQuiz: string;
  statsQuestions: string;
  statsCharacters: string;
  statsReplays: string;
  howItWorks: string; howItWorksDesc: string;
  whatYouGet: string; whatYouGetDesc: string;
  accuracyFocus: string; accuracyFocusDesc: string;
  questionUpper: string;
  back: string;
  answer: string;
  destinyPath: string;
  yourStandAwakens: string;
  yourCharacterIs: string;
  match: string;
  standLabel: string;
  partLabel: string;
  typeLabel: string;
  battleCry: string;
  standStats: string;
  personalityRadar: string;
  personalityOverview: string;
  strengths: string;
  weaknesses: string;
  leadershipStyle: string;
  combatStyle: string;
  emotionalProfile: string;
  lifePhilosophy: string;
  traits: string;
  completeAnalysis: string;
  seeHowYouMatch: string;
  standCollection: string;
  collectionSub: string;
  bestMatch: string;
  takeAgain: string;
  shareResult: string;
  downloadCard: string;
  viewProfile: string;
  close: string;
  toBeContinued: string;
  switchLanguage: string;
  loading: string;
  shareCopied: string;
  shareTitle: string;
  scanToDiscover: string;
  cardCredit: string;
  statLabels: Record<StandStatKey, string>;
  statAbbrev: Record<StandStatKey, string>;
  metricLabels: Record<MetricKey, string>;
  metricAbbrev: Record<MetricKey, string>;
}

const en: UIStrings = {
  dir: 'ltr',
  brandKicker: "JoJo's Bizarre Adventure",
  heroTitle: 'DISCOVER YOUR STAND DESTINY',
  heroSubtitle: 'Find the JoJo character whose spirit mirrors your own.',
  cta: 'AWAKEN YOUR STAND',
  skip: 'Skip',
  enterHint: 'A bizarre journey awaits',
  onePieceQuiz: 'One Piece Test',
  tryOnePieceQuiz: 'Try the One Piece personality test',
  statsQuestions: '20 Questions',
  statsCharacters: '8 Stands',
  statsReplays: 'Unlimited Replays',
  howItWorks: 'How It Works',
  howItWorksDesc: 'Answer 20 cinematic scenarios crafted to map your choices onto the core spirit of each JoJo protagonist.',
  whatYouGet: 'What You Get',
  whatYouGetDesc: 'A primary Stand match, a full ranking, an 8-axis personality radar, and a shareable character profile card.',
  accuracyFocus: 'Accuracy Focus',
  accuracyFocusDesc: 'Balanced scoring weights prevent ties and push every answer toward your most authentic match.',
  questionUpper: 'Question',
  back: 'Back',
  answer: 'Answer',
  destinyPath: 'Destiny Path',
  yourStandAwakens: 'Your Stand Awakens',
  yourCharacterIs: 'Your JoJo Character is',
  match: 'Match',
  standLabel: 'Stand',
  partLabel: 'Part',
  typeLabel: 'Type',
  battleCry: 'Battle Cry',
  standStats: 'Stand Stats',
  personalityRadar: 'Personality Analysis',
  personalityOverview: 'Personality Overview',
  strengths: 'Strengths',
  weaknesses: 'Weaknesses',
  leadershipStyle: 'Leadership Style',
  combatStyle: 'Combat Style',
  emotionalProfile: 'Emotional Profile',
  lifePhilosophy: 'Life Philosophy',
  traits: 'Personality Traits',
  completeAnalysis: 'Stand Compatibility',
  seeHowYouMatch: 'See how your spirit matches every JoJo',
  standCollection: 'Stand Collection',
  collectionSub: 'Eight legends. One bizarre destiny.',
  bestMatch: 'Best Match',
  takeAgain: 'Take Quiz Again',
  shareResult: 'Share Result',
  downloadCard: 'Download Card',
  viewProfile: 'View Profile',
  close: 'Close',
  toBeContinued: 'To Be Continued',
  switchLanguage: 'Switch language to Arabic',
  loading: 'Awakening…',
  shareCopied: 'Result copied to clipboard!',
  shareTitle: 'JoJo Personality Test Result',
  scanToDiscover: 'Scan to discover your Stand',
  cardCredit: '© 2026 mi2o · Discover your Stand',
  statLabels: { power: 'Power', speed: 'Speed', range: 'Range', durability: 'Durability', precision: 'Precision', potential: 'Potential' },
  statAbbrev: { power: 'PWR', speed: 'SPD', range: 'RNG', durability: 'DUR', precision: 'PRC', potential: 'DEV' },
  metricLabels: { determination: 'Determination', charisma: 'Charisma', intelligence: 'Intelligence', creativity: 'Creativity', confidence: 'Confidence', loyalty: 'Loyalty', strategy: 'Strategy', willpower: 'Willpower' },
  metricAbbrev: { determination: 'DET', charisma: 'CHA', intelligence: 'INT', creativity: 'CRE', confidence: 'CNF', loyalty: 'LOY', strategy: 'STR', willpower: 'WIL' },
};

const ar: UIStrings = {
  dir: 'rtl',
  brandKicker: 'مغامرة جوجو الغريبة',
  heroTitle: 'اكتشف قدر الستاند الخاص بك',
  heroSubtitle: 'اعثر على شخصية جوجو التي تعكس روحك.',
  cta: 'أيقظ الستاند بداخلك',
  skip: 'تخطّي',
  enterHint: 'مغامرة غريبة بانتظارك',
  onePieceQuiz: 'اختبار ونبيس',
  tryOnePieceQuiz: 'جرّب اختبار شخصية ونبيس',
  statsQuestions: '٢٠ سؤالاً',
  statsCharacters: '٨ ستاندات',
  statsReplays: 'محاولات لا محدودة',
  howItWorks: 'كيف يعمل',
  howItWorksDesc: 'أجب عن ٢٠ موقفاً سينمائياً صُمّمت لربط اختياراتك بروح كل بطل من أبطال جوجو.',
  whatYouGet: 'ما ستحصل عليه',
  whatYouGetDesc: 'ستاند مطابق أساسي، ترتيب كامل، رادار شخصية من ٨ محاور، وبطاقة شخصية قابلة للمشاركة.',
  accuracyFocus: 'التركيز على الدقة',
  accuracyFocusDesc: 'أوزان متوازنة تمنع التعادل وتدفع كل إجابة نحو أصدق تطابق لك.',
  questionUpper: 'السؤال',
  back: 'العودة',
  answer: 'الإجابة',
  destinyPath: 'مسار القدر',
  yourStandAwakens: 'لقد استيقظ الستاند الخاص بك',
  yourCharacterIs: 'شخصية جوجو المطابقة لك هي',
  match: 'نسبة التطابق',
  standLabel: 'ستاند',
  partLabel: 'الجزء',
  typeLabel: 'النوع',
  battleCry: 'صرخة المعركة',
  standStats: 'إحصائيات الستاند',
  personalityRadar: 'تحليل الشخصية',
  personalityOverview: 'نظرة عامة على الشخصية',
  strengths: 'نقاط القوة',
  weaknesses: 'نقاط الضعف',
  leadershipStyle: 'أسلوب القيادة',
  combatStyle: 'أسلوب القتال',
  emotionalProfile: 'الملف العاطفي',
  lifePhilosophy: 'فلسفة الحياة',
  traits: 'سماتك الشخصية',
  completeAnalysis: 'توافق الستاندات',
  seeHowYouMatch: 'اكتشف توافق روحك مع كل أبطال جوجو',
  standCollection: 'مجموعة الستاندات',
  collectionSub: 'ثمانية أساطير. قدرٌ غريب واحد.',
  bestMatch: 'أفضل تطابق',
  takeAgain: 'أعد الاختبار',
  shareResult: 'شارك النتيجة',
  downloadCard: 'حمّل البطاقة',
  viewProfile: 'عرض الملف',
  close: 'إغلاق',
  toBeContinued: 'يتبع',
  switchLanguage: 'التبديل إلى الإنجليزية',
  loading: '…استيقاظ',
  shareCopied: 'تم نسخ النتيجة إلى الحافظة!',
  shareTitle: 'نتيجة اختبار شخصية جوجو',
  scanToDiscover: 'امسح لاكتشاف ستاندك',
  cardCredit: '© 2026 mi2o · اكتشف ستاندك',
  statLabels: { power: 'القوة', speed: 'السرعة', range: 'المدى', durability: 'المتانة', precision: 'الدقة', potential: 'الإمكانات' },
  statAbbrev: { power: 'قوة', speed: 'سرعة', range: 'مدى', durability: 'متانة', precision: 'دقة', potential: 'تطور' },
  metricLabels: { determination: 'العزيمة', charisma: 'الكاريزما', intelligence: 'الذكاء', creativity: 'الإبداع', confidence: 'الثقة', loyalty: 'الولاء', strategy: 'التخطيط', willpower: 'قوة الإرادة' },
  metricAbbrev: { determination: 'عزيمة', charisma: 'كاريزما', intelligence: 'ذكاء', creativity: 'إبداع', confidence: 'ثقة', loyalty: 'ولاء', strategy: 'تخطيط', willpower: 'إرادة' },
};

export const uiStrings: Record<Lang, UIStrings> = { en, ar };

export function getUI(lang: Lang): UIStrings {
  return uiStrings[lang] ?? en;
}
