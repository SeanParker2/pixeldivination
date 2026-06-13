import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import {
  TarotDrawDto,
  LenormandDrawDto,
  BaziDto,
  NumerologyDto,
} from './dto/divination.dto';
import { TAROT_DECK, drawCards } from '../../../packages/shared/data/tarot-deck';
import { LENORMAND_DECK, drawLenormandCards } from '../../../packages/shared/data/lenormand-deck';
import { calculateBazi, generateBaziReport } from '../../../packages/shared/data/bazi-calculator';
import { calculateNumerology, generateNumerologyReport } from '../../../packages/shared/data/numerology-calculator';

// 牌阵配置
const SPREAD_CONFIGS: Record<string, { count: number; name: string; positions: string[] }> = {
  single: { count: 1, name: '单牌占卜', positions: ['指引'] },
  three_card: { count: 3, name: '时间三牌', positions: ['过去', '现在', '未来'] },
  celtic_cross: { count: 10, name: '凯尔特十字', positions: ['现况', '挑战', '目标', '过去', '可能', '近未来', '自我', '环境', '希望', '结果'] },
  relationship: { count: 5, name: '关系牌阵', positions: ['你的感受', '对方的感受', '关系现状', '挑战', '建议'] },
  decision: { count: 4, name: '决策牌阵', positions: ['选项A', '选项B', '影响因素', '建议'] },
  monthly: { count: 5, name: '月相牌阵', positions: ['月初', '月中', '月末', '挑战', '收获'] },
};

@Injectable()
export class DivinationService {
  private readonly logger = new Logger(DivinationService.name);

  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  // ==================== 塔罗占卜（静态解读） ====================
  async drawTarot(userId: string, dto: TarotDrawDto) {
    const spreadType = dto.spreadType || 'three_card';
    const spreadConfig = SPREAD_CONFIGS[spreadType] || SPREAD_CONFIGS.three_card;

    // 抽牌
    const drawnCards = drawCards(spreadConfig.count);

    // 构建牌面描述
    const cardDescriptions = drawnCards.map((item, index) => {
      const position = spreadConfig.positions[index] || `位置${index + 1}`;
      const card = item.card;
      const orientation = item.isReversed ? '逆位' : '正位';
      const meaning = item.isReversed ? card.reversed : card.upright;

      return {
        position,
        cardName: card.name,
        cardNameEn: card.nameEn,
        orientation,
        keywords: meaning.keywords,
        meaning: meaning.meaning,
        love: meaning.love,
        career: meaning.career,
        finance: meaning.finance,
        health: meaning.health,
        arcana: card.arcana,
        suit: card.suit,
      };
    });

    // 生成专业静态解读（不调用 AI）
    const reading = this.generateTarotReading(cardDescriptions, spreadConfig.name);

    // 保存到数据库
    const divination = await this.prisma.divination.create({
      data: {
        userId,
        divType: 'tarot',
        deckType: dto.deckType || 'rider_waite',
        spreadType,
        cards: JSON.stringify(cardDescriptions),
        question: dto.question,
        aiReading: reading,
        aiPersona: dto.persona || 'neon',
        isFree: true,
      },
    });

    return {
      id: divination.id,
      cards: cardDescriptions,
      reading,
      spreadType,
      spreadName: spreadConfig.name,
      hasAiReading: false,
    };
  }

  // ==================== 雷诺曼占卜（静态解读） ====================
  async drawLenormand(userId: string, dto: LenormandDrawDto) {
    const spreadType = dto.spreadType || 'three_card';
    const spreadConfig = SPREAD_CONFIGS[spreadType] || SPREAD_CONFIGS.three_card;

    // 抽牌
    const drawnCards = drawLenormandCards(spreadConfig.count);

    // 构建牌面描述
    const cardDescriptions = drawnCards.map((card, index) => {
      const position = spreadConfig.positions[index] || `位置${index + 1}`;

      return {
        position,
        cardId: card.id,
        cardName: card.name,
        cardNameEn: card.nameEn,
        keywords: card.keywords,
        meaning: card.meaning,
      };
    });

    // 生成专业静态解读（不调用 AI）
    const reading = this.generateLenormandReading(cardDescriptions, spreadConfig.name);

    // 保存到数据库
    const divination = await this.prisma.divination.create({
      data: {
        userId,
        divType: 'lenormand',
        spreadType,
        cards: JSON.stringify(cardDescriptions),
        question: dto.question,
        aiReading: reading,
        aiPersona: dto.persona || 'neon',
        isFree: true,
      },
    });

    return {
      id: divination.id,
      cards: cardDescriptions,
      reading,
      spreadType,
      spreadName: spreadConfig.name,
      hasAiReading: false,
    };
  }

  // ==================== 八字命理（静态解读） ====================
  async calculateBazi(userId: string, dto: BaziDto) {
    const birthDate = new Date(dto.birthDate);
    const birthHour = dto.birthHour || 12;

    // 使用专业算法计算八字（纯本地计算，不调 AI）
    const baziResult = calculateBazi(birthDate, birthHour);
    const baziReport = generateBaziReport(baziResult);

    // 保存到数据库
    const divination = await this.prisma.divination.create({
      data: {
        userId,
        divType: 'bazi',
        baziData: JSON.stringify(baziResult),
        question: `八字分析 - ${dto.birthDate}`,
        aiReading: baziReport,
        aiPersona: dto.persona || 'neon',
        isFree: true,
      },
    });

    return {
      id: divination.id,
      baziData: baziResult,
      reading: baziReport,
      hasAiReading: false,
    };
  }

  // ==================== 数字命理（静态解读） ====================
  async calculateNumerology(userId: string, dto: NumerologyDto) {
    // 使用专业算法计算数字命理（纯本地计算，不调 AI）
    const numerologyResult = calculateNumerology(dto.birthDate, dto.fullName);
    const numerologyReport = generateNumerologyReport(numerologyResult);

    // 保存到数据库
    const divination = await this.prisma.divination.create({
      data: {
        userId,
        divType: 'numerology',
        baziData: JSON.stringify(numerologyResult),
        question: `数字命理分析 - ${dto.birthDate}`,
        aiReading: numerologyReport,
        aiPersona: dto.persona || 'neon',
        isFree: true,
      },
    });

    return {
      id: divination.id,
      numerologyData: numerologyResult,
      reading: numerologyReport,
      hasAiReading: false,
    };
  }

  // ==================== AI 深度解读（按需调用） ====================
  async getAiReading(divinationId: string, userId: string, persona: string = 'neon') {
    const divination = await this.prisma.divination.findFirst({
      where: { id: divinationId, userId },
    });
    if (!divination) throw new NotFoundException('占卜记录不存在');

    // 如果已有 AI 解读，直接返回
    if (divination.aiReading && divination.aiPersona === persona) {
      return { reading: divination.aiReading, cached: true };
    }

    let aiReading = '';

    switch (divination.divType) {
      case 'tarot': {
        const cards = JSON.parse(divination.cards as string);
        const spreadName = SPREAD_CONFIGS[divination.spreadType]?.name || '时间三牌';
        aiReading = await this.generateAiTarotReading(cards, spreadName, divination.question, persona);
        break;
      }
      case 'lenormand': {
        const cards = JSON.parse(divination.cards as string);
        const spreadName = SPREAD_CONFIGS[divination.spreadType]?.name || '时间三牌';
        aiReading = await this.generateAiLenormandReading(cards, spreadName, divination.question, persona);
        break;
      }
      case 'bazi': {
        const baziData = JSON.parse(divination.baziData as string);
        aiReading = await this.generateAiBaziReading(baziData, divination.question, persona);
        break;
      }
      case 'numerology': {
        const numerologyData = JSON.parse(divination.baziData as string);
        aiReading = await this.generateAiNumerologyReading(numerologyData, divination.question, persona);
        break;
      }
      default:
        throw new NotFoundException('不支持的占卜类型');
    }

    // 更新数据库
    await this.prisma.divination.update({
      where: { id: divinationId },
      data: { aiReading, aiPersona: persona },
    });

    return { reading: aiReading, cached: false };
  }

  // ==================== 历史查询 ====================
  async getHistory(userId: string, divType?: string, page = 1, limit = 20) {
    const where = { userId, ...(divType ? { divType } : {}) };

    const [items, total] = await Promise.all([
      this.prisma.divination.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.divination.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string, userId: string) {
    const divination = await this.prisma.divination.findFirst({
      where: { id, userId },
    });
    if (!divination) throw new NotFoundException('占卜记录不存在');
    return divination;
  }

  getSpreadConfigs() {
    return SPREAD_CONFIGS;
  }

  getTarotDeck() {
    return TAROT_DECK;
  }

  getLenormandDeck() {
    return LENORMAND_DECK;
  }

  // ==================== 静态解读生成器 ====================

  /** 塔罗牌专业静态解读 */
  private generateTarotReading(cards: any[], spreadName: string): string {
    let reading = `# ${spreadName}解读\n\n`;

    // 核心洞察
    reading += '## 🔮 核心洞察\n\n';
    reading += this.generateCoreInsight(cards);
    reading += '\n\n';

    // 逐牌详解
    reading += '## 📜 牌面详解\n\n';
    for (const card of cards) {
      reading += `### ${card.position}：${card.cardName}（${card.cardNameEn}）${card.orientation}\n\n`;
      reading += `**核心含义**：${card.meaning}\n\n`;
      if (card.love) reading += `**感情指引**：${card.love}\n\n`;
      if (card.career) reading += `**事业指引**：${card.career}\n\n`;
      if (card.finance) reading += `**财运指引**：${card.finance}\n\n`;
      if (card.health) reading += `**健康指引**：${card.health}\n\n`;
      reading += `**关键词**：${card.keywords?.join('、') || '指引、启示'}\n\n`;
      reading += '---\n\n';
    }

    // 现状分析
    reading += '## 🔍 现状分析\n\n';
    reading += this.generateSituationAnalysis(cards);
    reading += '\n\n';

    // 未来指引
    reading += '## 🌟 未来指引\n\n';
    reading += this.generateFutureGuidance(cards);
    reading += '\n\n';

    // 综合建议
    reading += '## 💫 综合建议\n\n';
    reading += this.generateComprehensiveAdvice(cards);

    return reading;
  }

  /** 雷诺曼专业静态解读 */
  private generateLenormandReading(cards: any[], spreadName: string): string {
    let reading = `# ${spreadName}解读\n\n`;

    reading += '## 🔮 牌面信息\n\n';
    for (const card of cards) {
      reading += `**${card.position}**：${card.cardName}（${card.cardNameEn}）\n`;
      reading += `- 关键词：${card.keywords?.join('、') || '指引'}\n`;
      reading += `- 通用含义：${card.meaning?.general || '暂无'}\n`;
      reading += `- 感情指引：${card.meaning?.love || '暂无'}\n`;
      reading += `- 事业指引：${card.meaning?.career || '暂无'}\n\n`;
    }

    reading += '## 🔍 综合分析\n\n';
    const allKeywords = cards.flatMap(c => c.keywords || []);
    if (allKeywords.some(k => ['消息', '到来', '新开始'].includes(k))) {
      reading += '近期可能会有新的消息或机会到来。保持警觉，做好准备迎接变化。\n\n';
    } else if (allKeywords.some(k => ['阻碍', '延迟', '挑战'].includes(k))) {
      reading += '当前可能面临一些阻碍或延迟。这是考验耐心的时期，坚持下去会看到转机。\n\n';
    } else if (allKeywords.some(k => ['爱情', '情感', '关系'].includes(k))) {
      reading += '感情方面有重要的发展。关注你的情感生活，可能会有新的进展。\n\n';
    } else if (allKeywords.some(k => ['金钱', '财富', '成功'].includes(k))) {
      reading += '财运方面有积极的信号。可能会有财务上的好消息或机会。\n\n';
    } else {
      reading += '牌面呈现出稳定的能量，建议保持当前的节奏，稳步前进。\n\n';
    }

    reading += '## 💫 综合建议\n\n';
    reading += '1. 保持开放的心态，留意身边的信号和机会\n';
    reading += '2. 相信自己的直觉，它会引导你做出正确的选择\n';
    reading += '3. 在行动前做好充分的准备，避免冲动决策\n';
    reading += '4. 关注人际关系，良好的沟通会带来积极的结果\n\n';
    reading += '> 🌙 雷诺曼牌的预测具有很强的时效性，建议关注近期的发展。';

    return reading;
  }

  // ==================== AI 深度解读生成器 ====================

  private async generateAiTarotReading(cards: any[], spreadName: string, question: string, persona: string): Promise<string> {
    const cardNames = cards.map((c: any) =>
      `【${c.position}】${c.cardName}(${c.cardNameEn}) ${c.orientation}`
    ).join('\n');

    const cardMeanings = cards.map((c: any) =>
      `${c.position}：${c.cardName}${c.orientation} - ${c.meaning}`
    ).join('\n');

    const systemPrompt = `你是一位专业的塔罗牌解读师，精通韦特塔罗牌系统。
请根据用户的问题和抽出的牌面，进行深度、个性化的解读。
解读要求：
1. 首先分析每张牌在各自位置的含义
2. 然后综合分析牌面之间的关系和整体信息
3. 最后给出具体的建议和指引
4. 使用 Markdown 格式，包含【核心洞察】、【现状分析】、【未来指引】三个部分
5. 语气要专业、温暖、有洞察力`;

    const userPrompt = `问题：${question || '请解读我的塔罗牌阵'}\n\n牌阵：${spreadName}\n\n牌面信息：\n${cardNames}\n\n各牌含义：\n${cardMeanings}\n\n请进行专业的塔罗牌解读。`;

    return this.aiService.chat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      persona,
      temperature: 0.8,
    });
  }

  private async generateAiLenormandReading(cards: any[], spreadName: string, question: string, persona: string): Promise<string> {
    const cardNames = cards.map((c: any) =>
      `【${c.position}】${c.cardName}(${c.cardNameEn})`
    ).join('\n');

    const cardDetails = cards.map((c: any) =>
      `${c.position}：${c.cardName} - 关键词：${c.keywords?.join('、')} | 通用：${c.meaning?.general} | 感情：${c.meaning?.love} | 事业：${c.meaning?.career}`
    ).join('\n');

    const systemPrompt = `你是一位专业的雷诺曼牌解读师，精通36张雷诺曼牌系统。
请进行深度、个性化的解读，分析牌与牌之间的组合关系。
使用 Markdown 格式，包含【核心信息】、【现状分析】、【未来指引】三个部分。`;

    const userPrompt = `问题：${question || '请解读我的雷诺曼牌阵'}\n\n牌阵：${spreadName}\n\n牌面信息：\n${cardNames}\n\n各牌详细含义：\n${cardDetails}\n\n请进行专业的雷诺曼牌解读。`;

    return this.aiService.chat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      persona,
      temperature: 0.8,
    });
  }

  private async generateAiBaziReading(baziData: any, question: string, persona: string): Promise<string> {
    const baziReport = generateBaziReport(baziData);

    const systemPrompt = `你是一位精通中国传统命理学的八字命理大师。
请根据用户的八字信息，进行深度、专业的命理分析。
分析四柱八字的含义、五行强弱和喜用神、性格特点、事业方向、财运、感情、健康。
给出具体的开运建议。使用 Markdown 格式。`;

    const userPrompt = `八字信息：\n${baziReport}\n\n请进行专业的八字命理分析。`;

    return this.aiService.chat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      persona,
      temperature: 0.8,
    });
  }

  private async generateAiNumerologyReading(numerologyData: any, question: string, persona: string): Promise<string> {
    const numerologyReport = generateNumerologyReport(numerologyData);

    const systemPrompt = `你是一位精通数字命理学的专业分析师。
请根据用户的数字命理信息，进行深度、专业的分析。
分析生命灵数、天赋数、灵魂渴望数、人格数的意义。
给出具体的成长建议。使用 Markdown 格式。`;

    const userPrompt = `数字命理信息：\n${numerologyReport}\n\n请进行专业的数字命理分析。`;

    return this.aiService.chat({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      persona,
      temperature: 0.8,
    });
  }

  // ==================== 辅助方法 ====================

  private generateCoreInsight(cards: any[]): string {
    const majorCount = cards.filter(c => c.arcana === 'major').length;
    const reversedCount = cards.filter(c => c.orientation === '逆位').length;

    let insight = '';

    if (majorCount >= 2) {
      insight += '本次牌阵中大阿卡纳牌出现较多，说明当前 situation 涉及到人生重大课题或命运的转折点。宇宙正在向你传递重要的信息，需要认真对待。\n\n';
    } else if (majorCount === 1) {
      insight += '本次牌阵中出现了一张大阿卡纳牌，这是命运的指引，提醒你需要关注某个重要的人生领域。\n\n';
    } else {
      insight += '本次牌阵以小阿卡纳牌为主，说明当前 situation 更多涉及日常生活和具体事务。\n\n';
    }

    if (reversedCount >= 2) {
      insight += '多张牌出现逆位，提示你当前可能面临一些阻碍或内在的冲突。这需要你更加深入地审视自己的内心，找到问题的根源。';
    } else if (reversedCount === 1) {
      insight += '有一张牌出现逆位，提醒你在相关领域需要注意调整心态或改变方法。';
    } else {
      insight += '所有牌都是正位，整体能量较为顺畅，是采取行动的好时机。';
    }

    return insight;
  }

  private generateSituationAnalysis(cards: any[]): string {
    let analysis = '';

    if (cards.length >= 3) {
      const past = cards[0];
      const present = cards[1];
      const future = cards[2];

      analysis += `**过去**的能量（${past.cardName}）影响着你的根基，`;
      analysis += past.orientation === '正位'
        ? '过去的经历为你提供了稳定的基础。'
        : '过去可能有一些未解决的课题需要面对。';

      analysis += '\n\n';
      analysis += `**现在**的处境（${present.cardName}）显示，`;
      analysis += present.orientation === '正位'
        ? '你当前正处于一个相对稳定的状态，可以把握当下的机会。'
        : '当前可能面临一些挑战，需要调整策略。';

      analysis += '\n\n';
      analysis += `**未来**的走向（${future.cardName}）暗示，`;
      analysis += future.orientation === '正位'
        ? '前方有积极的发展等待着你。'
        : '未来需要注意潜在的阻碍，提前做好准备。';
    }

    return analysis;
  }

  private generateFutureGuidance(cards: any[]): string {
    let guidance = '';
    const allKeywords = cards.flatMap(c => c.keywords || []);

    if (allKeywords.some(k => ['新的开始', '创造', '显化'].includes(k))) {
      guidance += '🌟 **新的开始**：当前是开启新项目或新阶段的好时机。不要害怕改变，勇敢地迈出第一步。\n\n';
    }
    if (allKeywords.some(k => ['直觉', '内在智慧', '潜意识'].includes(k))) {
      guidance += '🔮 **内在指引**：相信你的直觉，它正在引导你走向正确的方向。花时间冥想和内省。\n\n';
    }
    if (allKeywords.some(k => ['爱情', '关系', '选择'].includes(k))) {
      guidance += '💕 **感情课题**：感情方面有重要的课题需要面对。保持开放和真诚的沟通。\n\n';
    }
    if (allKeywords.some(k => ['成功', '胜利', '成就'].includes(k))) {
      guidance += '🏆 **成功能量**：你正朝着成功的方向前进。保持专注和努力，胜利就在眼前。\n\n';
    }
    if (allKeywords.some(k => ['挑战', '阻碍', '变化'].includes(k))) {
      guidance += '⚡ **应对挑战**：挑战是成长的机会。保持坚韧的心态，你有能力克服一切困难。\n\n';
    }

    return guidance || '保持平衡的心态，顺应生命的流动。每个时刻都有其独特的意义和价值。';
  }

  private generateComprehensiveAdvice(cards: any[]): string {
    let advice = '';

    const hasWands = cards.some(c => c.suit === 'wands');
    const hasCups = cards.some(c => c.suit === 'cups');
    const hasSwords = cards.some(c => c.suit === 'swords');
    const hasPentacles = cards.some(c => c.suit === 'pentacles');

    if (hasWands) advice += '🔥 **行动建议**：权杖牌组的出现提示你需要采取行动。保持热情和动力，但避免冲动。\n\n';
    if (hasCups) advice += '💧 **情感建议**：圣杯牌组提醒你关注情感和关系。表达真实的感受，倾听内心的声音。\n\n';
    if (hasSwords) advice += '⚔️ **思维建议**：宝剑牌组提示你需要清晰的思考。避免过度分析，保持理性判断。\n\n';
    if (hasPentacles) advice += '🌟 **物质建议**：星币牌组提醒你关注实际事务。脚踏实地，稳步前进。\n\n';

    advice += '> 🌙 塔罗牌的解读是一种指引，最终的选择权在你手中。相信自己的直觉，做出最适合自己的决定。';

    return advice;
  }
}
