import React from 'react';
import { Search } from 'lucide-react';

export const ShopHeader: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-between px-4 py-4 bg-transparent sticky top-0 z-10">
      <button className="text-pixel-gold hover:text-white transition-colors p-1">
        <Search size={24} />
      </button>
      {/* Title or other elements could go here, but requirements say "Very simple" */}
    </div>
  );
};
