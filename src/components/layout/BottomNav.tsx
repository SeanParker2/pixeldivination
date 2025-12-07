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
    <div className={cn("w-full h-[70px] bg-[#0f172a] border-t border-[#334155] flex justify-around items-center pb-2.5 z-[200]", className)}>
      <NavItem icon={Disc} label="首页" active={activeTab === 'home'} onClick={() => navigate('/')} />
      <NavItem icon={Aperture} label="星盘" active={activeTab === 'chart'} onClick={() => navigate('/starchart')} />
      
      {/* Center Floating Button */}
      <div className="relative -top-[25px]">
        <button 
          onClick={() => navigate('/divination')}
          className="w-[64px] h-[64px] rounded-full bg-[#fbbf24] flex items-center justify-center text-[#000] border-[6px] border-[#09090b] shadow-[0_0_20px_rgba(251,191,36,0.4)] hover:scale-105 transition-transform"
        >
          <Plus size={32} strokeWidth={3} />
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
  <button onClick={onClick} className={cn("flex flex-col items-center gap-1", active ? "text-white" : "text-[#64748b]")}>
    <Icon 
        size={20} 
        className={cn("transition-all", active && "drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]")} 
        strokeWidth={active ? 2.5 : 2}
    />
    <span className="text-[10px] font-sans">
        {label}
    </span>
  </button>
);
