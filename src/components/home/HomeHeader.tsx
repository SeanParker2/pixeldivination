import React from 'react';

export const HomeHeader: React.FC = () => {
  return (
    <header className="pt-8 pb-8 flex justify-center items-center text-center relative mt-8">
      <h1 
        className="text-3xl text-pixel-gold tracking-widest uppercase animate-[text-flicker_3s_infinite]"
        style={{ animation: 'text-flicker 3s infinite' }}
      >
        Magic Lightning
      </h1>
    </header>
  );
};
