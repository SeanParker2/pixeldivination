import { create } from 'zustand';
import { fetchTarotReading } from '../services/aiService';
import { useHistoryStore } from './useHistoryStore';

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
const SUIT_NAMES: Record<string, string> = { wands: '权杖', cups: '圣杯', swords: '宝剑', coins: '星币' };

// Major Arcana Mapping (Exact filenames based on user upload)
const MAJOR_ARCANA = [
  { id: 0, name: '愚者', nameEn: 'The Fool', file: 'the_fool.png', meaning: '新的开始，冒险' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', file: 'the_magician.png', meaning: '创造力，显化' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', file: 'the_priestess.png', meaning: '直觉，潜意识' },
  { id: 3, name: '女皇', nameEn: 'The Empress', file: 'the_empress.png', meaning: '丰饶，自然' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', file: 'the_emperor.png', meaning: '权威，结构' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', file: 'the_hierophant.png', meaning: '传统，指引' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', file: 'the_lovers.png', meaning: '爱，选择' },
  { id: 7, name: '战车', nameEn: 'The Chariot', file: 'the_chariot.png', meaning: '意志，胜利' },
  { id: 8, name: '力量', nameEn: 'Strength', file: 'strength.png', meaning: '勇气，耐心' },
  { id: 9, name: '隐士', nameEn: 'The Hermit', file: 'the_hermit.png', meaning: '内省，孤独' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', file: 'wheel_of_fortune.png', meaning: '周期，命运' },
  { id: 11, name: '正义', nameEn: 'Justice', file: 'justice.png', meaning: '公平，真理' },
  { id: 12, name: '倒吊人', nameEn: 'The Hanged Man', file: 'the_hanged_man.png', meaning: '牺牲，新视角' },
  { id: 13, name: '死神', nameEn: 'Death', file: 'death.png', meaning: '结束，重生' },
  { id: 14, name: '节制', nameEn: 'Temperance', file: 'temperance.png', meaning: '平衡，适度' },
  { id: 15, name: '恶魔', nameEn: 'The Devil', file: 'the_devil.png', meaning: '束缚，欲望' },
  { id: 16, name: '高塔', nameEn: 'The Tower', file: 'the_tower.png', meaning: '突变，启示' },
  { id: 17, name: '星星', nameEn: 'The Star', file: 'the_star.png', meaning: '希望，灵感' },
  { id: 18, name: '月亮', nameEn: 'The Moon', file: 'the_moon.png', meaning: '幻觉，潜意识' },
  { id: 19, name: '太阳', nameEn: 'The Sun', file: 'the_sun.png', meaning: '快乐，成功' },
  { id: 20, name: '审判', nameEn: 'Judgement', file: 'judgement.png', meaning: '觉醒，号召' },
  { id: 21, name: '世界', nameEn: 'The World', file: 'the_universe.png', meaning: '完成，整合' },
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
  
  startDivination: () => {
    set({ isShuffling: true, step: 'shuffle', selectedCards: [], readingResult: null });
    setTimeout(() => {
      set({ isShuffling: false, step: 'draw' });
    }, 2000);
  },

  selectCard: (card) => {
    const { selectedCards } = get();
    if (selectedCards.length < 3) {
      const newSelection = [...selectedCards, card];
      set({ selectedCards: newSelection });
      
      if (newSelection.length === 3) {
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
      readingResult: null,
      error: null 
    });
  },

  generateReading: async (question) => {
    const { selectedCards } = get();
    if (selectedCards.length === 0) return;

    set({ isLoadingAI: true, error: null });

    try {
      const cardNames = selectedCards.map(c => c.name);
      const result = await fetchTarotReading(question || '请解读我的塔罗牌阵', cardNames);
      set({ readingResult: result });

      // Save to history
      useHistoryStore.getState().addEntry({
        type: 'tarot',
        summary: question || '塔罗牌阵解读',
        fullResult: result,
        data: {
          cards: selectedCards,
          question
        }
      });
    } catch {
      set({ error: '无法连接到宇宙信号，请稍后再试。' });
    } finally {
      set({ isLoadingAI: false });
    }
  }
}));
