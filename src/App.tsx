import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useQuiz } from '@/state/QuizContext';
import { arcForQuestion, arcs } from '@/data/arcs';
import { MangaBackground } from '@/components/fx';
import HomeRoute from '@/routes/HomeRoute';
import QuizRoute from '@/routes/QuizRoute';
import ResultRoute from '@/routes/ResultRoute';

export default function App() {
  const location = useLocation();
  const { qIndex, total, ranking, completed } = useQuiz();

  // Persistent background colors evolve per route.
  const [bgColor, bgAccent] = useMemo<[string, string]>(() => {
    if (location.pathname.startsWith('/quiz')) {
      const arc = arcs[arcForQuestion(qIndex + 1, total)];
      return [arc.color, '#FF008C'];
    }
    if (location.pathname.startsWith('/result') && completed && ranking[0]) {
      return [ranking[0].character.color, ranking[0].character.accent];
    }
    return ['#FFD700', '#FF008C'];
  }, [location.pathname, qIndex, total, ranking, completed]);

  return (
    <div className="relative min-h-[100dvh] overflow-x-hidden">
      <MangaBackground color={bgColor} accent={bgAccent} />

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Routes location={location}>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/quiz" element={<QuizRoute />} />
            <Route path="/result" element={<ResultRoute />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
