## PolyGlide – Minimal Tri‑Lingual Flashcards (English • Hindi • Telugu)

PolyGlide is a lightweight vocabulary trainer featuring adaptive spaced repetition, directional language pair selection, and a clean minimal blue interface.

### Key Features
- Any direction: English ↔ Hindi ↔ Telugu (all 6 directional pairs)
- Adaptive spaced repetition with performance grading (Again / Hard / Good / Easy)
- Pronunciation hints (where helpful) per target language
- Progress stats per language pair (stored independently in localStorage)
- Quick quiz mode with multiple choice recall
- Minimal, accessible UI with keyboard focusable selects & buttons

### Getting Started
1. Install dependencies (Vite + React + Tailwind assumed)
2. Run the dev server

### Usage
Home → choose Flashcards or Quiz.
In Flashcards:
1. Select source (From) and target (To) languages – they must differ.
2. Click a card to flip.
3. Grade your recall; scheduling adjusts automatically.
4. Show Stats for pair‑specific progress.
5. Reset Progress to regenerate fresh scheduling for the current pair.

Quiz pulls a random subset (defaults to 5) of the current pair’s cards.

### Data Model
`multilingualBase` holds canonical entries with three language keys (en, hi, te) plus category & pronunciations. Directional flashcards are generated on demand via `generateDirectionalCards(from, to)` producing front/back objects compatible with the spaced repetition system.

### Persistence
Each language pair persists under key: `flashcards_{from}_{to}`. Language preferences stored under `lang_from` and `lang_to`.

### Spaced Repetition
Intervals escalate based on performance (incorrect resets; easy accelerates). Cards become “mastered” as internal difficulty rises.

### Extending
1. Add new base term: append to `multilingualBase` with unique id.
2. Optionally add pronunciation for each target language.
3. The UI automatically includes it for all direction pairs.

### Roadmap Ideas
- Audio pronunciation integration
- Filtering by category (colors, food, etc.)
- Adaptive quiz length & difficulty toggles
- Export / import user progress

### License
MIT

