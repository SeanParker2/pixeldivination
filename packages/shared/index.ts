/**
 * @pixel-divination/shared
 * 前后端共享的数据、类型和工具函数
 */

// 塔罗牌
export { TAROT_DECK, getTarotCard, drawCards } from './data/tarot-deck';
export type { TarotCard } from './data/tarot-deck';

// 雷诺曼
export { LENORMAND_DECK, getLenormandCard, drawLenormandCards } from './data/lenormand-deck';
export type { LenormandCard } from './data/lenormand-deck';

// 八字
export {
  HEAVENLY_STEMS, EARTHLY_BRANCHES, FIVE_ELEMENTS,
  STEM_ELEMENTS, BRANCH_ELEMENTS, BRANCH_HIDDEN_STEMS,
  getTenGod, calculateFourPillars, calculateFiveElements,
  judgeStrongWeak, determineFavorableElements,
  getBaziAnalysis, calculateBazi, generateBaziReport,
} from './data/bazi-calculator';
export type { HeavenlyStem, EarthlyBranch, FiveElement, TenGod, FourPillars, BaziData, BaziAnalysis } from './data/bazi-calculator';

// 数字命理
export {
  NUMBER_MEANINGS, getLifePathNumber, getTalentNumbers,
  getSoulUrgeNumber, getPersonalityNumber, getDestinyNumber,
  getBirthdayNumber, getChallengeNumbers, getCycles,
  calculateNumerology, generateNumerologyReport,
} from './data/numerology-calculator';
export type { NumerologyProfile } from './data/numerology-calculator';
