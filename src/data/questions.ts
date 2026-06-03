import type { Lang, Question } from '@/types';

// English question bank — 24 scenario questions.
export const questionsEn: Question[] = [
  { id: 1, prompt: 'What role do you usually take in a group?', answers: [
    { text: 'The noble leader who inspires honor', scores: { jonathan: 3, giorno: 2, jotaro: 1 } },
    { text: 'The reliable ally who protects others', scores: { josuke4: 3, jotaro: 2, jonathan: 1 } },
    { text: 'The clever strategist with backup plans', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'The independent one who follows their path', scores: { johnny: 3, jolyne: 2, josuke8: 1 } },
  ]},
  { id: 2, prompt: "What's your ideal adventure?", answers: [
    { text: 'A noble quest to defeat ancient evil', scores: { jonathan: 3, giorno: 2, jotaro: 1 } },
    { text: 'A thrilling journey with clever tricks', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'A mysterious investigation into bizarre events', scores: { jotaro: 3, josuke8: 2, jolyne: 1 } },
    { text: 'A personal journey of self-discovery', scores: { johnny: 3, giorno: 2, josuke8: 1 } },
  ]},
  { id: 3, prompt: 'How do you react under pressure?', answers: [
    { text: 'Stay composed and analyze the situation', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'Face it with unwavering courage', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Use wit and improvisation to overcome it', scores: { joseph: 3, jolyne: 2, giorno: 1 } },
    { text: 'Trust in fate and my inner strength', scores: { johnny: 3, jonathan: 1, josuke8: 1 } },
  ]},
  { id: 4, prompt: 'Pick a favorite color or vibe:', answers: [
    { text: 'Blue — Noble and determined', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Purple — Mysterious and powerful', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'Gold — Ambitious and righteous', scores: { giorno: 3, joseph: 2, jonathan: 1 } },
    { text: 'Green — Natural and hopeful', scores: { jolyne: 2, johnny: 3, josuke8: 2 } },
  ]},
  { id: 5, prompt: "What's your strength in a crisis?", answers: [
    { text: 'Raw power and unwavering resolve', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Strategic thinking and clever tactics', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'Adaptability and quick thinking', scores: { jolyne: 3, joseph: 2, josuke8: 1 } },
    { text: 'Determination to overcome any obstacle', scores: { johnny: 3, giorno: 2, jonathan: 1 } },
  ]},
  { id: 6, prompt: 'How do you handle conflict?', answers: [
    { text: 'Confront it with honor and dignity', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Outwit opponents with clever strategies', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'Stay calm and strike when necessary', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'Find unconventional solutions', scores: { jolyne: 2, johnny: 3, joseph: 1 } },
  ]},
  { id: 7, prompt: "You find a mysterious golden arrow. What's your instinct?", answers: [
    { text: 'Approach it with righteous courage', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Investigate its origins and purpose', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'Be cautious but ready to act', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'Trust that fate brought you to it', scores: { giorno: 2, johnny: 3, jolyne: 1 } },
  ]},
  { id: 8, prompt: 'What kind of Bizarre Adventure calls to you?', answers: [
    { text: 'A righteous crusade against ancient evil', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'A mystery involving supernatural phenomena', scores: { josuke8: 3, josuke4: 2, jolyne: 1 } },
    { text: 'A journey to achieve an impossible dream', scores: { giorno: 3, johnny: 2, joseph: 1 } },
    { text: 'A race across dangerous territories', scores: { johnny: 3, joseph: 2, jolyne: 1 } },
  ]},
  { id: 9, prompt: "What's your biggest fear?", answers: [
    { text: 'Failing to protect those I care about', scores: { jonathan: 3, jotaro: 2, josuke4: 2 } },
    { text: 'Being unable to achieve my destiny', scores: { giorno: 3, johnny: 2, jolyne: 1 } },
    { text: 'Losing control of my own fate', scores: { jolyne: 3, joseph: 2, josuke8: 1 } },
    { text: 'Being misunderstood or alone', scores: { johnny: 2, jotaro: 1, josuke8: 3 } },
  ]},
  { id: 10, prompt: 'What type of Stand ability would suit you?', answers: [
    { text: 'Raw power that overwhelms enemies', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Versatile abilities with many applications', scores: { joseph: 2, giorno: 3, jolyne: 2 } },
    { text: 'Precise control over specific elements', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'Unique powers that defy expectations', scores: { johnny: 3, joseph: 1, jolyne: 2 } },
  ]},
  { id: 11, prompt: 'How do you make important decisions?', answers: [
    { text: 'Follow my moral compass and honor', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Analyze the situation strategically', scores: { giorno: 3, joseph: 2, jolyne: 1 } },
    { text: 'Trust my instincts and experience', scores: { jotaro: 2, joseph: 3, johnny: 1 } },
    { text: 'Consider all possible outcomes', scores: { jolyne: 2, josuke8: 3, giorno: 1 } },
  ]},
  { id: 12, prompt: 'If you encountered a Stone Mask, what would you do?', answers: [
    { text: 'Destroy it to prevent evil from spreading', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Study it carefully to understand its power', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'Keep it away from those who would misuse it', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'Find a way to use its power responsibly', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 13, prompt: 'How do you show you care about someone?', answers: [
    { text: 'Stand by them with unwavering loyalty', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Protect them from any danger', scores: { jotaro: 3, jonathan: 2, jolyne: 1 } },
    { text: 'Help them discover their own strength', scores: { joseph: 2, giorno: 3, johnny: 1 } },
    { text: 'Understand them without judgment', scores: { josuke8: 3, jolyne: 2, giorno: 1 } },
  ]},
  { id: 14, prompt: 'Which JoJo mentor would you choose to learn from?', answers: [
    { text: 'Will Zeppeli — the noble Hamon master', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'Caesar Zeppeli — the passionate fighter', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'Muhammad Avdol — the wise Stand user', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: 'Gyro Zeppeli — the Steel Ball master', scores: { johnny: 3, joseph: 1, giorno: 2 } },
  ]},
  { id: 15, prompt: 'How do you handle being criticized?', answers: [
    { text: 'Consider it with dignity and grace', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'Analyze it objectively and adapt', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'Turn it into motivation to prove them wrong', scores: { joseph: 2, jolyne: 3, johnny: 1 } },
    { text: 'Reflect on it privately and learn', scores: { johnny: 3, josuke8: 2, jotaro: 1 } },
  ]},
  { id: 16, prompt: 'How would you train to master Hamon energy?', answers: [
    { text: 'Through disciplined breathing and meditation', scores: { jonathan: 3, jotaro: 2, johnny: 1 } },
    { text: 'By improvising and adapting techniques', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'With intense focus and determination', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: "I'd prefer to rely on my Stand ability", scores: { jolyne: 2, josuke4: 3, giorno: 1 } },
  ]},
  { id: 17, prompt: 'How do you deal with failure?', answers: [
    { text: 'Rise again with even stronger resolve', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Learn from it and strategize better', scores: { giorno: 3, joseph: 2, jolyne: 1 } },
    { text: 'Use it as fuel to become stronger', scores: { jolyne: 2, johnny: 3, jotaro: 1 } },
    { text: "Accept it as part of life's journey", scores: { josuke8: 3, johnny: 2, jonathan: 1 } },
  ]},
  { id: 18, prompt: "What's your communication style?", answers: [
    { text: 'Honest and honorable', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Brief but meaningful', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'Clever and sometimes theatrical', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'Passionate when it matters', scores: { jolyne: 2, josuke4: 3, giorno: 1 } },
  ]},
  { id: 19, prompt: 'How would you confront Dio Brando?', answers: [
    { text: 'With honor and righteous fury', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Using cunning strategies and tricks', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'With cold determination and precision', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'By understanding his motivations first', scores: { giorno: 1, josuke8: 3, johnny: 2 } },
  ]},
  { id: 20, prompt: 'How do you handle stress?', answers: [
    { text: 'Face it head-on with courage', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'Find creative solutions to overcome it', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'Stay calm and focused under pressure', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'Turn inward and find inner strength', scores: { johnny: 3, josuke8: 2, jonathan: 1 } },
  ]},
  { id: 21, prompt: 'How do you view the past?', answers: [
    { text: 'I honor my ancestors and their legacy', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'The past shapes who I am today', scores: { jolyne: 2, joseph: 3, giorno: 1 } },
    { text: "I've made peace with my past", scores: { johnny: 3, josuke8: 2, jotaro: 1 } },
    { text: 'Some wounds from the past still affect me', scores: { josuke8: 2, jolyne: 3, johnny: 2 } },
  ]},
  { id: 22, prompt: "What's your approach to friendship?", answers: [
    { text: 'Friendship is a sacred bond to protect', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: "I'm quietly loyal but always there", scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'I bring energy and joy to friendships', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'I value genuine connections over many acquaintances', scores: { giorno: 2, jolyne: 3, johnny: 2 } },
  ]},
  { id: 23, prompt: "What's your philosophy on life?", answers: [
    { text: 'True strength comes from righteousness', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Destiny can be changed through willpower', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
    { text: 'Adaptability is the key to survival', scores: { joseph: 3, jolyne: 2, josuke8: 1 } },
    { text: 'Find meaning in your own journey', scores: { johnny: 3, jotaro: 1, josuke8: 2 } },
  ]},
  { id: 24, prompt: 'How do you celebrate victories?', answers: [
    { text: 'Humbly acknowledge the victory', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'Quietly appreciate the moment', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'Share the triumph with companions', scores: { joseph: 2, josuke4: 3, jolyne: 2 } },
    { text: 'Prepare for whatever comes next', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
];

// Arabic question bank — 24 native questions (parallel scoring model).
export const questionsAr: Question[] = [
  { id: 1, prompt: 'ما هو أسلوبك في مواجهة التحديات؟', answers: [
    { text: 'أواجهها بشجاعة ونبل', scores: { jonathan: 3, johnny: 2, josuke4: 1 } },
    { text: 'أستخدم الذكاء والخدع', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أبقى هادئاً ومركزاً', scores: { jotaro: 3, josuke8: 2, jonathan: 1 } },
    { text: 'أحلل الموقف بعناية', scores: { josuke8: 3, giorno: 2, jotaro: 1 } },
  ]},
  { id: 2, prompt: 'كيف تتعامل مع الأصدقاء؟', answers: [
    { text: 'أحميهم بكل ما أملك', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'أجعلهم يضحكون دائماً', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'أساعدهم عند الحاجة فقط', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'أكون مخلصاً لكن مستقلاً', scores: { jolyne: 3, johnny: 2, giorno: 1 } },
  ]},
  { id: 3, prompt: 'ما هو دافعك الأساسي في الحياة؟', answers: [
    { text: 'حماية الأبرياء', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'تحقيق أحلامي', scores: { giorno: 3, johnny: 2, jolyne: 1 } },
    { text: 'اكتشاف الحقيقة', scores: { josuke8: 3, jotaro: 2, giorno: 1 } },
    { text: 'العيش بحرية', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 4, prompt: 'كيف تتصرف في المواقف الخطيرة؟', answers: [
    { text: 'أندفع للأمام بلا خوف', scores: { jonathan: 3, josuke4: 2, joseph: 1 } },
    { text: 'أخطط بسرعة وأتصرف', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أبقى هادئاً وأحلل', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أثق بحدسي', scores: { johnny: 3, jolyne: 2, jotaro: 1 } },
  ]},
  { id: 5, prompt: 'ما هو أسلوبك في القيادة؟', answers: [
    { text: 'أقود بالمثال والشرف', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أستخدم الكاريزما والذكاء', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أقود بالحزم والهدوء', scores: { jotaro: 3, giorno: 2, josuke8: 1 } },
    { text: 'أفضل العمل منفرداً', scores: { johnny: 3, jolyne: 2, jotaro: 1 } },
  ]},
  { id: 6, prompt: 'كيف تتعامل مع الضغط؟', answers: [
    { text: 'أبقى إيجابياً ومتفائلاً', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'أجد حلولاً إبداعية', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'أركز على المهمة', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أتقبل التحدي', scores: { johnny: 3, jolyne: 2, jotaro: 1 } },
  ]},
  { id: 7, prompt: 'وجدت سهماً ذهبياً غامضاً. ما هو رد فعلك الأول؟', answers: [
    { text: 'أقترب منه بشجاعة ونبل', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'أحقق في أصوله وغرضه', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'أكون حذراً لكن مستعداً للتصرف', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'أثق أن القدر جلبني إليه', scores: { giorno: 2, johnny: 3, jolyne: 1 } },
  ]},
  { id: 8, prompt: 'أي نوع من المغامرات الغريبة يناديك؟', answers: [
    { text: 'حملة صالحة ضد الشرور القديمة', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'لغز يتعلق بظواهر خارقة للطبيعة', scores: { josuke8: 3, josuke4: 2, jolyne: 1 } },
    { text: 'رحلة لتحقيق حلم مستحيل', scores: { giorno: 3, johnny: 2, joseph: 1 } },
    { text: 'سباق عبر أراضٍ خطرة', scores: { johnny: 3, joseph: 2, jolyne: 1 } },
  ]},
  { id: 9, prompt: 'ما هو أسلوبك في التعلم؟', answers: [
    { text: 'التدريب المستمر', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'التجربة والخطأ', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'الملاحظة والتحليل', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'البحث عن المعرفة', scores: { josuke8: 3, giorno: 2, jotaro: 1 } },
  ]},
  { id: 10, prompt: 'كيف تتعامل مع النقد؟', answers: [
    { text: 'أتقبله بنعمة', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أرد بروح الدعابة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'أفكر فيه بهدوء', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أستخدمه للتحسن', scores: { giorno: 3, johnny: 2, jolyne: 1 } },
  ]},
  { id: 11, prompt: 'ما هو مصدر قوتك؟', answers: [
    { text: 'إيماني بالعدالة', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'حبي للحياة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'إرادتي القوية', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'رغبتي في التغيير', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 12, prompt: 'إذا واجهت قناع الحجر، ماذا ستفعل؟', answers: [
    { text: 'سأدمره لمنع انتشار الشر', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'سأدرسه بعناية لفهم قوته', scores: { joseph: 2, josuke8: 3, giorno: 1 } },
    { text: 'سأبقيه بعيداً عن من يسيء استخدامه', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'سأجد طريقة لاستخدام قوته بمسؤولية', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 13, prompt: 'ما هو أسلوبك في الكلام؟', answers: [
    { text: 'مهذب ومحترم', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'مرح ومليء بالطاقة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'مقتضب ومباشر', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'واثق ومقنع', scores: { giorno: 3, jolyne: 2, jotaro: 1 } },
  ]},
  { id: 14, prompt: 'أي من معلمي جوجو ستختار للتعلم منه؟', answers: [
    { text: 'ويل زيبيلي - أستاذ الهامون النبيل', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'قيصر زيبيلي - المحارب العاطفي', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'محمد عبدول - مستخدم الستاند الحكيم', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: 'جايرو زيبيلي - أستاذ كرات الفولاذ', scores: { johnny: 3, joseph: 1, giorno: 2 } },
  ]},
  { id: 15, prompt: 'ما هو أسلوبك في اتخاذ القرارات؟', answers: [
    { text: 'أتبع قلبي وضميري', scores: { jonathan: 3, josuke4: 2, johnny: 1 } },
    { text: 'أثق بحدسي', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'أحلل الخيارات بهدوء', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'أفكر في العواقب', scores: { giorno: 3, josuke8: 2, jotaro: 1 } },
  ]},
  { id: 16, prompt: 'كيف ستتدرب لإتقان طاقة الهامون؟', answers: [
    { text: 'من خلال التنفس المنضبط والتأمل', scores: { jonathan: 3, jotaro: 2, johnny: 1 } },
    { text: 'عبر الارتجال وتكييف التقنيات', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بالتركيز الشديد والعزيمة', scores: { jotaro: 2, giorno: 3, josuke8: 1 } },
    { text: 'أفضل الاعتماد على قدرة الستاند', scores: { jolyne: 2, josuke4: 3, giorno: 1 } },
  ]},
  { id: 17, prompt: 'ما هو مفهومك للعدالة؟', answers: [
    { text: 'حماية الضعفاء', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'معاقبة الأشرار', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'إعطاء كل ذي حق حقه', scores: { josuke4: 3, johnny: 2, jotaro: 1 } },
    { text: 'تغيير النظام الفاسد', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 18, prompt: 'كيف تتعامل مع الغضب؟', answers: [
    { text: 'أحاول السيطرة عليه', scores: { jonathan: 3, johnny: 2, josuke8: 1 } },
    { text: 'أوجهه بطريقة إيجابية', scores: { joseph: 3, josuke4: 2, jolyne: 1 } },
    { text: 'أكتمه بداخلي', scores: { jotaro: 3, josuke8: 2, johnny: 1 } },
    { text: 'أعبر عنه بوضوح', scores: { jolyne: 3, josuke4: 2, giorno: 1 } },
  ]},
  { id: 19, prompt: 'كيف ستواجه ديو براندو؟', answers: [
    { text: 'بالشرف والغضب الصالح', scores: { jonathan: 3, josuke4: 2, jotaro: 1 } },
    { text: 'باستخدام استراتيجيات ماكرة وخدع', scores: { joseph: 3, giorno: 2, jolyne: 1 } },
    { text: 'بعزيمة باردة ودقة', scores: { jotaro: 3, giorno: 2, jolyne: 1 } },
    { text: 'بفهم دوافعه أولاً', scores: { giorno: 1, josuke8: 3, johnny: 2 } },
  ]},
  { id: 20, prompt: 'كيف تنظر للمستقبل؟', answers: [
    { text: 'بتفاؤل وأمل', scores: { jonathan: 3, joseph: 2, josuke4: 1 } },
    { text: 'كمغامرة جديدة', scores: { joseph: 3, jolyne: 2, johnny: 1 } },
    { text: 'شيء يجب الاستعداد له', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'فرصة للتغيير', scores: { giorno: 3, jolyne: 2, johnny: 1 } },
  ]},
  { id: 21, prompt: 'ما هو أسلوبك في العمل؟', answers: [
    { text: 'بجدية والتزام', scores: { jonathan: 3, jotaro: 2, josuke4: 1 } },
    { text: 'بحماس وطاقة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بتركيز وكفاءة', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'بإبداع ومرونة', scores: { giorno: 3, jolyne: 2, joseph: 1 } },
  ]},
  { id: 22, prompt: 'كيف تتعامل مع الماضي؟', answers: [
    { text: 'أتعلم منه وأمضي قدماً', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'أتذكره بحنين', scores: { joseph: 3, johnny: 2, jolyne: 1 } },
    { text: 'أتركه ورائي', scores: { jotaro: 3, jolyne: 2, josuke8: 1 } },
    { text: 'أحاول فهمه', scores: { josuke8: 3, johnny: 2, giorno: 1 } },
  ]},
  { id: 23, prompt: 'ما هو أسلوبك في التعبير عن نفسك؟', answers: [
    { text: 'بصدق ونبل', scores: { jonathan: 3, johnny: 2, josuke4: 1 } },
    { text: 'بطريقة مرحة ومبدعة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'بأفعالي أكثر من كلامي', scores: { jotaro: 3, josuke8: 2, giorno: 1 } },
    { text: 'بثقة ووضوح', scores: { giorno: 3, jolyne: 2, jotaro: 1 } },
  ]},
  { id: 24, prompt: 'ما الذي يحفزك للاستمرار؟', answers: [
    { text: 'حبي للعدالة', scores: { jonathan: 3, josuke4: 2, giorno: 1 } },
    { text: 'حبي للحياة والمغامرة', scores: { joseph: 3, jolyne: 2, josuke4: 1 } },
    { text: 'واجبي تجاه الآخرين', scores: { jotaro: 3, johnny: 2, josuke8: 1 } },
    { text: 'رغبتي في التحسن', scores: { giorno: 3, johnny: 2, jolyne: 1 } },
  ]},
];

export function getQuestions(lang: Lang): Question[] {
  return lang === 'ar' ? questionsAr : questionsEn;
}

/** Max attainable score: every question's top answer = 3 points. */
export const MAX_SCORE = 24 * 3;
