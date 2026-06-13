import api from '../lib/api';

export const fetchTarotReading = async (
  question: string,
  cards: string[],
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/tarot', { question, cards, persona });
  return result.data;
};

export const fetchNatalReading = async (
  chartData: any,
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/natal', { chartData, persona });
  return result.data;
};

export const fetchNatalChartReading = fetchNatalReading;

export const fetchSynastryReading = async (
  chartA: any[],
  chartB: any[],
  partnerName: string,
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/synastry', {
    chartA,
    chartB,
    partnerName,
    persona,
  });
  return result.data;
};

export const fetchTransitReading = async (
  natalPlanets: any[],
  transitPlanets: any[],
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/chat', {
    messages: [
      {
        role: 'user',
        content: `我的本命盘行星：${JSON.stringify(natalPlanets)}。当前行运行星：${JSON.stringify(transitPlanets)}。请解读近期运势。`,
      },
    ],
    persona,
  });
  return result.data;
};

export const fetchSkyReading = async (
  currentPlanets: any[],
  persona: string = 'neon',
): Promise<string> => {
  const result: any = await api.post('/ai/chat', {
    messages: [
      {
        role: 'user',
        content: `当前天象星盘：${JSON.stringify(currentPlanets)}。请解读今天的整体能量氛围。`,
      },
    ],
    persona,
  });
  return result.data;
};

export const fetchDailyFortune = async (
  zodiac: string,
  date: string,
  persona: string = 'neon',
): Promise<any> => {
  const result: any = await api.post('/ai/chat', {
    messages: [
      {
        role: 'user',
        content: `星座: ${zodiac}, 日期: ${date}。请生成今日运势。`,
      },
    ],
    persona,
  });
  return result.data;
};
