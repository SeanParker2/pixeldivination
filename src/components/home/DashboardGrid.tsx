import React, { useEffect } from 'react';
import { Star, Loader2 } from 'lucide-react';
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
    love: 0,
    career: 0,
    wealth: 0,
    health: 0,
    academic: 0,
    social: 0
  };

  return (
    <div className="grid grid-cols-2 gap-4 px-2">
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
      className="bg-pixel-card border border-pixel-border rounded-xl p-3 flex flex-col gap-3 cursor-pointer hover:border-pixel-gold/50 transition-colors group min-h-[160px]"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="text-white text-sm font-bold group-hover:text-pixel-gold transition-colors">今日运势</span>
        <span className="text-xs text-pixel-secondary">全部</span>
      </div>
      
      {/* Stars */}
      <div className="flex gap-0.5">
        {[1, 2, 3, 4].map((i) => (
          <Star key={i} size={12} className="fill-[#8B5CF6] text-[#8B5CF6]" />
        ))}
        <Star size={12} className="text-white/30" />
      </div>

      {/* Progress Bars or Loading */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-pixel-gold w-6 h-6" />
        </div>
      ) : (
        <div className="flex flex-col gap-2 mt-1">
          <ProgressBar label="爱情运势" value={scores.love} />
          <ProgressBar label="事业运势" value={scores.career} />
          <ProgressBar label="财运指数" value={scores.wealth} />
          <ProgressBar label="健康指数" value={scores.health} />
        </div>
      )}
    </div>
  );
};

const ProgressBar = ({ label, value }: { label: string; value: number }) => (
  <div className="flex items-center gap-2">
    <span className="text-[10px] text-white whitespace-nowrap w-12">{label}</span>
    <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#8B5CF6] rounded-full" 
        style={{ width: `${value}%` }} 
      />
    </div>
    <span className="text-[10px] text-white w-6 text-right">{value}%</span>
  </div>
);

const TarotEntryCard = () => {
  return (
    <div className="bg-pixel-card border border-pixel-border rounded-xl p-3 flex flex-col relative overflow-hidden">
      <h3 className="text-white text-sm font-bold z-10">塔罗占卜</h3>
      <p className="text-[10px] text-pixel-secondary mt-1 z-10">专业解读 + AI 分析</p>
      
      <div className="mt-auto flex justify-center z-10">
        <img 
            src="/images/home/card_tarot_entry.png" 
            alt="Tarot Cards" 
            className="w-24 h-24 object-contain drop-shadow-lg transform hover:scale-105 transition-transform"
            onError={(e) => {
                 (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjVjZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIyIiB5PSI3IiB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxwYXRoIGQ9Ik0xNiAyMXYtMiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDIxdi0yIj48L3BhdGg+PHBhdGggZD0iTTEyIDIxdi0yIj48L3BhdGg+PC9zdmc+';
            }}
        />
      </div>
      
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-blue-500/20 blur-xl rounded-full" />
    </div>
  );
};
