import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { useDivinationStore } from '../stores/useDivinationStore';
import { IntroView } from '../components/divination/IntroView';
import { ShuffleDeck } from '../components/divination/ShuffleDeck';
import { CardSpread } from '../components/divination/CardSpread';
import { ReadingView } from '../components/divination/ReadingView';

const DivinationPage: React.FC = () => {
  const navigate = useNavigate();
  const { step, resetDivination } = useDivinationStore();

  const handleExit = () => {
    resetDivination();
    navigate('/');
  };

  return (
    <MobileContainer 
      hideHeader 
      hideFooter 
      className="bg-[#020617] relative overflow-hidden"
    >
      {/* Global Effects */}
      <div className="scanlines" />
      <div className="vignette" />
      
      {/* Starry Background Effect */}
      <div className="absolute inset-0 opacity-80 pointer-events-none" 
           style={{
             backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
             backgroundSize: '50px 50px',
             animation: 'move 100s linear infinite'
           }} 
      />
      <style>{`
        @keyframes move { from {background-position: 0 0;} to {background-position: 0 1000px;} }
      `}</style>

      {/* Exit Button */}
      <button 
        onClick={handleExit}
        className="absolute top-4 right-4 z-50 text-white/50 hover:text-white transition-colors p-2"
      >
        <X size={24} />
      </button>

      {/* Main Content Area */}
      <div className="h-full w-full relative z-10">
        {step === 'intro' && <IntroView />}
        {step === 'shuffle' && <ShuffleDeck />}
        {step === 'draw' && <CardSpread />}
        {step === 'reading' && <ReadingView />}
      </div>
    </MobileContainer>
  );
};

export default DivinationPage;
