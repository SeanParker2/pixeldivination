import OpenAI from 'openai';
import type { FortuneData } from '../types/fortune';
import type { TarotCard } from '../stores/useDivinationStore';

// ... existing imports

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

export const fetchDailyFortune = async (zodiac: string, date: string): Promise<FortuneData> => {
  if (!DEEPSEEK_API_KEY) {
    console.warn('DeepSeek API Key is missing using mock data');
    return { ...MOCK_FORTUNE, zodiac, date };
  }

  const systemPrompt = `
你是一位精通星象学的赛博占卜师。请根据用户的星座和日期，推演今日运势。
必须返回纯 JSON 格式，不要包含 markdown 标记。
JSON 结构需包含 scores (6个维度的0-100评分) 和 texts (5个板块的详细解读)。
解读风格：神秘、直觉敏锐，稍微带一点点警告或鼓励，不要太官方。

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


/**
 * SECURITY WARNING:
 * In a production environment, NEVER expose your API Key in the frontend code.
 * You should proxy requests through your own backend server (e.g., Next.js API Routes, Node.js, Go, etc.).
 * Since this is a demo/MVP client-side app, we use `dangerouslyAllowBrowser: true`.
 */

const DEEPSEEK_API_KEY = import.meta.env.VITE_DEEPSEEK_API_KEY;

const openai = new OpenAI({
  baseURL: 'https://api.deepseek.com',
  apiKey: DEEPSEEK_API_KEY || 'sk-placeholder', // Fallback to prevent crash if env not set
  dangerouslyAllowBrowser: true,
});

export const fetchTarotReading = async (
  question: string,
  cards: TarotCard[]
): Promise<string> => {
  if (!DEEPSEEK_API_KEY) {
    console.warn('DeepSeek API Key is missing. Please set VITE_DEEPSEEK_API_KEY in .env.local');
    return `[系统离线模式] 
    
### 🔮 牌面综述
命运的信号有些微弱... (请配置 DeepSeek API Key)

### 👁️ 深度解码
你抽到了 ${cards.map(c => c.name).join('、')}。
虽然我现在无法连接到宇宙深处的数据库，但这些牌依然暗示着重要的转折。

### ⚡ 行动指令
检查你的 .env.local 文件。`;
  }

  const cardDescriptions = cards
    .map((card, index) => {
      const position = ['过去/因果', '现在/困境', '未来/趋势'][index] || `位置${index + 1}`;
      return `${position}: ${card.name} (${card.nameEn}) - ${card.meaning}`;
    })
    .join('\n');

  const systemPrompt = `
你是一位赛博朋克风格的神秘占卜师，身处未来的霓虹都市。你的语言风格既有古老的智慧，又带有科技的隐喻（例如：‘命运的代码’、‘灵魂的算法’、‘量子纠缠’、‘系统过载’）。

请根据用户的问题和抽到的三张塔罗牌进行解读。

输出格式必须严格遵守以下 Markdown 结构：

### 🔮 牌面综述
(30字以内，一针见血的总结)

### 👁️ 深度解码
(结合三张牌的含义，详细分析过去因果、现状困境和未来趋势。请使用带有科技感的比喻)

### ⚡ 行动指令
(给出一个具体、可执行的建议，像是一条系统补丁或调试指令)
`;

  const userPrompt = `
用户问题: "${question || '我的近期运势如何？'}"

抽牌结果:
${cardDescriptions}
`;

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      model: 'deepseek-chat',
      temperature: 1.3, // Slightly higher creativity for divination
    });

    return completion.choices[0].message.content || '系统未能解码命运信号...';
  } catch (error) {
    console.error('DeepSeek API Error:', error);
    throw new Error('连接宇宙数据库失败');
  }
};
