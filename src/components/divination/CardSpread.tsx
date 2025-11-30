import React from 'react';
import { motion } from 'framer-motion';
import { useDivinationStore, TAROT_DECK } from '../../stores/useDivinationStore';
import type { TarotCard } from '../../stores/useDivinationStore';

export const CardSpread: React.FC = () => {
  const { selectedCards, selectCard, setStep } = useDivinationStore();

  const handleCardClick = () => {
    if (selectedCards.length >= 3) return;

    // Randomly select a unique card
    let randomCard: TarotCard;
    do {
      randomCard = TAROT_DECK[Math.floor(Math.random() * TAROT_DECK.length)];
    } while (selectedCards.some(c => c.id === randomCard.id));

    selectCard(randomCard);

    if (selectedCards.length + 1 === 3) {
      setTimeout(() => setStep('reading'), 800);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full relative">
      <div className="absolute top-8 text-white text-xl font-pixel">
        已选 {selectedCards.length} / 3
      </div>

      <div className="relative w-full max-w-sm h-96 flex flex-wrap justify-center content-center gap-2">
         {/* Render a grid of "backs" representing the deck spread out */}
         {[...Array(12)].map((_, index) => (
            <motion.div
                key={index}
                className="w-20 h-32 bg-purple-900 border-2 border-white rounded cursor-pointer"
                whileHover={{ scale: 1.1, y: -10 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCardClick}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                style={{
                    backgroundImage: 'radial-gradient(circle, #5b21b6 20%, transparent 20%)',
                    backgroundSize: '10px 10px'
                }}
            />
         ))}
      </div>
      
      <div className="absolute bottom-10 text-gray-400 text-sm">
         请凭直觉抽取 3 张牌
      </div>
    </div>
  );
};
