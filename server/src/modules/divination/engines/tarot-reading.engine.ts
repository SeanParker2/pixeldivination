/**
 * 专业塔罗牌解读引擎
 * 支持6种牌阵的深度解读，包含牌面分析、位置解读、组合关系、整体指引
 */

interface CardData {
  position: string;
  cardName: string;
  cardNameEn: string;
  orientation: '正位' | '逆位';
  keywords: string[];
  meaning: string;
  love: string;
  career: string;
  finance: string;
  health: string;
  arcana: 'major' | 'minor';
  suit?: string;
}

interface SpreadConfig {
  name: string;
  positions: string[];
}

// 花色元素映射
const SUIT_ELEMENTS: Record<string, { name: string; emoji: string; domain: string }> = {
  wands: { name: '火', emoji: '🔥', domain: '行动、创造、热情' },
  cups: { name: '水', emoji: '💧', domain: '情感、关系、直觉' },
  swords: { name: '风', emoji: '⚔️', domain: '思维、沟通、冲突' },
  pentacles: { name: '土', emoji: '🌟', domain: '物质、财富、健康' },
};

// 大阿卡纳牌的深层含义
const MAJOR_ARCANA_DEPTHS: Record<string, {
  archetype: string;
  lesson: string;
  shadow: string;
  advice: string;
}> = {
  '愚者': { archetype: '天真者', lesson: '拥抱未知，信任生命的流动', shadow: '鲁莽、不计后果、逃避责任', advice: '保持开放心态，但也要做好基本准备' },
  '魔术师': { archetype: '创造者', lesson: '你拥有实现目标的一切资源', shadow: '欺骗、操纵、滥用能力', advice: '专注目标，善用你的天赋' },
  '女祭司': { archetype: '直觉者', lesson: '倾听内心的声音，相信直觉', shadow: '忽视直觉、情感压抑、秘密', advice: '给自己安静的时间去感受' },
  '女皇': { archetype: '养育者', lesson: '享受生命的丰盛与美好', shadow: '过度依赖、忽视自我、创造力受阻', advice: '照顾好自己，才能照顾他人' },
  '皇帝': { archetype: '统治者', lesson: '建立秩序，承担责任', shadow: '专制、控制、僵化', advice: '用智慧而非权力来领导' },
  '教皇': { archetype: '导师', lesson: '寻求智慧，传承知识', shadow: '教条主义、盲从、叛逆', advice: '尊重传统，但保持独立思考' },
  '恋人': { archetype: '选择者', lesson: '跟随内心做出真实的选择', shadow: '价值观冲突、错误选择、逃避选择', advice: '选择符合你价值观的方向' },
  '战车': { archetype: '战士', lesson: '通过意志力克服障碍', shadow: '失控、方向迷失、 aggression', advice: '保持专注，驾驭内在的矛盾力量' },
  '力量': { archetype: '驯服者', lesson: '用温柔的力量克服困难', shadow: '自我怀疑、软弱、暴力', advice: '真正的力量来自内心的平静' },
  '隐士': { archetype: '智者', lesson: '向内探索，寻找真理', shadow: '孤立、逃避、固执', advice: '独处是为了更好地回归' },
  '命运之轮': { archetype: '命运', lesson: '接受生命的循环与变化', shadow: '抗拒改变、受害者心态', advice: '顺应变化，在转折中找到机遇' },
  '正义': { archetype: '裁决者', lesson: '公平对待一切，承担后果', shadow: '不公平、偏见、逃避责任', advice: '诚实面对自己和他人' },
  '倒吊人': { archetype: '牺牲者', lesson: '通过放手获得新视角', shadow: '无谓牺牲、拖延、自怜', advice: '换个角度看问题' },
  '死神': { archetype: '终结者', lesson: '结束旧的，迎接新的', shadow: '抗拒结束、恐惧变化', advice: '放下不再服务于你的事物' },
  '节制': { archetype: '调和者', lesson: '在生活中寻找平衡', shadow: '极端、失衡、缺乏耐心', advice: '万事适度，中庸之道' },
  '恶魔': { archetype: '诱惑者', lesson: '认识并超越你的阴影', shadow: '沉迷、束缚、物质主义', advice: '觉察你的执念，才能获得自由' },
  '高塔': { archetype: '毁灭者', lesson: '真理会打破虚假的结构', shadow: '灾难化思维、恐惧突变', advice: '破坏是为了重建更坚固的基础' },
  '星星': { archetype: '希望者', lesson: '在黑暗中保持希望', shadow: '失望、缺乏信心、 disconnected', advice: '相信宇宙的安排，保持信念' },
  '月亮': { archetype: '梦想家', lesson: '穿越幻象，面对潜意识', shadow: '恐惧、幻觉、自我欺骗', advice: '相信直觉，但不要被恐惧控制' },
  '太阳': { archetype: '光明者', lesson: '享受成功与快乐', shadow: '过度乐观、自满', advice: '分享你的光芒，带动他人' },
  '审判': { archetype: '觉醒者', lesson: '聆听召唤，迎接重生', shadow: '自我怀疑、拒绝觉醒', advice: '原谅过去，拥抱新的自己' },
  '世界': { archetype: '完成者', lesson: '一个周期的圆满完成', shadow: '未完成感、延迟、缺乏闭合', advice: '庆祝你的成就，准备新的旅程' },
};

/**
 * 生成单牌占卜解读
 */
export function generateSingleCardReading(cards: CardData[]): string {
  const card = cards[0];
  const isReversed = card.orientation === '逆位';
  const depth = MAJOR_ARCANA_DEPTHS[card.cardName];

  let reading = `# 单牌占卜 · 今日指引\n\n`;

  // 牌面信息
  reading += `## 🃏 ${card.cardName}（${card.cardNameEn}）${card.orientation}\n\n`;

  // 核心解读
  reading += `### 核心含义\n\n`;
  reading += `${card.meaning}\n\n`;

  if (isReversed) {
    reading += `> 💡 **逆位提示**：逆位并非全然负面，它提醒你注意内在的阻碍、被压抑的能量，或者需要调整的方向。\n\n`;
  }

  // 深层解读（大阿卡纳）
  if (depth) {
    reading += `### 深层解读\n\n`;
    reading += `**原型**：${depth.archetype}\n\n`;
    reading += `**灵魂课题**：${depth.lesson}\n\n`;
    reading += `**阴影面**：${depth.shadow}\n\n`;
    reading += `**行动建议**：${depth.advice}\n\n`;
  }

  // 分领域指引
  reading += `### 分领域指引\n\n`;
  reading += `💕 **感情**：${card.love}\n\n`;
  reading += `💼 **事业**：${card.career}\n\n`;
  reading += `💰 **财运**：${card.finance}\n\n`;
  reading += `🏥 **健康**：${card.health}\n\n`;

  // 关键词
  reading += `### 关键词\n\n`;
  reading += card.keywords.map(k => `\`${k}\``).join(' ') + '\n\n';

  // 行动建议
  reading += `### 今日行动建议\n\n`;
  reading += generateActionAdvice(card);

  return reading;
}

/**
 * 生成时间三牌解读
 */
export function generateThreeCardReading(cards: CardData[]): string {
  const [past, present, future] = cards;

  let reading = `# 时间三牌 · 过去-现在-未来\n\n`;

  // 核心洞察
  reading += `## 🔮 核心洞察\n\n`;
  reading += generateThreeCardInsight(cards);
  reading += '\n\n';

  // 逐牌详解
  reading += `## 📜 牌面详解\n\n`;

  // 过去
  reading += `### ⏮️ 过去：${past.cardName}（${past.cardNameEn}）${past.orientation}\n\n`;
  reading += `**核心含义**：${past.meaning}\n\n`;
  reading += `**对现在的影响**：${generatePastInfluence(past)}\n\n`;
  reading += `**关键词**：${past.keywords.join('、')}\n\n`;
  reading += '---\n\n';

  // 现在
  reading += `### ⏸️ 现在：${present.cardName}（${present.cardNameEn}）${present.orientation}\n\n`;
  reading += `**核心含义**：${present.meaning}\n\n`;
  reading += `**当前处境**：${generatePresentSituation(present)}\n\n`;
  reading += `**感情**：${present.love}\n\n`;
  reading += `**事业**：${present.career}\n\n`;
  reading += `**关键词**：${present.keywords.join('、')}\n\n`;
  reading += '---\n\n';

  // 未来
  reading += `### ⏭️ 未来：${future.cardName}（${future.cardNameEn}）${future.orientation}\n\n`;
  reading += `**核心含义**：${future.meaning}\n\n`;
  reading += `**发展趋势**：${generateFutureTrend(future)}\n\n`;
  reading += `**关键词**：${future.keywords.join('、')}\n\n`;

  // 能量流动分析
  reading += `\n## 🔗 能量流动分析\n\n`;
  reading += generateEnergyFlow(cards);

  // 综合建议
  reading += `\n## 💫 综合建议\n\n`;
  reading += generateThreeCardAdvice(cards);

  return reading;
}

/**
 * 生成凯尔特十字解读
 */
export function generateCelticCrossReading(cards: CardData[]): string {
  const [
    current, challenge, goal, past, hidden,
    nearFuture, advice, environment, hopes, outcome
  ] = cards;

  let reading = `# 凯尔特十字 · 全面深度解读\n\n`;

  // 核心洞察
  reading += `## 🔮 核心洞察\n\n`;
  reading += `**当前处境**（${current.cardName}${current.orientation}）：${current.meaning}\n\n`;
  reading += `**核心挑战**（${challenge.cardName}${challenge.orientation}）：${challenge.meaning}\n\n`;
  reading += `**目标方向**（${goal.cardName}${goal.orientation}）：${goal.meaning}\n\n\n`;

  // 十字牌阵详解
  reading += `## 📜 十字牌阵详解\n\n`;

  // 内在十字（核心问题）
  reading += `### 🎯 内在十字（核心问题）\n\n`;
  reading += `**① 现况**：${current.cardName}${current.orientation}\n`;
  reading += `> ${current.meaning}\n\n`;
  reading += `**② 挑战/障碍**：${challenge.cardName}${challenge.orientation}\n`;
  reading += `> ${challenge.meaning}\n`;
  reading += `> 💡 这张牌揭示了你需要面对的核心课题。\n\n`;
  reading += `**③ 目标/理想**：${goal.cardName}${goal.orientation}\n`;
  reading += `> ${goal.meaning}\n\n`;

  // 时间线
  reading += `### ⏳ 时间线\n\n`;
  reading += `**④ 过去根基**：${past.cardName}${past.orientation}\n`;
  reading += `> ${past.meaning}\n\n`;
  reading += `**⑤ 潜意识/隐藏因素**：${hidden.cardName}${hidden.orientation}\n`;
  reading += `> ${hidden.meaning}\n`;
  reading += `> 🔍 这是你可能没有意识到的影响因素。\n\n`;
  reading += `**⑥ 近期未来**：${nearFuture.cardName}${nearFuture.orientation}\n`;
  reading += `> ${nearFuture.meaning}\n\n`;

  // 外在十字
  reading += `### 🌐 外在十字（环境与指引）\n\n`;
  reading += `**⑦ 你的态度/建议**：${advice.cardName}${advice.orientation}\n`;
  reading += `> ${advice.meaning}\n\n`;
  reading += `**⑧ 外部环境**：${environment.cardName}${environment.orientation}\n`;
  reading += `> ${environment.meaning}\n\n`;
  reading += `**⑨ 希望与恐惧**：${hopes.cardName}${hopes.orientation}\n`;
  reading += `> ${hopes.meaning}\n\n`;
  reading += `**⑩ 最终结果**：${outcome.cardName}${outcome.orientation}\n`;
  reading += `> ${outcome.meaning}\n\n`;

  // 逐牌分领域解读
  reading += `## 📊 分领域详解\n\n`;

  reading += `### 💕 感情运势\n\n`;
  reading += generateAreaReading(cards, 'love');

  reading += `### 💼 事业运势\n\n`;
  reading += generateAreaReading(cards, 'career');

  reading += `### 💰 财运分析\n\n`;
  reading += generateAreaReading(cards, 'finance');

  // 综合建议
  reading += `## 💫 综合建议\n\n`;
  reading += generateCelticCrossAdvice(cards);

  return reading;
}

/**
 * 生成关系牌阵解读
 */
export function generateRelationshipReading(cards: CardData[]): string {
  const [yourFeelings, theirFeelings, relationship, challenge, advice] = cards;

  let reading = `# 关系牌阵 · 双人关系分析\n\n`;

  reading += `## 🔮 关系全貌\n\n`;
  reading += `本次牌阵揭示了你与对方之间的能量互动。以下是五个维度的深度分析：\n\n`;

  // 双方感受
  reading += `## 💑 双方感受\n\n`;

  reading += `### 你的感受：${yourFeelings.cardName}${yourFeelings.orientation}\n\n`;
  reading += `${yourFeelings.meaning}\n\n`;
  reading += `**情感状态**：${yourFeelings.love}\n\n`;

  reading += `### 对方的感受：${theirFeelings.cardName}${theirFeelings.orientation}\n\n`;
  reading += `${theirFeelings.meaning}\n\n`;
  reading += `**情感状态**：${theirFeelings.love}\n\n`;

  // 关系现状
  reading += `## 🤝 关系现状\n\n`;
  reading += `**${relationship.cardName}**（${relationship.orientation}）\n\n`;
  reading += `${relationship.meaning}\n\n`;

  // 挑战与建议
  reading += `## ⚠️ 关系挑战\n\n`;
  reading += `**${challenge.cardName}**（${challenge.orientation}）\n\n`;
  reading += `${challenge.meaning}\n\n`;
  reading += `> 💡 这是你们关系中需要共同面对的课题。\n\n`;

  reading += `## 🌟 行动建议\n\n`;
  reading += `**${advice.cardName}**（${advice.orientation}）\n\n`;
  reading += `${advice.meaning}\n\n`;

  // 关系能量分析
  reading += `## 🔗 能量互动分析\n\n`;
  reading += generateRelationshipDynamics(cards);

  // 综合建议
  reading += `## 💫 综合建议\n\n`;
  reading += generateRelationshipAdvice(cards);

  return reading;
}

/**
 * 生成决策牌阵解读
 */
export function generateDecisionReading(cards: CardData[]): string {
  const [optionA, optionB, influence, advice] = cards;

  let reading = `# 决策牌阵 · 选择分析\n\n`;

  reading += `## 🔮 决策分析\n\n`;
  reading += `你正面临一个重要选择。牌阵将帮助你看到两个选项的利弊以及最佳行动方向。\n\n`;

  // 选项对比
  reading += `## ⚖️ 选项对比\n\n`;

  reading += `### 选项A：${optionA.cardName}${optionA.orientation}\n\n`;
  reading += `${optionA.meaning}\n\n`;
  reading += `**可能的结果**：${optionA.career}\n\n`;

  reading += `### 选项B：${optionB.cardName}${optionB.orientation}\n\n`;
  reading += `${optionB.meaning}\n\n`;
  reading += `**可能的结果**：${optionB.career}\n\n`;

  // 影响因素
  reading += `## 🔍 关键影响因素\n\n`;
  reading += `**${influence.cardName}**（${influence.orientation}）\n\n`;
  reading += `${influence.meaning}\n\n`;
  reading += `> 💡 这个因素可能在你做决定时起到关键作用。\n\n`;

  // 建议
  reading += `## 🌟 最佳行动方向\n\n`;
  reading += `**${advice.cardName}**（${advice.orientation}）\n\n`;
  reading += `${advice.meaning}\n\n`;

  // 综合分析
  reading += `## 💫 综合建议\n\n`;
  reading += generateDecisionAdvice(cards);

  return reading;
}

/**
 * 生成月相牌阵解读
 */
export function generateMonthlyReading(cards: CardData[]): string {
  const [beginning, middle, end, challenge, harvest] = cards;

  let reading = `# 月相牌阵 · 每月运势\n\n`;

  reading += `## 🔮 月度能量概览\n\n`;
  reading += `本次牌阵揭示了本月的能量流动趋势，帮助你把握最佳行动时机。\n\n`;

  // 三个时间段
  reading += `## 🌙 月度走势\n\n`;

  reading += `### 🌑 月初（新月能量）：${beginning.cardName}${beginning.orientation}\n\n`;
  reading += `${beginning.meaning}\n\n`;
  reading += `**关键词**：${beginning.keywords.join('、')}\n\n`;

  reading += `### 🌗 月中（上弦月能量）：${middle.cardName}${middle.orientation}\n\n`;
  reading += `${middle.meaning}\n\n`;
  reading += `**关键词**：${middle.keywords.join('、')}\n\n`;

  reading += `### 🌕 月末（满月能量）：${end.cardName}${end.orientation}\n\n`;
  reading += `${end.meaning}\n\n`;
  reading += `**关键词**：${end.keywords.join('、')}\n\n`;

  // 挑战与收获
  reading += `## ⚠️ 本月挑战\n\n`;
  reading += `**${challenge.cardName}**（${challenge.orientation}）\n\n`;
  reading += `${challenge.meaning}\n\n`;

  reading += `## 🌟 本月收获\n\n`;
  reading += `**${harvest.cardName}**（${harvest.orientation}）\n\n`;
  reading += `${harvest.meaning}\n\n`;

  // 月度建议
  reading += `## 💫 月度行动指南\n\n`;
  reading += generateMonthlyAdvice(cards);

  return reading;
}

// ==================== 辅助函数 ====================

function generateActionAdvice(card: CardData): string {
  const isReversed = card.orientation === '逆位';
  let advice = '';

  if (card.arcana === 'major') {
    advice += `- 这是一张大阿卡纳牌，代表命运的重要课题。认真对待今天的信息。\n`;
  }

  if (isReversed) {
    advice += `- 逆位提示你需要向内探索，反思当前的状况。\n`;
    advice += `- 避免冲动行动，先理清思路再做决定。\n`;
  } else {
    advice += `- 正位能量顺畅，适合采取行动。\n`;
    advice += `- 信任你的直觉，勇敢迈出第一步。\n`;
  }

  const element = card.suit ? SUIT_ELEMENTS[card.suit] : null;
  if (element) {
    advice += `- ${element.emoji} ${element.name}元素提示：关注${element.domain}领域。\n`;
  }

  return advice;
}

function generateThreeCardInsight(cards: CardData[]): string {
  const majorCount = cards.filter(c => c.arcana === 'major').length;
  const reversedCount = cards.filter(c => c.orientation === '逆位').length;

  let insight = '';

  if (majorCount >= 2) {
    insight += '本次牌阵中大阿卡纳牌出现较多，说明当前 situation 涉及到人生重大课题或命运的转折点。\n\n';
  } else if (majorCount === 1) {
    insight += '本次牌阵中出现了一张大阿卡纳牌，这是命运的指引，提醒你需要关注某个重要的人生领域。\n\n';
  } else {
    insight += '本次牌阵以小阿卡纳牌为主，说明当前 situation 更多涉及日常生活和具体事务。\n\n';
  }

  if (reversedCount >= 2) {
    insight += '多张牌出现逆位，提示你当前可能面临一些阻碍或内在的冲突。';
  } else if (reversedCount === 1) {
    insight += '有一张牌出现逆位，提醒你在相关领域需要注意调整心态或改变方法。';
  } else {
    insight += '所有牌都是正位，整体能量较为顺畅，是采取行动的好时机。';
  }

  return insight;
}

function generatePastInfluence(card: CardData): string {
  if (card.orientation === '正位') {
    return `过去的经历为你提供了稳定的基础和积极的能量。${card.meaning}`;
  }
  return `过去可能有一些未完全解决的课题。${card.meaning} 这些影响仍在潜移默化地作用于你的现在。`;
}

function generatePresentSituation(card: CardData): string {
  if (card.orientation === '正位') {
    return `你当前正处于一个相对稳定的状态，可以把握当下的机会。${card.meaning}`;
  }
  return `当前可能面临一些挑战或不确定性。${card.meaning} 这需要你更加谨慎地做出选择。`;
}

function generateFutureTrend(card: CardData): string {
  if (card.orientation === '正位') {
    return `前方有积极的发展等待着你。${card.meaning} 保持当前的节奏，好消息即将到来。`;
  }
  return `未来需要注意潜在的阻碍。${card.meaning} 提前做好准备，可以化解大部分困难。`;
}

function generateEnergyFlow(cards: CardData[]): string {
  let flow = '';

  const pastToPresent = cards[0].orientation === '正位' && cards[1].orientation === '正位'
    ? '顺畅' : cards[0].orientation === '逆位' && cards[1].orientation === '逆位' ? '受阻' : '有波动';

  const presentToFuture = cards[1].orientation === '正位' && cards[2].orientation === '正位'
    ? '顺畅' : cards[1].orientation === '逆位' && cards[2].orientation === '逆位' ? '受阻' : '有变化';

  flow += `**过去→现在**：能量流动${pastToPresent}\n\n`;
  flow += `**现在→未来**：能量流动${presentToFuture}\n\n`;

  // 元素分析
  const suits = cards.filter(c => c.suit).map(c => c.suit);
  const uniqueSuits = [...new Set(suits)];

  if (uniqueSuits.length === 1) {
    const element = SUIT_ELEMENTS[uniqueSuits[0]!];
    flow += `\n> 🎯 **能量聚焦**：三张牌同属${element.name}元素（${element.domain}），说明本月能量高度集中在这个领域。`;
  } else if (uniqueSuits.length >= 3) {
    flow += `\n> 🌈 **能量多元**：出现多种元素，说明生活各方面都在变化中。保持灵活应对。`;
  }

  return flow;
}

function generateThreeCardAdvice(cards: CardData[]): string {
  let advice = '';

  // 基于过去-现在-未来的建议
  const past = cards[0];
  const present = cards[1];
  const future = cards[2];

  if (past.orientation === '逆位' && present.orientation === '正位') {
    advice += '🌟 **放下过去**：你已经从过去的困境中走出来，现在是向前看的好时机。\n\n';
  }

  if (present.orientation === '正位' && future.orientation === '正位') {
    advice += '🚀 **积极行动**：当前和未来的能量都是正向的，大胆推进你的计划。\n\n';
  }

  if (present.orientation === '逆位') {
    advice += '🔄 **调整策略**：当前可能需要调整方向或方法。不要害怕改变。\n\n';
  }

  if (future.orientation === '逆位') {
    advice += '⚠️ **提前准备**：未来可能有挑战，现在就开始做好准备。\n\n';
  }

  advice += '> 🌙 记住：塔罗牌是指引，不是定论。你始终拥有自由意志去创造自己的未来。';

  return advice;
}

function generateAreaReading(cards: CardData[], area: 'love' | 'career' | 'finance'): string {
  let reading = '';
  const areaName = area === 'love' ? '感情' : area === 'career' ? '事业' : '财运';

  for (const card of cards) {
    const areaText = card[area];
    if (areaText) {
      reading += `- **${card.position}**（${card.cardName}${card.orientation}）：${areaText}\n`;
    }
  }

  reading += '\n';
  return reading;
}

function generateCelticCrossAdvice(cards: CardData[]): string {
  let advice = '';

  const outcome = cards[9];
  const adviceCard = cards[6];

  advice += `**最终结果**（${outcome.cardName}${outcome.orientation}）提示：${outcome.meaning}\n\n`;
  advice += `**核心建议**（${adviceCard.cardName}${adviceCard.orientation}）：${adviceCard.meaning}\n\n`;

  // 大阿卡纳分析
  const majorCards = cards.filter(c => c.arcana === 'major');
  if (majorCards.length >= 3) {
    advice += '> 🔮 本次牌阵出现多张大阿卡纳牌，说明这是一个命运的关键时期。宇宙正在向你传递重要的信息。\n\n';
  }

  advice += '> 🌙 凯尔特十字是最全面的牌阵之一。仔细思考每张牌的含义，它们之间的关系会揭示更深层的洞察。';

  return advice;
}

function generateRelationshipDynamics(cards: CardData[]): string {
  let dynamics = '';

  const yourCard = cards[0];
  const theirCard = cards[1];
  const relationship = cards[2];

  // 双方能量对比
  const yourElement = yourCard.suit ? SUIT_ELEMENTS[yourCard.suit] : null;
  const theirElement = theirCard.suit ? SUIT_ELEMENTS[theirCard.suit] : null;

  if (yourElement && theirElement) {
    if (yourElement.name === theirElement.name) {
      dynamics += `你们两人的能量同属${yourElement.name}元素，有着相似的频率和节奏。这是一段和谐的关系基础。\n\n`;
    } else {
      dynamics += `你的能量偏向${yourElement.name}元素（${yourElement.domain}），而对方偏向${theirElement.name}元素（${theirElement.domain}）。这种差异可以互补，也可能产生摩擦。\n\n`;
    }
  }

  // 关系核心
  dynamics += `**关系核心**（${relationship.cardName}）揭示了这段关系的本质课题。\n\n`;

  return dynamics;
}

function generateRelationshipAdvice(cards: CardData[]): string {
  let advice = '';

  const challenge = cards[3];
  const action = cards[4];

  advice += `**面对挑战**：${challenge.meaning}\n\n`;
  advice += `**行动建议**：${action.meaning}\n\n`;

  advice += '> 💕 关系是两个人共同的旅程。牌阵揭示的是能量趋势，真正的结果取决于双方的选择和努力。';

  return advice;
}

function generateDecisionAdvice(cards: CardData[]): string {
  let advice = '';

  const optionA = cards[0];
  const optionB = cards[1];

  // 对比两个选项
  const aPositive = optionA.orientation === '正位' ? 1 : 0;
  const bPositive = optionB.orientation === '正位' ? 1 : 0;

  if (aPositive > bPositive) {
    advice += '从牌面能量来看，**选项A**的能量更为顺畅。\n\n';
  } else if (bPositive > aPositive) {
    advice += '从牌面能量来看，**选项B**的能量更为顺畅。\n\n';
  } else {
    advice += '两个选项的能量相当，最终的选择取决于你内心更看重什么。\n\n';
  }

  advice += '> ⚖️ 记住：没有绝对正确的选择。重要的是你做出选择后全心全意地走下去。';

  return advice;
}

function generateMonthlyAdvice(cards: CardData[]): string {
  let advice = '';

  const beginning = cards[0];
  const middle = cards[1];
  const end = cards[2];

  advice += `**月初行动**：${beginning.orientation === '正位' ? '适合启动新计划，积极行动。' : '月初不宜冒进，先观察形势。'}\n\n`;
  advice += `**月中策略**：${middle.orientation === '正位' ? '月中能量稳定，适合推进重要项目。' : '月中可能遇到波折，保持灵活应变。'}\n\n`;
  advice += `**月末收尾**：${end.orientation === '正位' ? '月末有好的收尾机会，把握住。' : '月末需要做好收尾工作，避免遗留问题。'}\n\n`;

  advice += '> 🌙 月相牌阵帮助你把握月度节奏。顺应能量流动，在合适的时间做合适的事。';

  return advice;
}
