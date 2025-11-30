import { create } from 'zustand';
import { fetchTarotReading } from '../services/aiService';

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  meaning: string;
  image?: string;
}

// Mock Tarot Data (Major Arcana subset)
export const TAROT_DECK: TarotCard[] = [
  { id: 0, name: '愚者', nameEn: 'The Fool', meaning: '新的开始，冒险，天真，自发性。' },
  { id: 1, name: '魔术师', nameEn: 'The Magician', meaning: '创造力，技能，意志力，显化。' },
  { id: 2, name: '女祭司', nameEn: 'The High Priestess', meaning: '直觉，潜意识，神秘，内在知识。' },
  { id: 3, name: '女皇', nameEn: 'The Empress', meaning: '丰饶，母性，自然，感官享受。' },
  { id: 4, name: '皇帝', nameEn: 'The Emperor', meaning: '权威，结构，控制，父性。' },
  { id: 5, name: '教皇', nameEn: 'The Hierophant', meaning: '传统，信仰，教导，精神指引。' },
  { id: 6, name: '恋人', nameEn: 'The Lovers', meaning: '爱，和谐，关系，价值观的选择。' },
  { id: 7, name: '战车', nameEn: 'The Chariot', meaning: '意志力，决心，胜利，自我控制。' },
  { id: 8, name: '力量', nameEn: 'Strength', meaning: '勇气，耐心，控制，同情心。' },
  { id: 9, name: '隐士', nameEn: 'The Hermit', meaning: '内省，孤独，寻求真理，指导。' },
  { id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', meaning: '周期，变化，命运，转折点。' },
];

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
