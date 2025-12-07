import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ServiceBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/shop')}
      className="glass-card flex items-center relative overflow-hidden h-[100px] px-5 mt-4 cursor-pointer"
      style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          border: '1px solid rgba(139, 92, 246, 0.5)'
      }}
    >
      <div className="z-10 relative">
        <h3 className="text-white text-[24px] font-medium leading-[1.1] m-0 font-sans">
          占卜歌者<br/>
          <span className="text-[#fbbf24]">100% 灵魂传递</span>
        </h3>
      </div>
      
      {/* Banner Glow */}
      <div 
        className="absolute -right-5 w-[100px] h-[100px] bg-[#fbbf24] opacity-30 blur-[50px]"
      />
      
      <img 
        src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Wizard" 
        alt="Wizard" 
        className="absolute right-2.5 h-[80px] drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      />
    </div>
  );
};
