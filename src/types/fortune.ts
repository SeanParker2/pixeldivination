export interface FortuneScores {
  health: number;
  academic: number;
  social: number;
  love: number;
  career: number;
  wealth: number;
}

export interface FortuneTexts {
  overall: string;
  love: string;
  career: string;
  wealth: string;
  others: string;
}

export interface FortuneData {
  date: string; // YYYY-MM-DD
  zodiac: string;
  scores: FortuneScores;
  texts: FortuneTexts;
}
