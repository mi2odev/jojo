import { Navigate, useNavigate } from 'react-router-dom';
import { useQuiz } from '@/state/QuizContext';
import QuizScreen from '@/components/screens/QuizScreen';

/** Quiz page ("/quiz"). Resumes the in-progress question from persisted state. */
export default function QuizRoute() {
  const { lang, question, questionNumber, total, canGoBack, completed, answer, back } = useQuiz();
  const navigate = useNavigate();

  // Already finished? Send to the result instead of re-showing the last question.
  if (completed) return <Navigate to="/result" replace />;

  return (
    <QuizScreen
      lang={lang}
      question={question}
      questionNumber={questionNumber}
      total={total}
      canGoBack={canGoBack}
      onAnswer={(delta) => {
        const { done } = answer(delta);
        if (done) navigate('/result');
      }}
      onBack={back}
    />
  );
}
