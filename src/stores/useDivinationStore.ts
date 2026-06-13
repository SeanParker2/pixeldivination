import { create } from 'zustand';
import { divinationService, type SpreadType, type DrawnCard } from '../services/divinationService';
import { useUserStore } from './useUserStore';

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  meaning: string;
  image: string;
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

// Helper arrays
const SUITS = ['wands', 'cups', 'swords', 'coins'];
const RANKS = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king'];
const SUIT_NAMES: Record<string, string> = { wands: '权杖', cups: '圣杯', swords: '宝剑', coins: '星币' };

// Major Arcana Mapping
const MAJOR_ARCANA = [
  { id: 0, name: '愚者', nameEn: 'The Fool', file: 'the_fool.webp', meaning: '新的开始，冒险' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', file: 'the_magician.webp', meaning: '创造力，显化' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', file: 'the_priestess.webp', meaning: '直觉，潜意识' },
  { id: 3, name: '女皇', nameEn: 'The Empress', file: 'the_empress.webp', meaning: '丰饶，自然' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', file: 'the_emperor.webp', meaning: '权威，结构' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', file: 'the_hierophant.webp', meaning: '传统，指引' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', file: 'the_lovers.webp', meaning: '爱，选择' },
  { id: 7, name: '战车', nameEn: 'The Chariot', file: 'the_chariot.webp', meaning: '意志，胜利' },
  { id: 8, name: '力量', nameEn: 'Strength', file: 'strength.webp', meaning: '勇气，耐心' },
  { id: 9, name: '隐士', nameEn: 'The Hermit', file: 'the_hermit.webp', meaning: '内省，孤独' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', file: 'wheel_of_fortune.webp', meaning: '周期，命运' },
  { id: 11, name: '正义', nameEn: 'Justice', file: 'justice.webp', meaning: '公平，真理' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', file: 'the_hanged_man.webp', meaning: '牺牲，新视角' },
  { id: 13, name: '死神', nameEn: 'Death', file: 'death.webp', meaning: '结束，重生' },
  { id: 14, name: '节制', nameEn: 'Temperance', file: 'temperance.webp', meaning: '平衡，适度' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', file: 'the_devil.webp', meaning: '束缚，欲望' },
  { id: 16, name: '高塔', nameEn: 'The Tower', file: 'the_tower.webp', meaning: '突变，启示' },
  { id: 17, name: '星星', nameEn: 'The Star', file: 'the_star.webp', meaning: '希望，灵感' },
  { id: 18, name: '月亮', nameEn: 'The Moon', file: 'the_moon.webp', meaning: '幻觉，潜意识' },
  { id: 19, name: '太阳', nameEn: 'The Sun', file: 'the_sun.webp', meaning: '快乐，成功' },
  { id: 20, name: '审判', nameEn: 'Judgement', file: 'judgement.webp', meaning: '觉醒，号召' },
  { id: 21, name: '世界', nameEn: 'The World', file: 'the_universe.webp', meaning: '完成，整合' },
];

const generateDeck = () => {
  const deck: TarotCard[] = [];
  
  // Majors
  MAJOR_ARCANA.forEach(c => {
    deck.push({
      id: c.id,
      name: c.name,
      nameEn: c.nameEn,
      meaning: c.meaning,
      image: `/images/tarot/${c.file}`
    });
  });

  // Minors
  let idCounter = 22;
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        id: idCounter++,
        name: `${SUIT_NAMES[suit]} ${rank}`,
        nameEn: `${rank} of ${suit}`,
        meaning: '小阿卡纳指引',
        image: `/images/tarot/${rank}_of_${suit}.webp`
      });
    });
  });
  return deck;
};

export const TAROT_DECK = generateDeck();

interface DivinationState {
  step: 'intro' | 'shuffle' | 'draw' | 'reading';
  selectedSpread: SpreadType;
  selectedCards: TarotCard[];
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  
  // AI State
  readingResult: string | null;
  spreadName: string | null;
  isLoadingAI: boolean;
  error: string | null;

  setStep: (step: 'intro' | 'shuffle' | 'draw' | 'reading') => void;
  setSpread: (spread: SpreadType) => void;
  startDivination: () => void;
  selectCard: (card: TarotCard) => void;
  resetDivination: () => void;
  generateReading: (question?: string) => Promise<void>;
}

export const useDivinationStore = create<DivinationState>((set, get) => ({
  step: 'intro',
  selectedSpread: 'three_card',
  selectedCards: [],
  drawnCards: [],
  isShuffling: false,
  readingResult: null,
  spreadName: null,
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
      const newSelection = [...selectedCards, card];
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
      error: null 
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
        drawnCards: result.cards as DrawnCard[] || [],
        spreadName: result.spreadName || null,
      });
    } catch {
      set({ error: '无法连接到宇宙信号，请稍后再试。' });
    } finally {
      set({ isLoadingAI: false });
    }
  }
}));
