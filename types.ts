export interface ScaleData {
  name: string;
  notes: string[]; // Array of 7 notes, e.g., ['C', 'D', 'E', 'F', 'G', 'A', 'B']
}

export type NoteName = 'C' | 'D' | 'E' | 'F' | 'G' | 'A' | 'B';
export type Accidental = '' | '#' | 'b';

export interface GameState {
  selectedScaleKey: string;
  targetDegree: number; // 1-7
  inputNote: NoteName | null;
  inputAccidental: Accidental;
  feedbackStatus: 'idle' | 'correct' | 'incorrect';
  streak: number;
}
