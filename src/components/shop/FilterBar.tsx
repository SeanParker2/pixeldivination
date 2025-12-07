import React from 'react';

export const FilterBar: React.FC = () => {
  return (
    <div className="px-5 pb-2.5 pt-5 flex justify-between items-center text-base text-[#64748b] font-pixel">
      <div className="flex gap-4">
        <span className="cursor-pointer text-white drop-shadow-[0_0_5px_#fff] border-b-2 border-[#fbbf24] transition-colors">综合</span>
        <span className="cursor-pointer transition-colors hover:text-gray-400">销量</span>
        <span className="cursor-pointer transition-colors hover:text-gray-400">价格</span>
      </div>
      
      <button className="flex items-center gap-1 px-2.5 py-1 bg-white/5 rounded border border-white/10 text-sm text-[#94a3b8]">
        <span className="text-base">≡</span>
        <span>筛选</span>
      </button>
    </div>
  );
};
