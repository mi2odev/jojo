// Internationalization data for JoJo personality quiz
// Provides English (en) and Arabic (ar) versions of UI strings
// Questions and characters are imported directly from questions.js

export const uiTranslations = {
  en: {
    personalityTest: 'Personality Test',
    discoverLine: 'Discover which JoJo character matches your bizarre personality!',
    startAdventure: 'Start Your Bizarre Adventure',
    joinCrew: "Discover your Stand and join the legacy of the Joestar family! ⭐",
    howItWorks: 'HOW IT WORKS',
    howItWorksDesc: 'Answer 24 scenario-based questions crafted to map your choices to the core traits of each JoJo protagonist.',
    whatYouGet: 'WHAT YOU GET',
    whatYouGetDesc: 'A primary match, full ranking of all JoJo characters, personality trait breakdown, and a dynamic character view.',
    accuracyFocus: 'ACCURACY FOCUS',
    accuracyFocusDesc: 'Balanced scoring weights prevent ties and ensure each answer pushes you toward the most authentic match.',
    statsQuestions: '24 QUESTIONS',
    statsCharacters: '8 CHARACTERS',
    statsReplays: 'UNLIMITED REPLAYS',
    questionUpper: 'QUESTION',
    bestMatch: 'Best Match',
    yourCharacterIs: 'Your JoJo Character is',
    match: 'Match',
    completeAnalysis: 'Complete Personality Analysis',
    seeHowYouMatch: 'See how you match with all JoJo characters',
    personalityTraits: 'Your Personality Traits',
    takeAgain: 'Take Quiz Again',
    shareResult: 'Share Result',
    viewPoster: 'View Character Profile',
    language: 'Language',
    arabic: 'العربية',
    english: 'English',
    back: 'Back',
    onePieceQuiz: 'OnePiece Test',
    tryOnePieceQuiz: 'Try OnePiece Test'
  },
  ar: {
    personalityTest: 'اختبار شخصية جوجو',
    discoverLine: 'اكتشف أي شخصية من مغامرة جوجو الغريبة تشبه شخصيتك!',
    startAdventure: 'ابدأ مغامرتك الغريبة',
    joinCrew: 'اكتشف قوة الستاند الخاصة بك وانضم إلى إرث عائلة جوستار! ⭐🌟💎',
    howItWorks: 'كيف يعمل الاختبار',
    howItWorksDesc: 'أجب عن ٢٤ سؤالاً مبنياً على مواقف حياتية لتحديد أي من أبطال جوجو الثمانية يشبهك أكثر.',
    whatYouGet: 'ما ستحصل عليه',
    whatYouGetDesc: 'شخصية مطابقة أساسية، ترتيب شامل لجميع شخصيات جوجو، تحليل تفصيلي لسماتك، وملف شخصي تفاعلي.',
    accuracyFocus: 'التركيز على الدقة',
    accuracyFocusDesc: 'نظام أوزان متوازن يمنع التعادل ويضمن الحصول على أفضل تطابق أصيل لشخصيتك.',
    statsQuestions: '٢٤ سؤالاً',
    statsCharacters: '٨ شخصيات',
    statsReplays: 'محاولات لا محدودة',
    questionUpper: 'السؤال',
    bestMatch: 'أفضل تطابق',
    yourCharacterIs: 'شخصية جوجو المطابقة لك هي',
    match: 'نسبة التطابق',
    completeAnalysis: 'التحليل الشامل للشخصيات',
    seeHowYouMatch: 'اكتشف نسبة توافقك مع جميع أبطال جوجو الثمانية',
    personalityTraits: 'سماتك الشخصية الأساسية',
    takeAgain: 'خوض المغامرة مرة أخرى',
    shareResult: 'شارك النتيجة',
    viewPoster: 'عرض البطاقة الشخصية',
    language: 'اللغة',
    arabic: 'العربية',
    english: 'الإنجليزية',
    back: 'العودة',
    onePieceQuiz: 'اختبار ونبيس',
    tryOnePieceQuiz: 'جرب اختبار ونبيس'
  }
};

// Arabic character translations
const charactersAr = {
  jonathan: {
    name: "جوناثان جوستار",
    title: "السيد النبيل",
    description: "أنت نبيل ومشرف وتملك بوصلة أخلاقية لا تتزعزع. مثل جوناثان، تؤمن بفعل الصواب حتى لو كان صعباً، وتلهم الآخرين من خلال لطفك الصادق وشجاعتك.",
    traits: ["نبيل", "مشرف", "شجاع", "سيد محترم"]
  },
  joseph: {
    name: "جوزيف جوستار",
    title: "المحتال الماكر",
    description: "أنت ذكي وجذاب ولديك دائماً خدعة في جعبتك. مثل جوزيف، تستخدم الذكاء والارتجال للتغلب على التحديات، وطبيعتك غير المتوقعة تبقي الجميع في حالة ترقب.",
    traits: ["ذكي", "جذاب", "غير متوقع", "متكيف"]
  },
  jotaro: {
    name: "جوتارو كوجو",
    title: "المحارب الصامت",
    description: "أنت هادئ وموثوق ومركز بشكل لا يصدق. مثل جوتارو، تفضل الأفعال على الأقوال ولديك عزيمة لا تتزعزع لحماية من تهتم بهم، حتى لو لم تظهر مشاعرك دائماً.",
    traits: ["صامد", "موثوق", "حامي", "قوي الإرادة"]
  },
  josuke4: {
    name: "جوسكي هيغاشيكاتا",
    title: "صاحب القلب الذهبي",
    description: "أنت ودود ومخلص ولديك إحساس قوي بالعدالة. مثل جوسكي، أنت من النوع الذي يدافع عن الآخرين ويجمع الناس معاً، بتوازن مثالي بين القوة والرحمة.",
    traits: ["ودود", "مخلص", "عادل", "رحيم"]
  },
  giorno: {
    name: "جورنو جيوفانا",
    title: "الحلم الذهبي",
    description: "أنت طموح ومصمم ولديك رؤية واضحة لأهدافك. مثل جورنو، تملك الإرادة لتغيير العالم والحكمة لتمييز الصواب من الخطأ، ولا تساوم أبداً على مبادئك.",
    traits: ["طموح", "مصمم", "مثالي", "قائد"]
  },
  jolyne: {
    name: "جولين كوجو",
    title: "الروح الحرة",
    description: "أنت مستقل وقوي ولا تخاف من شق طريقك الخاص. مثل جولين، تعلمت الاعتماد على نفسك مع تقدير العلاقات التي تكونها، ولا تتراجع أبداً أمام التحدي.",
    traits: ["مستقل", "قوي", "صلب", "حر الروح"]
  },
  johnny: {
    name: "جوني جوستار",
    title: "الباحث",
    description: "أنت متأمل ومصمم وتفهم أن القوة الحقيقية تأتي من التغلب على الصراعات الشخصية. مثل جوني، تعلمت أن رحلة تحسين الذات لا تنتهي أبداً، وتجد المعنى في نموك الشخصي.",
    traits: ["متأمل", "مصمم", "ساعٍ للنمو", "قوي"]
  },
  josuke8: {
    name: "جوسكي هيغاشيكاتا (غابي)",
    title: "اللغز",
    description: "أنت فضولي ومتكيف ومرتاح مع عدم اليقين. مثل غابي، أنت في رحلة اكتشاف الذات، تستخدم منظورك الفريد لفهم العالم من حولك مع البقاء صادقاً لقيمك الأساسية.",
    traits: ["فضولي", "متكيف", "فريد", "غامض"]
  }
};

// Import JoJo questions and characters from questions.js
import { questions as questionsEnOriginal, characters as charactersEnOriginal } from './questions';

// Arabic questions array - all 24 questions translated
const questionsAr = [
  { id: 1, question: 'ما هو أسلوبك في مواجهة التحديات؟', answers: [
    { text: 'أواجهها بشجاعة ونبل', scores: { jonathan: 3, johnny: 2, josuke4: 1 } },
    { text: 'أستخدم الذكاء والخدع', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أبقى هادئاً ومركزاً', scores: { jotaro: 3, josuke8: 2, jonathan: 1 } },
    { text: 'أحلل الموقف بعناية', scores: { josuke8: 3, giorno: 2, jotaro: 1 } }
  ]},
  { id: 2, question: 'كيف تتعامل مع الأصدقاء؟', answers: [
    { text: 'أحميهم بكل ما أملك', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'أجعلهم يضحكون دائماً', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'أساعدهم عند الحاجة فقط', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'أكون مخلصاً لكن مستقلاً', scores: { jolyne: 3, johnny: 2, giorno: 1 } }
  ]},
  { id: 3, question: 'ما هو دافعك الأساسي في الحياة؟', answers: [
    { text: 'حماية الأبرياء', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'تحقيق أحلامي', scores: { giorno: 3, johnny: 2, jolyne: 1 } },
    { text: 'اكتشاف الحقيقة', scores: { josuke8: 3, jotaro: 2, giorno: 1 } },
    { text: 'العيش بحرية', scores: { joseph: 3, jolyne: 2, johnny: 1 } }
  ]},
  { id: 4, question: 'كيف تتصرف في المواقف الخطيرة؟', answers: [
    { text: 'أندفع للأمام بلا خوف', scores: { jonathan: 3, josuke4: 2, joseph: 1 } },
    { text: 'أخطط بسرعة وأتصرف', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أبقى هادئاً وأحلل', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أثق بحدسي', scores: { johnny: 3, jolyne: 2, jotaro: 1 } }
  ]},
  { id: 5, question: 'ما هو أسلوبك في القيادة؟', answers: [
    { text: 'أقود بالمثال والشرف', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أستخدم الكاريزما والذكاء', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أقود بالحزم والهدوء', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'أفضل العمل منفرداً', scores: { johnny: 3, jolyne: 2, jotaro: 1 } }
  ]},
  { id: 6, question: 'كيف تتعامل مع الضغط؟', answers: [
    { text: 'أبقى إيجابياً ومتفائلاً', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'أجد حلولاً إبداعية', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أركز على المهمة', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أتقبل التحدي', scores: { johnny: 3, jolyne: 2, jotaro: 1 } }
  ]},
  { id: 7, question: 'وجدت سهماً ذهبياً غامضاً. ما هو رد فعلك الأول؟', answers: [
    { text: 'أقترب منه بشجاعة ونبل', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'أحقق في أصوله وغرضه', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'أكون حذراً لكن مستعداً للتصرف', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'أثق أن القدر جلبني إليه', scores: { giorno: 2, johnny: 3, jolyne: 1 } }
  ]},
  { id: 8, question: 'أي نوع من المغامرات الغريبة يناديك؟', answers: [
    { text: 'حملة صالحة ضد الشرور القديمة', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'لغز يتعلق بظواهر خارقة للطبيعة', scores: { josuke8: 3, josuke4: 2, jolyne: 1 } },
    { text: 'رحلة لتحقيق حلم مستحيل', scores: { giorno: 3, johnny: 2, joseph: 1 } },
    { text: 'سباق عبر أراضٍ خطرة', scores: { johnny: 3, joseph: 2, jolyne: 1 } }
  ]},
  { id: 9, question: 'ما هو أسلوبك في التعلم؟', answers: [
    { text: 'التدريب المستمر', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'التجربة والخطأ', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'الملاحظة والتحليل', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'البحث عن المعرفة', scores: { josuke8: 3, giorno: 2, jotaro: 1 } }
  ]},
  { id: 10, question: 'كيف تتعامل مع النقد؟', answers: [
    { text: 'أتقبله بنعمة', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أرد بروح الدعابة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'أفكر فيه بهدوء', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أستخدمه للتحسن', scores: { giorno: 3, johnny: 2, jolyne: 1 } }
  ]},
  { id: 11, question: 'ما هو مصدر قوتك؟', answers: [
    { text: 'إيماني بالعدالة', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'حبي للحياة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'إرادتي القوية', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'رغبتي في التغيير', scores: { giorno: 3, jolyne: 2, johnny: 1 } }
  ]},
  { id: 12, question: 'إذا واجهت قناع الحجر، ماذا ستفعل؟', answers: [
    { text: 'سأدمره لمنع انتشار الشر', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'سأدرسه بعناية لفهم قوته', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'سأبقيه بعيداً عن من يسيء استخدامه', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'سأجد طريقة لاستخدام قوته بمسؤولية', scores: { giorno: 3, jolyne: 2, johnny: 1 } }
  ]},
  { id: 13, question: 'ما هو أسلوبك في الكلام؟', answers: [
    { text: 'مهذب ومحترم', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'مرح ومليء بالطاقة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'مقتضب ومباشر', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'واثق ومقنع', scores: { giorno: 3, jolyne: 2, jotaro: 1 } }
  ]},
  { id: 14, question: 'أي من معلمي جوجو ستختار للتعلم منه؟', answers: [
    { text: 'ويل زيبيلي - أستاذ الهامون النبيل', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'قيصر زيبيلي - المحارب العاطفي', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'محمد عبدول - مستخدم الستاند الحكيم', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: 'جايرو زيبيلي - أستاذ كرات الفولاذ', scores: { johnny: 3, joseph: 1, giorno: 2 } }
  ]},
  { id: 15, question: 'ما هو أسلوبك في اتخاذ القرارات؟', answers: [
    { text: 'أتبع قلبي وضميري', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أثق بحدسي', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'أحلل الخيارات بهدوء', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أفكر في العواقب', scores: { giorno: 3, josuke8: 2, jotaro: 1 } }
  ]},
  { id: 16, question: 'كيف ستتدرب لإتقان طاقة الهامون؟', answers: [
    { text: 'من خلال التنفس المنضبط والتأمل', scores: { jonathan: 3, jotaro: 2, johnny: 1 } },
    { text: 'عبر الارتجال وتكييف التقنيات', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بالتركيز الشديد والعزيمة', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: 'أفضل الاعتماد على قدرة الستاند', scores: { jolyne: 2, josuke4: 3, giorno: 1 } }
  ]},
  { id: 17, question: 'ما هو مفهومك للعدالة؟', answers: [
    { text: 'حماية الضعفاء', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'معاقبة الأشرار', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'إعطاء كل ذي حق حقه', scores: { josuke4: 3, johnny: 2, jotaro: 1 } },
    { text: 'تغيير النظام الفاسد', scores: { giorno: 3, jolyne: 2, johnny: 1 } }
  ]},
  { id: 18, question: 'كيف تتعامل مع الغضب؟', answers: [
    { text: 'أحاول السيطرة عليه', scores: { jonathan: 3, johnny: 2, josuke8: 1 } },
    { text: 'أوجهه بطريقة إيجابية', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'أكتمه بداخلي', scores: { jotaro: 3, josuke8: 2, johnny: 1 } },
    { text: 'أعبر عنه بوضوح', scores: { jolyne: 3, josuke4: 2, giorno: 1 } }
  ]},
  { id: 19, question: 'كيف ستواجه ديو براندو؟', answers: [
    { text: 'بالشرف والغضب الصالح', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'باستخدام استراتيجيات ماكرة وخدع', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'بعزيمة باردة ودقة', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'بفهم دوافعه أولاً', scores: { giorno: 1, josuke8: 3, johnny: 2 } }
  ]},
  { id: 20, question: 'كيف تنظر للمستقبل؟', answers: [
    { text: 'بتفاؤل وأمل', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'كمغامرة جديدة', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'شيء يجب الاستعداد له', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'فرصة للتغيير', scores: { giorno: 3, jolyne: 2, johnny: 1 } }
  ]},
  { id: 21, question: 'ما هو أسلوبك في العمل؟', answers: [
    { text: 'بجدية والتزام', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'بحماس وطاقة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بتركيز وكفاءة', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'بإبداع ومرونة', scores: { giorno: 3, jolyne: 2, joseph: 1 } }
  ]},
  { id: 22, question: 'كيف تتعامل مع الماضي؟', answers: [
    { text: 'أتعلم منه وأمضي قدماً', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'أتذكره بحنين', scores: { joseph: 3, johnny: 2, jolyne: 1 } },
    { text: 'أتركه وراءي', scores: { jotaro: 3, jolyne: 2, josuke8: 1 } },
    { text: 'أحاول فهمه', scores: { josuke8: 3, johnny: 2, giorno: 1 } }
  ]},
  { id: 23, question: 'ما هو أسلوبك في التعبير عن نفسك؟', answers: [
    { text: 'بصدق ونبل', scores: { jonathan: 3, johnny: 2, josuke4: 1 } },
    { text: 'بطريقة مرحة ومبدعة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بأفعالي أكثر من كلامي', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'بثقة ووضوح', scores: { giorno: 3, jolyne: 2, jotaro: 1 } }
  ]},
  { id: 24, question: 'ما الذي يحفزك للاستمرار؟', answers: [
    { text: 'حبي للعدالة', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'حبي للحياة والمغامرة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'واجبي تجاه الآخرين', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'رغبتي في التحسن', scores: { giorno: 3, johnny: 2, jolyne: 1 } }
  ]}
];

// Export functions for components to use - now with language support
export const getQuestions = (lang = 'en') => lang === 'ar' ? questionsAr : questionsEnOriginal;
export const getCharacters = (lang = 'en') => {
  if (lang === 'ar') {
    // Merge English character data with Arabic translations
    const mergedCharacters = {};
    Object.keys(charactersEnOriginal).forEach(key => {
      mergedCharacters[key] = {
        ...charactersEnOriginal[key],
        ...charactersAr[key]
      };
    });
    return mergedCharacters;
  }
  return charactersEnOriginal;
};
export const getUI = (lang) => uiTranslations[lang] || uiTranslations.en;

// Export direct references for compatibility
export const questionsEn = questionsEnOriginal;
export const charactersEn = charactersEnOriginal;
export { questionsAr, charactersAr };