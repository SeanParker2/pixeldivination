import { create } from 'zustand';
import api from '../lib/api';

interface User {
  id: string;
  phone?: string;
  nickname: string;
  avatarUrl?: string;
  isPremium: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  sendSms: (phone: string) => Promise<void>;
  login: (phone: string, code: string) => Promise<void>;
  logout: () => void;
  loadProfile: () => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: !!localStorage.getItem('access_token'),
  isLoading: false,

  sendSms: async (phone: string) => {
    await api.post('/auth/sms/send', { phone });
  },

  login: async (phone: string, code: string) => {
    const result: any = await api.post('/auth/sms/login', { phone, code });
    localStorage.setItem('access_token', result.accessToken);
    localStorage.setItem('refresh_token', result.refreshToken);
    set({ user: result.user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    set({ user: null, isAuthenticated: false });
  },

  loadProfile: async () => {
    set({ isLoading: true });
    try {
      const user: any = await api.get('/auth/profile');
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
