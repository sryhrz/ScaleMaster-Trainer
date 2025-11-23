import React from 'react';
import { NOTE_BUTTONS } from '../constants';
import { NoteName, Accidental } from '../types';

interface KeyPadProps {
  onNoteSelect: (note: NoteName) => void;
  onAccidentalSelect: (acc: Accidental) => void;
  currentNote: NoteName | null;
  currentAccidental: Accidental;
  onSubmit: () => void;
  disabled: boolean;
}

const KeyPad: React.FC<KeyPadProps> = ({ 
  onNoteSelect, 
  onAccidentalSelect, 
  currentNote, 
  currentAccidental,
  onSubmit,
  disabled
}) => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col gap-4">
      {/* Note Row */}
      <div className="grid grid-cols-7 gap-1 sm:gap-2">
        {NOTE_BUTTONS.map((note) => (
          <button
            key={note}
            disabled={disabled}
            onClick={() => onNoteSelect(note as NoteName)}
            className={`
              aspect-[3/4] rounded-lg text-lg sm:text-2xl font-bold shadow-sm transition-all active:scale-95
              flex items-center justify-center
              ${currentNote === note 
                ? 'bg-indigo-600 text-white shadow-indigo-200' 
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
              }
            `}
          >
            {note}
          </button>
        ))}
      </div>

      {/* Accidentals Row */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        <button
          disabled={disabled}
          onClick={() => onAccidentalSelect('#')}
          className={`
            h-14 sm:h-16 rounded-lg text-2xl sm:text-3xl font-serif font-medium shadow-sm transition-all active:scale-95
            flex items-center justify-center
            ${currentAccidental === '#' 
              ? 'bg-slate-800 text-white' 
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50'
            }
          `}
        >
          ♯
        </button>
        <button
          disabled={disabled}
          onClick={() => onAccidentalSelect('b')}
          className={`
            h-14 sm:h-16 rounded-lg text-2xl sm:text-3xl font-serif font-medium shadow-sm transition-all active:scale-95
            flex items-center justify-center pb-1
            ${currentAccidental === 'b' 
              ? 'bg-slate-800 text-white' 
              : 'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50'
            }
          `}
        >
          ♭
        </button>
        <button
          disabled={disabled}
          onClick={() => onAccidentalSelect('')}
          className={`
            h-14 sm:h-16 rounded-lg text-base sm:text-lg font-semibold uppercase tracking-wider shadow-sm transition-all active:scale-95
            flex items-center justify-center
            bg-slate-100 text-slate-500 hover:bg-slate-200 border border-transparent
          `}
        >
          Reset
        </button>
      </div>

      {/* Submit Button */}
      <button
        onClick={onSubmit}
        disabled={disabled || !currentNote}
        className={`
          mt-2 w-full h-14 rounded-xl text-lg font-bold tracking-wide text-white shadow-lg transition-all active:scale-95
          ${disabled || !currentNote 
            ? 'bg-slate-300 cursor-not-allowed shadow-none' 
            : 'bg-green-500 hover:bg-green-600 shadow-green-200'
          }
        `}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default KeyPad;
