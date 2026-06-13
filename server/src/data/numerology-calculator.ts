/**
 * 数字命理学专业计算库 - 后端使用
 */

// 数字含义
const NUMBER_MEANINGS: Record<number, { name: string; keywords: string[]; personality: string; lifePath: string }> = {
  1: { name: '开创者', keywords: ['独立', '领导', '创新'], personality: '你是一个天生的领导者，独立自主，有强烈的自我意识。', lifePath: '你的人生课题是学会独立与合作的平衡。' },
  2: { name: '协调者', keywords: ['合作', '和平', '敏感'], personality: '你是一个天生的协调者，善于处理人际关系。', lifePath: '你的人生课题是学会在合作中保持自我。' },
  3: { name: '表达者', keywords: ['创意', '表达', '社交'], personality: '你是一个天生的表达者，富有创造力和艺术天赋。', lifePath: '你的人生课题是学会将创意转化为现实。' },
  4: { name: '建设者', keywords: ['稳定', '秩序', '勤劳'], personality: '你是一个天生的建设者，踏实稳重，有很强的责任感。', lifePath: '你的人生课题是学会在稳定中寻求发展。' },
  5: { name: '自由者', keywords: ['自由', '变化', '冒险'], personality: '你是一个天生的自由者，热爱冒险和变化。', lifePath: '你的人生课题是学会在自由中找到方向。' },
  6: { name: '照顾者', keywords: ['责任', '关爱', '家庭'], personality: '你是一个天生的照顾者，有很强的责任感和爱心。', lifePath: '你的人生课题是学会在照顾他人的同时也要关爱自己。' },
  7: { name: '探索者', keywords: ['智慧', '内省', '分析'], personality: '你是一个天生的探索者，有很强的分析能力和直觉。', lifePath: '你的人生课题是学会在独处中获得智慧。' },
  8: { name: '成就者', keywords: ['成功', '权力', '财富'], personality: '你是一个天生的成就者，有很强的事业心和执行力。', lifePath: '你的人生课题是学会在追求成功的同时也要关注内心成长。' },
  9: { name: '博爱者', keywords: ['博爱', '理想', '奉献'], personality: '你是一个天生的博爱者，有很强的理想主义和奉献精神。', lifePath: '你的人生课题是学会将理想转化为行动。' }
};

// 计算生命灵数
function getLifePathNumber(birthDate: string): number {
  const digits = birthDate.replace(/\D/g, '');
  let sum = digits.split('').reduce((acc, d) => acc + parseInt(d), 0);
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return sum;
}

// 计算天赋数
function getTalentNumbers(birthDate: string): number[] {
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

// 计算灵魂渴望数
function getSoulUrgeNumber(name: string): number {
  const vowels = 'aeiouAEIOU元音';
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  let sum = 0;
  for (const c of name.toLowerCase()) {
    if (vowels.includes(c)) {
      sum += letterValues[c] || 0;
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return sum;
}

// 计算人格数
function getPersonalityNumber(name: string): number {
  const vowels = 'aeiouAEIOU';
  const letterValues: Record<string, number> = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };
  
  let sum = 0;
  for (const c of name.toLowerCase()) {
    if (/[a-z]/.test(c) && !vowels.includes(c)) {
      sum += letterValues[c] || 0;
    }
  }
  
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = sum.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  
  return sum;
}

// 完整数字命理计算
export function calculateNumerology(birthDate: string, fullName?: string) {
  const lifePathNumber = getLifePathNumber(birthDate);
  const talentNumbers = getTalentNumbers(birthDate);
  const soulUrgeNumber = fullName ? getSoulUrgeNumber(fullName) : null;
  const personalityNumber = fullName ? getPersonalityNumber(fullName) : null;
  
  const meaningNumber = lifePathNumber === 11 ? 2 : lifePathNumber === 22 ? 4 : lifePathNumber;
  const meaning = NUMBER_MEANINGS[meaningNumber] || NUMBER_MEANINGS[1];
  
  return {
    lifePathNumber,
    talentNumbers,
    soulUrgeNumber,
    personalityNumber,
    meaning
  };
}

// 生成数字命理报告
export function generateNumerologyReport(data: ReturnType<typeof calculateNumerology>) {
  let report = '# 数字命理分析报告\n\n';
  
  report += `## 生命灵数：${data.lifePathNumber}\n\n`;
  report += `**${data.meaning.name}**\n\n`;
  report += `关键词：${data.meaning.keywords.join('、')}\n\n`;
  report += `性格特点：${data.meaning.personality}\n\n`;
  report += `人生课题：${data.meaning.lifePath}\n\n`;
  
  if (data.talentNumbers.length > 0) {
    report += `## 天赋数：${data.talentNumbers.join(', ')}\n\n`;
    report += '你拥有这些数字的天赋能量，在相关领域有天然的优势。\n\n';
  }
  
  if (data.soulUrgeNumber) {
    report += `## 灵魂渴望数：${data.soulUrgeNumber}\n\n`;
    report += '灵魂渴望数代表你内心深处的渴望和动机。\n\n';
  }
  
  if (data.personalityNumber) {
    report += `## 人格数：${data.personalityNumber}\n\n`;
    report += '人格数代表你外在表现的形象和他人对你的印象。\n\n';
  }
  
  return report;
}
