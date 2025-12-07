import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { PersonaType } from '../types/ai';

export interface UserProfile {
  nickname: string;
  gender: 'male' | 'female' | 'other';
  avatar?: string;
  birthDate: string; // ISO String
  birthLocation: { province: string; city: string; district: string };
  currentLocation: { province: string; city: string; district: string };
  isProfileSet: boolean;
}

interface UserState {
  profile: UserProfile;
  activePersona: PersonaType;
  updateProfile: (data: Partial<UserProfile>) => void;
  setPersona: (type: PersonaType) => void;
  resetProfile: () => void;
  markProfileSet: () => void;
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
    (set) => ({
      profile: DEFAULT_PROFILE,
      activePersona: 'neon',
      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data },
        })),
      markProfileSet: () =>
        set((state) => ({
          profile: { ...state.profile, isProfileSet: true },
        })),
      setPersona: (type) => set({ activePersona: type }),
      resetProfile: () => set({ profile: DEFAULT_PROFILE, activePersona: 'neon' }),
    }),
    {
      name: 'pixel-user-profile',
    }
  )
);
