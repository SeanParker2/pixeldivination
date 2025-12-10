import React, { useState } from 'react';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { MenuSection, MenuItem } from '../components/profile/ProfileMenu';
import { CartDrawer } from '../components/shop/CartDrawer';
import { HistoryDrawer } from '../components/profile/HistoryDrawer';
import { PersonaDrawer } from '../components/profile/PersonaDrawer';
import { useUserStore } from '../stores/useUserStore';
import { PERSONAS } from '../types/ai';

export const Profile: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { activePersona } = useUserStore();

  const currentPersona = PERSONAS[activePersona];

  return (
    <div className="w-full max-w-md mx-auto pt-4 pb-32 px-4 flex flex-col h-full relative">
      <ProfileHeader />
      
      {/* Main Content Area */}
      <StatsGrid 
          onCartClick={() => setIsCartOpen(true)}
          onHistoryClick={() => setIsHistoryOpen(true)}
      />
      
      {/* Menu Sections */}
      <MenuSection title="我的旅程">
          <MenuItem 
              variant="persona"
              icon="🧙‍♀️" 
              label={`AI 占卜师人格`}
              rightElement={<span className="bg-[#8b5cf6] text-white px-1.5 py-0.5 rounded text-[10px] ml-2">{currentPersona.name}</span>}
              subLabel={`当前风格：${currentPersona.desc}`}
              onClick={() => setIsPersonaOpen(true)}
          />
          
          <MenuItem 
              icon="🎒"
              label="我的装备 (灵性道具)"
              onClick={() => {}}
          />
      </MenuSection>

      <MenuSection title="系统" className="pt-0">
          <MenuItem 
              icon="📦"
              label="我的订单"
              onClick={() => {}} 
          />
          
          <MenuItem 
              icon="💳"
              label="能量币充值"
              onClick={() => {}}
          />
      </MenuSection>

      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <PersonaDrawer isOpen={isPersonaOpen} onClose={() => setIsPersonaOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
