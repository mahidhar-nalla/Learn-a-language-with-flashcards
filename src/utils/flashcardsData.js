// Reworked multilingual dataset.
// Each entry contains translations for English (en), Hindi (hi), Telugu (te).
// Pronunciations (where helpful) provided per target language.
// This base list is intentionally larger to expand learning content.
export const multilingualBase = [
  // Basic greetings & common
  { id: 1,  category: 'greeting', en: 'Hello',        hi: 'नमस्ते',         te: 'హలో',        pronunciation: { hi: 'Namaste', te: 'Halo' } },
  { id: 2,  category: 'greeting', en: 'Thank you',    hi: 'धन्यवाद',       te: 'ధన్యవాదాలు', pronunciation: { hi: 'Dhanyavaad', te: 'Dhanyavaadaalu' } },
  { id: 3,  category: 'greeting', en: 'Good morning', hi: 'सुप्रभात',       te: 'శుభోదయం',    pronunciation: { hi: 'Suprabhaat', te: 'Shubhodayam' } },
  { id: 4,  category: 'greeting', en: 'Good evening', hi: 'शुभ संध्या',     te: 'శుభ సాయంత్రం', pronunciation: { hi: 'Shubh Sandhya', te: 'Shubha Saayantram' } },
  { id: 5,  category: 'greeting', en: 'Goodbye',      hi: 'अलविदा',         te: 'వీడ్కోలు',    pronunciation: { hi: 'Alvida', te: 'Veedkolu' } },
  { id: 6,  category: 'greeting', en: 'Please',       hi: 'कृपया',          te: 'దయచేసి',     pronunciation: { hi: 'Kripaya', te: 'Dayachesi' } },
  { id: 7,  category: 'greeting', en: 'Sorry',        hi: 'क्षमा करें',      te: 'క్షమించండి', pronunciation: { hi: 'Kshama Karen', te: 'Kshaminchandi' } },
  { id: 8,  category: 'greeting', en: 'Welcome',      hi: 'स्वागत है',       te: 'స్వాగతం',    pronunciation: { hi: 'Swagat hai', te: 'Swaagatam' } },

  // People & relations
  { id: 21, category: 'people', en: 'Mother', hi: 'माँ',      te: 'అమ్మ',      pronunciation: { hi: 'Maa', te: 'Amma' } },
  { id: 22, category: 'people', en: 'Father', hi: 'पिता',     te: 'నాన్న',     pronunciation: { hi: 'Pita', te: 'Nanna' } },
  { id: 23, category: 'people', en: 'Brother',hi: 'भाई',      te: 'అన్న / తమ్ముడు', pronunciation: { hi: 'Bhaai', te: 'Anna / Tammudu' } },
  { id: 24, category: 'people', en: 'Sister', hi: 'बहन',      te: 'అక్క / చెల్లి', pronunciation: { hi: 'Behan', te: 'Akka / Chelli' } },
  { id: 25, category: 'people', en: 'Friend', hi: 'दोस्त',    te: 'స్నేహితుడు', pronunciation: { hi: 'Dost', te: 'Snehitudu' } },
  { id: 26, category: 'people', en: 'Family', hi: 'परिवार',  te: 'కుటుంబం',   pronunciation: { hi: 'Parivaar', te: 'Kutumbam' } },

  // Basic nouns
  { id: 41, category: 'noun', en: 'Water',    hi: 'पानी',     te: 'నీళ్ళు',    pronunciation: { hi: 'Paani', te: 'Neellu' } },
  { id: 42, category: 'noun', en: 'Food',     hi: 'भोजन',     te: 'ఆహారం',     pronunciation: { hi: 'Bhojan', te: 'Aahaaram' } },
  { id: 43, category: 'noun', en: 'Book',     hi: 'किताब',    te: 'పుస్తకం',   pronunciation: { hi: 'Kitaab', te: 'Pustakam' } },
  { id: 44, category: 'noun', en: 'House',    hi: 'घर',       te: 'ఇల్లు',     pronunciation: { hi: 'Ghar', te: 'Illu' } },
  { id: 45, category: 'noun', en: 'Car',      hi: 'कार',      te: 'కారు',      pronunciation: { hi: 'Kaar', te: 'Kaaru' } },
  { id: 46, category: 'noun', en: 'School',   hi: 'स्कूल',     te: 'పాఠశాల',    pronunciation: { hi: 'School', te: 'Paathashaala' } },
  { id: 47, category: 'noun', en: 'Phone',    hi: 'फ़ोन',      te: 'ఫోన్',       pronunciation: { hi: 'Phone', te: 'Phone' } },
  { id: 48, category: 'noun', en: 'Computer', hi: 'कंप्यूटर',  te: 'కంప్యూటర్', pronunciation: { hi: 'Computer', te: 'Computer' } },
  { id: 49, category: 'noun', en: 'Money',    hi: 'पैसा',     te: 'డబ్బు',      pronunciation: { hi: 'Paisa', te: 'Dabbu' } },

  // Colors
  { id: 61, category: 'color', en: 'Red',    hi: 'लाल',    te: 'ఎరుపు',    pronunciation: { hi: 'Laal', te: 'Erupu' } },
  { id: 62, category: 'color', en: 'Blue',   hi: 'नीला',   te: 'నీలం',      pronunciation: { hi: 'Neela', te: 'Neelam' } },
  { id: 63, category: 'color', en: 'Green',  hi: 'हरा',    te: 'పచ్చ',      pronunciation: { hi: 'Haraa', te: 'Pachcha' } },
  { id: 64, category: 'color', en: 'Yellow', hi: 'पीला',   te: 'పసుపు',     pronunciation: { hi: 'Peela', te: 'Pasupu' } },
  { id: 65, category: 'color', en: 'Black',  hi: 'काला',   te: 'నలుపు',     pronunciation: { hi: 'Kaala', te: 'Nalupu' } },
  { id: 66, category: 'color', en: 'White',  hi: 'सफेद',   te: 'తెలుపు',     pronunciation: { hi: 'Safed', te: 'Telupu' } },
  { id: 67, category: 'color', en: 'Orange', hi: 'नारंगी',  te: 'నారింజ',    pronunciation: { hi: 'Narangee', te: 'Narinja' } },

  // Body Parts
  { id: 81, category: 'body', en: 'Head',  hi: 'सिर',  te: 'తల',   pronunciation: { hi: 'Sir', te: 'Tala' } },
  { id: 82, category: 'body', en: 'Hand',  hi: 'हाथ',  te: 'చేయి', pronunciation: { hi: 'Haath', te: 'Cheyi' } },
  { id: 83, category: 'body', en: 'Eye',   hi: 'आंख',  te: 'కన్ను', pronunciation: { hi: 'Aankh', te: 'Kannu' } },
  { id: 84, category: 'body', en: 'Mouth', hi: 'मुंह',  te: 'నోరు', pronunciation: { hi: 'Munh', te: 'Noru' } },
  { id: 85, category: 'body', en: 'Nose',  hi: 'नाक',   te: 'ముక్కు', pronunciation: { hi: 'Naak', te: 'Mukku' } },

  // Animals
  { id: 101, category: 'animal', en: 'Dog',  hi: 'कुत्ता', te: 'కుక్క', pronunciation: { hi: 'Kuttaa', te: 'Kukka' } },
  { id: 102, category: 'animal', en: 'Cat',  hi: 'बिल्ली', te: 'పిల్లి', pronunciation: { hi: 'Billi', te: 'Pilli' } },
  { id: 103, category: 'animal', en: 'Cow',  hi: 'गाय',    te: 'ఆవు', pronunciation: { hi: 'Gaay', te: 'Aavu' } },
  { id: 104, category: 'animal', en: 'Bird', hi: 'पक्षी',  te: 'పక్షి', pronunciation: { hi: 'Pakshi', te: 'Pakshi' } },
  { id: 105, category: 'animal', en: 'Fish', hi: 'मछली',  te: 'చేప', pronunciation: { hi: 'Machhli', te: 'Chepa' } },

  // Food Items
  { id: 121, category: 'food', en: 'Rice',    hi: 'चावल',  te: 'అన్నం', pronunciation: { hi: 'Chaawal', te: 'Annam' } },
  { id: 122, category: 'food', en: 'Bread',   hi: 'रोटी',  te: 'రొట్టె', pronunciation: { hi: 'Roti', te: 'Rotte' } },
  { id: 123, category: 'food', en: 'Milk',    hi: 'दूध',   te: 'పాలు', pronunciation: { hi: 'Doodh', te: 'Paalu' } },
  { id: 124, category: 'food', en: 'Tea',     hi: 'चाय',   te: 'టీ', pronunciation: { hi: 'Chaay', te: 'Tea' } },
  { id: 125, category: 'food', en: 'Coffee',  hi: 'कॉफ़ी', te: 'కాఫీ', pronunciation: { hi: 'Coffee', te: 'Coffee' } },
  { id: 126, category: 'food', en: 'Sugar',   hi: 'चीनी',  te: 'చక్కెర', pronunciation: { hi: 'Cheenee', te: 'Chakkera' } },
  { id: 127, category: 'food', en: 'Salt',    hi: 'नमक',   te: 'ఉప్పు', pronunciation: { hi: 'Namak', te: 'Uppu' } },
  { id: 128, category: 'food', en: 'Spice',   hi: 'मसाला', te: 'మసాలా', pronunciation: { hi: 'Masaala', te: 'Masaala' } },
  { id: 129, category: 'food', en: 'Oil',     hi: 'तेल',    te: 'నూనె', pronunciation: { hi: 'Tel', te: 'Noone' } },

  // Time & numbers (subset)
  { id: 141, category: 'time', en: 'Today',    hi: 'आज',   te: 'ఈరోజు', pronunciation: { hi: 'Aaj', te: 'Eeroju' } },
  { id: 142, category: 'time', en: 'Tomorrow', hi: 'कल',   te: 'రేపు', pronunciation: { hi: 'Kal', te: 'Repu' } },
  { id: 143, category: 'time', en: 'Time',     hi: 'समय',  te: 'సమయం', pronunciation: { hi: 'Samay', te: 'Samayam' } },
  { id: 144, category: 'number', en: 'One',    hi: 'एक',   te: 'ఒకటి', pronunciation: { hi: 'Ek', te: 'Okati' } },
  { id: 145, category: 'number', en: 'Two',    hi: 'दो',   te: 'రెండు', pronunciation: { hi: 'Do', te: 'Rendu' } },
  { id: 146, category: 'number', en: 'Three',  hi: 'तीन',  te: 'మూడు', pronunciation: { hi: 'Teen', te: 'Moodu' } },
  { id: 147, category: 'number', en: 'Four',   hi: 'चार',  te: 'నాలుగు', pronunciation: { hi: 'Chaar', te: 'Naalugu' } },
  { id: 148, category: 'number', en: 'Five',   hi: 'पाँच', te: 'ఐదు', pronunciation: { hi: 'Paanch', te: 'Aidu' } },
  { id: 149, category: 'number', en: 'Ten',    hi: 'दस',   te: 'పది', pronunciation: { hi: 'Das', te: 'Padi' } },
];

// Supported language codes mapped to display names
export const LANGUAGE_LABELS = {
  en: 'English',
  hi: 'Hindi',
  te: 'Telugu'
};

// Generate directional flashcards from base list according to selected source & target languages.
export const generateDirectionalCards = (from, to) => {
  if (from === to) return [];
  return multilingualBase.map(base => ({
    id: `${base.id}-${from}-${to}`,
    baseId: base.id,
    category: base.category,
    from,
    to,
    front: { word: base[from], language: LANGUAGE_LABELS[from] },
    back: { word: base[to], language: LANGUAGE_LABELS[to], pronunciation: base.pronunciation?.[to] },
    difficulty: 1,
    lastReviewed: null,
    nextReview: new Date(),
    correctCount: 0,
    incorrectCount: 0
  }));
};

// Backwards compatibility: sampleFlashcards alias (default English -> Hindi) for any older code paths.
export const sampleFlashcards = generateDirectionalCards('en', 'hi');
