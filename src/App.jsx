import React, { useState } from 'react';
import FlashcardManager from './components/FlashcardManager';
import Quiz from './components/Quiz';
import { loadData } from './utils/dataManager';
import { generateDirectionalCards, LANGUAGE_LABELS } from './utils/flashcardsData';

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
    const from = loadData('lang_from') || 'en';
    const to = loadData('lang_to') || 'hi';
    const storageKey = `flashcards_${from}_${to}`;
    const savedCards = loadData(storageKey);
    return savedCards && savedCards.length > 0 ? savedCards : generateDirectionalCards(from, to);
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
    <div style={homeWrap}>
      <div style={homeInner}>
        <h1 style={logo}>PolyGlide<span style={{ fontWeight: 300 }}>.</span></h1>
        <p style={tag}>Minimal tri‑lingual flashcards. English • Hindi • Telugu.</p>
        <div style={cardGrid}>
          <HomeCard title="Flashcards" desc="Study with adaptive spaced repetition" action={() => setCurrentMode('flashcards')} primary />
          <HomeCard title="Quiz" desc="Quick multiple‑choice recall test" action={() => setCurrentMode('quiz')} />
        </div>
        <div style={footNote}>All language direction pairs supported. Pick inside Flashcards.</div>
      </div>
    </div>
  );
};

export default App;

// Minimal design tokens
const homeWrap = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '40px 20px',
  color: 'white'
};
const homeInner = { maxWidth: '760px', width: '100%', textAlign: 'center' };
const logo = { fontSize: '56px', margin: '0 0 10px', letterSpacing: '-1px', fontWeight: 600 };
const tag = { fontSize: '18px', margin: '0 0 50px', opacity: 0.9 };
const cardGrid = { display: 'grid', gap: '22px', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', marginBottom: '40px' };
const footNote = { fontSize: '12px', opacity: 0.7, letterSpacing: '1px' };

const cardBase = {
  background: 'linear-gradient(155deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))',
  padding: '28px 26px 30px',
  borderRadius: '18px',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.15)',
  textAlign: 'left',
  display: 'flex',
  flexDirection: 'column',
  gap: '14px',
  position: 'relative',
  overflow: 'hidden'
};
const heading = { margin: 0, fontSize: '18px', fontWeight: 600, letterSpacing: '.5px' };
const desc = { margin: 0, fontSize: '14px', lineHeight: 1.5, opacity: 0.85 };
const btn = (primary=false) => ({
  marginTop: '4px',
  background: primary ? '#2563eb' : 'transparent',
  color: primary ? '#fff' : '#fff',
  border: primary ? '1px solid #1d4ed8' : '1px solid rgba(255,255,255,0.35)',
  padding: '10px 18px',
  borderRadius: '10px',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'background .25s,border-color .25s'
});

const HomeCard = ({ title, desc: d, action, primary }) => (
  <div style={cardBase}>
    <h3 style={heading}>{title}</h3>
    <p style={desc}>{d}</p>
    <div style={{ flexGrow: 1 }}></div>
    <button style={btn(primary)} onClick={action}>{primary ? 'Start' : 'Open'}</button>
  </div>
);
