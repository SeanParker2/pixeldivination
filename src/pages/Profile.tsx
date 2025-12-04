import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { ProfileMenu } from '../components/profile/ProfileMenu';
import { HistoryDrawer } from '../components/profile/HistoryDrawer';
import { PERSONAS } from '../types/ai';
import { useUserStore } from '../stores/useUserStore';
import { Card, CardContent } from '../components/ui/Card';

export const Profile: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const { activePersona, setPersona } = useUserStore();

  return (
    <div className="flex flex-col h-full relative">
      {/* Scrollable Content */}
      <div className="flex flex-col pb-32 space-y-6">
        <ProfileHeader />
        
        {/* Main Content Area */}
        <StatsGrid />
        
        {/* Persona Selection */}
        <div className="px-6 py-4">
          <h3 className="text-white text-lg font-pixel mb-4">选择占卜师</h3>
          <div className="grid grid-cols-1 gap-3">
            {Object.entries(PERSONAS).map(([key, persona]) => (
              <Card
                key={key}
                variant={activePersona === key ? 'default' : 'outlined'}
                onClick={() => setPersona(key as any)}
                className={`cursor-pointer transition-all duration-300 relative overflow-hidden group ${activePersona === key ? 'border-pixel-gold' : 'border-white/10 hover:border-white/30'}`}
              >
                <div className="flex justify-between items-center mb-2 relative z-10">
                  <span className={`text-base font-bold ${activePersona === key ? 'text-pixel-gold' : 'text-white group-hover:text-white'}`}>
                    {persona.name}
                  </span>
                  {activePersona === key && (
                    <span className="text-xs text-pixel-gold px-2 py-0.5 bg-pixel-gold/10 rounded-none border border-pixel-gold/30">
                      当前
                    </span>
                  )}
                </div>
                <CardContent className="p-0">
                    <p className="text-xs text-gray-400 relative z-10 mb-2">{persona.desc}</p>
                    <p className="text-[10px] text-gray-500 relative z-10 line-clamp-2">{persona.prompt}</p>
                </CardContent>
                
                {/* Background Gradient Effect for Active Item */}
                {activePersona === key && (
                  <div className="absolute inset-0 bg-gradient-to-r from-pixel-gold/5 to-transparent pointer-events-none" />
                )}
              </Card>
            ))}
          </div>
        </div>

        <ProfileMenu onHistoryClick={() => setIsHistoryOpen(true)} />
      </div>

      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </div>
  );
};
