import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FortuneData, FortuneScores } from '../types/fortune';
import { fortuneService } from '../services/fortuneService';
import { useUserStore } from './useUserStore';

interface FortuneCalendarItem {
  date: string;
  scores: FortuneScores;
}

interface FortuneState {
  fortune: FortuneData | null;
  calendar: FortuneCalendarItem[];
  isLoading: boolean;
  error: string | null;
  checkAndFetch: (zodiac: string) => Promise<void>;
  fetchCalendar: (zodiac: string, month: string) => Promise<void>;
}

export const useFortuneStore = create<FortuneState>()(
  persist(
    (set, get) => ({
      fortune: null,
      calendar: [],
      isLoading: false,
      error: null,

      checkAndFetch: async (zodiac: string) => {
        const today = new Date().toISOString().split('T')[0];
        const currentFortune = get().fortune;

        // Cache hit: data exists, date matches, zodiac matches
        if (
          currentFortune && 
          currentFortune.date === today && 
          currentFortune.zodiac === zodiac
        ) {
          return;
        }

        set({ isLoading: true, error: null });

        try {
          const activePersona = useUserStore.getState().activePersona;
          const data = await fortuneService.getDailyFortune(zodiac, today, activePersona);
          set({ fortune: data, isLoading: false });
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : '未知错误', 
            isLoading: false 
          });
        }
      },

      fetchCalendar: async (zodiac: string, month: string) => {
        set({ isLoading: true, error: null });
        try {
          const data = await fortuneService.getCalendar(zodiac, month);
          set({ calendar: data, isLoading: false });
        } catch (err) {
          set({ 
            error: err instanceof Error ? err.message : '未知错误', 
            isLoading: false 
          });
        }
      },
    }),
    {
      name: 'pixel-fortune-storage',
      partialize: (state) => ({ fortune: state.fortune }), // Only persist fortune data
    }
  )
);
