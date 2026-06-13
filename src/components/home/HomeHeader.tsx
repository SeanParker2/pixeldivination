import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const HomeHeader: React.FC = () => {
  return (
    <motion.header 
      className="relative text-center py-6 mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* 装饰元素 */}
      <div className="absolute inset-0 pointer-events-none">
        {/* 左侧装饰 */}
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <Sparkles size={16} className="text-yellow-500/50" />
        </motion.div>
        
        {/* 右侧装饰 */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        >
          <Sparkles size={16} className="text-purple-500/50" />
        </motion.div>
      </div>

      {/* 主标题 */}
      <motion.h1 
        className="text-3xl font-pixel tracking-wider relative"
        style={{
          background: 'linear-gradient(135deg, #fbbf24, #f59e0b, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: 'none',
          filter: 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))',
        }}
        animate={{
          filter: [
            'drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))',
            'drop-shadow(0 0 20px rgba(251, 191, 36, 0.5))',
            'drop-shadow(0 0 10px rgba(251, 191, 36, 0.3))',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        PIXEL DIVINATION
      </motion.h1>
      
      {/* 副标题 */}
      <motion.p 
        className="text-sm text-gray-400 mt-2 tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        ✦ 像素占卜 ✦
      </motion.p>
      
      {/* 装饰线 */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-3"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <div className="h-px w-16 bg-gradient-to-r from-transparent to-yellow-500/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/50" />
        <div className="h-px w-16 bg-gradient-to-l from-transparent to-yellow-500/30" />
      </motion.div>
    </motion.header>
  );
};
