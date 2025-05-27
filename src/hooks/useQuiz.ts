import { useState, useEffect } from 'react';
import allQuizzes from '../data/quizzes.json';

interface Quiz {
  id: number;
  question: string;
  answer: string;
}

interface SavedQuizState {
  index: number;
  quizzes: Quiz[];
}

const STORAGE_KEY = 'quiz_state';

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// 타입 안전성을 위해 퀴즈 데이터 검증
const quizzes: Quiz[] = allQuizzes.filter((quiz): quiz is Quiz => 
  typeof quiz.id === 'number' && 
  typeof quiz.question === 'string' && 
  typeof quiz.answer === 'string'
);

export function useQuiz() {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const { index } = JSON.parse(saved) as SavedQuizState;
      return index;
    }
    return 0;
  });

  const [isAnswerVisible, setIsAnswerVisible] = useState<boolean>(false);
  const [quizData, setQuizData] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const savedQuizzes = localStorage.getItem(STORAGE_KEY);
      if (savedQuizzes) {
        const { quizzes: savedQuizData } = JSON.parse(savedQuizzes) as SavedQuizState;
        setQuizData(savedQuizData);
      } else {
        setQuizData(shuffleArray(quizzes));
      }
    } catch (err) {
      setError('퀴즈를 불러오는데 실패했습니다.');
      console.error('Failed to load quizzes:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (quizData.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        index: currentQuizIndex,
        quizzes: quizData,
      }));
    }
  }, [currentQuizIndex, quizData]);

  const currentQuiz = quizData[currentQuizIndex];

  const showAnswer = () => {
    setIsAnswerVisible(true);
  };

  const nextQuiz = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      setIsAnswerVisible(false);
      if (currentQuizIndex === quizData.length - 1) {
        setQuizData(shuffleArray([...quizData]));
        setCurrentQuizIndex(0);
      } else {
        setCurrentQuizIndex(prevIndex => prevIndex + 1);
      }
      setIsTransitioning(false);
    }, 300);
  };

  const resetQuiz = () => {
    setQuizData(shuffleArray([...quizData]));
    setCurrentQuizIndex(0);
    setIsAnswerVisible(false);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    currentQuiz,
    isAnswerVisible,
    showAnswer,
    nextQuiz,
    resetQuiz,
    isLoading,
    error,
    isTransitioning
  };
}