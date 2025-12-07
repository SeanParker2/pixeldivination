import React from 'react';

import type { FortuneScores } from '../../types/fortune';

interface Props {
  scores: FortuneScores;
}

export const FortuneStats: React.FC<Props> = ({ scores }) => {
  const statItems = [
    { label: '爱情', value: scores.love },
    { label: '事业', value: scores.career },
    { label: '财运', value: scores.wealth },
    { label: '健康', value: scores.health },
    { label: '学业', value: scores.academic },
    { label: '社交', value: scores.social },
  ];

  // Calculate overall stars (average / 20)
  const average = Object.values(scores).reduce((a, b) => a + b, 0) / 6;
  const starCount = Math.round(average / 20);

  return (
    <div className="glass-card p-5 mb-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xl text-white font-pixel">综合运势</span>
        <div className="flex gap-1 text-purple-400 drop-shadow-[0_0_5px_#a78bfa] tracking-widest">
          {'★'.repeat(starCount).padEnd(5, '☆')}
        </div>
      </div>

      {/* Stats Rows */}
      <div className="flex flex-col gap-3">
        {statItems.slice(0, 3).map((stat) => ( // Showing top 3 like prototype or all? Prototype shows 3. I'll show all but in rows.
          <StatRow key={stat.label} label={stat.label} value={stat.value} />
        ))}
        {/* If we want to show all, we can just map all. The prototype only shows 3 examples but likely needs all. */}
         {statItems.slice(3).map((stat) => (
          <StatRow key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

const StatRow = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-3">
    <span className="w-10 text-sm text-slate-400 font-pixel">{label}</span>
    <div className="flex-1 h-2 bg-black/30 rounded-full overflow-hidden">
      <div 
        className="h-full relative rounded-full"
        style={{ 
          width: `${value}%`,
          background: 'linear-gradient(90deg, #8b5cf6, #ec4899)',
          boxShadow: '0 0 10px rgba(236, 72, 153, 0.5)'
        }}
      >
        <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-white" />
      </div>
    </div>
    <span className="text-sm font-pixel text-slate-200 w-6 text-right">{value}</span>
  </div>
);
