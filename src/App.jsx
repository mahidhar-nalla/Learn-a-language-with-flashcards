import React, { useState } from 'react';
import FlashcardManager from './components/FlashcardManager';
import Quiz from './components/Quiz';
import { loadData } from './utils/dataManager';
import { sampleFlashcards } from './utils/flashcardsData';

const App = () => {
  const [currentMode, setCurrentMode] = useState('home'); // 'home', 'flashcards', 'quiz'

  const handleModeChange = (mode) => {
    setCurrentMode(mode);
  };

  const handleQuizComplete = (score, total) => {
    alert(`Quiz Complete! Score: ${score}/${total} (${Math.round((score/total)*100)}%)`);
    setCurrentMode('home');
  };

  const getFlashcards = () => {
    const savedCards = loadData('flashcards');
    return savedCards && savedCards.length > 0 ? savedCards : sampleFlashcards;
  };

  if (currentMode === 'flashcards') {
    return <FlashcardManager onModeChange={handleModeChange} />;
  }

  if (currentMode === 'quiz') {
    return (
      <div style={{ padding: '20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            className="btn btn-primary" 
            onClick={() => setCurrentMode('home')}
          >
            ← Back to Home
          </button>
        </div>
        <Quiz 
          flashcards={getFlashcards()} 
          onQuizComplete={handleQuizComplete}
        />
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
      padding: '20px'
    }}>
      <div style={{ maxWidth: '600px' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          Guess It! 🎯
        </h1>
        <p style={{ fontSize: '20px', marginBottom: '40px', lineHeight: '1.6' }}>
          Master English-Hindi-Telugu vocabulary with interactive flashcards and spaced repetition
        </p>
        
        <div style={{ 
          display: 'grid', 
          gap: '20px', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '15px' }}>📚 Flashcards</h3>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>
              Review words with spaced repetition algorithm
            </p>
            <button 
              className="btn btn-primary" 
              onClick={() => setCurrentMode('flashcards')}
              style={{ width: '100%' }}
            >
              Start Learning
            </button>
          </div>
          
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            padding: '30px',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ marginBottom: '15px' }}>🧠 Quiz</h3>
            <p style={{ marginBottom: '20px', fontSize: '16px' }}>
              Test your knowledge with multiple choice questions
            </p>
            <button 
              className="btn btn-success" 
              onClick={() => setCurrentMode('quiz')}
              style={{ width: '100%' }}
            >
              Take Quiz
            </button>
          </div>
        </div>

        <div style={{ 
          background: 'rgba(255,255,255,0.1)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ marginBottom: '15px' }}>✨ Features</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '15px',
            textAlign: 'left'
          }}>
            <div>• Spaced repetition learning</div>
            <div>• English-Hindi-Telugu flashcards</div>
            <div>• Progress tracking</div>
            <div>• Interactive quizzes</div>
            <div>• Pronunciation guides</div>
            <div>• Adaptive difficulty</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
