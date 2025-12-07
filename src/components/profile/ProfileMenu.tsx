import React from 'react';
import { ChevronRight } from 'lucide-react';

interface MenuSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`px-5 py-5 flex flex-col gap-3 ${className}`}>
      <div className="text-sm text-[#64748b] mb-1 pl-1 uppercase tracking-[2px] font-pixel">
        {title}
      </div>
      {children}
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  subLabel?: string; // For persona or extra info
  onClick?: () => void;
  variant?: 'default' | 'persona';
  rightElement?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = ({ 
  icon, 
  label, 
  subLabel, 
  onClick, 
  variant = 'default',
  rightElement 
}) => {
  const isPersona = variant === 'persona';
  
  const baseStyles = "flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-transparent";
  const defaultStyles = "bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10";
  const personaStyles = "bg-gradient-to-r from-violet-600/20 to-pink-500/20 border-violet-500/30 hover:border-violet-500/50";

  return (
    <div 
      onClick={onClick}
      className={`${baseStyles} ${isPersona ? personaStyles : defaultStyles}`}
    >
      <div className="flex items-center gap-3">
        {/* Icon Box */}
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isPersona ? 'text-[#d8b4fe] bg-black/20' : 'text-[#fbbf24] bg-black/30'}`}>
          {icon}
        </div>
        
        {/* Text */}
        <div>
          <div className="text-white text-lg font-pixel flex items-center gap-2">
            {label}
            {isPersona && rightElement}
          </div>
          {subLabel && (
             <div className="text-xs text-white/50 font-pixel mt-0.5">
               {subLabel}
             </div>
          )}
        </div>
      </div>

      <ChevronRight size={20} className="text-[#475569]" />
    </div>
  );
};
