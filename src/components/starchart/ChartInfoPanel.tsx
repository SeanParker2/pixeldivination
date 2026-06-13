import React from 'react';

export const ChartInfoPanel: React.FC = () => {
  return (
    <div className="flex justify-between text-xs text-[#94a3b8] mb-5 bg-[rgba(255,255,255,0.03)] p-2 px-3 rounded-lg border border-white/10 font-sans">
      <div>分宫制: <span className="text-[#fbbf24] ml-1">Placidus</span></div>
      <div>命主星: <span className="text-[#fbbf24] ml-1">火星 (Mars)</span></div>
    </div>
  );
};
