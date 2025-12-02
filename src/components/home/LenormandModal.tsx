import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shuffle, Sparkles } from 'lucide-react';
import { LENORMAND_DECK, type LenormandCardData } from '../../data/lenormand';
import { LenormandCard } from './LenormandCard';
import { useHistoryStore } from '../../stores/useHistoryStore';

interface LenormandModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LenormandModal: React.FC<LenormandModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'start' | 'shuffling' | 'result'>('start');
  const [drawnCards, setDrawnCards] = useState<LenormandCardData[]>([]);

  // Reset on open
  useEffect(() => {
    if (isOpen) {
      setStep('start');
      setDrawnCards([]);
    }
  }, [isOpen]);

  // Interpretation generation (Mock)
  const getInterpretation = (cards: LenormandCardData[]) => {
    if (cards.length < 2) return "";
    const c1 = cards[0];
    const c2 = cards[1];
    return `核心议题是关于【${c1.name}】（${c1.keywords[0]}），建议你采取【${c2.name}】（${c2.keywords[1]}）的态度。${c1.meaning.split('，')[0]}，而${c2.meaning}`;
  };

  const handleShuffle = () => {
    setStep('shuffling');
    // Simulate shuffle delay
    setTimeout(() => {
      // Draw 2 unique cards
      const shuffled = [...LENORMAND_DECK].sort(() => 0.5 - Math.random());
      const cards = [shuffled[0], shuffled[1]];
      setDrawnCards(cards);
      setStep('result');
      
      // Save to history
      const interpretation = getInterpretation(cards);
      useHistoryStore.getState().addEntry({
        type: 'lenormand',
        summary: '今日雷诺曼指引',
        details: {
          result: interpretation,
          cards
        }
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-[#1E1E2E] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center min-h-[500px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full z-20"
            >
              <X size={24} />
            </button>

             {step === 'start' && (
                <div className="flex flex-col items-center justify-center h-full gap-8 flex-1 w-full">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-pixel text-white">今日雷诺曼</h2>
                        <p className="text-gray-400 text-sm">抽取两张牌：核心议题 & 行动建议</p>
                    </div>
                    
                    {/* Decorative Card Stack */}
                    <div className="relative w-32 h-48">
                        <div className="absolute top-0 left-0 w-full h-full bg-pixel-brown rounded-xl border-2 border-pixel-beige rotate-[-6deg]" />
                        <div className="absolute top-0 left-0 w-full h-full bg-pixel-brown rounded-xl border-2 border-pixel-beige rotate-[-3deg]" />
                        <div className="absolute top-0 left-0 w-full h-full bg-pixel-brown rounded-xl border-2 border-pixel-beige flex items-center justify-center">
                            <Sparkles className="text-pixel-beige opacity-50" size={48} />
                        </div>
                    </div>

                    <button 
                        onClick={handleShuffle}
                        className="flex items-center gap-2 px-6 py-3 bg-pixel-gold text-pixel-black font-pixel rounded-xl hover:scale-105 transition-transform"
                    >
                        <Shuffle size={18} />
                        <span>开始洗牌</span>
                    </button>
                </div>
             )}

             {step === 'shuffling' && (
                 <div className="flex flex-col items-center justify-center h-full flex-1 w-full">
                     <motion.div 
                        animate={{ rotate: [0, 180, 360], scale: [1, 1.1, 1] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className="text-pixel-gold"
                     >
                         <Shuffle size={48} />
                     </motion.div>
                     <p className="mt-4 text-white font-pixel animate-pulse">洗牌中...</p>
                 </div>
             )}

             {step === 'result' && (
                 <div className="w-full h-full flex flex-col flex-1">
                     <h3 className="text-center text-white font-pixel mb-6 mt-2">今日指引</h3>
                     
                     <div className="flex gap-4 justify-center mb-6">
                         {/* Card 1 */}
                         <div className="flex flex-col items-center gap-2">
                             <span className="text-xs text-gray-400 font-mono">THEME</span>
                             <div className="w-28">
                                <LenormandCard card={drawnCards[0]} isFlipped={true} />
                             </div>
                         </div>
                         {/* Card 2 */}
                         <div className="flex flex-col items-center gap-2">
                             <span className="text-xs text-gray-400 font-mono">ADVICE</span>
                             <div className="w-28">
                                <LenormandCard card={drawnCards[1]} isFlipped={true} />
                             </div>
                         </div>
                     </div>

                     <div className="bg-white/5 rounded-xl p-4 border border-white/5 flex-1 overflow-y-auto">
                        <p className="text-white/90 text-sm leading-relaxed font-serif">
                            {getInterpretation(drawnCards)}
                        </p>
                     </div>
                     
                     <button 
                        onClick={() => setStep('start')} 
                        className="mt-4 text-xs text-gray-500 hover:text-white underline text-center"
                     >
                        重新抽取
                     </button>
                 </div>
             )}

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
