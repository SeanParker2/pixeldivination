import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { UserInfoCard } from '../components/home/UserInfoCard';
import { FortuneStats } from '../components/fortune/FortuneStats';
import { FortuneContent } from '../components/fortune/FortuneContent';
import { useFortuneStore } from '../stores/useFortuneStore';
import { useUserStore } from '../stores/useUserStore';
import { getZodiacSign } from '../lib/dateUtils';
import type { FortuneScores, FortuneTexts } from '../types/fortune';

type TimeRange = 'today' | 'month' | 'year';

// Default data for initial render or fallback
const DEFAULT_SCORES: FortuneScores = {
  health: 0, academic: 0, social: 0, love: 0, career: 0, wealth: 0
};

const DEFAULT_TEXTS: FortuneTexts = {
  overall: '正在读取星象...',
  love: '...', career: '...', wealth: '...', others: '...'
};

export const DailyFortune: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TimeRange>('today');
  const { fortune, isLoading, checkAndFetch } = useFortuneStore();
  const { profile } = useUserStore();

  useEffect(() => {
    const zodiac = getZodiacSign(profile.birthDate);
    checkAndFetch(zodiac);
  }, [checkAndFetch, profile.birthDate]);

  const scores = fortune?.scores || DEFAULT_SCORES;
  const texts = fortune?.texts || DEFAULT_TEXTS;

  return (
    <div className="pt-6 px-4 min-h-full relative">
      <div className="scanlines" />
      <div className="vignette" />
      {/* Header Section */}
      <UserInfoCard />
      
      {/* Time Range Tabs */}
        <div className="flex items-center justify-around mt-6 mb-6 border-b border-white/10">
          <TabItem 
            label="今日" 
            isActive={activeTab === 'today'} 
            onClick={() => setActiveTab('today')} 
          />
          <TabItem 
            label="本月" 
            isActive={activeTab === 'month'} 
            onClick={() => setActiveTab('month')} 
          />
          <TabItem 
            label="本年" 
            isActive={activeTab === 'year'} 
            onClick={() => setActiveTab('year')} 
          />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="animate-spin text-pixel-gold w-10 h-10" />
            <span className="text-sm font-pixel text-gray-400 animate-pulse">
              DeepSeek 正在推演星象...
            </span>
          </div>
        ) : (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <FortuneStats scores={scores} />
              <FortuneContent texts={texts} />
          </div>
        )}
    </div>
  );
};

const TabItem = ({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`
      pb-2 text-lg font-pixel transition-all relative
      ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-gray-500 hover:text-gray-300'}
    `}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pixel-gold shadow-[0_0_10px_#fbbf24]" />
    )}
  </button>
);

export default DailyFortune;
