import api from '../lib/api';

interface CreateNatalParams {
  birthDate: string;
  birthTime: string;
  birthCity: string;
  birthLat: number;
  birthLng: number;
  name?: string;
}

interface CreateSynastryParams {
  birthDateA: string;
  birthTimeA: string;
  birthCityA: string;
  birthLatA: number;
  birthLngA: number;
  birthDateB: string;
  birthTimeB: string;
  birthCityB: string;
  birthLatB: number;
  birthLngB: number;
  partnerName?: string;
  name?: string;
}

interface ChartData {
  id: string;
  name: string;
  chartType: string;
  planets: any[];
  houses: any[];
  aspects: any[];
  ascendant: number;
  midheaven: number;
  aiReading?: string;
  createdAt: string;
}

export const chartService = {
  async createNatal(params: CreateNatalParams): Promise<ChartData> {
    const result: any = await api.post('/chart/natal', params);
    return result;
  },

  async createSynastry(params: CreateSynastryParams): Promise<ChartData> {
    const result: any = await api.post('/chart/synastry', params);
    return result;
  },

  async getList(): Promise<ChartData[]> {
    const result: any = await api.get('/chart/list');
    return result;
  },

  async getById(id: string): Promise<ChartData> {
    const result: any = await api.get(`/chart/${id}`);
    return result;
  },

  async generateReading(id: string, persona?: string): Promise<string> {
    const result: any = await api.post(`/chart/${id}/reading`, { persona });
    return result;
  },

  async deleteChart(id: string): Promise<void> {
    await api.delete(`/chart/${id}`);
  },
};
