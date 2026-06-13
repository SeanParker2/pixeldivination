/**
 * 数字命理学专业计算库
 * 包含生命灵数、天赋数、灵魂渴望数等完整计算
 */

// 数字含义
export const NUMBER_MEANINGS: Record<number, {
  name: string;
  keywords: string[];
  personality: string;
  talent: string;
  challenge: string;
  lifePath: string;
}> = {
  1: {
    name: '开创者',
    keywords: ['独立', '领导', '创新', '自信', '原创'],
    personality: '你是一个天生的领导者，独立自主，有强烈的自我意识。你善于开创新事物，有很强的行动力和决断力。但有时可能过于自我中心，需要学会倾听他人。',
    talent: '领导才能、创新能力、独立工作、解决问题',
    challenge: '学会合作、避免独断、培养耐心',
    lifePath: '你的人生课题是学会独立与合作的平衡，在引领他人的同时也要尊重他人的意见。'
  },
  2: {
    name: '协调者',
    keywords: ['合作', '和平', '敏感', '外交', '平衡'],
    personality: '你是一个天生的协调者，善于处理人际关系，有很强的同理心。你追求和谐，善于倾听和调解。但有时可能过于依赖他人，需要增强自信。',
    talent: '外交能力、团队合作、调解纠纷、细致耐心',
    challenge: '增强自信、避免过度依赖、学会独处',
    lifePath: '你的人生课题是学会在合作中保持自我，在帮助他人的同时也要照顾好自己。'
  },
  3: {
    name: '表达者',
    keywords: ['创意', '表达', '社交', '乐观', '艺术'],
    personality: '你是一个天生的表达者，富有创造力和艺术天赋。你善于沟通，乐观开朗，能给周围的人带来快乐。但有时可能过于浮躁，需要专注和坚持。',
    talent: '艺术创作、沟通表达、社交能力、创意思维',
    challenge: '专注坚持、避免分散、深入发展',
    lifePath: '你的人生课题是学会将创意转化为现实，在表达自我的同时也要注重实际行动。'
  },
  4: {
    name: '建设者',
    keywords: ['稳定', '秩序', '勤劳', '实际', '责任'],
    personality: '你是一个天生的建设者，踏实稳重，有很强的责任感。你善于规划和执行，能够建立稳固的基础。但有时可能过于固执，需要学会变通。',
    talent: '组织能力、执行力、耐心细致、建立秩序',
    challenge: '学会变通、避免过于保守、接受变化',
    lifePath: '你的人生课题是学会在稳定中寻求发展，在坚持原则的同时也要保持灵活性。'
  },
  5: {
    name: '自由者',
    keywords: ['自由', '变化', '冒险', '好奇', '适应'],
    personality: '你是一个天生的自由者，热爱冒险和变化，有很强的适应能力。你好奇心强，喜欢探索新事物。但有时可能过于冲动，需要学会稳定。',
    talent: '适应能力、多才多艺、沟通能力、探索精神',
    challenge: '学会专注、避免冲动、建立稳定',
    lifePath: '你的人生课题是学会在自由中找到方向，在变化中保持内心的平衡。'
  },
  6: {
    name: '照顾者',
    keywords: ['责任', '关爱', '家庭', '和谐', '服务'],
    personality: '你是一个天生的照顾者，有很强的责任感和爱心。你善于照顾他人，重视家庭和和谐。但有时可能过度付出，需要学会设定界限。',
    talent: '关怀能力、责任感、调解能力、创造和谐',
    challenge: '学会说不、避免过度付出、照顾自己',
    lifePath: '你的人生课题是学会在照顾他人的同时也要关爱自己，在付出中保持平衡。'
  },
  7: {
    name: '探索者',
    keywords: ['智慧', '内省', '分析', '直觉', '精神'],
    personality: '你是一个天生的探索者，有很强的分析能力和直觉。你喜欢深入思考，追求真理和智慧。但有时可能过于孤僻，需要学会与人连接。',
    talent: '分析能力、直觉洞察、研究精神、独立思考',
    challenge: '学会社交、避免孤僻、分享智慧',
    lifePath: '你的人生课题是学会在独处中获得智慧，在探索中与他人分享你的发现。'
  },
  8: {
    name: '成就者',
    keywords: ['成功', '权力', '财富', '执行', '成就'],
    personality: '你是一个天生的成就者，有很强的事业心和执行力。你善于管理，追求成功和物质成就。但有时可能过于功利，需要关注精神层面。',
    talent: '管理能力、商业头脑、执行力、领导力',
    challenge: '关注精神生活、避免功利、保持平衡',
    lifePath: '你的人生课题是学会在追求成功的同时也要关注内心的成长，在物质与精神之间找到平衡。'
  },
  9: {
    name: '博爱者',
    keywords: ['博爱', '理想', '奉献', '智慧', '完成'],
    personality: '你是一个天生的博爱者，有很强的理想主义和奉献精神。你关注人类福祉，有大爱精神。但有时可能过于理想化，需要脚踏实地。',
    talent: '博爱精神、理想主义、艺术才能、奉献精神',
    challenge: '脚踏实地、避免理想化、照顾自己',
    lifePath: '你的人生课题是学会将理想转化为行动，在奉献中也要照顾好自己的需求。'
  }
};

// 主命数（生命灵数）
export function getLifePathNumber(birthDate: string): number {
  // 移除所有非数字字符
  const digits = birthDate.replace(/\D/g, '');
  
  // 将所有数字相加
  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
  
  // 如果结果大于9，继续相加（11和22是主命数，不需要再加）
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return sum;
}

// 天赋数（出生日期中的重复数字）
export function getTalentNumbers(birthDate: string): number[] {
  const digits = birthDate.replace(/\D/g, '');
  const counts: Record<number, number> = {};
  
  for (const d of digits) {
    const num = parseInt(d);
    counts[num] = (counts[num] || 0) + 1;
  }
  
  return Object.entries(counts)
    .filter(([_, count]) => count >= 2)
    .map(([num]) => parseInt(num));
}

// 灵魂渴望数（元音字母对应的数字）
export function getSoulUrgeNumber(name: string): number {
  const vowels = 'aeiouAEIOU';
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  const vowelSum = name.toLowerCase()
    .split('')
    .filter(c => vowels.includes(c))
    .reduce((sum, c) => sum + (letterValues[c] || 0), 0);
  
  let result = vowelSum;
  while (result > 9 && result !== 11 && result !== 22) {
    result = result.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return result;
}

// 人格数（辅音字母对应的数字）
export function getPersonalityNumber(name: string): number {
  const vowels = 'aeiouAEIOU';
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  const consonantSum = name.toLowerCase()
    .split('')
    .filter(c => /[a-z]/.test(c) && !vowels.includes(c))
    .reduce((sum, c) => sum + (letterValues[c] || 0), 0);
  
  let result = consonantSum;
  while (result > 9 && result !== 11 && result !== 22) {
    result = result.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return result;
}

// 命运数（名字所有字母对应的数字之和）
export function getDestinyNumber(name: string): number {
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  const totalSum = name.toLowerCase()
    .split('')
    .filter(c => /[a-z]/.test(c))
    .reduce((sum, c) => sum + (letterValues[c] || 0), 0);
  
  let result = totalSum;
  while (result > 9 && result !== 11 && result !== 22) {
    result = result.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return result;
}

// 生日数（出生日期的日数）
export function getBirthdayNumber(birthDate: string): number {
  const day = parseInt(birthDate.split('-')[2] || '1');
  
  let result = day;
  while (result > 9 && result !== 11 && result !== 22) {
    result = result.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return result;
}

// 挑战数（人生中的挑战）
export function getChallengeNumbers(birthDate: string): number[] {
  const parts = birthDate.split('-');
  const month = parseInt(parts[1] || '1');
  const day = parseInt(parts[2] || '1');
  const year = parts[0] ? parseInt(parts[0]) : 2000;
  
  // 简化月份、日期、年份为个位数
  const reduceNumber = (num: number): number => {
    let result = num;
    while (result > 9) {
      result = result.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
    }
    return result;
  };
  
  const monthNum = reduceNumber(month);
  const dayNum = reduceNumber(day);
  const yearNum = reduceNumber(year);
  
  // 第一挑战数 = |月份 - 日期|
  const challenge1 = Math.abs(monthNum - dayNum);
  
  // 第二挑战数 = |日期 - 年份|
  const challenge2 = Math.abs(dayNum - yearNum);
  
  // 第三挑战数 = |第一挑战 - 第二挑战|
  const challenge3 = Math.abs(challenge1 - challenge2);
  
  // 第四挑战数 = |月份 - 年份|
  const challenge4 = Math.abs(monthNum - yearNum);
  
  return [challenge1, challenge2, challenge3, challenge4];
}

// 周期数（人生不同阶段的周期）
export function getCycles(birthDate: string): { first: number; second: number; third: number } {
  const lifePath = getLifePathNumber(birthDate);
  
  // 第一周期（0-27岁）= 36 - 生命灵数
  // 第二周期（28-54岁）= 生命灵数
  // 第三周期（55岁以后）= 第一周期 + 第二周期
  const first = 36 - lifePath;
  const second = lifePath;
  const third = first + second;
  
  return { first, second, third };
}

// 完整数字命理分析
export interface NumerologyProfile {
  lifePathNumber: number;
  talentNumbers: number[];
  soulUrgeNumber: number;
  personalityNumber: number;
  destinyNumber: number;
  birthdayNumber: number;
  challengeNumbers: number[];
  cycles: { first: number; second: number; third: number };
  lifePathMeaning: typeof NUMBER_MEANINGS[1];
}

export function calculateNumerology(
  birthDate: string,
  fullName: string
): NumerologyProfile {
  const lifePathNumber = getLifePathNumber(birthDate);
  const talentNumbers = getTalentNumbers(birthDate);
  const soulUrgeNumber = getSoulUrgeNumber(fullName);
  const personalityNumber = getPersonalityNumber(fullName);
  const destinyNumber = getDestinyNumber(fullName);
  const birthdayNumber = getBirthdayNumber(birthDate);
  const challengeNumbers = getChallengeNumbers(birthDate);
  const cycles = getCycles(birthDate);
  
  // 获取主命数的含义（处理11和22）
  const meaningNumber = lifePathNumber === 11 ? 2 : lifePathNumber === 22 ? 4 : lifePathNumber;
  const lifePathMeaning = NUMBER_MEANINGS[meaningNumber];
  
  return {
    lifePathNumber,
    talentNumbers,
    soulUrgeNumber,
    personalityNumber,
    destinyNumber,
    birthdayNumber,
    challengeNumbers,
    cycles,
    lifePathMeaning
  };
}

// 生成数字命理报告
export function generateNumerologyReport(profile: NumerologyProfile): string {
  const { 
    lifePathNumber, talentNumbers, soulUrgeNumber, personalityNumber, 
    destinyNumber, birthdayNumber, challengeNumbers, cycles, lifePathMeaning 
  } = profile;
  
  let report = '# 数字命理分析报告\n\n';
  
  // 主命数
  report += `## 生命灵数：${lifePathNumber}\n\n`;
  report += `**${lifePathMeaning.name}**\n\n`;
  report += `关键词：${lifePathMeaning.keywords.join('、')}\n\n`;
  report += `性格特点：${lifePathMeaning.personality}\n\n`;
  report += `天赋才能：${lifePathMeaning.talent}\n\n`;
  report += `人生挑战：${lifePathMeaning.challenge}\n\n`;
  report += `人生课题：${lifePathMeaning.lifePath}\n\n`;
  
  // 天赋数
  if (talentNumbers.length > 0) {
    report += `## 天赋数：${talentNumbers.join(', ')}\n\n`;
    report += '你拥有这些数字的天赋能量，在相关领域有天然的优势。\n\n';
  }
  
  // 其他核心数字
  report += '## 核心数字\n\n';
  report += `| 数字类型 | 数字 | 含义 |\n`;
  report += `|----------|------|------|\n`;
  report += `| 生命灵数 | ${lifePathNumber} | 人生方向和使命 |\n`;
  report += `| 灵魂渴望数 | ${soulUrgeNumber} | 内心深处的渴望 |\n`;
  report += `| 人格数 | ${personalityNumber} | 外在表现的形象 |\n`;
  report += `| 命运数 | ${destinyNumber} | 人生目标和成就 |\n`;
  report += `| 生日数 | ${birthdayNumber} | 天生的才能 |\n\n`;
  
  // 挑战数
  report += '## 人生挑战\n\n';
  report += `你人生中需要面对的主要挑战数字：${challengeNumbers.join(', ')}\n\n`;
  report += '挑战数字代表你人生中需要克服的困难和需要学习的课题。\n\n';
  
  // 周期
  report += '## 人生周期\n\n';
  report += `| 周期 | 年龄段 | 数字 | 主题 |\n`;
  report += `|------|--------|------|------|\n`;
  report += `| 第一周期 | 0-${cycles.first}岁 | ${cycles.first} | 成长和学习 |\n`;
  report += `| 第二周期 | ${cycles.first + 1}-${cycles.second}岁 | ${cycles.second} | 发展和成就 |\n`;
  report += `| 第三周期 | ${cycles.second + 1}岁以后 | ${cycles.third} | 成熟和智慧 |\n\n`;
  
  // 开运建议
  report += '## 开运建议\n\n';
  report += `1. 你的幸运数字是 ${lifePathNumber}，可以在重要场合使用\n`;
  report += `2. 关注与数字 ${lifePathNumber} 相关的事物和机会\n`;
  report += `3. 发挥你的天赋才能：${lifePathMeaning.talent}\n`;
  report += `4. 注意克服人生挑战：${lifePathMeaning.challenge}\n`;
  
  return report;
}
