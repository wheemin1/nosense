import React from 'react';
import Button from './Button';
import { useQuiz } from '../hooks/useQuiz';

const QuizCard: React.FC = () => {
  const { 
    currentQuiz, 
    isAnswerVisible, 
    showAnswer, 
    nextQuiz, 
    isLoading, 
    isTransitioning,
    totalQuizzes,
    currentQuizNumber
  } = useQuiz();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className={`max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {/* Quiz header with progress */}
      <div className="bg-purple-500 px-6 py-4 text-white">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">넌센스 퀴즈</h2>
          <div className="text-sm font-medium">
            {currentQuizNumber} / {totalQuizzes}
          </div>
        </div>
        <div className="w-full bg-purple-300 rounded-full h-2 mt-2">
          <div 
            className="bg-yellow-400 h-2 rounded-full transition-all duration-300 ease-out" 
            style={{ width: `${(currentQuizNumber / totalQuizzes) * 100}%` }}
          ></div>
        </div>
      </div>
      
      {/* Quiz content */}
      <div className="p-6">
        <div className="min-h-[120px] flex flex-col">
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-700 mb-1">문제</h3>
            <p className="text-xl font-bold text-gray-900">{currentQuiz?.question}</p>
          </div>
          
          {/* Answer (conditionally rendered) */}
          <div className={`mb-6 transition-all duration-300 ${isAnswerVisible ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0 overflow-hidden'}`}>
            <h3 className="text-lg font-medium text-gray-700 mb-1">정답</h3>
            <p className="text-xl font-bold text-purple-600">{currentQuiz?.answer}</p>
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <Button 
            onClick={showAnswer} 
            primary={true}
            disabled={isAnswerVisible || isTransitioning}
            className="flex-1"
          >
            답 확인하기
          </Button>
          
          <Button 
            onClick={nextQuiz}
            disabled={!isAnswerVisible || isTransitioning}
            className="flex-1"
          >
            다음 문제
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizCard;