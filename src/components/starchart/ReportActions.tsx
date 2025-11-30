import React from 'react';
import { User, Heart } from 'lucide-react';

interface ReportActionsProps {
  onNatalReading?: () => void;
}

export const ReportActions: React.FC<ReportActionsProps> = ({ onNatalReading }) => {
  return (
    <div className="w-full px-4 mt-auto">
      <div className="text-center mb-4">
        <p className="text-xs text-pixel-secondary">
          如果你也有混乱、痛苦，可以试试在星盘中寻找根源。
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Pink Card - 合盘报告 */}
        <button className="bg-pink-100 hover:bg-pink-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-pink-300">
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
          onClick={onNatalReading}
          className="bg-orange-100 hover:bg-orange-200 transition-colors rounded-2xl p-4 flex flex-col items-start gap-3 border-2 border-transparent hover:border-orange-300"
        >
          <div className="p-2 bg-orange-200 rounded-full text-orange-700">
            <User size={20} />
          </div>
          <div className="text-left">
            <h3 className="text-orange-900 font-bold text-sm">本命解读</h3>
            <span className="text-orange-700 text-xs">AI 深度解读</span>
          </div>
        </button>
      </div>
    </div>
  );
};
