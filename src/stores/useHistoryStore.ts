import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TarotCard } from './useDivinationStore';
import type { LenormandCardData } from '../data/lenormand';

export interface HistoryItem {
  id: string;
  type: 'tarot' | 'starchart' | 'lenormand' | 'dice';
  date: number;
  summary: string; // Short preview or title
  fullResult: string; // The markdown content
  data?: {
    cards?: TarotCard[] | LenormandCardData[];
    planets?: any[];
    dice?: {
      planet: { symbol: string; label: string };
      sign: { symbol: string; label: string };
      house: number;
    };
    question?: string;
  }; 
}

interface HistoryState {
  history: HistoryItem[];
  addEntry: (entry: Omit<HistoryItem, 'id' | 'date'>) => void;
  clearHistory: () => void;
  removeEntry: (id: string) => void;
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addEntry: (entry) =>
        set((state) => ({
          history: [
            {
              ...entry,
              id: crypto.randomUUID(),
              date: Date.now(),
            },
            ...state.history,
          ],
        })),
      clearHistory: () => set({ history: [] }),
      removeEntry: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
    }),
    {
      name: 'pixel-history-storage',
    }
  )
);
