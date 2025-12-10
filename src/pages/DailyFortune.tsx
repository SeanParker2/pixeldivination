import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useFortuneStore } from '../stores/useFortuneStore';
import { useUserStore } from '../stores/useUserStore';
import { getZodiacSign, formatDate } from '../lib/dateUtils';
import type { FortuneScores, FortuneTexts } from '../types/fortune';

type TimeRange = 'today' | 'month' | 'year';

// Default data for initial render or fallback
const DEFAULT_SCORES: FortuneScores = {
  health: 85, academic: 88, social: 75, love: 92, career: 70, wealth: 65
};

const DEFAULT_TEXTS: FortuneTexts = {
  overall: '不要贸然出击，你心仪的TA可能并未心动。今日宜静不宜动，保持内心的平静是关键。',
  love: 'TA对你的态度可能一直都并不清晰，你很难感觉到TA待你与旁人明显的不同。如果你们之间一直靠你辛苦维持，不妨暂停一下。',
  career: '工作黑锅我不背，领导念经我不听。今日职场可能会有小人作祟，保持低调，做好份内之事即可。',
  wealth: '...',
  others: '...'
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

  const displayName = profile.nickname || '白羊座';
  const displayDate = formatDate(profile.birthDate).split(' ')[0];

  return (
    <div className="mobile-container">
        {/* Header Section */}
        <div className="page-header">
            <div className="user-mini">
                <div className="avatar">
                    <img src="https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix" width="100%" alt="Avatar" />
                </div>
                <div className="user-info">
                    <h2>{displayName}</h2>
                    <p>{displayDate} (阳历)</p>
                </div>
            </div>
            
            <div className="neon-tabs">
                <div className={`tab-item ${activeTab === 'today' ? 'active' : ''}`} onClick={() => setActiveTab('today')}>今日</div>
                <div className={`tab-item ${activeTab === 'month' ? 'active' : ''}`} onClick={() => setActiveTab('month')}>本月</div>
                <div className={`tab-item ${activeTab === 'year' ? 'active' : ''}`} onClick={() => setActiveTab('year')}>本年</div>
            </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="animate-spin text-pixel-gold w-10 h-10" />
            <span className="text-sm font-pixel text-gray-400 animate-pulse">
              DeepSeek 正在推演星象...
            </span>
          </div>
        ) : (
          <>
            {/* Stats Card */}
            <div className="glass-card">
                <div className="stats-header">
                    <span className="stats-title">今日运势指数</span>
                    <span className="stats-stars">★★★★☆</span>
                </div>
                <div className="stats-grid">
                    <StatItem label="健康" value={scores.health} />
                    <StatItem label="爱情" value={scores.love} />
                    <StatItem label="事业" value={scores.career} />
                    <StatItem label="财运" value={scores.wealth} />
                    <StatItem label="学业" value={scores.academic} />
                    <StatItem label="社交" value={scores.social} />
                </div>
            </div>

            {/* Reading Section */}
            <div className="reading-section">
                
                <div className="reading-card">
                    <div className="reading-title">🔮 综合运势</div>
                    <div className="reading-text">
                        {texts.overall}
                    </div>
                    <div className="reading-divider"></div>
                    <div className="reading-sub">建议：穿着白色衣物可增强磁场。</div>
                </div>

                <div className="reading-card" style={{borderColor: '#ec4899'}}>
                    <div className="reading-title" style={{color: '#ec4899'}}>❤️ 恋爱指引</div>
                    <div className="reading-text">
                        {texts.love}
                    </div>
                </div>

                <div className="reading-card" style={{borderColor: '#8b5cf6'}}>
                    <div className="reading-title" style={{color: '#8b5cf6'}}>💼 事业前瞻</div>
                    <div className="reading-text">
                        {texts.career}
                    </div>
                </div>

            </div>
          </>
        )}
    </div>
  );
};

const StatItem = ({ label, value }: { label: string; value: number }) => (
    <div className="stat-item">
        <div className="stat-meta"><span>{label}</span><span>{value}%</span></div>
        <div className="progress-track">
            <div 
                className="progress-fill shimmer" 
                style={{
                    width: `${value}%`,
                    background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-pink))',
                    boxShadow: '0 0 8px var(--accent-purple)'
                }}
            ></div>
        </div>
    </div>
);

export default DailyFortune;
