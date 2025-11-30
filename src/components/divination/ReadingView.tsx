import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Loader2 } from 'lucide-react';
import { useDivinationStore } from '../../stores/useDivinationStore';

export const ReadingView: React.FC = () => {
  const { selectedCards, resetDivination, generateReading, readingResult, isLoadingAI } = useDivinationStore();
  const navigate = useNavigate();

  // Trigger AI reading when all cards are revealed
  useEffect(() => {
    if (selectedCards.length === 3 && !readingResult) {
      // Delay slightly to allow card flip animations to start
      const timer = setTimeout(() => {
        generateReading();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCards, readingResult, generateReading]);

  const handleComplete = () => {
    resetDivination();
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center h-full pt-12 pb-8 px-4 overflow-y-auto scrollbar-hide">
      <h2 className="text-xl text-white font-pixel mb-8 flex-shrink-0">命运启示</h2>

      <div className="w-full max-w-md space-y-6 flex-shrink-0">
        {selectedCards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.5, duration: 0.5 }}
            className="bg-white/5 border border-white/10 p-3 rounded-lg flex gap-4"
          >
            {/* Card Visual (Flip Effect) */}
            <motion.div
              initial={{ rotateY: 180 }}
              animate={{ rotateY: 0 }}
              transition={{ delay: index * 0.5 + 0.2, duration: 0.6 }}
              className="w-20 h-28 bg-pixel-gold flex-shrink-0 rounded border-2 border-white flex items-center justify-center text-pixel-black font-bold text-center p-1 text-xs"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {card.name}
            </motion.div>

            {/* Text Content */}
            <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: index * 0.5 + 0.4 }}
               className="flex-1 flex flex-col justify-center"
            >
               <h3 className="text-base text-pixel-gold font-bold mb-1">{card.nameEn}</h3>
               <p className="text-gray-300 text-xs leading-relaxed">{card.meaning}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* AI Reading Section */}
      <div className="w-full max-w-md mt-8 mb-4 flex-1 min-h-[200px]">
        {isLoadingAI ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-pixel-secondary space-y-4"
          >
            <Loader2 className="animate-spin w-8 h-8 text-pixel-gold" />
            <span className="text-sm font-pixel animate-pulse">DeepSeek 正在链接宇宙...</span>
          </motion.div>
        ) : (
          readingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-black/30 border border-pixel-gold/30 p-6 rounded-xl backdrop-blur-md"
            >
              <div className="prose prose-invert prose-sm max-w-none font-sans text-gray-200">
                <ReactMarkdown>{readingResult}</ReactMarkdown>
              </div>
            </motion.div>
          )
        )}
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        onClick={handleComplete}
        className="mt-auto bg-white/10 hover:bg-white/20 text-white py-3 px-8 rounded-full border border-white/30 backdrop-blur-sm transition-colors font-pixel text-sm"
      >
        完成占卜
      </motion.button>
    </div>
  );
};
