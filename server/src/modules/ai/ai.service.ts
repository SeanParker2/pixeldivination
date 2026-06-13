import { Injectable, Logger } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';
import {
  ChatCompletionDto,
  TarotReadingDto,
  NatalReadingDto,
  SynastryReadingDto,
} from './dto/ai.dto';

const PERSONAS = {
  neon: {
    name: '霓虹先知',
    prompt: `你是"霓虹先知"，一位赛博朋克风格的AI占卜师。你活在数据流中，能看见命运的代码。
你的特点：
- 用科技隐喻解读命运：算法、防火墙、数据流、bug、debug
- 神秘但不说废话，直觉敏锐
- 偶尔给出警告，像系统提示一样精准
- 语言风格：冷静、理性、偶尔闪烁智慧
示例："你的命运算法正在经历一次关键的版本迭代。旧的代码已经无法支持新的需求，是时候重构了。"`,
  },
  forest: {
    name: '森林低语者',
    prompt: `你是"森林低语者"，一位温柔治愈的AI占卜师。你住在古老的森林里，能听见万物的声音。
你的特点：
- 用自然意象解读：月光、树根、潮汐、四季、花开
- 语气温柔，充满治愈力量
- 像林间的精灵，给人温暖的抚慰
- 语言风格：诗意、温暖、有画面感
示例："我看见你的心像一棵经历寒冬的树，根系在黑暗中默默生长。春天正在路上，新的枝芽即将萌发。"`,
  },
  dragon: {
    name: '龙焰审判者',
    prompt: `你是"龙焰审判者"，一位犀利直接的AI占卜师。你从不拐弯抹角，只说真话。
你的特点：
- 一针见血，不留情面
- 拒绝虚假的安慰，只揭示真相
- 像严厉但智慧的导师
- 语言风格：简练、有力、直击要害
示例："你在逃避什么？答案你早就知道。停止自欺欺人，面对它。"`,
  },
};

// AI Provider configurations
const AI_PROVIDERS = {
  deepseek: {
    name: 'DeepSeek',
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    envKey: 'DEEPSEEK_API_KEY',
  },
  mimo: {
    name: 'Xiaomi MiMo',
    baseURL: 'https://api.mimo.xiaomi.com/v1',
    model: 'mimo-auto',
    envKey: 'MIMO_API_KEY',
  },
  openai: {
    name: 'OpenAI',
    baseURL: 'https://api.openai.com/v1',
    model: 'gpt-4o',
    envKey: 'OPENAI_API_KEY',
  },
  qwen: {
    name: 'Qwen',
    baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
    model: 'qwen-plus',
    envKey: 'QWEN_API_KEY',
  },
};

@Injectable()
export class AiService {
  private readonly logger = new Logger(AiService.name);
  private clients: Map<string, OpenAI> = new Map();
  private activeProvider: string;

  constructor(private config: ConfigService) {
    // Initialize all providers
    for (const [key, provider] of Object.entries(AI_PROVIDERS)) {
      const apiKey = this.config.get(provider.envKey);
      if (apiKey) {
        this.clients.set(key, new OpenAI({
          baseURL: provider.baseURL,
          apiKey: apiKey,
        }));
        this.logger.log(`AI Provider initialized: ${provider.name}`);
      }
    }

    // Set active provider (MiMo first if available, then DeepSeek, then others)
    this.activeProvider = this.config.get('AI_PROVIDER') || 
      (this.clients.has('mimo') ? 'mimo' : 
       this.clients.has('deepseek') ? 'deepseek' :
       this.clients.has('openai') ? 'openai' :
       this.clients.has('qwen') ? 'qwen' : 'deepseek');

    this.logger.log(`Active AI Provider: ${AI_PROVIDERS[this.activeProvider]?.name || this.activeProvider}`);
  }

  private getClient(provider?: string): OpenAI {
    const providerKey = provider || this.activeProvider;
    const client = this.clients.get(providerKey);
    if (!client) {
      throw new Error(`AI provider '${providerKey}' not configured`);
    }
    return client;
  }

  private getModel(provider?: string): string {
    const providerKey = provider || this.activeProvider;
    return AI_PROVIDERS[providerKey]?.model || 'deepseek-chat';
  }

  async chat(dto: ChatCompletionDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const provider = dto.provider || this.activeProvider;

    try {
      const client = this.getClient(provider);
      const model = dto.model || this.getModel(provider);

      const completion = await client.chat.completions.create({
        messages: [
          { role: 'system', content: persona.prompt },
          ...dto.messages,
        ],
        model,
        temperature: dto.temperature || 1.1,
        max_tokens: dto.maxTokens || 2000,
      });

      return completion.choices[0].message.content || '';
    } catch (error) {
      this.logger.error(`AI chat failed (provider: ${provider}):`, error);
      throw new Error('AI service unavailable');
    }
  }

  async tarotReading(dto: TarotReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const provider = dto.provider || this.activeProvider;

    const systemPrompt = `
${persona.prompt}
请根据用户的问题和抽出的牌面，进行深度解读。
包含：【核心洞察】、【现状分析】、【未来指引】三个部分。
使用 Markdown 格式。
`;
    const userPrompt = `问题：${dto.question}。牌面：${dto.cards.join(', ')}。`;

    try {
      const client = this.getClient(provider);
      const model = this.getModel(provider);

      const completion = await client.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model,
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error(`Tarot reading failed (provider: ${provider}):`, error);
      throw new Error('AI service unavailable');
    }
  }

  async natalReading(dto: NatalReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const provider = dto.provider || this.activeProvider;

    const systemPrompt = `
${persona.prompt}
请根据用户的星盘数据（行星落座与宫位），生成一份简练深刻的本命盘报告。
包含三个部分：【核心人格】、【情感模式】、【天赋潜能】。
使用 Markdown 格式。
`;
    const userPrompt = `我的星盘数据：${JSON.stringify(dto.chartData)}。请解读我的本命盘。`;

    try {
      const client = this.getClient(provider);
      const model = this.getModel(provider);

      const completion = await client.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model,
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error(`Natal reading failed (provider: ${provider}):`, error);
      throw new Error('AI service unavailable');
    }
  }

  async synastryReading(dto: SynastryReadingDto): Promise<string> {
    const persona = PERSONAS[dto.persona || 'neon'];
    const provider = dto.provider || this.activeProvider;

    const systemPrompt = `
${persona.prompt}
你是一位精通比较盘（Synastry）的占星师。
请分析这两个星盘的关系（合盘）。
A的行星：${JSON.stringify(dto.chartA)}
B的行星（伴侣/对方）：${JSON.stringify(dto.chartB)}
请从【吸引力】、【冲突点】、【相处建议】三个维度生成一份Markdown报告。
语气要求：浪漫且客观，符合你的人设。
`;
    const userPrompt = `请分析我与 ${dto.partnerName} 的合盘。`;

    try {
      const client = this.getClient(provider);
      const model = this.getModel(provider);

      const completion = await client.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        model,
        temperature: 1.2,
      });

      return completion.choices[0].message.content || '解读生成失败';
    } catch (error) {
      this.logger.error(`Synastry reading failed (provider: ${provider}):`, error);
      throw new Error('AI service unavailable');
    }
  }

  // Get available providers
  getProviders() {
    const available = [];
    for (const [key, provider] of Object.entries(AI_PROVIDERS)) {
      available.push({
        id: key,
        name: provider.name,
        available: this.clients.has(key),
        active: key === this.activeProvider,
      });
    }
    return available;
  }

  // Switch active provider
  setProvider(provider: string) {
    if (!this.clients.has(provider)) {
      throw new Error(`AI provider '${provider}' not configured`);
    }
    this.activeProvider = provider;
    return { success: true, provider };
  }
}
