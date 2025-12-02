import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Loader2, Share2, X, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useDivinationStore } from '../../stores/useDivinationStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { useUserStore } from '../../stores/useUserStore';
import { playSound } from '../../lib/audio';
import { ShareCard } from '../../components/share/ShareCard';

export const ReadingView: React.FC = () => {
  const { selectedCards, resetDivination, generateReading, readingResult, isLoadingAI } = useDivinationStore();
  const addHistoryEntry = useHistoryStore(state => state.addEntry);
  const userProfile = useUserStore(state => state.profile);
  const navigate = useNavigate();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

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
    if (readingResult) {
      addHistoryEntry({
        type: 'tarot',
        summary: '塔罗牌阵解读', // Or use question if available in store
        details: {
          cards: selectedCards,
          result: readingResult
        }
      });
    }
    resetDivination();
    navigate('/');
  };

  const handleShare = async () => {
    if (!shareCardRef.current) return;
    
    try {
      // Small delay to ensure rendering
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#18181b',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      setShareImage(canvas.toDataURL('image/png'));
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to generate share card:', error);
    }
  };

  return (
    <div className="flex flex-col items-center h-full pt-12 pb-8 px-4 overflow-y-auto scrollbar-hide relative">
      <div className="w-full max-w-md flex justify-between items-center mb-8 flex-shrink-0">
        <h2 className="text-xl text-white font-pixel">命运启示</h2>
        {readingResult && (
          <button 
            onClick={handleShare}
            className="p-2 text-pixel-gold hover:bg-white/10 rounded-full transition-colors"
          >
            <Share2 size={20} />
          </button>
        )}
      </div>

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
              onAnimationStart={() => playSound('flip')}
              className="w-24 h-40 flex-shrink-0 rounded-lg shadow-lg overflow-hidden"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <img 
                src={card.image} 
                alt={card.name} 
                className="w-full h-full object-cover rounded-lg"
              />
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

      {/* Hidden Share Card */}
      <div style={{ position: 'absolute', left: '-9999px', top: 0 }}>
        <ShareCard 
          ref={shareCardRef}
          userName={userProfile.nickname}
          date={new Date().toLocaleDateString()}
          type="tarot"
          tarotCards={selectedCards}
          summary={readingResult || ''}
        />
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-6"
            onClick={() => setShowShareModal(false)}
          >
            <div className="relative w-full max-w-sm" onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setShowShareModal(false)}
                className="absolute -top-10 right-0 text-white/60 hover:text-white"
              >
                <X size={24} />
              </button>
              
              {shareImage && (
                <div className="space-y-4">
                  <img src={shareImage} alt="Share Card" className="w-full rounded-xl shadow-2xl border border-white/10" />
                  <div className="flex justify-center">
                     <a 
                       href={shareImage} 
                       download={`pixel-tarot-${new Date().getTime()}.png`}
                       className="flex items-center gap-2 bg-pixel-gold text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-pixel-gold/90 transition-colors"
                     >
                       <Download size={18} />
                       保存图片
                     </a>
                  </div>
                  <p className="text-center text-white/40 text-xs">或长按图片保存</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
