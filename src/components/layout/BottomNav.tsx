import React from 'react';
import { Disc, Aperture, Plus, Store, User } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';

interface BottomNavProps {
  className?: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveTab = (path: string) => {
    if (path === '/') return 'home';
    if (path === '/starchart') return 'chart';
    if (path === '/store' || path === '/shop') return 'store';
    if (path === '/profile') return 'profile';
    return '';
  };

  const activeTab = getActiveTab(pathname);

  return (
    <div className={cn("w-full max-w-md bg-pixel-midnight border-t border-pixel-border h-20 px-6 flex items-center justify-between z-50", className)}>
      <NavItem icon={Disc} label="首页" active={activeTab === 'home'} onClick={() => navigate('/')} />
      <NavItem icon={Aperture} label="星盘" active={activeTab === 'chart'} onClick={() => navigate('/starchart')} />
      
      {/* Center Plus Button */}
      <div className="relative -top-8">
        <button 
          onClick={() => navigate('/divination')}
          className="w-16 h-16 rounded-full border-4 border-[#1E1E2E] flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
          style={{
            background: 'linear-gradient(180deg, #E8CDA8 0%, #F4E6CF 100%)'
          }}
        >
          <Plus size={32} className="text-[#1E1E2E]" strokeWidth={3} />
        </button>
      </div>

      <NavItem icon={Store} label="商店" active={activeTab === 'store'} onClick={() => navigate('/shop')} />
      <NavItem icon={User} label="我的" active={activeTab === 'profile'} onClick={() => navigate('/profile')} />
    </div>
  );
};

const NavItem = ({ 
    icon: Icon, 
    label, 
    active = false,
    onClick 
}: { 
    icon: React.ElementType, 
    label: string, 
    active?: boolean,
    onClick?: () => void
}) => (
  <button onClick={onClick} className="flex flex-col items-center gap-1 group flex-1">
    <Icon 
        size={24} 
        className={cn(
            "transition-colors",
            active ? "text-[#E8CDA8]" : "text-[#494c52] group-hover:text-[#E8CDA8]"
        )} 
        strokeWidth={active ? 2.5 : 2}
    />
    <span className={cn(
        "text-[10px] font-medium",
        active ? "text-[#E8CDA8]" : "text-[#494c52] group-hover:text-[#E8CDA8]"
    )}>
        {label}
    </span>
  </button>
);
