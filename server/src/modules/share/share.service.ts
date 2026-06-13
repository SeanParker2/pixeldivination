import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { GenerateShareCardDto } from './dto/share.dto';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  async generateShareCard(userId: string, dto: GenerateShareCardDto) {
    let content: any = null;
    let title = '';
    let subtitle = '';

    switch (dto.type) {
      case 'tarot':
        if (dto.divinationId) {
          content = await this.prisma.divination.findFirst({
            where: { id: dto.divinationId, userId },
          });
          if (content) {
            title = '塔罗指引';
            subtitle = content.question || '我的塔罗牌阵';
          }
        }
        break;

      case 'chart':
        if (dto.chartId) {
          content = await this.prisma.chart.findFirst({
            where: { id: dto.chartId, userId },
          });
          if (content) {
            title = '我的星盘';
            subtitle = content.name || '本命星盘';
          }
        }
        break;

      case 'fortune':
        if (dto.fortuneId) {
          content = await this.prisma.fortune.findFirst({
            where: { id: dto.fortuneId, userId },
          });
          if (content) {
            title = '今日运势';
            subtitle = content.zodiacSign;
          }
        }
        break;

      case 'match':
        title = '星座配对';
        subtitle = '看看我们的星座配对';
        break;
    }

    if (!content && dto.type !== 'match') {
      throw new NotFoundException('内容不存在');
    }

    // Generate share card data
    const shareData = {
      type: dto.type,
      title,
      subtitle,
      content: content ? this.extractShareContent(content, dto.type) : null,
      style: dto.style || 'neon',
      timestamp: new Date().toISOString(),
      userId,
    };

    return shareData;
  }

  private extractShareContent(content: any, type: string) {
    switch (type) {
      case 'tarot':
        return {
          cards: content.cards,
          reading: content.aiReading?.substring(0, 200) + '...',
          question: content.question,
        };
      case 'chart':
        return {
          planets: Array.isArray(content.planets) ? content.planets.slice(0, 5) : [],
          ascendant: content.ascendant,
          reading: content.aiReading?.substring(0, 200) + '...',
        };
      case 'fortune':
        return {
          scores: content.scores,
          texts: content.texts,
          date: content.fortuneDate,
        };
      default:
        return null;
    }
  }

  async getShareStats(userId: string) {
    const [divinations, charts, fortunes] = await Promise.all([
      this.prisma.divination.count({ where: { userId } }),
      this.prisma.chart.count({ where: { userId } }),
      this.prisma.fortune.count({ where: { userId } }),
    ]);

    return {
      divinations,
      charts,
      fortunes,
      total: divinations + charts + fortunes,
    };
  }
}
