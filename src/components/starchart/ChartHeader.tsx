import React from 'react';
import { cn } from '../../lib/utils';

interface ChartHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["合盘", "本命盘", "行运盘", "天象盘"];

  return (
    <div className="flex flex-col w-full bg-[#09090b] sticky top-0 z-10 pb-0">
      {/* Title */}
      <div className="text-center my-5 text-2xl text-white tracking-[4px] shadow-glow" 
           style={{ textShadow: '0 0 10px rgba(255,255,255,0.5)' }}>
          STAR CHART
      </div>

      {/* Tabs */}
      <div className="flex justify-between border-b border-white/10 px-0 pb-0 mb-5">
        {tabs.map((tab) => (
          <div
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex-1 text-center py-2.5 cursor-pointer relative text-[16px]",
              activeTab === tab 
                ? "text-white" 
                : "text-[#64748b]"
            )}
            style={activeTab === tab ? { textShadow: '0 0 5px rgba(255,255,255,0.5)' } : {}}
          >
            {tab}
            {activeTab === tab && (
              <div 
                className="absolute bottom-[-1px] left-1/4 w-1/2 h-[2px] bg-[#fbbf24]"
                style={{ boxShadow: '0 0 8px #fbbf24' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
