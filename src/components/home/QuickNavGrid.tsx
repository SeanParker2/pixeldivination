import React, { useState } from 'react';
import { DiceModal } from './DiceModal';
import { LenormandModal } from './LenormandModal';
import { FengShuiModal } from './FengShuiModal';
import { playSound } from '../../lib/audio';
import { triggerHaptic } from '../../lib/haptics';

const NAV_ITEMS = [
  { id: 'rider', label: '雷诺曼牌', img: '/images/home/nav_rider.png' },
  { id: 'dice', label: '星座骰子', img: '/images/home/nav_dice.png' },
  { id: 'fengshui', label: '办公风水', img: '/images/home/nav_fengshui.png' },
];

export const QuickNavGrid: React.FC = () => {
  const [showDiceModal, setShowDiceModal] = useState(false);
  const [showLenormandModal, setShowLenormandModal] = useState(false);
  const [showFengShuiModal, setShowFengShuiModal] = useState(false);

  const handleItemClick = (id: string) => {
    playSound('tap');
    triggerHaptic('light');
    if (id === 'dice') {
      setShowDiceModal(true);
    } else if (id === 'rider') {
      setShowLenormandModal(true);
    } else if (id === 'fengshui') {
      setShowFengShuiModal(true);
    } else {
      // Placeholder for other features
      alert("功能开发中...");
    }
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-3 px-0 mt-5 pb-20">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleItemClick(item.id)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-[60px] h-[60px] bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:bg-[#fbbf24]/10 group-hover:border-[#fbbf24] group-hover:shadow-[0_0_10px_rgba(251,191,36,0.3)] group-hover:-translate-y-0.5">
              {item.id === 'rider' && '🃏'}
              {item.id === 'dice' && '🎲'}
              {item.id === 'fengshui' && '☯️'}
            </div>
            <span className="text-[#e2e8f0] text-[14px] font-sans">{item.label}</span>
          </div>
        ))}
      </div>

      <DiceModal 
        isOpen={showDiceModal} 
        onClose={() => setShowDiceModal(false)} 
      />
      
      <LenormandModal
        isOpen={showLenormandModal}
        onClose={() => setShowLenormandModal(false)}
      />

      <FengShuiModal
        isOpen={showFengShuiModal}
        onClose={() => setShowFengShuiModal(false)}
      />
    </>
  );
};
