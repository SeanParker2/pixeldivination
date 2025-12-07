import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface HistoryItem {
  id: string;
  type: 'tarot' | 'natal-chart' | 'starchart' | 'daily-fortune' | 'lenormand' | 'dice' | 'synastry' | 'transit' | 'sky' | 'insight' | 'fengshui';
  date: string; // ISO string as requested or keep timestamp? User example said "date: string". I'll use string.
  summary: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  details: any;
}

interface HistoryState {
  history: HistoryItem[];
  addEntry: (entry: Omit<HistoryItem, 'id' | 'date'>) => void;
  clearHistory: () => void;
  removeEntry: (id: string) => void;
  getStats: () => { tarot: number; natalChart: number; daily: number; total: number };
}

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set, get) => ({
      history: [],
      addEntry: (entry) =>
        set((state) => ({
          history: [
            {
              ...entry,
              id: crypto.randomUUID(),
              date: new Date().toISOString(),
            },
            ...state.history,
          ],
        })),
      clearHistory: () => set({ history: [] }),
      removeEntry: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      getStats: () => {
        const { history } = get();
        return {
          tarot: history.filter(i => i.type === 'tarot').length,
          natalChart: history.filter(i => i.type === 'natal-chart' || i.type === 'starchart').length,
          daily: history.filter(i => i.type === 'daily-fortune').length,
          total: history.length
        };
      }
    }),
    {
      name: 'pixel-history-storage',
    }
  )
);
