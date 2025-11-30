import React from 'react';
import { Store, Disc, Heart } from 'lucide-react';

export const StatsGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-4 px-6 mt-16 mb-8">
      <StatItem icon={Store} label="购物车" value="175" />
      <StatItem icon={Disc} label="报告" value="312" />
      <StatItem icon={Heart} label="收藏" value="806" />
    </div>
  );
};

interface StatItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon: Icon, label, value }) => {
  return (
    <div className="bg-[#1E1E2E] aspect-square flex flex-col items-center justify-center rounded-lg shadow-sm gap-2 hover:bg-[#252538] transition-colors cursor-pointer">
      <Icon size={24} className="text-white" />
      <div className="text-center">
        <div className="text-white font-bold text-lg leading-tight">{value}</div>
        <div className="text-gray-400 text-xs mt-1">{label}</div>
      </div>
    </div>
  );
};
