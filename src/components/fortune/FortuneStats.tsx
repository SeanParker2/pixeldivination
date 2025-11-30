import React from 'react';
import { Star } from 'lucide-react';
import type { FortuneScores } from '../../types/fortune';

interface Props {
  scores: FortuneScores;
}

export const FortuneStats: React.FC<Props> = ({ scores }) => {
  const statItems = [
    { label: '健康运势', value: scores.health },
    { label: '学业运势', value: scores.academic },
    { label: '社交运势', value: scores.social },
    { label: '爱情运势', value: scores.love },
    { label: '事业运势', value: scores.career },
    { label: '财运指数', value: scores.wealth },
  ];

  return (
    <div className="bg-pixel-card border border-pixel-border rounded-xl p-4 mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white text-base font-bold font-pixel">今日运势</h2>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map((i) => (
            <Star key={i} size={14} className="fill-pixel-gold text-pixel-gold" />
          ))}
          <div className="relative">
            <Star size={14} className="text-white/30" />
            <div className="absolute top-0 left-0 overflow-hidden w-1/2">
               <Star size={14} className="fill-pixel-gold text-pixel-gold" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {statItems.map((stat) => (
          <StatBar key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

const StatBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between items-end">
      <span className="text-xs text-gray-300">{label}</span>
      <span className="text-xs text-pixel-gold font-bold">{value}%</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
);
