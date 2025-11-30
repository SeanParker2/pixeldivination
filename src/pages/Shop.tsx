import React from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ShopHeader } from '../components/shop/ShopHeader';
import { ShopBanner } from '../components/shop/ShopBanner';
import { FilterBar } from '../components/shop/FilterBar';
import { ProductCard } from '../components/shop/ProductCard';

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    title: "天然阿塞黄水晶+金虎眼手链",
    category: "水晶",
    buff: "事业满分",
    price: "255",
    image: "/images/shop/product_crystal.jpg"
  },
  {
    id: 2,
    title: "高频能量疗愈音钵 (432Hz)",
    category: "音频",
    buff: "深度睡眠",
    price: "199",
    image: "/images/shop/product_bowl.jpg"
  },
  {
    id: 3,
    title: "黑曜石净化手串",
    category: "水晶",
    buff: "辟邪挡灾",
    price: "188",
    image: "/images/shop/product_obsidian.jpg"
  },
  {
    id: 4,
    title: "粉晶招桃花灵摆",
    category: "法器",
    buff: "恋爱运UP",
    price: "128",
    image: "/images/shop/product_pendulum.jpg"
  },
  {
    id: 5,
    title: "冥想引导音频课程 (7天)",
    category: "音频",
    buff: "灵性觉醒",
    price: "99",
    image: "/images/shop/product_audio.jpg"
  },
  {
    id: 6,
    title: "紫水晶智慧之眼吊坠",
    category: "水晶",
    buff: "学业进步",
    price: "320",
    image: "/images/shop/product_amethyst.jpg"
  },
  {
    id: 7,
    title: "七脉轮平衡精油套装",
    category: "香氛",
    buff: "身心平衡",
    price: "450",
    image: "/images/shop/product_oil.jpg"
  }
];

export const Shop: React.FC = () => {
  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Header */}
      <ShopHeader />

      {/* Main Scrollable Content */}
      <div className="flex flex-col pb-32">
        <ShopBanner />
        
        <FilterBar />

        {/* Product List */}
        <div className="flex flex-col w-full">
          {PRODUCTS.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              category={product.category}
              buff={product.buff}
              price={product.price}
              imageUrl={product.image}
            />
          ))}
        </div>
      </div>
    </MobileContainer>
  );
};
