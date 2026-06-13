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

/**
 * 生成本命盘静态解读
 */
export function generateNatalInterpretation(planets: PlanetPosition[]): string {
  let reading = '# 本命盘解读\n\n';

  // 找到关键行星
  const sun = planets.find(p => p.name === '太阳');
  const moon = planets.find(p => p.name === '月亮');
  const mercury = planets.find(p => p.name === '水星');
  const venus = planets.find(p => p.name === '金星');
  const mars = planets.find(p => p.name === '火星');

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

  // 上升星座（如果有的话）
  reading += `## 🔄 关键行星落座\n\n`;

  if (mercury) {
    const sign = getZodiacFromLongitude(mercury.longitude);
    reading += `**水星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['水星']?.[sign] || '影响你的思维方式和沟通风格。'}\n\n`;
  }

  if (venus) {
    const sign = getZodiacFromLongitude(venus.longitude);
    reading += `**金星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['金星']?.[sign] || '影响你的爱情观和审美偏好。'}\n\n`;
  }

  if (mars) {
    const sign = getZodiacFromLongitude(mars.longitude);
    reading += `**火星在${sign}**：${PLANET_SIGN_INTERPRETATIONS['火星']?.[sign] || '影响你的行动力和欲望表达方式。'}\n\n`;
  }

  // 综合分析
  reading += `## 🌟 综合分析\n\n`;

  if (sun && moon) {
    const sunSign = getZodiacFromLongitude(sun.longitude);
    const moonSign = getZodiacFromLongitude(moon.longitude);

    if (sunSign === moonSign) {
      reading += `你的太阳和月亮落在同一个星座，这意味着你的外在表现和内在需求高度一致。你是一个表里如一的人。\n\n`;
    } else {
      reading += `你的太阳在${sunSign}，月亮在${moonSign}。太阳代表你展现给世界的面貌，月亮代表你内心深处的需求。这两者的差异可能让你有时感到内在的拉扯。\n\n`;
    }
  }

  reading += `> 💡 以上是基于行星位置的基础解读。如需更深入的分析，可以使用 AI 深度解读功能。`;

  return reading;
}

/**
 * 生成天象解读
 */
export function generateSkyInterpretation(planets: PlanetPosition[]): string {
  let reading = '# 今日天象解读\n\n';

  reading += `## 🌍 当前天象\n\n`;

  for (const planet of planets) {
    const sign = getZodiacFromLongitude(planet.longitude);
    reading += `${planet.symbol} **${planet.name}** 在 ${sign}\n`;
  }

  reading += `\n## 🌟 能量氛围\n\n`;

  // 基于太阳位置分析整体能量
  const sun = planets.find(p => p.name === '太阳');
  if (sun) {
    const sign = getZodiacFromLongitude(sun.longitude);
    reading += `当前太阳在${sign}，整体能量偏向${getSignElement(sign)}元素特质。\n\n`;
  }

  reading += `> 💡 天象解读仅供参考，如需个性化分析请使用 AI 深度解读。`;

  return reading;
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
