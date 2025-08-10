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


export default App;
