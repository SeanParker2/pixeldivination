import { 
  Send, Box, Ship, Home, TreePine, Cloud, Spline, 
  Archive, Flower, Axe, Bird, User, Folder, Shield, 
  Star, Store, Cat, Castle, Building, Mountain, Map, 
  MousePointer, Heart, Bell, Book, MessageCircle, UserPlus, UserMinus, 
  Sun, Moon, Key, Database, Anchor, Plus, type LucideIcon 
} from 'lucide-react';

export interface LenormandCardData {
  id: number;
  name: string;
  icon: LucideIcon;
  keywords: string[];
  meaning: string;
}

// Simplified icon mapping due to library limitations
export const LENORMAND_DECK: LenormandCardData[] = [
  { id: 1, name: "骑士", icon: Send, keywords: ["消息", "到来", "速度"], meaning: "新的消息即将到来，或者某人正在接近。" },
  { id: 2, name: "幸运草", icon: Box, keywords: ["幸运", "机会", "快乐"], meaning: "短暂的幸运和快乐，抓住机会。" }, // Box as Clover (Lucky Box?)
  { id: 3, name: "船", icon: Ship, keywords: ["旅行", "距离", "商业"], meaning: "远行、探索或者海外的商业机会。" },
  { id: 4, name: "房子", icon: Home, keywords: ["家庭", "安全", "稳定"], meaning: "家庭事务，安全感，或者房地产相关。" },
  { id: 5, name: "树", icon: TreePine, keywords: ["健康", "成长", "根基"], meaning: "长期的健康状况，缓慢但稳定的成长。" },
  { id: 6, name: "云", icon: Cloud, keywords: ["困惑", "不确定", "障碍"], meaning: "暂时的混乱，看不清真相，需要耐心。" },
  { id: 7, name: "蛇", icon: Spline, keywords: ["背叛", "诱惑", "智慧"], meaning: "小心身边的人，或者需要运用策略和智慧。" }, // Spline as Snake
  { id: 8, name: "棺材", icon: Archive, keywords: ["结束", "疾病", "停滞"], meaning: "某个阶段的结束，需要休息或放手。" }, // Archive as Coffin
  { id: 9, name: "花束", icon: Flower, keywords: ["礼物", "欣赏", "美好"], meaning: "愉快的社交，收到礼物或赞美。" },
  { id: 10, name: "镰刀", icon: Axe, keywords: ["突然", "切断", "危险"], meaning: "突然的决定，意外的中断，需要果断。" },
  { id: 11, name: "鞭子", icon: Axe, keywords: ["冲突", "重复", "清理"], meaning: "激烈的争论，或者是体育运动，反复的行动。" },
  { id: 12, name: "鸟", icon: Bird, keywords: ["八卦", "焦虑", "谈话"], meaning: "琐碎的谈话，紧张的情绪，短途旅行。" },
  { id: 13, name: "小孩", icon: User, keywords: ["新开始", "天真", "小"], meaning: "新的项目，单纯的态度，或者实际的孩子。" }, // User (Small)
  { id: 14, name: "狐狸", icon: Folder, keywords: ["狡猾", "工作", "伪装"], meaning: "需要警惕欺诈，或者指代常规的工作。" }, // Folder? 
  { id: 15, name: "熊", icon: Shield, keywords: ["力量", "权威", "保护"], meaning: "强大的保护者，或者财务上的力量，母亲形象。" }, // Shield as Bear (Protection)
  { id: 16, name: "星星", icon: Star, keywords: ["希望", "灵感", "清晰"], meaning: "愿望成真，清晰的目标，精神指引。" },
  { id: 17, name: "鹳", icon: Store, keywords: ["改变", "搬家", "诞生"], meaning: "积极的改变，环境的变迁，新生命的诞生。" }, // Store?
  { id: 18, name: "狗", icon: Cat, keywords: ["忠诚", "朋友", "信任"], meaning: "可靠的朋友，忠诚的伙伴，援助。" }, // Cat as Dog? (Pet)
  { id: 19, name: "塔", icon: Castle, keywords: ["孤独", "机构", "视野"], meaning: "政府机构，大公司，或者需要独处。" },
  { id: 20, name: "花园", icon: Building, keywords: ["社交", "公众", "网络"], meaning: "公共场合，聚会，社交网络。" },
  { id: 21, name: "山", icon: Mountain, keywords: ["阻碍", "延迟", "挑战"], meaning: "巨大的障碍，需要克服的困难，延迟。" },
  { id: 22, name: "路", icon: Map, keywords: ["选择", "决定", "方向"], meaning: "面临岔路口，需要做出选择，多种可能性。" },
  { id: 23, name: "老鼠", icon: MousePointer, keywords: ["损失", "压力", "侵蚀"], meaning: "逐渐的损失，焦虑，或者物品损坏。" }, // MousePointer
  { id: 24, name: "心", icon: Heart, keywords: ["爱", "激情", "情感"], meaning: "浪漫的爱情，深刻的情感，幸福。" },
  { id: 25, name: "戒指", icon: Bell, keywords: ["承诺", "合同", "循环"], meaning: "婚姻，商业合同，或者重复的模式。" }, // Bell (Ring)
  { id: 26, name: "书", icon: Book, keywords: ["秘密", "知识", "学习"], meaning: "隐藏的信息，未知的秘密，或者学术研究。" },
  { id: 27, name: "信", icon: MessageCircle, keywords: ["消息", "文件", "沟通"], meaning: "书面文件，邮件，即时消息。" },
  { id: 28, name: "男人", icon: UserPlus, keywords: ["男性", "阳性", "自我"], meaning: "指代问卜者（男）或问卜者生命中的男性。" },
  { id: 29, name: "女人", icon: UserMinus, keywords: ["女性", "阴性", "自我"], meaning: "指代问卜者（女）或问卜者生命中的女性。" },
  { id: 30, name: "百合", icon: Flower, keywords: ["成熟", "和平", "性"], meaning: "平静的生活，老年人，或者性关系。" },
  { id: 31, name: "太阳", icon: Sun, keywords: ["成功", "能量", "乐观"], meaning: "巨大的成功，积极的能量，快乐。" },
  { id: 32, name: "月亮", icon: Moon, keywords: ["情感", "直觉", "名声"], meaning: "潜意识，梦境，或者公众的认可。" },
  { id: 33, name: "钥匙", icon: Key, keywords: ["解决方案", "命运", "重要"], meaning: "问题的答案，关键的转折点，必然发生。" },
  { id: 34, name: "鱼", icon: Database, keywords: ["金钱", "流动", "丰富"], meaning: "财务状况，商业交易，或者情感的流动。" }, // Database (Money)
  { id: 35, name: "锚", icon: Anchor, keywords: ["稳定", "长期", "坚持"], meaning: "稳定的工作，长期的关系，安全感。" },
  { id: 36, name: "十字架", icon: Plus, keywords: ["负担", "信仰", "痛苦"], meaning: "必须承担的责任，考验，或者精神信仰。" }, // Plus
];