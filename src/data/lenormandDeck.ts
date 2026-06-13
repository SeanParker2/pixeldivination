/**
 * 雷诺曼完整数据库
 * 包含36张雷诺曼牌的详细牌意
 */

export interface LenormandCardData {
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
  playingCard: string;
  image: string;
}

export const LENORMAND_DECK: LenormandCardData[] = [
  {
    id: 1,
    name: '骑士',
    nameEn: 'Rider',
    keywords: ['消息', '到来', '速度', '行动', '新开始'],
    meaning: {
      general: '骑士代表好消息的到来或新的开始。可能有人来访或收到期待已久的消息。行动和进展是这张牌的核心主题。',
      love: '新的恋情可能出现，或者现有关系有新的进展。单身者可能遇到心动的人。',
      career: '工作上有新的机会或消息。可能收到面试邀请或项目进展。',
      finance: '可能收到意外的收入或好消息。投资有积极回报。',
      health: '身体状况良好，精力充沛。适合开始新的健身计划。',
      timing: '很快，1-2天内',
      advice: '保持警觉，准备好迎接新机会。'
    },
    playingCard: '红心9',
    image: '/images/lenormand/01_rider.webp'
  },
  {
    id: 2,
    name: '三叶草',
    nameEn: 'Clover',
    keywords: ['幸运', '机会', '快乐', '小确幸', '乐观'],
    meaning: {
      general: '三叶草象征小幸运和意外的快乐。保持乐观的心态，好运就在身边。',
      love: '感情中会有小惊喜，可能收到浪漫的礼物或甜蜜的时刻。',
      career: '工作上有小的突破或好消息。可能得到意外的帮助。',
      finance: '可能有小额意外收入或优惠。适合小额投资。',
      health: '身体状况不错，心情愉快有助于健康。',
      timing: '1-2天内，或每周二',
      advice: '保持乐观，享受生活中的小确幸。'
    },
    playingCard: '梅花6',
    image: '/images/lenormand/02_clover.webp'
  },
  {
    id: 3,
    name: '船',
    nameEn: 'Ship',
    keywords: ['旅行', '距离', '商业', '探索', '移动'],
    meaning: {
      general: '船代表旅行、探索和商业活动。可能有出差、旅行或与远方有关的事务。',
      love: '可能有异地恋或旅行中的邂逅。关系需要更多探索。',
      career: '可能有出差、海外业务或跨地区合作。商业机会来自远方。',
      finance: '国际贸易或跨境投资机会。可能有外汇收入。',
      health: '适合旅行疗养。注意旅途中的健康。',
      timing: '1-3周内',
      advice: '勇于探索新领域，不要局限在舒适区。'
    },
    playingCard: '黑桃10',
    image: '/images/lenormand/03_ship.webp'
  },
  {
    id: 4,
    name: '房子',
    nameEn: 'House',
    keywords: ['家庭', '安全', '稳定', '传统', '根基'],
    meaning: {
      general: '房子代表家庭、安全感和稳定。关注家庭事务，建立坚实的基础。',
      love: '关系稳定，可能涉及到同居或家庭生活。重视家庭价值观。',
      career: '工作环境稳定，可能与房地产或家居相关。适合建立长期事业。',
      finance: '财务状况稳定，适合投资房产或储蓄。',
      health: '注意居家健康，保持规律的生活作息。',
      timing: '1-4周内，或每月4号',
      advice: '重视家庭，建立稳定的生活基础。'
    },
    playingCard: '红心4',
    image: '/images/lenormand/04_house.webp'
  },
  {
    id: 5,
    name: '树',
    nameEn: 'Tree',
    keywords: ['健康', '成长', '根基', '生命力', '耐心'],
    meaning: {
      general: '树代表健康、成长和深厚的根基。需要耐心等待事物自然发展。',
      love: '感情需要时间培养，可能有长期发展的潜力。关系根基深厚。',
      career: '职业发展需要耐心，适合长期规划。可能与医疗或环保相关。',
      finance: '财务稳步增长，适合长期投资。避免急功近利。',
      health: '关注整体健康，适合养生。可能有慢性健康问题需要关注。',
      timing: '1-6个月，或春季',
      advice: '保持耐心，让事物自然成长。'
    },
    playingCard: '黑桃5',
    image: '/images/lenormand/05_tree.webp'
  },
  {
    id: 6,
    name: '云',
    nameEn: 'Clouds',
    keywords: ['困惑', '不确定', '障碍', '模糊', '犹豫'],
    meaning: {
      general: '云代表困惑和不确定性。事情可能不明朗，需要耐心等待迷雾散去。',
      love: '感情中存在不确定性，可能有误解或沟通不畅。',
      career: '工作中遇到阻碍或不确定性。需要更多信息才能做决定。',
      finance: '财务状况不明朗，避免重大投资决定。',
      health: '可能有轻微健康问题，注意休息。',
      timing: '不确定，需要等待',
      advice: '保持冷静，等待迷雾散去再做决定。'
    },
    playingCard: '梅花K',
    image: '/images/lenormand/06_clouds.webp'
  },
  {
    id: 7,
    name: '蛇',
    nameEn: 'Snake',
    keywords: ['背叛', '诱惑', '智慧', '复杂', '女性'],
    meaning: {
      general: '蛇代表复杂的情况、诱惑或背叛。需要谨慎处理人际关系，运用智慧解决问题。',
      love: '可能遇到第三者或感情中的欺骗。需要警惕诱惑。',
      career: '工作中可能遇到复杂的人际关系或竞争。保持警惕。',
      finance: '小心财务陷阱或欺诈。避免冲动投资。',
      health: '注意女性健康问题。可能有隐性疾病。',
      timing: '复杂，需要耐心处理',
      advice: '保持警惕，运用智慧应对复杂情况。'
    },
    playingCard: '梅花Q',
    image: '/images/lenormand/07_snake.webp'
  },
  {
    id: 8,
    name: '棺材',
    nameEn: 'Coffin',
    keywords: ['结束', '转变', '新生', '放下', '重生'],
    meaning: {
      general: '棺材代表结束和转变。虽然可能经历失去，但这也是新生的开始。',
      love: '旧的关系可能结束，为新的开始腾出空间。需要放下过去。',
      career: '可能结束一个阶段或项目。为新的职业发展做准备。',
      finance: '可能有财务损失，但也是重新规划的机会。',
      health: '注意身体健康，可能需要改变不良习惯。',
      timing: '1-4周内，或秋季',
      advice: '接受结束，为新生做准备。'
    },
    playingCard: '黑桃9',
    image: '/images/lenormand/08_coffin.webp'
  },
  {
    id: 9,
    name: '花束',
    nameEn: 'Bouquet',
    keywords: ['礼物', '欣赏', '美好', '社交', '祝福'],
    meaning: {
      general: '花束代表美好的事物、礼物和社交活动。享受生活中的美好时刻。',
      love: '收到礼物或浪漫的惊喜。社交活动中可能遇到心仪的人。',
      career: '得到认可和赞赏。可能有庆祝活动或奖励。',
      finance: '可能收到礼物或意外收入。财务状况良好。',
      health: '身心愉悦，适合放松和享受。',
      timing: '1-2周内，或生日/节日',
      advice: '开放心态，接受生活中的美好。'
    },
    playingCard: '红心J',
    image: '/images/lenormand/09_bouquet.webp'
  },
  {
    id: 10,
    name: '镰刀',
    nameEn: 'Scythe',
    keywords: ['突然', '切断', '危险', '决定', '果断'],
    meaning: {
      general: '镰刀代表突然的变化、决定或危险。需要果断行动，避免犹豫不决。',
      love: '可能突然结束关系或做出重要决定。需要果断处理感情问题。',
      career: '可能面临突然的变化或裁员。需要快速适应。',
      finance: '可能有突然的财务损失。避免高风险投资。',
      health: '注意安全，可能有意外伤害。手术相关。',
      timing: '突然发生，无法预测',
      advice: '保持警觉，果断应对变化。'
    },
    playingCard: '黑桃J',
    image: '/images/lenormand/10_scythe.webp'
  },
  {
    id: 11,
    name: '鞭子',
    nameEn: 'Whip',
    keywords: ['冲突', '争论', '重复', '运动', '激情'],
    meaning: {
      general: '鞭子代表冲突、争论或重复的模式。可能有激烈的讨论或体育活动。',
      love: '可能有争吵或感情冲突。需要控制情绪。',
      career: '工作中可能有争论或竞争。需要保持专业态度。',
      finance: '可能有财务纠纷。避免冲动决策。',
      health: '适合运动，但注意不要过度。可能有炎症。',
      timing: '反复出现，需要耐心',
      advice: '控制情绪，理性处理冲突。'
    },
    playingCard: '梅花J',
    image: '/images/lenormand/11_whip.webp'
  },
  {
    id: 12,
    name: '鸟',
    nameEn: 'Birds',
    keywords: ['焦虑', '谈话', '社交', '八卦', '沟通'],
    meaning: {
      general: '鸟代表社交活动、谈话和轻微的焦虑。注意沟通方式，避免八卦。',
      love: '可能有约会或社交活动。注意沟通中的误解。',
      career: '会议和讨论增多。注意职场八卦。',
      finance: '可能有小额支出。避免冲动消费。',
      health: '可能有焦虑或失眠。注意心理健康。',
      timing: '1-2天内，或早上',
      advice: '保持冷静，注意有效沟通。'
    },
    playingCard: '黑桃7',
    image: '/images/lenormand/12_birds.webp'
  },
  {
    id: 13,
    name: '小孩',
    nameEn: 'Child',
    keywords: ['新开始', '天真', '小', '纯真', '依赖'],
    meaning: {
      general: '小孩代表新的开始、天真和纯真。可能有新项目或新关系的开始。',
      love: '新的恋情开始，或者关系回归纯真。可能与孩子有关。',
      career: '新项目或新工作开始。需要学习和成长。',
      finance: '小额投资或新的理财计划开始。',
      health: '注意儿童健康。可能需要更多休息。',
      timing: '新的开始，1-3天内',
      advice: '保持开放和学习的心态。'
    },
    playingCard: '红心10',
    image: '/images/lenormand/13_child.webp'
  },
  {
    id: 14,
    name: '狐狸',
    nameEn: 'Fox',
    keywords: ['狡猾', '工作', '伪装', '谨慎', '智慧'],
    meaning: {
      general: '狐狸代表需要谨慎和智慧。可能有人在欺骗你，或者需要运用策略。',
      love: '可能有欺骗或不诚实。需要谨慎了解对方。',
      career: '工作中需要运用策略。可能有职场政治。',
      finance: '小心财务陷阱。避免轻信他人。',
      health: '可能有隐藏的健康问题。定期体检。',
      timing: '需要时间观察',
      advice: '保持警惕，运用智慧保护自己。'
    },
    playingCard: '梅花9',
    image: '/images/lenormand/14_fox.webp'
  },
  {
    id: 15,
    name: '熊',
    nameEn: 'Bear',
    keywords: ['力量', '权威', '保护', '财富', '母亲'],
    meaning: {
      general: '熊代表力量、权威和保护。可能有强大的支持者或财务增长。',
      love: '关系中有保护和支持。可能有强势的伴侣。',
      career: '得到权威人士的支持。可能有晋升机会。',
      finance: '财务状况强劲。可能有投资回报。',
      health: '身体强壮，但注意控制饮食。',
      timing: '1-3周内，或每月15号',
      advice: '相信自己的力量，保护好自己的利益。'
    },
    playingCard: '红心6',
    image: '/images/lenormand/15_bear.webp'
  },
  {
    id: 16,
    name: '星星',
    nameEn: 'Stars',
    keywords: ['希望', '灵感', '清晰', '命运', '成功'],
    meaning: {
      general: '星星代表希望、灵感和清晰的方向。好运和成功即将到来。',
      love: '感情中有希望和美好前景。命运般的相遇。',
      career: '职业发展有明确方向。灵感和创意涌现。',
      finance: '财务前景乐观。可能有意外收入。',
      health: '身心状态良好。精神焕发。',
      timing: '1-4周内，或夜晚',
      advice: '相信直觉，追随你的星星。'
    },
    playingCard: '红心6',
    image: '/images/lenormand/16_stars.webp'
  },
  {
    id: 17,
    name: '鹳',
    nameEn: 'Stork',
    keywords: ['改变', '搬家', '诞生', '更新', '消息'],
    meaning: {
      general: '鹳代表积极的改变、新生命或好消息。可能有搬家、旅行或新开始。',
      love: '关系有积极的发展。可能有订婚、结婚或怀孕。',
      career: '工作有积极变化。可能有晋升或新机会。',
      finance: '财务状况改善。可能有好消息。',
      health: '健康改善。可能有好消息。',
      timing: '1-2周内，或春季',
      advice: '拥抱变化，迎接新开始。'
    },
    playingCard: '红心Q',
    image: '/images/lenormand/17_stork.webp'
  },
  {
    id: 18,
    name: '狗',
    nameEn: 'Dog',
    keywords: ['忠诚', '朋友', '信任', '支持', '依赖'],
    meaning: {
      general: '狗代表忠诚、友谊和信任。有可靠的朋友或伴侣支持你。',
      love: '关系中充满忠诚和信任。可能有好朋友介绍对象。',
      career: '有可靠的同事或合作伙伴。得到支持。',
      finance: '有可靠的财务建议。朋友可能提供帮助。',
      health: '有良好的支持系统。朋友关心你的健康。',
      timing: '随时，朋友一直在',
      advice: '珍惜身边忠诚的朋友。'
    },
    playingCard: '红心10',
    image: '/images/lenormand/18_dog.webp'
  },
  {
    id: 19,
    name: '塔',
    nameEn: 'Tower',
    keywords: ['孤独', '机构', '视野', '权威', '界限'],
    meaning: {
      general: '塔代表孤独、权威机构或高远的视野。可能需要独处或与官方打交道。',
      love: '可能感到孤独或关系中有距离感。需要个人空间。',
      career: '与大公司或政府机构有关。可能有晋升机会。',
      finance: '与银行或官方机构打交道。长期财务规划。',
      health: '可能需要住院或在医疗机构。注意心理健康。',
      timing: '1-6个月，或长期',
      advice: '建立清晰的界限，提升自己的视野。'
    },
    playingCard: '黑桃6',
    image: '/images/lenormand/19_tower.webp'
  },
  {
    id: 20,
    name: '花园',
    nameEn: 'Garden',
    keywords: ['社交', '公众', '网络', '活动', '社区'],
    meaning: {
      general: '花园代表社交活动、公众场合和社区参与。适合参加聚会或公共活动。',
      love: '在社交场合可能遇到心仪的人。参加聚会或活动。',
      career: '适合社交和建立人脉。参加行业活动。',
      finance: '可能有社交支出。公众投资机会。',
      health: '适合户外活动和社交。注意公共场所卫生。',
      timing: '1-2周内，或周末',
      advice: '积极参与社交活动，扩展人脉。'
    },
    playingCard: '黑桃Q',
    image: '/images/lenormand/20_garden.webp'
  },
  {
    id: 21,
    name: '山',
    nameEn: 'Mountain',
    keywords: ['阻碍', '延迟', '挑战', '障碍', '困难'],
    meaning: {
      general: '山代表阻碍、延迟和挑战。需要耐心和毅力来克服困难。',
      love: '关系中遇到阻碍或距离。需要耐心解决问题。',
      career: '工作中遇到困难或竞争对手。需要坚持。',
      finance: '财务上有障碍或延迟。避免冒险。',
      health: '可能有慢性健康问题。需要长期调养。',
      timing: '延迟，需要耐心等待',
      advice: '保持耐心，坚持克服困难。'
    },
    playingCard: '黑桃8',
    image: '/images/lenormand/21_mountain.webp'
  },
  {
    id: 22,
    name: '十字路口',
    nameEn: 'Crossroads',
    keywords: ['选择', '决定', '方向', '犹豫', '多元'],
    meaning: {
      general: '十字路口代表面临选择和决定。需要仔细考虑各种可能性。',
      love: '可能面临感情选择。需要做出决定。',
      career: '面临职业选择。有多个发展方向。',
      finance: '面临投资选择。需要谨慎决定。',
      health: '需要选择治疗方案。咨询专业意见。',
      timing: '需要做出决定',
      advice: '仔细权衡利弊，做出明智选择。'
    },
    playingCard: '梅花Q',
    image: '/images/lenormand/22_crossroads.webp'
  },
  {
    id: 23,
    name: '老鼠',
    nameEn: 'Mice',
    keywords: ['损失', '压力', '侵蚀', '焦虑', '小偷'],
    meaning: {
      general: '老鼠代表小的损失、压力和焦虑。注意细节，避免小问题积累。',
      love: '可能有小的误会或不安全感。注意细节。',
      career: '工作中有小的损失或压力。注意细节。',
      finance: '可能有小额损失或意外支出。注意节约。',
      health: '可能有小的健康问题或焦虑。注意休息。',
      timing: '逐渐发生，需要关注',
      advice: '注意细节，避免小问题积累。'
    },
    playingCard: '梅花10',
    image: '/images/lenormand/23_mice.webp'
  },
  {
    id: 24,
    name: '心',
    nameEn: 'Heart',
    keywords: ['爱', '激情', '情感', '浪漫', '幸福'],
    meaning: {
      general: '心代表爱情、激情和深厚的情感。感情生活丰富多彩。',
      love: '充满爱和浪漫。关系深入发展。',
      career: '对工作充满热情。可能与创意或服务相关。',
      finance: '可能因为爱情而支出。感情比金钱重要。',
      health: '心脏健康。保持心情愉快。',
      timing: '1-2周内，或情人节',
      advice: '跟随内心，勇敢去爱。'
    },
    playingCard: '红心J',
    image: '/images/lenormand/24_heart.webp'
  },
  {
    id: 25,
    name: '戒指',
    nameEn: 'Ring',
    keywords: ['承诺', '合同', '循环', '婚姻', '合作'],
    meaning: {
      general: '戒指代表承诺、合同和循环。可能有订婚、结婚或签订合同。',
      love: '可能有订婚、结婚或重要承诺。关系进入新阶段。',
      career: '签订合同或达成合作。有重要承诺。',
      finance: '签订财务合同。有重要的财务承诺。',
      health: '健康循环。保持规律的生活。',
      timing: '1-3周内，或纪念日',
      advice: '信守承诺，重视合作关系。'
    },
    playingCard: '红心A',
    image: '/images/lenormand/25_ring.webp'
  },
  {
    id: 26,
    name: '书',
    nameEn: 'Book',
    keywords: ['秘密', '知识', '学习', '未知', '教育'],
    meaning: {
      general: '书代表秘密、知识和学习。可能有隐藏的信息或需要学习新知识。',
      love: '可能有秘密或未知的信息。需要了解对方。',
      career: '需要学习新技能或知识。可能有教育机会。',
      finance: '可能有隐藏的财务信息。需要研究。',
      health: '需要了解健康知识。可能有诊断。',
      timing: '需要时间学习或发现',
      advice: '保持学习，揭开未知的面纱。'
    },
    playingCard: '黑桃A',
    image: '/images/lenormand/26_book.webp'
  },
  {
    id: 27,
    name: '信',
    nameEn: 'Letter',
    keywords: ['消息', '文件', '沟通', '信息', '书面'],
    meaning: {
      general: '信代表消息、文件和书面沟通。可能收到重要的信件或文件。',
      love: '可能收到情书或重要消息。书面沟通重要。',
      career: '收到重要文件或邮件。书面沟通重要。',
      finance: '收到财务文件或账单。注意书面协议。',
      health: '收到医疗报告或诊断。',
      timing: '1-3天内',
      advice: '注意书面沟通，仔细阅读文件。'
    },
    playingCard: '黑桃7',
    image: '/images/lenormand/27_letter.webp'
  },
  {
    id: 28,
    name: '男人',
    nameEn: 'Man',
    keywords: ['男性', '阳性', '自我', '理性', '行动'],
    meaning: {
      general: '男人代表男性能量、理性思维和行动力。可能与重要男性有关。',
      love: '可能与重要男性有关。男性能量在关系中很重要。',
      career: '男性同事或领导很重要。理性决策重要。',
      finance: '理性理财。可能与男性顾问讨论。',
      health: '注意男性健康问题。',
      timing: '与男性相关的时机',
      advice: '发挥理性思维，果断行动。'
    },
    playingCard: '红心K',
    image: '/images/lenormand/28_man.webp'
  },
  {
    id: 29,
    name: '女人',
    nameEn: 'Woman',
    keywords: ['女性', '阴性', '自我', '直觉', '关怀'],
    meaning: {
      general: '女人代表女性能量、直觉和关怀。可能与重要女性有关。',
      love: '可能与重要女性有关。女性能量在关系中很重要。',
      career: '女性同事或领导很重要。直觉决策重要。',
      finance: '直觉理财。可能与女性顾问讨论。',
      health: '注意女性健康问题。',
      timing: '与女性相关的时机',
      advice: '发挥直觉，关怀他人。'
    },
    playingCard: '红心Q',
    image: '/images/lenormand/29_woman.webp'
  },
  {
    id: 30,
    name: '百合',
    nameEn: 'Lily',
    keywords: ['成熟', '和平', '智慧', '性', '家庭'],
    meaning: {
      general: '百合代表成熟、和平和智慧。享受生活的平静和和谐。',
      love: '关系成熟稳定。可能有深层次的亲密关系。',
      career: '经验丰富，智慧决策。职业成熟期。',
      finance: '财务稳定。长期投资回报。',
      health: '身体健康，心态平和。',
      timing: '1-6个月，或冬季',
      advice: '享受平静，发挥智慧。'
    },
    playingCard: '黑桃K',
    image: '/images/lenormand/30_lily.webp'
  },
  {
    id: 31,
    name: '太阳',
    nameEn: 'Sun',
    keywords: ['成功', '能量', '乐观', '快乐', '胜利'],
    meaning: {
      general: '太阳代表成功、能量和乐观。一切都在向好的方向发展。',
      love: '感情充满阳光和快乐。关系成功发展。',
      career: '事业成功，得到认可。充满能量。',
      finance: '财务成功，收入增加。',
      health: '身体健康，精力充沛。',
      timing: '1-2周内，或夏季',
      advice: '保持乐观，迎接成功。'
    },
    playingCard: '红心A',
    image: '/images/lenormand/31_sun.webp'
  },
  {
    id: 32,
    name: '月亮',
    nameEn: 'Moon',
    keywords: ['情感', '直觉', '名声', '认可', '浪漫'],
    meaning: {
      general: '月亮代表情感、直觉和名声。情感生活丰富，可能获得认可。',
      love: '浪漫的感情，直觉很强。情感深入。',
      career: '获得认可和名声。创意工作成功。',
      finance: '财务状况良好，可能有奖金。',
      health: '注意情绪健康。可能有梦境信息。',
      timing: '1-4周内，或满月',
      advice: '相信直觉，追随内心。'
    },
    playingCard: '红心8',
    image: '/images/lenormand/32_moon.webp'
  },
  {
    id: 33,
    name: '钥匙',
    nameEn: 'Key',
    keywords: ['解决方案', '命运', '重要', '突破', '答案'],
    meaning: {
      general: '钥匙代表解决方案、命运和重要突破。问题即将解决。',
      love: '感情问题得到解决。找到真爱的关键。',
      career: '找到解决问题的方法。重要突破。',
      finance: '财务问题解决。找到赚钱的关键。',
      health: '找到健康问题的解决方案。',
      timing: '1-3天内',
      advice: '相信答案就在眼前。'
    },
    playingCard: '红心A',
    image: '/images/lenormand/33_key.webp'
  },
  {
    id: 34,
    name: '鱼',
    nameEn: 'Fish',
    keywords: ['金钱', '流动', '丰富', '商业', '自由'],
    meaning: {
      general: '鱼代表金钱、丰富和自由。财务状况良好，生活富足。',
      love: '感情中享受自由和丰富。可能有浪漫约会。',
      career: '商业机会多，收入丰厚。自由职业成功。',
      finance: '财务丰富，收入增加。投资成功。',
      health: '身体健康，享受生活。',
      timing: '1-3周内',
      advice: '享受丰富，保持流动。'
    },
    playingCard: '红心K',
    image: '/images/lenormand/34_fish.webp'
  },
  {
    id: 35,
    name: '锚',
    nameEn: 'Anchor',
    keywords: ['稳定', '长期', '坚持', '安全', '工作'],
    meaning: {
      general: '锚代表稳定、长期和坚持。保持稳定，坚持目标。',
      love: '关系稳定，长期发展。安全感强。',
      career: '工作稳定，长期发展。坚持目标。',
      finance: '财务稳定，长期投资。安全感强。',
      health: '健康稳定，保持规律。',
      timing: '长期，稳定发展',
      advice: '保持稳定，坚持目标。'
    },
    playingCard: '黑桃9',
    image: '/images/lenormand/35_anchor.webp'
  },
  {
    id: 36,
    name: '十字架',
    nameEn: 'Cross',
    keywords: ['负担', '信仰', '痛苦', '考验', '命运'],
    meaning: {
      general: '十字架代表负担、考验和信仰。可能经历困难，但这是成长的机会。',
      love: '感情中有考验或负担。需要坚持和信仰。',
      career: '工作中有困难或考验。需要坚持。',
      finance: '财务上有负担或考验。需要耐心。',
      health: '可能有健康考验。需要信仰和坚持。',
      timing: '考验期，需要耐心',
      advice: '接受考验，保持信仰。'
    },
    playingCard: '黑桃6',
    image: '/images/lenormand/36_cross.webp'
  }
];

// 获取牌的详细解读
export function getLenormandReading(card: LenormandCardData, context?: string): string {
  let reading = `【${card.name}】(${card.nameEn})\n\n`;
  reading += `核心含义：${card.meaning.general}\n\n`;
  reading += `关键词：${card.keywords.join('、')}\n\n`;
  reading += `感情：${card.meaning.love}\n`;
  reading += `事业：${card.meaning.career}\n`;
  reading += `财运：${card.meaning.finance}\n`;
  reading += `健康：${card.meaning.health}\n`;
  reading += `时机：${card.meaning.timing}\n`;
  reading += `建议：${card.meaning.advice}`;
  
  return reading;
}

// 牌阵解读
export function getLenormandSpreadReading(cards: LenormandCardData[]): string {
  let reading = '=== 雷诺曼牌阵解读 ===\n\n';
  
  for (const card of cards) {
    reading += getLenormandReading(card);
    reading += '\n\n---\n\n';
  }
  
  return reading;
}
