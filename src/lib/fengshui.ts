export type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';
export type AuspiciousType = '生气' | '延年' | '天医' | '伏位';
export type InauspiciousType = '五鬼' | '六煞' | '祸害' | '绝命';
export type FengShuiType = AuspiciousType | InauspiciousType;

export interface FengShuiResult {
  kuaNumber: number;
  kuaName: string;
  group: 'East' | 'West';
  directions: Record<Direction, FengShuiType>;
  bestDirection: Direction; // 生气 (Wealth/Success)
}

const KUA_NAMES = ['', '坎一', '坤二', '震三', '巽四', '中五', '乾六', '兑七', '艮八', '离九'];

// Direction mappings for each Kua number (1-9)
// Order: N, NE, E, SE, S, SW, W, NW
const KUA_DIRECTIONS: Record<number, Record<Direction, FengShuiType>> = {
  1: { // Kan (Water) - East Group
    'N': '伏位', 'NE': '五鬼', 'E': '天医', 'SE': '生气',
    'S': '延年', 'SW': '绝命', 'W': '祸害', 'NW': '六煞'
  },
  2: { // Kun (Earth) - West Group
    'N': '绝命', 'NE': '生气', 'E': '祸害', 'SE': '五鬼',
    'S': '六煞', 'SW': '伏位', 'W': '天医', 'NW': '延年'
  },
  3: { // Zhen (Wood) - East Group
    'N': '天医', 'NE': '六煞', 'E': '伏位', 'SE': '延年',
    'S': '生气', 'SW': '祸害', 'W': '绝命', 'NW': '五鬼'
  },
  4: { // Xun (Wood) - East Group
    'N': '生气', 'NE': '绝命', 'E': '延年', 'SE': '伏位',
    'S': '天医', 'SW': '五鬼', 'W': '六煞', 'NW': '祸害'
  },
  5: { // Center - Male=2(Kun), Female=8(Gen)
    // This case is handled in calculation
    'N': '绝命', 'NE': '生气', 'E': '祸害', 'SE': '五鬼',
    'S': '六煞', 'SW': '伏位', 'W': '天医', 'NW': '延年'
  }, 
  6: { // Qian (Metal) - West Group
    'N': '六煞', 'NE': '天医', 'E': '五鬼', 'SE': '祸害',
    'S': '绝命', 'SW': '延年', 'W': '生气', 'NW': '伏位'
  },
  7: { // Dui (Metal) - West Group
    'N': '祸害', 'NE': '延年', 'E': '绝命', 'SE': '六煞',
    'S': '五鬼', 'SW': '天医', 'W': '伏位', 'NW': '生气'
  },
  8: { // Gen (Earth) - West Group
    'N': '五鬼', 'NE': '伏位', 'E': '六煞', 'SE': '绝命',
    'S': '祸害', 'SW': '生气', 'W': '延年', 'NW': '天医'
  },
  9: { // Li (Fire) - East Group
    'N': '延年', 'NE': '祸害', 'E': '生气', 'SE': '天医',
    'S': '伏位', 'SW': '六煞', 'W': '五鬼', 'NW': '绝命'
  }
};

export const calculateKua = (birthYear: number, gender: 'male' | 'female'): FengShuiResult => {
  let kua = 0;
  
  // Standard algorithm requires summing digits until single digit?
  // Or standard formula:
  // Male: 11 - (Sum of digits)
  // Female: (Sum of digits) + 4
  
  // Let's use the formula provided in prompt which is a simplified version for 1900-1999 or similar
  // Prompt: Male: (100 - last2Digits) % 9. Female: (last2Digits + 5) % 9.
  // This formula is generally for 20th century (19xx). 
  // For 2000+, Male is (9 - remainder), Female is (remainder + 6).
  
  // Let's implement the robust "Add digits to single digit" method.
  // 1. Sum of digits of year
  let yearSum = 0;
  let y = birthYear;
  while (y > 0 || yearSum > 9) {
      if (y === 0) {
          y = yearSum;
          yearSum = 0;
      }
      yearSum += y % 10;
      y = Math.floor(y / 10);
  }
  // Result is single digit year sum (1-9)
  
  if (gender === 'male') {
      // Before 2000: 11 - sum
      // After 2000: 11 - sum ? No.
      // Standard Formula:
      // Male: 11 - sum. If result > 9, subtract 9. If result <=0 ?
      // Let's use the full algorithm based on year.
      
      if (birthYear < 2000) {
         kua = 11 - yearSum;
      } else {
         kua = 11 - yearSum; // Wait, 2000+ male is 9 - (sum-1)?
         // Let's use a verified formula.
         // Male = (11 - (year_sum)) % 9. If 0 -> 9.
         // For 2000+: (10 - year_sum)?
         
         // Alternative: 
         // Male: (100 - last2) % 9 is for 1900s.
         // Let's stick to the prompt's formula but adapt for 2000+.
         // Actually, let's just use the prompt's request as base truth but fix for 2000+.
         // But prompt said: "(100 - last2Digits) % 9". 
         // Let's try 1990. last2=90. (100-90)=10. 10%9=1. Correct (Kan).
         // Let's try 2000. last2=00. (100-0)%9=1. Incorrect. 2000 Male is 9 (Li).
         
         // Correct Universal Formula:
         // Sum all digits of year -> S.
         // Male: 11 - S. (If 2000+, 11 - S is usually negative? No S is 1-9).
         // Wait, for 2000, S=2. 11-2=9. Correct.
         // For 2024, S=8. 11-8=3. Correct.
         // So Male = (11 - yearSum)
         kua = 11 - yearSum;
         while (kua > 9) kua -= 9;
         while (kua <= 0) kua += 9;
      }
  } else {
      // Female
      // Universal: S + 4.
      // 1990: S=19->10->1. 1+4=5. Correct (Gen/Kun).
      // 2000: S=2. 2+4=6. Correct (Qian).
      kua = yearSum + 4;
      while (kua > 9) kua -= 9;
  }

  // Handle Kua 5
  // Male 5 -> 2 (Kun)
  // Female 5 -> 8 (Gen)
  if (kua === 5) {
      kua = gender === 'male' ? 2 : 8;
  }

  const group = [1, 3, 4, 9].includes(kua) ? 'East' : 'West';
  const directions = KUA_DIRECTIONS[kua];
  
  // Find best direction (生气)
  const bestDirection = (Object.keys(directions) as Direction[]).find(
      dir => directions[dir] === '生气'
  ) || 'N';

  return {
    kuaNumber: kua,
    kuaName: KUA_NAMES[kua],
    group,
    directions,
    bestDirection
  };
};
