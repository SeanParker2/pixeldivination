import React from 'react';
import { ListFilter } from 'lucide-react';

export const FilterBar: React.FC = () => {
  return (
    <div className="w-full px-4 py-2 flex items-center justify-between mb-2">
      <div className="flex items-center gap-3 text-sm font-medium">
        <button className="text-white">最新</button>
        <span className="text-gray-600">|</span>
        <button className="text-gray-500 hover:text-gray-300 transition-colors">价格</button>
      </div>
      
      <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors bg-white/5 px-2 py-1 rounded border border-white/5">
        <ListFilter size={12} />
        <span>筛选</span>
      </button>
    </div>
  );
};
