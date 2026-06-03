import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from '@/state/QuizContext';
import HeroScreen from '@/components/screens/HeroScreen';
import IntroSequence from '@/components/screens/IntroSequence';

const INTRO_KEY = 'jojo-intro-seen';

/** Landing page ("/") — plays the cinematic intro once per browser session. */
export default function HomeRoute() {
  const { lang, startQuiz, toggleLang } = useQuiz();
  const navigate = useNavigate();

  const [showIntro, setShowIntro] = useState<boolean>(() => {
    try {
      return typeof window !== 'undefined' && !window.sessionStorage.getItem(INTRO_KEY);
    } catch {
      return false;
    }
  });

  const finishIntro = () => {
    setShowIntro(false);
    try { window.sessionStorage.setItem(INTRO_KEY, '1'); } catch { /* ignore */ }
  };

  return (
    <>
      {showIntro && <IntroSequence lang={lang} onComplete={finishIntro} />}
      <HeroScreen
        lang={lang}
        onToggleLang={toggleLang}
        onStart={() => { startQuiz(); navigate('/quiz'); }}
      />
    </>
  );
}
