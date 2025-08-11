export const calculateNextReviewDate = (performance, currentDifficulty = 1) => {
  // Performance: 0 = incorrect, 1 = difficult, 2 = correct, 3 = easy
  const baseIntervals = [1, 3, 7, 14, 30]; // days
  
  let newDifficulty = currentDifficulty;
  let intervalIndex = Math.min(currentDifficulty - 1, baseIntervals.length - 1);
  
  if (performance === 0) {
    // Incorrect answer - reset difficulty and use shortest interval
    newDifficulty = 1;
    intervalIndex = 0;
  } else if (performance === 1) {
    // Difficult - keep same difficulty
    intervalIndex = Math.max(0, intervalIndex - 1);
  } else if (performance === 2) {
    // Correct - increase difficulty
    newDifficulty = Math.min(currentDifficulty + 1, baseIntervals.length);
    intervalIndex = Math.min(intervalIndex + 1, baseIntervals.length - 1);
  } else if (performance === 3) {
    // Easy - increase difficulty more
    newDifficulty = Math.min(currentDifficulty + 2, baseIntervals.length);
    intervalIndex = Math.min(intervalIndex + 2, baseIntervals.length - 1);
  }
  
  const interval = baseIntervals[intervalIndex];
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);
  
  return {
    nextReviewDate,
    newDifficulty,
    interval
  };
};

export const getCardsForReview = (flashcards) => {
  const now = new Date();
  return flashcards.filter(card => 
    !card.nextReview || new Date(card.nextReview) <= now
  );
};

export const updateCardProgress = (card, performance) => {
  const { nextReviewDate, newDifficulty } = calculateNextReviewDate(performance, card.difficulty);
  
  return {
    ...card,
    lastReviewed: new Date(),
    nextReview: nextReviewDate,
    difficulty: newDifficulty,
    correctCount: performance >= 2 ? card.correctCount + 1 : card.correctCount,
    incorrectCount: performance === 0 ? card.incorrectCount + 1 : card.incorrectCount
  };
};
