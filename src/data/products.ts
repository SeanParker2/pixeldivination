export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  type: 'virtual' | 'physical';
  buff: string;
  image?: string;
}

// Default products for fallback/offline mode
export const PRODUCTS: Product[] = [
  {
    id: 'pro_monthly',
    name: 'Pro 月卡',
    description: '解锁全部功能，无限AI解读',
    price: 19.9,
    category: 'subscription',
    type: 'virtual',
    buff: '无限解读',
    image: '/images/shop/pro_monthly.jpg',
  },
  {
    id: 'pro_yearly',
    name: 'Pro 年卡',
    description: '最划算的年度订阅',
    price: 168,
    category: 'subscription',
    type: 'virtual',
    buff: '年度最优',
    image: '/images/shop/pro_yearly.jpg',
  },
  {
    id: 'single_reading',
    name: '单次深度解读',
    description: '一次深度AI占卜解读',
    price: 3.9,
    category: 'reading',
    type: 'virtual',
    buff: '单次使用',
    image: '/images/shop/single_reading.jpg',
  },
  {
    id: 'crystal_rose_quartz',
    name: '粉水晶手链',
    description: '天然粉水晶，增强爱情运势',
    price: 128,
    category: 'crystal',
    type: 'physical',
    buff: '爱情招福',
    image: '/images/shop/crystal_rose_quartz.jpg',
  },
  {
    id: 'crystal_amethyst',
    name: '紫水晶吊坠',
    description: '天然紫水晶，增强直觉力',
    price: 168,
    category: 'crystal',
    type: 'physical',
    buff: '直觉增强',
    image: '/images/shop/crystal_amethyst.jpg',
  },
  {
    id: 'tarot_rider_waite',
    name: '韦特塔罗牌（经典版）',
    description: '原版韦特塔罗牌',
    price: 298,
    category: 'tarot_deck',
    type: 'physical',
    buff: '经典收藏',
    image: '/images/shop/tarot_rider_waite.jpg',
  },
];
