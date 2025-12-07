import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#09090b] text-[#e2e8f0] font-pixel relative overflow-hidden">
      {/* Background Effects */}
      <div className="stars-bg" />
      <div className="scanlines" />
      <div className="vignette" />

      {/* Main Content */}
      <main className="w-full relative z-10">
          <Outlet />
      </main>
      
      {/* Bottom Nav */}
      <BottomNav className="left-0 right-0 mx-auto z-50" />
    </div>
  );
};
