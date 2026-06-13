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
import {
  generateSingleCardReading,
  generateThreeCardReading,
  generateCelticCrossReading,
  generateRelationshipReading,
  generateDecisionReading,
  generateMonthlyReading,
} from './engines/tarot-reading.engine';
import {
  generateSingleLenormandReading,
  generateThreeCardLenormandReading,
} from './engines/lenormand-reading.engine';

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

  /** 塔罗牌专业静态解读 - 根据牌阵类型生成对应解读 */
  private generateTarotReading(cards: any[], spreadName: string): string {
    // 根据牌数选择对应的解读引擎
    switch (cards.length) {
      case 1:
        return generateSingleCardReading(cards);
      case 3:
        return generateThreeCardReading(cards);
      case 4:
        return generateDecisionReading(cards);
      case 5:
        return generateRelationshipReading(cards);
      case 10:
        return generateCelticCrossReading(cards);
      default:
        // 月相牌阵（5张）或其他
        if (spreadName.includes('月')) {
          return generateMonthlyReading(cards);
        }
        return generateThreeCardReading(cards.slice(0, 3));
    }
  }

  /** 雷诺曼专业静态解读 - 根据牌数选择引擎 */
  private generateLenormandReading(cards: any[], spreadName: string): string {
    if (cards.length === 1) {
      return generateSingleLenormandReading(cards);
    }
    return generateThreeCardLenormandReading(cards);
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
  // (旧的通用解读方法已移至 engines/tarot-reading.engine.ts)
}
