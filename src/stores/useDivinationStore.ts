import { create } from 'zustand';
import { divinationService, type SpreadType, type DrawnCard, type DrawnLenormandCard } from '../services/divinationService';
import { useUserStore } from './useUserStore';
import { TAROT_DECK as SHARED_TAROT_DECK } from '@shared/data/tarot-deck';
import type { TarotCard as SharedTarotCard } from '@shared/data/tarot-deck';

// Card meanings for display (upright/reversed per area)
interface CardMeaning {
  keywords: string[];
  meaning: string;
  love: string;
  career: string;
  finance: string;
  health: string;
}

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  meaning: string; // primary meaning for quick display
  image: string;
  arcana: 'major' | 'minor';
  suit?: string;
  upright: CardMeaning;
  reversed: CardMeaning;
}

export interface SelectedTarotCard extends TarotCard {
  orientation: '正位' | '逆位';
  position?: string;
}

export interface SpreadConfig {
  id: SpreadType;
  name: string;
  count: number;
  description: string;
  positions: string[];
}

export const SPREAD_CONFIGS: SpreadConfig[] = [
  { id: 'single', name: '单牌占卜', count: 1, description: '快速提问、每日一抽', positions: ['指引'] },
  { id: 'three_card', name: '时间三牌', count: 3, description: '过去-现在-未来', positions: ['过去', '现在', '未来'] },
  { id: 'celtic_cross', name: '凯尔特十字', count: 10, description: '全面深度解读', positions: ['现况', '挑战', '目标', '过去', '可能', '近未来', '自我', '环境', '希望', '结果'] },
  { id: 'relationship', name: '关系牌阵', count: 5, description: '两人关系分析', positions: ['你的感受', '对方的感受', '关系现状', '挑战', '建议'] },
  { id: 'decision', name: '决策牌阵', count: 4, description: 'A vs B 选择', positions: ['选项A', '选项B', '影响因素', '建议'] },
  { id: 'monthly', name: '月相牌阵', count: 5, description: '每月运势', positions: ['月初', '月中', '月末', '挑战', '收获'] },
];

// Generate image path from card nameEn
const getImagePath = (nameEn: string, arcana: string): string => {
  if (arcana === 'major') {
    const majorFiles: Record<string, string> = {
      'The Fool': 'the_fool', 'The Magician': 'the_magician', 'The High Priestess': 'the_priestess',
      'The Empress': 'the_empress', 'The Emperor': 'the_emperor', 'The Hierophant': 'the_hierophant',
      'The Lovers': 'the_lovers', 'The Chariot': 'the_chariot', 'Strength': 'strength',
      'The Hermit': 'the_hermit', 'Wheel of Fortune': 'wheel_of_fortune', 'Justice': 'justice',
      'The Hanged Man': 'the_hanged_man', 'Death': 'death', 'Temperance': 'temperance',
      'The Devil': 'the_devil', 'The Tower': 'the_tower', 'The Star': 'the_star',
      'The Moon': 'the_moon', 'The Sun': 'the_sun', 'Judgement': 'judgement', 'The World': 'the_universe',
    };
    return `/images/tarot/${majorFiles[nameEn] || 'back'}.webp`;
  }
  // Minor arcana: "2 of Pentacles" -> "2_of_coins.webp" (pentacles = coins in images)
  const suitMap: Record<string, string> = { pentacles: 'coins', wands: 'wands', cups: 'cups', swords: 'swords' };
  const parts = nameEn.toLowerCase().replace(' of ', '_of_');
  const mapped = Object.entries(suitMap).reduce((acc, [from, to]) => acc.replace(from, to), parts);
  return `/images/tarot/${mapped}.webp`;
};

// Default meaning for cards without detailed data
const DEFAULT_MEANING: CardMeaning = {
  keywords: ['指引', '启示'],
  meaning: '请关注这张牌带给你的信息。',
  love: '感情方面有重要的信息。',
  career: '事业方面值得关注。',
  finance: '财务方面需要留意。',
  health: '健康方面保持关注。',
};

// Build full deck from shared package data
const buildFullDeck = (): TarotCard[] => {
  return SHARED_TAROT_DECK.map((card: SharedTarotCard) => ({
    id: card.id,
    name: card.name,
    nameEn: card.nameEn,
    meaning: card.upright?.keywords?.join('、') || '指引',
    image: getImagePath(card.nameEn, card.arcana),
    arcana: card.arcana,
    suit: card.suit,
    upright: card.upright || DEFAULT_MEANING,
    reversed: card.reversed || DEFAULT_MEANING,
  }));
};

export const TAROT_DECK: TarotCard[] = buildFullDeck();

interface DivinationState {
  step: 'intro' | 'shuffle' | 'draw' | 'reading';
  selectedSpread: SpreadType;
  selectedCards: SelectedTarotCard[];
  drawnCards: (DrawnCard | DrawnLenormandCard)[];
  isShuffling: boolean;

  // Reading State
  readingResult: string | null;
  spreadName: string | null;
  divinationId: string | null;
  hasAiReading: boolean;
  isLoadingAI: boolean;
  error: string | null;

  setStep: (step: 'intro' | 'shuffle' | 'draw' | 'reading') => void;
  setSpread: (spread: SpreadType) => void;
  startDivination: () => void;
  selectCard: (card: TarotCard) => void;
  resetDivination: () => void;
  generateReading: (question?: string) => Promise<void>;
  generateAiReading: () => Promise<void>;
}

export const useDivinationStore = create<DivinationState>((set, get) => ({
  step: 'intro',
  selectedSpread: 'three_card',
  selectedCards: [],
  drawnCards: [],
  isShuffling: false,
  readingResult: null,
  spreadName: null,
  divinationId: null,
  hasAiReading: false,
  isLoadingAI: false,
  error: null,

  setStep: (step) => set({ step }),

  setSpread: (spread) => set({ selectedSpread: spread }),

  startDivination: () => {
    set({ isShuffling: true, step: 'shuffle', selectedCards: [], drawnCards: [], readingResult: null });
    setTimeout(() => {
      set({ isShuffling: false, step: 'draw' });
    }, 2000);
  },

  selectCard: (card) => {
    const { selectedCards, selectedSpread } = get();
    const spreadConfig = SPREAD_CONFIGS.find(s => s.id === selectedSpread);
    const maxCards = spreadConfig?.count || 3;

    if (selectedCards.length < maxCards) {
      // Randomly assign orientation (正位/逆位)
      const isReversed = Math.random() > 0.5;
      const orientation = isReversed ? '逆位' : '正位';
      const position = spreadConfig?.positions[selectedCards.length] || `位置${selectedCards.length + 1}`;

      const selectedCard: SelectedTarotCard = {
        ...card,
        orientation,
        position,
      };

      const newSelection = [...selectedCards, selectedCard];
      set({ selectedCards: newSelection });

      if (newSelection.length === maxCards) {
        setTimeout(() => {
          set({ step: 'reading' });
        }, 500);
      }
    }
  },

  resetDivination: () => {
    set({
      step: 'intro',
      selectedCards: [],
      drawnCards: [],
      readingResult: null,
      spreadName: null,
      divinationId: null,
      hasAiReading: false,
      error: null,
    });
  },

  generateReading: async (question) => {
    const { selectedSpread } = get();

    set({ isLoadingAI: true, error: null });

    try {
      const activePersona = useUserStore.getState().activePersona;
      const result = await divinationService.drawTarot({
        question: question || '请解读我的塔罗牌阵',
        spreadType: selectedSpread,
        persona: activePersona,
      });

      set({
        readingResult: result.reading,
        drawnCards: result.cards || [],
        spreadName: result.spreadName || null,
        divinationId: result.id || null,
        hasAiReading: false,
      });
    } catch (err: unknown) {
      const axiosError = err as { isRateLimit?: boolean; userMessage?: string };
      if (axiosError.isRateLimit) {
        set({ error: axiosError.userMessage || '今日免费次数已用完，请升级 Pro 会员享受无限次数' });
      } else {
        set({ error: axiosError.userMessage || '无法连接到宇宙信号，请稍后再试。' });
      }
    } finally {
      set({ isLoadingAI: false });
    }
  },

  generateAiReading: async () => {
    const { divinationId } = get();
    if (!divinationId) return;

    set({ isLoadingAI: true, error: null });

    try {
      const activePersona = useUserStore.getState().activePersona;
      const result = await divinationService.getAiReading(divinationId, activePersona);

      set({
        readingResult: result.reading,
        hasAiReading: true,
      });
    } catch (err: unknown) {
      const axiosError = err as { isRateLimit?: boolean; userMessage?: string };
      if (axiosError.isRateLimit) {
        set({ error: axiosError.userMessage || '今日免费次数已用完，请升级 Pro 会员享受无限次数' });
      } else {
        set({ error: axiosError.userMessage || 'AI 解读生成失败，请稍后再试。' });
      }
    } finally {
      set({ isLoadingAI: false });
    }
  },
}));
