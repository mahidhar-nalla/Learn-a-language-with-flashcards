import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { saveData, loadData } from '../utils/dataManager';
import { sampleFlashcards } from '../utils/flashcardsData';
import { getCardsForReview, updateCardProgress } from '../utils/spacedRepetition';

const FlashcardManager = ({ onModeChange }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCards, setReviewCards] = useState([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Load flashcards from localStorage or use sample data
    const savedCards = loadData('flashcards');
    if (savedCards && savedCards.length > 0) {
      setFlashcards(savedCards);
      setReviewCards(getCardsForReview(savedCards));
    } else {
      setFlashcards(sampleFlashcards);
      setReviewCards(getCardsForReview(sampleFlashcards));
      saveData('flashcards', sampleFlashcards);
    }
  }, []);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardResponse = (performance) => {
    const currentCard = reviewCards[currentCardIndex];
    const updatedCard = updateCardProgress(currentCard, performance);
    
    // Update the card in the main flashcards array
    const updatedFlashcards = flashcards.map(card => 
      card.id === updatedCard.id ? updatedCard : card
    );
    
    setFlashcards(updatedFlashcards);
    saveData('flashcards', updatedFlashcards);
    
    // Move to next card or finish review
    if (currentCardIndex < reviewCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else {
      // Review session complete
      alert('Review session complete! Great job!');
      setCurrentCardIndex(0);
      setReviewCards(getCardsForReview(updatedFlashcards));
      setIsFlipped(false);
    }
  };

  const resetProgress = () => {
    const resetCards = sampleFlashcards.map(card => ({
      ...card,
      lastReviewed: null,
      nextReview: new Date(),
      correctCount: 0,
      incorrectCount: 0,
      difficulty: 1
    }));
    
    setFlashcards(resetCards);
    setReviewCards(getCardsForReview(resetCards));
    saveData('flashcards', resetCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (reviewCards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
        <h2>No cards due for review!</h2>
        <p>Come back later or reset your progress to practice again.</p>
        <button className="btn btn-primary" onClick={resetProgress} style={{ marginRight: '10px' }}>
          Reset Progress
        </button>
        <button className="btn btn-primary" onClick={() => onModeChange('quiz')}>
          Take Quiz
        </button>
      </div>
    );
  }

  const currentCard = reviewCards[currentCardIndex];
  const progress = ((currentCardIndex + 1) / reviewCards.length) * 100;

  return (
    <div style={{ textAlign: 'center', color: 'white', padding: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <h2>Flashcard Review</h2>
        <div style={{ marginBottom: '10px' }}>
          Card {currentCardIndex + 1} of {reviewCards.length}
        </div>
        <div style={{ 
          width: '100%', 
          backgroundColor: 'rgba(255,255,255,0.3)', 
          borderRadius: '10px',
          height: '10px',
          marginBottom: '20px'
        }}>
          <div style={{
            width: `${progress}%`,
            backgroundColor: '#00b894',
            height: '100%',
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
      </div>

      <Flashcard
        front={currentCard.front}
        back={currentCard.back}
        isFlipped={isFlipped}
        onFlip={handleFlip}
      />

      {isFlipped && (
        <div style={{ marginTop: '30px' }}>
          <p style={{ marginBottom: '20px', fontSize: '18px' }}>
            How well did you know this word?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-danger" 
              onClick={() => handleCardResponse(0)}
            >
              Again (Incorrect)
            </button>
            <button 
              className="btn" 
              style={{ backgroundColor: '#f39c12', color: 'white' }}
              onClick={() => handleCardResponse(1)}
            >
              Hard (Difficult)
            </button>
            <button 
              className="btn btn-success" 
              onClick={() => handleCardResponse(2)}
            >
              Good (Correct)
            </button>
            <button 
              className="btn" 
              style={{ backgroundColor: '#3498db', color: 'white' }}
              onClick={() => handleCardResponse(3)}
            >
              Easy
            </button>
          </div>
        </div>
      )}

      <div style={{ marginTop: '30px' }}>
        <button 
          className="btn btn-primary" 
          onClick={() => setShowStats(!showStats)}
          style={{ marginRight: '10px' }}
        >
          {showStats ? 'Hide Stats' : 'Show Stats'}
        </button>
        <button className="btn btn-primary" onClick={() => onModeChange('quiz')}>
          Take Quiz
        </button>
      </div>

      {showStats && (
        <div style={{ 
          marginTop: '20px', 
          padding: '20px', 
          backgroundColor: 'rgba(255,255,255,0.1)', 
          borderRadius: '10px',
          maxWidth: '400px',
          margin: '20px auto'
        }}>
          <h3>Your Progress</h3>
          <p>Total Cards: {flashcards.length}</p>
          <p>Cards Due: {reviewCards.length}</p>
          <p>Cards Mastered: {flashcards.filter(card => card.difficulty >= 4).length}</p>
          <p>Total Correct: {flashcards.reduce((sum, card) => sum + card.correctCount, 0)}</p>
          <p>Total Incorrect: {flashcards.reduce((sum, card) => sum + card.incorrectCount, 0)}</p>
        </div>
      )}
    </div>
  );
};

export default FlashcardManager;
