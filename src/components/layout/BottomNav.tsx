import React from 'react';
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
  const handleNav = (path: string) => navigate(path);

  return (
    <div className={cn("bottom-bar", className)}>
      <div 
        className={`tab-icon ${activeTab === 'home' ? 'active' : ''}`}
        onClick={() => handleNav('/')}
      >
        <span>⦿</span>
        <span className="tab-label">首页</span>
      </div>

      <div 
        className={`tab-icon ${activeTab === 'chart' ? 'active' : ''}`}
        onClick={() => handleNav('/starchart')}
      >
        <span>✛</span>
        <span className="tab-label">星盘</span>
      </div>

      <div className="plus-btn" onClick={() => handleNav('/divination')}>
        +
      </div>

      <div 
        className={`tab-icon ${activeTab === 'store' ? 'active' : ''}`}
        onClick={() => handleNav('/shop')}
      >
        <span>⛺</span>
        <span className="tab-label">商店</span>
      </div>

      <div 
        className={`tab-icon ${activeTab === 'profile' ? 'active' : ''}`}
        onClick={() => handleNav('/profile')}
      >
        <span>☺</span>
        <span className="tab-label">我的</span>
      </div>
    </div>
  );
};
