import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { StarryBackground } from '../ui/StarryBackground';
import { ScanlineOverlay, VignetteOverlay } from '../ui/NeonEffects';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  // Hide BottomNav on Product Detail pages (/shop/:id)
  const shouldHideBottomNav = /^\/shop\/\d+$/.test(location.pathname);
  
  // 判断是否是占卜页面（需要更暗的背景）
  const isDivinationPage = location.pathname === '/divination';

  return (
    <div className="min-h-screen bg-[#09090b] font-pixel relative flex justify-center overflow-hidden">
      {/* 星空粒子背景 */}
      <StarryBackground />
      
      {/* 扫描线效果 - 减少透明度 */}
      <ScanlineOverlay opacity={0.03} />
      
      {/* 暗角效果 */}
      <VignetteOverlay intensity={0.4} />
      
      {/* 主内容区域 */}
      <div className="relative z-10 w-full flex justify-center min-h-screen">
        <Outlet />
      </div>

      {/* 底部导航 */}
      {!shouldHideBottomNav && (
        <BottomNav className="fixed bottom-0 left-0 right-0 mx-auto z-[100]" />
      )}
    </div>
  );
};
