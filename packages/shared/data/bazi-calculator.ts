/**
 * 八字命理专业计算库 - 后端使用
 * 包含完整的四柱排盘、五行分析
 */

// 天干
const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];

// 地支
const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

// 五行
const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'];

// 天干五行
const STEM_ELEMENTS: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土', '己': '土',
  '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};

// 地支五行
const BRANCH_ELEMENTS: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 地支藏干
const BRANCH_HIDDEN_STEMS: Record<string, string[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'], '卯': ['乙'],
  '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'], '午': ['丁', '己'],
  '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'], '酉': ['辛'],
  '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
};

// 计算年柱
function getYearPillar(year: number) {
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

// 计算月柱
function getMonthPillar(year: number, month: number) {
  const branchIndex = (month + 1) % 12;
  const branch = EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex];
  
  const yearStem = getYearPillar(year).stem;
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  const monthStemBase = [2, 4, 6, 8, 0];
  const baseIndex = yearStemIndex % 5;
  const monthStemIndex = (monthStemBase[baseIndex] + month - 1) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex < 0 ? monthStemIndex + 10 : monthStemIndex],
    branch
  };
}

// 计算日柱
function getDayPillar(year: number, month: number, day: number) {
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  const stemIndex = diffDays % 10;
  const branchIndex = (diffDays + 10) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

// 计算时柱
function getHourPillar(dayStem: string, hour: number) {
  const branchIndex = Math.floor((hour + 1) / 2) % 12;
  const branch = EARTHLY_BRANCHES[branchIndex];
  
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const hourStemBase = [0, 2, 4, 6, 8];
  const baseIndex = dayStemIndex % 5;
  const hourStemIndex = (hourStemBase[baseIndex] + branchIndex) % 10;
  
  return {
    stem: HEAVENLY_STEMS[hourStemIndex < 0 ? hourStemIndex + 10 : hourStemIndex],
    branch
  };
}

// 计算五行强弱
function calculateFiveElements(pillars: any) {
  const elements: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  
  const stems = [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem];
  for (const stem of stems) {
    elements[STEM_ELEMENTS[stem]] += 2;
  }
  
  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];
  for (const branch of branches) {
    elements[BRANCH_ELEMENTS[branch]] += 1;
    for (const hiddenStem of BRANCH_HIDDEN_STEMS[branch]) {
      elements[STEM_ELEMENTS[hiddenStem]] += 0.5;
    }
  }
  
  return elements;
}

// 判断身强身弱
function judgeStrongWeak(dayMaster: string, elements: Record<string, number>) {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  
  const supportElement1 = FIVE_ELEMENTS[dayIndex];
  const supportElement2 = FIVE_ELEMENTS[(dayIndex + 4) % 5];
  
  const supportPower = elements[supportElement1] + elements[supportElement2];
  const totalPower = Object.values(elements).reduce((sum, val) => sum + val, 0);
  
  const ratio = supportPower / totalPower;
  
  if (ratio > 0.55) return '身强';
  if (ratio < 0.45) return '身弱';
  return '中和';
}

// 获取性格分析
function getPersonality(dayMaster: string) {
  const personalities: Record<string, string> = {
    '甲': '甲木之人正直仁慈，有领导才能，如大树般坚韧不拔。',
    '乙': '乙木之人温柔善良，富有同情心，如藤蔓般灵活适应。',
    '丙': '丙火之人热情开朗，充满活力，如太阳般温暖他人。',
    '丁': '丁火之人聪明机智，富有创意，如烛光般照亮他人。',
    '戊': '戊土之人稳重踏实，诚实守信，如大地般包容万物。',
    '己': '己土之人温和谦逊，善于协调，如田园般滋养万物。',
    '庚': '庚金之人果断坚毅，有正义感，如刀剑般锋利果断。',
    '辛': '辛金之人细腻敏感，追求完美，如珠宝般精致优雅。',
    '壬': '壬水之人聪明机智，善于变通，如大海般包容万象。',
    '癸': '癸水之人温柔内敛，直觉敏锐，如雨露般滋润万物。'
  };
  return personalities[dayMaster] || '性格分析需要更多信息。';
}

// 获取事业分析
function getCareer(dayElement: string) {
  const careers: Record<string, string> = {
    '木': '适合教育、文化、出版、园艺、医疗等行业。有创新和领导才能。',
    '火': '适合娱乐、餐饮、电子、能源、演艺等行业。热情和创造力强。',
    '土': '适合房地产、建筑、农业、金融、管理等行业。稳重和踏实是优势。',
    '金': '适合金融、法律、机械、珠宝、军警等行业。果断和执行力强。',
    '水': '适合物流、旅游、传媒、IT、贸易等行业。灵活和变通能力强。'
  };
  return careers[dayElement] || '事业分析需要更多信息。';
}

// 完整八字排盘
export function calculateBazi(birthDate: Date, birthHour: number) {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  const pillars = {
    year: getYearPillar(year),
    month: getMonthPillar(year, month),
    day: getDayPillar(year, month, day),
    hour: getHourPillar(getDayPillar(year, month, day).stem, birthHour)
  };
  
  const dayMaster = pillars.day.stem;
  const dayElement = STEM_ELEMENTS[dayMaster];
  const fiveElements = calculateFiveElements(pillars);
  const strongWeak = judgeStrongWeak(dayMaster, fiveElements);
  const personality = getPersonality(dayMaster);
  const career = getCareer(dayElement);
  
  return {
    fourPillars: pillars,
    dayMaster,
    dayElement,
    fiveElements,
    strongWeak,
    personality,
    career,
    analysis: {
      yearPillar: `${pillars.year.stem}${pillars.year.branch}`,
      monthPillar: `${pillars.month.stem}${pillars.month.branch}`,
      dayPillar: `${pillars.day.stem}${pillars.day.branch}`,
      hourPillar: `${pillars.hour.stem}${pillars.hour.branch}`
    }
  };
}

// 生成八字报告
export function generateBaziReport(bazi: ReturnType<typeof calculateBazi>) {
  let report = '# 八字命理分析报告\n\n';
  
  report += '## 四柱排盘\n\n';
  report += `| 年柱 | 月柱 | 日柱 | 时柱 |\n`;
  report += `|------|------|------|------|\n`;
  report += `| ${bazi.analysis.yearPillar} | ${bazi.analysis.monthPillar} | ${bazi.analysis.dayPillar} | ${bazi.analysis.hourPillar} |\n\n`;
  
  report += `## 日主分析\n\n`;
  report += `日主：**${bazi.dayMaster}**（${bazi.dayElement}）\n`;
  report += `身强身弱：**${bazi.strongWeak}**\n\n`;
  
  report += '## 五行分布\n\n';
  for (const [element, count] of Object.entries(bazi.fiveElements)) {
    const percentage = Math.round((count / 10) * 100);
    const bar = '█'.repeat(Math.round(percentage / 10));
    report += `${element}：${bar} ${percentage}%\n`;
  }
  report += '\n';
  
  report += '## 性格特点\n\n';
  report += `${bazi.personality}\n\n`;
  
  report += '## 事业方向\n\n';
  report += `${bazi.career}\n`;
  
  return report;
}
