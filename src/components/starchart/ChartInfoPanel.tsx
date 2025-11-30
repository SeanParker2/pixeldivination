import React from 'react';

export const ChartInfoPanel: React.FC = () => {
  return (
    <div className="w-full px-4 py-3 flex justify-between items-start text-xs text-pixel-secondary font-sans">
      {/* Left Column */}
      <div className="flex flex-col gap-1">
        <span className="bg-white/5 px-2 py-0.5 rounded text-gray-300 w-fit">Placidus</span>
        <span>回归黄道</span>
      </div>

      {/* Right Column */}
      <div className="flex flex-col gap-1 items-end">
        <span>日出 06:52</span>
        <span>日落 18:01</span>
        <span>时主星: <span className="text-pixel-gold">木星</span></span>
      </div>
    </div>
  );
};
