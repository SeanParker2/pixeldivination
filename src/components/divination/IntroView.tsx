import React from 'react';
import { motion } from 'framer-motion';
import { useDivinationStore } from '../../stores/useDivinationStore';

export const IntroView: React.FC = () => {
  const { startDivination } = useDivinationStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl font-pixel text-white mb-4">
          静心默念你的问题...
        </h2>
        <p className="text-pixel-secondary text-sm">
          当你的心准备好时，命运自会指引。
        </p>
      </motion.div>

      <motion.button
        onClick={startDivination}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(255, 215, 0, 0.4)",
            "0 0 0 10px rgba(255, 215, 0, 0)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
        className="bg-pixel-gold text-pixel-black font-bold py-4 px-12 rounded-none border-4 border-white shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] active:shadow-none active:translate-y-1"
      >
        开始占卜
      </motion.button>
    </div>
  );
};
