import React, { useState, useEffect } from 'react';

const Quiz = ({ flashcards, onQuizComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCards, setQuizCards] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (flashcards.length > 0) {
      // Shuffle and take first 5 cards for quiz
      const shuffled = [...flashcards].sort(() => 0.5 - Math.random());
      const quizSet = shuffled.slice(0, Math.min(5, shuffled.length));
      setQuizCards(quizSet);
      generateOptions(quizSet[0], shuffled);
    }
  }, [flashcards]);

  const generateOptions = (currentCard, allCards) => {
    const correctAnswer = currentCard.back.word;
    const wrongOptions = allCards
      .filter(card => card.id !== currentCard.id)
      .map(card => card.back.word)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const allOptions = [correctAnswer, ...wrongOptions].sort(() => 0.5 - Math.random());
    setOptions(allOptions);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setShowResult(true);

    const isCorrect = option === quizCards[currentQuestionIndex].back.word;
    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < quizCards.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
        setShowResult(false);
        generateOptions(quizCards[currentQuestionIndex + 1], flashcards);
      } else {
        // Quiz complete
        setTimeout(() => {
          onQuizComplete(score + (isCorrect ? 1 : 0), quizCards.length);
        }, 1000);
      }
    }, 1500);
  };

  if (quizCards.length === 0) {
    return (
      <div className="quiz-container">
        <h2>Loading Quiz...</h2>
      </div>
    );
  }

  if (currentQuestionIndex >= quizCards.length) {
    return (
      <div className="quiz-container">
        <h2>Quiz Complete!</h2>
        <p>Your score: {score} / {quizCards.length}</p>
        <p>Percentage: {Math.round((score / quizCards.length) * 100)}%</p>
      </div>
    );
  }

  const currentCard = quizCards[currentQuestionIndex];
  const correctAnswer = currentCard.back.word;

  return (
    <div className="quiz-container">
      <div style={{ marginBottom: '20px' }}>
        <span>Question {currentQuestionIndex + 1} of {quizCards.length}</span>
        <div style={{ marginTop: '10px' }}>Score: {score}</div>
      </div>
      
      <div className="quiz-question">
        What is the Hindi/Telugu translation of:
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#667eea', margin: '20px 0' }}>
          {currentCard.front.word}
        </div>
      </div>

      <div className="quiz-options">
        {options.map((option, index) => {
          let optionClass = 'quiz-option';
          
          if (showResult && selectedOption === option) {
            optionClass += option === correctAnswer ? ' correct' : ' incorrect';
          } else if (showResult && option === correctAnswer) {
            optionClass += ' correct';
          } else if (selectedOption === option && !showResult) {
            optionClass += ' selected';
          }

          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !showResult && handleOptionSelect(option)}
              disabled={showResult}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {selectedOption === correctAnswer ? (
            <div style={{ color: '#00b894', fontSize: '20px', fontWeight: 'bold' }}>
              Correct! ✓
            </div>
          ) : (
            <div style={{ color: '#e17055', fontSize: '20px', fontWeight: 'bold' }}>
              Incorrect. The answer was: {correctAnswer}
            </div>
          )}
          {currentCard.back.pronunciation && (
            <div style={{ marginTop: '10px', fontStyle: 'italic' }}>
              Pronunciation: {currentCard.back.pronunciation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
