import React from 'react';
import type { PlanetPosition } from '../../lib/astrology';

interface ChartInfoPanelProps {
  planets?: PlanetPosition[];
  ascendant?: number;
  midheaven?: number;
  activeTab?: string;
}

// Get zodiac sign from longitude
const getZodiacSign = (longitude: number): string => {
  const signs = ['白羊', '金牛', '双子', '巨蟹', '狮子', '处女', '天秤', '天蝎', '射手', '摩羯', '水瓶', '双鱼'];
  return signs[Math.floor(longitude / 30) % 12];
};

const getZodiacSymbol = (longitude: number): string => {
  const symbols = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
  return symbols[Math.floor(longitude / 30) % 12];
};

export const ChartInfoPanel: React.FC<ChartInfoPanelProps> = ({ planets, ascendant, activeTab }) => {
  // Find key planets
  const sun = planets?.find(p => p.name === '太阳');
  const moon = planets?.find(p => p.name === '月亮');
  const rising = ascendant !== undefined ? getZodiacSign(ascendant) : null;

  return (
    <div className="flex justify-between text-xs text-[#94a3b8] mb-5 bg-[rgba(255,255,255,0.03)] p-2 px-3 rounded-lg border border-white/10 font-sans">
      <div>
        {activeTab === '行运盘' || activeTab === '天象盘' ? '当前天象' : '分宫制'}:
        <span className="text-[#fbbf24] ml-1">
          {activeTab === '行运盘' || activeTab === '天象盘' ? '实时' : 'Porphyry'}
        </span>
      </div>
      {sun && (
        <div>太阳:
          <span className="text-[#fbbf24] ml-1">
            {getZodiacSymbol(sun.longitude)} {getZodiacSign(sun.longitude)}
          </span>
        </div>
      )}
      {moon && (
        <div>月亮:
          <span className="text-[#fbbf24] ml-1">
            {getZodiacSymbol(moon.longitude)} {getZodiacSign(moon.longitude)}
          </span>
        </div>
      )}
      {rising && (
        <div>上升:
          <span className="text-[#fbbf24] ml-1">
            {getZodiacSymbol(ascendant!)} {rising}
          </span>
        </div>
      )}
    </div>
  );
};
