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

// 计算人生周期（三大周期）
function getLifeCycles(birthDate: string): { first: { number: number; period: string; meaning: string }; second: { number: number; period: string; meaning: string }; third: { number: number; period: string; meaning: string } } {
  const parts = birthDate.split('-');
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const year = parseInt(parts[0]);

  const firstCycle = reduceNumber(month);
  const secondCycle = reduceNumber(day);
  const thirdCycle = reduceNumber(year);

  const getMeaning = (num: number) => {
    const meanings: Record<number, string> = {
      1: '独立自主，开创事业',
      2: '合作协调，建立关系',
      3: '创意表达，社交活跃',
      4: '脚踏实地，建立基础',
      5: '变化自由，探索世界',
      6: '责任关爱，家庭为重',
      7: '内省智慧，精神成长',
      8: '事业成就，财富积累',
      9: '博爱奉献，完成使命',
    };
    return meanings[num] || '平稳发展';
  };

  return {
    first: { number: firstCycle, period: '出生-30岁', meaning: getMeaning(firstCycle) },
    second: { number: secondCycle, period: '31-60岁', meaning: getMeaning(secondCycle) },
    third: { number: thirdCycle, period: '61岁以后', meaning: getMeaning(thirdCycle) },
  };
}

// 计算生日数字
function getBirthdayNumber(birthDate: string): number {
  const parts = birthDate.split('-');
  const day = parseInt(parts[2]);
  return reduceNumber(day);
}

// 计算挑战数字
function getChallengeNumbers(birthDate: string): { first: number; second: number; third: number; fourth: number } {
  const parts = birthDate.split('-');
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const year = parseInt(parts[0]);

  const monthReduced = reduceNumber(month);
  const dayReduced = reduceNumber(day);
  const yearReduced = reduceNumber(year);

  return {
    first: Math.abs(monthReduced - dayReduced),
    second: Math.abs(dayReduced - yearReduced),
    third: Math.abs(reduceNumber(monthReduced - dayReduced) - reduceNumber(dayReduced - yearReduced)),
    fourth: Math.abs(monthReduced - yearReduced),
  };
}

// 计算巅峰数字（Pinnacles）
function getPinnacles(birthDate: string): { first: number; second: number; third: number; fourth: number } {
  const lifePath = getLifePathNumber(birthDate);
  const parts = birthDate.split('-');
  const month = parseInt(parts[1]);
  const day = parseInt(parts[2]);
  const year = parseInt(parts[0]);

  const monthReduced = reduceNumber(month);
  const dayReduced = reduceNumber(day);
  const yearReduced = reduceNumber(year);

  return {
    first: reduceNumber(monthReduced + dayReduced),
    second: reduceNumber(dayReduced + yearReduced),
    third: reduceNumber(reduceNumber(monthReduced + dayReduced) + reduceNumber(dayReduced + yearReduced)),
    fourth: reduceNumber(monthReduced + yearReduced),
  };
}

// 计算成熟数字
function getMaturityNumber(lifePath: number, birthDate: string): number {
  const parts = birthDate.split('-');
  const year = parseInt(parts[0]);
  const yearReduced = reduceNumber(year);
  return reduceNumber(lifePath + yearReduced);
}

// 辅助函数：数字简化
function reduceNumber(num: number): number {
  if (num === 11 || num === 22) return num;
  while (num > 9) {
    num = num.toString().split('').reduce((acc, d) => acc + parseInt(d), 0);
  }
  return Math.abs(num);
}

// 完整数字命理计算（专业版）
export function calculateNumerology(birthDate: string, fullName?: string) {
  const lifePathNumber = getLifePathNumber(birthDate);
  const talentNumbers = getTalentNumbers(birthDate);
  const soulUrgeNumber = fullName ? getSoulUrgeNumber(fullName) : null;
  const personalityNumber = fullName ? getPersonalityNumber(fullName) : null;
  const birthdayNumber = getBirthdayNumber(birthDate);
  const lifeCycles = getLifeCycles(birthDate);
  const challengeNumbers = getChallengeNumbers(birthDate);
  const pinnacles = getPinnacles(birthDate);
  const maturityNumber = getMaturityNumber(lifePathNumber, birthDate);

  const meaningNumber = lifePathNumber === 11 ? 2 : lifePathNumber === 22 ? 4 : lifePathNumber;
  const meaning = NUMBER_MEANINGS[meaningNumber] || NUMBER_MEANINGS[1];

  return {
    lifePathNumber,
    talentNumbers,
    soulUrgeNumber,
    personalityNumber,
    birthdayNumber,
    lifeCycles,
    challengeNumbers,
    pinnacles,
    maturityNumber,
    meaning
  };
}

// 数字详细含义数据库
const NUMBER_DETAILED_MEANINGS: Record<number, {
  element: string;
  planet: string;
  tarot: string;
  strengths: string[];
  challenges: string[];
  career: string[];
  relationships: string;
  health: string;
  spiritual: string;
}> = {
  1: {
    element: '火', planet: '太阳', tarot: '魔术师',
    strengths: ['领导力', '独立性', '创造力', '决断力', '原创性'],
    challenges: ['自我中心', '固执', '孤独感', '过于强势'],
    career: ['企业家', '管理者', '发明家', '独立工作者', '领导者'],
    relationships: '在关系中需要学会平衡独立与亲密，尊重伴侣的独立性。',
    health: '注意心脏、眼睛和血液循环。需要学会放松，避免过度劳累。',
    spiritual: '学习谦逊和服务他人，从"我"走向"我们"。'
  },
  2: {
    element: '水', planet: '月亮', tarot: '女祭司',
    strengths: ['合作能力', '敏感性', '耐心', '外交能力', '直觉力'],
    challenges: ['过度敏感', '依赖性', '犹豫不决', '缺乏自信'],
    career: ['咨询师', '调解员', '艺术家', '护士', '教师'],
    relationships: '天生的合作伙伴，在关系中寻求和谐与平衡。需要学会表达自己的需求。',
    health: '注意情绪健康和消化系统。需要学会管理压力和焦虑。',
    spiritual: '学习在帮助他人的同时保持自我界限。'
  },
  3: {
    element: '火', planet: '木星', tarot: '女皇',
    strengths: ['创造力', '表达能力', '乐观', '社交能力', '艺术天赋'],
    challenges: ['注意力分散', '表面化', '情绪波动', '逃避现实'],
    career: ['艺术家', '作家', '演员', '设计师', '公关'],
    relationships: '在关系中带来欢乐和创意，但需要学会深入和坚持。',
    health: '注意神经系统和呼吸系统。需要找到情绪表达的健康方式。',
    spiritual: '学习专注和深度，将创造力用于有意义的事业。'
  },
  4: {
    element: '土', planet: '天王星', tarot: '皇帝',
    strengths: ['稳定性', '组织能力', '可靠性', '耐心', '务实'],
    challenges: ['固执', '缺乏灵活性', '过于保守', '工作狂'],
    career: ['工程师', '会计师', '建筑师', '管理者', '技术专家'],
    relationships: '在关系中提供稳定和安全感，但需要学会表达情感。',
    health: '注意骨骼、关节和皮肤。需要学会放松和享受生活。',
    spiritual: '学习灵活变通，在秩序中找到创造力。'
  },
  5: {
    element: '风', planet: '水星', tarot: '教皇',
    strengths: ['适应力', '好奇心', '自由精神', '多才多艺', '冒险精神'],
    challenges: ['不安定', '缺乏耐心', '逃避承诺', '过度放纵'],
    career: ['旅行者', '记者', '销售', '自由职业者', '探险家'],
    relationships: '在关系中需要自由和空间，学会在自由与承诺之间平衡。',
    health: '注意神经系统和呼吸系统。需要规律的生活节奏。',
    spiritual: '学习在变化中找到内在的稳定和中心。'
  },
  6: {
    element: '土', planet: '金星', tarot: '恋人',
    strengths: ['责任感', '爱心', '关怀他人', '审美能力', '和谐感'],
    challenges: ['过度操心', '控制欲', '自我牺牲', '完美主义'],
    career: ['教师', '医生', '设计师', '咨询师', '服务行业'],
    relationships: '天生的照顾者，在关系中寻求深度和承诺。需要学会照顾自己。',
    health: '注意喉咙和甲状腺。需要学会设定界限，避免过度付出。',
    spiritual: '学习无条件的爱，同时保持健康的自我界限。'
  },
  7: {
    element: '水', planet: '海王星', tarot: '战车',
    strengths: ['分析能力', '直觉力', '智慧', '内省', '精神追求'],
    challenges: ['孤独', '过度分析', '不信任他人', '逃避现实'],
    career: ['研究者', '科学家', '哲学家', '灵性导师', '分析师'],
    relationships: '在关系中需要深度的精神连接，学会信任和开放。',
    health: '注意心理健康和免疫系统。需要平衡独处和社交。',
    spiritual: '学习信任和开放，在物质世界中找到精神意义。'
  },
  8: {
    element: '土', planet: '土星', tarot: '力量',
    strengths: ['商业头脑', '组织能力', '权威性', '执行力', '财富意识'],
    challenges: ['工作狂', '控制欲', '物质主义', '忽视情感'],
    career: ['企业家', '银行家', '律师', '管理者', '政治家'],
    relationships: '在关系中需要学会平衡事业与家庭，表达情感。',
    health: '注意骨骼、牙齿和关节。需要学会放松和享受生活。',
    spiritual: '学习用权力服务他人，物质成功服务于更高目标。'
  },
  9: {
    element: '火', planet: '火星', tarot: '隐士',
    strengths: ['同情心', '理想主义', '创造力', '智慧', '服务精神'],
    challenges: ['过度理想化', '不切实际', '情绪波动', '自我牺牲'],
    career: ['慈善家', '艺术家', '教师', '治疗师', '社会工作者'],
    relationships: '在关系中寻求深度和意义，学会在爱中保持自我。',
    health: '注意血液循环和情绪健康。需要找到情绪释放的方式。',
    spiritual: '学习放手和完成，在服务中找到自我实现。'
  },
};

// 生成数字命理报告（专业版）
export function generateNumerologyReport(data: ReturnType<typeof calculateNumerology>) {
  let report = '# 数字命理专业分析报告\n\n';

  // 生命灵数 - 核心数字
  report += `## 🌟 生命灵数：${data.lifePathNumber}\n\n`;
  report += `**${data.meaning.name}**\n\n`;
  report += `**核心关键词**：${data.meaning.keywords.join('、')}\n\n`;
  report += `**性格特点**：${data.meaning.personality}\n\n`;
  report += `**人生课题**：${data.meaning.lifePath}\n\n`;

  // 生日数字
  if (data.birthdayNumber) {
    report += `## 🎂 生日数字：${data.birthdayNumber}\n\n`;
    report += `生日数字代表你的天赋才能和与生俱来的能力。\n\n`;
  }

  // 详细解读
  const detailed = NUMBER_DETAILED_MEANINGS[data.lifePathNumber];
  if (detailed) {
    report += `### 详细解读\n\n`;
    report += `**元素属性**：${detailed.element}\n`;
    report += `**守护行星**：${detailed.planet}\n`;
    report += `**对应塔罗**：${detailed.tarot}\n\n`;

    report += `**核心优势**：\n`;
    for (const strength of detailed.strengths) {
      report += `- ${strength}\n`;
    }
    report += '\n';

    report += `**需要克服的挑战**：\n`;
    for (const challenge of detailed.challenges) {
      report += `- ${challenge}\n`;
    }
    report += '\n';

    report += `**适合的职业方向**：\n`;
    report += detailed.career.join('、') + '\n\n';

    report += `**感情关系**：${detailed.relationships}\n\n`;
    report += `**健康提示**：${detailed.health}\n\n`;
    report += `**灵性成长**：${detailed.spiritual}\n\n`;
  }

  // 天赋数分析
  if (data.talentNumbers.length > 0) {
    report += `## 🎯 天赋数：${data.talentNumbers.join('、')}\n\n`;
    report += '天赋数代表你与生俱来的优势和潜能：\n\n';
    for (const talent of data.talentNumbers) {
      const talentMeaning = NUMBER_DETAILED_MEANINGS[talent];
      if (talentMeaning) {
        report += `- **数字 ${talent}**：${talentMeaning.strengths.slice(0, 3).join('、')}\n`;
      }
    }
    report += '\n';
  }

  // 灵魂渴望数
  if (data.soulUrgeNumber) {
    report += `## 💖 灵魂渴望数：${data.soulUrgeNumber}\n\n`;
    report += '灵魂渴望数代表你内心深处的渴望和动机，是你真正的内在驱动力。\n\n';
    const soulMeaning = NUMBER_DETAILED_MEANINGS[data.soulUrgeNumber];
    if (soulMeaning) {
      report += `**内心渴望**：${soulMeaning.strengths[0]}和${soulMeaning.strengths[1]}\n\n`;
      report += `**需要注意**：${soulMeaning.challenges[0]}\n\n`;
    }
  }

  // 人格数
  if (data.personalityNumber) {
    report += `## 🎭 人格数：${data.personalityNumber}\n\n`;
    report += '人格数代表你外在表现的形象和他人对你的印象。\n\n';
    const personalityMeaning = NUMBER_DETAILED_MEANINGS[data.personalityNumber];
    if (personalityMeaning) {
      report += `**外在形象**：${personalityMeaning.strengths[0]}、${personalityMeaning.strengths[1]}\n\n`;
      report += `**他人印象**：你给人${personalityMeaning.strengths[2] || personalityMeaning.strengths[0]}的感觉。\n\n`;
    }
  }

  // 人生周期
  if (data.lifeCycles) {
    report += `## 📅 人生三大周期\n\n`;
    report += `| 周期 | 年龄段 | 主导数字 | 主题 |\n`;
    report += `|------|--------|----------|------|\n`;
    report += `| 第一周期 | ${data.lifeCycles.first.period} | ${data.lifeCycles.first.number} | ${data.lifeCycles.first.meaning} |\n`;
    report += `| 第二周期 | ${data.lifeCycles.second.period} | ${data.lifeCycles.second.number} | ${data.lifeCycles.second.meaning} |\n`;
    report += `| 第三周期 | ${data.lifeCycles.third.period} | ${data.lifeCycles.third.number} | ${data.lifeCycles.third.meaning} |\n\n`;
    report += `人生周期揭示了你生命中不同阶段的主要能量和课题。\n\n`;
  }

  // 挑战数字
  if (data.challengeNumbers) {
    report += `## ⚠️ 人生挑战\n\n`;
    report += `| 挑战 | 年龄段 | 数字 | 含义 |\n`;
    report += `|------|--------|------|------|\n`;
    report += `| 第一挑战 | 出生-30岁 | ${data.challengeNumbers.first} | ${getChallengeMeaning(data.challengeNumbers.first)} |\n`;
    report += `| 第二挑战 | 31-60岁 | ${data.challengeNumbers.second} | ${getChallengeMeaning(data.challengeNumbers.second)} |\n`;
    report += `| 第三挑战 | 61岁以后 | ${data.challengeNumbers.third} | ${getChallengeMeaning(data.challengeNumbers.third)} |\n`;
    report += `| 主要挑战 | 一生 | ${data.challengeNumbers.fourth} | ${getChallengeMeaning(data.challengeNumbers.fourth)} |\n\n`;
    report += `挑战数字揭示了你需要克服的困难和障碍。\n\n`;
  }

  // 巅峰数字
  if (data.pinnacles) {
    report += `## 🏔️ 人生巅峰\n\n`;
    report += `| 巅峰 | 年龄段 | 数字 | 含义 |\n`;
    report += `|------|--------|------|------|\n`;
    report += `| 第一巅峰 | 出生-30岁 | ${data.pinnacles.first} | ${getPinnacleMeaning(data.pinnacles.first)} |\n`;
    report += `| 第二巅峰 | 31-60岁 | ${data.pinnacles.second} | ${getPinnacleMeaning(data.pinnacles.second)} |\n`;
    report += `| 第三巅峰 | 61岁以后 | ${data.pinnacles.third} | ${getPinnacleMeaning(data.pinnacles.third)} |\n`;
    report += `| 主要巅峰 | 一生 | ${data.pinnacles.fourth} | ${getPinnacleMeaning(data.pinnacles.fourth)} |\n\n`;
    report += `巅峰数字揭示了你人生中最辉煌的时期和机遇。\n\n`;
  }

  // 成熟数字
  if (data.maturityNumber) {
    report += `## 🌳 成熟数字：${data.maturityNumber}\n\n`;
    report += `成熟数字代表你60岁以后的人生方向和精神追求。\n\n`;
    const maturityMeaning = NUMBER_DETAILED_MEANINGS[data.maturityNumber];
    if (maturityMeaning) {
      report += `**成熟期特质**：${maturityMeaning.strengths.slice(0, 3).join('、')}\n\n`;
      report += `**精神追求**：${maturityMeaning.spiritual}\n\n`;
    }
  }

  // 综合建议
  report += `## 💫 综合建议\n\n`;
  report += generateNumerologyAdvice(data);

  return report;
}

// 挑战数字含义
function getChallengeMeaning(num: number): string {
  const meanings: Record<number, string> = {
    0: '无明显挑战，全面发展',
    1: '需要克服自我中心和固执',
    2: '需要克服过度敏感和依赖',
    3: '需要克服注意力分散和表面化',
    4: '需要克服固执和缺乏灵活性',
    5: '需要克服不安定和逃避承诺',
    6: '需要克服过度操心和控制欲',
    7: '需要克服孤独和不信任',
    8: '需要克服工作狂和物质主义',
    9: '需要克服过度理想化和自我牺牲',
  };
  return meanings[num] || '需要平衡发展';
}

// 巅峰数字含义
function getPinnacleMeaning(num: number): string {
  const meanings: Record<number, string> = {
    1: '开创领导，独立自主',
    2: '合作协调，建立关系',
    3: '创意表达，社交活跃',
    4: '脚踏实地，建立基础',
    5: '变化自由，探索世界',
    6: '责任关爱，家庭为重',
    7: '内省智慧，精神成长',
    8: '事业成就，财富积累',
    9: '博爱奉献，完成使命',
    11: '灵性觉醒，直觉敏锐',
    22: '大师数字，伟大成就',
  };
  return meanings[num] || '平稳发展';
}

function generateNumerologyAdvice(data: ReturnType<typeof calculateNumerology>): string {
  let advice = '';

  const lifePath = data.lifePathNumber;

  // 基于生命灵数的综合建议
  if (lifePath === 1 || lifePath === 8) {
    advice += '- 🚀 你有很强的领导潜能，适合在事业上追求卓越。\n';
    advice += '- 💡 学会授权和合作，不要试图独自承担一切。\n\n';
  } else if (lifePath === 2 || lifePath === 6) {
    advice += '- 💕 你天生善于照顾他人，但也要记得照顾自己。\n';
    advice += '- 🎯 学会说"不"，建立健康的界限。\n\n';
  } else if (lifePath === 3 || lifePath === 5) {
    advice += '- 🎨 你有很强的创造力和表达能力，适合从事创意工作。\n';
    advice += '- 📚 学会专注和坚持，将创意转化为成果。\n\n';
  } else if (lifePath === 4 || lifePath === 7) {
    advice += '- 🔬 你有很强的分析和研究能力，适合深入探索。\n';
    advice += '- 🤝 学会信任他人，不要过于孤立自己。\n\n';
  } else if (lifePath === 9) {
    advice += '- 🌍 你有很强的理想主义和服务精神，适合从事公益事业。\n';
    advice += '- 💪 学会在理想与现实之间找到平衡。\n\n';
  }

  advice += '> 🌙 数字命理是一种自我认知的工具。了解自己的数字能量，可以帮助你更好地发挥优势、克服挑战。';

  return advice;
}
