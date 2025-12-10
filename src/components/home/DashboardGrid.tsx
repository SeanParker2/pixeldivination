import React, { useEffect } from 'react';
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
  const navigate = useNavigate();

  useEffect(() => {
    const zodiac = getZodiacSign(profile.birthDate);
    checkAndFetch(zodiac);
  }, [checkAndFetch, profile.birthDate]);

  const scores: FortuneScores = fortune?.scores || {
    love: 85,
    career: 70,
    wealth: 92,
    health: 80,
    academic: 0,
    social: 0
  };

  const handleFortuneClick = () => {
    playSound('tap');
    triggerHaptic('light');
    navigate('/daily-fortune');
  };

  const handleTarotClick = () => {
    playSound('tap');
    triggerHaptic('light');
    navigate('/divination');
  };

  return (
    <div className="dashboard-grid">
        {/* Fortune Card */}
        <div className="glass-card" style={{margin:0, cursor:'pointer'}} onClick={handleFortuneClick}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                <span style={{fontWeight:'bold'}}>今日运势</span>
                <span style={{color:'var(--text-gold)'}}>★★★★☆</span>
            </div>
            
            {/* Limit to 3 items as in demo: Love, Wealth, Career */}
            <div className="progress-item">
                <div className="progress-label"><span>爱情</span><span>{scores.love}%</span></div>
                <div className="progress-track"><div className="progress-fill" style={{width: `${scores.love}%`}}></div></div>
            </div>
            <div className="progress-item">
                <div className="progress-label"><span>财运</span><span>{scores.wealth}%</span></div>
                <div className="progress-track"><div className="progress-fill" style={{width: `${scores.wealth}%`}}></div></div>
            </div>
            <div className="progress-item">
                <div className="progress-label"><span>事业</span><span>{scores.career}%</span></div>
                <div className="progress-track"><div className="progress-fill" style={{width: `${scores.career}%`}}></div></div>
            </div>
        </div>

        {/* Tarot Card */}
        <div className="glass-card tarot-card" style={{margin:0, cursor:'pointer'}} onClick={handleTarotClick}>
            <div className="tarot-title">塔罗占卜</div>
            <div className="tarot-sub">AI 深度解析</div>
            <div className="tarot-visual"></div>
        </div>
    </div>
  );
};
