import { create } from 'zustand';
import { fetchTarotReading } from '../services/aiService';

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  meaning: string;
  image: string;
}

// Helper arrays
const SUITS = ['wands', 'cups', 'swords', 'coins'];
const RANKS = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king'];

// Major Arcana Mapping (Based on user's filenames)
const MAJOR_ARCANA = [
  { id: 0, name: '愚者', nameEn: 'The Fool', file: 'the_fool.png', meaning: '新的开始，冒险，天真' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', file: 'the_magician.png', meaning: '创造力，技能，意志' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', file: 'the_priestess.png', meaning: '直觉，潜意识，神秘' },
  { id: 3, name: '女皇', nameEn: 'The Empress', file: 'the_empress.png', meaning: '丰饶，母性，自然' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', file: 'the_emperor.png', meaning: '权威，结构，控制' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', file: 'the_hierophant.png', meaning: '传统，信仰，教导' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', file: 'the_lovers.png', meaning: '爱，和谐，选择' },
  { id: 7, name: '战车', nameEn: 'The Chariot', file: 'the_chariot.png', meaning: '意志，胜利，决心' },
  { id: 8, name: '力量', nameEn: 'Strength', file: 'strength.png', meaning: '勇气，耐心，控制' },
  { id: 9, name: '隐士', nameEn: 'The Hermit', file: 'the_hermit.png', meaning: '内省，孤独，指引' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', file: 'wheel_of_fortune.png', meaning: '周期，变化，命运' },
  { id: 11, name: '正义', nameEn: 'Justice', file: 'justice.png', meaning: '公平，真理，法律' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', file: 'the_hanged_man.png', meaning: '牺牲，新视角，等待' },
  { id: 13, name: '死神', nameEn: 'Death', file: 'death.png', meaning: '结束，转变，重生' },
  { id: 14, name: '节制', nameEn: 'Temperance', file: 'temperance.png', meaning: '平衡，适度，耐心' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', file: 'the_devil.png', meaning: '束缚，物质，欲望' },
  { id: 16, name: '高塔', nameEn: 'The Tower', file: 'the_tower.png', meaning: '突变，混乱，启示' },
  { id: 17, name: '星星', nameEn: 'The Star', file: 'the_star.png', meaning: '希望，灵感，宁静' },
  { id: 18, name: '月亮', nameEn: 'The Moon', file: 'the_moon.png', meaning: '幻觉，恐惧，潜意识' },
  { id: 19, name: '太阳', nameEn: 'The Sun', file: 'the_sun.png', meaning: '快乐，成功，活力' },
  { id: 20, name: '审判', nameEn: 'Judgement', file: 'judgement.png', meaning: '复活，觉醒，号召' },
  { id: 21, name: '世界', nameEn: 'The World', file: 'the_universe.png', meaning: '完成，整合，成就' },
];

// Generate Full Deck
const generateDeck = () => {
  const deck: TarotCard[] = [];
  
  // Add Majors
  MAJOR_ARCANA.forEach(card => {
    deck.push({
      ...card,
      image: `/images/tarot/${card.file}`
    });
  });

  // Add Minors
  let idCounter = 22;
  const suitNames = { wands: '权杖', cups: '圣杯', swords: '宝剑', coins: '星币' };
  
  SUITS.forEach(suit => {
    RANKS.forEach(rank => {
      deck.push({
        id: idCounter++,
        name: `${suitNames[suit as keyof typeof suitNames]} ${rank}`, // e.g. 权杖 ace (可优化为中文数字)
        nameEn: `${rank} of ${suit}`,
        meaning: '小阿卡纳指引', // 暂用通用含义，AI会具体解读
        image: `/images/tarot/${rank}_of_${suit}.png`
      });
    });
  });
  
  return deck;
};

export const TAROT_DECK = generateDeck();

interface DivinationState {
  step: 'intro' | 'shuffle' | 'draw' | 'reading';
  selectedCards: TarotCard[];
  isShuffling: boolean;
  
  // AI State
  readingResult: string | null;
  isLoadingAI: boolean;
  error: string | null;

  setStep: (step: 'intro' | 'shuffle' | 'draw' | 'reading') => void;
  startDivination: () => void;
  selectCard: (card: TarotCard) => void;
  resetDivination: () => void;
  generateReading: (question?: string) => Promise<void>;
}

export const useDivinationStore = create<DivinationState>((set, get) => ({
  step: 'intro',
  selectedCards: [],
  isShuffling: false,
  readingResult: null,
  isLoadingAI: false,
  error: null,

  setStep: (step) => set({ step }),

  startDivination: () => set({ 
    step: 'shuffle', 
    selectedCards: [], 
    isShuffling: true,
    readingResult: null,
    error: null
  }),

  selectCard: (card) => set((state) => ({
    selectedCards: [...state.selectedCards, card]
  })),

  resetDivination: () => set({
    step: 'intro',
    selectedCards: [],
    isShuffling: false,
    readingResult: null,
    isLoadingAI: false,
    error: null
  }),

  generateReading: async (question = '我的近期运势如何？') => {
    const { selectedCards, isLoadingAI, readingResult } = get();
    
    // Avoid duplicate calls
    if (isLoadingAI || readingResult) return;

    set({ isLoadingAI: true, error: null });

    try {
      const result = await fetchTarotReading(question, selectedCards);
      set({ readingResult: result, isLoadingAI: false });
    } catch (err) {
      set({ 
        error: err instanceof Error ? err.message : '未知错误', 
        isLoadingAI: false 
      });
    }
  }
}));
