import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserProfile {
  nickname: string;
  gender: 'male' | 'female' | 'other';
  birthDate: string; // ISO String
  birthLocation: { province: string; city: string; district: string };
  currentLocation: { province: string; city: string; district: string };
  isProfileSet: boolean;
}

interface UserState {
  profile: UserProfile;
  updateProfile: (data: Partial<UserProfile>) => void;
  resetProfile: () => void;
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
      updateProfile: (data) =>
        set((state) => ({
          profile: { ...state.profile, ...data, isProfileSet: true },
        })),
      resetProfile: () => set({ profile: DEFAULT_PROFILE }),
    }),
    {
      name: 'pixel-user-profile',
    }
  )
);
