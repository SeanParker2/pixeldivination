import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, SkipBack, SkipForward, Share2, Bookmark, Check } from 'lucide-react';
import { useHistoryStore } from '../../stores/useHistoryStore';

export interface InsightModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QUOTES = [
  "直觉是你灵魂的导航系统。",
  "混乱是秩序的前奏。",
  "你寻找的答案，藏在你最恐惧的地方。",
  "星辰不问赶路人，时光不负有心人。",
  "每一个巧合，都是宇宙的精心安排。",
  "内在的平静，是外在风暴的避难所。",
  "当你凝视深渊时，深渊也在凝视你。",
  "改变视角的瞬间，奇迹就会发生。"
];

export const InsightModal: React.FC<InsightModalProps> = ({ isOpen, onClose }) => {
  const [quote, setQuote] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  // When isOpen changes to true, generate a new quote
  // We use useLayoutEffect or just rely on React to handle the update
  // but to avoid "setState in useEffect" warning (which warns about synchronous updates visible to user)
  // we can use a functional update or just ignore if we accept the render cycle.
  // A cleaner way for random content is to generate it in render if not present, or use a key.
  // Here, let's just generate it when isOpen becomes true, but wrapped in a timeout to break the sync cycle
  // OR simpler: useMemo? No, because it needs to be random each open.
  
  useEffect(() => {
    if (isOpen) {
      // Use setTimeout to avoid synchronous setState warning
      const timer = setTimeout(() => {
        const randomQuote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
        setQuote(randomQuote);
        setIsSaved(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSave = () => {
    if (isSaved) return;
    
    useHistoryStore.getState().addEntry({
      type: 'insight',
      summary: '今日灵感',
      details: {
        result: quote,
        quote
      }
    });
    
    setIsSaved(true);
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
            className="relative w-full max-w-sm bg-[#1E1E2E] border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden flex flex-col items-center"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full z-20"
            >
              <X size={24} />
            </button>

            {/* Image Section */}
            <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 relative shadow-lg border border-white/5">
              <img 
                src="/images/home/card_big_illustration.png" 
                alt="Daily Wisdom" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxjaXJjbGUgY3g9IjguNSIgY3k9IjguNSIgcj0iMS41Ij48L2NpcmNsZT48cG9seWxpbmUgcG9pbnRzPSIyMSAxNSAxNiAxMCA1IDIxIj48L3BvbHlsaW5lPjwvc3ZnPg==';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs text-white font-pixel border border-white/10">
                  今日灵感
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8 px-2">
              <h3 className="text-xl font-bold text-white mb-4 font-serif leading-relaxed">
                "{quote}"
              </h3>
              <div className="h-1 w-12 bg-pixel-gold/50 mx-auto rounded-full" />
            </div>

            {/* Fake Player UI */}
            <div className="w-full bg-white/5 rounded-xl p-4 border border-white/5">
              {/* Progress Bar */}
              <div className="flex items-center gap-3 mb-3 text-xs text-gray-400 font-mono">
                <span>01:23</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-pixel-gold rounded-full" />
                </div>
                <span>04:44</span>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between px-4">
                <button 
                  onClick={handleSave}
                  className={`${isSaved ? 'text-pixel-gold' : 'text-gray-400 hover:text-white'} transition-colors`}
                  disabled={isSaved}
                >
                  {isSaved ? <Check size={20} /> : <Bookmark size={20} />}
                </button>
                <div className="flex items-center gap-6">
                  <button className="text-white hover:text-pixel-gold"><SkipBack size={24} /></button>
                  <button className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </button>
                  <button className="text-white hover:text-pixel-gold"><SkipForward size={24} /></button>
                </div>
                <button className="text-gray-400 hover:text-white opacity-50"><Share2 size={20} /></button>
              </div>
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
