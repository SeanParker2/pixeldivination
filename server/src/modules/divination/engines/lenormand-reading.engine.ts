/**
 * 专业雷诺曼牌解读引擎
 * 雷诺曼牌与塔罗牌不同，它更直接、具体，擅长预测具体事件和时间
 * 核心特点：牌与牌的组合关系产生新含义
 */

interface LenormandCardData {
  position: string;
  cardId: number;
  cardName: string;
  cardNameEn: string;
  keywords: string[];
  meaning: {
    general: string;
    love: string;
    career: string;
    finance: string;
    health: string;
    timing: string;
    advice: string;
  };
}

// 雷诺曼牌组合含义数据库（核心专业数据）
const CARD_COMBINATIONS: Record<string, string> = {
  // 骑手(1) + 其他牌
  '1-2': '好消息带来幸运，可能收到意外的好消息',
  '1-3': '远方的消息，可能与旅行或海外有关',
  '1-4': '家中的访客，家庭方面的好消息',
  '1-5': '健康方面的好消息，身体恢复',
  '1-6': '好消息带来困惑，需要仔细辨别信息',
  '1-7': '小心欺骗性的消息，警惕虚假信息',
  '1-8': '重要的消息到来，可能涉及重大变化',
  '1-9': '好消息带来礼物或惊喜',
  '1-10': '突然的消息，意外的变动',
  '1-11': '好消息引发争论，需要沟通',
  '1-12': '好消息带来焦虑，等待的过程',
  '1-13': '新的开始，好消息带来新机遇',
  '1-14': '好消息与工作有关，事业进展',
  '1-15': '好消息与家庭保护有关',
  '1-16': '好消息与希望有关，愿望实现',
  '1-17': '好消息带来积极的改变',
  '1-18': '好消息与忠诚的朋友有关',
  '1-19': '好消息与权威机构有关',
  '1-20': '好消息带来社交机会',
  '1-21': '好消息遇到阻碍，需要克服困难',
  '1-22': '好消息带来选择，需要做决定',
  '1-23': '好消息带来损失，需要警惕',
  '1-24': '好消息与爱情有关，感情进展',
  '1-25': '好消息带来承诺或合同',
  '1-26': '好消息与学习有关，知识增长',
  '1-27': '好消息以信件或信息形式到来',
  '1-28': '好消息与男性有关',
  '1-29': '好消息与女性有关',
  '1-30': '好消息带来和谐与平静',
  '1-31': '好消息带来成功和快乐',
  '1-32': '好消息与直觉有关，相信内心',
  '1-33': '好消息是关键性的，命运转折',
  '1-34': '好消息与财富有关，财务改善',
  '1-35': '好消息带来稳定和安全感',
  '1-36': '好消息带来考验，需要坚持',

  // 幸运草(2) + 其他牌
  '2-3': '幸运的旅行，旅途愉快',
  '2-4': '家庭中的小幸运，家居改善',
  '2-5': '健康好转，身体恢复',
  '2-6': '小幸运带来困惑，不要被表面迷惑',
  '2-7': '小心虚假的幸运，警惕骗局',
  '2-8': '幸运带来重大变化',
  '2-9': '意外的礼物或惊喜',
  '2-10': '突然的好运，把握机会',
  '2-11': '幸运引发争论，需要沟通',
  '2-12': '等待中的小幸运',
  '2-13': '新的幸运开始',
  '2-14': '工作中的小幸运',
  '2-15': '幸运的保护，化险为夷',
  '2-16': '幸运带来希望',
  '2-17': '幸运的改变',
  '2-18': '幸运的朋友，贵人相助',
  '2-19': '幸运与权威有关',
  '2-20': '幸运的社交活动',
  '2-21': '幸运遇到阻碍',
  '2-22': '幸运带来选择',
  '2-23': '幸运带来损失，乐极生悲',
  '2-24': '幸运的爱情，桃花运',
  '2-25': '幸运的承诺',
  '2-26': '幸运的学习机会',
  '2-27': '幸运的消息',
  '2-28': '幸运与男性有关',
  '2-29': '幸运与女性有关',
  '2-30': '幸运带来和谐',
  '2-31': '幸运带来成功',
  '2-32': '幸运的直觉',
  '2-33': '幸运的命运转折',
  '2-34': '幸运的财富',
  '2-35': '幸运带来稳定',
  '2-36': '幸运的考验',

  // 船(3) + 其他牌
  '3-4': '旅行与家庭有关，搬家或探亲',
  '3-5': '旅行有利于健康，疗养之旅',
  '3-6': '旅行带来困惑，旅途不顺',
  '3-7': '旅行中遇到欺骗，小心骗子',
  '3-8': '长途旅行，重大变动',
  '3-9': '旅行带来礼物或收获',
  '3-10': '突然的旅行计划',
  '3-11': '旅行中发生争论',
  '3-12': '等待旅行，延迟出发',
  '3-13': '新的旅行开始',
  '3-14': '商务旅行',
  '3-15': '旅行受到保护',
  '3-16': '旅行带来希望',
  '3-17': '旅行带来改变',
  '3-18': '旅行中遇到朋友',
  '3-19': '旅行与权威机构有关',
  '3-20': '旅行带来社交机会',
  '3-21': '旅行遇到阻碍',
  '3-22': '旅行需要做决定',
  '3-23': '旅行带来损失',
  '3-24': '浪漫旅行，蜜月之旅',
  '3-25': '旅行带来承诺',
  '3-26': '学习之旅',
  '3-27': '旅行中的消息',
  '3-28': '旅行与男性有关',
  '3-29': '旅行与女性有关',
  '3-30': '旅行带来和谐',
  '3-31': '旅行带来成功',
  '3-32': '旅行与直觉有关',
  '3-33': '旅行的命运转折',
  '3-34': '旅行带来财富',
  '3-35': '旅行带来稳定',
  '3-36': '旅行带来考验',
};

// 时间预测系统
const TIMING_SYSTEM: Record<number, { period: string; season: string }> = {
  1: { period: '1-2天内', season: '春季' },
  2: { period: '2-3天内', season: '春季' },
  3: { period: '3-4天内', season: '春季' },
  4: { period: '4-5天内', season: '夏季' },
  5: { period: '5-7天内', season: '夏季' },
  6: { period: '1-2周内', season: '夏季' },
  7: { period: '2-3周内', season: '秋季' },
  8: { period: '3-4周内', season: '秋季' },
  9: { period: '1-2个月内', season: '秋季' },
  10: { period: '突然发生', season: '冬季' },
  11: { period: '争论后', season: '冬季' },
  12: { period: '等待后', season: '冬季' },
  13: { period: '新的开始时', season: '春季' },
  14: { period: '工作相关时', season: '夏季' },
  15: { period: '受到保护时', season: '夏季' },
  16: { period: '希望实现时', season: '秋季' },
  17: { period: '改变发生时', season: '秋季' },
  18: { period: '朋友帮助时', season: '冬季' },
  19: { period: '权威介入时', season: '冬季' },
  20: { period: '社交活动时', season: '春季' },
  21: { period: '克服困难后', season: '夏季' },
  22: { period: '做出选择后', season: '夏季' },
  23: { period: '损失发生后', season: '秋季' },
  24: { period: '爱情到来时', season: '秋季' },
  25: { period: '承诺做出时', season: '冬季' },
  26: { period: '学习完成时', season: '冬季' },
  27: { period: '消息收到时', season: '春季' },
  28: { period: '男性出现时', season: '夏季' },
  29: { period: '女性出现时', season: '夏季' },
  30: { period: '和谐达成时', season: '秋季' },
  31: { period: '成功到来时', season: '秋季' },
  32: { period: '直觉引导时', season: '冬季' },
  33: { period: '命运转折时', season: '冬季' },
  34: { period: '财富到来时', season: '春季' },
  35: { period: '稳定建立时', season: '夏季' },
  36: { period: '考验通过后', season: '夏季' },
};

/**
 * 生成三牌占卜解读
 */
export function generateThreeCardLenormandReading(cards: LenormandCardData[]): string {
  const [card1, card2, card3] = cards;

  let reading = `# 雷诺曼三牌占卜\n\n`;

  // 核心信息
  reading += `## 🔮 核心信息\n\n`;
  reading += `**${card1.cardName}**（${card1.cardNameEn}）— **${card2.cardName}**（${card2.cardNameEn}）— **${card3.cardName}**（${card3.cardNameEn}）\n\n`;

  // 逐牌解读
  reading += `## 📜 逐牌解读\n\n`;

  reading += `### 第一张：${card1.cardName}\n\n`;
  reading += `**核心含义**：${card1.meaning.general}\n\n`;
  reading += `**关键词**：${card1.keywords.join('、')}\n\n`;

  reading += `### 第二张：${card2.cardName}\n\n`;
  reading += `**核心含义**：${card2.meaning.general}\n\n`;
  reading += `**关键词**：${card2.keywords.join('、')}\n\n`;

  reading += `### 第三张：${card3.cardName}\n\n`;
  reading += `**核心含义**：${card3.meaning.general}\n\n`;
  reading += `**关键词**：${card3.keywords.join('、')}\n\n`;

  // 组合解读（雷诺曼的核心）
  reading += `## 🔗 组合解读\n\n`;
  reading += generateCombinationReading(card1, card2);
  reading += '\n';
  reading += generateCombinationReading(card2, card3);
  reading += '\n';

  // 三牌整体解读
  reading += `## 🎯 整体解读\n\n`;
  reading += generateThreeCardSynthesis(cards);

  // 分领域解读
  reading += `## 📊 分领域解读\n\n`;

  reading += `### 💕 感情\n\n`;
  reading += `- ${card1.cardName}：${card1.meaning.love}\n`;
  reading += `- ${card2.cardName}：${card2.meaning.love}\n`;
  reading += `- ${card3.cardName}：${card3.meaning.love}\n\n`;

  reading += `### 💼 事业\n\n`;
  reading += `- ${card1.cardName}：${card1.meaning.career}\n`;
  reading += `- ${card2.cardName}：${card2.meaning.career}\n`;
  reading += `- ${card3.cardName}：${card3.meaning.career}\n\n`;

  reading += `### 💰 财运\n\n`;
  reading += `- ${card1.cardName}：${card1.meaning.finance}\n`;
  reading += `- ${card2.cardName}：${card2.meaning.finance}\n`;
  reading += `- ${card3.cardName}：${card3.meaning.finance}\n\n`;

  // 时间预测
  reading += `## ⏰ 时间预测\n\n`;
  reading += generateTimingPrediction(cards);

  // 行动建议
  reading += `## 💫 行动建议\n\n`;
  reading += generateLenormandAdvice(cards);

  return reading;
}

/**
 * 生成单牌占卜解读
 */
export function generateSingleLenormandReading(cards: LenormandCardData[]): string {
  const card = cards[0];

  let reading = `# 雷诺曼单牌占卜 · 今日指引\n\n`;

  reading += `## 🃏 ${card.cardName}（${card.cardNameEn}）\n\n`;

  reading += `### 核心含义\n\n`;
  reading += `${card.meaning.general}\n\n`;

  reading += `### 关键词\n\n`;
  reading += card.keywords.map(k => `\`${k}\``).join(' ') + '\n\n';

  reading += `### 分领域解读\n\n`;
  reading += `💕 **感情**：${card.meaning.love}\n\n`;
  reading += `💼 **事业**：${card.meaning.career}\n\n`;
  reading += `💰 **财运**：${card.meaning.finance}\n\n`;
  reading += `🏥 **健康**：${card.meaning.health}\n\n`;

  reading += `### 时间提示\n\n`;
  reading += `${card.meaning.timing}\n\n`;

  reading += `### 行动建议\n\n`;
  reading += `${card.meaning.advice}\n\n`;

  return reading;
}

// ==================== 辅助函数 ====================

function generateCombinationReading(card1: LenormandCardData, card2: LenormandCardData): string {
  const key1 = `${card1.cardId}-${card2.cardId}`;
  const key2 = `${card2.cardId}-${card1.cardId}`;

  const combination = CARD_COMBINATIONS[key1] || CARD_COMBINATIONS[key2];

  if (combination) {
    return `**${card1.cardName} + ${card2.cardName}**：${combination}`;
  }

  // 通用组合解读
  return `**${card1.cardName} + ${card2.cardName}**：${card1.keywords[0]}与${card2.keywords[0]}的能量交织，${card1.meaning.general.split('。')[0]}，而${card2.meaning.general.split('。')[0]}。`;
}

function generateThreeCardSynthesis(cards: LenormandCardData[]): string {
  const keywords = cards.flatMap(c => c.keywords);

  let synthesis = '';

  // 基于关键词的整体分析
  if (keywords.some(k => ['爱情', '情感', '关系', '浪漫'].includes(k))) {
    synthesis += '本次牌阵的核心能量指向情感领域。';
  } else if (keywords.some(k => ['金钱', '财富', '成功', '工作'].includes(k))) {
    synthesis += '本次牌阵的核心能量指向物质和事业领域。';
  } else if (keywords.some(k => ['消息', '到来', '变化', '新开始'].includes(k))) {
    synthesis += '本次牌阵的核心能量指向变化和新开始。';
  } else if (keywords.some(k => ['阻碍', '延迟', '挑战', '困难'].includes(k))) {
    synthesis += '本次牌阵提示当前面临一些挑战。';
  } else {
    synthesis += '本次牌阵呈现出多元的能量流动。';
  }

  // 时间维度
  synthesis += `从时间线来看，`;
  synthesis += `${cards[0].cardName}代表过去的影响，${cards[1].cardName}代表当前的状态，${cards[2].cardName}代表未来的发展趋势。`;

  return synthesis;
}

function generateTimingPrediction(cards: LenormandCardData[]): string {
  let prediction = '';

  for (const card of cards) {
    const timing = TIMING_SYSTEM[card.cardId];
    if (timing) {
      prediction += `- **${card.cardName}**：${timing.period}（${timing.season}能量）\n`;
    }
  }

  prediction += '\n> ⏰ 雷诺曼的时间预测非常精确。关注上述时间提示，做好准备。';

  return prediction;
}

function generateLenormandAdvice(cards: LenormandCardData[]): string {
  let advice = '';

  // 基于整体牌面给出建议
  const allAdvice = cards.map(c => c.meaning.advice).filter(Boolean);

  if (allAdvice.length > 0) {
    advice += allAdvice.map(a => `- ${a}`).join('\n') + '\n\n';
  }

  // 基于关键词的额外建议
  const keywords = cards.flatMap(c => c.keywords);

  if (keywords.includes('爱情') || keywords.includes('情感')) {
    advice += '- 💕 感情方面需要主动表达，不要等待\n';
  }
  if (keywords.includes('金钱') || keywords.includes('财富')) {
    advice += '- 💰 财务方面保持谨慎，避免冲动消费\n';
  }
  if (keywords.includes('消息') || keywords.includes('到来')) {
    advice += '- 📨 保持警觉，好消息即将到来\n';
  }
  if (keywords.includes('阻碍') || keywords.includes('挑战')) {
    advice += '- ⚠️ 当前有阻碍需要克服，保持耐心\n';
  }

  advice += '\n> 🌙 雷诺曼牌的预测具有很强的时效性，建议关注近期的发展。';

  return advice;
}
