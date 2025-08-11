import React from 'react';

const Flashcard = ({ front, back, isFlipped, onFlip }) => {
  return (
    <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={onFlip}>
      <div className="flashcard-inner">
        <div className="flashcard-front">
          <div>
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{front.word}</div>
            <div style={{ fontSize: '16px', opacity: '0.9' }}>({front.language})</div>
          </div>
        </div>
        <div className="flashcard-back">
          <div>
            <div style={{ fontSize: '28px', marginBottom: '10px' }}>{back.word}</div>
            <div style={{ fontSize: '16px', opacity: '0.9' }}>({back.language})</div>
            {back.pronunciation && (
              <div style={{ fontSize: '14px', marginTop: '10px', fontStyle: 'italic' }}>
                {back.pronunciation}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
