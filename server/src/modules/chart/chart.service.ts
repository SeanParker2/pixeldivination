import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { AiService } from '../ai/ai.service';
import { CreateNatalDto, CreateSynastryDto } from './dto/chart.dto';
import { calculateChart } from './astrology.engine';

@Injectable()
export class ChartService {
  constructor(
    private prisma: PrismaService,
    private aiService: AiService,
  ) {}

  async createNatal(userId: string, dto: CreateNatalDto) {
    const chartData = calculateChart(
      new Date(dto.birthDate),
      { lat: dto.birthLat, lng: dto.birthLng },
    );

    const chart = await this.prisma.chart.create({
      data: {
        userId,
        name: dto.name || '我的本命盘',
        chartType: 'natal',
        birthDate: dto.birthDate,
        birthTime: dto.birthTime,
        birthCity: dto.birthCity,
        birthLat: dto.birthLat,
        birthLng: dto.birthLng,
        planets: JSON.stringify(chartData.planets),
        houses: JSON.stringify(chartData.houses),
        aspects: JSON.stringify([]),
        ascendant: chartData.ascendant,
        midheaven: chartData.midheaven,
      },
    });

    return {
      ...chart,
      planets: JSON.parse(chart.planets),
      houses: JSON.parse(chart.houses),
      aspects: JSON.parse(chart.aspects),
    };
  }

  async createSynastry(userId: string, dto: CreateSynastryDto) {
    const chartA = calculateChart(
      new Date(dto.birthDateA),
      { lat: dto.birthLatA, lng: dto.birthLngA },
    );

    const chartB = calculateChart(
      new Date(dto.birthDateB),
      { lat: dto.birthLatB, lng: dto.birthLngB },
    );

    const chart = await this.prisma.chart.create({
      data: {
        userId,
        name: dto.name || `与${dto.partnerName || '对方'}的合盘`,
        chartType: 'synastry',
        birthDate: dto.birthDateA,
        birthTime: dto.birthTimeA,
        birthCity: dto.birthCityA,
        birthLat: dto.birthLatA,
        birthLng: dto.birthLngA,
        partnerBirthDate: dto.birthDateB,
        partnerBirthTime: dto.birthTimeB,
        partnerBirthCity: dto.birthCityB,
        planets: JSON.stringify(chartA.planets),
        houses: JSON.stringify(chartA.houses),
        aspects: JSON.stringify({ chartB: chartB.planets }),
        ascendant: chartA.ascendant,
        midheaven: chartA.midheaven,
      },
    });

    return {
      ...chart,
      planets: JSON.parse(chart.planets),
      houses: JSON.parse(chart.houses),
      aspects: JSON.parse(chart.aspects),
    };
  }

  async findById(id: string) {
    const chart = await this.prisma.chart.findUnique({ where: { id } });
    if (!chart) throw new NotFoundException('星盘不存在');
    return {
      ...chart,
      planets: JSON.parse(chart.planets),
      houses: JSON.parse(chart.houses),
      aspects: JSON.parse(chart.aspects),
    };
  }

  async findByUser(userId: string) {
    const charts = await this.prisma.chart.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return charts.map(chart => ({
      ...chart,
      planets: JSON.parse(chart.planets),
      houses: JSON.parse(chart.houses),
      aspects: JSON.parse(chart.aspects),
    }));
  }

  async generateReading(chartId: string, persona: string = 'neon') {
    const chart = await this.findById(chartId);

    const reading = await this.aiService.natalReading({
      chartData: {
        planets: chart.planets as any[],
        houses: chart.houses as any[],
        aspects: chart.aspects as any[],
      },
      persona,
    });

    await this.prisma.chart.update({
      where: { id: chartId },
      data: {
        aiReading: reading,
        aiReadingAt: new Date().toISOString(),
      },
    });

    return reading;
  }

  async delete(id: string, userId: string) {
    const chart = await this.findById(id);
    if (chart.userId !== userId) {
      throw new NotFoundException('无权删除此星盘');
    }
    return this.prisma.chart.delete({ where: { id } });
  }
}
