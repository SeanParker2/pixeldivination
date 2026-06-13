/**
 * 塔罗牌完整数据库 - 后端使用
 * 包含78张韦特塔罗牌的详细牌意
 */

export interface TarotCard {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: string;
  upright: {
    keywords: string[];
    meaning: string;
    love: string;
    career: string;
    finance: string;
    health: string;
  };
  reversed: {
    keywords: string[];
    meaning: string;
    love: string;
    career: string;
    finance: string;
    health: string;
  };
}

// 大阿卡纳完整数据
const MAJOR_ARCANA: TarotCard[] = [
  {
    id: 0, name: '愚者', nameEn: 'The Fool', arcana: 'major',
    upright: {
      keywords: ['新的开始', '冒险', '自由', '天真'],
      meaning: '愚者代表着新的开始和无限的可能性。你正站在人生的十字路口，准备踏上新的旅程。保持开放的心态，相信宇宙的指引。',
      love: '可能遇到新的恋情，或者现有关系进入新阶段。保持开放和真诚。',
      career: '新的工作机会或项目即将来临。大胆尝试创新想法。',
      finance: '可能会有意外的收入机会，但要谨慎评估风险。',
      health: '身心状态良好，适合开始新的健身计划。'
    },
    reversed: {
      keywords: ['鲁莽', '冒险', '不计后果'],
      meaning: '愚者逆位提醒你可能过于冲动。在做决定前需要更多的思考和规划。',
      love: '可能因为冲动而做出错误的感情决定。',
      career: '可能会遇到计划外的变动，需要做好准备。',
      finance: '避免冲动消费或高风险投资。',
      health: '注意安全，避免危险活动。'
    }
  },
  {
    id: 1, name: '魔术师', nameEn: 'The Magician', arcana: 'major',
    upright: {
      keywords: ['创造力', '显化', '技能', '意志力'],
      meaning: '魔术师代表着将想法变为现实的能力。你拥有实现目标所需的一切资源和技能。',
      love: '你有能力吸引理想的伴侣。主动表达你的感受。',
      career: '你的才能将得到认可，适合展示自己的能力。',
      finance: '有很好的赚钱机会，你的努力将获得回报。',
      health: '身体状况良好，精力充沛。'
    },
    reversed: {
      keywords: ['欺骗', '操纵', '能力不足'],
      meaning: '魔术师逆位可能意味着你没有充分利用自己的能力。',
      love: '可能存在欺骗或不诚实的行为。',
      career: '能力没有得到充分发挥，或者遇到了阻碍。',
      finance: '可能存在财务欺骗或投资失误的风险。',
      health: '注意精神压力，避免过度劳累。'
    }
  },
  {
    id: 2, name: '女祭司', nameEn: 'The High Priestess', arcana: 'major',
    upright: {
      keywords: ['直觉', '潜意识', '内在智慧'],
      meaning: '女祭司象征着内在的智慧和直觉力。倾听你内心的声音，答案就在你的潜意识中。',
      love: '相信你的直觉来判断感情。可能有隐藏的感情等待发现。',
      career: '在做决定前需要更多的观察和思考。',
      finance: '保守理财，避免冲动决策。',
      health: '关注心理健康，冥想和放松有助于健康。'
    },
    reversed: {
      keywords: ['忽视直觉', '表面化', '秘密'],
      meaning: '女祭司逆位提醒你可能忽视了自己的直觉。',
      love: '可能忽视了感情中的警告信号。',
      career: '缺乏深入思考，可能做出仓促的决定。',
      finance: '可能忽视了重要的财务信息。',
      health: '可能忽视了身体发出的信号。'
    }
  },
  {
    id: 3, name: '女皇', nameEn: 'The Empress', arcana: 'major',
    upright: {
      keywords: ['丰饶', '母性', '自然', '创造'],
      meaning: '女皇代表着丰饶和创造力。这是一个充满爱和滋养的时期。',
      love: '感情生活丰富美满，可能迎来新生命或更深的承诺。',
      career: '创造力旺盛，适合从事艺术或创意工作。',
      finance: '财运亨通，享受物质生活的丰盛。',
      health: '身体健康，适合怀孕或生育。'
    },
    reversed: {
      keywords: ['依赖', '创造力受阻', '忽视自我'],
      meaning: '女皇逆位可能意味着你在忽视自己的需求。',
      love: '可能过度付出而忽视了自己的需求。',
      career: '创造力受阻，可能感到疲惫。',
      finance: '可能过度消费或忽视理财。',
      health: '注意女性健康问题。'
    }
  },
  {
    id: 4, name: '皇帝', nameEn: 'The Emperor', arcana: 'major',
    upright: {
      keywords: ['权威', '结构', '稳定', '领导力'],
      meaning: '皇帝代表着秩序和稳定。建立清晰的结构和规则，用理性指导行动。',
      love: '关系稳定，可能涉及到承诺或正式化关系。',
      career: '展现出领导才能，获得权威地位。',
      finance: '稳健理财，建立长期的财务计划。',
      health: '保持规律的生活习惯。'
    },
    reversed: {
      keywords: ['专制', '控制', '僵化'],
      meaning: '皇帝逆位可能意味着过度控制或缺乏灵活性。',
      love: '可能存在控制欲过强或缺乏情感表达。',
      career: '可能遇到专制的领导或管理问题。',
      finance: '可能过于保守而错失机会。',
      health: '注意因压力导致的健康问题。'
    }
  },
  {
    id: 5, name: '教皇', nameEn: 'The Hierophant', arcana: 'major',
    upright: {
      keywords: ['传统', '信仰', '教育', '指引'],
      meaning: '教皇象征着传统智慧和精神指引。寻求导师或社群来获得支持。',
      love: '传统的关系发展，可能涉及到婚约或正式承诺。',
      career: '遵循既定的规则和流程，向有经验的人学习。',
      finance: '保守理财，遵循传统的投资方式。',
      health: '寻求专业的医疗建议。'
    },
    reversed: {
      keywords: ['叛逆', '非传统', '打破规则'],
      meaning: '教皇逆位鼓励你打破常规，用独立思考来解决问题。',
      love: '可能选择非传统的关系模式。',
      career: '可能需要挑战现有规则或创新。',
      finance: '尝试新的理财方式。',
      health: '探索替代疗法或新的健康理念。'
    }
  },
  {
    id: 6, name: '恋人', nameEn: 'The Lovers', arcana: 'major',
    upright: {
      keywords: ['爱情', '选择', '和谐', '价值观'],
      meaning: '恋人牌代表着重要的选择和关系的和谐。跟随你的心，做出符合内心价值观的决定。',
      love: '遇到真爱或关系进入更深的层次。',
      career: '面临重要的职业选择。选择符合你价值观的方向。',
      finance: '可能需要在两个投资机会中做出选择。',
      health: '身心和谐，保持平衡的生活方式。'
    },
    reversed: {
      keywords: ['不和谐', '价值观冲突', '错误选择'],
      meaning: '恋人逆位可能意味着价值观冲突或做出了错误的选择。',
      love: '关系中存在冲突或不和谐。',
      career: '可能做出了与内心不符的职业选择。',
      finance: '投资决策可能存在价值观冲突。',
      health: '注意身心平衡。'
    }
  },
  {
    id: 7, name: '战车', nameEn: 'The Chariot', arcana: 'major',
    upright: {
      keywords: ['胜利', '意志力', '决心', '行动'],
      meaning: '战车代表着通过意志力和决心取得胜利。保持专注，你能够克服任何障碍。',
      love: '主动追求爱情，克服关系中的困难。',
      career: '通过努力和决心取得职业成功。',
      finance: '积极的财务行动带来收益。',
      health: '通过毅力改善健康状况。'
    },
    reversed: {
      keywords: ['失控', '缺乏方向', '挫败'],
      meaning: '战车逆位可能意味着失去控制或方向感。',
      love: '可能过于强势或缺乏耐心。',
      career: '可能遇到阻碍或失去动力。',
      finance: '可能因为冲动而做出错误的财务决定。',
      health: '注意控制情绪。'
    }
  },
  {
    id: 8, name: '力量', nameEn: 'Strength', arcana: 'major',
    upright: {
      keywords: ['勇气', '内在力量', '耐心', '自律'],
      meaning: '力量牌代表着内在的力量和温柔的勇气。用爱和耐心来克服困难。',
      love: '用温柔和理解来处理关系问题。',
      career: '展现出内在的力量和韧性。',
      finance: '保持耐心，稳健理财。',
      health: '身心强健，有很好的恢复力。'
    },
    reversed: {
      keywords: ['软弱', '自我怀疑', '缺乏信心'],
      meaning: '力量逆位可能意味着缺乏自信或被恐惧所控制。',
      love: '可能缺乏自信或过度依赖对方。',
      career: '可能感到无力或缺乏动力。',
      finance: '可能因为恐惧而做出错误决定。',
      health: '注意心理健康，增强自信。'
    }
  },
  {
    id: 9, name: '隐士', nameEn: 'The Hermit', arcana: 'major',
    upright: {
      keywords: ['内省', '独处', '智慧', '指引'],
      meaning: '隐士象征着向内探索和寻求智慧。这是一个反思和独处的时期。',
      love: '可能需要独处来思考感情问题。',
      career: '适合独立工作或深入研究。',
      finance: '保守理财，避免不必要的开支。',
      health: '关注内在健康，适合冥想和放松。'
    },
    reversed: {
      keywords: ['孤立', '逃避', '固执'],
      meaning: '隐士逆位可能意味着过度孤立或逃避现实。',
      love: '可能因为过度独处而错失感情机会。',
      career: '可能过于孤立而缺乏合作。',
      finance: '可能因为过于保守而错失机会。',
      health: '注意社交隔离对心理健康的影响。'
    }
  },
  {
    id: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', arcana: 'major',
    upright: {
      keywords: ['命运', '转折点', '好运', '循环'],
      meaning: '命运之轮代表着生命的循环和转折点。好运即将来临，把握机遇。',
      love: '感情生活迎来积极的转变。',
      career: '职业发展出现新的机遇。',
      finance: '财运好转，可能有意外收入。',
      health: '健康状况改善。'
    },
    reversed: {
      keywords: ['厄运', '抗拒改变', '延迟'],
      meaning: '命运之轮逆位可能意味着抗拒必要的改变或遇到挫折。',
      love: '感情可能遇到波折或延迟。',
      career: '职业发展可能受阻。',
      finance: '可能遇到财务困难。',
      health: '健康可能出现波动。'
    }
  },
  {
    id: 11, name: '正义', nameEn: 'Justice', arcana: 'major',
    upright: {
      keywords: ['公平', '真理', '因果', '平衡'],
      meaning: '正义代表着公平和因果法则。你的行为将得到公正的回报。',
      love: '关系中的付出将得到对等的回报。',
      career: '公正的评价和待遇。',
      finance: '公平的交易和投资回报。',
      health: '保持身心平衡。'
    },
    reversed: {
      keywords: ['不公平', '欺骗', '偏见'],
      meaning: '正义逆位可能意味着不公平或逃避责任。',
      love: '关系中可能存在不公平或欺骗。',
      career: '可能遇到不公平的待遇。',
      finance: '可能涉及不公平的交易。',
      health: '注意因不平衡导致的健康问题。'
    }
  },
  {
    id: 12, name: '倒吊人', nameEn: 'The Hanged Man', arcana: 'major',
    upright: {
      keywords: ['牺牲', '放手', '新视角', '等待'],
      meaning: '倒吊人象征着通过牺牲和放手来获得新的视角。有时候退一步海阔天空。',
      love: '可能需要为爱情做出牺牲或改变视角。',
      career: '暂时的停滞可能是为了更好的发展。',
      finance: '暂时的财务牺牲可能带来长期收益。',
      health: '适合休息和恢复。'
    },
    reversed: {
      keywords: ['拖延', '抗拒', '无谓牺牲'],
      meaning: '倒吊人逆位可能意味着无谓的牺牲或抗拒必要的改变。',
      love: '可能在关系中做出无谓的牺牲。',
      career: '可能因为拖延而错失机会。',
      finance: '可能因为犹豫而错失投资机会。',
      health: '可能忽视了健康问题。'
    }
  },
  {
    id: 13, name: '死神', nameEn: 'Death', arcana: 'major',
    upright: {
      keywords: ['结束', '转变', '重生', '放下'],
      meaning: '死神代表着结束和新的开始。放下旧的，迎接新的转变。',
      love: '旧的关系结束，新的开始来临。',
      career: '职业生涯的重大转变。',
      finance: '财务状况的重大变化。',
      health: '生活方式的重大改变。'
    },
    reversed: {
      keywords: ['抗拒改变', '恐惧', '停滞'],
      meaning: '死神逆位可能意味着抗拒必要的改变。',
      love: '可能害怕结束不健康的关系。',
      career: '可能害怕职业转变。',
      finance: '可能抗拒必要的财务改变。',
      health: '可能忽视了需要改变的生活习惯。'
    }
  },
  {
    id: 14, name: '节制', nameEn: 'Temperance', arcana: 'major',
    upright: {
      keywords: ['平衡', '耐心', '节制', '和谐'],
      meaning: '节制代表着平衡和和谐。在生活中寻找中庸之道。',
      love: '关系和谐，相互理解。',
      career: '工作与生活保持平衡。',
      finance: '稳健理财，收支平衡。',
      health: '身心健康，生活规律。'
    },
    reversed: {
      keywords: ['失衡', '过度', '缺乏耐心'],
      meaning: '节制逆位可能意味着生活失衡或过度行为。',
      love: '关系中可能存在不平衡。',
      career: '工作可能过于极端或失衡。',
      finance: '可能存在过度消费或投资。',
      health: '注意生活方式的极端行为。'
    }
  },
  {
    id: 15, name: '恶魔', nameEn: 'The Devil', arcana: 'major',
    upright: {
      keywords: ['束缚', '欲望', '物质', '阴影'],
      meaning: '恶魔代表着物质欲望和束缚。认清你的阴影面，才能获得自由。',
      love: '可能存在不健康的依赖或欲望。',
      career: '可能被物质利益所束缚。',
      finance: '可能过度追求物质财富。',
      health: '注意不良习惯和成瘾行为。'
    },
    reversed: {
      keywords: ['解放', '克服诱惑', '觉醒'],
      meaning: '恶魔逆位象征着从束缚中解放出来。',
      love: '摆脱不健康的关系模式。',
      career: '克服工作中的障碍。',
      finance: '克服财务困境。',
      health: '戒除不良习惯。'
    }
  },
  {
    id: 16, name: '高塔', nameEn: 'The Tower', arcana: 'major',
    upright: {
      keywords: ['突变', '破坏', '启示', '解放'],
      meaning: '高塔代表着突然的变化和破坏。虽然痛苦，但这是解放和觉醒的必经之路。',
      love: '关系可能发生突然的变化。',
      career: '职业生涯的重大变动。',
      finance: '财务状况的突然变化。',
      health: '突发的健康问题。'
    },
    reversed: {
      keywords: ['逃避灾难', '延迟变化', '恐惧改变'],
      meaning: '高塔逆位可能意味着逃避必要的改变。',
      love: '可能害怕面对关系中的问题。',
      career: '可能逃避必要的职业改变。',
      finance: '可能忽视财务风险。',
      health: '可能忽视健康警告。'
    }
  },
  {
    id: 17, name: '星星', nameEn: 'The Star', arcana: 'major',
    upright: {
      keywords: ['希望', '灵感', '宁静', '治愈'],
      meaning: '星星象征着希望和灵感。在困难之后，光明即将到来。',
      love: '感情充满希望和美好。',
      career: '职业发展充满可能性。',
      finance: '财务前景乐观。',
      health: '身心得到治愈。'
    },
    reversed: {
      keywords: ['失望', '缺乏信心', '绝望'],
      meaning: '星星逆位可能意味着失去希望或信心不足。',
      love: '可能对感情感到失望。',
      career: '可能对职业前景感到迷茫。',
      finance: '可能对财务状况感到担忧。',
      health: '可能感到身心疲惫。'
    }
  },
  {
    id: 18, name: '月亮', nameEn: 'The Moon', arcana: 'major',
    upright: {
      keywords: ['幻觉', '潜意识', '直觉', '恐惧'],
      meaning: '月亮代表着幻觉和不确定性。相信你的直觉，但不要被恐惧所控制。',
      love: '感情中可能存在幻觉或不确定性。',
      career: '职业发展中存在不确定性。',
      finance: '财务状况可能不明朗。',
      health: '注意心理健康和情绪波动。'
    },
    reversed: {
      keywords: ['释放恐惧', '真相', '清晰'],
      meaning: '月亮逆位象征着从幻觉中觉醒，看清真相。',
      love: '看清感情中的真相。',
      career: '职业发展变得更加清晰。',
      finance: '财务状况变得更加明朗。',
      health: '心理健康改善。'
    }
  },
  {
    id: 19, name: '太阳', nameEn: 'The Sun', arcana: 'major',
    upright: {
      keywords: ['成功', '快乐', '活力', '乐观'],
      meaning: '太阳象征着成功和快乐。这是一个充满阳光和成就的时期。',
      love: '感情生活幸福美满。',
      career: '职业发展取得成功。',
      finance: '财务状况良好。',
      health: '身体健康，精力充沛。'
    },
    reversed: {
      keywords: ['暂时受阻', '乐观过度', '延迟'],
      meaning: '太阳逆位可能意味着暂时的困难或过度乐观。',
      love: '可能存在一些小问题。',
      career: '成功可能被延迟。',
      finance: '可能有一些财务障碍。',
      health: '注意过度劳累。'
    }
  },
  {
    id: 20, name: '审判', nameEn: 'Judgement', arcana: 'major',
    upright: {
      keywords: ['觉醒', '重生', '召唤', '原谅'],
      meaning: '审判代表着精神上的觉醒和重生。聆听内心的召唤，迎接新的阶段。',
      love: '感情关系的重新评估和觉醒。',
      career: '职业生涯的重大觉醒和转变。',
      finance: '财务状况的重新评估。',
      health: '健康状况的改善和重生。'
    },
    reversed: {
      keywords: ['自我怀疑', '拒绝改变', '内疚'],
      meaning: '审判逆位可能意味着自我怀疑或拒绝必要的改变。',
      love: '可能因为过去的经历而犹豫不决。',
      career: '可能因为自我怀疑而错失机会。',
      finance: '可能因为犹豫而做出错误决定。',
      health: '可能忽视健康问题。'
    }
  },
  {
    id: 21, name: '世界', nameEn: 'The World', arcana: 'major',
    upright: {
      keywords: ['完成', '成就', '圆满', '整合'],
      meaning: '世界代表着一个周期的完成和圆满。你已经达到了目标，准备迎接新的旅程。',
      love: '感情关系达到圆满。',
      career: '职业生涯取得重大成就。',
      finance: '财务目标达成。',
      health: '身心健康达到最佳状态。'
    },
    reversed: {
      keywords: ['未完成', '延迟', '缺乏闭合'],
      meaning: '世界逆位可能意味着还有未完成的事情。',
      love: '关系可能还有未解决的问题。',
      career: '目标可能还未完全达成。',
      finance: '财务目标可能还有差距。',
      health: '健康可能还有改善空间。'
    }
  }
];

// 小阿卡纳详细牌意数据
const MINOR_MEANINGS: Record<string, Record<string, { 
  keywords: string[]; meaning: string; love: string; career: string; finance: string; health: string;
  reversed?: { keywords: string[]; meaning: string; love: string; career: string; finance: string; health: string; }
}>> = {
  wands: {
    ace: { 
      keywords: ['新开始', '灵感', '创造力'], 
      meaning: '权杖A代表新的开始和创造性的灵感。这是一个充满潜力的时刻，适合启动新项目。', 
      love: '新的恋情可能正在萌芽。', 
      career: '新的工作机会或创意项目即将来临。', 
      finance: '新的收入来源可能出现。', 
      health: '精力充沛，适合开始健身计划。',
      reversed: { keywords: ['延迟', '缺乏动力', '创意受阻'], meaning: '权杖A逆位表示新的开始被延迟，或者缺乏动力去追求目标。', love: '感情上可能感到迷茫。', career: '新项目可能遇到阻碍。', finance: '收入机会被延迟。', health: '精力不足，需要休息。' }
    },
    '2': { 
      keywords: ['规划', '决定', '展望'], 
      meaning: '权杖2代表规划和决策。你需要在多个选择中做出决定。', 
      love: '可能面临感情上的选择。', 
      career: '需要制定长期职业规划。', 
      finance: '考虑投资方向。', 
      health: '制定健康计划。',
      reversed: { keywords: ['犹豫不决', '缺乏规划', '错失机会'], meaning: '权杖2逆位表示犹豫不决，缺乏明确的规划。', love: '在感情中摇摆不定。', career: '职业规划不清晰。', finance: '投资决策困难。', health: '没有明确的健康目标。' }
    },
    '3': { 
      keywords: ['扩展', '远见', '领导'], 
      meaning: '权杖3代表扩展和远见。你的视野正在拓宽，新的机会即将到来。', 
      love: '关系可能进入新阶段。', 
      career: '有机会扩展业务或影响力。', 
      finance: '投资开始看到回报。', 
      health: '身体状态良好，保持锻炼。',
      reversed: { keywords: ['短视', '阻碍', '延迟'], meaning: '权杖3逆位表示视野受限，计划被延迟。', love: '关系发展受阻。', career: '业务扩展遇到困难。', finance: '投资回报延迟。', health: '需要调整锻炼计划。' }
    },
    '4': { 
      keywords: ['庆祝', '和谐', '稳定'], 
      meaning: '权杖4代表庆祝和和谐。经过努力，你正在享受成果。', 
      love: '关系稳定和谐。', 
      career: '工作环境和谐，团队合作顺利。', 
      finance: '财务稳定，可以享受生活。', 
      health: '身心平衡。',
      reversed: { keywords: ['不稳定', '冲突', '不和谐'], meaning: '权杖4逆位表示不稳定和冲突。', love: '关系中可能出现矛盾。', career: '工作环境不和谐。', finance: '财务状况不稳定。', health: '身心不平衡。' }
    },
    '5': { 
      keywords: ['竞争', '冲突', '挑战'], 
      meaning: '权杖5代表竞争和挑战。你可能面临激烈的竞争。', 
      love: '可能有情敌或感情竞争。', 
      career: '职场竞争激烈。', 
      finance: '财务上有竞争压力。', 
      health: '注意压力管理。',
      reversed: { keywords: ['避免冲突', '妥协', '内在冲突'], meaning: '权杖5逆位表示避免冲突或内在的挣扎。', love: '可能选择逃避感情问题。', career: '选择妥协而非竞争。', finance: '减少财务争端。', health: '内心冲突影响健康。' }
    },
    '6': { 
      keywords: ['胜利', '认可', '成功'], 
      meaning: '权杖6代表胜利和认可。你的努力得到了回报。', 
      love: '感情中获得认可。', 
      career: '获得晋升或表彰。', 
      finance: '财务成功。', 
      health: '身体状态良好。',
      reversed: { keywords: ['失败', '缺乏认可', '延迟'], meaning: '权杖6逆位表示努力没有得到认可或成功被延迟。', love: '感情中感到不被重视。', career: '晋升被延迟。', finance: '财务目标未达成。', health: '健康改善缓慢。' }
    },
    '7': { 
      keywords: ['坚持', '防御', '挑战'], 
      meaning: '权杖7代表坚持和防御。你需要捍卫自己的立场。', 
      love: '需要为关系而战。', 
      career: '面临挑战，需要坚持。', 
      finance: '保护自己的财务利益。', 
      health: '保持健康习惯。',
      reversed: { keywords: ['放弃', '过度防御', '压力'], meaning: '权杖7逆位表示放弃或过度防御。', love: '可能放弃一段关系。', career: '面对挑战选择退缩。', finance: '放弃财务目标。', health: '压力过大影响健康。' }
    },
    '8': { 
      keywords: ['行动', '速度', '进展'], 
      meaning: '权杖8代表快速行动和进展。事情正在加速发展。', 
      love: '感情发展迅速。', 
      career: '工作进展快速。', 
      finance: '财务变化快。', 
      health: '精力旺盛。',
      reversed: { keywords: ['延迟', '阻碍', '缺乏进展'], meaning: '权杖8逆位表示进展被延迟或受阻。', love: '感情发展缓慢。', career: '工作进展受阻。', finance: '财务状况停滞。', health: '精力恢复缓慢。' }
    },
    '9': { 
      keywords: ['毅力', '坚韧', '接近成功'], 
      meaning: '权杖9代表毅力和坚韧。你已经接近成功，需要坚持到底。', 
      love: '关系需要耐心经营。', 
      career: '坚持就是胜利。', 
      finance: '接近财务目标。', 
      health: '保持耐心，健康会改善。',
      reversed: { keywords: ['疲惫', '过度劳累', '放弃'], meaning: '权杖9逆位表示疲惫和想要放弃。', love: '对关系感到疲惫。', career: '工作压力过大。', finance: '财务压力让人疲惫。', health: '需要休息和恢复。' }
    },
    '10': { 
      keywords: ['负担', '责任', '过度'], 
      meaning: '权杖10代表负担和责任。你可能承担了过多的责任。', 
      love: '关系中感到压力。', 
      career: '工作负担过重。', 
      finance: '财务压力大。', 
      health: '注意休息，避免过劳。',
      reversed: { keywords: ['释放负担', '委派', '减轻'], meaning: '权杖10逆位表示释放负担或学会委派。', love: '学会在关系中分担。', career: '学会委派任务。', finance: '减轻财务压力。', health: '学会放松。' }
    },
    page: { 
      keywords: ['探索', '热情', '新机会'], 
      meaning: '权杖侍从代表探索和热情。对新事物充满好奇。', 
      love: '可能遇到心动的人。', 
      career: '新的学习机会。', 
      finance: '小额收入机会。', 
      health: '精力充沛。',
      reversed: { keywords: ['缺乏方向', '幼稚', '延迟'], meaning: '权杖侍从逆位表示缺乏方向或不够成熟。', love: '感情上不够成熟。', career: '学习态度不端正。', finance: '理财缺乏经验。', health: '精力分散。' }
    },
    knight: { 
      keywords: ['行动', '冒险', '追求'], 
      meaning: '权杖骑士代表行动和冒险。勇敢追求你的目标。', 
      love: '主动追求爱情。', 
      career: '积极行动。', 
      finance: '大胆投资。', 
      health: '活力充沛。',
      reversed: { keywords: ['冲动', '鲁莽', '延迟'], meaning: '权杖骑士逆位表示冲动或鲁莽的行为。', love: '追求方式过于激进。', career: '行动前需要三思。', finance: '投资过于冒险。', health: '避免过度运动。' }
    },
    queen: { 
      keywords: ['自信', '独立', '温暖'], 
      meaning: '权杖王后代表自信和独立。你有魅力和领导力。', 
      love: '在关系中保持独立。', 
      career: '展现领导才能。', 
      finance: '理财能力强。', 
      health: '身心状态良好。',
      reversed: { keywords: ['自私', '嫉妒', '控制'], meaning: '权杖王后逆位表示自私或控制欲强。', love: '在关系中过于强势。', career: '领导方式有问题。', finance: '理财过于保守。', health: '情绪影响健康。' }
    },
    king: { 
      keywords: ['领导', '远见', '魅力'], 
      meaning: '权杖国王代表领导和远见。你有能力带领团队。', 
      love: '在关系中扮演领导角色。', 
      career: '成为领导者。', 
      finance: '财务决策明智。', 
      health: '保持活力。',
      reversed: { keywords: ['专制', '傲慢', '缺乏远见'], meaning: '权杖国王逆位表示专制或缺乏远见。', love: '在关系中过于专制。', career: '领导方式需要改进。', finance: '财务决策失误。', health: '压力影响健康。' }
    }
  },
  cups: {
    ace: { keywords: ['新感情', '直觉', '创意'], meaning: '圣杯A代表新的感情和直觉。可能有新的恋情或情感上的新开始。', love: '新的恋情正在萌芽。', career: '工作中的创意灵感。', finance: '情感上的满足。', health: '心理健康良好。' },
    '2': { keywords: ['伙伴关系', '连接', '和谐'], meaning: '圣杯2代表伙伴关系和连接。两人之间的和谐关系。', love: '遇到灵魂伴侣或深化关系。', career: '良好的合作关系。', finance: '合作伙伴带来收益。', health: '情感健康。' },
    '3': { keywords: ['庆祝', '友谊', '社交'], meaning: '圣杯3代表庆祝和友谊。与朋友一起庆祝的时刻。', love: '社交活动中可能遇到心仪的人。', career: '团队合作愉快。', finance: '社交带来机会。', health: '心情愉快。' },
    '4': { keywords: ['冥想', '内省', '不满'], meaning: '圣杯4代表冥想和内省。可能对现状感到不满。', love: '对感情有些厌倦。', career: '需要新的刺激。', finance: '重新评估财务目标。', health: '需要放松和冥想。' },
    '5': { keywords: ['失落', '悲伤', '遗憾'], meaning: '圣杯5代表失落和悲伤。可能经历了情感上的损失。', love: '可能经历分手或失望。', career: '工作中的挫折。', finance: '财务损失。', health: '注意情绪健康。' },
    '6': { keywords: ['怀旧', '回忆', '纯真'], meaning: '圣杯6代表怀旧和回忆。美好的过去时光。', love: '与旧爱重逢或回忆美好时光。', career: '回归初心。', finance: '过去的投入开始回报。', health: '保持童心。' },
    '7': { keywords: ['幻想', '选择', '想象'], meaning: '圣杯7代表幻想和选择。面对多个选择。', love: '可能有多个追求者。', career: '面对职业选择。', finance: '投资需要谨慎。', health: '避免空想。' },
    '8': { keywords: ['离开', '放弃', '寻找更深'], meaning: '圣杯8代表离开和寻找更深的意义。', love: '可能需要离开不健康的关系。', career: '寻找更有意义的工作。', finance: '放弃短期利益追求长期目标。', health: '寻找内心的平静。' },
    '9': { keywords: ['满足', '愿望', '幸福'], meaning: '圣杯9代表满足和幸福。你的愿望即将实现。', love: '感情生活幸福美满。', career: '工作满足感强。', finance: '财务状况良好。', health: '身心愉悦。' },
    '10': { keywords: ['幸福', '和谐', '家庭'], meaning: '圣杯10代表家庭幸福和和谐。', love: '家庭生活幸福。', career: '工作与生活平衡。', finance: '家庭财务稳定。', health: '家庭和睦带来健康。' },
    page: { keywords: ['浪漫', '创意', '直觉'], meaning: '圣杯侍从代表浪漫和创意。充满想象力。', love: '收到浪漫的信息。', career: '创意工作有进展。', finance: '小额意外收入。', health: '保持乐观心态。' },
    knight: { keywords: ['浪漫', '魅力', '追求'], meaning: '圣杯骑士代表浪漫和魅力。追求爱情和美好。', love: '浪漫的追求者可能出现。', career: '工作中展现魅力。', finance: '投资需要谨慎。', health: '保持浪漫心态。' },
    queen: { keywords: ['同理心', '直觉', '关怀'], meaning: '圣杯王后代表同理心和关怀。你有很强的直觉力。', love: '在关系中展现关怀。', career: '善于倾听和理解。', finance: '理财需要直觉。', health: '关注情感健康。' },
    king: { keywords: ['情感智慧', '平衡', '外交'], meaning: '圣杯国王代表情感智慧和平衡。', love: '在关系中保持平衡。', career: '善于处理人际关系。', finance: '理财有道。', health: '情感与理智平衡。' }
  },
  swords: {
    ace: { keywords: ['清晰', '真理', '突破'], meaning: '宝剑A代表清晰和真理。突破迷雾，看清真相。', love: '坦诚沟通解决问题。', career: '找到解决问题的方法。', finance: '理清财务状况。', health: '头脑清醒。' },
    '2': { keywords: ['决定', '僵局', '逃避'], meaning: '宝剑2代表决定和僵局。面临两难选择。', love: '在感情中犹豫不决。', career: '面临职业选择。', finance: '投资决策困难。', health: '避免过度焦虑。' },
    '3': { keywords: ['心碎', '悲伤', '分离'], meaning: '宝剑3代表心碎和悲伤。经历情感上的痛苦。', love: '可能经历分手或背叛。', career: '工作中的失望。', finance: '财务损失带来痛苦。', health: '注意心脏健康。' },
    '4': { keywords: ['休息', '恢复', '冥想'], meaning: '宝剑4代表休息和恢复。需要暂停和恢复精力。', love: '给关系一些空间。', career: '需要休息调整。', finance: '暂停投资决策。', health: '需要充足休息。' },
    '5': { keywords: ['冲突', '失败', '不尊重'], meaning: '宝剑5代表冲突和失败。可能经历争执。', love: '与伴侣发生争执。', career: '职场冲突。', finance: '财务纠纷。', health: '避免情绪激动。' },
    '6': { keywords: ['过渡', '离开', '平静'], meaning: '宝剑6代表过渡和平静。离开困境，走向平静。', love: '走出感情困境。', career: '转换工作环境。', finance: '财务状况改善。', health: '身心恢复平静。' },
    '7': { keywords: ['欺骗', '策略', '逃避'], meaning: '宝剑7代表欺骗和策略。可能有人在欺骗你。', love: '小心感情中的欺骗。', career: '职场中需要策略。', finance: '避免投资骗局。', health: '诚面对自己的健康问题。' },
    '8': { keywords: ['束缚', '限制', '无力'], meaning: '宝剑8代表束缚和限制。感到无力和被困。', love: '在关系中感到束缚。', career: '工作中感到受限。', finance: '财务困难。', health: '打破不健康的习惯。' },
    '9': { keywords: ['焦虑', '恐惧', '噩梦'], meaning: '宝剑9代表焦虑和恐惧。可能有失眠或噩梦。', love: '对感情感到焦虑。', career: '工作压力大。', finance: '财务焦虑。', health: '注意心理健康。' },
    '10': { keywords: ['结束', '背叛', '痛苦'], meaning: '宝剑10代表结束和痛苦。一个艰难的阶段即将结束。', love: '关系可能结束。', career: '工作中的重大挫折。', finance: '财务上的重大损失。', health: '需要彻底休息。' },
    page: { keywords: ['好奇', '学习', '观察'], meaning: '宝剑侍从代表好奇和学习。对知识充满渴望。', love: '可能遇到聪明的对象。', career: '学习新技能。', finance: '研究投资机会。', health: '保持好奇心。' },
    knight: { keywords: ['行动', '直接', '勇敢'], meaning: '宝剑骑士代表行动和勇敢。直接面对挑战。', love: '直接表达感情。', career: '果断行动。', finance: '快速决策。', health: '积极锻炼。' },
    queen: { keywords: ['独立', '清晰', '直觉'], meaning: '宝剑王后代表独立和清晰。思维清晰，判断准确。', love: '在关系中保持独立。', career: '理性决策。', finance: '理财清晰。', health: '保持头脑清醒。' },
    king: { keywords: ['权威', '理性', '公正'], meaning: '宝剑国王代表权威和理性。以理性和公正领导。', love: '在关系中保持理性。', career: '成为权威人物。', finance: '理性理财。', health: '保持理智。' }
  },
  pentacles: {
    ace: { keywords: ['新机会', '繁荣', '新开始'], meaning: '星币A代表新的财务机会和繁荣。', love: '可能遇到经济条件好的对象。', career: '新的工作机会。', finance: '新的收入来源。', health: '身体状况改善。' },
    '2': { keywords: ['平衡', '适应', '优先'], meaning: '星币2代表平衡和适应。在多个事务中保持平衡。', love: '平衡工作和感情。', career: '多任务处理。', finance: '收支平衡。', health: '保持生活平衡。' },
    '3': { keywords: ['团队合作', '技能', '质量'], meaning: '星币3代表团队合作和技能。通过合作取得成果。', love: '关系中的合作。', career: '团队项目成功。', finance: '合作带来收益。', health: '专业医疗帮助。' },
    '4': { keywords: ['安全', '保守', '拥有'], meaning: '星币4代表安全和保守。保护自己的财产。', love: '在关系中有些保守。', career: '保护自己的职位。', finance: '保守理财。', health: '保持健康习惯。' },
    '5': { keywords: ['困难', '孤立', '贫穷'], meaning: '星币5代表困难和贫穷。可能经历财务困难。', love: '关系中感到匮乏。', career: '工作困难。', finance: '财务困难。', health: '注意健康问题。' },
    '6': { keywords: ['慷慨', '给予', '分享'], meaning: '星币6代表慷慨和分享。给予和接受的平衡。', love: '在关系中慷慨付出。', career: '帮助他人。', finance: '慷慨投资。', health: '分享健康知识。' },
    '7': { keywords: ['耐心', '长期投资', '等待'], meaning: '星币7代表耐心和长期投资。等待收获的时刻。', love: '耐心经营关系。', career: '长期职业规划。', finance: '长期投资。', health: '坚持健康习惯。' },
    '8': { keywords: ['技能', '勤奋', '专注'], meaning: '星币8代表技能和勤奋。通过专注和努力取得成功。', love: '用心经营关系。', career: '专业技能提升。', finance: '勤奋理财。', health: '专注健康。' },
    '9': { keywords: ['独立', '成功', '享受'], meaning: '星币9代表独立和成功。享受努力的成果。', love: '在关系中保持独立。', career: '事业成功。', finance: '财务独立。', health: '享受健康生活。' },
    '10': { keywords: ['财富', '家庭', '传承'], meaning: '星币10代表财富和家庭。家族财富和传承。', love: '家庭关系稳定。', career: '家族事业。', finance: '财富传承。', health: '家族健康。' },
    page: { keywords: ['学习', '新技能', '机会'], meaning: '星币侍从代表学习和新机会。', love: '可能遇到勤奋的对象。', career: '学习新技能。', finance: '理财学习。', health: '学习健康知识。' },
    knight: { keywords: ['勤奋', '可靠', '坚持'], meaning: '星币骑士代表勤奋和可靠。踏实前进。', love: '可靠的伴侣。', career: '勤奋工作。', finance: '稳健投资。', health: '坚持锻炼。' },
    queen: { keywords: ['实际', '安全', '关怀'], meaning: '星币王后代表实际和安全。创造稳定的生活。', love: '在关系中创造安全感。', career: '实际的管理者。', finance: '善于理财。', health: '关注身体健康。' },
    king: { keywords: ['成功', '领导', '财富'], meaning: '星币国王代表成功和财富。在物质领域取得成就。', love: '在关系中提供物质保障。', career: '事业有成。', finance: '财务成功。', health: '保持健康的生活方式。' }
  }
};

// 小阿卡纳数据生成
const SUITS = ['wands', 'cups', 'swords', 'pentacles'];
const SUIT_NAMES: Record<string, string> = { wands: '权杖', cups: '圣杯', swords: '宝剑', pentacles: '星币' };
const RANKS = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king'];
const RANK_NAMES: Record<string, string> = {
  ace: 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
  '8': '8', '9': '9', '10': '10', page: '侍从', knight: '骑士', queen: '王后', king: '国王'
};

function generateMinorArcana(): TarotCard[] {
  const cards: TarotCard[] = [];
  let id = 22;

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      const suitMeanings = MINOR_MEANINGS[suit];
      const rankMeaning = suitMeanings?.[rank];
      
      cards.push({
        id: id++,
        name: `${SUIT_NAMES[suit]}${RANK_NAMES[rank]}`,
        nameEn: `${RANK_NAMES[rank]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        arcana: 'minor',
        suit,
        upright: rankMeaning ? {
          keywords: rankMeaning.keywords,
          meaning: rankMeaning.meaning,
          love: rankMeaning.love,
          career: rankMeaning.career,
          finance: rankMeaning.finance,
          health: rankMeaning.health,
        } : {
          keywords: [`${SUIT_NAMES[suit]}能量`, '正向', '发展'],
          meaning: `${SUIT_NAMES[suit]}${RANK_NAMES[rank]}代表着${suit === 'wands' ? '行动和创造' : suit === 'cups' ? '情感和关系' : suit === 'swords' ? '思维和沟通' : '物质和财富'}方面的正向能量。`,
          love: '感情方面有积极的发展。',
          career: '职业发展顺利。',
          finance: '财务状况良好。',
          health: '身体健康。'
        },
        reversed: rankMeaning?.reversed ? {
          keywords: rankMeaning.reversed.keywords,
          meaning: rankMeaning.reversed.meaning,
          love: rankMeaning.reversed.love,
          career: rankMeaning.reversed.career,
          finance: rankMeaning.reversed.finance,
          health: rankMeaning.reversed.health,
        } : {
          keywords: ['阻碍', '延迟', '挑战'],
          meaning: `${SUIT_NAMES[suit]}${RANK_NAMES[rank]}逆位提示在相关领域可能遇到挑战。`,
          love: '感情方面可能遇到阻碍。',
          career: '职业发展可能受阻。',
          finance: '财务方面需要谨慎。',
          health: '注意健康问题。'
        }
      });
    }
  }

  return cards;
}

// 导出完整牌组
export const TAROT_DECK: TarotCard[] = [...MAJOR_ARCANA, ...generateMinorArcana()];

// 获取牌
export function getTarotCard(id: number): TarotCard | undefined {
  return TAROT_DECK.find(card => card.id === id);
}

// 随机抽牌
export function drawCards(count: number): { card: TarotCard; isReversed: boolean }[] {
  const shuffled = [...TAROT_DECK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => ({
    card,
    isReversed: Math.random() > 0.5
  }));
}
