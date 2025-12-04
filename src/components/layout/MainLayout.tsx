import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';
import { cn } from '../../lib/utils';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full bg-pixel-dark flex justify-center items-start font-pixel relative overflow-hidden">
      {/* Desktop Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none z-0"
        style={{
            backgroundImage: 'radial-gradient(#577348 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
      />

      {/* Phone Frame */}
      <div className="w-full max-w-md h-[100dvh] bg-pixel-midnight relative shadow-2xl flex flex-col border-x-4 border-pixel-border z-10">
        {/* Status Bar / Safe Area (Visual only) */}
        <div className="h-safe-top w-full bg-pixel-midnight shrink-0" />

        {/* Main Content Area - Scrollable */}
        <main className="flex-1 overflow-y-auto scrollbar-hide w-full relative">
          <Outlet />
        </main>
        
        {/* Bottom Navigation */}
        <BottomNav className="sticky bottom-0 z-50" />
      </div>
    </div>
  );
};
