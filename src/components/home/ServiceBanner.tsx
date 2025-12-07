import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ServiceBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/shop')}
      className="glass-card mx-4 mt-4 relative overflow-hidden h-32 flex items-center px-6 cursor-pointer group"
    >
       {/* Glow Effect */}
       <div className="absolute right-[-20px] top-[-20px] w-32 h-32 bg-pixel-gold blur-[60px] opacity-20 pointer-events-none" />

       <div className="z-10 relative flex-1">
        <h3 className="text-white text-2xl font-medium leading-tight font-sans">
          占卜歌者<br/>
          <span className="text-pixel-gold">100% 灵魂传递</span>
        </h3>
      </div>
      
      <img 
        src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Wizard" 
        alt="Wizard" 
        className="absolute right-4 h-20 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:scale-105 transition-transform duration-300"
      />
    </div>
  );
};
