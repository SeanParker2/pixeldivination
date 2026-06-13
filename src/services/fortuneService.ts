import api from '../lib/api';
import type { FortuneData, FortuneScores } from '../types/fortune';

interface FortuneCalendarItem {
  date: string;
  scores: FortuneScores;
}

interface FortuneHistoryResponse {
  items: FortuneData[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export const fortuneService = {
  async getDailyFortune(zodiac: string, date?: string, persona?: string): Promise<FortuneData> {
    const params: Record<string, string> = { zodiac };
    if (date) params.date = date;
    if (persona) params.persona = persona;
    
    const result: any = await api.get('/fortune/daily', { params });
    return result;
  },

  async getCalendar(zodiac: string, month: string): Promise<FortuneCalendarItem[]> {
    const result: any = await api.get('/fortune/calendar', {
      params: { zodiac, month },
    });
    return result;
  },

  async getHistory(page = 1, limit = 30): Promise<FortuneHistoryResponse> {
    const result: any = await api.get('/fortune/history', {
      params: { page: page.toString(), limit: limit.toString() },
    });
    return result;
  },
};
