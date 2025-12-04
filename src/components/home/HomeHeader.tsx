import React from 'react';

export const HomeHeader: React.FC = () => {
  return (
    <header className="pt-8 pb-4 flex justify-center items-center">
      <h1 
        className="text-2xl font-pixel text-[#e4ded7] tracking-widest uppercase"
        style={{ textShadow: '2px 2px 0px #000, 0 0 10px rgba(228, 222, 215, 0.3)' }}
      >
        Magic Lightning
      </h1>
    </header>
  );
};
