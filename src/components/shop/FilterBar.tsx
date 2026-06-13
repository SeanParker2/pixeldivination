import React, { useState } from 'react';

export type SortType = 'default' | 'sales' | 'price_asc' | 'price_desc';
export type CategoryType = 'all' | 'subscription' | 'reading' | 'crystal' | 'tarot_deck' | 'audio';

interface FilterBarProps {
  onSortChange?: (sort: SortType) => void;
  onCategoryChange?: (category: CategoryType) => void;
  currentSort?: SortType;
  currentCategory?: CategoryType;
}

const SORT_OPTIONS: { value: SortType; label: string }[] = [
  { value: 'default', label: '综合' },
  { value: 'sales', label: '销量' },
  { value: 'price_asc', label: '价格↑' },
  { value: 'price_desc', label: '价格↓' },
];

const CATEGORY_OPTIONS: { value: CategoryType; label: string }[] = [
  { value: 'all', label: '全部' },
  { value: 'subscription', label: '订阅' },
  { value: 'reading', label: '解读' },
  { value: 'crystal', label: '水晶' },
  { value: 'tarot_deck', label: '塔罗牌' },
  { value: 'audio', label: '音频' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  onSortChange,
  onCategoryChange,
  currentSort = 'default',
  currentCategory = 'all',
}) => {
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);

  return (
    <div className="px-5 pb-2.5 pt-5 space-y-3">
      {/* Sort Options */}
      <div className="flex justify-between items-center text-base text-[#64748b] font-pixel">
        <div className="flex gap-4">
          {SORT_OPTIONS.map(option => (
            <span
              key={option.value}
              onClick={() => onSortChange?.(option.value)}
              className={`cursor-pointer transition-colors ${
                currentSort === option.value
                  ? 'text-white drop-shadow-[0_0_5px_#fff] border-b-2 border-[#fbbf24]'
                  : 'hover:text-gray-400'
              }`}
            >
              {option.label}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => setShowCategoryFilter(!showCategoryFilter)}
          className={`flex items-center gap-1 px-2.5 py-1 rounded border text-sm transition-colors ${
            showCategoryFilter
              ? 'bg-[#fbbf24]/10 border-[#fbbf24]/30 text-[#fbbf24]'
              : 'bg-white/5 border-white/10 text-[#94a3b8]'
          }`}
        >
          <span className="text-base">≡</span>
          <span>筛选</span>
        </button>
      </div>

      {/* Category Filter */}
      {showCategoryFilter && (
        <div className="flex flex-wrap gap-2">
          {CATEGORY_OPTIONS.map(option => (
            <button
              key={option.value}
              onClick={() => onCategoryChange?.(option.value)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                currentCategory === option.value
                  ? 'bg-[#fbbf24] text-black font-medium'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
