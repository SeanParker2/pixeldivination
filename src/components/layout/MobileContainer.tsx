import React from 'react';
import { cn } from '../../lib/utils';
import { Ghost, House, Layers, Settings } from 'lucide-react';

interface MobileContainerProps {
  children: React.ReactNode;
  className?: string;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

export const MobileContainer: React.FC<MobileContainerProps> = ({ 
  children, 
  className,
  hideHeader = false,
  hideFooter = false
}) => {
  return (
    <div className="min-h-screen w-full bg-pixel-dark flex justify-center items-start overflow-hidden font-pixel">
      <div 
        className={cn(
          "w-full max-w-md min-h-screen bg-pixel-beige relative shadow-2xl flex flex-col",
          "border-x-4 border-pixel-black",
          className
        )}
      >
        {/* Safe Area Top for iOS */}
        <div className="h-safe-top w-full bg-pixel-black" />
        
        {/* Header */}
        {!hideHeader && (
          <header className="bg-pixel-green border-b-4 border-pixel-black p-4 flex items-center justify-between shadow-pixel">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-pixel-gold border-2 border-pixel-black shadow-pixel-sm flex items-center justify-center">
                <Ghost className="w-5 h-5 text-pixel-black" />
              </div>
              <h1 className="text-2xl font-bold text-pixel-beige tracking-widest drop-shadow-md">PIXEL DIVINATION</h1>
            </div>
          </header>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 relative">
            {children}
        </main>
        
        {/* Bottom Navigation (Placeholder) */}
        {!hideFooter && (
          <nav className="h-16 bg-pixel-brown border-t-4 border-pixel-black flex justify-around items-center px-4">
              <NavIcon icon={House} label="Home" active />
              <NavIcon icon={Layers} label="Cards" />
              <NavIcon icon={Settings} label="Settings" />
          </nav>
        )}

        {/* Safe Area Bottom for iOS */}
        <div className="h-safe-bottom w-full bg-pixel-black" />
      </div>
    </div>
  );
};

const NavIcon = ({ icon: Icon, label, active = false }: { icon: React.ElementType, label: string, active?: boolean }) => (
    <button className={cn(
        "flex flex-col items-center justify-center w-12 h-12 transition-all active:scale-95",
        active ? "text-pixel-gold -translate-y-1" : "text-pixel-beige opacity-70 hover:opacity-100"
    )}>
        <Icon size={24} strokeWidth={2.5} />
        <span className="text-[10px] uppercase mt-1 tracking-wider">{label}</span>
    </button>
);
