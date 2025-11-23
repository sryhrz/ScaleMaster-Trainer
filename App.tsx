import React, { useState, useEffect, useCallback } from 'react';
import { SCALES, DEGREE_LABELS } from './constants';
import { NoteName, Accidental } from './types';
import KeyPad from './components/KeyPad';

// Helper to play local audio files for feedback
const playFeedbackSound = (type: 'correct' | 'incorrect') => {
  try {
    const fileName = type === 'correct' ? './correct.mp3' : './incorrect.mp3';
    const audio = new Audio(fileName);
    audio.play().catch((err) => {
      console.warn('Audio playback prevented or failed:', err);
    });
  } catch (error) {
    console.error('Failed to play audio feedback', error);
  }
};

function App() {
  // -- State --
  const [selectedScaleKey, setSelectedScaleKey] = useState<string>('C');
  const [targetDegree, setTargetDegree] = useState<number>(1);
  const [inputNote, setInputNote] = useState<NoteName | null>(null);
  const [inputAccidental, setInputAccidental] = useState<Accidental>('');
  const [feedbackStatus, setFeedbackStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [isAnimating, setIsAnimating] = useState(false);

  // -- Derived State --
  const currentScale = SCALES[selectedScaleKey];
  
  // Generate a random degree (1-7)
  const generateNewQuestion = useCallback(() => {
    const newDegree = Math.floor(Math.random() * 7) + 1;
    setTargetDegree(newDegree);
    // Reset inputs
    setInputNote(null);
    setInputAccidental('');
    setFeedbackStatus('idle');
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);
  }, []);

  // Initialize on mount
  useEffect(() => {
    generateNewQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run once on mount

  // Change scale handler
  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedScaleKey(e.target.value);
    // When scale changes, reset the game state but keep current degree or randomize? 
    // Better to randomize to avoid confusion if the degree stays same but answer changes drastically.
    setTimeout(() => generateNewQuestion(), 100);
  };

  // Input Handlers
  const handleNoteSelect = (note: NoteName) => {
    if (feedbackStatus !== 'idle') return;
    setInputNote(note);
  };

  const handleAccidentalSelect = (acc: Accidental) => {
    if (feedbackStatus !== 'idle') return;
    setInputAccidental(acc);
  };

  const checkAnswer = () => {
    if (!inputNote) return;

    // Music Theory Logic:
    // Standard text notation usually puts accidental after note (e.g., C#).
    // Our constants use this format (e.g., 'F#', 'Eb', 'C').
    // We construct the user's answer in standard format for comparison.
    const userStandardString = `${inputNote}${inputAccidental}`;
    
    // Get correct answer from data
    // targetDegree is 1-based index, array is 0-based
    const correctNote = currentScale.notes[targetDegree - 1];

    if (userStandardString === correctNote) {
      setFeedbackStatus('correct');
      playFeedbackSound('correct');
      // Auto advance after short delay
      setTimeout(() => {
        generateNewQuestion();
      }, 1000);
    } else {
      setFeedbackStatus('incorrect');
      playFeedbackSound('incorrect');
      // Allow retry after short delay or manual reset? 
      // Let's reset status to idle after 1s so they can try again, 
      // OR keep it incorrect until they change input.
      // Better UX: Shake animation, show "Try Again", then reset status to allow editing.
      setTimeout(() => {
        setFeedbackStatus('idle');
      }, 1000);
    }
  };

  // Render Helpers
  const formatAccidentalDisplay = (acc: Accidental) => {
    if (acc === '#') return '♯';
    if (acc === 'b') return '♭';
    return '';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-start p-4 no-select font-sans">
      
      {/* Header / Settings */}
      <header className="w-full max-w-md flex flex-col gap-2 mb-6">
        <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider ml-1">
          Select Target Scale
        </label>
        <div className="relative">
          <select 
            value={selectedScaleKey}
            onChange={handleScaleChange}
            className="w-full p-4 bg-white border border-slate-200 text-slate-800 text-lg font-bold rounded-2xl shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {Object.keys(SCALES).map(key => (
              <option key={key} value={key}>
                {SCALES[key].name}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </div>
        </div>
      </header>

      {/* Main Game Area */}
      <main className="w-full max-w-md flex-1 flex flex-col items-center gap-6">
        
        {/* Question Display */}
        <div className={`
            relative w-full aspect-[2/1] bg-white rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center justify-center gap-2 overflow-hidden
            transition-all duration-300 transform
            ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
          `}>
            
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

          <span className="text-slate-400 text-sm font-medium uppercase tracking-widest">Target Degree</span>
          <div className="text-8xl font-black text-slate-800 tabular-nums leading-none">
            {targetDegree}
          </div>
          <span className="text-slate-400 font-serif italic text-lg">
            ( {DEGREE_LABELS[targetDegree - 1]} )
          </span>
        </div>

        {/* Input Display Area */}
        {/* User Request: "例如我先按了C再按了#，这个时候应该显示#C" -> Display Accidental THEN Note */}
        <div className={`
          w-full h-24 rounded-2xl flex items-center justify-center gap-1 transition-colors duration-300 border-2
          ${feedbackStatus === 'idle' ? 'bg-slate-100 border-slate-200' : ''}
          ${feedbackStatus === 'correct' ? 'bg-green-50 border-green-500 text-green-700' : ''}
          ${feedbackStatus === 'incorrect' ? 'bg-red-50 border-red-500 text-red-700 animate-pulse' : ''}
        `}>
          {!inputNote ? (
            <span className="text-slate-300 text-2xl font-medium">Select a note...</span>
          ) : (
            <div className="flex items-center justify-center text-6xl font-black">
              {/* Accidental First (Visual Requirement) */}
              <span className="font-serif -mt-2 mr-1">
                {formatAccidentalDisplay(inputAccidental)}
              </span>
              {/* Note Name Second */}
              <span>
                {inputNote}
              </span>
            </div>
          )}
        </div>

        {/* Feedback Message Overlay (Optional, visually managed by color above mostly) */}
        <div className="h-6 flex items-center justify-center">
            {feedbackStatus === 'correct' && <span className="text-green-600 font-bold tracking-wider">CORRECT!</span>}
            {feedbackStatus === 'incorrect' && <span className="text-red-500 font-bold tracking-wider">TRY AGAIN</span>}
        </div>

        {/* Keyboard Controls */}
        <div className="w-full mt-auto mb-6">
          <KeyPad
            currentNote={inputNote}
            currentAccidental={inputAccidental}
            onNoteSelect={handleNoteSelect}
            onAccidentalSelect={handleAccidentalSelect}
            onSubmit={checkAnswer}
            disabled={feedbackStatus !== 'idle'}
          />
        </div>

      </main>
    </div>
  );
}

export default App;