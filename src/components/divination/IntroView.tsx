import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Moon, Star } from 'lucide-react';
import { useDivinationStore, SPREAD_CONFIGS } from '../../stores/useDivinationStore';

export const IntroView: React.FC = () => {
  const { startDivination, selectedSpread, setSpread } = useDivinationStore();

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-6 relative">
      {/* 背景装饰粒子 */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-yellow-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* 顶部装饰 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="relative mb-8"
      >
        {/* 能量环 */}
        <motion.div
          className="w-24 h-24 rounded-full border border-purple-500/30 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="w-16 h-16 rounded-full border border-yellow-500/30 flex items-center justify-center"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <Moon size={24} className="text-yellow-500" />
          </motion.div>
        </motion.div>
        
        {/* 闪烁星星 */}
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Star size={12} className="text-yellow-500 fill-yellow-500" />
        </motion.div>
        
        <motion.div
          className="absolute -bottom-1 -left-3"
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
        >
          <Sparkles size={10} className="text-purple-500" />
        </motion.div>
      </motion.div>

      {/* 主标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-pixel text-white mb-3 neon-text-gold">
          静心默念你的问题
        </h2>
        <p className="text-gray-400 text-sm leading-relaxed">
          当你的心准备好时，命运自会指引
        </p>
        
        {/* 装饰线 */}
        <motion.div 
          className="flex items-center justify-center gap-2 mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-purple-500/30" />
          <div className="w-1 h-1 rounded-full bg-purple-500/50" />
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-purple-500/30" />
        </motion.div>
      </motion.div>

      {/* 牌阵选择 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full max-w-sm mb-8"
      >
        <p className="text-gray-500 text-xs mb-3 uppercase tracking-wider">选择牌阵</p>
        <div className="grid grid-cols-2 gap-2">
          {SPREAD_CONFIGS.map((spread, index) => (
            <motion.button
              key={spread.id}
              onClick={() => setSpread(spread.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-3 rounded-xl border transition-all overflow-hidden ${
                selectedSpread === spread.id
                  ? 'border-yellow-500/50 bg-yellow-500/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              {/* 选中状态的光效 */}
              {selectedSpread === spread.id && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-transparent to-yellow-500/10"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
              
              <div className={`text-sm font-medium relative z-10 ${
                selectedSpread === spread.id ? 'text-yellow-500' : 'text-white/70'
              }`}>
                {spread.name}
              </div>
              <div className={`text-xs mt-1 relative z-10 ${
                selectedSpread === spread.id ? 'text-yellow-500/70' : 'text-gray-500'
              }`}>
                {spread.count}张牌 · {spread.description}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* 开始按钮 */}
      <motion.button
        onClick={startDivination}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* 按钮发光效果 */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-500/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* 按钮主体 */}
        <div className="relative px-10 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full font-pixel text-black text-lg tracking-wider shadow-lg shadow-yellow-500/30 group-hover:shadow-yellow-500/50 transition-shadow">
          开始占卜
        </div>
      </motion.button>

      {/* 底部提示 */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="text-gray-600 text-xs mt-6"
      >
        ✦ 点击上方选择牌阵，然后开始占卜 ✦
      </motion.p>
    </div>
  );
};
