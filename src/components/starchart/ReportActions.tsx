import React from 'react';
import { Loader2 } from 'lucide-react';

interface ReportActionsProps {
  activeTab: string;
  onGenerate: () => void;
  isLoading: boolean;
  onTransitReading?: () => void;
  onSkyReading?: () => void;
}

export const ReportActions: React.FC<ReportActionsProps> = ({ 
  activeTab,
  onGenerate,
  isLoading,
  onTransitReading,
  onSkyReading
}) => {
  
  const handleClick = () => {
      if (activeTab === '行运盘' && onTransitReading) onTransitReading();
      else if (activeTab === '天象盘' && onSkyReading) onSkyReading();
      else onGenerate();
  };

  const getLabel = () => {
      if (isLoading) return "星象推演中...";
      if (activeTab === '行运盘') return "✨ AI 行运推演";
      if (activeTab === '天象盘') return "✨ AI 天象解读";
      return "✨ AI 深度解读命盘";
  };

  return (
    <div className="w-full px-0 mt-4">
        <button 
            onClick={handleClick}
            disabled={isLoading}
            className="w-full p-3.5 bg-gradient-to-r from-[#7c3aed] to-[#db2777] text-white text-lg tracking-[2px] uppercase font-sans border-none shadow-[0_0_15px_rgba(124,58,237,0.5)] relative overflow-hidden transition-all active:scale-[0.98] active:opacity-90 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
                clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                borderRadius: '2px'
            }}
        >
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader2 size={20} className="animate-spin" />
                    <span>ANALYZING...</span>
                </div>
            ) : (
                getLabel()
            )}
        </button>
        
        <p className="text-center mt-3 text-xs text-[#64748b]">
          {activeTab === '行运盘' ? '星体的移动，时刻影响着你的生活轨迹。' : 
           activeTab === '天象盘' ? '观察宇宙的呼吸，把握当下的能量流动。' : 
           '如果你也有混乱、痛苦，可以试试在星盘中寻找根源。'}
        </p>
    </div>
  );
};
