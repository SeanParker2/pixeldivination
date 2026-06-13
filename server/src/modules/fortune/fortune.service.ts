import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { GetFortuneDto } from './dto/fortune.dto';

const MOCK_SCORES = {
  health: 80,
  academic: 75,
  social: 70,
  love: 85,
  career: 72,
  wealth: 68,
};

const MOCK_TEXTS = {
  overall: '今日星象能量充沛，适合开展新计划。保持积极心态，好运自然来。',
  love: '感情方面有新的机遇，单身者可能遇到心动的人。已有伴者适合制造小惊喜。',
  career: '工作上可能遇到一些挑战，但这也是成长的机会。保持专注，突破在即。',
  wealth: '财运平稳，不宜进行大额投资。稳健理财是今日的最佳策略。',
  others: '学习新技能的好时机，提升自我将带来更多可能。',
};

@Injectable()
export class FortuneService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async getDailyFortune(userId: string, dto: GetFortuneDto) {
    const fortuneDate = dto.date ? new Date(dto.date) : new Date();
    const dateStr = fortuneDate.toISOString().split('T')[0];

    // Check cache
    const cached = await this.prisma.fortune.findUnique({
      where: {
        userId_fortuneDate_fortuneType: {
          userId,
          fortuneDate: fortuneDate,
          fortuneType: 'daily',
        },
      },
    });

    if (cached) {
      return {
        date: dateStr,
        zodiac: dto.zodiac,
        scores: JSON.parse(cached.scores),
        texts: JSON.parse(cached.texts),
      };
    }

    // Generate new fortune
    let scores = MOCK_SCORES;
    let texts = MOCK_TEXTS;

    try {
      const prompt = `
请根据用户的星座和日期，推演今日运势。
必须返回纯 JSON 格式。
JSON 结构需包含 scores (6个维度的0-100评分) 和 texts (5个板块的详细解读)。
星座: ${dto.zodiac}, 日期: ${dateStr}。

示例 JSON:
{
  "scores": { "health": 80, "academic": 75, "social": 70, "love": 85, "career": 72, "wealth": 68 },
  "texts": { "overall": "...", "love": "...", "career": "...", "wealth": "...", "others": "..." }
}
`;

      const result = await this.aiService.chat({
        messages: [{ role: 'user', content: prompt }],
        persona: dto.persona || 'neon',
        temperature: 1.1,
      });

      // Try to parse JSON from response
      const jsonMatch = result.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        scores = parsed.scores || MOCK_SCORES;
        texts = parsed.texts || MOCK_TEXTS;
      }
    } catch {
      console.error('AI fortune generation failed, using mock data');
    }

    // Save to database
    await this.prisma.fortune.upsert({
      where: {
        userId_fortuneDate_fortuneType: {
          userId,
          fortuneDate: fortuneDate,
          fortuneType: 'daily',
        },
      },
      update: {
        scores: JSON.stringify(scores),
        texts: JSON.stringify(texts),
        aiPersona: dto.persona || 'neon',
      },
      create: {
        userId,
        zodiacSign: dto.zodiac,
        fortuneDate: fortuneDate,
        fortuneType: 'daily',
        scores: JSON.stringify(scores),
        texts: JSON.stringify(texts),
        aiPersona: dto.persona || 'neon',
      },
    });

    return {
      date: dateStr,
      zodiac: dto.zodiac,
      scores,
      texts,
    };
  }

  async getFortuneCalendar(userId: string, zodiac: string, month: string) {
    // Get all fortunes for the month
    const startDate = new Date(`${month}-01`);
    const endDate = new Date(startDate);
    endDate.setMonth(endDate.getMonth() + 1);

    const fortunes = await this.prisma.fortune.findMany({
      where: {
        userId,
        zodiacSign: zodiac,
        fortuneDate: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: { fortuneDate: 'asc' },
    });

    return fortunes.map(f => ({
      date: f.fortuneDate.toISOString().split('T')[0],
      scores: JSON.parse(f.scores),
    }));
  }

  async getFortuneHistory(userId: string, page = 1, limit = 30) {
    const [items, total] = await Promise.all([
      this.prisma.fortune.findMany({
        where: { userId },
        orderBy: { fortuneDate: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.fortune.count({ where: { userId } }),
    ]);

    return {
      items: items.map(f => ({
        ...f,
        scores: JSON.parse(f.scores),
        texts: JSON.parse(f.texts),
      })),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}
