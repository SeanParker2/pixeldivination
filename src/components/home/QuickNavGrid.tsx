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
      <div className="grid grid-cols-3 gap-4 px-4 mt-6">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id} 
            onClick={() => handleItemClick(item.id)}
            className="flex flex-col items-center gap-2 group cursor-pointer"
          >
            <div className="w-full aspect-square bg-white/5 rounded-xl border border-white/10 overflow-hidden flex items-center justify-center group-hover:border-pixel-gold/50 transition-colors">
              <img 
                  src={item.img} 
                  alt={item.label} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIzIiB5PSIzIiB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHJ4PSIyIiByeT0iMiI+PC9yZWN0Pjwvc3ZnPg==';
                  }}
              />
            </div>
            <span className="text-white text-sm font-medium">{item.label}</span>
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
