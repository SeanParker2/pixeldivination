import React from 'react';
import { FileText, Inbox, ChevronRight, Clock } from 'lucide-react';

interface ProfileMenuProps {
  onHistoryClick?: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onHistoryClick }) => {
  return (
    <div className="flex flex-col px-6 gap-2">
      <MenuItem icon={FileText} label="我的订单" />
      <MenuItem icon={Clock} label="占卜历史" onClick={onHistoryClick} />
      <MenuItem icon={Inbox} label="我的档案" onClick={onHistoryClick} />
    </div>
  );
};

interface MenuItemProps {
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, onClick }) => {
  return (
    <button 
      onClick={onClick}
      className="flex items-center w-full py-4 text-left group hover:bg-white/5 rounded-lg transition-colors px-2 -mx-2"
    >
      <div className="text-white/80 group-hover:text-white mr-4">
        <Icon size={22} />
      </div>
      <span className="text-white text-base font-medium flex-1 group-hover:text-pixel-gold transition-colors">
        {label}
      </span>
      <ChevronRight size={18} className="text-gray-500 group-hover:text-white transition-colors" />
    </button>
  );
};
