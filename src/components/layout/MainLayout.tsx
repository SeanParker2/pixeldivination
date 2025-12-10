import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export const MainLayout: React.FC = () => {
  const location = useLocation();
  // Hide BottomNav on Product Detail pages (/shop/:id)
  const shouldHideBottomNav = /^\/shop\/\d+$/.test(location.pathname);

  return (
    <div className="min-h-screen bg-[#09090b] font-pixel relative flex justify-center">
      {/* Backgrounds (Fixed) */}
      <div className="stars-bg fixed inset-0 z-0" />
      <div className="scanlines fixed inset-0 z-50 pointer-events-none" />
      <div className="vignette fixed inset-0 z-40 pointer-events-none" />
      
      {/* Scrollable Content Wrapper */}
      <div className="relative z-10 w-full flex justify-center">
          <Outlet />
      </div>

      {/* Bottom Nav (Fixed on top of everything) */}
      {!shouldHideBottomNav && (
        <BottomNav className="fixed bottom-0 left-0 right-0 mx-auto z-[100]" />
      )}
    </div>
  );
};
