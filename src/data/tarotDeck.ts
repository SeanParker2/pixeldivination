/**
 * 塔罗牌完整数据库
 * 包含78张韦特塔罗牌的详细牌意
 */

export interface TarotCardData {
  id: number;
  name: string;
  nameEn: string;
  arcana: 'major' | 'minor';
  suit?: 'wands' | 'cups' | 'swords' | 'pentacles';
  number?: number;
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
  element?: string;
  planet?: string;
  zodiac?: string;
  image: string;
}

// ========== 大阿卡纳 (Major Arcana) ==========
export const MAJOR_ARCANA: TarotCardData[] = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    arcana: 'major',
    number: 0,
    upright: {
      keywords: ['新的开始', '冒险', '自由', '天真', '信仰'],
      meaning: '愚者代表着新的开始和无限的可能性。它象征着纯真的心灵和对未知的勇敢探索。现在是踏上新旅程的最佳时机，放下顾虑，相信宇宙的指引。',
      love: '可能遇到新的恋情，或者现有关系进入新阶段。保持开放的心态，不要害怕表达真实的自己。',
      career: '新的工作机会或项目即将来临。大胆尝试创新想法，不要被传统束缚。',
      finance: '可能会有意外的收入或投资机会，但要谨慎评估风险。',
      health: '身心状态良好，适合开始新的健身计划或养生方式。'
    },
    reversed: {
      keywords: ['鲁莽', '冒险', '不计后果', '混乱', '延迟'],
      meaning: '愚者逆位提醒你可能过于冲动或不计后果。在做决定前需要更多的思考和规划，避免盲目冒险。',
      love: '可能因为冲动而做出错误的感情决定。需要更加谨慎地对待新关系。',
      career: '可能会遇到计划外的变动，需要做好充分准备。',
      finance: '避免冲动消费或高风险投资，保持理性理财。',
      health: '注意安全，避免危险活动。'
    },
    element: '风',
    planet: '天王星',
    image: '/images/tarot/the_fool.webp'
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    arcana: 'major',
    number: 1,
    upright: {
      keywords: ['创造力', '显化', '技能', '意志力', '自信'],
      meaning: '魔术师代表着将想法变为现实的能力。你拥有实现目标所需的一切资源和技能，现在是采取行动的最佳时机。',
      love: '你有能力吸引理想的伴侣或改善现有关系。主动表达你的感受。',
      career: '你的才能将得到认可，适合展示自己的能力和创意。',
      finance: '有很好的赚钱机会，你的努力将获得回报。',
      health: '身体状况良好，精力充沛。'
    },
    reversed: {
      keywords: ['欺骗', '操纵', '能力不足', '浪费天赋', '犹豫'],
      meaning: '魔术师逆位可能意味着你没有充分利用自己的能力，或者有人在欺骗你。',
      love: '可能存在欺骗或不诚实的行为。需要更加谨慎地了解对方。',
      career: '能力没有得到充分发挥，或者遇到了阻碍。',
      finance: '可能存在财务欺骗或投资失误的风险。',
      health: '注意精神压力，避免过度劳累。'
    },
    element: '风',
    planet: '水星',
    image: '/images/tarot/the_magician.webp'
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    arcana: 'major',
    number: 2,
    upright: {
      keywords: ['直觉', '潜意识', '内在智慧', '神秘', '耐心'],
      meaning: '女祭司象征着内在的智慧和直觉力。倾听你内心的声音，答案就在你的潜意识中。',
      love: '相信你的直觉来判断感情。可能有隐藏的感情等待你去发现。',
      career: '在做决定前需要更多的观察和思考。不要急于行动。',
      finance: '保守理财，避免冲动决策。可能有隐藏的财务信息。',
      health: '关注心理健康，冥想和放松有助于整体健康。'
    },
    reversed: {
      keywords: ['忽视直觉', '表面化', '秘密', '混乱', '依赖他人'],
      meaning: '女祭司逆位提醒你可能忽视了自己的直觉，或者过于依赖他人的意见。',
      love: '可能忽视了感情中的警告信号。需要更加关注内心的感受。',
      career: '缺乏深入思考，可能做出仓促的决定。',
      finance: '可能忽视了重要的财务信息。',
      health: '可能忽视了身体发出的信号。'
    },
    element: '水',
    planet: '月亮',
    image: '/images/tarot/the_priestess.webp'
  },
  {
    id: 3,
    name: '女皇',
    nameEn: 'The Empress',
    arcana: 'major',
    number: 3,
    upright: {
      keywords: ['丰饶', '母性', '自然', '创造', '美丽'],
      meaning: '女皇代表着丰饶和创造力。这是一个充满爱和滋养的时期，享受生活的美好。',
      love: '感情生活丰富美满，可能迎来新生命或更深的承诺。',
      career: '创造力旺盛，适合从事艺术或创意工作。',
      finance: '财运亨通，享受物质生活的丰盛。',
      health: '身体健康，适合怀孕或生育。'
    },
    reversed: {
      keywords: ['依赖', '创造力受阻', '忽视自我', '过度付出', '不安全感'],
      meaning: '女皇逆位可能意味着你在忽视自己的需求，或者创造力受到了阻碍。',
      love: '可能过度付出而忽视了自己的需求。',
      career: '创造力受阻，可能感到疲惫或不被欣赏。',
      finance: '可能过度消费或忽视理财。',
      health: '注意女性健康问题，避免过度劳累。'
    },
    element: '地',
    planet: '金星',
    image: '/images/tarot/the_empress.webp'
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    arcana: 'major',
    number: 4,
    upright: {
      keywords: ['权威', '结构', '稳定', '领导力', '保护'],
      meaning: '皇帝代表着秩序和稳定。建立清晰的结构和规则，用理性指导行动。',
      love: '关系稳定，可能涉及到承诺或正式化关系。',
      career: '展现出领导才能，获得权威地位。',
      finance: '稳健理财，建立长期的财务计划。',
      health: '保持规律的生活习惯，注重养生。'
    },
    reversed: {
      keywords: ['专制', '控制', '僵化', '缺乏纪律', '权力滥用'],
      meaning: '皇帝逆位可能意味着过度控制或缺乏灵活性。',
      love: '可能存在控制欲过强或缺乏情感表达。',
      career: '可能遇到专制的领导或管理问题。',
      finance: '可能过于保守而错失机会。',
      health: '注意因压力导致的健康问题。'
    },
    element: '火',
    planet: '火星',
    image: '/images/tarot/the_emperor.webp'
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    arcana: 'major',
    number: 5,
    upright: {
      keywords: ['传统', '信仰', '教育', '指引', '归属'],
      meaning: '教皇象征着传统智慧和精神指引。寻求导师或加入社群来获得支持。',
      love: '传统的关系发展，可能涉及到婚约或正式承诺。',
      career: '遵循既定的规则和流程，向有经验的人学习。',
      finance: '保守理财，遵循传统的投资方式。',
      health: '寻求专业的医疗建议。'
    },
    reversed: {
      keywords: ['叛逆', '非传统', '打破规则', '独立思考', '挑战权威'],
      meaning: '教皇逆位鼓励你打破常规，用独立思考来解决问题。',
      love: '可能选择非传统的关系模式。',
      career: '可能需要挑战现有规则或创新。',
      finance: '尝试新的理财方式。',
      health: '探索替代疗法或新的健康理念。'
    },
    element: '地',
    planet: '金星',
    image: '/images/tarot/the_hierophant.webp'
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    arcana: 'major',
    number: 6,
    upright: {
      keywords: ['爱情', '选择', '和谐', '价值观', '结合'],
      meaning: '恋人牌代表着重要的选择和关系的和谐。跟随你的心，做出符合内心价值观的决定。',
      love: '遇到真爱或关系进入更深的层次。需要做出重要的感情选择。',
      career: '面临重要的职业选择。选择符合你价值观的方向。',
      finance: '可能需要在两个投资机会中做出选择。',
      health: '身心和谐，保持平衡的生活方式。'
    },
    reversed: {
      keywords: ['不和谐', '价值观冲突', '错误选择', '犹豫不决', '分离'],
      meaning: '恋人逆位可能意味着价值观冲突或做出了错误的选择。',
      love: '关系中存在冲突或不和谐。需要重新审视彼此的价值观。',
      career: '可能做出了与内心不符的职业选择。',
      finance: '投资决策可能存在价值观冲突。',
      health: '注意身心平衡，避免极端行为。'
    },
    element: '风',
    planet: '水星',
    image: '/images/tarot/the_lovers.webp'
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    arcana: 'major',
    number: 7,
    upright: {
      keywords: ['胜利', '意志力', '决心', '行动', '克服困难'],
      meaning: '战车代表着通过意志力和决心取得胜利。保持专注，你能够克服任何障碍。',
      love: '主动追求爱情，克服关系中的困难。',
      career: '通过努力和决心取得职业成功。',
      finance: '积极的财务行动带来收益。',
      health: '通过毅力改善健康状况。'
    },
    reversed: {
      keywords: ['失控', '缺乏方向', '挫败', '攻击性', '阻碍'],
      meaning: '战车逆位可能意味着失去控制或方向感。',
      love: '可能过于强势或缺乏耐心。',
      career: '可能遇到阻碍或失去动力。',
      finance: '可能因为冲动而做出错误的财务决定。',
      health: '注意控制情绪，避免过度劳累。'
    },
    element: '水',
    planet: '月亮',
    image: '/images/tarot/the_chariot.webp'
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    arcana: 'major',
    number: 8,
    upright: {
      keywords: ['勇气', '内在力量', '耐心', '同情心', '自律'],
      meaning: '力量牌代表着内在的力量和温柔的勇气。用爱和耐心来克服困难。',
      love: '用温柔和理解来处理关系问题。',
      career: '展现出内在的力量和韧性。',
      finance: '保持耐心，稳健理财。',
      health: '身心强健，有很好的恢复力。'
    },
    reversed: {
      keywords: ['软弱', '自我怀疑', '缺乏信心', '失控', '暴力'],
      meaning: '力量逆位可能意味着缺乏自信或被恐惧所控制。',
      love: '可能缺乏自信或过度依赖对方。',
      career: '可能感到无力或缺乏动力。',
      finance: '可能因为恐惧而做出错误决定。',
      health: '注意心理健康，增强自信。'
    },
    element: '火',
    planet: '太阳',
    image: '/images/tarot/strength.webp'
  },
  {
    id: 9,
    name: '隐士',
    nameEn: 'The Hermit',
    arcana: 'major',
    number: 9,
    upright: {
      keywords: ['内省', '独处', '智慧', '指引', '寻找真理'],
      meaning: '隐士象征着向内探索和寻求智慧。这是一个反思和独处的时期。',
      love: '可能需要独处来思考感情问题。',
      career: '适合独立工作或深入研究。',
      finance: '保守理财，避免不必要的开支。',
      health: '关注内在健康，适合冥想和放松。'
    },
    reversed: {
      keywords: ['孤立', '逃避', '固执', '拒绝帮助', '孤独'],
      meaning: '隐士逆位可能意味着过度孤立或逃避现实。',
      love: '可能因为过度独处而错失感情机会。',
      career: '可能过于孤立而缺乏合作。',
      finance: '可能因为过于保守而错失机会。',
      health: '注意社交隔离对心理健康的影响。'
    },
    element: '地',
    planet: '水星',
    image: '/images/tarot/the_hermit.webp'
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    arcana: 'major',
    number: 10,
    upright: {
      keywords: ['命运', '转折点', '好运', '因果', '循环'],
      meaning: '命运之轮代表着生命的循环和转折点。好运即将来临，把握机遇。',
      love: '感情生活迎来积极的转变。',
      career: '职业发展出现新的机遇。',
      finance: '财运好转，可能有意外收入。',
      health: '健康状况改善。'
    },
    reversed: {
      keywords: ['厄运', '抗拒改变', '失控', '延迟', '外在因素'],
      meaning: '命运之轮逆位可能意味着抗拒必要的改变或遇到挫折。',
      love: '感情可能遇到波折或延迟。',
      career: '职业发展可能受阻。',
      finance: '可能遇到财务困难。',
      health: '健康可能出现波动。'
    },
    element: '火',
    planet: '木星',
    image: '/images/tarot/wheel_of_fortune.webp'
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    arcana: 'major',
    number: 11,
    upright: {
      keywords: ['公平', '真理', '因果', '平衡', '法律'],
      meaning: '正义代表着公平和因果法则。你的行为将得到公正的回报。',
      love: '关系中的付出将得到对等的回报。',
      career: '公正的评价和待遇。',
      finance: '公平的交易和投资回报。',
      health: '保持身心平衡。'
    },
    reversed: {
      keywords: ['不公平', '欺骗', '偏见', '逃避责任', '法律问题'],
      meaning: '正义逆位可能意味着不公平或逃避责任。',
      love: '关系中可能存在不公平或欺骗。',
      career: '可能遇到不公平的待遇。',
      finance: '可能涉及不公平的交易。',
      health: '注意因不平衡导致的健康问题。'
    },
    element: '风',
    planet: '金星',
    image: '/images/tarot/justice.webp'
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    arcana: 'major',
    number: 12,
    upright: {
      keywords: ['牺牲', '放手', '新视角', '等待', '内省'],
      meaning: '倒吊人象征着通过牺牲和放手来获得新的视角。有时候退一步海阔天空。',
      love: '可能需要为爱情做出牺牲或改变视角。',
      career: '暂时的停滞可能是为了更好的发展。',
      finance: '暂时的财务牺牲可能带来长期收益。',
      health: '适合休息和恢复。'
    },
    reversed: {
      keywords: ['拖延', '抗拒', '无谓牺牲', '固执', '停滞'],
      meaning: '倒吊人逆位可能意味着无谓的牺牲或抗拒必要的改变。',
      love: '可能在关系中做出无谓的牺牲。',
      career: '可能因为拖延而错失机会。',
      finance: '可能因为犹豫而错失投资机会。',
      health: '可能忽视了健康问题。'
    },
    element: '水',
    planet: '海王星',
    image: '/images/tarot/the_hanged_man.webp'
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    arcana: 'major',
    number: 13,
    upright: {
      keywords: ['结束', '转变', '重生', '放下', '新生'],
      meaning: '死神代表着结束和新的开始。放下旧的，迎接新的转变。',
      love: '旧的关系结束，新的开始来临。',
      career: '职业生涯的重大转变。',
      finance: '财务状况的重大变化。',
      health: '生活方式的重大改变。'
    },
    reversed: {
      keywords: ['抗拒改变', '恐惧', '停滞', '延迟', '内省'],
      meaning: '死神逆位可能意味着抗拒必要的改变。',
      love: '可能害怕结束不健康的关系。',
      career: '可能害怕职业转变。',
      finance: '可能抗拒必要的财务改变。',
      health: '可能忽视了需要改变的生活习惯。'
    },
    element: '水',
    planet: '冥王星',
    image: '/images/tarot/death.webp'
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    arcana: 'major',
    number: 14,
    upright: {
      keywords: ['平衡', '耐心', '节制', '和谐', '治愈'],
      meaning: '节制代表着平衡和和谐。在生活中寻找中庸之道。',
      love: '关系和谐，相互理解。',
      career: '工作与生活保持平衡。',
      finance: '稳健理财，收支平衡。',
      health: '身心健康，生活规律。'
    },
    reversed: {
      keywords: ['失衡', '过度', '缺乏耐心', '冲突', '极端'],
      meaning: '节制逆位可能意味着生活失衡或过度行为。',
      love: '关系中可能存在不平衡。',
      career: '工作可能过于极端或失衡。',
      finance: '可能存在过度消费或投资。',
      health: '注意生活方式的极端行为。'
    },
    element: '火',
    planet: '木星',
    image: '/images/tarot/temperance.webp'
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    arcana: 'major',
    number: 15,
    upright: {
      keywords: ['束缚', '欲望', '物质', '阴影', '成瘾'],
      meaning: '恶魔代表着物质欲望和束缚。认清你的阴影面，才能获得自由。',
      love: '可能存在不健康的依赖或欲望。',
      career: '可能被物质利益所束缚。',
      finance: '可能过度追求物质财富。',
      health: '注意不良习惯和成瘾行为。'
    },
    reversed: {
      keywords: ['解放', '克服诱惑', '觉醒', '释放', '自由'],
      meaning: '恶魔逆位象征着从束缚中解放出来。',
      love: '摆脱不健康的关系模式。',
      career: '克服工作中的障碍。',
      finance: '克服财务困境。',
      health: '戒除不良习惯。'
    },
    element: '地',
    planet: '土星',
    image: '/images/tarot/the_devil.webp'
  },
  {
    id: 16,
    name: '高塔',
    nameEn: 'The Tower',
    arcana: 'major',
    number: 16,
    upright: {
      keywords: ['突变', '破坏', '启示', '解放', '真相'],
      meaning: '高塔代表着突然的变化和破坏。虽然痛苦，但这是解放和觉醒的必经之路。',
      love: '关系可能发生突然的变化。',
      career: '职业生涯的重大变动。',
      finance: '财务状况的突然变化。',
      health: '突发的健康问题。'
    },
    reversed: {
      keywords: ['逃避灾难', '延迟变化', '恐惧改变', '内在变化', '抗拒'],
      meaning: '高塔逆位可能意味着逃避必要的改变或内在的转变。',
      love: '可能害怕面对关系中的问题。',
      career: '可能逃避必要的职业改变。',
      finance: '可能忽视财务风险。',
      health: '可能忽视健康警告。'
    },
    element: '火',
    planet: '火星',
    image: '/images/tarot/the_tower.webp'
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    arcana: 'major',
    number: 17,
    upright: {
      keywords: ['希望', '灵感', '宁静', '治愈', '信心'],
      meaning: '星星象征着希望和灵感。在困难之后，光明即将到来。',
      love: '感情充满希望和美好。',
      career: '职业发展充满可能性。',
      finance: '财务前景乐观。',
      health: '身心得到治愈。'
    },
    reversed: {
      keywords: ['失望', '缺乏信心', '绝望', '断连', '创意受阻'],
      meaning: '星星逆位可能意味着失去希望或信心不足。',
      love: '可能对感情感到失望。',
      career: '可能对职业前景感到迷茫。',
      finance: '可能对财务状况感到担忧。',
      health: '可能感到身心疲惫。'
    },
    element: '风',
    planet: '天王星',
    image: '/images/tarot/the_star.webp'
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    arcana: 'major',
    number: 18,
    upright: {
      keywords: ['幻觉', '潜意识', '直觉', '恐惧', '不确定性'],
      meaning: '月亮代表着幻觉和不确定性。相信你的直觉，但不要被恐惧所控制。',
      love: '感情中可能存在幻觉或不确定性。',
      career: '职业发展中存在不确定性。',
      finance: '财务状况可能不明朗。',
      health: '注意心理健康和情绪波动。'
    },
    reversed: {
      keywords: ['释放恐惧', '真相', '清晰', '克服幻觉', '直觉增强'],
      meaning: '月亮逆位象征着从幻觉中觉醒，看清真相。',
      love: '看清感情中的真相。',
      career: '职业发展变得更加清晰。',
      finance: '财务状况变得更加明朗。',
      health: '心理健康改善。'
    },
    element: '水',
    planet: '海王星',
    image: '/images/tarot/the_moon.webp'
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    arcana: 'major',
    number: 19,
    upright: {
      keywords: ['成功', '快乐', '活力', '乐观', '成就'],
      meaning: '太阳象征着成功和快乐。这是一个充满阳光和成就的时期。',
      love: '感情生活幸福美满。',
      career: '职业发展取得成功。',
      finance: '财务状况良好。',
      health: '身体健康，精力充沛。'
    },
    reversed: {
      keywords: ['暂时受阻', '乐观过度', '延迟', '自我中心', '孤独'],
      meaning: '太阳逆位可能意味着暂时的困难或过度乐观。',
      love: '可能存在一些小问题。',
      career: '成功可能被延迟。',
      finance: '可能有一些财务障碍。',
      health: '注意过度劳累。'
    },
    element: '火',
    planet: '太阳',
    image: '/images/tarot/the_sun.webp'
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    arcana: 'major',
    number: 20,
    upright: {
      keywords: ['觉醒', '重生', '召唤', '反思', '原谅'],
      meaning: '审判代表着精神上的觉醒和重生。聆听内心的召唤，迎接新的阶段。',
      love: '感情关系的重新评估和觉醒。',
      career: '职业生涯的重大觉醒和转变。',
      finance: '财务状况的重新评估。',
      health: '健康状况的改善和重生。'
    },
    reversed: {
      keywords: ['自我怀疑', '拒绝改变', '内疚', '延迟', '逃避'],
      meaning: '审判逆位可能意味着自我怀疑或拒绝必要的改变。',
      love: '可能因为过去的经历而犹豫不决。',
      career: '可能因为自我怀疑而错失机会。',
      finance: '可能因为犹豫而做出错误决定。',
      health: '可能忽视健康问题。'
    },
    element: '火',
    planet: '冥王星',
    image: '/images/tarot/judgement.webp'
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    arcana: 'major',
    number: 21,
    upright: {
      keywords: ['完成', '成就', '圆满', '整合', '新旅程'],
      meaning: '世界代表着一个周期的完成和圆满。你已经达到了目标，准备迎接新的旅程。',
      love: '感情关系达到圆满。',
      career: '职业生涯取得重大成就。',
      finance: '财务目标达成。',
      health: '身心健康达到最佳状态。'
    },
    reversed: {
      keywords: ['未完成', '延迟', '缺乏闭合', '停滞', '重新开始'],
      meaning: '世界逆位可能意味着还有未完成的事情或需要重新开始。',
      love: '关系可能还有未解决的问题。',
      career: '目标可能还未完全达成。',
      finance: '财务目标可能还有差距。',
      health: '健康可能还有改善空间。'
    },
    element: '地',
    planet: '土星',
    image: '/images/tarot/the_universe.webp'
  }
];

// ========== 小阿卡纳 (Minor Arcana) ==========
const SUITS = {
  wands: { name: '权杖', element: '火', theme: '行动、创造、热情' },
  cups: { name: '圣杯', element: '水', theme: '情感、关系、直觉' },
  swords: { name: '宝剑', element: '风', theme: '思维、沟通、冲突' },
  pentacles: { name: '星币', element: '地', theme: '物质、金钱、健康' }
};

const RANKS = ['ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'page', 'knight', 'queen', 'king'];
const RANK_NAMES: Record<string, string> = {
  ace: 'A', '2': '2', '3': '3', '4': '4', '5': '5', '6': '6', '7': '7',
  '8': '8', '9': '9', '10': '10', page: '侍从', knight: '骑士', queen: '王后', king: '国王'
};

// 生成小阿卡纳
function generateMinorArcana(): TarotCardData[] {
  const cards: TarotCardData[] = [];
  let id = 22;

  for (const [suit, suitData] of Object.entries(SUITS)) {
    for (const rank of RANKS) {
      const isCourt = ['page', 'knight', 'queen', 'king'].includes(rank);
      
      cards.push({
        id: id++,
        name: `${suitData.name}${RANK_NAMES[rank]}`,
        nameEn: `${RANK_NAMES[rank]} of ${suit.charAt(0).toUpperCase() + suit.slice(1)}`,
        arcana: 'minor',
        suit: suit as any,
        number: RANKS.indexOf(rank),
        upright: {
          keywords: getMinorKeywords(suit, rank, 'upright'),
          meaning: getMinorMeaning(suit, rank, 'upright'),
          love: getMinorLove(suit, rank, 'upright'),
          career: getMinorCareer(suit, rank, 'upright'),
          finance: getMinorFinance(suit, rank, 'upright'),
          health: getMinorHealth(suit, rank, 'upright')
        },
        reversed: {
          keywords: getMinorKeywords(suit, rank, 'reversed'),
          meaning: getMinorMeaning(suit, rank, 'reversed'),
          love: getMinorLove(suit, rank, 'reversed'),
          career: getMinorCareer(suit, rank, 'reversed'),
          finance: getMinorFinance(suit, rank, 'reversed'),
          health: getMinorHealth(suit, rank, 'reversed')
        },
        element: suitData.element,
        image: `/images/tarot/${rank}_of_${suit}.webp`
      });
    }
  }

  return cards;
}

// 小阿卡纳牌意生成函数
function getMinorKeywords(suit: string, rank: string, position: string): string[] {
  const keywords: Record<string, Record<string, Record<string, string[]>>> = {
    wands: {
      ace: { upright: ['新开始', '灵感', '创造力'], reversed: ['延迟', '缺乏动力', '创意受阻'] },
      '2': { upright: ['规划', '决定', '展望'], reversed: ['缺乏规划', '犹豫', '错失机会'] },
      '3': { upright: ['扩展', '远见', '领导力'], reversed: ['短视', '阻碍', '延迟'] },
      '4': { upright: ['庆祝', '和谐', '稳定'], reversed: ['不稳定', '延迟', '冲突'] },
      '5': { upright: ['竞争', '冲突', '挑战'], reversed: ['避免冲突', '妥协', '内在冲突'] },
      '6': { upright: ['胜利', '认可', '成功'], reversed: ['失败', '缺乏认可', '延迟'] },
      '7': { upright: ['坚持', '防御', '挑战'], reversed: ['放弃', '过度防御', '压力'] },
      '8': { upright: ['行动', '速度', '进展'], reversed: ['延迟', '阻碍', '缺乏进展'] },
      '9': { upright: ['毅力', '坚韧', '接近成功'], reversed: ['疲惫', '过度劳累', '放弃'] },
      '10': { upright: ['负担', '责任', '过度'], reversed: ['释放负担', '委派', '减轻'] },
      page: { upright: ['探索', '热情', '新机会'], reversed: ['缺乏方向', '幼稚', '延迟'] },
      knight: { upright: ['行动', '冒险', '追求'], reversed: ['冲动', '鲁莽', '延迟'] },
      queen: { upright: ['自信', '独立', '温暖'], reversed: ['自私', '嫉妒', '控制'] },
      king: { upright: ['领导', '远见', '魅力'], reversed: ['专制', '傲慢', '缺乏远见'] }
    },
    cups: {
      ace: { upright: ['新感情', '直觉', '创意'], reversed: ['情感受阻', '空虚', '错过'] },
      '2': { upright: ['伙伴关系', '连接', '和谐'], reversed: ['失衡', '分离', '误解'] },
      '3': { upright: ['庆祝', '友谊', '社交'], reversed: ['过度', '孤立', '取消'] },
      '4': { upright: ['冥想', '内省', '不满'], reversed: ['觉醒', '新机会', '行动'] },
      '5': { upright: ['失落', '悲伤', '遗憾'], reversed: ['接受', '前进', '恢复'] },
      '6': { upright: ['怀旧', '回忆', '纯真'], reversed: ['困在过去', '不切实际', '停滞'] },
      '7': { upright: ['幻想', '选择', '想象'], reversed: ['清醒', '集中', '现实'] },
      '8': { upright: ['离开', '放弃', '寻找更深'], reversed: ['恐惧改变', '停滞', '回归'] },
      '9': { upright: ['满足', '愿望', '幸福'], reversed: ['贪婪', '不满', '延迟'] },
      '10': { upright: ['幸福', '和谐', '家庭'], reversed: ['家庭问题', '不和谐', '分离'] },
      page: { upright: ['浪漫', '创意', '直觉'], reversed: ['情感不成熟', '嫉妒', '创意受阻'] },
      knight: { upright: ['浪漫', '魅力', '追求'], reversed: ['不忠', '情感操纵', '虚假'] },
      queen: { upright: ['同理心', '直觉', '关怀'], reversed: ['情感依赖', '不安全', '操纵'] },
      king: { upright: ['情感智慧', '平衡', '外交'], reversed: ['情感压抑', '操纵', '冷漠'] }
    },
    swords: {
      ace: { upright: ['清晰', '真理', '突破'], reversed: ['混乱', '误解', '延迟'] },
      '2': { upright: ['决定', '僵局', '逃避'], reversed: ['信息过载', '决定', '释放'] },
      '3': { upright: ['心碎', '悲伤', '分离'], reversed: ['恢复', '释放', '原谅'] },
      '4': { upright: ['休息', '恢复', '冥想'], reversed: ['焦虑', '不安', '回归'] },
      '5': { upright: ['冲突', '失败', '不尊重'], reversed: ['接受失败', '和解', '释放'] },
      '6': { upright: ['过渡', '离开', '平静'], reversed: ['停滞', '无法前进', '回归'] },
      '7': { upright: ['欺骗', '策略', '逃避'], reversed: ['真相', '坦诚', '面对'] },
      '8': { upright: ['束缚', '限制', '无力'], reversed: ['解放', '新视角', '自由'] },
      '9': { upright: ['焦虑', '恐惧', '噩梦'], reversed: ['放下', '恢复', '希望'] },
      '10': { upright: ['结束', '背叛', '痛苦'], reversed: ['恢复', '重生', '新开始'] },
      page: { upright: ['好奇', '学习', '观察'], reversed: ['缺乏经验', '恶意', '延迟'] },
      knight: { upright: ['行动', '直接', '勇敢'], reversed: ['冲动', '鲁莽', '冲突'] },
      queen: { upright: ['独立', '清晰', '直觉'], reversed: ['冷酷', '尖刻', '孤独'] },
      king: { upright: ['权威', '理性', '公正'], reversed: ['专制', '冷酷', '不公'] }
    },
    pentacles: {
      ace: { upright: ['新机会', '繁荣', '新开始'], reversed: ['错失机会', '缺乏规划', '延迟'] },
      '2': { upright: ['平衡', '适应', '优先'], reversed: ['失衡', '过度', '忽视'] },
      '3': { upright: ['团队合作', '技能', '质量'], reversed: ['缺乏合作', '平庸', '延迟'] },
      '4': { upright: ['安全', '保守', '拥有'], reversed: ['贪婪', '过度消费', '不安全'] },
      '5': { upright: ['困难', '孤立', '贫穷'], reversed: ['恢复', '帮助', '改善'] },
      '6': { upright: ['慷慨', '给予', '分享'], reversed: ['自私', '债务', '不公平'] },
      '7': { upright: ['耐心', '长期投资', '等待'], reversed: ['缺乏耐心', '急于求成', '浪费'] },
      '8': { upright: ['技能', '勤奋', '专注'], reversed: ['缺乏目标', '平庸', '延迟'] },
      '9': { upright: ['独立', '成功', '享受'], reversed: ['过度依赖', '孤独', '不安全'] },
      '10': { upright: ['财富', '家庭', '传承'], reversed: ['家庭问题', '财务不稳定', '分离'] },
      page: { upright: ['学习', '新技能', '机会'], reversed: ['缺乏学习', '延迟', '不切实际'] },
      knight: { upright: ['勤奋', '可靠', '坚持'], reversed: ['懒惰', '不靠谱', '延迟'] },
      queen: { upright: ['实际', '安全', '关怀'], reversed: ['过度关注物质', '嫉妒', '不安全'] },
      king: { upright: ['成功', '领导', '财富'], reversed: ['贪婪', '过度控制', '财务问题'] }
    }
  };

  return keywords[suit]?.[rank]?.[position] || ['指引', '启示', '智慧'];
}

function getMinorMeaning(suit: string, rank: string, position: string): string {
  const suitName = SUITS[suit as keyof typeof SUITS]?.name || suit;
  const rankName = RANK_NAMES[rank] || rank;
  
  if (position === 'upright') {
    return `${suitName}${rankName}代表着${SUITS[suit as keyof typeof SUITS]?.theme}方面的能量。这张牌提示你在相关领域有积极的发展。`;
  } else {
    return `${suitName}${rankName}逆位提示你在${SUITS[suit as keyof typeof SUITS]?.theme}方面可能遇到一些挑战或阻碍。`;
  }
}

function getMinorLove(suit: string, rank: string, position: string): string {
  if (position === 'upright') {
    return '感情方面有积极的发展，保持开放的心态。';
  }
  return '感情方面可能遇到一些挑战，需要更多的沟通和理解。';
}

function getMinorCareer(suit: string, rank: string, position: string): string {
  if (position === 'upright') {
    return '职业发展顺利，有机会展现自己的能力。';
  }
  return '职业方面可能遇到阻碍，需要调整策略。';
}

function getMinorFinance(suit: string, rank: string, position: string): string {
  if (position === 'upright') {
    return '财务状况良好，适合稳健投资。';
  }
  return '财务方面需要谨慎，避免冲动消费。';
}

function getMinorHealth(suit: string, rank: string, position: string): string {
  if (position === 'upright') {
    return '身体状况良好，保持健康的生活方式。';
  }
  return '注意身体健康，避免过度劳累。';
}

// 生成完整牌组
export const TAROT_DECK: TarotCardData[] = [...MAJOR_ARCANA, ...generateMinorArcana()];

// 获取牌的详细解读
export function getCardReading(card: TarotCardData, isReversed: boolean, context?: string): string {
  const position = isReversed ? 'reversed' : 'upright';
  const data = card[position];
  
  let reading = `【${card.name}】(${card.nameEn})${isReversed ? ' - 逆位' : ''}\n\n`;
  reading += `核心含义：${data.meaning}\n\n`;
  reading += `关键词：${data.keywords.join('、')}\n\n`;
  reading += `感情：${data.love}\n`;
  reading += `事业：${data.career}\n`;
  reading += `财运：${data.finance}\n`;
  reading += `健康：${data.health}`;
  
  return reading;
}

// 牌阵解读
export function getSpreadReading(cards: { card: TarotCardData; isReversed: boolean; position: string }[]): string {
  let reading = '=== 塔罗牌阵解读 ===\n\n';
  
  for (const { card, isReversed, position } of cards) {
    reading += `【${position}】\n`;
    reading += getCardReading(card, isReversed);
    reading += '\n\n---\n\n';
  }
  
  return reading;
}
