import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { FortuneData } from '../types/fortune';
import { fetchDailyFortune } from '../services/aiService';
import { useUserStore } from './useUserStore';

interface FortuneState {
  fortune: FortuneData | null;
  isLoading: boolean;
  error: string | null;
  checkAndFetch: (zodiac: string) => Promise<void>;
}

export const useFortuneStore = create<FortuneState>()(
  persist(
    (set, get) => ({
      fortune: null,
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
          const data = await fetchDailyFortune(zodiac, today, activePersona);
          set({ fortune: data, isLoading: false });
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
