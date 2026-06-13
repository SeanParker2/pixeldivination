import { Injectable } from '@nestjs/common';
import { AiService } from '../ai/ai.service';
import { calculateChart } from '../chart/astrology.engine';
import { ZodiacMatchDto, SynastryMatchDto } from './dto/match.dto';

// Zodiac compatibility data
const ZODIAC_COMPATIBILITY: Record<string, Record<string, number>> = {
  '白羊座': { '白羊座': 80, '金牛座': 60, '双子座': 90, '巨蟹座': 50, '狮子座': 95, '处女座': 55, '天秤座': 85, '天蝎座': 45, '射手座': 90, '摩羯座': 50, '水瓶座': 75, '双鱼座': 65 },
  '金牛座': { '白羊座': 60, '金牛座': 85, '双子座': 55, '巨蟹座': 90, '狮子座': 65, '处女座': 95, '天秤座': 70, '天蝎座': 80, '射手座': 50, '摩羯座': 95, '水瓶座': 55, '双鱼座': 85 },
  '双子座': { '白羊座': 90, '金牛座': 55, '双子座': 80, '巨蟹座': 50, '狮子座': 85, '处女座': 60, '天秤座': 95, '天蝎座': 45, '射手座': 85, '摩羯座': 50, '水瓶座': 90, '双鱼座': 55 },
  '巨蟹座': { '白羊座': 50, '金牛座': 90, '双子座': 50, '巨蟹座': 85, '狮子座': 55, '处女座': 80, '天秤座': 50, '天蝎座': 95, '射手座': 45, '摩羯座': 85, '水瓶座': 50, '双鱼座': 95 },
  '狮子座': { '白羊座': 95, '金牛座': 65, '双子座': 85, '巨蟹座': 55, '狮子座': 80, '处女座': 55, '天秤座': 85, '天蝎座': 50, '射手座': 95, '摩羯座': 55, '水瓶座': 75, '双鱼座': 60 },
  '处女座': { '白羊座': 55, '金牛座': 95, '双子座': 60, '巨蟹座': 80, '狮子座': 55, '处女座': 85, '天秤座': 65, '天蝎座': 85, '射手座': 50, '摩羯座': 95, '水瓶座': 55, '双鱼座': 80 },
  '天秤座': { '白羊座': 85, '金牛座': 70, '双子座': 95, '巨蟹座': 50, '狮子座': 85, '处女座': 65, '天秤座': 80, '天蝎座': 55, '射手座': 80, '摩羯座': 60, '水瓶座': 90, '双鱼座': 65 },
  '天蝎座': { '白羊座': 45, '金牛座': 80, '双子座': 45, '巨蟹座': 95, '狮子座': 50, '处女座': 85, '天秤座': 55, '天蝎座': 85, '射手座': 50, '摩羯座': 80, '水瓶座': 50, '双鱼座': 90 },
  '射手座': { '白羊座': 90, '金牛座': 50, '双子座': 85, '巨蟹座': 45, '狮子座': 95, '处女座': 50, '天秤座': 80, '天蝎座': 50, '射手座': 85, '摩羯座': 55, '水瓶座': 85, '双鱼座': 60 },
  '摩羯座': { '白羊座': 50, '金牛座': 95, '双子座': 50, '巨蟹座': 85, '狮子座': 55, '处女座': 95, '天秤座': 60, '天蝎座': 80, '射手座': 55, '摩羯座': 85, '水瓶座': 55, '双鱼座': 80 },
  '水瓶座': { '白羊座': 75, '金牛座': 55, '双子座': 90, '巨蟹座': 50, '狮子座': 75, '处女座': 55, '天秤座': 90, '天蝎座': 50, '射手座': 85, '摩羯座': 55, '水瓶座': 80, '双鱼座': 60 },
  '双鱼座': { '白羊座': 65, '金牛座': 85, '双子座': 55, '巨蟹座': 95, '狮子座': 60, '处女座': 80, '天秤座': 65, '天蝎座': 90, '射手座': 60, '摩羯座': 80, '水瓶座': 60, '双鱼座': 85 },
};

@Injectable()
export class MatchService {
  constructor(private aiService: AiService) {}

  async zodiacMatch(dto: ZodiacMatchDto) {
    const score = ZODIAC_COMPATIBILITY[dto.zodiacA]?.[dto.zodiacB] || 50;
    const reverseScore = ZODIAC_COMPATIBILITY[dto.zodiacB]?.[dto.zodiacA] || 50;
    const avgScore = Math.round((score + reverseScore) / 2);

    const reading = await this.aiService.chat({
      messages: [
        {
          role: 'user',
          content: `请分析${dto.zodiacA}和${dto.zodiacB}的星座配对。匹配度：${avgScore}%。请从【整体评价】、【优势互补】、【潜在挑战】、【相处建议】四个维度解读。`,
        },
      ],
      persona: 'neon',
    });

    return {
      zodiacA: dto.zodiacA,
      zodiacB: dto.zodiacB,
      score: avgScore,
      reading,
    };
  }

  async synastryMatch(userId: string, dto: SynastryMatchDto) {
    const chartA = calculateChart(
      new Date(dto.birthDateA),
      { lat: 39.9042, lng: 116.4074 },
    );

    const chartB = calculateChart(
      new Date(dto.birthDateB),
      { lat: 39.9042, lng: 116.4074 },
    );

    // Calculate simple match score based on planet positions
    let harmonyScore = 0;
    const fireSigns = [0, 120, 240]; // Aries, Leo, Sagittarius degrees
    const earthSigns = [30, 150, 270];
    const airSigns = [60, 180, 300];
    const waterSigns = [90, 210, 330];

    chartA.planets.slice(0, 5).forEach((planetA, i) => {
      const planetB = chartB.planets[i];
      if (planetB) {
        const diff = Math.abs(planetA.longitude - planetB.longitude);
        const normalizedDiff = diff > 180 ? 360 - diff : diff;
        
        if (normalizedDiff < 10) harmonyScore += 20; // Conjunction
        else if (Math.abs(normalizedDiff - 60) < 10) harmonyScore += 15; // Sextile
        else if (Math.abs(normalizedDiff - 120) < 10) harmonyScore += 15; // Trine
        else if (Math.abs(normalizedDiff - 90) < 10) harmonyScore -= 10; // Square
        else if (Math.abs(normalizedDiff - 180) < 10) harmonyScore -= 15; // Opposition
      }
    });

    const score = Math.min(100, Math.max(0, 50 + harmonyScore));

    const reading = await this.aiService.chat({
      messages: [
        {
          role: 'user',
          content: `请分析两人的星盘合盘。A的行星：${JSON.stringify(chartA.planets.slice(0, 5))}。B的行星：${JSON.stringify(chartB.planets.slice(0, 5))}。匹配度：${score}%。请从【灵魂共鸣】、【情感连接】、【沟通默契】、【长期潜力】四个维度解读。`,
        },
      ],
      persona: 'neon',
    });

    return {
      score,
      chartA: {
        planets: chartA.planets,
        ascendant: chartA.ascendant,
      },
      chartB: {
        planets: chartB.planets,
        ascendant: chartB.ascendant,
      },
      reading,
    };
  }

  getZodiacList() {
    return [
      { name: '白羊座', symbol: '♈', dates: '3/21-4/19', element: '火' },
      { name: '金牛座', symbol: '♉', dates: '4/20-5/20', element: '土' },
      { name: '双子座', symbol: '♊', dates: '5/21-6/21', element: '风' },
      { name: '巨蟹座', symbol: '♋', dates: '6/22-7/22', element: '水' },
      { name: '狮子座', symbol: '♌', dates: '7/23-8/22', element: '火' },
      { name: '处女座', symbol: '♍', dates: '8/23-9/22', element: '土' },
      { name: '天秤座', symbol: '♎', dates: '9/23-10/23', element: '风' },
      { name: '天蝎座', symbol: '♏', dates: '10/24-11/22', element: '水' },
      { name: '射手座', symbol: '♐', dates: '11/23-12/21', element: '火' },
      { name: '摩羯座', symbol: '♑', dates: '12/22-1/19', element: '土' },
      { name: '水瓶座', symbol: '♒', dates: '1/20-2/18', element: '风' },
      { name: '双鱼座', symbol: '♓', dates: '2/19-3/20', element: '水' },
    ];
  }
}
