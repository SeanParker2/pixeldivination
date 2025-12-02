import React from 'react';
import { User, Heart, Compass, MoonStar, Loader2 } from 'lucide-react';

interface ReportActionsProps {
  activeTab: string;
  onGenerate: () => void;
  isLoading: boolean;
  // Optional props for other tabs if we want to keep them working later
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
  const renderContent = () => {
    switch (activeTab) {
      case '行运盘':
        return (
          <button 
            onClick={onTransitReading}
            disabled={isLoading}
            className="w-full bg-blue-100 hover:bg-blue-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-blue-200 rounded-full text-blue-700">
               {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Compass size={20} />}
            </div>
            <div className="text-left">
              <h3 className="text-blue-900 font-bold text-sm">行运推演</h3>
              <span className="text-blue-700 text-xs">近期运势分析</span>
            </div>
          </button>
        );
      case '天象盘':
        return (
          <button 
            onClick={onSkyReading}
            disabled={isLoading}
            className="w-full bg-indigo-100 hover:bg-indigo-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="p-2 bg-indigo-200 rounded-full text-indigo-700">
               {isLoading ? <Loader2 size={20} className="animate-spin" /> : <MoonStar size={20} />}
            </div>
            <div className="text-left">
              <h3 className="text-indigo-900 font-bold text-sm">天象解读</h3>
              <span className="text-indigo-700 text-xs">今日宇宙能量</span>
            </div>
          </button>
        );
      default:
        return (
          <div className="grid grid-cols-2 gap-4 w-full">
            {/* Pink Card - 合盘报告 */}
            <button 
              onClick={() => alert("合盘功能即将上线")}
              disabled={isLoading}
              className="bg-pink-100 hover:bg-pink-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-pink-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="p-2 bg-pink-200 rounded-full text-pink-700">
                 <Heart size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-pink-900 font-bold text-sm">合盘报告</h3>
                <span className="text-pink-700 text-xs">综合报告</span>
              </div>
            </button>

            {/* Orange Card - 本命解读 */}
            <button 
              onClick={onGenerate}
              disabled={isLoading}
              className="bg-orange-100 hover:bg-orange-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-orange-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="p-2 bg-orange-200 rounded-full text-orange-700">
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <User size={20} />}
              </div>
              <div className="text-left">
                <h3 className="text-orange-900 font-bold text-sm">
                  {isLoading ? "星象推演中..." : "本命解读"}
                </h3>
                <span className="text-orange-700 text-xs">AI 深度解读</span>
              </div>
            </button>
          </div>
        );
    }
  };

  return (
    <div className="w-full px-4 mt-auto">
      <div className="text-center mb-4">
        <p className="text-xs text-pixel-secondary">
          {activeTab === '行运盘' ? '星体的移动，时刻影响着你的生活轨迹。' : 
           activeTab === '天象盘' ? '观察宇宙的呼吸，把握当下的能量流动。' : 
           '如果你也有混乱、痛苦，可以试试在星盘中寻找根源。'}
        </p>
      </div>

      {renderContent()}
    </div>
  );
};