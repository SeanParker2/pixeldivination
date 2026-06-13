import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PersonaType } from '../types/ai';
import api from '../lib/api';

export interface UserProfile {
  nickname: string;
  gender: 'male' | 'female' | 'other';
  avatar?: string;
  birthDate: string;
  birthLocation: { province: string; city: string; district: string };
  currentLocation: { province: string; city: string; district: string };
  isProfileSet: boolean;
}

interface UserState {
  profile: UserProfile;
  activePersona: PersonaType;
  isSyncing: boolean;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  setPersona: (type: PersonaType) => void;
  resetProfile: () => void;
  markProfileSet: () => void;
  syncWithBackend: () => Promise<void>;
}

const DEFAULT_PROFILE: UserProfile = {
  nickname: '白羊座 (示例)',
  gender: 'female',
  birthDate: '2000-04-15T12:00:00',
  birthLocation: { province: '广东省', city: '深圳市', district: '南山区' },
  currentLocation: { province: '北京市', city: '北京市', district: '朝阳区' },
  isProfileSet: false,
};

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: DEFAULT_PROFILE,
      activePersona: 'neon',
      isSyncing: false,

      updateProfile: async (data) => {
        const newProfile = { ...get().profile, ...data };
        set({ profile: newProfile });

        // Sync to backend if logged in
        const token = localStorage.getItem('access_token');
        if (token) {
          try {
            await api.put('/user/profile', {
              nickname: newProfile.nickname,
              gender: newProfile.gender,
              birthDate: newProfile.birthDate,
              birthCity: newProfile.birthLocation?.city,
            });
          } catch (error) {
            console.warn('Failed to sync profile to backend:', error);
          }
        }
      },

      markProfileSet: () =>
        set((state) => ({
          profile: { ...state.profile, isProfileSet: true },
        })),

      setPersona: (type) => set({ activePersona: type }),

      resetProfile: () => set({ profile: DEFAULT_PROFILE, activePersona: 'neon' }),

      syncWithBackend: async () => {
        const token = localStorage.getItem('access_token');
        if (!token) return;

        set({ isSyncing: true });
        try {
          const user: any = await api.get('/auth/profile');
          if (user) {
            set({
              profile: {
                nickname: user.nickname || get().profile.nickname,
                gender: user.gender || get().profile.gender,
                avatar: user.avatarUrl,
                birthDate: user.birthDate || get().profile.birthDate,
                birthLocation: user.birthCity
                  ? { province: '', city: user.birthCity, district: '' }
                  : get().profile.birthLocation,
                currentLocation: get().profile.currentLocation,
                isProfileSet: true,
              },
            });
          }
        } catch (error) {
          console.warn('Failed to sync with backend:', error);
        } finally {
          set({ isSyncing: false });
        }
      },
    }),
    {
      name: 'pixel-user-profile',
    }
  )
);
