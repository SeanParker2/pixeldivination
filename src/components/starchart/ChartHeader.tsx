import React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ChartHeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const ChartHeader: React.FC<ChartHeaderProps> = ({ activeTab, onTabChange }) => {
  const tabs = ["合盘", "本命盘", "行运盘", "天象盘"];

  return (
    <div className="flex flex-col w-full bg-pixel-dark/50 backdrop-blur-sm sticky top-0 z-10">
      {/* Compact User Info */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
           <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center">
            <img 
                src="/images/home/avatar_user.png" 
                alt="User" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYgMCI+PC9wYXRoPjwvc3ZnPg==';
                }}
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-white text-sm font-medium">白羊座 (示例)</span>
            <ChevronDown size={14} className="text-pixel-secondary" />
          </div>
        </div>
        <div className="text-pixel-secondary text-xs">
            2000-04-15
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between px-2 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={cn(
              "flex-1 pb-2 text-sm font-medium transition-colors relative",
              activeTab === tab 
                ? "text-white" 
                : "text-pixel-secondary hover:text-white/80"
            )}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
