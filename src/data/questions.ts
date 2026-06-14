import type { Lang, Question } from '@/types';
import { ANSWER_LOADINGS } from './personality';

// ============================================================================
// QUESTION BANK — 20 behaviour/values scenarios.
// ----------------------------------------------------------------------------
// Design rules applied to every item:
//  • Measures personality, never preference (no colours, powers, or favourites).
//  • No reference to JoJo, Stands, Hamon, or named characters/events.
//  • No answer telegraphs an outcome or reads as the "right" choice.
//  • Each answer loads 2–4 personality traits (see ANSWER_LOADINGS).
//  • Answer order is identical across languages and aligns 1:1 with the
//    loadings array, so EN and AR are scored by the exact same vectors.
// The four answer texts per question are ordered to match ANSWER_LOADINGS[i].
// ============================================================================

const PROMPTS_EN: Array<{ prompt: string; answers: [string, string, string, string] }> = [
  { prompt: 'When you join a new group, what feels most natural?', answers: [
    'Quietly observe everyone before saying much.',
    'Break the ice with energy and humour.',
    'Look for who needs help and support them.',
    'Work out the goal and who can achieve it.',
  ]},
  { prompt: 'A rule is clearly getting in the way of a good outcome. You…', answers: [
    'Follow it anyway — principles exist for a reason.',
    'Break it if the result is worth it.',
    'Find a clever workaround nobody noticed.',
    'Ignore it and do things your own way.',
  ]},
  { prompt: 'What drives you the hardest?', answers: [
    'A cause greater than yourself.',
    "A goal you'll reach no matter what.",
    'Proving you can stand on your own.',
    'Curiosity — you simply want to understand.',
  ]},
  { prompt: 'Under sudden pressure, people would see you…', answers: [
    'Perfectly calm, almost unreadable.',
    'Loose and joking to stay sharp.',
    'Charging in to deal with it head-on.',
    'Improvising a solution on the spot.',
  ]},
  { prompt: 'How do you usually show you care?', answers: [
    'Drop everything to protect them.',
    "Show up and act — words aren't needed.",
    'Push them to grow stronger.',
    'Stay openly warm and loyal.',
  ]},
  { prompt: 'Your ideal way to spend real free time?', answers: [
    'Surrounded by people you enjoy.',
    'Alone, on your own terms.',
    'Exploring or learning something new.',
    'Making progress on a personal goal.',
  ]},
  { prompt: 'Someone wrongs a stranger right in front of you. You…', answers: [
    "Step in at once — it's simply right.",
    'Step in only if it touches you or yours.',
    'Read the situation, then act smartly.',
    'Call it out bluntly, no hesitation.',
  ]},
  { prompt: 'When you set a goal, you tend to…', answers: [
    'Map out every step in advance.',
    'Dive in and adapt as you go.',
    "Push relentlessly until it's done.",
    "Question whether it's even the right goal.",
  ]},
  { prompt: 'How much do you rely on others?', answers: [
    "You'd rather handle things yourself.",
    'You trust your circle completely.',
    'You lean on people but keep some guard up.',
    "You'd rather lead them than lean on them.",
  ]},
  { prompt: 'Your sense of right and wrong is…', answers: [
    'Firm and absolute — some lines stay uncrossed.',
    "Flexible — context decides what's right.",
    "About fairness — people get what they're due.",
    'About results — hard choices for a better end.',
  ]},
  { prompt: 'In a heated disagreement, you…', answers: [
    'Stay composed and let logic win.',
    'Get fired up and say what you feel.',
    'Disarm them with wit.',
    'Step back and reflect on it privately.',
  ]},
  { prompt: 'Which future excites you most?', answers: [
    "One where you've protected what you love.",
    'One you built entirely on your own terms.',
    "One where you've changed something big.",
    "One full of things you've yet to discover.",
  ]},
  { prompt: 'After failing at something important, you…', answers: [
    'Get back up at once, even stronger.',
    'Analyse exactly what went wrong.',
    'Turn the sting into fuel to prove yourself.',
    'Sit with it and reflect on its meaning.',
  ]},
  { prompt: 'People are most likely to call you…', answers: [
    'Warm and dependable.',
    'Fun and unpredictable.',
    'Cool and hard to read.',
    'Independent and a little mysterious.',
  ]},
  { prompt: 'How do you make a hard decision?', answers: [
    'Follow your conscience.',
    'Trust your gut and move fast.',
    'Weigh the outcomes coldly and choose.',
    'Think until you understand yourself.',
  ]},
  { prompt: 'Your relationship with ambition is…', answers: [
    "You're content protecting what you have.",
    'You want to achieve something extraordinary.',
    "You're driven mostly to better yourself.",
    'You go wherever life takes you.',
  ]},
  { prompt: 'When someone earns your loyalty, you…', answers: [
    'Stay devoted, no matter what.',
    'Have their back, but quietly.',
    'Defend them fiercely and out loud.',
    'Stay loyal as long as trust is mutual.',
  ]},
  { prompt: 'What unsettles you most?', answers: [
    'Letting down those who depend on you.',
    'Losing control over your own life.',
    'Failing to reach your goal.',
    'Not knowing who you really are.',
  ]},
  { prompt: 'Facing a complex problem, you trust…', answers: [
    'A careful, well-built plan.',
    'Your ability to adapt as it unfolds.',
    'Sheer persistence and directness.',
    'Curiosity to find an angle others miss.',
  ]},
  { prompt: 'At your core, what matters most?', answers: [
    "Honour and doing what's right.",
    'The people you love.',
    'Freedom to be yourself.',
    "Becoming who you're meant to be.",
  ]},
];

const PROMPTS_AR: Array<{ prompt: string; answers: [string, string, string, string] }> = [
  { prompt: 'حين تنضمّ إلى مجموعة جديدة، ما الأقرب لطبعك؟', answers: [
    'أراقب الجميع بهدوء قبل أن أتكلّم كثيراً.',
    'أكسر الجمود بالحماس والمرح.',
    'أبحث عمّن يحتاج المساعدة وأدعمه.',
    'أحدّد الهدف ومن يستطيع تحقيقه.',
  ]},
  { prompt: 'هناك قاعدة تعيق نتيجة جيدة بوضوح. ماذا تفعل؟', answers: [
    'ألتزم بها رغم ذلك — للمبادئ سبب.',
    'أكسرها إن كانت النتيجة تستحق.',
    'أجد حلاً ذكياً لم ينتبه له أحد.',
    'أتجاهلها وأفعل الأمور على طريقتي.',
  ]},
  { prompt: 'ما الذي يدفعك بأشدّ قوة؟', answers: [
    'قضية أكبر مني.',
    'هدف سأبلغه مهما كلّف.',
    'إثبات أنني أعتمد على نفسي.',
    'الفضول — أريد ببساطة أن أفهم.',
  ]},
  { prompt: 'تحت ضغط مفاجئ، كيف يراك الناس؟', answers: [
    'هادئاً تماماً، يصعب قراءتي.',
    'مرحاً وممازحاً لأبقى متيقّظاً.',
    'أندفع لمواجهته مباشرة.',
    'أرتجل حلاً في الحال.',
  ]},
  { prompt: 'كيف تُظهر اهتمامك عادةً؟', answers: [
    'أترك كل شيء لأحميهم.',
    'أحضر وأتصرّف — لا حاجة للكلام.',
    'أدفعهم ليصبحوا أقوى.',
    'أبقى دافئاً ومخلصاً بوضوح.',
  ]},
  { prompt: 'طريقتك المثالية لقضاء وقت فراغ حقيقي؟', answers: [
    'محاطاً بأناس أستمتع بصحبتهم.',
    'وحدي، على طريقتي الخاصة.',
    'أستكشف أو أتعلّم شيئاً جديداً.',
    'أتقدّم في هدف شخصي.',
  ]},
  { prompt: 'شخص يظلم غريباً أمامك مباشرة. ماذا تفعل؟', answers: [
    'أتدخّل فوراً — هذا هو الصواب ببساطة.',
    'أتدخّل فقط إن مسّني أو مسّ من يخصّني.',
    'أقرأ الموقف ثم أتصرّف بذكاء.',
    'أواجهه بصراحة دون تردّد.',
  ]},
  { prompt: 'حين تضع هدفاً، تميل إلى…', answers: [
    'رسم كل خطوة مسبقاً.',
    'الانطلاق والتأقلم أثناء السير.',
    'الدفع بلا هوادة حتى ينتهي.',
    'التساؤل إن كان الهدف صحيحاً أصلاً.',
  ]},
  { prompt: 'إلى أي مدى تعتمد على الآخرين؟', answers: [
    'أفضّل تدبّر الأمور بنفسي.',
    'أثق بدائرتي المقرّبة تماماً.',
    'أعتمد عليهم لكن أُبقي بعض الحذر.',
    'أفضّل أن أقودهم على أن أتّكئ عليهم.',
  ]},
  { prompt: 'إحساسك بالصواب والخطأ…', answers: [
    'حازم ومطلق — بعض الخطوط لا تُتجاوز.',
    'مرن — السياق يحدّد ما هو صواب.',
    'قائم على الإنصاف — لكلٍّ ما يستحق.',
    'قائم على النتائج — خيارات صعبة لغايةٍ أفضل.',
  ]},
  { prompt: 'في خلاف محتدم، أنت…', answers: [
    'أبقى رزيناً وأدع المنطق ينتصر.',
    'أنفعل وأقول ما أشعر به.',
    'أنزع سلاحهم بالبديهة والذكاء.',
    'أنسحب وأتأمّل الأمر بمفردي.',
  ]},
  { prompt: 'أي مستقبل يثير حماسك أكثر؟', answers: [
    'مستقبلٌ حميتُ فيه ما أحب.',
    'مستقبلٌ بنيتُه كلياً على طريقتي.',
    'مستقبلٌ غيّرتُ فيه شيئاً كبيراً.',
    'مستقبلٌ مليء بما لم أكتشفه بعد.',
  ]},
  { prompt: 'بعد فشلٍ في أمرٍ مهم، أنت…', answers: [
    'أنهض فوراً، أقوى من قبل.',
    'أحلّل بدقة ما الذي أخطأ.',
    'أحوّل الألم وقوداً لأثبت نفسي.',
    'أتمهّل وأتأمّل في معناه.',
  ]},
  { prompt: 'الأرجح أن يصفك الناس بأنك…', answers: [
    'دافئ ويُعتمد عليك.',
    'مرح وغير متوقّع.',
    'بارد ويصعب قراءتك.',
    'مستقل وغامض بعض الشيء.',
  ]},
  { prompt: 'كيف تتّخذ قراراً صعباً؟', answers: [
    'أتبع ضميري.',
    'أثق بحدسي وأتحرّك بسرعة.',
    'أوازن النتائج ببرود وأختار.',
    'أفكّر حتى أفهم نفسي.',
  ]},
  { prompt: 'علاقتك بالطموح…', answers: [
    'أكتفي بحماية ما أملك.',
    'أريد إنجاز شيء استثنائي.',
    'أُدفع أساساً لأطوّر نفسي.',
    'أمضي حيث تأخذني الحياة.',
  ]},
  { prompt: 'حين يكسب أحدهم ولاءك، أنت…', answers: [
    'أبقى مخلصاً مهما حدث.',
    'أسانده لكن بهدوء.',
    'أدافع عنه بشراسة وعلانية.',
    'أبقى وفياً ما دامت الثقة متبادلة.',
  ]},
  { prompt: 'ما الذي يقلقك أكثر؟', answers: [
    'أن أخذل من يعتمدون عليّ.',
    'أن أفقد السيطرة على حياتي.',
    'أن أفشل في بلوغ هدفي.',
    'ألا أعرف حقيقة من أكون.',
  ]},
  { prompt: 'أمام مشكلة معقّدة، تثق بـ…', answers: [
    'خطة محكمة ومدروسة.',
    'قدرتي على التأقلم مع تطوّرها.',
    'المثابرة الصرفة والمباشرة.',
    'فضولٍ يجد زاوية يغفل عنها الآخرون.',
  ]},
  { prompt: 'في جوهرك، ما الأهم؟', answers: [
    'الشرف وفعل الصواب.',
    'الأشخاص الذين أحب.',
    'حرية أن أكون نفسي.',
    'أن أصير من يُفترض أن أكونه.',
  ]},
];

function build(bank: Array<{ prompt: string; answers: [string, string, string, string] }>): Question[] {
  return bank.map((q, qi) => ({
    id: qi + 1,
    prompt: q.prompt,
    answers: q.answers.map((text, ai) => ({ text, scores: ANSWER_LOADINGS[qi][ai] })),
  }));
}

export const questionsEn: Question[] = build(PROMPTS_EN);
export const questionsAr: Question[] = build(PROMPTS_AR);

export function getQuestions(lang: Lang): Question[] {
  return lang === 'ar' ? questionsAr : questionsEn;
}
