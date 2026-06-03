import {
  createContext, useCallback, useContext, useEffect, useMemo, useRef, useState,
  type ReactNode,
} from 'react';
import type { CharacterKey, Lang, Question, RankedCharacter, Scores } from '@/types';
import { getQuestions } from '@/data/questions';
import { getUI, type UIStrings } from '@/data/i18n';
import { addScores, computeRanking, emptyScores, subtractScores } from '@/lib/scoring';

type AnswerDelta = Partial<Record<CharacterKey, number>>;

const STORAGE_KEY = 'jojo-quiz-v1';

interface PersistedState {
  lang: Lang;
  scores: Scores;
  qIndex: number;
  history: AnswerDelta[];
  completed: boolean;
}

interface QuizContextValue {
  lang: Lang;
  ui: UIStrings;
  scores: Scores;
  qIndex: number;
  total: number;
  question: Question;
  questionNumber: number;
  canGoBack: boolean;
  completed: boolean;
  ranking: RankedCharacter[];
  toggleLang: () => void;
  startQuiz: () => void;
  answer: (delta: AnswerDelta) => { done: boolean };
  back: () => void;
  restart: () => void;
}

const QuizContext = createContext<QuizContextValue | null>(null);

function loadState(): PersistedState | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Partial<PersistedState>;
    if (!p || (p.lang !== 'en' && p.lang !== 'ar')) return null;
    if (typeof p.qIndex !== 'number' || !p.scores || !Array.isArray(p.history)) return null;
    return {
      lang: p.lang,
      scores: p.scores as Scores,
      qIndex: p.qIndex,
      history: p.history as AnswerDelta[],
      completed: Boolean(p.completed),
    };
  } catch {
    return null;
  }
}

export function QuizProvider({ children }: { children: ReactNode }) {
  const initial = loadState();
  const [lang, setLang] = useState<Lang>(initial?.lang ?? 'en');
  const [scores, setScores] = useState<Scores>(initial?.scores ?? emptyScores());
  const [qIndex, setQIndex] = useState<number>(initial?.qIndex ?? 0);
  const [history, setHistory] = useState<AnswerDelta[]>(initial?.history ?? []);
  const [completed, setCompleted] = useState<boolean>(initial?.completed ?? false);
  // Locks a question once an answer commits, so rapid clicks can't double-advance.
  const committedRef = useRef(-1);

  const ui = getUI(lang);
  const questions = useMemo(() => getQuestions(lang), [lang]);
  const total = questions.length;
  const safeIndex = Math.min(Math.max(0, qIndex), total - 1);

  // Persist to localStorage on any change.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ lang, scores, qIndex, history, completed }));
    } catch {
      /* storage unavailable (private mode / quota) — non-fatal */
    }
  }, [lang, scores, qIndex, history, completed]);

  // Keep <html> language/direction + title in sync.
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = ui.dir;
    document.title = lang === 'ar' ? 'اختبار شخصية جوجو' : 'JoJo Personality Test';
  }, [lang, ui.dir]);

  const resetState = useCallback(() => {
    setScores(emptyScores());
    setQIndex(0);
    setHistory([]);
    setCompleted(false);
    committedRef.current = -1;
  }, []);

  const startQuiz = useCallback(() => { resetState(); }, [resetState]);
  const restart = useCallback(() => { resetState(); }, [resetState]);

  const toggleLang = useCallback(() => {
    // The two language banks differ, so switching resets the run.
    setLang((l) => (l === 'en' ? 'ar' : 'en'));
    resetState();
  }, [resetState]);

  const answer = useCallback(
    (delta: AnswerDelta) => {
      if (committedRef.current === qIndex) return { done: false };
      committedRef.current = qIndex;
      setScores((s) => addScores(s, delta));
      setHistory((h) => [...h, delta]);
      if (qIndex < total - 1) {
        setQIndex((i) => i + 1);
        return { done: false };
      }
      setCompleted(true);
      return { done: true };
    },
    [qIndex, total],
  );

  const back = useCallback(() => {
    if (qIndex === 0 || history.length === 0) return;
    const last = history[history.length - 1];
    setScores((s) => subtractScores(s, last));
    setHistory((h) => h.slice(0, -1));
    setQIndex((i) => Math.max(0, i - 1));
    setCompleted(false);
    committedRef.current = -1;
  }, [qIndex, history]);

  const ranking = useMemo(() => computeRanking(scores, lang), [scores, lang]);

  const value: QuizContextValue = {
    lang, ui, scores, qIndex: safeIndex, total,
    question: questions[safeIndex],
    questionNumber: safeIndex + 1,
    canGoBack: safeIndex > 0,
    completed, ranking,
    toggleLang, startQuiz, answer, back, restart,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz(): QuizContextValue {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within a QuizProvider');
  return ctx;
}
