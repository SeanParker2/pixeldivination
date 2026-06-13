/**
 * 雷诺曼完整数据库 - 后端使用
 * 包含36张雷诺曼牌的详细牌意
 */

export interface LenormandCard {
  id: number;
  name: string;
  nameEn: string;
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

export const LENORMAND_DECK: LenormandCard[] = [
  {
    id: 1, name: '骑士', nameEn: 'Rider',
    keywords: ['消息', '到来', '速度', '行动'],
    meaning: {
      general: '骑士代表好消息的到来或新的开始。可能有人来访或收到期待已久的消息。',
      love: '新的恋情可能出现，或者现有关系有新的进展。',
      career: '工作上有新的机会或消息。可能收到面试邀请。',
      finance: '可能收到意外的收入或好消息。',
      health: '身体状况良好，精力充沛。',
      timing: '很快，1-2天内',
      advice: '保持警觉，准备好迎接新机会。'
    }
  },
  {
    id: 2, name: '三叶草', nameEn: 'Clover',
    keywords: ['幸运', '机会', '快乐', '小确幸'],
    meaning: {
      general: '三叶草象征小幸运和意外的快乐。保持乐观的心态。',
      love: '感情中会有小惊喜，可能收到浪漫的礼物。',
      career: '工作上有小的突破或好消息。',
      finance: '可能有小额意外收入或优惠。',
      health: '身体状况不错，心情愉快。',
      timing: '1-2天内',
      advice: '保持乐观，享受生活中的小确幸。'
    }
  },
  {
    id: 3, name: '船', nameEn: 'Ship',
    keywords: ['旅行', '距离', '商业', '探索'],
    meaning: {
      general: '船代表旅行、探索和商业活动。可能有出差或与远方有关的事务。',
      love: '可能有异地恋或旅行中的邂逅。',
      career: '可能有出差、海外业务或跨地区合作。',
      finance: '国际贸易或跨境投资机会。',
      health: '适合旅行疗养。',
      timing: '1-3周内',
      advice: '勇于探索新领域。'
    }
  },
  {
    id: 4, name: '房子', nameEn: 'House',
    keywords: ['家庭', '安全', '稳定', '传统'],
    meaning: {
      general: '房子代表家庭、安全感和稳定。关注家庭事务。',
      love: '关系稳定，可能涉及到同居或家庭生活。',
      career: '工作环境稳定，可能与房地产相关。',
      finance: '财务状况稳定，适合投资房产。',
      health: '注意居家健康，保持规律作息。',
      timing: '1-4周内',
      advice: '重视家庭，建立稳定基础。'
    }
  },
  {
    id: 5, name: '树', nameEn: 'Tree',
    keywords: ['健康', '成长', '根基', '耐心'],
    meaning: {
      general: '树代表健康、成长和深厚的根基。需要耐心等待。',
      love: '感情需要时间培养，有长期发展潜力。',
      career: '职业发展需要耐心，适合长期规划。',
      finance: '财务稳步增长，适合长期投资。',
      health: '关注整体健康，适合养生。',
      timing: '1-6个月',
      advice: '保持耐心，让事物自然成长。'
    }
  },
  {
    id: 6, name: '云', nameEn: 'Clouds',
    keywords: ['困惑', '不确定', '障碍', '模糊'],
    meaning: {
      general: '云代表困惑和不确定性。事情可能不明朗。',
      love: '感情中存在不确定性，可能有误解。',
      career: '工作中遇到阻碍或不确定性。',
      finance: '财务状况不明朗，避免重大投资。',
      health: '可能有轻微健康问题。',
      timing: '不确定，需要等待',
      advice: '保持冷静，等待迷雾散去。'
    }
  },
  {
    id: 7, name: '蛇', nameEn: 'Snake',
    keywords: ['背叛', '诱惑', '智慧', '复杂'],
    meaning: {
      general: '蛇代表复杂的情况、诱惑或背叛。需要谨慎。',
      love: '可能遇到第三者或感情中的欺骗。',
      career: '工作中可能遇到复杂的人际关系。',
      finance: '小心财务陷阱或欺诈。',
      health: '注意女性健康问题。',
      timing: '复杂，需要耐心处理',
      advice: '保持警惕，运用智慧应对。'
    }
  },
  {
    id: 8, name: '棺材', nameEn: 'Coffin',
    keywords: ['结束', '转变', '新生', '放下'],
    meaning: {
      general: '棺材代表结束和转变。虽然可能经历失去，但这也是新生的开始。',
      love: '旧的关系可能结束，为新的开始腾出空间。',
      career: '可能结束一个阶段或项目。',
      finance: '可能有财务损失，但也是重新规划的机会。',
      health: '注意身体健康，可能需要改变习惯。',
      timing: '1-4周内',
      advice: '接受结束，为新生做准备。'
    }
  },
  {
    id: 9, name: '花束', nameEn: 'Bouquet',
    keywords: ['礼物', '欣赏', '美好', '社交'],
    meaning: {
      general: '花束代表美好的事物、礼物和社交活动。',
      love: '收到礼物或浪漫的惊喜。',
      career: '得到认可和赞赏。',
      finance: '可能收到礼物或意外收入。',
      health: '身心愉悦，适合放松。',
      timing: '1-2周内',
      advice: '开放心态，接受美好。'
    }
  },
  {
    id: 10, name: '镰刀', nameEn: 'Scythe',
    keywords: ['突然', '切断', '危险', '决定'],
    meaning: {
      general: '镰刀代表突然的变化、决定或危险。需要果断行动。',
      love: '可能突然结束关系或做出重要决定。',
      career: '可能面临突然的变化或裁员。',
      finance: '可能有突然的财务损失。',
      health: '注意安全，可能有意外伤害。',
      timing: '突然发生',
      advice: '保持警觉，果断应对变化。'
    }
  },
  {
    id: 11, name: '鞭子', nameEn: 'Whip',
    keywords: ['冲突', '争论', '重复', '激情'],
    meaning: {
      general: '鞭子代表冲突、争论或重复的模式。',
      love: '可能有争吵或感情冲突。',
      career: '工作中可能有争论或竞争。',
      finance: '可能有财务纠纷。',
      health: '适合运动，但注意不要过度。',
      timing: '反复出现',
      advice: '控制情绪，理性处理冲突。'
    }
  },
  {
    id: 12, name: '鸟', nameEn: 'Birds',
    keywords: ['焦虑', '谈话', '社交', '八卦'],
    meaning: {
      general: '鸟代表社交活动、谈话和轻微的焦虑。',
      love: '可能有约会或社交活动。',
      career: '会议和讨论增多。',
      finance: '可能有小额支出。',
      health: '可能有焦虑或失眠。',
      timing: '1-2天内',
      advice: '保持冷静，注意有效沟通。'
    }
  },
  {
    id: 13, name: '小孩', nameEn: 'Child',
    keywords: ['新开始', '天真', '小', '纯真'],
    meaning: {
      general: '小孩代表新的开始、天真和纯真。',
      love: '新的恋情开始，或者关系回归纯真。',
      career: '新项目或新工作开始。',
      finance: '小额投资或新的理财计划。',
      health: '注意儿童健康。',
      timing: '新的开始',
      advice: '保持开放和学习的心态。'
    }
  },
  {
    id: 14, name: '狐狸', nameEn: 'Fox',
    keywords: ['狡猾', '工作', '伪装', '谨慎'],
    meaning: {
      general: '狐狸代表需要谨慎和智慧。可能有人在欺骗你。',
      love: '可能有欺骗或不诚实。',
      career: '工作中需要运用策略。',
      finance: '小心财务陷阱。',
      health: '可能有隐藏的健康问题。',
      timing: '需要时间观察',
      advice: '保持警惕，运用智慧保护自己。'
    }
  },
  {
    id: 15, name: '熊', nameEn: 'Bear',
    keywords: ['力量', '权威', '保护', '财富'],
    meaning: {
      general: '熊代表力量、权威和保护。可能有强大的支持者。',
      love: '关系中有保护和支持。',
      career: '得到权威人士的支持。',
      finance: '财务状况强劲。',
      health: '身体强壮。',
      timing: '1-3周内',
      advice: '相信自己的力量。'
    }
  },
  {
    id: 16, name: '星星', nameEn: 'Stars',
    keywords: ['希望', '灵感', '清晰', '命运'],
    meaning: {
      general: '星星代表希望、灵感和清晰的方向。好运即将到来。',
      love: '感情中有希望和美好前景。',
      career: '职业发展有明确方向。',
      finance: '财务前景乐观。',
      health: '身心状态良好。',
      timing: '1-4周内',
      advice: '相信直觉，追随你的星星。'
    }
  },
  {
    id: 17, name: '鹳', nameEn: 'Stork',
    keywords: ['改变', '搬家', '诞生', '更新'],
    meaning: {
      general: '鹳代表积极的改变、新生命或好消息。',
      love: '关系有积极的发展。可能有订婚或结婚。',
      career: '工作有积极变化。可能有晋升。',
      finance: '财务状况改善。',
      health: '健康改善。',
      timing: '1-2周内',
      advice: '拥抱变化，迎接新开始。'
    }
  },
  {
    id: 18, name: '狗', nameEn: 'Dog',
    keywords: ['忠诚', '朋友', '信任', '支持'],
    meaning: {
      general: '狗代表忠诚、友谊和信任。有可靠的朋友支持你。',
      love: '关系中充满忠诚和信任。',
      career: '有可靠的同事或合作伙伴。',
      finance: '有可靠的财务建议。',
      health: '有良好的支持系统。',
      timing: '随时',
      advice: '珍惜身边忠诚的朋友。'
    }
  },
  {
    id: 19, name: '塔', nameEn: 'Tower',
    keywords: ['孤独', '机构', '视野', '权威'],
    meaning: {
      general: '塔代表孤独、权威机构或高远的视野。',
      love: '可能感到孤独或关系中有距离感。',
      career: '与大公司或政府机构有关。',
      finance: '与银行或官方机构打交道。',
      health: '可能需要住院或在医疗机构。',
      timing: '1-6个月',
      advice: '建立清晰的界限。'
    }
  },
  {
    id: 20, name: '花园', nameEn: 'Garden',
    keywords: ['社交', '公众', '网络', '活动'],
    meaning: {
      general: '花园代表社交活动、公众场合和社区参与。',
      love: '在社交场合可能遇到心仪的人。',
      career: '适合社交和建立人脉。',
      finance: '可能有社交支出。',
      health: '适合户外活动。',
      timing: '1-2周内',
      advice: '积极参与社交活动。'
    }
  },
  {
    id: 21, name: '山', nameEn: 'Mountain',
    keywords: ['阻碍', '延迟', '挑战', '障碍'],
    meaning: {
      general: '山代表阻碍、延迟和挑战。需要耐心和毅力。',
      love: '关系中遇到阻碍或距离。',
      career: '工作中遇到困难或竞争对手。',
      finance: '财务上有障碍或延迟。',
      health: '可能有慢性健康问题。',
      timing: '延迟，需要耐心',
      advice: '保持耐心，坚持克服困难。'
    }
  },
  {
    id: 22, name: '十字路口', nameEn: 'Crossroads',
    keywords: ['选择', '决定', '方向', '犹豫'],
    meaning: {
      general: '十字路口代表面临选择和决定。',
      love: '可能面临感情选择。',
      career: '面临职业选择。',
      finance: '面临投资选择。',
      health: '需要选择治疗方案。',
      timing: '需要做出决定',
      advice: '仔细权衡利弊，做出明智选择。'
    }
  },
  {
    id: 23, name: '老鼠', nameEn: 'Mice',
    keywords: ['损失', '压力', '侵蚀', '焦虑'],
    meaning: {
      general: '老鼠代表小的损失、压力和焦虑。',
      love: '可能有小的误会或不安全感。',
      career: '工作中有小的损失或压力。',
      finance: '可能有小额损失或意外支出。',
      health: '可能有小的健康问题或焦虑。',
      timing: '逐渐发生',
      advice: '注意细节，避免小问题积累。'
    }
  },
  {
    id: 24, name: '心', nameEn: 'Heart',
    keywords: ['爱', '激情', '情感', '浪漫'],
    meaning: {
      general: '心代表爱情、激情和深厚的情感。',
      love: '充满爱和浪漫。关系深入发展。',
      career: '对工作充满热情。',
      finance: '可能因为爱情而支出。',
      health: '心脏健康。',
      timing: '1-2周内',
      advice: '跟随内心，勇敢去爱。'
    }
  },
  {
    id: 25, name: '戒指', nameEn: 'Ring',
    keywords: ['承诺', '合同', '循环', '婚姻'],
    meaning: {
      general: '戒指代表承诺、合同和循环。可能有订婚或结婚。',
      love: '可能有订婚、结婚或重要承诺。',
      career: '签订合同或达成合作。',
      finance: '签订财务合同。',
      health: '健康循环。',
      timing: '1-3周内',
      advice: '信守承诺，重视合作关系。'
    }
  },
  {
    id: 26, name: '书', nameEn: 'Book',
    keywords: ['秘密', '知识', '学习', '未知'],
    meaning: {
      general: '书代表秘密、知识和学习。可能有隐藏的信息。',
      love: '可能有秘密或未知的信息。',
      career: '需要学习新技能或知识。',
      finance: '可能有隐藏的财务信息。',
      health: '需要了解健康知识。',
      timing: '需要时间学习',
      advice: '保持学习，揭开未知的面纱。'
    }
  },
  {
    id: 27, name: '信', nameEn: 'Letter',
    keywords: ['消息', '文件', '沟通', '信息'],
    meaning: {
      general: '信代表消息、文件和书面沟通。',
      love: '可能收到情书或重要消息。',
      career: '收到重要文件或邮件。',
      finance: '收到财务文件或账单。',
      health: '收到医疗报告。',
      timing: '1-3天内',
      advice: '注意书面沟通。'
    }
  },
  {
    id: 28, name: '男人', nameEn: 'Man',
    keywords: ['男性', '阳性', '自我', '理性'],
    meaning: {
      general: '男人代表男性能量、理性思维和行动力。',
      love: '可能与重要男性有关。',
      career: '男性同事或领导很重要。',
      finance: '理性理财。',
      health: '注意男性健康问题。',
      timing: '与男性相关',
      advice: '发挥理性思维，果断行动。'
    }
  },
  {
    id: 29, name: '女人', nameEn: 'Woman',
    keywords: ['女性', '阴性', '自我', '直觉'],
    meaning: {
      general: '女人代表女性能量、直觉和关怀。',
      love: '可能与重要女性有关。',
      career: '女性同事或领导很重要。',
      finance: '直觉理财。',
      health: '注意女性健康问题。',
      timing: '与女性相关',
      advice: '发挥直觉，关怀他人。'
    }
  },
  {
    id: 30, name: '百合', nameEn: 'Lily',
    keywords: ['成熟', '和平', '智慧', '家庭'],
    meaning: {
      general: '百合代表成熟、和平和智慧。',
      love: '关系成熟稳定。',
      career: '经验丰富，智慧决策。',
      finance: '财务稳定。',
      health: '身体健康，心态平和。',
      timing: '1-6个月',
      advice: '享受平静，发挥智慧。'
    }
  },
  {
    id: 31, name: '太阳', nameEn: 'Sun',
    keywords: ['成功', '能量', '乐观', '快乐'],
    meaning: {
      general: '太阳代表成功、能量和乐观。一切都在向好的方向发展。',
      love: '感情充满阳光和快乐。',
      career: '事业成功，得到认可。',
      finance: '财务成功，收入增加。',
      health: '身体健康，精力充沛。',
      timing: '1-2周内',
      advice: '保持乐观，迎接成功。'
    }
  },
  {
    id: 32, name: '月亮', nameEn: 'Moon',
    keywords: ['情感', '直觉', '名声', '浪漫'],
    meaning: {
      general: '月亮代表情感、直觉和名声。情感生活丰富。',
      love: '浪漫的感情，直觉很强。',
      career: '获得认可和名声。',
      finance: '财务状况良好。',
      health: '注意情绪健康。',
      timing: '1-4周内',
      advice: '相信直觉，追随内心。'
    }
  },
  {
    id: 33, name: '钥匙', nameEn: 'Key',
    keywords: ['解决方案', '命运', '重要', '突破'],
    meaning: {
      general: '钥匙代表解决方案、命运和重要突破。问题即将解决。',
      love: '感情问题得到解决。',
      career: '找到解决问题的方法。',
      finance: '财务问题解决。',
      health: '找到健康问题的解决方案。',
      timing: '1-3天内',
      advice: '相信答案就在眼前。'
    }
  },
  {
    id: 34, name: '鱼', nameEn: 'Fish',
    keywords: ['金钱', '流动', '丰富', '商业'],
    meaning: {
      general: '鱼代表金钱、丰富和自由。财务状况良好。',
      love: '感情中享受自由和丰富。',
      career: '商业机会多，收入丰厚。',
      finance: '财务丰富，收入增加。',
      health: '身体健康，享受生活。',
      timing: '1-3周内',
      advice: '享受丰富，保持流动。'
    }
  },
  {
    id: 35, name: '锚', nameEn: 'Anchor',
    keywords: ['稳定', '长期', '坚持', '安全'],
    meaning: {
      general: '锚代表稳定、长期和坚持。保持稳定，坚持目标。',
      love: '关系稳定，长期发展。',
      career: '工作稳定，长期发展。',
      finance: '财务稳定，长期投资。',
      health: '健康稳定。',
      timing: '长期，稳定发展',
      advice: '保持稳定，坚持目标。'
    }
  },
  {
    id: 36, name: '十字架', nameEn: 'Cross',
    keywords: ['负担', '信仰', '痛苦', '考验'],
    meaning: {
      general: '十字架代表负担、考验和信仰。可能经历困难，但这是成长的机会。',
      love: '感情中有考验或负担。',
      career: '工作中有困难或考验。',
      finance: '财务上有负担或考验。',
      health: '可能有健康考验。',
      timing: '考验期',
      advice: '接受考验，保持信仰。'
    }
  }
];

// 获取牌
export function getLenormandCard(id: number): LenormandCard | undefined {
  return LENORMAND_DECK.find(card => card.id === id);
}

// 随机抽牌
export function drawLenormandCards(count: number): LenormandCard[] {
  const shuffled = [...LENORMAND_DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
