import React, { useState } from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { ProfileMenu } from '../components/profile/ProfileMenu';
import { HistoryDrawer } from '../components/profile/HistoryDrawer';
import { PERSONAS } from '../types/ai';
import { useUserStore } from '../stores/useUserStore';

export const Profile: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { activePersona, setPersona } = useUserStore();

  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Scrollable Content */}
      <div className="flex flex-col pb-32">
        <ProfileHeader />
        
        {/* Main Content Area */}
        <StatsGrid />
        
        {/* Persona Selection */}
        <div className="px-6 py-4">
          <h3 className="text-white text-lg font-pixel mb-4">选择占卜师</h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(PERSONAS).map(([key, persona]) => (
              <div 
                key={key}
                onClick={() => setPersona(key as any)}
                className={`
                  p-4 rounded-xl border cursor-pointer transition-all duration-300 relative overflow-hidden
                  ${activePersona === key 
                    ? 'bg-white/10 border-pixel-gold shadow-[0_0_15px_rgba(255,215,0,0.2)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                  }
                `}
              >
                <div className="flex justify-between items-center mb-1 relative z-10">
                  <span className={`text-base font-bold ${activePersona === key ? 'text-pixel-gold' : 'text-white'}`}>
                    {persona.name}
                  </span>
                  {activePersona === key && (
                    <span className="text-xs text-pixel-gold px-2 py-0.5 bg-pixel-gold/10 rounded-full border border-pixel-gold/30">
                      当前
                    </span>
                  )}
                </div>
                <p className="text-xs text-gray-400 relative z-10 mb-2">{persona.desc}</p>
                <p className="text-[10px] text-gray-500 relative z-10 line-clamp-2">{persona.prompt}</p>
                
                {/* Background Gradient Effect for Active Item */}
                {activePersona === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pixel-gold/5 to-transparent pointer-events-none" />
                )}
              </div>
            ))}
          </div>
        </div>

        <ProfileMenu onHistoryClick={() => setIsHistoryOpen(true)} />
      </div>

      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </MobileContainer>
  );
};
