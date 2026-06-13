import api from '../lib/api';

// ========== 类型定义 ==========

export type SpreadType = 'single' | 'three_card' | 'celtic_cross' | 'relationship' | 'decision' | 'monthly';

export interface TarotDrawParams {
  question?: string;
  spreadType?: SpreadType;
  deckType?: string;
  persona?: string;
}

export interface LenormandDrawParams {
  question?: string;
  spreadType?: 'single' | 'three_card' | 'nine_card' | 'grand_tableau';
  persona?: string;
}

export interface BaziParams {
  birthDate: string;
  birthHour?: number;
  gender?: 'male' | 'female';
  persona?: string;
}

export interface NumerologyParams {
  birthDate: string;
  fullName?: string;
  persona?: string;
}

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: string;
  upright: {
    keywords: string[];
    meaning: string;
    love: string;
    career: string;
    finance: string;
    health: string;
  };
  reversed: {
    keywords: string[];
    meaning: string;
    love: string;
    career: string;
    finance: string;
    health: string;
  };
}

export interface DrawnCard {
  position: string;
  cardName: string;
  cardNameEn: string;
  orientation: '正位' | '逆位';
  keywords: string[];
  meaning: string;
}

export interface LenormandCard {
  id: number;
  name: string;
  nameEn: string;
  keywords: string[];
  meaning: {
    general: string;
    love: string;
    career: string;
    finance: string;
    health: string;
    timing: string;
    advice: string;
  };
}

export interface DrawnLenormandCard {
  position: string;
  cardId: number;
  cardName: string;
  cardNameEn: string;
  keywords: string[];
  meaning: {
    general: string;
    love: string;
    career: string;
    finance: string;
    health: string;
    timing: string;
    advice: string;
  };
}

export interface BaziResult {
  fourPillars: {
    year: { stem: string; branch: string };
    month: { stem: string; branch: string };
    day: { stem: string; branch: string };
    hour: { stem: string; branch: string };
  };
  dayMaster: string;
  dayElement: string;
  fiveElements: Record<string, number>;
  strongWeak: string;
  personality: string;
  career: string;
  analysis: {
    yearPillar: string;
    monthPillar: string;
    dayPillar: string;
    hourPillar: string;
  };
}

export interface NumerologyResult {
  lifePathNumber: number;
  talentNumbers: number[];
  soulUrgeNumber: number | null;
  personalityNumber: number | null;
  meaning: {
    name: string;
    keywords: string[];
    personality: string;
    lifePath: string;
  };
}

export interface DivinationResult {
  id: string;
  cards?: DrawnCard[] | DrawnLenormandCard[];
  reading: string;
  spreadType?: string;
  spreadName?: string;
  baziData?: BaziResult;
  numerologyData?: NumerologyResult;
}

export interface SpreadConfig {
  count: number;
  name: string;
  positions: string[];
}

export interface DivinationHistoryResponse {
  items: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ========== 牌阵配置 ==========

export const SPREAD_CONFIGS: Record<string, SpreadConfig> = {
  single: { count: 1, name: '单牌占卜', positions: ['指引'] },
  three_card: { count: 3, name: '时间三牌', positions: ['过去', '现在', '未来'] },
  celtic_cross: { count: 10, name: '凯尔特十字', positions: ['现况', '挑战', '目标', '过去', '可能', '近未来', '自我', '环境', '希望', '结果'] },
  relationship: { count: 5, name: '关系牌阵', positions: ['你的感受', '对方的感受', '关系现状', '挑战', '建议'] },
  decision: { count: 4, name: '决策牌阵', positions: ['选项A', '选项B', '影响因素', '建议'] },
  monthly: { count: 5, name: '月相牌阵', positions: ['月初', '月中', '月末', '挑战', '收获'] },
};

// ========== 服务函数 ==========

export const divinationService = {
  // 塔罗牌占卜
  async drawTarot(params: TarotDrawParams): Promise<DivinationResult> {
    const result: any = await api.post('/divination/tarot', params);
    return result;
  },

  // 雷诺曼占卜
  async drawLenormand(params: LenormandDrawParams): Promise<DivinationResult> {
    const result: any = await api.post('/divination/lenormand', params);
    return result;
  },

  // 八字命理
  async calculateBazi(params: BaziParams): Promise<DivinationResult> {
    const result: any = await api.post('/divination/bazi', params);
    return result;
  },

  // 数字命理
  async calculateNumerology(params: NumerologyParams): Promise<DivinationResult> {
    const result: any = await api.post('/divination/numerology', params);
    return result;
  },

  // 获取占卜历史
  async getHistory(divType?: string, page = 1, limit = 20): Promise<DivinationHistoryResponse> {
    const params: Record<string, string> = {
      page: page.toString(),
      limit: limit.toString(),
    };
    if (divType) params.type = divType;
    
    const result: any = await api.get('/divination/history', { params });
    return result;
  },

  // 获取占卜详情
  async getById(id: string): Promise<any> {
    const result: any = await api.get(`/divination/${id}`);
    return result;
  },

  // 获取牌阵配置
  getSpreadConfig(spreadType: string): SpreadConfig | undefined {
    return SPREAD_CONFIGS[spreadType];
  },

  // 获取所有牌阵
  getAllSpreadConfigs(): Record<string, SpreadConfig> {
    return SPREAD_CONFIGS;
  },
};
