import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { ArrowLeft, Loader2, Sparkles, RotateCcw, AlertCircle } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { divinationService } from '../services/divinationService';
import { useUserStore } from '../stores/useUserStore';
import { useHistoryStore } from '../stores/useHistoryStore';

const HOURS = [
  { value: 0, label: '子时 (23:00-01:00)' },
  { value: 2, label: '丑时 (01:00-03:00)' },
  { value: 4, label: '寅时 (03:00-05:00)' },
  { value: 6, label: '卯时 (05:00-07:00)' },
  { value: 8, label: '辰时 (07:00-09:00)' },
  { value: 10, label: '巳时 (09:00-11:00)' },
  { value: 12, label: '午时 (11:00-13:00)' },
  { value: 14, label: '未时 (13:00-15:00)' },
  { value: 16, label: '申时 (15:00-17:00)' },
  { value: 18, label: '酉时 (17:00-19:00)' },
  { value: 20, label: '戌时 (19:00-21:00)' },
  { value: 22, label: '亥时 (21:00-23:00)' },
];

const BaZi: React.FC = () => {
  const navigate = useNavigate();
  const { profile, activePersona } = useUserStore();
  const addHistory = useHistoryStore(s => s.addEntry);

  const [birthDate, setBirthDate] = useState(profile.birthDate?.split('T')[0] || '');
  const [birthHour, setBirthHour] = useState(12);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async () => {
    if (!birthDate) {
      setError('请输入出生日期');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await divinationService.calculateBazi({
        birthDate,
        birthHour,
        gender,
        persona: activePersona,
      });

      setResult(res.reading);
      addHistory({
        type: 'bazi',
        summary: '八字命理分析',
        details: { birthDate, birthHour, gender, reading: res.reading },
      });
    } catch (err: unknown) {
      const axiosError = err as { isRateLimit?: boolean; userMessage?: string };
      if (axiosError.isRateLimit) {
        setError(axiosError.userMessage || '今日免费次数已用完');
      } else {
        setError(axiosError.userMessage || '计算失败，请稍后再试');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
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
          <h1 className="text-xl text-white font-pixel">八字命理</h1>
          <p className="text-xs text-gray-500">四柱排盘 · 五行分析 · 命理解读</p>
        </div>
      </div>

      <div className="relative z-10 px-4 pb-8 overflow-y-auto h-[calc(100%-60px)]">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-5 mt-4"
            >
              {/* Birth Date */}
              <div className="glass-card p-4">
                <label className="text-sm text-gray-400 mb-2 block">出生日期</label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-pixel-gold/50 focus:outline-none"
                />
              </div>

              {/* Birth Hour */}
              <div className="glass-card p-4">
                <label className="text-sm text-gray-400 mb-2 block">出生时辰</label>
                <select
                  value={birthHour}
                  onChange={(e) => setBirthHour(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white text-sm focus:border-pixel-gold/50 focus:outline-none appearance-none"
                >
                  {HOURS.map(h => (
                    <option key={h.value} value={h.value} className="bg-slate-800">{h.label}</option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="glass-card p-4">
                <label className="text-sm text-gray-400 mb-2 block">性别</label>
                <div className="flex gap-3">
                  {(['male', 'female'] as const).map(g => (
                    <button
                      key={g}
                      onClick={() => setGender(g)}
                      className={`flex-1 py-2.5 rounded-lg text-sm border transition-colors ${
                        gender === g
                          ? 'bg-pixel-gold/20 border-pixel-gold/50 text-pixel-gold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20'
                      }`}
                    >
                      {g === 'male' ? '男' : '女'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error */}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                >
                  <AlertCircle size={16} />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCalculate}
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pixel-gold to-amber-600 text-black font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    排盘中...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    开始排盘
                  </>
                )}
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 space-y-4"
            >
              {/* Result Card */}
              <div className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <Sparkles size={14} className="text-pixel-gold" />
                  <span className="text-pixel-gold font-bold text-sm">八字命理分析报告</span>
                </div>
                <div className="prose prose-invert prose-sm max-w-none font-sans text-gray-200 leading-relaxed">
                  <ReactMarkdown>{result}</ReactMarkdown>
                </div>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-gray-500">命理分析仅供参考</span>
                  <span className="text-[10px] text-gray-500">Powered by AI</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 py-2.5 rounded-lg bg-white/5 border border-white/10 text-gray-400 text-sm hover:border-white/20 transition-colors flex items-center justify-center gap-2"
                >
                  <RotateCcw size={14} />
                  重新排盘
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

export default BaZi;
