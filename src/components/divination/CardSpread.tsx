import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDivinationStore, TAROT_DECK, SPREAD_CONFIGS } from '../../stores/useDivinationStore';
import { playSound } from '../../lib/audio';
import { triggerHaptic } from '../../lib/haptics';
import type { TarotCard, SelectedTarotCard } from '../../stores/useDivinationStore';

export const CardSpread: React.FC = () => {
  const { selectedCards, selectCard, setStep, selectedSpread } = useDivinationStore();
  const spreadConfig = SPREAD_CONFIGS.find(s => s.id === selectedSpread);
  const maxCards = spreadConfig?.count || 3;
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    if (selectedCards.length >= maxCards) return;

    // Randomly select a unique card
    let randomCard: TarotCard;
    do {
      randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    } while (selectedCards.some(c => c.id === randomCard.id));

    playSound('flip');
    triggerHaptic('medium');
    setLastSelected(index);
    
    selectCard(randomCard);

    if (selectedCards.length + 1 === maxCards) {
      setTimeout(() => setStep('reading'), 1000);
    }
  };

  // 生成卡牌位置 - 扇形排列
  const getCardStyle = (index: number, total: number) => {
    const centerIndex = (total - 1) / 2;
    const offset = index - centerIndex;
    const rotation = offset * 3;
    const translateY = Math.abs(offset) * 5;
    
    return {
      rotate: rotation,
      y: translateY,
    };
  };

  const totalCards = Math.min(maxCards * 2 + 1, 11);

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      {/* 进度指示器 */}
      <motion.div 
        className="absolute top-8 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3">
          {Array.from({ length: maxCards }).map((_, i) => (
            <motion.div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i < selectedCards.length 
                  ? 'bg-yellow-500 shadow-lg shadow-yellow-500/50' 
                  : 'bg-white/20 border border-white/30'
              }`}
              animate={i < selectedCards.length ? {
                scale: [1, 1.3, 1],
              } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
        <span className="text-white/60 text-sm font-pixel">
          已选 {selectedCards.length} / {maxCards}
        </span>
      </motion.div>

      {/* 牌阵名称 */}
      <motion.div
        className="absolute top-20 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <span className="text-yellow-500/60 text-xs uppercase tracking-widest">
          {spreadConfig?.name || '时间三牌'}
        </span>
      </motion.div>

      {/* 卡牌展示区 */}
      <div className="relative w-full max-w-xs h-72 flex items-center justify-center">
        <AnimatePresence>
          {Array.from({ length: totalCards }).map((_, index) => {
            const cardStyle = getCardStyle(index, totalCards);
            const isSelected = index === lastSelected;
            const isClickable = selectedCards.length < maxCards;
            
            return (
              <motion.div
                key={index}
                className="absolute cursor-pointer"
                style={{
                  left: '50%',
                  marginLeft: '-40px',
                }}
                initial={{ 
                  opacity: 0, 
                  y: 100, 
                  rotate: 0,
                  scale: 0.5 
                }}
                animate={{ 
                  opacity: 1, 
                  y: cardStyle.y, 
                  rotate: cardStyle.rotate,
                  scale: hoveredIndex === index ? 1.05 : 1,
                  x: hoveredIndex === index ? 0 : 0,
                  zIndex: hoveredIndex === index ? 50 : index,
                }}
                transition={{ 
                  delay: index * 0.08,
                  type: 'spring',
                  stiffness: 200,
                  damping: 20,
                }}
                whileHover={isClickable ? { 
                  y: cardStyle.y - 15,
                  scale: 1.08,
                  zIndex: 50,
                } : {}}
                whileTap={isClickable ? { scale: 0.95 } : {}}
                onHoverStart={() => isClickable && setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => isClickable && handleCardClick(index)}
              >
                {/* 卡牌容器 */}
                <div 
                  className={`relative w-20 h-32 rounded-lg overflow-hidden transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-yellow-500 ring-offset-2 ring-offset-transparent' : ''
                  }`}
                  style={{
                    boxShadow: isSelected 
                      ? '0 0 20px rgba(251, 191, 36, 0.5), 0 0 40px rgba(251, 191, 36, 0.2)'
                      : hoveredIndex === index
                      ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(139, 92, 246, 0.3)'
                      : '0 4px 15px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  {/* 卡背 */}
                  <div 
                    className="w-full h-full"
                    style={{
                      background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                    }}
                  >
                    <div className="w-full h-full flex items-center justify-center relative">
                      {/* 中心图案 */}
                      <div className="relative">
                        <div className="w-10 h-10 border border-purple-400/40 rounded-full flex items-center justify-center">
                          <span className="text-purple-400/60 text-lg">✦</span>
                        </div>
                        <motion.div
                          className="absolute inset-0 border border-purple-400/20 rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                        />
                      </div>
                      
                      {/* 装饰 */}
                      <div className="absolute inset-2 border border-purple-400/10 rounded" />
                      
                      {/* 角落装饰 */}
                      <div className="absolute top-1 left-1 text-purple-400/20 text-[8px]">✧</div>
                      <div className="absolute top-1 right-1 text-purple-400/20 text-[8px]">✧</div>
                      <div className="absolute bottom-1 left-1 text-purple-400/20 text-[8px]">✧</div>
                      <div className="absolute bottom-1 right-1 text-purple-400/20 text-[8px]">✧</div>
                    </div>
                  </div>
                  
                  {/* 选中动画 */}
                  {isSelected && (
                    <motion.div
                      className="absolute inset-0 bg-yellow-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.5, 0] }}
                      transition={{ duration: 0.5 }}
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        
        {/* 已选卡牌展示 */}
        <AnimatePresence>
          {selectedCards.length > 0 && (
            <motion.div
              className="absolute -bottom-16 flex gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selectedCards.map((card, i) => (
                <motion.div
                  key={card.id}
                  className="w-10 h-14 rounded overflow-hidden border border-yellow-500/50"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    boxShadow: '0 0 10px rgba(251, 191, 36, 0.3)',
                  }}
                >
                  <img 
                    src={card.image} 
                    alt={card.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/images/tarot/back.webp';
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 提示文字 */}
      <motion.div 
        className="absolute bottom-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-gray-400 text-sm">
          {selectedCards.length < maxCards 
            ? '请凭直觉点击卡牌抽取' 
            : '牌已抽完，正在解读...'
          }
        </p>
        <motion.div 
          className="flex items-center justify-center gap-1 mt-2"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-1 h-1 bg-yellow-500/50 rounded-full" />
          <div className="w-1 h-1 bg-yellow-500/50 rounded-full" />
          <div className="w-1 h-1 bg-yellow-500/50 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
};
