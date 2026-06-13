import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Plus } from 'lucide-react';

interface ProductCardProps {
  title: string;
  category: string;
  buff: string;
  price: string;
  imageUrl?: string;
  hasAudio?: boolean;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  category,
  buff,
  price,
  imageUrl,
  hasAudio,
  index = 0,
}) => {
  const getCategoryColor = (cat: string) => {
    const colors: Record<string, string> = {
      '水晶': '#a855f7',
      '音频': '#3b82f6',
      '法器': '#ec4899',
      '香氛': '#22c55e',
      '订阅': '#fbbf24',
      '解读': '#06b6d4',
    };
    return colors[cat] || '#94a3b8';
  };

  const categoryColor = getCategoryColor(category);

  return (
    <motion.div 
      className="flex gap-4 p-4 bg-slate-800/60 border border-white/10 rounded-xl relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ 
        borderColor: 'rgba(251, 191, 36, 0.3)',
        boxShadow: '0 0 20px rgba(251, 191, 36, 0.1)',
      }}
      whileTap={{ scale: 0.98 }}
    >
      {/* 背景装饰 */}
      <div 
        className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-5"
        style={{ background: categoryColor }}
      />
      
      {/* 商品图片 */}
      <div className="w-[90px] h-[90px] shrink-0 rounded-lg bg-black/50 border border-white/10 relative overflow-hidden">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag size={24} className="text-gray-600" />
          </div>
        )}
        
        {/* 音频标识 */}
        {hasAudio && (
          <motion.div 
            className="absolute bottom-1.5 right-1.5 w-6 h-6 bg-black/60 border border-white/50 rounded-full flex items-center justify-center text-white text-[10px] backdrop-blur-sm"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ▶
          </motion.div>
        )}
      </div>

      {/* 商品信息 */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div>
          <h3 className="text-base leading-tight text-white font-medium line-clamp-2">
            {title}
          </h3>
          
          <div className="flex gap-1.5 mt-2 flex-wrap">
            <span 
              className="text-[10px] px-2 py-0.5 rounded-full border"
              style={{ 
                borderColor: `${categoryColor}40`,
                color: categoryColor,
                background: `${categoryColor}10`,
              }}
            >
              {category}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full border border-yellow-500/30 text-yellow-500 bg-yellow-500/10">
              {buff}
            </span>
          </div>
        </div>

        <div className="flex justify-between items-end mt-3">
          <div className="flex items-baseline gap-0.5">
            <span className="text-xs text-gray-400">¥</span>
            <span className="text-xl text-[#f43f5e] font-bold tracking-wider font-pixel">
              {price}
            </span>
          </div>
          
          <motion.button 
            className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30"
            whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(251, 191, 36, 0.5)' }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus size={16} strokeWidth={3} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
