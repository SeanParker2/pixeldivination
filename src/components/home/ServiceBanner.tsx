import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ServiceBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="glass-card banner" 
      style={{marginTop: '16px', cursor: 'pointer'}}
      onClick={() => navigate('/shop')}
    >
        <div>
            <h3>占卜歌者<br/><span>100% 灵魂传递</span></h3>
        </div>
        <div className="banner-glow"></div>
        <img 
            src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Wizard" 
            style={{position:'absolute', right:'10px', height:'80px', filter:'drop-shadow(0 0 10px rgba(255,255,255,0.5))'}} 
            alt="Wizard"
        />
    </div>
  );
};
