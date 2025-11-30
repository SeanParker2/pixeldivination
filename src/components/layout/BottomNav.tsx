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
    <div className={cn("fixed bottom-0 w-full max-w-md bg-pixel-midnight border-t border-pixel-border h-20 px-6 flex items-center justify-between z-50", className)}>
      <NavItem icon={Disc} label="首页" active={activeTab === 'home'} onClick={() => navigate('/')} />
      <NavItem icon={Aperture} label="星盘" active={activeTab === 'chart'} onClick={() => navigate('/starchart')} />
      
      {/* Center Plus Button */}
      <div className="relative -top-6">
        <button 
          onClick={() => navigate('/divination')}
          className="w-14 h-14 rounded-full bg-pixel-gold flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform"
        >
          <Plus size={28} className="text-pixel-black" strokeWidth={3} />
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
  <button onClick={onClick} className="flex flex-col items-center gap-1 group">
    <Icon 
        size={24} 
        className={cn(
            "transition-colors",
            active ? "text-white fill-white" : "text-pixel-secondary group-hover:text-white"
        )} 
        strokeWidth={active ? 2.5 : 2}
    />
    <span className={cn(
        "text-[10px]",
        active ? "text-white font-medium" : "text-pixel-secondary group-hover:text-white"
    )}>
        {label}
    </span>
  </button>
);
