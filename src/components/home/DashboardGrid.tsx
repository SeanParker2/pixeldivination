import React, { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useFortuneStore } from '../../stores/useFortuneStore';
import { useUserStore } from '../../stores/useUserStore';
import { getZodiacSign } from '../../lib/dateUtils';
import { playSound } from '../../lib/audio';
import { triggerHaptic } from '../../lib/haptics';
import type { FortuneScores } from '../../types/fortune';

export const DashboardGrid: React.FC = () => {
  const { fortune, isLoading, checkAndFetch } = useFortuneStore();
  const { profile } = useUserStore();

  useEffect(() => {
    const zodiac = getZodiacSign(profile.birthDate);
    checkAndFetch(zodiac);
  }, [checkAndFetch, profile.birthDate]);

  const displayScores: FortuneScores = fortune?.scores || {
    love: 85,
    career: 70,
    wealth: 92,
    health: 80,
    academic: 0,
    social: 0
  };

  return (
    <div className="grid grid-cols-2 gap-3 px-0">
      <DailyFortuneCard scores={displayScores} isLoading={isLoading} />
      <TarotEntryCard />
    </div>
  );
};

const DailyFortuneCard = ({ scores, isLoading }: { scores: FortuneScores; isLoading: boolean }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => {
        playSound('tap');
        triggerHaptic('light');
        navigate('/daily-fortune');
      }}
      className="glass-card flex flex-col gap-2 cursor-pointer hover:border-[#fbbf24]/50 transition-colors h-[160px] p-4 m-0"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <span className="font-bold text-white text-[16px]">今日运势</span>
        <span className="text-[#fbbf24] tracking-widest text-sm">★★★★☆</span>
      </div>

      {/* Progress Bars */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-[#fbbf24] w-6 h-6" />
        </div>
      ) : (
        <div className="flex flex-col justify-between flex-1">
          <ProgressBar label="爱情" value={scores.love} />
          <ProgressBar label="财运" value={scores.wealth} />
          <ProgressBar label="事业" value={scores.career} />
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col gap-1">
    <div className="flex justify-between text-[12px] text-[#e2e8f0]">
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full" 
        style={{ 
            width: `${value}%`,
            background: 'linear-gradient(90deg, #8b5cf6, #d8b4fe)',
            boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
        }} 
      />
    </div>
  </div>
);

const TarotEntryCard = () => {
  return (
    <div className="glass-card relative overflow-hidden flex flex-col p-4 m-0 h-[160px]"
         style={{
             borderColor: 'var(--border-glow)',
             boxShadow: '0 0 15px rgba(139, 92, 246, 0.2)'
         }}>
      {/* Radial Gradient Overlay */}
      <div className="absolute inset-0 z-0" 
           style={{ background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.2), transparent)' }} />
      
      <div className="z-10 relative">
        <h3 className="text-white text-[18px] font-medium leading-tight">塔罗占卜</h3>
        <p className="text-[#cbd5e1] text-[12px] mt-1">AI 深度解析</p>
      </div>
      
      <div className="mt-auto flex justify-center z-10 h-[80px]">
        {/* Using a background image style as per homedemo or an img tag. 
            homedemo uses a div with background-image. I will use img tag for better accessibility and sizing control in React. */}
        <img 
            src="https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg" 
            alt="The Fool" 
            className="h-full object-contain opacity-80"
            style={{ filter: 'grayscale(0.5) contrast(1.2)' }}
        />
      </div>
    </div>
  );
};
