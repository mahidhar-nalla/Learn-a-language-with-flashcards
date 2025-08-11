import React, { useState, useEffect } from 'react';
import Flashcard from './Flashcard';
import { saveData, loadData } from '../utils/dataManager';
import { generateDirectionalCards, LANGUAGE_LABELS } from '../utils/flashcardsData';
import { getCardsForReview, updateCardProgress } from '../utils/spacedRepetition';

const FlashcardManager = ({ onModeChange }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('hi');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [reviewCards, setReviewCards] = useState([]);
  const [showStats, setShowStats] = useState(false);

  useEffect(() => {
    // Load flashcards from localStorage or use sample data
    // Load language prefs
    const storedFrom = loadData('lang_from');
    const storedTo = loadData('lang_to');
    if (storedFrom) setFromLang(storedFrom);
    if (storedTo) setToLang(storedTo);
  }, []);

  useEffect(() => {
    if (fromLang === toLang) return;
    const storageKey = `flashcards_${fromLang}_${toLang}`;
    const savedCards = loadData(storageKey);
    let cards;
    if (savedCards && savedCards.length > 0) {
      cards = savedCards.map(c => ({ ...c, nextReview: c.nextReview ? new Date(c.nextReview) : new Date() }));
    } else {
      cards = generateDirectionalCards(fromLang, toLang);
      saveData(storageKey, cards);
    }
    setFlashcards(cards);
    setReviewCards(getCardsForReview(cards));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    saveData('lang_from', fromLang);
    saveData('lang_to', toLang);
  }, [fromLang, toLang]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleCardResponse = (performance) => {
    const currentCard = reviewCards[currentCardIndex];
    const updatedCard = updateCardProgress(currentCard, performance);
    
    // Update the card in the main flashcards array
  const updatedFlashcards = flashcards.map(card => card.id === updatedCard.id ? updatedCard : card);
    
    setFlashcards(updatedFlashcards);
  saveData(`flashcards_${fromLang}_${toLang}` , updatedFlashcards);
    
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
  const resetCards = generateDirectionalCards(fromLang, toLang);
    
    setFlashcards(resetCards);
    setReviewCards(getCardsForReview(resetCards));
  saveData(`flashcards_${fromLang}_${toLang}`, resetCards);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  if (reviewCards.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'white' }}>
        {fromLang === toLang ? (
          <>
            <h2 style={{ marginTop: 0 }}>Select two different languages</h2>
            <p style={{ opacity: .85 }}>Language pair cannot be the same. Choose distinct source and target above.</p>
          </>
        ) : (
          <>
            <h2 style={{ marginTop: 0 }}>No cards due</h2>
            <p style={{ opacity: .85 }}>Great job! All {flashcards.length} cards are scheduled for later review.</p>
          </>
        )}
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
    <div style={{ textAlign: 'center', color: 'white', padding: '20px', maxWidth: '760px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <div style={{ flex: '1 1 160px' }}>
          <label htmlFor="fromLang" style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8, display: 'block', marginBottom: 4 }}>From</label>
          <select id="fromLang" aria-label="Source language" value={fromLang} onChange={e => setFromLang(e.target.value)} style={selectStyle}>
            {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </div>
        <div style={{ alignSelf: 'center', fontSize: '24px', marginTop: '20px' }}>→</div>
        <div style={{ flex: '1 1 160px' }}>
          <label htmlFor="toLang" style={{ fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.8, display: 'block', marginBottom: 4 }}>To</label>
          <select id="toLang" aria-label="Target language" value={toLang} onChange={e => setToLang(e.target.value)} style={selectStyle}>
            {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
              <option key={code} value={code}>{label}</option>
            ))}
          </select>
        </div>
        <div style={{ flex: '1 1 100%', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={() => onModeChange('home')} style={{ marginTop: '10px' }}>Home</button>
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ margin: '0 0 10px', fontWeight: '600' }}>Flashcards ({LANGUAGE_LABELS[fromLang]} → {LANGUAGE_LABELS[toLang]})</h2>
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
          <p style={statLine}>Total Cards: <strong>{flashcards.length}</strong></p>
          <p style={statLine}>Cards Due: <strong>{reviewCards.length}</strong></p>
          <p style={statLine}>Mastered: <strong>{flashcards.filter(card => card.difficulty >= 4).length}</strong></p>
          <p style={statLine}>Correct: <strong>{flashcards.reduce((sum, card) => sum + card.correctCount, 0)}</strong></p>
            <p style={statLine}>Incorrect: <strong>{flashcards.reduce((sum, card) => sum + card.incorrectCount, 0)}</strong></p>
        </div>
      )}
    </div>
  );
};

export default FlashcardManager;

// Inline styles
const selectStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '8px',
  border: '1px solid rgba(255,255,255,0.3)',
  background: 'rgba(255,255,255,0.1)',
  color: 'white',
  fontSize: '14px',
  backdropFilter: 'blur(6px)'
};

const statLine = { margin: '4px 0', fontSize: '14px', opacity: 0.9 };


