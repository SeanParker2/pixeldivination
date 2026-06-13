/**
 * 运势分析专业模板库
 * 包含各星座的详细运势解读文案
 */

// 星座运势模板
export const ZODIAC_FORTUNE_TEMPLATES = {
  '白羊座': {
    element: '火',
    ruler: '火星',
    traits: ['热情', '冲动', '勇敢', '直率'],
    today: {
      overall: '今日白羊座的行动力很强，适合推进重要项目。但要注意控制冲动，避免与人发生冲突。保持积极心态，好运自然来。',
      love: '单身的白羊座可能在社交场合遇到心动的人。已有伴者适合安排浪漫约会，增进感情。',
      career: '工作上可能有新的机会出现，但需要仔细评估。与同事合作会更顺利。',
      wealth: '财运平稳，不宜进行大额投资。适合储蓄和稳健理财。',
      health: '精力充沛，适合运动。但要注意保护头部和面部。'
    }
  },
  '金牛座': {
    element: '土',
    ruler: '金星',
    traits: ['稳重', '固执', '务实', '享受'],
    today: {
      overall: '今日金牛座适合处理财务和物质事务。你的耐心和务实会带来好的结果。避免固执己见，保持开放心态。',
      love: '感情稳定，适合与伴侣讨论未来计划。单身者可能通过朋友介绍认识新对象。',
      career: '工作进展稳定，适合处理细节事务。可能有加薪或奖金的机会。',
      wealth: '财运不错，适合投资和理财。可能有意外收入。',
      health: '注意喉咙和颈部健康。适合享受美食，但要控制饮食。'
    }
  },
  '双子座': {
    element: '风',
    ruler: '水星',
    traits: ['聪明', '善变', '好奇', '沟通'],
    today: {
      overall: '今日双子座思维活跃，适合学习和沟通。但要注意专注，避免三心二意。与人交流会带来好运。',
      love: '可能收到暧昧信息或表白。已有伴者适合深入交流，增进了解。',
      career: '适合开会、谈判和创意工作。可能有出差或学习机会。',
      wealth: '可能有小额意外收入。适合短期投资。',
      health: '注意呼吸系统健康。适合进行脑力活动。'
    }
  },
  '巨蟹座': {
    element: '水',
    ruler: '月亮',
    traits: ['敏感', '顾家', '情绪化', '保护'],
    today: {
      overall: '今日巨蟹座情绪敏感，适合处理家庭事务。与家人相处会带来安慰。避免过度情绪化，保持理性。',
      love: '感情中需要更多安全感。与伴侣分享内心感受会增进感情。',
      career: '适合处理与家庭或房产相关的事务。工作中注意情绪管理。',
      wealth: '可能有家庭相关的支出。适合为家人购买礼物。',
      health: '注意消化系统健康。适合在家休息放松。'
    }
  },
  '狮子座': {
    element: '火',
    ruler: '太阳',
    traits: ['自信', '大方', '领导', '戏剧'],
    today: {
      overall: '今日狮子座魅力四射，适合社交和展示才华。你的自信会吸引他人的注意。避免过于自我中心。',
      love: '桃花运旺，可能收到表白或邀请。已有伴者适合安排浪漫活动。',
      career: '适合展示才华和领导能力。可能有晋升或表彰机会。',
      wealth: '可能有社交支出。适合投资自己。',
      health: '注意心脏健康。适合参加户外活动。'
    }
  },
  '处女座': {
    element: '土',
    ruler: '水星',
    traits: ['完美', '细心', '批评', '服务'],
    today: {
      overall: '今日处女座适合处理细节工作和健康事务。你的细心会避免错误。避免过于挑剔，保持宽容。',
      love: '可能对伴侣有更高要求。单身者适合通过工作认识新对象。',
      career: '适合处理数据分析和质量控制工作。可能有健康相关的工作机会。',
      wealth: '适合制定预算和理财计划。避免冲动消费。',
      health: '适合开始健康计划。注意肠胃健康。'
    }
  },
  '天秤座': {
    element: '风',
    ruler: '金星',
    traits: ['优雅', '犹豫', '和谐', '社交'],
    today: {
      overall: '今日天秤座适合社交和合作。你的外交能力会化解矛盾。避免犹豫不决，果断行动。',
      love: '桃花运旺，可能遇到理想对象。已有伴者适合讨论关系问题。',
      career: '适合谈判和合作。可能有艺术或美学相关的工作机会。',
      wealth: '可能有社交支出。适合投资艺术品。',
      health: '注意肾脏健康。适合进行瑜伽或冥想。'
    }
  },
  '天蝎座': {
    element: '水',
    ruler: '冥王星',
    traits: ['神秘', '执着', '洞察', '极端'],
    today: {
      overall: '今日天蝎座洞察力强，适合研究和调查。你的直觉会指引正确方向。避免极端行为，保持平衡。',
      love: '感情深入发展，可能有重要对话。单身者可能遇到神秘对象。',
      career: '适合研究和分析工作。可能有重要发现或突破。',
      wealth: '可能有投资机会。适合长期投资。',
      health: '注意生殖系统健康。适合进行深度放松。'
    }
  },
  '射手座': {
    element: '火',
    ruler: '木星',
    traits: ['乐观', '自由', '冒险', '哲学'],
    today: {
      overall: '今日射手座适合学习和旅行。你的乐观会带来好运。避免过于散漫，保持专注。',
      love: '可能在旅行或学习中遇到心动的人。已有伴者适合一起探索新事物。',
      career: '适合教育、出版或国际事务。可能有出差或学习机会。',
      wealth: '可能有意外收入。适合投资教育。',
      health: '注意肝脏健康。适合户外运动。'
    }
  },
  '摩羯座': {
    element: '土',
    ruler: '土星',
    traits: ['严肃', '责任', '野心', '耐心'],
    today: {
      overall: '今日摩羯座适合处理重要事务和长期规划。你的责任感会得到认可。避免过于严肃，适当放松。',
      love: '感情稳定，适合讨论未来计划。单身者可能通过工作认识新对象。',
      career: '适合处理重要项目和领导工作。可能有晋升机会。',
      wealth: '适合长期投资和储蓄。可能有奖金或加薪。',
      health: '注意骨骼和关节健康。适合进行力量训练。'
    }
  },
  '水瓶座': {
    element: '风',
    ruler: '天王星',
    traits: ['独立', '创新', '叛逆', '人道'],
    today: {
      overall: '今日水瓶座思维独特，适合创新和改革。你的创意会得到认可。避免过于叛逆，保持理性。',
      love: '可能遇到志同道合的人。已有伴者适合讨论共同理想。',
      career: '适合科技和创新工作。可能有突破性想法。',
      wealth: '可能有意外收入。适合投资科技。',
      health: '注意循环系统健康。适合进行团体运动。'
    }
  },
  '双鱼座': {
    element: '水',
    ruler: '海王星',
    traits: ['浪漫', '敏感', '幻想', '同情'],
    today: {
      overall: '今日双鱼座直觉敏锐，适合创意和灵性活动。你的同情心会帮助他人。避免过度幻想，保持现实。',
      love: '浪漫运旺，可能有梦幻般的邂逅。已有伴者适合表达爱意。',
      career: '适合艺术和创意工作。可能有灵感涌现。',
      wealth: '可能有意外收入。适合慈善捐助。',
      health: '注意脚部健康。适合进行冥想或水疗。'
    }
  }
};

// 运势评分模板
export const FORTUNE_SCORE_TEMPLATES = {
  excellent: { min: 90, max: 100, label: '大吉', stars: '★★★★★' },
  good: { min: 70, max: 89, label: '吉', stars: '★★★★☆' },
  normal: { min: 50, max: 69, label: '平', stars: '★★★☆☆' },
  bad: { min: 30, max: 49, label: '凶', stars: '★★☆☆☆' },
  terrible: { min: 0, max: 29, label: '大凶', stars: '★☆☆☆☆' }
};

// 月运势模板
export const MONTHLY_FORTUNE_TEMPLATES = {
  love: {
    high: '本月桃花运旺盛，单身者有望脱单。已有伴者感情升温，适合规划未来。',
    medium: '本月感情平稳，适合维护现有关系。单身者可多参加社交活动。',
    low: '本月感情需要耐心，避免冲动决定。多关注自我成长。'
  },
  career: {
    high: '本月事业运强劲，适合推进重要项目。可能有晋升或加薪机会。',
    medium: '本月工作稳定，适合提升技能。与同事保持良好关系。',
    low: '本月工作可能遇到挑战，保持耐心。避免与上司发生冲突。'
  },
  wealth: {
    high: '本月财运亨通，适合投资理财。可能有意外收入或奖金。',
    medium: '本月财务平稳，适合储蓄。避免大额消费。',
    low: '本月财务需要谨慎，避免投资风险。控制支出。'
  },
  health: {
    high: '本月精力充沛，适合运动健身。注意保持良好作息。',
    medium: '本月健康一般，注意劳逸结合。定期体检。',
    low: '本月注意健康问题，避免过度劳累。及时就医。'
  }
};

// 年运势模板
export const YEARLY_FORTUNE_TEMPLATES = {
  overview: {
    excellent: '今年是你收获的一年，各方面都有显著进步。把握机会，勇往直前。',
    good: '今年运势不错，稳中有进。保持积极心态，好运自然来。',
    normal: '今年运势平稳，适合积累和准备。保持现状，等待时机。',
    challenging: '今年可能遇到一些挑战，但也是成长的机会。保持耐心，坚持到底。'
  },
  keyMonths: {
    spring: '春季是新的开始，适合制定计划和目标。',
    summer: '夏季运势活跃，适合社交和拓展人脉。',
    autumn: '秋季是收获的季节，适合总结和反思。',
    winter: '冬季适合休息和准备，为来年积蓄能量。'
  }
};

// 幸运物推荐
export const LUCKY_ITEMS = {
  colors: {
    '火': ['红色', '橙色', '紫色'],
    '土': ['黄色', '棕色', '米色'],
    '金': ['白色', '银色', '金色'],
    '水': ['蓝色', '黑色', '深紫色'],
    '风': ['绿色', '浅蓝色', '灰色']
  },
  numbers: {
    '白羊座': [1, 9],
    '金牛座': [2, 6],
    '双子座': [3, 5],
    '巨蟹座': [2, 7],
    '狮子座': [1, 5],
    '处女座': [5, 6],
    '天秤座': [6, 9],
    '天蝎座': [0, 4],
    '射手座': [3, 9],
    '摩羯座': [1, 4],
    '水瓶座': [4, 7],
    '双鱼座': [3, 7]
  },
  directions: {
    '火': ['南方', '东南方'],
    '土': ['中央', '东北方'],
    '金': ['西方', '西北方'],
    '水': ['北方', '西方'],
    '风': ['东方', '东南方']
  }
};

// 生成运势报告
export function generateFortuneReport(
  zodiac: string,
  date: string,
  scores: Record<string, number>,
  texts: Record<string, string>
): string {
  const template = ZODIAC_FORTUNE_TEMPLATES[zodiac as keyof typeof ZODIAC_FORTUNE_TEMPLATES];
  const luckyColors = LUCKY_ITEMS.colors[template?.element as keyof typeof LUCKY_ITEMS.colors] || [];
  const luckyNumbers = LUCKY_ITEMS.numbers[zodiac as keyof typeof LUCKY_ITEMS.numbers] || [];
  
  let report = `# ${zodiac} ${date} 运势报告\n\n`;
  
  // 星座信息
  report += `## 星座信息\n`;
  report += `- 元素：${template?.element || '未知'}\n`;
  report += `- 守护星：${template?.ruler || '未知'}\n`;
  report += `- 特质：${template?.traits?.join('、') || '未知'}\n\n`;
  
  // 运势指数
  report += `## 运势指数\n\n`;
  report += `| 项目 | 指数 | 星级 |\n`;
  report += `|------|------|------|\n`;
  
  const scoreLabels: Record<string, string> = {
    health: '健康',
    love: '爱情',
    career: '事业',
    wealth: '财运',
    academic: '学业',
    social: '社交'
  };
  
  for (const [key, score] of Object.entries(scores)) {
    const label = scoreLabels[key] || key;
    const stars = score >= 90 ? '★★★★★' : score >= 70 ? '★★★★☆' : score >= 50 ? '★★★☆☆' : score >= 30 ? '★★☆☆☆' : '★☆☆☆☆';
    report += `| ${label} | ${score}% | ${stars} |\n`;
  }
  report += '\n';
  
  // 详细解读
  report += `## 详细解读\n\n`;
  for (const [key, text] of Object.entries(texts)) {
    const label = scoreLabels[key] || key;
    report += `### ${label}\n${text}\n\n`;
  }
  
  // 幸运物
  report += `## 今日开运\n\n`;
  report += `- 幸运颜色：${luckyColors.join('、')}\n`;
  report += `- 幸运数字：${luckyNumbers.join('、')}\n`;
  report += `- 幸运方位：${LUCKY_ITEMS.directions[template?.element as keyof typeof LUCKY_ITEMS.directions]?.join('、') || '未知'}\n`;
  
  return report;
}

// 每个星座的完整幸运数据
export const ZODIAC_LUCKY_DATA: Record<string, {
  luckyColors: { name: string; hex: string }[];
  luckyNumbers: number[];
  luckyDirections: string[];
  luckyTimes: string[];
  luckyGemstones: string[];
  bestCompatibility: string[];
  goodCompatibility: string[];
  challengingCompatibility: string[];
}> = {
  '白羊座': {
    luckyColors: [{ name: '红色', hex: '#ef4444' }, { name: '橙色', hex: '#f97316' }],
    luckyNumbers: [1, 9, 18],
    luckyDirections: ['南方', '东方'],
    luckyTimes: ['上午 6-8 点', '下午 2-4 点'],
    luckyGemstones: ['红宝石', '钻石'],
    bestCompatibility: ['狮子座', '射手座'],
    goodCompatibility: ['双子座', '水瓶座'],
    challengingCompatibility: ['巨蟹座', '摩羯座'],
  },
  '金牛座': {
    luckyColors: [{ name: '绿色', hex: '#22c55e' }, { name: '粉色', hex: '#ec4899' }],
    luckyNumbers: [2, 6, 15],
    luckyDirections: ['东南方', '中央'],
    luckyTimes: ['上午 8-10 点', '下午 6-8 点'],
    luckyGemstones: ['翡翠', '粉晶'],
    bestCompatibility: ['处女座', '摩羯座'],
    goodCompatibility: ['巨蟹座', '双鱼座'],
    challengingCompatibility: ['狮子座', '水瓶座'],
  },
  '双子座': {
    luckyColors: [{ name: '黄色', hex: '#eab308' }, { name: '浅蓝色', hex: '#38bdf8' }],
    luckyNumbers: [3, 5, 12],
    luckyDirections: ['西方', '西北方'],
    luckyTimes: ['上午 10-12 点', '下午 4-6 点'],
    luckyGemstones: ['黄水晶', '玛瑙'],
    bestCompatibility: ['天秤座', '水瓶座'],
    goodCompatibility: ['白羊座', '狮子座'],
    challengingCompatibility: ['处女座', '双鱼座'],
  },
  '巨蟹座': {
    luckyColors: [{ name: '银色', hex: '#c0c0c0' }, { name: '白色', hex: '#ffffff' }],
    luckyNumbers: [2, 7, 11],
    luckyDirections: ['北方', '西南方'],
    luckyTimes: ['晚上 8-10 点', '凌晨 0-2 点'],
    luckyGemstones: ['月光石', '珍珠'],
    bestCompatibility: ['天蝎座', '双鱼座'],
    goodCompatibility: ['金牛座', '处女座'],
    challengingCompatibility: ['白羊座', '天秤座'],
  },
  '狮子座': {
    luckyColors: [{ name: '金色', hex: '#ffd700' }, { name: '橙色', hex: '#f97316' }],
    luckyNumbers: [1, 5, 19],
    luckyDirections: ['东方', '南方'],
    luckyTimes: ['中午 12-2 点', '下午 4-6 点'],
    luckyGemstones: ['红宝石', '琥珀'],
    bestCompatibility: ['白羊座', '射手座'],
    goodCompatibility: ['双子座', '天秤座'],
    challengingCompatibility: ['金牛座', '天蝎座'],
  },
  '处女座': {
    luckyColors: [{ name: '深绿色', hex: '#166534' }, { name: '米色', hex: '#f5f5dc' }],
    luckyNumbers: [5, 6, 14],
    luckyDirections: ['西南方', '中央'],
    luckyTimes: ['上午 6-8 点', '下午 2-4 点'],
    luckyGemstones: ['蓝宝石', '翡翠'],
    bestCompatibility: ['金牛座', '摩羯座'],
    goodCompatibility: ['巨蟹座', '天蝎座'],
    challengingCompatibility: ['双子座', '射手座'],
  },
  '天秤座': {
    luckyColors: [{ name: '粉色', hex: '#ec4899' }, { name: '浅蓝色', hex: '#38bdf8' }],
    luckyNumbers: [6, 9, 15],
    luckyDirections: ['西方', '西北方'],
    luckyTimes: ['下午 4-6 点', '晚上 8-10 点'],
    luckyGemstones: ['蛋白石', '粉晶'],
    bestCompatibility: ['双子座', '水瓶座'],
    goodCompatibility: ['狮子座', '射手座'],
    challengingCompatibility: ['巨蟹座', '摩羯座'],
  },
  '天蝎座': {
    luckyColors: [{ name: '深红色', hex: '#991b1b' }, { name: '黑色', hex: '#000000' }],
    luckyNumbers: [0, 4, 13],
    luckyDirections: ['北方', '东方'],
    luckyTimes: ['晚上 10-12 点', '凌晨 2-4 点'],
    luckyGemstones: ['石榴石', '黑曜石'],
    bestCompatibility: ['巨蟹座', '双鱼座'],
    goodCompatibility: ['处女座', '摩羯座'],
    challengingCompatibility: ['狮子座', '水瓶座'],
  },
  '射手座': {
    luckyColors: [{ name: '紫色', hex: '#8b5cf6' }, { name: '蓝色', hex: '#3b82f6' }],
    luckyNumbers: [3, 9, 21],
    luckyDirections: ['南方', '东南方'],
    luckyTimes: ['下午 2-4 点', '上午 10-12 点'],
    luckyGemstones: ['紫水晶', '蓝宝石'],
    bestCompatibility: ['白羊座', '狮子座'],
    goodCompatibility: ['天秤座', '水瓶座'],
    challengingCompatibility: ['处女座', '双鱼座'],
  },
  '摩羯座': {
    luckyColors: [{ name: '深灰色', hex: '#374151' }, { name: '棕色', hex: '#92400e' }],
    luckyNumbers: [1, 4, 8],
    luckyDirections: ['东北方', '中央'],
    luckyTimes: ['上午 8-10 点', '下午 6-8 点'],
    luckyGemstones: ['石榴石', '黑玛瑙'],
    bestCompatibility: ['金牛座', '处女座'],
    goodCompatibility: ['天蝎座', '双鱼座'],
    challengingCompatibility: ['白羊座', '天秤座'],
  },
  '水瓶座': {
    luckyColors: [{ name: '蓝色', hex: '#3b82f6' }, { name: '银色', hex: '#c0c0c0' }],
    luckyNumbers: [4, 7, 11],
    luckyDirections: ['东方', '北方'],
    luckyTimes: ['下午 4-6 点', '晚上 8-10 点'],
    luckyGemstones: ['蓝宝石', '紫水晶'],
    bestCompatibility: ['双子座', '天秤座'],
    goodCompatibility: ['白羊座', '射手座'],
    challengingCompatibility: ['金牛座', '天蝎座'],
  },
  '双鱼座': {
    luckyColors: [{ name: '海蓝色', hex: '#0ea5e9' }, { name: '紫色', hex: '#8b5cf6' }],
    luckyNumbers: [3, 7, 12],
    luckyDirections: ['西南方', '西方'],
    luckyTimes: ['晚上 10-12 点', '凌晨 0-2 点'],
    luckyGemstones: ['海蓝宝', '月光石'],
    bestCompatibility: ['巨蟹座', '天蝎座'],
    goodCompatibility: ['金牛座', '摩羯座'],
    challengingCompatibility: ['双子座', '射手座'],
  },
};

// 宜忌数据（基于星座元素）
export const ZODIAC_AUSPICIOUS: Record<string, {
  suitable: string[];
  unsuitable: string[];
  auspiciousHours: string;
  inauspiciousHours: string;
}> = {
  '白羊座': {
    suitable: ['开始新项目', '运动健身', '主动表白', '商务谈判'],
    unsuitable: ['冲动消费', '与人争吵', '拖延决策'],
    auspiciousHours: '卯时 (5-7点)、午时 (11-13点)',
    inauspiciousHours: '酉时 (17-19点)',
  },
  '金牛座': {
    suitable: ['理财投资', '享受美食', '整理家居', '签订合同'],
    unsuitable: ['冲动购物', '改变计划', '借贷'],
    auspiciousHours: '辰时 (7-9点)、酉时 (17-19点)',
    inauspiciousHours: '寅时 (3-5点)',
  },
  '双子座': {
    suitable: ['社交聚会', '学习新知', '短途旅行', '写作创作'],
    unsuitable: ['做重大决定', '独自工作', '久坐不动'],
    auspiciousHours: '巳时 (9-11点)、申时 (15-17点)',
    inauspiciousHours: '亥时 (21-23点)',
  },
  '巨蟹座': {
    suitable: ['陪伴家人', '烹饪美食', '整理房间', '冥想放松'],
    unsuitable: ['社交应酬', '加班熬夜', '情绪化消费'],
    auspiciousHours: '酉时 (17-19点)、亥时 (21-23点)',
    inauspiciousHours: '午时 (11-13点)',
  },
  '狮子座': {
    suitable: ['展示才华', '约会聚会', '购买奢侈品', '公开演讲'],
    unsuitable: ['独处', '节食', '借钱给人'],
    auspiciousHours: '午时 (11-13点)、未时 (13-15点)',
    inauspiciousHours: '子时 (23-1点)',
  },
  '处女座': {
    suitable: ['整理文件', '体检就医', '学习技能', '制定计划'],
    unsuitable: ['拖延', '过度批评', '熬夜'],
    auspiciousHours: '辰时 (7-9点)、未时 (13-15点)',
    inauspiciousHours: '戌时 (19-21点)',
  },
  '天秤座': {
    suitable: ['约会恋爱', '购物打扮', '调解纠纷', '艺术创作'],
    unsuitable: ['做选择', '独处', '争论'],
    auspiciousHours: '酉时 (17-19点)、亥时 (21-23点)',
    inauspiciousHours: '卯时 (5-7点)',
  },
  '天蝎座': {
    suitable: ['深度思考', '调查研究', '投资理财', '修复关系'],
    unsuitable: ['社交应酬', '轻信他人', '冲动消费'],
    auspiciousHours: '亥时 (21-23点)、丑时 (1-3点)',
    inauspiciousHours: '巳时 (9-11点)',
  },
  '射手座': {
    suitable: ['旅行探险', '学习哲学', '运动健身', '社交聚会'],
    unsuitable: ['宅在家里', '做细活', '借贷'],
    auspiciousHours: '巳时 (9-11点)、未时 (13-15点)',
    inauspiciousHours: '卯时 (5-7点)',
  },
  '摩羯座': {
    suitable: ['工作规划', '理财投资', '拜访长辈', '签订合同'],
    unsuitable: ['偷懒', '冲动辞职', '社交应酬'],
    auspiciousHours: '丑时 (1-3点)、辰时 (7-9点)',
    inauspiciousHours: '午时 (11-13点)',
  },
  '水瓶座': {
    suitable: ['创意工作', '科技活动', '社交聚会', '公益活动'],
    unsuitable: ['循规蹈矩', '独处', '情绪化'],
    auspiciousHours: '申时 (15-17点)、戌时 (19-21点)',
    inauspiciousHours: '巳时 (9-11点)',
  },
  '双鱼座': {
    suitable: ['冥想灵修', '艺术创作', '陪伴宠物', '慈善公益'],
    unsuitable: ['做重大决定', '饮酒', '熬夜'],
    auspiciousHours: '亥时 (21-23点)、寅时 (3-5点)',
    inauspiciousHours: '未时 (13-15点)',
  },
};

// 根据分数生成运势等级
export function getFortuneLevel(score: number): { label: string; color: string; emoji: string } {
  if (score >= 90) return { label: '极佳', color: '#4ade80', emoji: '🌟' };
  if (score >= 80) return { label: '很好', color: '#22c55e', emoji: '✨' };
  if (score >= 70) return { label: '良好', color: '#84cc16', emoji: '☀️' };
  if (score >= 60) return { label: '平稳', color: '#eab308', emoji: '🌤️' };
  if (score >= 50) return { label: '一般', color: '#f97316', emoji: '⛅' };
  if (score >= 40) return { label: '注意', color: '#ef4444', emoji: '🌧️' };
  return { label: '谨慎', color: '#dc2626', emoji: '⚡' };
}
