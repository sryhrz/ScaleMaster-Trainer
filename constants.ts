import { ScaleData } from './types';

// Definition of 15 Natural Major Scales (Circle of Fifths)
export const SCALES: Record<string, ScaleData> = {
  // Natural
  'C': { name: 'C Major', notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'] },
  
  // Sharps
  'G': { name: 'G Major (1#)', notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'] },
  'D': { name: 'D Major (2#)', notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'] },
  'A': { name: 'A Major (3#)', notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'] },
  'E': { name: 'E Major (4#)', notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'] },
  'B': { name: 'B Major (5#)', notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'] },
  'F#': { name: 'F# Major (6#)', notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'] },
  'C#': { name: 'C# Major (7#)', notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'] },

  // Flats
  'F': { name: 'F Major (1b)', notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'] },
  'Bb': { name: 'Bb Major (2b)', notes: ['Bb', 'C', 'D', 'Eb', 'F', 'G', 'A'] },
  'Eb': { name: 'Eb Major (3b)', notes: ['Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D'] },
  'Ab': { name: 'Ab Major (4b)', notes: ['Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G'] },
  'Db': { name: 'Db Major (5b)', notes: ['Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C'] },
  'Gb': { name: 'Gb Major (6b)', notes: ['Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F'] },
  'Cb': { name: 'Cb Major (7b)', notes: ['Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb'] },
};

export const NOTE_BUTTONS: string[] = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export const DEGREE_LABELS = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];
