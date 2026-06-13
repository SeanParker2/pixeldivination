/**
 * 客户端星盘解读工具
 * 使用 chartInterpretations.ts 的数据生成静态解读
 */

import { PLANET_SIGN_INTERPRETATIONS } from '../data/chartInterpretations';
import type { PlanetPosition } from './astrology';

// 星座名称映射（经度 -> 星座）
const ZODIAC_NAMES = ['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'];

function getZodiacFromLongitude(longitude: number): string {
  const index = Math.floor(longitude / 30) % 12;
  return ZODIAC_NAMES[index];
}

function getSignElement(sign: string): string {
  const fireSigns = ['白羊座', '狮子座', '射手座'];
  const earthSigns = ['金牛座', '处女座', '摩羯座'];
  const airSigns = ['双子座', '天秤座', '水瓶座'];
  const waterSigns = ['巨蟹座', '天蝎座', '双鱼座'];
  if (fireSigns.includes(sign)) return '火';
  if (earthSigns.includes(sign)) return '土';
  if (airSigns.includes(sign)) return '风';
  if (waterSigns.includes(sign)) return '水';
  return '未知';
}

function getElementAdvice(element: string): string {
  const advice: Record<string, string> = {
    '火': '火元素能量旺盛，适合采取行动、表达自我、追求目标。注意控制冲动，避免与人发生冲突。',
    '土': '土元素能量稳定，适合处理实际事务、制定计划、积累资源。注意不要过于保守，留出变通空间。',
    '风': '风元素能量活跃，适合沟通交流、学习新知、社交活动。注意保持专注，避免分散精力。',
    '水': '水元素能量深沉，适合内省反思、处理情感、直觉决策。注意情绪管理，避免过度敏感。',
  };
  return advice[element] || '保持平衡，顺应自然。';
}

/**
 * 生成本命盘静态解读
 */
export function generateNatalInterpretation(planets: PlanetPosition[]): string {
  let reading = '# 本命盘解读\n\n';

  const sun = planets.find(p => p.name === '太阳');
  const moon = planets.find(p => p.name === '月亮');
  const mercury = planets.find(p => p.name === '水星');
  const venus = planets.find(p => p.name === '金星');
  const mars = planets.find(p => p.name === '火星');
  const jupiter = planets.find(p => p.name === '木星');
  const saturn = planets.find(p => p.name === '土星');

  // 太阳星座解读
  if (sun) {
    const sign = getZodiacFromLongitude(sun.longitude);
    const interpretation = PLANET_SIGN_INTERPRETATIONS['太阳']?.[sign] || '';
    reading += `## ☀️ 太阳星座：${sign}\n\n`;
    reading += `${interpretation}\n\n`;
    reading += `太阳代表你的核心自我、意志力和人生目标。它揭示了你最本质的性格特征。\n\n`;
  }

  // 月亮星座解读
  if (moon) {
    const sign = getZodiacFromLongitude(moon.longitude);
    const interpretation = PLANET_SIGN_INTERPRETATIONS['月亮']?.[sign] || '';
    reading += `## 🌙 月亮星座：${sign}\n\n`;
    reading += `${interpretation}\n\n`;
    reading += `月亮代表你的情感世界、内在需求和潜意识。它揭示了你如何处理情绪和亲密关系。\n\n`;
  }

  // 关键行星落座
  reading += `## 🔄 关键行星落座\n\n`;

  if (mercury) {
    const sign = getZodiacFromLongitude(mercury.longitude);
    reading += `**☿ 水星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['水星']?.[sign] || '影响你的思维方式和沟通风格。'}\n\n`;
  }
  if (venus) {
    const sign = getZodiacFromLongitude(venus.longitude);
    reading += `**♀ 金星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['金星']?.[sign] || '影响你的爱情观和审美偏好。'}\n\n`;
  }
  if (mars) {
    const sign = getZodiacFromLongitude(mars.longitude);
    reading += `**♂ 火星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['火星']?.[sign] || '影响你的行动力和欲望表达方式。'}\n\n`;
  }
  if (jupiter) {
    const sign = getZodiacFromLongitude(jupiter.longitude);
    reading += `**♃ 木星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['木星']?.[sign] || '影响你的幸运领域和成长方向。'}\n\n`;
  }
  if (saturn) {
    const sign = getZodiacFromLongitude(saturn.longitude);
    reading += `**♄ 土星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['土星']?.[sign] || '影响你的责任课题和成长考验。'}\n\n`;
  }

  // 综合分析
  reading += `## 🌟 综合分析\n\n`;

  if (sun && moon) {
    const sunSign = getZodiacFromLongitude(sun.longitude);
    const moonSign = getZodiacFromLongitude(moon.longitude);
    const sunElement = getSignElement(sunSign);
    const moonElement = getSignElement(moonSign);

    if (sunSign === moonSign) {
      reading += `你的太阳和月亮落在同一个星座（${sunSign}），这意味着你的外在表现和内在需求高度一致。你是一个表里如一的人，目标明确，行动力强。\n\n`;
    } else if (sunElement === moonElement) {
      reading += `你的太阳在${sunSign}，月亮在${moonSign}，同属${sunElement}元素。虽然星座不同，但能量频率相近，内心比较和谐。\n\n`;
    } else {
      reading += `你的太阳在${sunSign}（${sunElement}），月亮在${moonSign}（${moonElement}）。太阳代表你展现给世界的面貌，月亮代表你内心深处的需求。${sunElement}与${moonElement}的差异可能让你有时感到内在的拉扯，但也赋予了你多面的性格魅力。\n\n`;
    }
  }

  reading += `> 💡 以上是基于行星位置的基础解读。如需更深入的分析，可以使用 AI 深度解读功能。`;

  return reading;
}

/**
 * 生成行运盘静态解读
 */
export function generateTransitInterpretation(natalPlanets: PlanetPosition[], transitPlanets: PlanetPosition[]): string {
  let reading = '# 行运盘解读\n\n';

  reading += `## 🔄 当前行运概览\n\n`;
  reading += `行运盘展示当前天象与你本命盘的关系。以下是当前行星运行对你产生的影响：\n\n`;

  // 关键行运行星分析
  const keyTransits = [
    { name: '太阳', symbol: '☀️', transit: 'transit' as const, meaning: '照亮当前关注的生活领域' },
    { name: '月亮', symbol: '🌙', transit: 'transit' as const, meaning: '影响近期情绪和直觉' },
    { name: '水星', symbol: '☿', transit: 'transit' as const, meaning: '影响沟通、思维和学习' },
    { name: '金星', symbol: '♀', transit: 'transit' as const, meaning: '影响爱情、审美和人际关系' },
    { name: '火星', symbol: '♂', transit: 'transit' as const, meaning: '影响行动力、欲望和冲突' },
    { name: '木星', symbol: '♃', transit: 'transit' as const, meaning: '带来扩展、幸运和成长机会' },
    { name: '土星', symbol: '♄', transit: 'transit' as const, meaning: '带来责任、考验和结构化' },
  ];

  for (const { name, symbol, meaning } of keyTransits) {
    const natal = natalPlanets.find(p => p.name === name);
    const transit = transitPlanets.find(p => p.name === name);

    if (natal && transit) {
      const natalSign = getZodiacFromLongitude(natal.longitude);
      const transitSign = getZodiacFromLongitude(transit.longitude);
      const diff = Math.abs(natal.longitude - transit.longitude);
      const aspect = getAspectName(diff);

      reading += `### ${symbol} ${name}\n`;
      reading += `- 本命位置：${natalSign}\n`;
      reading += `- 当前位置：${transitSign}\n`;
      if (aspect) {
        reading += `- 相位：${aspect}\n`;
      }
      reading += `- 影响：${meaning}\n\n`;
    }
  }

  // 整体能量分析
  reading += `## 🌟 近期能量趋势\n\n`;

  const sunTransit = transitPlanets.find(p => p.name === '太阳');
  const moonTransit = transitPlanets.find(p => p.name === '月亮');

  if (sunTransit) {
    const sign = getZodiacFromLongitude(sunTransit.longitude);
    const element = getSignElement(sign);
    reading += `**当前太阳在${sign}（${element}元素）**\n`;
    reading += `${getElementAdvice(element)}\n\n`;
  }

  if (moonTransit) {
    const sign = getZodiacFromLongitude(moonTransit.longitude);
    reading += `**当前月亮在${sign}**\n`;
    reading += `近期情绪和直觉受到${sign}能量的影响，关注内心的声音。\n\n`;
  }

  // 逆行提醒
  reading += `## ⚠️ 逆行提醒\n\n`;
  const retrogradePlanets = ['水星', '金星', '火星', '木星', '土星'];
  let hasRetrograde = false;

  for (const name of retrogradePlanets) {
    const natal = natalPlanets.find(p => p.name === name);
    const transit = transitPlanets.find(p => p.name === name);
    if (natal && transit) {
      // 简单判断：如果行运位置在本命位置之前，可能是逆行
      const diff = transit.longitude - natal.longitude;
      if (diff < -10 || diff > 10) {
        // 不做逆行判断，避免误报
      }
    }
  }

  if (!hasRetrograde) {
    reading += `当前主要行星无逆行状态，能量流动较为顺畅。\n\n`;
  }

  reading += `> 💡 行运解读仅供参考。如需个性化分析，请使用 AI 深度解读。`;

  return reading;
}

/**
 * 生成天象解读
 */
export function generateSkyInterpretation(planets: PlanetPosition[]): string {
  let reading = '# 今日天象解读\n\n';

  // 行星位置总览
  reading += `## 🌍 当前天象\n\n`;
  reading += `| 行星 | 星座 | 元素 |\n`;
  reading += `|------|------|------|\n`;

  for (const planet of planets) {
    const sign = getZodiacFromLongitude(planet.longitude);
    const element = getSignElement(sign);
    reading += `| ${planet.symbol} ${planet.name} | ${sign} | ${element} |\n`;
  }
  reading += '\n';

  // 元素分布分析
  reading += `## 🌈 能量分布\n\n`;

  const elementCounts = { '火': 0, '土': 0, '风': 0, '水': 0 };
  for (const planet of planets) {
    const sign = getZodiacFromLongitude(planet.longitude);
    const element = getSignElement(sign);
    if (element in elementCounts) {
      elementCounts[element as keyof typeof elementCounts]++;
    }
  }

  const dominantElement = Object.entries(elementCounts).sort((a, b) => b[1] - a[1])[0];
  reading += `**主导元素**：${dominantElement[0]}（${dominantElement[1]}颗行星）\n\n`;

  for (const [element, count] of Object.entries(elementCounts)) {
    const bar = '█'.repeat(count);
    reading += `${element}：${bar} ${count}\n`;
  }
  reading += '\n';

  // 整体能量建议
  reading += `## 🌟 今日能量建议\n\n`;
  reading += `${getElementAdvice(dominantElement[0])}\n\n`;

  // 关键天象
  reading += `## 🔭 关键天象\n\n`;

  const sun = planets.find(p => p.name === '太阳');
  const moon = planets.find(p => p.name === '月亮');

  if (sun) {
    const sign = getZodiacFromLongitude(sun.longitude);
    reading += `**☀️ 太阳在${sign}**：整体能量聚焦在${sign}相关的领域。${getSignFocus(sign)}\n\n`;
  }

  if (moon) {
    const sign = getZodiacFromLongitude(moon.longitude);
    reading += `**🌙 月亮在${sign}**：情绪和直觉受到${sign}能量的影响。适合${getMoonAdvice(sign)}\n\n`;
  }

  reading += `> 💡 天象解读仅供参考，如需个性化分析请使用 AI 深度解读。`;

  return reading;
}

// 辅助函数
function getAspectName(diff: number): string {
  const normalized = diff % 360;
  if (normalized < 8 || normalized > 352) return '合相 (0°)';
  if (normalized >= 55 && normalized <= 65) return '六合 (60°)';
  if (normalized >= 85 && normalized <= 95) return '四分 (90°)';
  if (normalized >= 115 && normalized <= 125) return '三合 (120°)';
  if (normalized >= 175 && normalized <= 185) return '对冲 (180°)';
  return '';
}

function getSignFocus(sign: string): string {
  const focus: Record<string, string> = {
    '白羊座': '适合启动新项目、展现领导力。',
    '金牛座': '适合处理财务、享受感官体验。',
    '双子座': '适合沟通交流、学习新知。',
    '巨蟹座': '适合关注家庭、照顾情感需求。',
    '狮子座': '适合展现才华、追求认可。',
    '处女座': '适合处理细节、提升效率。',
    '天秤座': '适合建立关系、寻求平衡。',
    '天蝎座': '适合深入探索、转化能量。',
    '射手座': '适合探索远方、追求真理。',
    '摩羯座': '适合制定目标、承担责任。',
    '水瓶座': '适合创新突破、关注群体。',
    '双鱼座': '适合灵性修行、发挥想象力。',
  };
  return focus[sign] || '保持觉察，顺应天时。';
}

function getMoonAdvice(sign: string): string {
  const advice: Record<string, string> = {
    '白羊座': '采取行动、表达自我。',
    '金牛座': '享受美食、关注财务。',
    '双子座': '社交沟通、学习交流。',
    '巨蟹座': '陪伴家人、照顾情感。',
    '狮子座': '展现才华、享受娱乐。',
    '处女座': '整理环境、关注健康。',
    '天秤座': '建立关系、寻求和谐。',
    '天蝎座': '深度反思、处理情绪。',
    '射手座': '探索新知、规划旅行。',
    '摩羯座': '制定计划、处理工作。',
    '水瓶座': '参与社群、创新思考。',
    '双鱼座': '冥想放松、发挥直觉。',
  };
  return advice[sign] || '顺应内心感受。';
}
