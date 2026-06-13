import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { playSound } from '../../lib/audio';

interface ShuffleAnimationProps {
  isShuffling: boolean;
  onComplete?: () => void;
}

export const ShuffleAnimation: React.FC<ShuffleAnimationProps> = ({ 
  isShuffling, 
  onComplete 
}) => {
  const [phase, setPhase] = useState<'idle' | 'gather' | 'shuffle' | 'spread'>('idle');

  React.useEffect(() => {
    if (isShuffling) {
      setPhase('gather');
      playSound('shuffle');
      
      setTimeout(() => setPhase('shuffle'), 500);
      setTimeout(() => setPhase('spread'), 1500);
      setTimeout(() => {
        setPhase('idle');
        onComplete?.();
      }, 2000);
    }
  }, [isShuffling, onComplete]);

  const cardPositions = Array.from({ length: 7 }, (_, i) => ({
    x: (i - 3) * 40,
    y: 0,
    rotate: (i - 3) * 5,
  }));

  return (
    <div className="relative w-full h-64 flex items-center justify-center">
      <AnimatePresence>
        {isShuffling && (
          <>
            {cardPositions.map((pos, index) => (
              <motion.div
                key={index}
                className="absolute w-16 h-24 rounded-lg overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #1e1b4b, #312e81)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  boxShadow: '0 0 10px rgba(139, 92, 246, 0.2)',
                }}
                initial={{ 
                  x: 0, 
                  y: 0, 
                  rotate: 0,
                  scale: 0.8,
                  opacity: 0 
                }}
                animate={
                  phase === 'gather' ? {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 1,
                    opacity: 1,
                  } :
                  phase === 'shuffle' ? {
                    x: [
                      pos.x,
                      -pos.x,
                      pos.x * 0.5,
                      -pos.x * 0.5,
                      pos.x,
                    ],
                    y: [
                      pos.y,
                      pos.y - 20,
                      pos.y + 10,
                      pos.y - 10,
                      pos.y,
                    ],
                    rotate: [
                      pos.rotate,
                      -pos.rotate,
                      pos.rotate * 0.5,
                      -pos.rotate * 0.5,
                      pos.rotate,
                    ],
                    scale: 1,
                    opacity: 1,
                  } :
                  phase === 'spread' ? {
                    x: pos.x * 2,
                    y: pos.y + 20,
                    rotate: pos.rotate,
                    scale: 0.9,
                    opacity: 0.8,
                  } :
                  {
                    x: 0,
                    y: 0,
                    rotate: 0,
                    scale: 0.8,
                    opacity: 0,
                  }
                }
                transition={{
                  duration: phase === 'shuffle' ? 1 : 0.5,
                  ease: 'easeInOut',
                  delay: index * 0.05,
                }}
              >
                {/* 卡背图案 */}
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-purple-400/50 text-2xl">✦</div>
                </div>
              </motion.div>
            ))}
            
            {/* 光效 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3), transparent)',
              }}
              animate={{
                scale: [0.5, 1.5, 0.5],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: 1,
                ease: 'easeInOut',
              }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  isFlipped: boolean;
  onClick?: () => void;
  className?: string;
}

export const FlipCard: React.FC<FlipCardProps> = ({ 
  front, 
  back, 
  isFlipped, 
  onClick,
  className = '' 
}) => {
  return (
    <div 
      className={`relative cursor-pointer ${className}`}
      onClick={onClick}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        {/* 正面 */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {front}
        </div>
        
        {/* 背面 */}
        <div 
          className="absolute inset-0 backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
};

interface CardBackProps {
  className?: string;
}

export const CardBack: React.FC<CardBackProps> = ({ className = '' }) => {
  return (
    <div 
      className={`w-full h-full rounded-lg overflow-hidden ${className}`}
      style={{
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
        border: '2px solid rgba(139, 92, 246, 0.3)',
        boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)',
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        {/* 中心图案 */}
        <div className="relative">
          <div className="w-12 h-12 border-2 border-purple-400/50 rounded-full flex items-center justify-center">
            <div className="w-8 h-8 border border-purple-400/30 rounded-full flex items-center justify-center">
              <span className="text-purple-400 text-lg">✦</span>
            </div>
          </div>
          <motion.div
            className="absolute inset-0 border-2 border-purple-400/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* 装饰线条 */}
        <div className="absolute inset-4 border border-purple-400/20 rounded" />
        <div className="absolute inset-6 border border-purple-400/10 rounded" />
        
        {/* 角落装饰 */}
        <div className="absolute top-2 left-2 text-purple-400/30 text-xs">✧</div>
        <div className="absolute top-2 right-2 text-purple-400/30 text-xs">✧</div>
        <div className="absolute bottom-2 left-2 text-purple-400/30 text-xs">✧</div>
        <div className="absolute bottom-2 right-2 text-purple-400/30 text-xs">✧</div>
      </div>
    </div>
  );
};
