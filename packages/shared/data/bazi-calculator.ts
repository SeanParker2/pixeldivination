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

// 五行性格特征
const ELEMENT_PERSONALITY: Record<string, { traits: string[]; strengths: string[]; weaknesses: string[]; advice: string }> = {
  '木': {
    traits: ['仁慈', '正直', '有同情心', '追求成长', '有理想'],
    strengths: ['创造力强', '有领导力', '善于规划', '积极向上'],
    weaknesses: ['容易固执', '有时过于理想化', '缺乏变通'],
    advice: '培养灵活性，学会在坚持与变通之间找到平衡。'
  },
  '火': {
    traits: ['热情', '开朗', '有感染力', '追求光明', '行动力强'],
    strengths: ['社交能力强', '有感染力', '乐观积极', '勇于表达'],
    weaknesses: ['容易冲动', '有时缺乏耐心', '情绪波动大'],
    advice: '学会控制情绪，在热情中保持冷静的判断力。'
  },
  '土': {
    traits: ['稳重', '踏实', '有责任感', '追求稳定', '包容性强'],
    strengths: ['执行力强', '值得信赖', '有耐心', '善于积累'],
    weaknesses: ['有时过于保守', '缺乏冒险精神', '容易固步自封'],
    advice: '适当尝试新事物，在稳定中寻求突破。'
  },
  '金': {
    traits: ['果断', '有原则', '追求完美', '正义感强', '意志坚定'],
    strengths: ['决策力强', '有组织能力', '注重细节', '执行力强'],
    weaknesses: ['有时过于严苛', '缺乏弹性', '容易给人压力'],
    advice: '学会宽容，在原则与灵活之间找到平衡。'
  },
  '水': {
    traits: ['聪明', '灵活', '有智慧', '善于变通', '直觉敏锐'],
    strengths: ['适应力强', '善于沟通', '有洞察力', '思维敏捷'],
    weaknesses: ['有时过于多变', '缺乏定性', '容易犹豫不决'],
    advice: '培养专注力，在变通中保持核心目标不变。'
  },
};

// 十神性格分析（用于报告生成）
export const TEN_GODS_PERSONALITY: Record<string, { name: string; meaning: string; personality: string; career: string }> = {
  '比肩': { name: '比肩', meaning: '与日主相同的五行', personality: '独立自主，有竞争意识，喜欢与人合作但也有竞争心', career: '适合创业、合伙经营、竞争性行业' },
  '劫财': { name: '劫财', meaning: '与日主相同但阴阳相反', personality: '果断有魄力，但有时过于冲动，容易与人发生冲突', career: '适合销售、竞争性行业、需要魄力的工作' },
  '食神': { name: '食神', meaning: '日主所生的五行', personality: '聪明有才华，善于表达，有艺术天赋', career: '适合艺术、教育、餐饮、创意行业' },
  '伤官': { name: '伤官', meaning: '日主所生但阴阳相反', personality: '才华横溢但叛逆，不喜束缚，有创新精神', career: '适合自由职业、创意行业、技术研发' },
  '偏财': { name: '偏财', meaning: '日主所克的五行', personality: '慷慨大方，善于交际，有投资眼光', career: '适合投资、金融、销售、公关' },
  '正财': { name: '正财', meaning: '日主所克但阴阳相反', personality: '勤俭持家，脚踏实地，有理财能力', career: '适合财务、会计、管理、稳定行业' },
  '七杀': { name: '七杀', meaning: '克日主的五行', personality: '有魄力，有野心，但压力大，容易焦虑', career: '适合管理、军警、竞争性行业' },
  '正官': { name: '正官', meaning: '克日主但阴阳相反', personality: '有责任感，守规矩，有领导才能', career: '适合公务员、管理、法律、行政' },
  '偏印': { name: '偏印', meaning: '生日主的五行', personality: '聪明有悟性，但有时过于自我，有独特的思维方式', career: '适合研究、技术、自由职业、创意行业' },
  '正印': { name: '正印', meaning: '生日主但阴阳相反', personality: '有爱心，有包容心，重视学习和成长', career: '适合教育、文化、公益、服务行业' },
};

// 生成八字报告
export function generateBaziReport(bazi: ReturnType<typeof calculateBazi>) {
  let report = '# 八字命理分析报告\n\n';

  // 四柱排盘
  report += '## 📊 四柱排盘\n\n';
  report += `| 年柱 | 月柱 | 日柱 | 时柱 |\n`;
  report += `|------|------|------|------|\n`;
  report += `| ${bazi.analysis.yearPillar} | ${bazi.analysis.monthPillar} | ${bazi.analysis.dayPillar} | ${bazi.analysis.hourPillar} |\n\n`;

  // 日主分析
  report += '## 🎯 日主分析\n\n';
  report += `**日主**：${bazi.dayMaster}（${bazi.dayElement}）\n\n`;
  report += `**身强身弱**：${bazi.strongWeak}\n\n`;

  // 五行分布
  report += '## 🌈 五行分布\n\n';
  const totalPoints = Object.values(bazi.fiveElements).reduce((a, b) => a + b, 0);
  for (const [element, count] of Object.entries(bazi.fiveElements)) {
    const percentage = Math.round((count / totalPoints) * 100);
    const bar = '█'.repeat(Math.max(1, Math.round(percentage / 5)));
    const status = percentage >= 25 ? '旺' : percentage <= 10 ? '弱' : '平';
    report += `${element}：${bar} ${percentage}%（${status}）\n`;
  }
  report += '\n';

  // 五行喜忌分析
  report += '## ⚖️ 五行喜忌\n\n';
  const elements = Object.entries(bazi.fiveElements).sort((a, b) => b[1] - a[1]);
  const strongest = elements[0][0];
  const weakest = elements[elements.length - 1][0];

  if (bazi.strongWeak === '身强') {
    report += `**喜用神**：${weakest}（抑制过旺的日主）\n\n`;
    report += `**忌神**：${strongest}（日主已过旺，不需要更多）\n\n`;
  } else {
    report += `**喜用神**：${strongest}（增强日主的力量）\n\n`;
    report += `**忌神**：${weakest}（日主已弱，不宜再削弱）\n\n`;
  }

  // 性格特点
  report += '## 💫 性格特点\n\n';
  report += `${bazi.personality}\n\n`;

  const elementPersonality = ELEMENT_PERSONALITY[bazi.dayElement];
  if (elementPersonality) {
    report += `**${bazi.dayElement}性人特质**：${elementPersonality.traits.join('、')}\n\n`;
    report += `**优势**：${elementPersonality.strengths.join('、')}\n\n`;
    report += `**需要注意**：${elementPersonality.weaknesses.join('、')}\n\n`;
    report += `**成长建议**：${elementPersonality.advice}\n\n`;
  }

  // 事业方向
  report += '## 💼 事业方向\n\n';
  report += `${bazi.career}\n\n`;

  // 感情婚姻
  report += '## 💕 感情婚姻\n\n';
  report += generateRelationshipAnalysis(bazi);

  // 财运分析
  report += '## 💰 财运分析\n\n';
  report += generateWealthAnalysis(bazi);

  // 健康提示
  report += '## 🏥 健康提示\n\n';
  report += generateHealthAnalysis(bazi);

  // 开运建议
  report += '## 🌟 开运建议\n\n';
  report += generateLuckyAdvice(bazi);

  return report;
}

// 感情分析
function generateRelationshipAnalysis(bazi: ReturnType<typeof calculateBazi>): string {
  let analysis = '';

  const dayElement = bazi.dayElement;
  const fiveElements = bazi.fiveElements;

  // 日主与配偶星的关系
  const spouseElement = getSpouseElement(dayElement);
  const spouseStrength = fiveElements[spouseElement] || 0;

  if (spouseStrength >= 3) {
    analysis += `配偶星（${spouseElement}）力量充足，感情运势较好，容易遇到合适的伴侣。\n\n`;
  } else if (spouseStrength <= 1) {
    analysis += `配偶星（${spouseElement}）力量不足，感情方面可能需要更多主动，或者伴侣缘分来得较晚。\n\n`;
  } else {
    analysis += `配偶星（${spouseElement}）力量适中，感情运势平稳。\n\n`;
  }

  // 基于日主的性格分析
  if (dayElement === '木') {
    analysis += '你在感情中注重精神层面的交流，喜欢有共同理想的伴侣。';
  } else if (dayElement === '火') {
    analysis += '你在感情中热情主动，喜欢浪漫和激情，但需要注意控制情绪。';
  } else if (dayElement === '土') {
    analysis += '你在感情中稳重踏实，重视承诺和安全感，是值得信赖的伴侣。';
  } else if (dayElement === '金') {
    analysis += '你在感情中注重原则和忠诚，对伴侣有较高要求，但也会全心付出。';
  } else if (dayElement === '水') {
    analysis += '你在感情中灵活变通，善于沟通，但有时可能显得不够坚定。';
  }

  return analysis;
}

// 财运分析
function generateWealthAnalysis(bazi: ReturnType<typeof calculateBazi>): string {
  let analysis = '';

  const dayElement = bazi.dayElement;
  const wealthElement = getWealthElement(dayElement);
  const wealthStrength = bazi.fiveElements[wealthElement] || 0;

  if (wealthStrength >= 3) {
    analysis += `财星（${wealthElement}）力量充足，财运较好，有赚钱的机会和能力。\n\n`;
  } else if (wealthStrength <= 1) {
    analysis += `财星（${wealthElement}）力量不足，财运方面需要更加努力，或者财富来得较晚。\n\n`;
  } else {
    analysis += `财星（${wealthElement}）力量适中，财运平稳，适合稳健理财。\n\n`;
  }

  // 基于日主的理财建议
  if (dayElement === '木') {
    analysis += '适合投资教育、文化、环保等领域，避免高风险投机。';
  } else if (dayElement === '火') {
    analysis += '适合投资娱乐、餐饮、能源等领域，但需要控制消费欲望。';
  } else if (dayElement === '土') {
    analysis += '适合投资房地产、农业、金融等领域，稳健理财为佳。';
  } else if (dayElement === '金') {
    analysis += '适合投资金融、珠宝、机械等领域，有较好的投资眼光。';
  } else if (dayElement === '水') {
    analysis += '适合投资物流、旅游、传媒等领域，灵活多变的理财方式。';
  }

  return analysis;
}

// 健康分析
function generateHealthAnalysis(bazi: ReturnType<typeof calculateBazi>): string {
  let analysis = '';

  const fiveElements = bazi.fiveElements;
  const weakest = Object.entries(fiveElements).sort((a, b) => a[1] - b[1])[0][0];

  analysis += `五行中${weakest}最弱，需要特别关注相关健康领域：\n\n`;

  const healthMap: Record<string, string[]> = {
    '木': ['肝脏', '眼睛', '筋骨', '神经系统'],
    '火': ['心脏', '小肠', '血液循环', '眼睛'],
    '土': ['脾脏', '胃', '消化系统', '肌肉'],
    '金': ['肺', '大肠', '呼吸系统', '皮肤'],
    '水': ['肾脏', '膀胱', '泌尿系统', '耳朵'],
  };

  const healthAreas = healthMap[weakest] || [];
  analysis += `- 需要关注的器官：${healthAreas.join('、')}\n\n`;

  // 基于日主的养生建议
  if (bazi.dayElement === '木') {
    analysis += '养生重点：疏肝理气，保持心情舒畅，多做伸展运动。';
  } else if (bazi.dayElement === '火') {
    analysis += '养生重点：养心安神，避免过度劳累，保持规律作息。';
  } else if (bazi.dayElement === '土') {
    analysis += '养生重点：健脾养胃，注意饮食规律，避免暴饮暴食。';
  } else if (bazi.dayElement === '金') {
    analysis += '养生重点：润肺养阴，注意呼吸系统健康，避免干燥环境。';
  } else if (bazi.dayElement === '水') {
    analysis += '养生重点：补肾固本，注意保暖，避免过度消耗。';
  }

  return analysis;
}

// 开运建议
function generateLuckyAdvice(bazi: ReturnType<typeof calculateBazi>): string {
  let advice = '';

  const dayElement = bazi.dayElement;
  const favorable = bazi.strongWeak === '身强' ? getWeakenElement(dayElement) : getStrengthenElement(dayElement);

  // 幸运颜色
  const colorMap: Record<string, string[]> = {
    '木': ['绿色', '青色'],
    '火': ['红色', '紫色'],
    '土': ['黄色', '棕色'],
    '金': ['白色', '银色'],
    '水': ['蓝色', '黑色'],
  };

  const luckyColors = colorMap[favorable] || [];
  advice += `**幸运颜色**：${luckyColors.join('、')}\n\n`;

  // 幸运方位
  const directionMap: Record<string, string> = {
    '木': '东方',
    '火': '南方',
    '土': '中央',
    '金': '西方',
    '水': '北方',
  };

  advice += `**幸运方位**：${directionMap[favorable] || '中央'}\n\n`;

  // 幸运数字
  const numberMap: Record<string, string> = {
    '木': '3、8',
    '火': '2、7',
    '土': '5、0',
    '金': '4、9',
    '水': '1、6',
  };

  advice += `**幸运数字**：${numberMap[favorable] || '5、0'}\n\n`;

  // 行业建议
  const industryMap: Record<string, string[]> = {
    '木': ['教育', '文化', '出版', '园艺', '医疗'],
    '火': ['娱乐', '餐饮', '电子', '能源', '演艺'],
    '土': ['房地产', '建筑', '农业', '金融', '管理'],
    '金': ['金融', '法律', '机械', '珠宝', '军警'],
    '水': ['物流', '旅游', '传媒', 'IT', '贸易'],
  };

  const industries = industryMap[favorable] || [];
  advice += `**适合行业**：${industries.join('、')}\n\n`;

  advice += '> 🌙 八字命理是一种参考，真正的命运掌握在自己手中。顺势而为，积极进取，才是最好的开运之道。';

  return advice;
}

// 辅助函数
function getSpouseElement(dayElement: string): string {
  const map: Record<string, string> = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };
  return map[dayElement] || '土';
}

function getWealthElement(dayElement: string): string {
  const map: Record<string, string> = { '木': '土', '火': '金', '土': '水', '金': '木', '水': '火' };
  return map[dayElement] || '土';
}

function getStrengthenElement(dayElement: string): string {
  const map: Record<string, string> = { '木': '水', '火': '木', '土': '火', '金': '土', '水': '金' };
  return map[dayElement] || '土';
}

function getWeakenElement(dayElement: string): string {
  const map: Record<string, string> = { '木': '金', '火': '水', '土': '木', '金': '火', '水': '土' };
  return map[dayElement] || '土';
}
