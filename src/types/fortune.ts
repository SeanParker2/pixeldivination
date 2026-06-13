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

export interface LuckyItems {
  color: string;        // 幸运颜色
  colorHex: string;     // 颜色色值
  number: string;       // 幸运数字
  direction: string;    // 幸运方位
  time: string;         // 幸运时段
  gemstone: string;     // 幸运宝石
}

export interface AuspiciousInfo {
  suitable: string[];   // 宜
  unsuitable: string[]; // 忌
  auspiciousHours: string;  // 吉时
  inauspiciousHours: string; // 凶时
}

export interface ZodiacCompatibility {
  best: string[];       // 最佳配对星座
  good: string[];       // 良好配对星座
  challenging: string[]; // 需要注意的星座
}

export interface FortuneData {
  date: string; // YYYY-MM-DD
  zodiac: string;
  scores: FortuneScores;
  texts: FortuneTexts;
  lucky?: LuckyItems;
  auspicious?: AuspiciousInfo;
  compatibility?: ZodiacCompatibility;
  position?: string;    // 今日建议方位
  advice?: string;      // 综合建议
}

// 月度运势
export interface MonthlyFortune {
  month: string; // YYYY-MM
  zodiac: string;
  overallScore: number;
  scores: FortuneScores;
  texts: {
    overall: string;
    love: string;
    career: string;
    wealth: string;
    health: string;
  };
  keyDates: { date: string; event: string; type: 'good' | 'neutral' | 'warning' }[];
  advice: string;
}

// 年度运势
export interface YearlyFortune {
  year: string; // YYYY
  zodiac: string;
  overallScore: number;
  scores: FortuneScores;
  texts: {
    overall: string;
    love: string;
    career: string;
    wealth: string;
    health: string;
    spiritual: string;
  };
  monthlyHighlights: { month: string; highlight: string; score: number }[];
  advice: string;
}
