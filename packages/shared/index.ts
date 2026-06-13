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
export { calculateBazi, generateBaziReport } from './data/bazi-calculator';

// 数字命理
export { calculateNumerology, generateNumerologyReport } from './data/numerology-calculator';
