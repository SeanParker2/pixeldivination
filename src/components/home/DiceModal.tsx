import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { useHistoryStore } from '../../stores/useHistoryStore';

interface DiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PLANETS = [
  { symbol: '☉', label: '太阳' },
  { symbol: '☽', label: '月亮' },
  { symbol: '☿', label: '水星' },
  { symbol: '♀', label: '金星' },
  { symbol: '♂', label: '火星' },
  { symbol: '♃', label: '木星' },
  { symbol: '♄', label: '土星' },
  { symbol: '♅', label: '天王星' },
  { symbol: '♆', label: '海王星' },
  { symbol: '♇', label: '冥王星' },
];

const SIGNS = [
  { symbol: '♈', label: '白羊' },
  { symbol: '♉', label: '金牛' },
  { symbol: '♊', label: '双子' },
  { symbol: '♋', label: '巨蟹' },
  { symbol: '♌', label: '狮子' },
  { symbol: '♍', label: '处女' },
  { symbol: '♎', label: '天秤' },
  { symbol: '♏', label: '天蝎' },
  { symbol: '♐', label: '射手' },
  { symbol: '♑', label: '摩羯' },
  { symbol: '♒', label: '水瓶' },
  { symbol: '♓', label: '双鱼' },
];

const HOUSES = Array.from({ length: 12 }, (_, i) => i + 1);

export const DiceModal: React.FC<DiceModalProps> = ({ isOpen, onClose }) => {
  const [isRolling, setIsRolling] = useState(false);
  const [result, setResult] = useState({
    planet: PLANETS[0],
    sign: SIGNS[0],
    house: 1,
  });
  const [tempResult, setTempResult] = useState(result);

  useEffect(() => {
    if (!isRolling) return;

    const interval = setInterval(() => {
      setTempResult({
        planet: PLANETS[Math.floor(Math.random() * PLANETS.length)],
        sign: SIGNS[Math.floor(Math.random() * SIGNS.length)],
        house: HOUSES[Math.floor(Math.random() * HOUSES.length)],
      });
    }, 80); // Fast cycling

    const timeout = setTimeout(() => {
      setIsRolling(false);
      // Final result
      const finalPlanet = PLANETS[Math.floor(Math.random() * PLANETS.length)];
      const finalSign = SIGNS[Math.floor(Math.random() * SIGNS.length)];
      const finalHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)];
      
      setResult({
        planet: finalPlanet,
        sign: finalSign,
        house: finalHouse,
      });
      clearInterval(interval);

      // Save to history
      const interpretation = `**星象指引**\n\n- **行星**: ${finalPlanet.symbol} ${finalPlanet.label}\n- **星座**: ${finalSign.symbol} ${finalSign.label}\n- **宫位**: 第 ${finalHouse} 宫\n\n此组合象征着...`;
      
      useHistoryStore.getState().addEntry({
        type: 'dice',
        summary: '星象骰子指引',
        details: {
          result: interpretation,
          dice: {
            planet: finalPlanet,
            sign: finalSign,
            house: finalHouse
          }
        }
      });

    }, 1000); // Roll for 1 second

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isRolling]);

  // Display temp result while rolling, otherwise real result
  const display = isRolling ? tempResult : result;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-sm bg-[#1E1E2E] border border-white/20 rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500" />
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full" />

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <h2 className="text-xl font-pixel text-white mb-2">星象指引</h2>
              <p className="text-sm text-gray-400 font-sans">在此刻，宇宙想对你说...</p>
            </div>

            {/* Dice Container */}
            <div className="flex justify-between gap-2 mb-10 relative z-10">
              <DiceBox 
                label="行星" 
                symbol={display.planet.symbol} 
                subLabel={display.planet.label}
                isRolling={isRolling} 
              />
              <DiceBox 
                label="星座" 
                symbol={display.sign.symbol} 
                subLabel={display.sign.label}
                isRolling={isRolling} 
              />
              <DiceBox 
                label="宫位" 
                symbol={display.house.toString()} 
                subLabel={`${display.house}宫`}
                isRolling={isRolling} 
              />
            </div>

            {/* Action Button */}
            <button
              onClick={() => setIsRolling(true)}
              disabled={isRolling}
              className={`
                w-full py-4 rounded-xl font-pixel text-lg font-bold relative overflow-hidden group
                transition-all duration-200
                ${isRolling 
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-purple-500/25'
                }
              `}
            >
              <div className="flex items-center justify-center gap-2 relative z-10">
                <Star size={24} className={isRolling ? 'animate-spin' : ''} />
                <span>{isRolling ? '投掷中...' : '投掷骰子'}</span>
              </div>
              {/* Button Shine Effect */}
              {!isRolling && (
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
            >
              <X size={20} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const DiceBox = ({ 
  label, 
  symbol, 
  subLabel, 
  isRolling 
}: { 
  label: string; 
  symbol: string; 
  subLabel: string;
  isRolling: boolean;
}) => (
  <div className="flex flex-col items-center gap-2 flex-1">
    <span className="text-xs text-gray-500 font-pixel">{label}</span>
    <div className={`
      w-full aspect-square bg-[#151520] border-2 border-pixel-gold/30 rounded-xl
      flex flex-col items-center justify-center relative overflow-hidden
      transition-colors duration-300
      ${isRolling ? 'border-pixel-gold/10' : 'shadow-[0_0_15px_rgba(255,215,0,0.15)]'}
    `}>
      <span className={`
        text-3xl text-pixel-gold font-serif mb-1
        ${isRolling ? 'blur-sm scale-90 opacity-70' : 'scale-100 opacity-100'}
        transition-all duration-100
      `}>
        {symbol}
      </span>
      <span className="text-[10px] text-gray-400">{subLabel}</span>
      
      {/* Inner Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-pixel-gold/5 pointer-events-none" />
    </div>
  </div>
);
