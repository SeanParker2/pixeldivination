import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, Sparkles, ShoppingBag, User } from 'lucide-react';
import { cn } from '../../lib/utils';
import { playSound } from '../../lib/audio';
import { triggerHaptic } from '../../lib/haptics';

interface BottomNavProps {
  className?: string;
}

const NAV_ITEMS = [
  { id: 'home', path: '/', label: '首页', icon: Home },
  { id: 'chart', path: '/starchart', label: '星盘', icon: Compass },
  { id: 'divination', path: '/divination', label: '占卜', icon: Sparkles, isCenter: true },
  { id: 'store', path: '/shop', label: '商城', icon: ShoppingBag },
  { id: 'profile', path: '/profile', label: '我的', icon: User },
];

export const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  const getActiveTab = (path: string) => {
    if (path === '/') return 'home';
    if (path === '/starchart') return 'chart';
    if (path === '/divination') return 'divination';
    if (path === '/store' || path === '/shop') return 'store';
    if (path === '/profile') return 'profile';
    return '';
  };

  const activeTab = getActiveTab(pathname);
  
  const handleNav = (path: string) => {
    playSound('tap');
    triggerHaptic('light');
    navigate(path);
  };

  return (
    <div className={cn("bottom-bar", className)}>
      {/* 背景毛玻璃效果 */}
      <div className="absolute inset-0 bg-[#0a0a1a]/90 backdrop-blur-xl border-t border-white/5" />
      
      <div className="relative flex items-center justify-around w-full max-w-md mx-auto px-2">
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          if (item.isCenter) {
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleNav(item.path)}
                className="relative -mt-8 z-10"
              >
                {/* 外圈发光 */}
                <motion.div
                  className="absolute inset-0 rounded-full -m-2"
                  style={{
                    background: 'radial-gradient(circle, rgba(251, 191, 36, 0.4), transparent)',
                    filter: 'blur(15px)',
                  }}
                  animate={isActive ? { 
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.6, 0.3],
                  } : { scale: 1, opacity: 0.2 }}
                  transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                />
                
                {/* 能量环 */}
                <motion.div
                  className="absolute inset-0 rounded-full -m-1"
                  style={{
                    border: '2px solid transparent',
                    background: 'linear-gradient(#0a0a1a, #0a0a1a) padding-box, conic-gradient(from 0deg, #fbbf24, #8b5cf6, #ec4899, #fbbf24) border-box',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* 按钮主体 */}
                <motion.div
                  className="relative w-14 h-14 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                    boxShadow: isActive 
                      ? '0 0 30px rgba(251, 191, 36, 0.6), 0 0 60px rgba(251, 191, 36, 0.3), inset 0 0 10px rgba(255, 255, 255, 0.2)'
                      : '0 4px 20px rgba(251, 191, 36, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Icon className="text-black drop-shadow-sm" size={24} strokeWidth={2.5} />
                </motion.div>
                
                <span className={cn(
                  "text-[10px] mt-1.5 block text-center transition-colors font-medium",
                  isActive ? "text-yellow-400" : "text-gray-500"
                )}>
                  {item.label}
                </span>
              </motion.button>
            );
          }

          return (
            <motion.button
              key={item.id}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleNav(item.path)}
              className="relative flex flex-col items-center gap-1 py-2 px-3"
            >
              <div className="relative">
                <motion.div
                  animate={isActive ? { y: -2 } : { y: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Icon 
                    size={20} 
                    className={cn(
                      "transition-all duration-300",
                      isActive 
                        ? "text-white" 
                        : "text-gray-500"
                    )}
                    strokeWidth={isActive ? 2.5 : 1.5}
                  />
                </motion.div>
                
                {/* 活跃指示器 */}
                {isActive && (
                  <motion.div
                    layoutId="navIndicator"
                    className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white"
                    style={{
                      boxShadow: '0 0 8px rgba(255, 255, 255, 0.8), 0 0 16px rgba(255, 255, 255, 0.4)',
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </div>
              
              <span className={cn(
                "text-[10px] transition-colors",
                isActive ? "text-white" : "text-gray-500"
              )}>
                {item.label}
              </span>
              
              {/* 悬浮背景 */}
              {isActive && (
                <motion.div
                  layoutId="navBg"
                  className="absolute inset-0 rounded-lg bg-white/5"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
