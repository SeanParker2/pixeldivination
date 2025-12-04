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
    <div className="grid grid-cols-[1.7fr_1fr] gap-3 px-4">
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
      className="bg-[#1E1E2E]/80 backdrop-blur-md border border-pixel-border rounded-lg p-4 flex flex-col gap-4 cursor-pointer hover:border-pixel-gold/50 transition-colors group h-[148px] relative"
    >
      {/* Header with Stars */}
      <div className="flex items-center gap-2">
        <span className="text-[#e4ded7] text-sm font-medium whitespace-nowrap group-hover:text-pixel-gold transition-colors">今日运势</span>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <img key={i} src="/images/icons/star_filled.png" alt="star" className="w-3 h-3 opacity-90" 
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
          ))}
          {/* Fallback stars if image fails, but usually we use icons. Let's use Lucide stars but styled to match */}
          <div className="hidden">
             <Star size={12} className="fill-[#A78BFA] text-[#A78BFA]" />
          </div>
        </div>
      </div>

      {/* Progress Bars */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin text-pixel-gold w-6 h-6" />
        </div>
      ) : (
        <div className="flex flex-col justify-between flex-1 py-1">
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
    <span className="text-[10px] text-[#e4ded7] whitespace-nowrap w-12 font-sans">{label}</span>
    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
      <div 
        className="h-full bg-[#A78BFA] rounded-full" 
        style={{ width: `${value}%` }} 
      />
    </div>
    <span className="text-[10px] text-[#e4ded7] w-6 text-right font-sans">{value}%</span>
  </div>
);

const TarotEntryCard = () => {
  return (
    <div className="bg-[#1E1E2E]/80 backdrop-blur-md border border-pixel-border rounded-lg p-0 flex flex-col relative overflow-hidden h-[148px]">
      <div className="px-2 pt-2 pb-0 z-10">
        <h3 className="text-[#e4ded7] text-sm font-medium">塔罗占卜</h3>
        <p className="text-[10px] text-[#e4ded7] mt-0.5 opacity-80">专业解读 + AI 分析</p>
      </div>
      
      <div className="mt-auto flex justify-center items-end w-full z-0">
        <img 
            src="/images/home/tarot_banner.png" 
            alt="Tarot" 
            className="w-[69px] h-[81px] object-contain mb-2"
            onError={(e) => {
                 (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4YjVjZjYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cmVjdCB4PSIyIiB5PSI3IiB3aWR0aD0iMjAiIGhlaWdodD0iMTQiIHJ4PSIyIiByeT0iMiI+PC9yZWN0PjxwYXRoIGQ9Ik0xNiAyMXYtMiI+PC9wYXRoPjxwYXRoIGQ9Ik04IDIxdi0yIj48L3BhdGg+PHBhdGggZD0iTTEyIDIxdi0yIj48L3BhdGg+PC9zdmc+';
            }}
        />
      </div>
    </div>
  );
};
