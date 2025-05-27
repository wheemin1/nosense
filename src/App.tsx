import React from 'react';
import QuizCard from './components/QuizCard';
import { BrainCog } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <BrainCog size={36} className="text-purple-500 mr-2" />
          <h1 className="text-3xl font-bold text-purple-800">넌센스 퀴즈</h1>
        </div>
        <p className="text-gray-600">재미있는 넌센스 퀴즈를 풀어보세요!</p>
      </header>
      
      <main className="w-full max-w-md flex-1 flex items-start justify-center">
        <QuizCard />
      </main>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 넌센스 퀴즈 앱</p>
      </footer>
    </div>
  );
}

export default App;