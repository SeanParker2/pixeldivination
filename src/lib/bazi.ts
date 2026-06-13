/**
 * 八字命理专业计算库
 * 包含完整的四柱排盘、五行分析、十神分析
 */

// 天干
export const HEAVENLY_STEMS = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const;
export type HeavenlyStem = typeof HEAVENLY_STEMS[number];

// 地支
export const EARTHLY_BRANCHES = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const;
export type EarthlyBranch = typeof EARTHLY_BRANCHES[number];

// 五行
export const FIVE_ELEMENTS = ['木', '火', '土', '金', '水'] as const;
export type FiveElement = typeof FIVE_ELEMENTS[number];

// 天干五行
export const STEM_ELEMENTS: Record<HeavenlyStem, FiveElement> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行
export const BRANCH_ELEMENTS: Record<EarthlyBranch, FiveElement> = {
  '子': '水', '丑': '土',
  '寅': '木', '卯': '木',
  '辰': '土', '巳': '火',
  '午': '火', '未': '土',
  '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 地支藏干
export const BRANCH_HIDDEN_STEMS: Record<EarthlyBranch, HeavenlyStem[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// 十神
export type TenGod = '比肩' | '劫财' | '食神' | '伤官' | '偏财' | '正财' | '七杀' | '正官' | '偏印' | '正印';

// 十神关系
export function getTenGod(dayMaster: HeavenlyStem, otherStem: HeavenlyStem): TenGod {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const otherElement = STEM_ELEMENTS[otherStem];
  
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  const otherIndex = FIVE_ELEMENTS.indexOf(otherElement);
  
  // 同我者：比肩、劫财
  if (dayIndex === otherIndex) {
    return dayMaster === otherStem ? '比肩' : '劫财';
  }
  
  // 我生者：食神、伤官
  if ((dayIndex + 1) % 5 === otherIndex) {
    return dayMaster.charCodeAt(0) % 2 === otherStem.charCodeAt(0) % 2 ? '食神' : '伤官';
  }
  
  // 我克者：偏财、正财
  if ((dayIndex + 2) % 5 === otherIndex) {
    return dayMaster.charCodeAt(0) % 2 === otherStem.charCodeAt(0) % 2 ? '偏财' : '正财';
  }
  
  // 克我者：七杀、正官
  if ((dayIndex + 3) % 5 === otherIndex) {
    return dayMaster.charCodeAt(0) % 2 === otherStem.charCodeAt(0) % 2 ? '七杀' : '正官';
  }
  
  // 生我者：偏印、正印
  return dayMaster.charCodeAt(0) % 2 === otherStem.charCodeAt(0) % 2 ? '偏印' : '正印';
}

// 四柱数据
export interface FourPillars {
  year: { stem: HeavenlyStem; branch: EarthlyBranch };
  month: { stem: HeavenlyStem; branch: EarthlyBranch };
  day: { stem: HeavenlyStem; branch: EarthlyBranch };
  hour: { stem: HeavenlyStem; branch: EarthlyBranch };
}

// 八字完整数据
export interface BaziData {
  fourPillars: FourPillars;
  dayMaster: HeavenlyStem;
  fiveElements: Record<FiveElement, number>;
  tenGods: TenGod[];
  strongWeak: '身强' | '身弱' | '中和';
  favorableElements: FiveElement[];
  unfavorableElements: FiveElement[];
  analysis: BaziAnalysis;
}

// 八字分析
export interface BaziAnalysis {
  personality: string;
  career: string;
  wealth: string;
  love: string;
  health: string;
  advice: string;
}

// 计算年柱
export function getYearPillar(year: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 年柱计算：年份减3除以10取余数为天干，除以12取余数为地支
  const stemIndex = (year - 4) % 10;
  const branchIndex = (year - 4) % 12;
  
  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

// 计算月柱
export function getMonthPillar(year: number, month: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 月柱地支固定：正月寅、二月卯...十二月丑
  const branchIndex = (month + 1) % 12; // 正月=寅(2)
  const branch = EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex];
  
  // 月柱天干：年干配合月干
  // 甲己之年丙作首，乙庚之岁戊为头
  // 丙辛必定寻庚起，丁壬壬位顺行流
  // 更有戊癸何方发，甲寅之上好追求
  const yearStem = getYearPillar(year).stem;
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearStem);
  
  // 五虎遁月公式
  const monthStemBase = [2, 4, 6, 8, 0]; // 甲己、乙庚、丙辛、丁壬、戊癸对应的正月天干
  const baseIndex = yearStemIndex % 5;
  const monthStemIndex = (monthStemBase[baseIndex] + month - 1) % 10;
  
  return {
    stem: HEAVENLY_STEMS[monthStemIndex < 0 ? monthStemIndex + 10 : monthStemIndex],
    branch
  };
}

// 计算日柱
export function getDayPillar(year: number, month: number, day: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 使用蔡勒公式变体计算日柱
  // 基准日：1900年1月1日为甲戌日（天干0=甲，地支10=戌）
  const baseDate = new Date(1900, 0, 1);
  const targetDate = new Date(year, month - 1, day);
  const diffDays = Math.floor((targetDate.getTime() - baseDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // 1900年1月1日是甲戌日（天干0，地支10）
  const stemIndex = (diffDays + 0) % 10; // 甲=0
  const branchIndex = (diffDays + 10) % 12; // 戌=10
  
  return {
    stem: HEAVENLY_STEMS[stemIndex < 0 ? stemIndex + 10 : stemIndex],
    branch: EARTHLY_BRANCHES[branchIndex < 0 ? branchIndex + 12 : branchIndex]
  };
}

// 计算时柱
export function getHourPillar(dayStem: HeavenlyStem, hour: number): { stem: HeavenlyStem; branch: EarthlyBranch } {
  // 时柱地支：23-1子时，1-3丑时...21-23亥时
  const branchIndex = Math.floor((hour + 1) / 2) % 12;
  const branch = EARTHLY_BRANCHES[branchIndex];
  
  // 时柱天干：日干配合时干
  // 甲己还加甲，乙庚丙作初
  // 丙辛从戊起，丁壬庚子居
  // 戊癸何方发，壬子是真途
  const dayStemIndex = HEAVENLY_STEMS.indexOf(dayStem);
  const hourStemBase = [0, 2, 4, 6, 8]; // 甲己、乙庚、丙辛、丁壬、戊癸对应的子时天干
  const baseIndex = dayStemIndex % 5;
  const hourStemIndex = (hourStemBase[baseIndex] + branchIndex) % 10;
  
  return {
    stem: HEAVENLY_STEMS[hourStemIndex < 0 ? hourStemIndex + 10 : hourStemIndex],
    branch
  };
}

// 计算四柱
export function calculateFourPillars(
  birthDate: Date,
  birthHour: number
): FourPillars {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  
  return {
    year: getYearPillar(year),
    month: getMonthPillar(year, month),
    day: getDayPillar(year, month, day),
    hour: getHourPillar(getDayPillar(year, month, day).stem, birthHour)
  };
}

// 计算五行强弱
export function calculateFiveElements(pillars: FourPillars): Record<FiveElement, number> {
  const elements: Record<FiveElement, number> = {
    '木': 0, '火': 0, '土': 0, '金': 0, '水': 0
  };
  
  // 天干五行
  const stems = [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem];
  for (const stem of stems) {
    elements[STEM_ELEMENTS[stem]] += 2;
  }
  
  // 地支五行
  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];
  for (const branch of branches) {
    elements[BRANCH_ELEMENTS[branch]] += 1;
  }
  
  // 藏干五行
  for (const branch of branches) {
    const hiddenStems = BRANCH_HIDDEN_STEMS[branch];
    for (const stem of hiddenStems) {
      elements[STEM_ELEMENTS[stem]] += 0.5;
    }
  }
  
  return elements;
}

// 判断身强身弱
export function judgeStrongWeak(
  dayMaster: HeavenlyStem,
  elements: Record<FiveElement, number>
): '身强' | '身弱' | '中和' {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  
  // 生我者和同我者的力量
  const supportElements = [
    FIVE_ELEMENTS[dayIndex], // 同我
    FIVE_ELEMENTS[(dayIndex + 4) % 5] // 生我
  ];
  
  const supportPower = supportElements.reduce((sum, elem) => sum + elements[elem], 0);
  const totalPower = Object.values(elements).reduce((sum, val) => sum + val, 0);
  
  const ratio = supportPower / totalPower;
  
  if (ratio > 0.55) return '身强';
  if (ratio < 0.45) return '身弱';
  return '中和';
}

// 确定喜用神
export function determineFavorableElements(
  dayMaster: HeavenlyStem,
  strongWeak: '身强' | '身弱' | '中和'
): { favorable: FiveElement[]; unfavorable: FiveElement[] } {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  
  if (strongWeak === '身强') {
    // 身强喜克泄耗
    return {
      favorable: [
        FIVE_ELEMENTS[(dayIndex + 2) % 5], // 我克（财）
        FIVE_ELEMENTS[(dayIndex + 1) % 5], // 我生（食伤）
        FIVE_ELEMENTS[(dayIndex + 3) % 5]  // 克我（官杀）
      ],
      unfavorable: [
        FIVE_ELEMENTS[dayIndex], // 同我（比劫）
        FIVE_ELEMENTS[(dayIndex + 4) % 5] // 生我（印枭）
      ]
    };
  } else if (strongWeak === '身弱') {
    // 身弱喜生扶
    return {
      favorable: [
        FIVE_ELEMENTS[(dayIndex + 4) % 5], // 生我（印枭）
        FIVE_ELEMENTS[dayIndex] // 同我（比劫）
      ],
      unfavorable: [
        FIVE_ELEMENTS[(dayIndex + 2) % 5], // 我克（财）
        FIVE_ELEMENTS[(dayIndex + 1) % 5], // 我生（食伤）
        FIVE_ELEMENTS[(dayIndex + 3) % 5]  // 克我（官杀）
      ]
    };
  } else {
    // 中和，五行平衡
    return {
      favorable: [],
      unfavorable: []
    };
  }
}

// 获取八字分析
export function getBaziAnalysis(
  dayMaster: HeavenlyStem,
  elements: Record<FiveElement, number>,
  strongWeak: '身强' | '身弱' | '中和',
  favorable: FiveElement[]
): BaziAnalysis {
  const dayElement = STEM_ELEMENTS[dayMaster];
  
  // 性格分析
  const personalityMap: Record<HeavenlyStem, string> = {
    '甲': '甲木之人正直仁慈，有领导才能，如大树般坚韧不拔。但有时过于固执，需要学会变通。',
    '乙': '乙木之人温柔善良，富有同情心，如藤蔓般灵活适应。但有时优柔寡断，需要增强决断力。',
    '丙': '丙火之人热情开朗，充满活力，如太阳般温暖他人。但有时过于冲动，需要学会控制情绪。',
    '丁': '丁火之人聪明机智，富有创意，如烛光般照亮他人。但有时过于敏感，需要增强心理承受力。',
    '戊': '戊土之人稳重踏实，诚实守信，如大地般包容万物。但有时过于保守，需要勇于尝试新事物。',
    '己': '己土之人温和谦逊，善于协调，如田园般滋养万物。但有时过于依赖他人，需要增强独立性。',
    '庚': '庚金之人果断坚毅，有正义感，如刀剑般锋利果断。但有时过于刚强，需要学会以柔克刚。',
    '辛': '辛金之人细腻敏感，追求完美，如珠宝般精致优雅。但有时过于挑剔，需要学会包容他人。',
    '壬': '壬水之人聪明机智，善于变通，如大海般包容万象。但有时过于多变，需要保持专注。',
    '癸': '癸水之人温柔内敛，直觉敏锐，如雨露般滋润万物。但有时过于被动，需要主动出击。'
  };
  
  // 事业分析
  const careerElementMap: Record<FiveElement, string> = {
    '木': '适合教育、文化、出版、园艺、医疗等行业。有创新和领导才能。',
    '火': '适合娱乐、餐饮、电子、能源、演艺等行业。热情和创造力强。',
    '土': '适合房地产、建筑、农业、金融、管理等行业。稳重和踏实是优势。',
    '金': '适合金融、法律、机械、珠宝、军警等行业。果断和执行力强。',
    '水': '适合物流、旅游、传媒、IT、贸易等行业。灵活和变通能力强。'
  };
  
  // 财运分析
  const wealthAnalysis = strongWeak === '身强' 
    ? '财运较好，有赚钱能力和理财头脑。适合主动投资和创业。'
    : strongWeak === '身弱'
    ? '财运需要努力才能获得。适合稳定收入，避免高风险投资。'
    : '财运平稳，收支平衡。适合稳健理财。';
  
  // 感情分析
  const loveAnalysis = strongWeak === '身强'
    ? '感情中较为主动，有吸引力。但需要注意控制欲，给对方空间。'
    : strongWeak === '身弱'
    ? '感情中较为被动，需要主动表达。适合找互补的伴侣。'
    : '感情平稳，适合长期稳定的关系。';
  
  // 健康分析
  const weakElement = Object.entries(elements).reduce((min, [elem, val]) => 
    val < elements[min as FiveElement] ? elem : min
  , '木' as FiveElement);
  
  const healthMap: Record<FiveElement, string> = {
    '木': '注意肝胆、眼睛、神经系统。多接触大自然，保持心情舒畅。',
    '火': '注意心脏、血液循环、眼睛。避免过度劳累，保持规律作息。',
    '土': '注意脾胃、消化系统、肌肉。饮食规律，避免暴饮暴食。',
    '金': '注意肺部、呼吸系统、皮肤。保持空气清新，避免吸烟。',
    '水': '注意肾脏、泌尿系统、骨骼。多喝水，避免熬夜。'
  };
  
  return {
    personality: personalityMap[dayMaster],
    career: `五行${dayElement}旺，${careerElementMap[dayElement]}`,
    wealth: wealthAnalysis,
    love: loveAnalysis,
    health: `五行${weakElement}弱，${healthMap[weakElement as FiveElement]}`,
    advice: strongWeak === '身强' 
      ? '宜泄不宜补，多接触喜用神相关的颜色、方位、行业。'
      : strongWeak === '身弱'
      ? '宜补不宜泄，多接触生扶日主的颜色、方位、行业。'
      : '五行平衡，保持现状，注意各方面的均衡发展。'
  };
}

// 完整八字排盘
export function calculateBazi(
  birthDate: Date,
  birthHour: number
): BaziData {
  const fourPillars = calculateFourPillars(birthDate, birthHour);
  const dayMaster = fourPillars.day.stem;
  const fiveElements = calculateFiveElements(fourPillars);
  const strongWeak = judgeStrongWeak(dayMaster, fiveElements);
  const { favorable, unfavorable } = determineFavorableElements(dayMaster, strongWeak);
  const analysis = getBaziAnalysis(dayMaster, fiveElements, strongWeak, favorable);
  
  // 计算十神
  const tenGods: TenGod[] = [];
  const stems = [fourPillars.year.stem, fourPillars.month.stem, fourPillars.hour.stem];
  for (const stem of stems) {
    tenGods.push(getTenGod(dayMaster, stem));
  }
  
  return {
    fourPillars,
    dayMaster,
    fiveElements,
    tenGods,
    strongWeak,
    favorableElements: favorable,
    unfavorableElements: unfavorable,
    analysis
  };
}

// 生成八字报告
export function generateBaziReport(bazi: BaziData): string {
  const { fourPillars, dayMaster, fiveElements, strongWeak, favorableElements, analysis } = bazi;
  
  let report = '# 八字命理分析报告\n\n';
  
  // 四柱排盘
  report += '## 四柱排盘\n\n';
  report += `| 年柱 | 月柱 | 日柱 | 时柱 |\n`;
  report += `|------|------|------|------|\n`;
  report += `| ${fourPillars.year.stem}${fourPillars.year.branch} | ${fourPillars.month.stem}${fourPillars.month.branch} | ${fourPillars.day.stem}${fourPillars.day.branch} | ${fourPillars.hour.stem}${fourPillars.hour.branch} |\n\n`;
  
  // 日主分析
  report += `## 日主分析\n\n`;
  report += `日主：**${dayMaster}**（${STEM_ELEMENTS[dayMaster]}）\n`;
  report += `身强身弱：**${strongWeak}**\n\n`;
  
  // 五行分析
  report += '## 五行分布\n\n';
  for (const [element, count] of Object.entries(fiveElements)) {
    const percentage = Math.round((count / 10) * 100);
    const bar = '█'.repeat(Math.round(percentage / 10));
    report += `${element}：${bar} ${percentage}%\n`;
  }
  report += '\n';
  
  // 喜用神
  if (favorableElements.length > 0) {
    report += `## 喜用神\n\n`;
    report += `喜用五行：**${favorableElements.join('、')}**\n\n`;
  }
  
  // 详细分析
  report += '## 详细分析\n\n';
  report += `### 性格特点\n${analysis.personality}\n\n`;
  report += `### 事业方向\n${analysis.career}\n\n`;
  report += `### 财运分析\n${analysis.wealth}\n\n`;
  report += `### 感情运势\n${analysis.love}\n\n`;
  report += `### 健康建议\n${analysis.health}\n\n`;
  report += `### 开运建议\n${analysis.advice}\n`;
  
  return report;
}
