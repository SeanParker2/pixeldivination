import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Loader2, Sparkles, Heart, RotateCcw } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import api from '../lib/api';
import { useUserStore } from '../stores/useUserStore';
import { useHistoryStore } from '../stores/useHistoryStore';

const ZODIAC_SIGNS = [
  { name: '白羊座', symbol: '♈', element: '火', dates: '3.21-4.19' },
  { name: '金牛座', symbol: '♉', element: '土', dates: '4.20-5.20' },
  { name: '双子座', symbol: '♊', element: '风', dates: '5.21-6.21' },
  { name: '巨蟹座', symbol: '♋', element: '水', dates: '6.22-7.22' },
  { name: '狮子座', symbol: '♌', element: '火', dates: '7.23-8.22' },
  { name: '处女座', symbol: '♍', element: '土', dates: '8.23-9.22' },
  { name: '天秤座', symbol: '♎', element: '风', dates: '9.23-10.23' },
  { name: '天蝎座', symbol: '♏', element: '水', dates: '10.24-11.22' },
  { name: '射手座', symbol: '♐', element: '火', dates: '11.23-12.21' },
  { name: '摩羯座', symbol: '♑', element: '土', dates: '12.22-1.19' },
  { name: '水瓶座', symbol: '♒', element: '风', dates: '1.20-2.18' },
  { name: '双鱼座', symbol: '♓', element: '水', dates: '2.19-3.20' },
];

const ELEMENT_COLORS: Record<string, string> = {
  '火': 'from-red-500/20 to-orange-500/20 border-red-500/30',
  '土': 'from-yellow-500/20 to-amber-500/20 border-yellow-500/30',
  '风': 'from-blue-500/20 to-cyan-500/20 border-blue-500/30',
  '水': 'from-purple-500/20 to-indigo-500/20 border-purple-500/30',
};

const MatchPage: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const addHistory = useHistoryStore(s => s.addEntry);

  const [selectedZodiac, setSelectedZodiac] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 从出生日期推算星座
  const getZodiacFromDate = (dateStr: string): string => {
    if (!dateStr) return '白羊座';
    const d = new Date(dateStr);
    const month = d.getMonth() + 1;
    const day = d.getDate();
    const signs = [
      { name: '摩羯座', end: [1, 19] }, { name: '水瓶座', end: [2, 18] },
      { name: '双鱼座', end: [3, 20] }, { name: '白羊座', end: [4, 19] },
      { name: '金牛座', end: [5, 20] }, { name: '双子座', end: [6, 21] },
      { name: '巨蟹座', end: [7, 22] }, { name: '狮子座', end: [8, 22] },
      { name: '处女座', end: [9, 22] }, { name: '天秤座', end: [10, 23] },
      { name: '天蝎座', end: [11, 22] }, { name: '射手座', end: [12, 21] },
      { name: '摩羯座', end: [12, 31] },
    ];
    for (const sign of signs) {
      if (month < sign.end[0] || (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name;
      }
    }
    return '白羊座';
  };

  const myZodiac = getZodiacFromDate(profile.birthDate);

  const handleMatch = async (targetZodiac: string) => {
    setSelectedZodiac(targetZodiac);
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res: any = await api.post('/match/zodiac', {
        zodiacA: myZodiac,
        zodiacB: targetZodiac,
      });
      setResult(res);
      addHistory({
        type: 'match' as any,
        summary: `${myZodiac} × ${targetZodiac} 配对分析`,
        details: { zodiacA: myZodiac, zodiacB: targetZodiac, result: res },
      });
    } catch (err: any) {
      setError(err.userMessage || '配对分析失败');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedZodiac(null);
    setResult(null);
    setError(null);
  };

  return (
    <MobileContainer hideHeader className="bg-[#020617] relative overflow-hidden">
      <div className="scanlines" />
      <div className="vignette" />

      {/* Header */}
      <div className="relative z-10 px-4 pt-4 pb-2 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white/60 hover:text-white p-1">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-xl text-white font-pixel">星座配对</h1>
          <p className="text-xs text-gray-500">探索你与 TA 的星座缘分</p>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8 overflow-y-auto h-[calc(100%-60px)]">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4"
            >
              {/* My Zodiac */}
              <div className="glass-card p-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{ZODIAC_SIGNS.find(z => z.name === myZodiac)?.symbol || '♈'}</span>
                  <div>
                    <p className="text-white text-sm font-bold">我的星座：{myZodiac}</p>
                    <p className="text-gray-500 text-xs">{ZODIAC_SIGNS.find(z => z.name === myZodiac)?.element}象星座</p>
                  </div>
                </div>
              </div>

              {/* Select Target */}
              <p className="text-gray-400 text-sm mb-3">选择对方的星座：</p>

              <div className="grid grid-cols-3 gap-2">
                {ZODIAC_SIGNS.map(zodiac => {
                  const elementColor = ELEMENT_COLORS[zodiac.element];
                  const isSelf = zodiac.name === myZodiac;

                  return (
                    <motion.button
                      key={zodiac.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => !isSelf && handleMatch(zodiac.name)}
                      disabled={isSelf || isLoading}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelf
                          ? 'opacity-30 cursor-not-allowed bg-white/5 border-white/10'
                          : `bg-gradient-to-br ${elementColor} hover:brightness-125 cursor-pointer`
                      }`}
                    >
                      <span className="text-xl block">{zodiac.symbol}</span>
                      <span className="text-white text-xs block mt-1">{zodiac.name}</span>
                      <span className="text-gray-500 text-[10px] block">{zodiac.dates}</span>
                    </motion.button>
                  );
                })}
              </div>

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-8 gap-3"
                >
                  <Loader2 className="animate-spin text-pixel-gold" size={32} />
                  <p className="text-gray-400 text-sm animate-pulse">正在分析星座配对...</p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  {error}
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 space-y-4"
            >
              {/* Match Header */}
              <div className="glass-card p-5 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <span className="text-3xl block">{ZODIAC_SIGNS.find(z => z.name === myZodiac)?.symbol}</span>
                    <span className="text-white text-sm block mt-1">{myZodiac}</span>
                  </div>
                  <Heart className="text-pink-400" size={24} />
                  <div className="text-center">
                    <span className="text-3xl block">{ZODIAC_SIGNS.find(z => z.name === selectedZodiac)?.symbol}</span>
                    <span className="text-white text-sm block mt-1">{selectedZodiac}</span>
                  </div>
                </div>

                {/* Score */}
                {result.score !== undefined && (
                  <div className="mb-4">
                    <div className="text-3xl font-pixel text-pixel-gold">{result.score}%</div>
                    <p className="text-gray-400 text-xs">配对指数</p>
                  </div>
                )}
              </div>

              {/* Result Content */}
              {result.reading && (
                <div className="glass-card p-5">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                    <Sparkles size={14} className="text-pixel-gold" />
                    <span className="text-pixel-gold font-bold text-sm">配对分析</span>
                  </div>
                  <div className="prose prose-invert prose-sm max-w-none text-gray-200 leading-relaxed">
                    <ReactMarkdown>{result.reading}</ReactMarkdown>
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:border-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  重新配对
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 py-2.5 rounded-lg bg-pixel-gold/20 border border-pixel-gold/30 text-pixel-gold text-sm hover:bg-pixel-gold/30 transition-colors"
                >
                  返回首页
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MobileContainer>
  );
};

export default MatchPage;
