import React, { useState, useEffect } from 'react';
import Question from './components/Question';
import Result from './components/Result';
import Footer from './components/Footer';
import { getQuestions, getUI } from './data/i18n';

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [lang, setLang] = useState('en');
  const [scores, setScores] = useState({
    jonathan: 0,
    joseph: 0,
    jotaro: 0,
    josuke4: 0,
    giorno: 0,
    jolyne: 0,
    johnny: 0,
    josuke8: 0
  });
  const [showResult, setShowResult] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  // Keep a history of chosen answers' score objects so we can undo (back) safely
  const [answersHistory, setAnswersHistory] = useState([]);

  const handleAnswer = (answerScores) => {
    // Apply the selected answer's scores
    const newScores = { ...scores };
    Object.keys(answerScores).forEach(character => {
      newScores[character] += answerScores[character];
    });
    setScores(newScores);

    // Push this answer onto history for potential rollback
    setAnswersHistory(prev => {
      // After going back, prev length equals currentQuestionIndex, so simple append is safe
      return [...prev, answerScores];
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex === 0 || answersHistory.length === 0) return;
    // Previous question index (we are currently viewing question N, want to revert to N-1)
    const lastAnswerScores = answersHistory[answersHistory.length - 1];
    // Subtract those scores
    const revertedScores = { ...scores };
    Object.keys(lastAnswerScores).forEach(character => {
      revertedScores[character] -= lastAnswerScores[character];
      if (revertedScores[character] < 0) revertedScores[character] = 0; // safety guard
    });
    setScores(revertedScores);
    // Pop history entry
    setAnswersHistory(prev => prev.slice(0, prev.length - 1));
    // Move pointer back one question
    setCurrentQuestionIndex(currentQuestionIndex - 1);
    // Ensure result screen is hidden if we were at the end
    if (showResult) setShowResult(false);
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({
      jonathan: 0,
      joseph: 0,
      jotaro: 0,
      josuke4: 0,
      giorno: 0,
      jolyne: 0,
      johnny: 0,
      josuke8: 0
    });
    setShowResult(false);
    setIsStarted(false);
    setAnswersHistory([]);
  };

  const startQuiz = () => setIsStarted(true);

  // Professional subtle emoji layout (JoJo themed)
  const professionalEmojis = [
    // Left vertical arc
    { e: '⭐',          top: '6%', left: '5%',  size: '2.4rem', anim: 'animate-float-slow', delay: '0s',   opacity: 0.38 },
    { e: '🎭',          top: '15%', left: '8%',  size: '2.1rem', anim: 'animate-float-slower', delay: '1.2s', opacity: 0.34 },
    { e: '🔥',          top: '24%', left: '6%',  size: '1.9rem', anim: 'animate-sway', delay: '2.1s', opacity: 0.33 },
    // Lower left accent
    { e: '�',          top: '74%', left: '7%',  size: '2.2rem', anim: 'animate-bob-rotate', delay: '1.4s', opacity: 0.30 },
    // Right side gentle curve
    { e: '👑',          top: '9%',  left: '88%', size: '2.3rem', anim: 'animate-float-slow', delay: '0.5s', opacity: 0.37 },
    { e: '🌟',          top: '19%', left: '84%', size: '2.0rem', anim: 'animate-sway', delay: '1.7s', opacity: 0.32 },
    { e: '🦋',          top: '46%', left: '90%', size: '1.95rem', anim: 'animate-float-slower', delay: '2.4s', opacity: 0.30 },
    { e: '🌠',          top: '70%', left: '86%', size: '2.05rem', anim: 'animate-drift', delay: '0.9s', opacity: 0.30 },
    { e: '🔍',          top: '81%', left: '92%', size: '1.8rem', anim: 'animate-bob-rotate', delay: '2.9s', opacity: 0.28 },
    { e: '⚡',          top: '87%', left: '84%', size: '2.1rem', anim: 'animate-float-slower', delay: '1.3s', opacity: 0.27 }
  ];

  const ui = getUI(lang);
  const questions = getQuestions(lang);

  // Localize document title (must be before conditional returns)
  useEffect(() => {
    document.title = lang === 'ar' ? 'اختبار شخصية جوجو' : 'JoJo Personality Test';
  }, [lang]);

  if (showResult) {
    return (
      <>
        <Result scores={scores} onRestart={restartQuiz} lang={lang} />
        <Footer />
      </>
    );
  }

  // Arabic set now complete; partial notice removed

  const toggleLang = () => {
    setLang(prev => (prev === 'en' ? 'ar' : 'en'));
    // Reset quiz when switching languages to avoid index mismatch
    setCurrentQuestionIndex(0);
    setScores({
      jonathan: 0, joseph: 0, jotaro: 0, josuke4: 0, giorno: 0, jolyne: 0, johnny: 0, josuke8: 0
    });
    setShowResult(false);
    setIsStarted(false);
    setAnswersHistory([]);
  };

  const isRtl = lang === 'ar';

  if (!isStarted) {
    return (
      <div className={`min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col relative overflow-x-hidden pb-16 ${isRtl ? 'font-[\'Poppins\'] rtl' : ''}`} dir={isRtl ? 'rtl' : 'ltr'}>
        {/* Professional balanced emoji decor */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden select-none">
          {professionalEmojis.map((it, i) => (
            <span
              key={i}
              aria-hidden="true"
              className={`absolute ${it.anim} pirate-glow mix-blend-screen`}
              style={{
                top: it.top,
                left: it.left,
                fontSize: it.size,
                animationDelay: it.delay,
                animationDuration: it.anim.includes('slower') ? '10s' : '8s',
                opacity: it.opacity,
                filter: 'drop-shadow(0 0 5px rgba(255,190,120,0.25))'
              }}
            >
              {it.e}
            </span>
          ))}
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle at center, rgba(10,15,35,0) 62%, rgba(10,15,35,0.55))' }} />
        </div>
        <div className="flex-1 flex items-center justify-center px-4 pb-24 md:pb-28 overflow-visible">
  {/* (Main content container replaced above with z-10 wrapper) */}
          <div className="text-center max-w-4xl mx-auto flex flex-col overflow-visible px-1 sm:px-2">
            {/* Language Toggle and One Piece Quiz Link */}
            <div className={`flex justify-end w-full mb-4 gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <a
                href="https://onepiecemi2o.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm bg-orange-500/20 hover:bg-orange-500/30 border border-orange-400/30 text-orange-200 px-3 py-2 rounded-lg backdrop-blur-md transition-colors"
                title={ui.tryOnePieceQuiz}
              >
                {ui.onePieceQuiz}
              </a>
              <button
                onClick={toggleLang}
                className="text-xs sm:text-sm bg-white/10 hover:bg-white/20 border border-white/20 text-blue-100 px-3 py-2 rounded-lg backdrop-blur-md transition-colors"
              >
                {lang === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
            {/* Logo with enhanced multi-layer glow */}
              <div className="flex justify-center mb-5 md:mb-8 relative">
                <div className="relative isolate">
                  {/* Simplified glow (no square artifact) */}
                  <div className="pointer-events-none absolute -inset-x-10 -top-6 -bottom-4 flex items-center justify-center">
                    <div className="w-full max-w-[900px] h-full">
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[70%] rounded-[50%] blur-[70px] opacity-70" style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,215,0,0.55) 0%, rgba(255,140,255,0.28) 55%, rgba(255,80,200,0.08) 75%, rgba(255,0,150,0) 100%)'
                      }} />
                      <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 w-[75%] h-[45%] rounded-[50%] blur-[35px] opacity-80" style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,180,255,0.85) 0%, rgba(255,120,200,0.45) 60%, rgba(255,80,150,0.15) 85%, rgba(255,40,100,0) 100%)'
                      }} />
                      <div className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 w-[78%] h-[48%] rounded-[50%] blur-[22px] mix-blend-screen opacity-60" style={{
                        background: 'radial-gradient(ellipse at center, rgba(255,200,255,0.9) 0%, rgba(255,150,200,0.35) 55%, rgba(255,100,150,0.12) 78%, rgba(255,50,100,0) 100%)'
                      }} />
                    </div>
                  </div>
                  <img
                    src="/images/logo.png"
                    alt="JoJo Logo"
                    className="relative w-72 md:w-96 lg:w-[30rem] h-auto object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.7)]"
                    style={{
                      filter: 'drop-shadow(0 0 25px rgba(255,100,200,0.55)) drop-shadow(0 0 45px rgba(255,50,150,0.35))'
                    }}
                    onLoad={() => console.log('JoJo logo loaded successfully')}
                    onError={() => {
                      console.error('Logo failed to load: /images/logo.png');
                    }}
                  />
                </div>
              </div>

            {/* Title / Subtitle */}
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-wide">
              {ui.personalityTest}
            </h2>
            <p className="text-xl md:text-2xl text-blue-200 mb-6 md:mb-4 leading-relaxed">
              {ui.discoverLine}
            </p>
            {/* Removed partial translation notice */}

            {/* Start Button (final fix: no clipping, simplified layers) */}
            <button
              onClick={startQuiz}
              className="group relative inline-flex items-center justify-center px-12 py-6 text-xl font-bold text-white rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-orange-400/40 hover:scale-[1.045] active:scale-[0.985] will-change-transform"
              style={{
                background: 'linear-gradient(110deg,#FFD700 0%,#6644AA 30%,#3366FF 55%,#00CCAA 85%)',
                boxShadow: '0 4px 18px rgba(0,0,0,0.55), 0 0 22px 6px rgba(255,215,0,0.38), 0 0 42px 14px rgba(102,68,170,0.28)'
              }}
            >
              {/* Soft gloss */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.55), rgba(255,255,255,0.06) 70%)',
                  mixBlendMode: 'overlay'
                }}
              />
              {/* Sheen (smaller, no side clipping) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full"
              >
                <span
                  className="absolute left-0 top-0 h-full w-1/3 translate-x-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.0)_0%,rgba(255,255,255,0.55)_55%,rgba(255,255,255,0)_100%)] opacity-0 group-hover:opacity-40 group-hover:translate-x-[260%] transition-all duration-[1300ms] ease-out will-change-transform"
                  style={{ transform: 'skewX(8deg)' }}
                />
              </span>
              {/* Outer aura (contained) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-full opacity-60 group-hover:opacity-85 transition-opacity duration-500"
                style={{
                  boxShadow: '0 0 0 2px rgba(255,255,255,0.08), 0 0 25px 8px rgba(255,160,50,0.45), 0 0 55px 22px rgba(255,70,120,0.30)'
                }}
              />
              <span className="relative z-10 flex items-center tracking-wide drop-shadow-sm">
                {ui.startAdventure}
                <svg className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>

            <p className="text-blue-300 mt-6 md:mt-10 text-lg">
              {ui.joinCrew}
            </p>

            {/* Detailed Feature / Lore Section */}
            <div className="mt-6 md:mt-10 grid md:grid-cols-3 gap-5 md:gap-6 text-left flex-shrink-0">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 text-start">
                <h3 className="text-yellow-300 font-semibold mb-2 tracking-wide text-sm">{ui.howItWorks}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{ui.howItWorksDesc}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 text-start">
                <h3 className="text-orange-300 font-semibold mb-2 tracking-wide text-sm">{ui.whatYouGet}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{ui.whatYouGetDesc}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm hover:bg-white/10 transition-colors duration-300 text-start">
                <h3 className="text-red-300 font-semibold mb-2 tracking-wide text-sm">{ui.accuracyFocus}</h3>
                <p className="text-blue-200 text-sm leading-relaxed">{ui.accuracyFocusDesc}</p>
              </div>
            </div>

            {/* Interactive small emoji orbit cluster */}
            <div className="absolute -right-6 top-2 hidden md:block">
              <div className="relative w-28 h-28 opacity-80">
                <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-spin-slower"></div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-xl pirate-glow animate-float-slow">⭐</div>
                <div className="absolute bottom-2 left-2 text-lg pirate-glow animate-bob-rotate" style={{ animationDelay: '1.4s' }}>🌟</div>
                <div className="absolute right-1 top-8 text-xl pirate-glow animate-sway" style={{ animationDelay: '0.7s' }}>💎</div>
              </div>
            </div>

            {/* Sub info row */}
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-6 text-[10px] sm:text-xs tracking-wide text-blue-300/70 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse" />
                <span>{ui.statsQuestions}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                <span>{ui.statsCharacters}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" style={{ animationDelay: '1.2s' }} />
                <span>{ui.statsReplays}</span>
              </div>
            </div>
            {/* Subtle spacer (reduced) */}
            <div className="flex-grow min-h-4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Question
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        onBack={handleBack}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={questions.length}
        lang={lang}
      />
      {/* Removed partial translation notice */}
      <Footer />
    </>
  );
}

export default App;