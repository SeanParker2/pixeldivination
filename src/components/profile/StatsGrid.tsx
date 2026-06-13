import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, ScrollText, Sparkles } from 'lucide-react';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { useCartStore } from '../../stores/useCartStore';

export interface StatsGridProps {
  onCartClick?: () => void;
  onHistoryClick?: () => void;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ onCartClick, onHistoryClick }) => {
  const stats = useHistoryStore(state => state.getStats());
  const cartItemsCount = useCartStore(state => state.getTotalItems());

  return (
    <div className="grid grid-cols-3 gap-3 px-5 mt-5">
      <StatCard
        icon={ShoppingCart}
        label="购物车"
        value={cartItemsCount}
        color="#fbbf24"
        onClick={onCartClick}
        delay={0}
      />
      <StatCard
        icon={ScrollText}
        label="历史档案"
        value={stats.total}
        color="#8b5cf6"
        onClick={onHistoryClick}
        delay={0.1}
      />
      <StatCard
        icon={Sparkles}
        label="占卜次数"
        value={stats.tarot + stats.natalChart + stats.daily}
        color="#ec4899"
        delay={0.2}
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color?: string;
  onClick?: () => void;
  delay?: number;
}

const StatCard: React.FC<StatCardProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  color = '#fbbf24',
  onClick,
  delay = 0,
}) => {
  return (
    <motion.div 
      onClick={onClick}
      className={`bg-slate-800/60 border border-white/10 rounded-xl py-4 px-2 flex flex-col items-center justify-center gap-2 relative overflow-hidden group ${onClick ? 'cursor-pointer' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      whileHover={{ 
        borderColor: `${color}40`,
        y: -2,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 顶部渐变线 */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-[2px]"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: delay + 0.3 }}
      />
      
      {/* 背景光效 */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${color}10, transparent)` }}
      />
      
      {/* 图标 */}
      <motion.div 
        style={{ color }}
        animate={{ 
          filter: ['drop-shadow(0 0 3px transparent)', `drop-shadow(0 0 5px ${color}40)`, 'drop-shadow(0 0 3px transparent)'],
        }}
        transition={{ duration: 3, repeat: Infinity, delay }}
      >
        <Icon size={22} />
      </motion.div>
      
      {/* 数值 */}
      <motion.div 
        className="text-xl font-bold text-white leading-none font-pixel"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: delay + 0.2, type: 'spring', stiffness: 200 }}
      >
        <AnimatedCounter value={value} />
      </motion.div>
      
      {/* 标签 */}
      <div className="text-[10px] text-gray-500 uppercase tracking-wider font-pixel">
        {label}
      </div>
    </motion.div>
  );
};

// 数字动画组件
const AnimatedCounter: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (value === 0) {
      setDisplayValue(0);
      return;
    }

    const duration = 1000;
    const steps = 30;
    const increment = value / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
};
