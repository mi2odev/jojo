import { Navigate, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/state/QuizContext';
import ResultScreen from '@/components/screens/ResultScreen';

/** Result page ("/result"). Guards against direct access with no finished quiz. */
export default function ResultRoute() {
  const { lang, ranking, completed, restart } = useQuiz();
  const navigate = useNavigate();

  if (!completed) return <Navigate to="/" replace />;

  return (
    <ResultScreen
      lang={lang}
      ranking={ranking}
      onRestart={() => { restart(); navigate('/'); }}
    />
  );
}
