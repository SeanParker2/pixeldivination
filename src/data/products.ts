export interface Product {
  id: number;
  title: string;
  category: string;
  buff: string;
  price: string;
  image: string;
  description?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    title: "天然阿塞黄水晶+金虎眼手链",
    category: "水晶",
    buff: "事业满分",
    price: "255",
    image: "/images/shop/product_crystal.jpg",
    description: "甄选巴西天然黄水晶，搭配金虎眼石，强效招财旺事业。每一颗珠子都经过严格筛选，晶体通透，能量纯净。佩戴可增强自信，提升执行力，是职场人士的必备开运好物。"
  },
  {
    id: 2,
    title: "高频能量疗愈音钵 (432Hz)",
    category: "音频",
    buff: "深度睡眠",
    price: "199",
    image: "/images/shop/product_bowl.jpg",
    description: "手工打造的颂钵，定频于432Hz宇宙自然频率。声音悠长深远，能快速平复思绪，引导进入深度冥想状态。适合压力大、睡眠质量差的人群，助你找回内心的平静。"
  },
  {
    id: 3,
    title: "黑曜石净化手串",
    category: "水晶",
    buff: "辟邪挡灾",
    price: "188",
    image: "/images/shop/product_obsidian.jpg",
    description: "精选墨西哥彩虹眼黑曜石，具有极强的吸纳性，能有效吸收负能量，辟邪化煞。长期佩戴有助于排除体内病气，改善运气，是守护平安的护身符。"
  },
  {
    id: 4,
    title: "粉晶招桃花灵摆",
    category: "法器",
    buff: "恋爱运UP",
    price: "128",
    image: "/images/shop/product_pendulum.jpg",
    description: "粉水晶主开发心轮，加强心肺功能的健康。可松弛紧张的情绪，舒缓烦躁心情，协助深入内心，发现自我提高悟性。粉水晶散发着温和而吸引人的粉红色光芒，可协助改善人际关系，增进人缘、生意缘，是开门做生意的最佳利器。"
  },
  {
    id: 5,
    title: "冥想引导音频课程 (7天)",
    category: "音频",
    buff: "灵性觉醒",
    price: "99",
    image: "/images/shop/product_audio.jpg",
    description: "专为初学者设计的7天冥想引导课程，每天15分钟，从呼吸调整到身体扫描，带你循序渐进地探索内心世界。通过专业导师的语音引导，缓解焦虑，提升专注力。"
  },
  {
    id: 6,
    title: "紫水晶智慧之眼吊坠",
    category: "水晶",
    buff: "学业进步",
    price: "320",
    image: "/images/shop/product_amethyst.jpg",
    description: "紫水晶代表灵性、精神、高层次的爱意，可作对仰慕者的一种定情物、信物。紫水晶作为传统意义上的护身符，通常可驱赶邪运、增强个人运气，并能促进智能，平稳情绪，提高直觉力、帮助思考、集中注意力、增强记忆力，给人勇气与力量。"
  },
  {
    id: 7,
    title: "七脉轮平衡精油套装",
    category: "香氛",
    buff: "身心平衡",
    price: "450",
    image: "/images/shop/product_oil.jpg",
    description: "针对人体七大脉轮调配的复方精油，选用纯天然植物萃取。每一款对应一个脉轮，帮助疏通能量堵塞，平衡身心状态。无论是瑜伽、冥想还是日常香薰，都能带来极佳的疗愈体验。"
  }
];
