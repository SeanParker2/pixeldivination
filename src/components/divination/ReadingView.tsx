import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Loader2, Share2, X, Download, RotateCcw, AlertCircle, Sparkles } from 'lucide-react';
import html2canvas from 'html2canvas';
import { useDivinationStore, SPREAD_CONFIGS } from '../../stores/useDivinationStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { useUserStore } from '../../stores/useUserStore';
import { playSound } from '../../lib/audio';
import { ShareCard } from '../../components/share/ShareCard';

export const ReadingView: React.FC = () => {
  const { selectedCards, selectedSpread, drawnCards, resetDivination, generateReading, readingResult, spreadName, isLoadingAI, error } = useDivinationStore();
  const addHistoryEntry = useHistoryStore(state => state.addEntry);
  const userProfile = useUserStore(state => state.profile);
  const navigate = useNavigate();
  
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  const spreadConfig = SPREAD_CONFIGS.find(s => s.id === selectedSpread);

  // Trigger AI reading when all cards are revealed
  useEffect(() => {
    const maxCards = spreadConfig?.count || 3;
    if (selectedCards.length === maxCards && !readingResult && !isLoadingAI) {
      const timer = setTimeout(() => {
        generateReading();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedCards, readingResult, isLoadingAI, generateReading, spreadConfig]);

  const handleComplete = () => {
    if (readingResult) {
      addHistoryEntry({
        type: 'tarot',
        summary: `${spreadName || spreadConfig?.name || '塔罗牌阵'}解读`,
        details: {
          spread: selectedSpread,
          cards: selectedCards,
          drawnCards,
          result: readingResult
        }
      });
    }
    resetDivination();
    navigate('/');
  };

  const handleRetry = () => {
    generateReading();
  };

  const handleShare = async () => {
    if (!shareCardRef.current) return;
    
    try {
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

  // 获取牌阵位置标签
  const getPositionLabel = (index: number) => {
    if (drawnCards && drawnCards[index]) {
      return drawnCards[index].position;
    }
    return spreadConfig?.positions[index] || `位置${index + 1}`;
  };

  return (
    <div className="flex flex-col items-center h-full pt-12 pb-8 px-4 overflow-y-auto scrollbar-hide relative">
      {/* Header */}
      <div className="w-full max-w-md flex justify-between items-center mb-6 flex-shrink-0">
        <div>
          <h2 className="text-xl text-white font-pixel">命运启示</h2>
          <div className="flex items-center gap-2 mt-1">
            <Sparkles size={12} className="text-pixel-gold" />
            <span className="text-xs text-gray-400">{spreadName || spreadConfig?.name || '时间三牌'}</span>
            <span className="text-xs text-gray-500">· {selectedCards.length}张牌</span>
          </div>
        </div>
        {readingResult && (
          <button 
            onClick={handleShare}
            className="p-2 text-pixel-gold hover:bg-white/10 rounded-full transition-colors"
          >
            <Share2 size={20} />
          </button>
        )}
      </div>

      {/* Cards Display */}
      <div className="w-full max-w-md space-y-4 flex-shrink-0">
        {selectedCards.map((card, index) => {
          const position = getPositionLabel(index);
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.3, duration: 0.5 }}
              className="glass-card p-4 flex gap-4"
            >
              {/* Position Label */}
              <div className="flex flex-col items-center justify-center w-16 flex-shrink-0">
                <span className="text-[10px] text-pixel-gold font-medium">{position}</span>
              </div>

              {/* Card Visual */}
              <motion.div
                initial={{ rotateY: 180 }}
                animate={{ rotateY: 0 }}
                transition={{ delay: index * 0.3 + 0.2, duration: 0.6 }}
                onAnimationStart={() => playSound('flip')}
                className="w-20 h-32 flex-shrink-0 rounded-lg shadow-lg overflow-hidden border border-pixel-gold/50"
                style={{ backfaceVisibility: 'hidden' }}
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

              {/* Card Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.3 + 0.4 }}
                className="flex-1 flex flex-col justify-center min-w-0"
              >
                <h3 className="text-lg text-pixel-gold font-bold neon-text-gold truncate">{card.nameEn}</h3>
                <p className="text-white text-sm">{card.name}</p>
                <p className="text-gray-400 text-xs mt-1 line-clamp-2">{card.meaning}</p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* AI Reading Section */}
      <div className="w-full max-w-md mt-6 mb-4 flex-1 min-h-[200px]">
        {isLoadingAI ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full text-pixel-secondary space-y-4 py-12"
          >
            <div className="relative">
              <Loader2 className="animate-spin w-10 h-10 text-pixel-gold" />
              <div className="absolute inset-0 animate-ping w-10 h-10 rounded-full bg-pixel-gold/20" />
            </div>
            <div className="text-center">
              <span className="text-sm font-pixel animate-pulse block">正在链接宇宙信号...</span>
              <span className="text-xs text-gray-500 mt-1 block">AI 占卜师正在解读牌面</span>
            </div>
          </motion.div>
        ) : error ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="glass-card p-6 border-red-500/30"
          >
            <div className="flex items-center gap-2 text-red-400 mb-3">
              <AlertCircle size={16} />
              <span className="text-sm">{error}</span>
            </div>
            <button 
              onClick={handleRetry}
              className="flex items-center gap-2 text-pixel-gold hover:text-pixel-gold/80 text-sm"
            >
              <RotateCcw size={14} />
              重新解读
            </button>
          </motion.div>
        ) : (
          readingResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-5"
            >
              {/* Reading Header */}
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                <Sparkles size={14} className="text-pixel-gold" />
                <span className="text-pixel-gold font-bold text-sm">AI 深度解读</span>
                <span className="text-gray-500 text-xs ml-auto">{spreadName || spreadConfig?.name}</span>
              </div>
              
              {/* Reading Content */}
              <div className="prose prose-invert prose-sm max-w-none font-sans text-gray-200 leading-relaxed">
                <ReactMarkdown>{readingResult}</ReactMarkdown>
              </div>
              
              {/* Reading Footer */}
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] text-gray-500">解读仅供参考，请理性看待</span>
                <span className="text-[10px] text-gray-500">Powered by AI</span>
              </div>
            </motion.div>
          )
        )}
      </div>

      {/* Complete Button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
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
