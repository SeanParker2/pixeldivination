import React from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';

interface ShopHeaderProps {
  onCartClick?: () => void;
}

export const ShopHeader: React.FC<ShopHeaderProps> = ({ onCartClick }) => {
  const totalItems = useCartStore(state => state.getTotalItems());

  return (
    <div className="w-full flex items-center justify-between px-4 py-4 bg-transparent sticky top-0 z-10">
      <button className="text-pixel-gold hover:text-white transition-colors p-1">
        <Search size={24} />
      </button>
      
      {/* Cart Icon with Badge */}
      <div className="relative">
        <button 
          onClick={onCartClick}
          className="text-pixel-gold hover:text-white transition-colors p-1"
        >
          <ShoppingCart size={24} />
        </button>
        {totalItems > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-[#161622] pointer-events-none">
            {totalItems > 99 ? '99+' : totalItems}
          </div>
        )}
      </div>
    </div>
  );
};
