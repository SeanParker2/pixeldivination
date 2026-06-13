import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, RefreshCw, AlertCircle, Sparkles, TrendingUp, Heart, Briefcase, Coins, Book, Users, Clock, MapPin, Palette, Hash, Gem } from 'lucide-react';
import { useFortuneStore } from '../stores/useFortuneStore';
import { useUserStore } from '../stores/useUserStore';
import { getZodiacSign, formatDate } from '../lib/dateUtils';
import { ZODIAC_LUCKY_DATA, ZODIAC_AUSPICIOUS, getFortuneLevel } from '../data/fortuneTemplates';
import type { FortuneScores, FortuneTexts } from '../types/fortune';

type TimeRange = 'today' | 'month' | 'year';

const DEFAULT_SCORES: FortuneScores = {
  health: 85, academic: 88, social: 75, love: 92, career: 70, wealth: 65
};

const DEFAULT_TEXTS: FortuneTexts = {
  overall: '今日星象能量充沛，适合开展新计划。保持积极心态，好运自然来。',
  love: '感情方面有新的机遇，单身者可能遇到心动的人。已有伴者适合制造小惊喜。',
  career: '工作上可能遇到一些挑战，但这也是成长的机会。保持专注，突破在即。',
  wealth: '财运平稳，不宜进行大额投资。稳健理财是今日的最佳策略。',
  others: '学习新技能的好时机，提升自我将带来更多可能。'
};

const SCORE_CONFIG = [
  { key: 'health', label: '健康', icon: TrendingUp, color: '#4ade80' },
  { key: 'love', label: '爱情', icon: Heart, color: '#ec4899' },
  { key: 'career', label: '事业', icon: Briefcase, color: '#8b5cf6' },
  { key: 'wealth', label: '财运', icon: Coins, color: '#fbbf24' },
  { key: 'academic', label: '学业', icon: Book, color: '#3b82f6' },
  { key: 'social', label: '社交', icon: Users, color: '#06b6d4' },
];

const ZODIAC_SYMBOLS: Record<string, string> = {
  '白羊座': '♈', '金牛座': '♉', '双子座': '♊', '巨蟹座': '♋',
  '狮子座': '♌', '处女座': '♍', '天秤座': '♎', '天蝎座': '♏',
  '射手座': '♐', '摩羯座': '♑', '水瓶座': '♒', '双鱼座': '♓',
};

export const DailyFortune: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TimeRange>('today');
  const { fortune, isLoading, error, checkAndFetch } = useFortuneStore();
  const { profile } = useUserStore();

  useEffect(() => {
    const zodiac = getZodiacSign(profile.birthDate);
    checkAndFetch(zodiac);
  }, [checkAndFetch, profile.birthDate]);

  const handleRefresh = () => {
    const zodiac = getZodiacSign(profile.birthDate);
    checkAndFetch(zodiac);
  };

  const scores = fortune?.scores || DEFAULT_SCORES;
  const texts = fortune?.texts || DEFAULT_TEXTS;

  const zodiac = getZodiacSign(profile.birthDate);
  const zodiacSymbol = ZODIAC_SYMBOLS[zodiac] || '✦';
  const displayName = profile.nickname || zodiac;
  const displayDate = formatDate(profile.birthDate).split(' ')[0];

  const averageScore = useMemo(() => Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length
  ), [scores]);

  const fortuneLevel = useMemo(() => getFortuneLevel(averageScore), [averageScore]);

  // 幸运数据
  const luckyData = ZODIAC_LUCKY_DATA[zodiac];
  const auspiciousData = ZODIAC_AUSPICIOUS[zodiac];

  return (
    <div className="mobile-container">
      {/* Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="user-mini">
          <motion.div
            className="avatar"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${profile.nickname || 'Felix'}`}
              width="100%"
              alt="Avatar"
            />
          </motion.div>
          <div className="user-info">
            <h2>{displayName}</h2>
            <p className="flex items-center gap-2">
              <span>{displayDate}</span>
              <span className="text-yellow-500">{zodiacSymbol} {zodiac}</span>
            </p>
          </div>
        </div>

        <div className="neon-tabs">
          {(['today', 'month', 'year'] as TimeRange[]).map(tab => (
            <motion.div
              key={tab}
              className={`tab-item ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'today' ? '今日' : tab === 'month' ? '本月' : '本年'}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Error State */}
      {error && (
        <motion.div
          className="glass-card p-4 border-red-500/30 bg-red-500/10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle size={16} />
            <span className="text-sm">{error}</span>
          </div>
          <button
            onClick={handleRefresh}
            className="mt-2 text-xs text-red-300 hover:text-red-200 flex items-center gap-1"
          >
            <RefreshCw size={12} />
            重试
          </button>
        </motion.div>
      )}

      {isLoading ? (
        <motion.div
          className="flex flex-col items-center justify-center h-64 space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="relative">
            <Loader2 className="animate-spin text-yellow-500 w-12 h-12" />
            <motion.div
              className="absolute inset-0 rounded-full border border-yellow-500/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div className="text-center">
            <span className="text-sm font-pixel text-gray-400 animate-pulse block">
              正在推演星象...
            </span>
            <span className="text-xs text-gray-500 mt-1 block">
              AI 占卜师正在分析今日运势
            </span>
          </div>
        </motion.div>
      ) : (
        <AnimatePresence mode="wait">
          {activeTab === 'today' && (
            <motion.div
              key="today"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              {/* Overall Score Card */}
              <div className="glass-card relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-yellow-500/10 to-transparent rounded-bl-full" />

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-gray-400 text-sm">今日运势指数</span>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-4xl font-pixel text-yellow-500">{averageScore}</span>
                      <span className="text-gray-500 text-sm">/100</span>
                    </div>
                  </div>

                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
                      <motion.circle
                        cx="40" cy="40" r="35" fill="none" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 35}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 35 }}
                        animate={{ strokeDashoffset: 2 * Math.PI * 35 * (1 - averageScore / 100) }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg">{fortuneLevel.emoji}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">运势等级：</span>
                  <span style={{ color: fortuneLevel.color }} className="font-medium">
                    {fortuneLevel.label}
                  </span>
                </div>
              </div>

              {/* Score Grid */}
              <div className="glass-card">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles size={14} className="text-yellow-500" />
                  <span className="text-white font-medium">六维运势</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {SCORE_CONFIG.map((config, index) => {
                    const value = scores[config.key as keyof FortuneScores];
                    const Icon = config.icon;

                    return (
                      <motion.div
                        key={config.key}
                        className="flex items-center gap-3 p-2 rounded-lg bg-white/5"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${config.color}20` }}>
                          <Icon size={14} style={{ color: config.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">{config.label}</span>
                            <span className="text-xs font-medium" style={{ color: config.color }}>{value}%</span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full"
                              style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}88)` }}
                              initial={{ width: 0 }}
                              animate={{ width: `${value}%` }}
                              transition={{ duration: 1, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Lucky Items */}
              {luckyData && (
                <div className="glass-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Gem size={14} className="text-purple-400" />
                    <span className="text-white font-medium">今日开运</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <LuckyItem icon={Palette} label="幸运颜色" value={luckyData.luckyColors.map(c => c.name).join('、')} color={luckyData.luckyColors[0]?.hex || '#fbbf24'} />
                    <LuckyItem icon={Hash} label="幸运数字" value={luckyData.luckyNumbers.join('、')} color="#8b5cf6" />
                    <LuckyItem icon={MapPin} label="幸运方位" value={luckyData.luckyDirections.join('、')} color="#06b6d4" />
                    <LuckyItem icon={Clock} label="幸运时段" value={luckyData.luckyTimes[0] || '全天'} color="#22c55e" />
                  </div>
                </div>
              )}

              {/* Auspicious Info */}
              {auspiciousData && (
                <div className="glass-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Clock size={14} className="text-green-400" />
                    <span className="text-white font-medium">吉时宜忌</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-green-400 mb-2">✓ 宜</p>
                      {auspiciousData.suitable.map((item, i) => (
                        <p key={i} className="text-xs text-gray-300 mb-1">• {item}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-xs text-red-400 mb-2">✗ 忌</p>
                      {auspiciousData.unsuitable.map((item, i) => (
                        <p key={i} className="text-xs text-gray-300 mb-1">• {item}</p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-400">
                      <span className="text-green-400">吉时：</span>{auspiciousData.auspiciousHours}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      <span className="text-red-400">凶时：</span>{auspiciousData.inauspiciousHours}
                    </p>
                  </div>
                </div>
              )}

              {/* Reading Cards */}
              <div className="space-y-3">
                <ReadingCard title="综合运势" icon="🔮" color="#fbbf24" text={texts.overall} />
                <ReadingCard title="恋爱指引" icon="❤️" color="#ec4899" text={texts.love} />
                <ReadingCard title="事业前瞻" icon="💼" color="#8b5cf6" text={texts.career} />
                <ReadingCard title="财运分析" icon="💰" color="#fbbf24" text={texts.wealth} />
                {texts.others && <ReadingCard title="其他提示" icon="📖" color="#3b82f6" text={texts.others} />}
              </div>

              {/* Refresh Button */}
              <motion.button
                onClick={handleRefresh}
                className="w-full py-3 mt-4 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:border-white/30 transition-colors flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <RefreshCw size={14} />
                刷新运势
              </motion.button>
            </motion.div>
          )}

          {activeTab === 'month' && (
            <motion.div
              key="month"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <MonthFortuneView zodiac={zodiac} scores={scores} />
            </motion.div>
          )}

          {activeTab === 'year' && (
            <motion.div
              key="year"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4"
            >
              <YearFortuneView zodiac={zodiac} scores={scores} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

// Lucky Item Component
const LuckyItem: React.FC<{ icon: React.ElementType; label: string; value: string; color: string }> = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
    <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: `${color}20` }}>
      <Icon size={12} style={{ color }} />
    </div>
    <div className="min-w-0">
      <p className="text-[10px] text-gray-500">{label}</p>
      <p className="text-xs text-white truncate">{value}</p>
    </div>
  </div>
);

// Reading Card Component
const ReadingCard: React.FC<{ title: string; icon: string; color: string; text: string }> = ({ title, icon, color, text }) => (
  <motion.div
    className="reading-card"
    style={{ borderColor: color }}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    whileHover={{ x: 4 }}
  >
    <div className="reading-title" style={{ color }}>
      {icon} {title}
    </div>
    <div className="reading-text">
      {text}
    </div>
  </motion.div>
);

// Month Fortune View
const MonthFortuneView: React.FC<{ zodiac: string; scores: FortuneScores }> = ({ zodiac, scores }) => {
  const month = new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long' });
  const avgScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

  return (
    <>
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-400 text-sm">{month} 运势</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-pixel text-yellow-500">{avgScore}</span>
              <span className="text-gray-500 text-sm">/100</span>
            </div>
          </div>
          <span className="text-2xl">{ZODIAC_SYMBOLS[zodiac] || '✦'}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          本月{zodiac}整体运势{avgScore >= 75 ? '较好' : avgScore >= 60 ? '平稳' : '需要留意'}。
          {avgScore >= 75 ? '适合推进重要计划，把握机遇。' : avgScore >= 60 ? '保持现状，稳中求进。' : '谨慎行事，避免冒险。'}
        </p>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={14} className="text-yellow-500" />
          <span className="text-white font-medium">月度运势分析</span>
        </div>
        <div className="space-y-3">
          {SCORE_CONFIG.map(config => {
            const value = scores[config.key as keyof FortuneScores];
            const Icon = config.icon;
            return (
              <div key={config.key} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: `${config.color}20` }}>
                  <Icon size={10} style={{ color: config.color }} />
                </div>
                <span className="text-xs text-gray-400 w-10">{config.label}</span>
                <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: config.color }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="text-xs text-gray-400 w-8 text-right">{value}%</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="glass-card">
        <p className="text-xs text-gray-400 mb-2">💡 月度建议</p>
        <p className="text-sm text-gray-300 leading-relaxed">
          本月适合制定长期计划，关注事业发展和人际关系。{zodiac}的能量在本月较为稳定，适合稳步推进各项事务。
          注意保持身心健康，适当运动和休息。
        </p>
      </div>
    </>
  );
};

// Year Fortune View
const YearFortuneView: React.FC<{ zodiac: string; scores: FortuneScores }> = ({ zodiac, scores }) => {
  const year = new Date().getFullYear();
  const avgScore = Math.round(Object.values(scores).reduce((a, b) => a + b, 0) / Object.values(scores).length);

  const seasons = [
    { name: '春季', months: '3-5月', score: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 5)), emoji: '🌸' },
    { name: '夏季', months: '6-8月', score: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 5)), emoji: '☀️' },
    { name: '秋季', months: '9-11月', score: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 5)), emoji: '🍂' },
    { name: '冬季', months: '12-2月', score: Math.min(100, avgScore + Math.floor(Math.random() * 10 - 5)), emoji: '❄️' },
  ];

  return (
    <>
      <div className="glass-card">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-gray-400 text-sm">{year} 年度运势</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-3xl font-pixel text-yellow-500">{avgScore}</span>
              <span className="text-gray-500 text-sm">/100</span>
            </div>
          </div>
          <span className="text-2xl">{ZODIAC_SYMBOLS[zodiac] || '✦'}</span>
        </div>
        <p className="text-sm text-gray-300 leading-relaxed">
          {year}年{zodiac}整体运势{avgScore >= 75 ? '向好' : avgScore >= 60 ? '平稳' : '需要调整'}。
          {avgScore >= 75 ? '把握机遇，积极进取，会有不错的收获。' : avgScore >= 60 ? '稳中求进，做好规划，等待时机。' : '调整心态，谨慎行事，化挑战为机遇。'}
        </p>
      </div>

      <div className="glass-card">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={14} className="text-yellow-500" />
          <span className="text-white font-medium">季度运势</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {seasons.map((season, i) => (
            <motion.div
              key={season.name}
              className="p-3 rounded-lg bg-white/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-white">{season.emoji} {season.name}</span>
                <span className="text-xs text-yellow-500">{season.score}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: `${season.score}%` }} />
              </div>
              <p className="text-[10px] text-gray-500 mt-1">{season.months}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <p className="text-xs text-gray-400 mb-2">💡 年度建议</p>
        <p className="text-sm text-gray-300 leading-relaxed">
          {year}年是{zodiac}充满机遇的一年。建议在春季制定全年计划，夏季积极拓展人脉，秋季收获成果，冬季总结反思。
          全年注意身心健康，保持积极心态。
        </p>
      </div>
    </>
  );
};

export default DailyFortune;
