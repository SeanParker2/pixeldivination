import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';

interface ShopHeaderProps {
  onCartClick?: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ onCartClick }) => {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <div className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md px-5 py-4 flex justify-between items-center border-b border-white/10">
      {/* Search Box */}
      <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-[20px] border border-white/10 flex-1 mr-4">
        <Search size={16} className="text-[#fbbf24]" />
        <span className="text-base text-[#64748b] font-pixel">搜索灵性好物...</span>
      </div>
      
      {/* Cart Icon with Badge */}
      <div className="relative">
        <button 
          onClick={onCartClick}
          className="text-[#fbbf24] cursor-pointer"
        >
          <ShoppingCart size={24} />
        </button>
        {totalItems > 0 && (
          <div className="absolute -top-1.5 -right-2 bg-[#f43f5e] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center border border-white font-bold">
            {totalItems > 99 ? '99+' : totalItems}
          </div>
        )}
      </div>
    </div>
  );
};
