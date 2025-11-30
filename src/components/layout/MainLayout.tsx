import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#161622] text-white font-pixel">
      {/* 页面内容区域 */}
      <main className="w-full">
          <Outlet />
      </main>
      
      {/* 全局导航栏 - Added centering classes for desktop */}
      <BottomNav className="left-0 right-0 mx-auto" />
    </div>
  );
};
