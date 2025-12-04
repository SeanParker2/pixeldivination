import OpenAI from 'openai';
import type { FortuneData } from '../types/fortune';
import type { PlanetPosition } from '../lib/astrology';
import { PERSONAS, type PersonaType } from '../types/ai';

const MOCK_FORTUNE: FortuneData = {
  date: new Date().toISOString().split('T')[0],
  zodiac: '未知',
  scores: {
    health: 75,
    academic: 80,
    social: 60,
    love: 85,
    career: 70,
    wealth: 65,
  },
  texts: {
    overall: '系统处于离线模式，这是模拟的命运数据。',
    love: '感情连接信号微弱，建议检查通讯协议。',
    career: '职场防火墙运行正常，注意防范外部攻击。',
    wealth: '数字货币波动较大，建议长期持有。',
    others: '学习新技能是升级系统的最佳方式。',
  }
};

export const fetchDailyFortune = async (zodiac: string, date: string, persona: PersonaType = 'neon'): Promise<FortuneData> => {
  if (!DEEPSEEK_API_KEY) {
    console.warn('DeepSeek API Key is missing using mock data');
    return { ...MOCK_FORTUNE, zodiac, date };
  }

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
请根据用户的星座和日期，推演今日运势。
必须返回纯 JSON 格式，不要包含 markdown 标记。
JSON 结构需包含 scores (6个维度的0-100评分) 和 texts (5个板块的详细解读)。
解读风格：符合你的人设，${persona === 'neon' ? '神秘、直觉敏锐，稍微带一点点警告或鼓励' : persona === 'forest' ? '温柔、治愈、充满自然意象' : '犀利、一针见血、不留情面'}。

Example JSON structure:
{
  "scores": {
    "health": 80,
    "academic": 70,
    "social": 60,
    "love": 85,
    "career": 75,
    "wealth": 90
  },
  "texts": {
    "overall": "今日星象...",
    "love": "感情方面...",
    "career": "工作上...",
    "wealth": "财运...",
    "others": "其他..."
  }
}
`;

  const userPrompt = `星座: ${zodiac}, 日期: ${date}。`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      response_format: { type: 'json_object' },
      temperature: 1.1,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');

    const result = JSON.parse(content);
    
    return {
      date,
      zodiac,
      scores: result.scores,
      texts: result.texts
    };
  } catch (error) {
    console.error('DeepSeek API Error (Daily Fortune):', error);
    throw new Error('无法连接星象数据库');
  }
};

export const fetchNatalChartReading = async (chartData: unknown, persona: PersonaType = 'neon'): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return `## 模拟本命盘解读 (系统离线)
    
### 核心人格
你拥有坚韧不拔的意志力（模拟数据），在面对困难时总能展现出惊人的爆发力。火星的影响让你行动果断，但有时也容易冲动。

### 情感模式
在感情中，你渴望深度的灵魂共鸣。金星的位置显示你既热情又敏感，需要伴侣给予足够的安全感。

### 天赋潜能
你具备极强的直觉和洞察力，适合从事需要深度思考和创造力的工作。水星的相位表明你的沟通能力是开启成功的钥匙。`;
  }

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
请根据用户的星盘数据（行星落座与宫位），生成一份简练深刻的本命盘报告。包含三个部分：【核心人格】、【情感模式】、【天赋潜能】。使用 Markdown 格式，语气符合你的人设。
`;

  const userPrompt = `我的星盘数据：${JSON.stringify(chartData)}。请解读我的本命盘。`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    return content;
  } catch (error) {
    console.error('DeepSeek API Error (Natal Chart):', error);
    throw new Error('无法连接星象数据库，请稍后再试。');
  }
};

export const fetchTarotReading = async (question: string, cards: string[], persona: PersonaType = 'neon'): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return `## 塔罗指引 (模拟)
    
### 核心洞察
针对你的问题“${question}”，牌面显示出强烈的变革能量。
    
### 具体建议
建议保持耐心，静待时机成熟。`;
  }

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
请根据用户的问题和抽出的牌面，进行深度解读。
包含：【核心洞察】、【现状分析】、【未来指引】三个部分。
使用 Markdown 格式。
`;

  const userPrompt = `问题：${question}。牌面：${cards.join(', ')}。`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    return content;
  } catch (error) {
    console.error('DeepSeek API Error (Tarot):', error);
    throw new Error('无法连接星象数据库');
  }
};

export const fetchSynastryReading = async (userPlanets: PlanetPosition[], partnerPlanets: PlanetPosition[], partnerName: string, persona: PersonaType = 'neon'): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return `## 双人合盘解读 (系统离线)

### 核心契合度
你与${partnerName}的星盘显示出强烈的宿命感（模拟数据）。你们的太阳与月亮呈现和谐相位，意味着在生活目标和情感需求上能够互相理解。

### 情感互动
金星的连接暗示着强烈的吸引力，但同时也伴随着挑战。你们需要学会在激情与平淡之间找到平衡。

### 长期发展
土星的相位显示这段关系需要经历时间的考验。如果能共同克服困难，将建立起坚不可摧的羁绊。`;
  }

  const getPlanetDesc = (planets: PlanetPosition[]) => planets.map(p => {
    const signs = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
    const signIndex = Math.floor(p.longitude / 30);
    const sign = signs[signIndex % 12];
    return `${p.name}在${sign}`;
  }).join(', ');

  const userDesc = getPlanetDesc(userPlanets);
  const partnerDesc = getPlanetDesc(partnerPlanets);

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
根据双方的星盘配置，生成一份约 300-400 字的合盘深度解读。
包含：【核心契合度】、【情感互动】、【长期发展】三个板块。
使用 Markdown 格式。
语气风格：符合你的人设。
`;

  const userPrompt = `
我的星盘：${userDesc}。
对方(${partnerName})的星盘：${partnerDesc}。
请解读我们的关系走向和契合度。
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    return content;
  } catch (error) {
    console.error('DeepSeek API Error (Synastry):', error);
    throw new Error('无法连接星象数据库，请稍后再试。');
  }
};

export const fetchTransitReading = async (natalPlanets: PlanetPosition[], transitPlanets: PlanetPosition[], persona: PersonaType = 'neon'): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return `## 行运盘解读 (系统离线)

### 近期运势总览
行运木星正穿过你的核心宫位，为你带来扩张与成长的机遇（模拟数据）。这是开始新项目或学习新技能的好时机。

### 挑战与机遇
土星的压力可能让你感到责任重大，但只要稳扎稳打，这些挑战终将转化为实实在在的成就。

### 行动建议
保持开放的心态，留意身边出现的新机会，同时注意劳逸结合，避免过度消耗。`;
  }

  const getPlanetDesc = (planets: PlanetPosition[]) => planets.map(p => {
    const signs = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
    const signIndex = Math.floor(p.longitude / 30);
    const sign = signs[signIndex % 12];
    return `${p.name}在${sign}`;
  }).join(', ');

  const natalDesc = getPlanetDesc(natalPlanets);
  const transitDesc = getPlanetDesc(transitPlanets);

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
根据本命盘和当前行运星盘，生成一份约 300 字的近期运势解读。
包含：【近期运势总览】、【挑战与机遇】、【行动建议】三个板块。
使用 Markdown 格式。
语气风格：符合你的人设。
`;

  const userPrompt = `
我的本命盘：${natalDesc}。
当前行运星盘：${transitDesc}。
请解读我近期的运势走向。
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    return content;
  } catch (error) {
    console.error('DeepSeek API Error (Transit):', error);
    throw new Error('无法连接星象数据库，请稍后再试。');
  }
};

export const fetchSkyReading = async (currentPlanets: PlanetPosition[], persona: PersonaType = 'neon'): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    return `## 天象盘解读 (系统离线)

### 今日宇宙能量
今天的星象充满了变革的能量（模拟数据）。天王星的活跃可能带来突如其来的灵感或变动，适合打破常规。

### 适合做的事
尝试新鲜事物、进行头脑风暴、接触前沿科技。

### 需要注意
避免过于固执己见，保持灵活变通，以免错失良机。`;
  }

  const planetDesc = currentPlanets.map(p => {
    const signs = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
    const signIndex = Math.floor(p.longitude / 30);
    const sign = signs[signIndex % 12];
    return `${p.name}在${sign}`;
  }).join(', ');

  const basePrompt = PERSONAS[persona].prompt;
  const systemPrompt = `
${basePrompt}
根据当前的星盘配置，生成一份约 200-300 字的今日天象解读。
包含：【今日宇宙能量】、【适合做的事】、【需要注意】三个板块。
使用 Markdown 格式。
语气风格：符合你的人设。
`;

  const userPrompt = `当前天象星盘：${planetDesc}。请解读今天的整体能量氛围。`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.2,
    });

    const content = completion.choices[0].message.content;
    if (!content) throw new Error('Empty response from AI');
    
    return content;
  } catch (error) {
    console.error('DeepSeek API Error (Sky):', error);
    throw new Error('无法连接星象数据库，请稍后再试。');
  }
};

/**
 * SECURITY WARNING:
 * In a production environment, NEVER expose your API Key in the frontend code.
 * You should proxy requests through your own backend server (e.g., Next.js API Routes, Node.js, Go, etc.).
 * Since this is a demo/MVP client-side app, we use `dangerouslyAllowBrowser: true`.
 */

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

// Prevent crash if API key is missing by providing a dummy key.
// The actual API calls are guarded by checking DEEPSEEK_API_KEY inside the functions.
const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: DEEPSEEK_API_KEY || 'dummy-key-for-mock-mode',
  dangerouslyAllowBrowser: true
});
