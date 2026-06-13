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

// ==================== 专业级增强功能 ====================

// 纳音五行表（60甲子纳音）
const NAYIN_TABLE: Record<string, { name: string; element: string }> = {
  '甲子': { name: '海中金', element: '金' }, '乙丑': { name: '海中金', element: '金' },
  '丙寅': { name: '炉中火', element: '火' }, '丁卯': { name: '炉中火', element: '火' },
  '戊辰': { name: '大林木', element: '木' }, '己巳': { name: '大林木', element: '木' },
  '庚午': { name: '路旁土', element: '土' }, '辛未': { name: '路旁土', element: '土' },
  '壬申': { name: '剑锋金', element: '金' }, '癸酉': { name: '剑锋金', element: '金' },
  '甲戌': { name: '山头火', element: '火' }, '乙亥': { name: '山头火', element: '火' },
  '丙子': { name: '涧下水', element: '水' }, '丁丑': { name: '涧下水', element: '水' },
  '戊寅': { name: '城头土', element: '土' }, '己卯': { name: '城头土', element: '土' },
  '庚辰': { name: '白蜡金', element: '金' }, '辛巳': { name: '白蜡金', element: '金' },
  '壬午': { name: '杨柳木', element: '木' }, '癸未': { name: '杨柳木', element: '木' },
  '甲申': { name: '泉中水', element: '水' }, '乙酉': { name: '泉中水', element: '水' },
  '丙戌': { name: '屋上土', element: '土' }, '丁亥': { name: '屋上土', element: '土' },
  '戊子': { name: '霹雳火', element: '火' }, '己丑': { name: '霹雳火', element: '火' },
  '庚寅': { name: '松柏木', element: '木' }, '辛卯': { name: '松柏木', element: '木' },
  '壬辰': { name: '长流水', element: '水' }, '癸巳': { name: '长流水', element: '水' },
  '甲午': { name: '沙中金', element: '金' }, '乙未': { name: '沙中金', element: '金' },
  '丙申': { name: '山下火', element: '火' }, '丁酉': { name: '山下火', element: '火' },
  '戊戌': { name: '平地木', element: '木' }, '己亥': { name: '平地木', element: '木' },
  '庚子': { name: '壁上土', element: '土' }, '辛丑': { name: '壁上土', element: '土' },
  '壬寅': { name: '金箔金', element: '金' }, '癸卯': { name: '金箔金', element: '金' },
  '甲辰': { name: '覆灯火', element: '火' }, '乙巳': { name: '覆灯火', element: '火' },
  '丙午': { name: '天河水', element: '水' }, '丁未': { name: '天河水', element: '水' },
  '戊申': { name: '大驿土', element: '土' }, '己酉': { name: '大驿土', element: '土' },
  '庚戌': { name: '钗钏金', element: '金' }, '辛亥': { name: '钗钏金', element: '金' },
  '壬子': { name: '桑柘木', element: '木' }, '癸丑': { name: '桑柘木', element: '木' },
  '甲寅': { name: '大溪水', element: '水' }, '乙卯': { name: '大溪水', element: '水' },
  '丙辰': { name: '沙中土', element: '土' }, '丁巳': { name: '沙中土', element: '土' },
  '戊午': { name: '天上火', element: '火' }, '己未': { name: '天上火', element: '火' },
  '庚申': { name: '石榴木', element: '木' }, '辛酉': { name: '石榴木', element: '木' },
  '壬戌': { name: '大海水', element: '水' }, '癸亥': { name: '大海水', element: '水' },
};

// 获取纳音
function getNaYin(stem: string, branch: string): { name: string; element: string } {
  return NAYIN_TABLE[`${stem}${branch}`] || { name: '未知', element: '未知' };
}

// 十神详解
const TEN_GODS_DETAIL: Record<string, {
  meaning: string;
  personality: string;
  career: string;
  love: string;
  wealth: string;
  health: string;
}> = {
  '比肩': {
    meaning: '与日主相同的天干，代表自我、独立、竞争',
    personality: '独立自主，有竞争意识，喜欢与人合作但也有竞争心。性格坚强，不轻易妥协。',
    career: '适合创业、合伙经营、竞争性行业。有领导才能，但需要学会合作。',
    love: '在感情中追求平等，不喜欢被控制。需要找到能尊重你独立性的伴侣。',
    wealth: '财运靠自己努力，适合通过竞争获得财富。避免与人争财。',
    health: '身体强健，但要注意过度劳累。适合运动和户外活动。'
  },
  '劫财': {
    meaning: '与日主相同但阴阳相反的天干，代表竞争、冲突、破财',
    personality: '果断有魄力，但有时过于冲动。容易与人发生冲突，但也重义气。',
    career: '适合销售、竞争性行业、需要魄力的工作。避免与人合伙。',
    love: '感情中容易有第三者介入，需要专一。避免冲动分手。',
    wealth: '容易破财，需要谨慎理财。避免赌博和高风险投资。',
    health: '注意意外伤害和情绪管理。适合有规律的运动。'
  },
  '食神': {
    meaning: '日主所生的天干，代表才华、享受、口福',
    personality: '聪明有才华，善于表达，有艺术天赋。性格温和，享受生活。',
    career: '适合艺术、教育、餐饮、创意行业。有表演才能。',
    love: '感情中浪漫体贴，善于表达爱意。容易吸引异性。',
    wealth: '财运稳定，适合通过才华赚钱。享受生活但不浪费。',
    health: '注意饮食健康，避免过度享受。适合艺术和创意活动。'
  },
  '伤官': {
    meaning: '日主所生但阴阳相反的天干，代表才华、叛逆、创新',
    personality: '才华横溢但叛逆，不喜束缚，有创新精神。性格直率，有时得罪人。',
    career: '适合自由职业、创意行业、技术研发。不适合传统体制内工作。',
    love: '感情中追求自由，不喜欢被束缚。需要能理解你独立性的伴侣。',
    wealth: '财运波动大，适合通过创新赚钱。避免传统投资方式。',
    health: '注意呼吸系统和皮肤。适合创新性的运动方式。'
  },
  '偏财': {
    meaning: '日主所克的天干，代表意外之财、父亲、社交',
    personality: '慷慨大方，善于交际，有投资眼光。性格开朗，人缘好。',
    career: '适合投资、金融、销售、公关。有商业头脑。',
    love: '感情中慷慨大方，但可能有多个对象。需要专一。',
    wealth: '财运好，适合投资和投机。但要避免贪心。',
    health: '注意肝脏和胆囊健康。适合社交性运动。'
  },
  '正财': {
    meaning: '日主所克但阴阳相反的天干，代表正当收入、妻子、稳定',
    personality: '勤俭持家，脚踏实地，有理财能力。性格稳重，值得信赖。',
    career: '适合财务、会计、管理、稳定行业。有组织能力。',
    love: '感情中忠诚可靠，重视家庭。是值得信赖的伴侣。',
    wealth: '财运稳定，适合稳健理财。通过努力工作获得财富。',
    health: '注意脾胃健康。适合规律的生活方式。'
  },
  '七杀': {
    meaning: '克日主的天干，代表压力、权威、野心',
    personality: '有魄力，有野心，但压力大，容易焦虑。性格刚强，不服输。',
    career: '适合管理、军警、竞争性行业。有领导才能。',
    love: '感情中强势，需要学会温柔。避免控制欲过强。',
    wealth: '财运波动大，适合通过权力获得财富。避免冒险。',
    health: '注意压力管理和意外伤害。适合挑战性运动。'
  },
  '正官': {
    meaning: '克日主但阴阳相反的天干，代表责任、规矩、地位',
    personality: '有责任感，守规矩，有领导才能。性格正直，受人尊重。',
    career: '适合公务员、管理、法律、行政。有组织能力。',
    love: '感情中负责任，重视承诺。是可靠的伴侣。',
    wealth: '财运稳定，适合正当收入。通过地位获得财富。',
    health: '注意骨骼和关节健康。适合规律的生活方式。'
  },
  '偏印': {
    meaning: '生日主的天干，代表偏门学问、灵感、孤独',
    personality: '聪明有悟性，但有时过于自我。有独特的思维方式，喜欢研究。',
    career: '适合研究、技术、自由职业、创意行业。有创新能力。',
    love: '感情中需要精神交流，不喜欢肤浅的关系。需要能理解你思想的伴侣。',
    wealth: '财运不稳定，适合通过独特技能赚钱。避免传统投资。',
    health: '注意心理健康和消化系统。适合冥想和独处。'
  },
  '正印': {
    meaning: '生日主但阴阳相反的天干，代表学问、母亲、贵人',
    personality: '有爱心，有包容心，重视学习和成长。性格温和，受人喜爱。',
    career: '适合教育、文化、公益、服务行业。有教导才能。',
    love: '感情中温柔体贴，重视精神交流。是温暖的伴侣。',
    wealth: '财运稳定，适合通过学问获得财富。有贵人相助。',
    health: '注意消化系统和营养。适合温和的运动方式。'
  },
};

// 计算大运（10年一运）
export function calculateDaYun(birthDate: Date, gender: 'male' | 'female' = 'male') {
  const year = birthDate.getFullYear();
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();

  const yearPillar = getYearPillar(year);
  const monthPillar = getMonthPillar(year, month);

  // 判断顺逆：阳年男顺行，阴年女顺行，否则逆行
  const yearStemIndex = HEAVENLY_STEMS.indexOf(yearPillar.stem);
  const isYangYear = yearStemIndex % 2 === 0;
  const isForward = (isYangYear && gender === 'male') || (!isYangYear && gender === 'female');

  const monthBranchIndex = EARTHLY_BRANCHES.indexOf(monthPillar.branch);
  const monthStemIndex = HEAVENLY_STEMS.indexOf(monthPillar.stem);

  const dayunList = [];
  for (let i = 1; i <= 8; i++) {
    const offset = isForward ? i : -i;
    const newBranchIndex = (monthBranchIndex + offset + 12) % 12;
    const newStemIndex = (monthStemIndex + offset + 10) % 10;
    dayunList.push({
      age: i * 10,
      stem: HEAVENLY_STEMS[newStemIndex < 0 ? newStemIndex + 10 : newStemIndex],
      branch: EARTHLY_BRANCHES[newBranchIndex < 0 ? newBranchIndex + 12 : newBranchIndex],
    });
  }

  return dayunList;
}

// 柱间关系分析
export function analyzePillarRelations(pillars: { year: any; month: any; day: any; hour: any }) {
  const relations: string[] = [];

  // 天干合化
  const stemCombinations: Record<string, { element: string; meaning: string }> = {
    '甲己': { element: '土', meaning: '中正之合，主稳重踏实' },
    '乙庚': { element: '金', meaning: '仁义之合，主果断正义' },
    '丙辛': { element: '水', meaning: '威制之合，主聪明灵活' },
    '丁壬': { element: '木', meaning: '淫匿之合，主情感丰富' },
    '戊癸': { element: '火', meaning: '无情之合，主热情果断' },
  };

  // 检查天干合
  const stems = [pillars.year.stem, pillars.month.stem, pillars.day.stem, pillars.hour.stem];
  for (let i = 0; i < stems.length; i++) {
    for (let j = i + 1; j < stems.length; j++) {
      const pair1 = stems[i] + stems[j];
      const pair2 = stems[j] + stems[i];
      const combo = stemCombinations[pair1] || stemCombinations[pair2];
      if (combo) {
        relations.push(`${stems[i]}${stems[j]}合化${combo.element}：${combo.meaning}`);
      }
    }
  }

  // 地支六合
  const branchCombinations: Record<string, { element: string; meaning: string }> = {
    '子丑': { element: '土', meaning: '合化土，主稳重' },
    '寅亥': { element: '木', meaning: '合化木，主仁慈' },
    '卯戌': { element: '火', meaning: '合化火，主热情' },
    '辰酉': { element: '金', meaning: '合化金，主果断' },
    '巳申': { element: '水', meaning: '合化水，主智慧' },
    '午未': { element: '火', meaning: '合化火，主热情' },
  };

  const branches = [pillars.year.branch, pillars.month.branch, pillars.day.branch, pillars.hour.branch];
  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const pair1 = branches[i] + branches[j];
      const pair2 = branches[j] + branches[i];
      const combo = branchCombinations[pair1] || branchCombinations[pair2];
      if (combo) {
        relations.push(`${branches[i]}${branches[j]}六合：${combo.meaning}`);
      }
    }
  }

  // 地支三合
  const tripleCombinations: Record<string, { element: string; meaning: string }> = {
    '申子辰': { element: '水', meaning: '三合水局，主智慧灵活' },
    '亥卯未': { element: '木', meaning: '三合木局，主仁慈成长' },
    '寅午戌': { element: '火', meaning: '三合火局，主热情行动' },
    '巳酉丑': { element: '金', meaning: '三合金局，主果断正义' },
  };

  for (const [combo, value] of Object.entries(tripleCombinations)) {
    const comboBranches = combo.split('');
    if (comboBranches.every(b => branches.includes(b))) {
      relations.push(`${combo}三合${value.element}局：${value.meaning}`);
    }
  }

  // 地支相冲
  const conflicts: Record<string, string> = {
    '子午': '水火相冲，主情感冲突',
    '丑未': '土土相冲，主固执冲突',
    '寅申': '金木相冲，主决断冲突',
    '卯酉': '金木相冲，主情感冲突',
    '辰戌': '土土相冲，主固执冲突',
    '巳亥': '水火相冲，主智慧冲突',
  };

  for (let i = 0; i < branches.length; i++) {
    for (let j = i + 1; j < branches.length; j++) {
      const pair1 = branches[i] + branches[j];
      const pair2 = branches[j] + branches[i];
      const conflict = conflicts[pair1] || conflicts[pair2];
      if (conflict) {
        relations.push(`${branches[i]}${branches[j]}相冲：${conflict}`);
      }
    }
  }

  return relations;
}

// 获取当前流年
export function getCurrentLiuNian() {
  const now = new Date();
  const year = now.getFullYear();
  return getYearPillar(year);
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

// 生成八字报告（专业版）
export function generateBaziReport(bazi: ReturnType<typeof calculateBazi>) {
  let report = '# 八字命理专业分析报告\n\n';

  // 四柱排盘
  report += '## 📊 四柱排盘\n\n';
  report += `| 柱位 | 天干 | 地支 | 藏干 | 纳音 |\n`;
  report += `|------|------|------|------|------|\n`;

  const pillars = [
    { name: '年柱', stem: bazi.fourPillars.year.stem, branch: bazi.fourPillars.year.branch },
    { name: '月柱', stem: bazi.fourPillars.month.stem, branch: bazi.fourPillars.month.branch },
    { name: '日柱', stem: bazi.fourPillars.day.stem, branch: bazi.fourPillars.day.branch },
    { name: '时柱', stem: bazi.fourPillars.hour.stem, branch: bazi.fourPillars.hour.branch },
  ];

  for (const p of pillars) {
    const nayin = getNaYin(p.stem, p.branch);
    report += `| ${p.name} | ${p.stem} | ${p.branch} | ${getHiddenStemsText(p.branch)} | ${nayin.name} |\n`;
  }
  report += '\n';

  // 纳音分析
  const dayNayin = getNaYin(bazi.fourPillars.day.stem, bazi.fourPillars.day.branch);
  report += `**日柱纳音**：${dayNayin.name}（${dayNayin.element}）\n\n`;
  report += getNaYinMeaning(dayNayin.name);
  report += '\n\n';

  // 日主分析
  report += '## 🎯 日主分析\n\n';
  report += `**日主**：${bazi.dayMaster}（${bazi.dayElement}）\n\n`;
  report += `**身强身弱**：${bazi.strongWeak}\n\n`;

  // 十神分析
  report += '## 🔮 十神分析\n\n';
  report += generateTenGodsAnalysis(bazi);
  report += '\n';

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

  // 柱间关系分析
  report += '## 🔗 柱间关系\n\n';
  const relations = analyzePillarRelations(bazi.fourPillars);
  if (relations.length > 0) {
    for (const relation of relations) {
      report += `- ${relation}\n`;
    }
  } else {
    report += '柱间无明显的合、冲关系，八字较为独立。\n';
  }
  report += '\n';

  // 大运分析
  report += '## 📅 大运分析\n\n';
  report += generateDaYunAnalysis(bazi);

  return report;
}

// 藏干文本
function getHiddenStemsText(branch: string): string {
  const stems = BRANCH_HIDDEN_STEMS[branch] || [];
  return stems.join('、');
}

// 纳音含义
function getNaYinMeaning(nayin: string): string {
  const meanings: Record<string, string> = {
    '海中金': '如深海宝藏，潜力深厚，需要发掘才能展现价值。性格内敛，但一旦爆发，光芒万丈。',
    '炉中火': '如炉中烈火，热情洋溢，有强大的创造力。适合领导和开创事业。',
    '大林木': '如参天大树，正直仁慈，有领导才能。根深叶茂，事业稳固。',
    '路旁土': '如路边之土，平凡但实用。脚踏实地，默默积累，终成大器。',
    '剑锋金': '如锋利宝剑，果断正义，有强大的执行力。适合军警、法律等行业。',
    '山头火': '如山巅之火，高瞻远瞩，有远大理想。但需要脚踏实地才能实现。',
    '涧下水': '如山涧清泉，聪明灵活，有很强的适应力。适合变化多端的行业。',
    '城头土': '如城墙之土，坚固可靠，有很强的保护欲。适合管理和守护。',
    '白蜡金': '如白蜡之金，外表柔弱，内心坚强。有很强的忍耐力。',
    '杨柳木': '如杨柳之木，温柔灵活，有很强的适应力。适合服务和协调行业。',
    '泉中水': '如泉水之水，清澈透明，有很强的直觉力。适合研究和创意行业。',
    '屋上土': '如屋顶之土，高高在上，有很强的责任感。适合管理和领导。',
    '霹雳火': '如霹雳之火，热情果断，有很强的行动力。适合竞争性行业。',
    '松柏木': '如松柏之木，坚韧不拔，有很强的毅力。适合长期发展。',
    '长流水': '如长流之水，源源不断，有很强的持续力。适合稳定发展。',
    '沙中金': '如沙中之金，需要淘洗才能显现价值。有潜力，需要努力发掘。',
    '山下火': '如山下之火，温暖他人，有很强的服务精神。适合服务行业。',
    '平地木': '如平地之木，平凡但实用。脚踏实地，稳步发展。',
    '壁上土': '如壁上之土，有很强的装饰性。适合艺术和设计行业。',
    '金箔金': '如金箔之金，外表华丽，有很强的表现力。适合艺术和表演。',
    '覆灯火': '如灯火之光，照亮他人，有很强的指导性。适合教育和指导。',
    '天河水': '如天河之水，浩瀚无边，有很强的包容性。适合管理和协调。',
    '大驿土': '如驿站之土，连接四方，有很强的沟通能力。适合交通和物流。',
    '钗钏金': '如钗钏之金，精致优雅，有很强的审美力。适合时尚和美容。',
    '桑柘木': '如桑柘之木，实用性强，有很强的生产力。适合农业和制造。',
    '大溪水': '如大溪之水，奔流不息，有很强的进取心。适合开拓和创新。',
    '沙中土': '如沙中之土，平凡但有潜力。需要努力才能展现价值。',
    '天上火': '如天上之火，光明磊落，有很强的领导力。适合管理和领导。',
    '石榴木': '如石榴之木，外表坚硬，内心丰富。有很强的内在力量。',
    '大海水': '如大海之水，包容万物，有很强的包容性。适合管理和协调。',
  };
  return meanings[nayin] || '纳音五行代表先天禀赋，影响性格和命运走向。';
}

// 十神分析
function generateTenGodsAnalysis(bazi: ReturnType<typeof calculateBazi>): string {
  let analysis = '';

  // 分析月令十神
  const monthStem = bazi.fourPillars.month.stem;
  const monthGod = getTenGodRelation(bazi.dayMaster, monthStem);
  analysis += `**月令十神**：${monthGod} — ${TEN_GODS_DETAIL[monthGod]?.meaning || '影响人生主要方向'}\n\n`;

  // 分析日主坐支十神
  const dayBranch = bazi.fourPillars.day.branch;
  const dayBranchElement = BRANCH_ELEMENTS[dayBranch];
  const dayGod = getElementTenGod(bazi.dayElement, dayBranchElement);
  analysis += `**日坐十神**：${dayGod} — ${TEN_GODS_DETAIL[dayGod]?.meaning || '影响配偶和内在性格'}\n\n`;

  // 十神性格分析
  const godDetail = TEN_GODS_DETAIL[monthGod];
  if (godDetail) {
    analysis += `**十神性格**：${godDetail.personality}\n\n`;
    analysis += `**事业方向**：${godDetail.career}\n\n`;
    analysis += `**感情特点**：${godDetail.love}\n\n`;
    analysis += `**财运特点**：${godDetail.wealth}\n\n`;
  }

  return analysis;
}

// 获取十神关系
function getTenGodRelation(dayMaster: string, otherStem: string): string {
  const dayElement = STEM_ELEMENTS[dayMaster];
  const otherElement = STEM_ELEMENTS[otherStem];
  const dayYinYang = HEAVENLY_STEMS.indexOf(dayMaster) % 2;
  const otherYinYang = HEAVENLY_STEMS.indexOf(otherStem) % 2;
  const sameYinYang = dayYinYang === otherYinYang;

  if (dayElement === otherElement) {
    return sameYinYang ? '比肩' : '劫财';
  }

  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  const otherIndex = FIVE_ELEMENTS.indexOf(otherElement);

  // 我生
  if (otherIndex === (dayIndex + 1) % 5) {
    return sameYinYang ? '食神' : '伤官';
  }

  // 我克
  if (otherIndex === (dayIndex + 2) % 5) {
    return sameYinYang ? '偏财' : '正财';
  }

  // 克我
  if (otherIndex === (dayIndex + 3) % 5) {
    return sameYinYang ? '七杀' : '正官';
  }

  // 生我
  if (otherIndex === (dayIndex + 4) % 5) {
    return sameYinYang ? '偏印' : '正印';
  }

  return '未知';
}

// 通过五行关系获取十神
function getElementTenGod(dayElement: string, otherElement: string): string {
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);
  const otherIndex = FIVE_ELEMENTS.indexOf(otherElement);

  if (dayIndex === otherIndex) return '比肩';
  if (otherIndex === (dayIndex + 1) % 5) return '食神';
  if (otherIndex === (dayIndex + 2) % 5) return '偏财';
  if (otherIndex === (dayIndex + 3) % 5) return '七杀';
  if (otherIndex === (dayIndex + 4) % 5) return '偏印';
  return '未知';
}

// 大运分析
function generateDaYunAnalysis(bazi: ReturnType<typeof calculateBazi>): string {
  let analysis = '';

  try {
    const dayun = calculateDaYun(new Date(), 'male');
    analysis += '| 年龄 | 天干 | 地支 | 五行 | 运势特点 |\n';
    analysis += '|------|------|------|------|----------|\n';

    for (const d of dayun.slice(0, 6)) {
      const element = STEM_ELEMENTS[d.stem];
      const meaning = getDaYunMeaning(element, bazi.dayElement, bazi.strongWeak);
      analysis += `| ${d.age}岁 | ${d.stem} | ${d.branch} | ${element} | ${meaning} |\n`;
    }
    analysis += '\n';
    analysis += '> 💡 大运每十年一变，影响人生的主要方向和运势起伏。\n';
  } catch {
    analysis += '大运计算需要更多信息。\n';
  }

  return analysis;
}

// 大运含义
function getDaYunMeaning(dyunElement: string, dayElement: string, strongWeak: string): string {
  const dayIndex = FIVE_ELEMENTS.indexOf(dayElement);

  // 判断大运五行对日主的影响
  if (dyunElement === dayElement) {
    return strongWeak === '身强' ? '竞争压力大' : '得到助力';
  }

  // 我生
  if (FIVE_ELEMENTS.indexOf(dyunElement) === (dayIndex + 1) % 5) {
    return '才华展现期';
  }

  // 我克
  if (FIVE_ELEMENTS.indexOf(dyunElement) === (dayIndex + 2) % 5) {
    return '财运旺盛期';
  }

  // 克我
  if (FIVE_ELEMENTS.indexOf(dyunElement) === (dayIndex + 3) % 5) {
    return '压力挑战期';
  }

  // 生我
  if (FIVE_ELEMENTS.indexOf(dyunElement) === (dayIndex + 4) % 5) {
    return '贵人相助期';
  }

  return '平稳发展';
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
