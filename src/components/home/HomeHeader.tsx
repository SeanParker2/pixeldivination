import React from 'react';

export const HomeHeader: React.FC = () => {
  return (
    <header className="pt-8 pb-8 flex justify-center items-center text-center relative">
      <h1 
        className="text-[32px] font-pixel tracking-[4px] uppercase animate-text-flicker"
        style={{ 
            color: 'var(--text-gold)',
            textShadow: '0 0 10px rgba(251, 191, 36, 0.6), 2px 2px 0px #000'
        }}
      >
        Magic Lightning
      </h1>
    </header>
  );
};
