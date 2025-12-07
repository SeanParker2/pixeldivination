import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDivinationStore } from '../../stores/useDivinationStore';
import { playSound, stopSound } from '../../lib/audio';

export const ShuffleDeck: React.FC = () => {
  const { setStep } = useDivinationStore();

  useEffect(() => {
    playSound('shuffle');
    const timer = setTimeout(() => {
      setStep('draw');
    }, 3000);
    return () => {
      clearTimeout(timer);
      stopSound('shuffle');
    };
  }, [setStep]);

  // Use state to hold random values to keep them stable across renders but random on mount
  const [randomValues] = React.useState<number[]>(() => [...Array(5)].map(() => Math.random() * 10 - 5));

  return (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-48 h-72">
        {[...Array(5)].map((_, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-purple-900 border-4 border-white rounded-lg flex items-center justify-center"
            initial={{ rotate: 0, y: 0 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, randomValues[index] || 0, 0],
              zIndex: [index, 5, index]
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: index * 0.1
            }}
            style={{
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.5)',
                backgroundImage: 'radial-gradient(circle, #4c1d95 10%, transparent 10%), radial-gradient(circle, #4c1d95 10%, transparent 10%)',
                backgroundSize: '20px 20px',
                backgroundPosition: '0 0, 10px 10px'
            }}
          >
             <div className="w-12 h-12 border-4 border-yellow-500 rounded-full opacity-50"></div>
          </motion.div>
        ))}
        <div className="absolute -bottom-16 w-full text-center text-white text-sm animate-pulse">
          洗牌中...
        </div>
      </div>
    </div>
  );
};
