import React, { useState } from 'react';
import { DiceModal } from './DiceModal';
import { LenormandModal } from './LenormandModal';
import { FengShuiModal } from './FengShuiModal';
import { playSound } from '../../lib/audio';
import { triggerHaptic } from '../../lib/haptics';

const NAV_ITEMS = [
  { id: 'rider', label: '雷诺曼', icon: '🃏' },
  { id: 'dice', label: '骰子', icon: '🎲' },
  { id: 'fengshui', label: '风水', icon: '☯️' },
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
      alert("功能开发中...");
    }
  };

  return (
    <>
      <div className="quick-nav">
        {NAV_ITEMS.map((item) => (
          <div 
            key={item.id} 
            className="nav-item"
            onClick={() => handleItemClick(item.id)}
          >
            <div className="nav-icon-box">
              {item.icon}
            </div>
            <span style={{ fontSize: '14px' }}>{item.label}</span>
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
