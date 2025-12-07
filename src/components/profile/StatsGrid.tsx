import React from 'react';
import { ShoppingCart, ScrollText, Heart } from 'lucide-react';
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
      <StatCard icon={ShoppingCart} label="购物车" value={cartItemsCount} onClick={onCartClick} />
      <StatCard icon={ScrollText} label="历史档案" value={stats.total} onClick={onHistoryClick} />
      <StatCard icon={Heart} label="收藏夹" value={8} />
    </div>
  );
};

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`bg-slate-800/60 border border-white/10 rounded-xl py-4 px-2 flex flex-col items-center justify-center gap-2 relative overflow-hidden active:scale-95 active:bg-white/5 transition-all group ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Top Gradient Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#fbbf24] to-transparent opacity-50" />
      
      <div className="text-[#e2e8f0] drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
        <Icon size={24} />
      </div>
      
      <div className="text-xl font-bold text-white leading-none font-pixel mt-1">
        {value}
      </div>
      
      <div className="text-xs text-[#64748b] uppercase tracking-wider font-pixel">
        {label}
      </div>
    </div>
  );
};
