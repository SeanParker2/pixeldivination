import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fortuneService } from '../services/fortuneService';
import { useUserStore } from '../stores/useUserStore';
import { getZodiacSign } from '../lib/dateUtils';
import type { FortuneScores } from '../types/fortune';

interface FortuneCalendarItem {
  date: string;
  scores: FortuneScores;
}

export const FortuneCalendar: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarData, setCalendarData] = useState<FortuneCalendarItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const zodiac = profile.birthDate ? getZodiacSign(profile.birthDate) : '白羊座';

  useEffect(() => {
    const fetchCalendar = async () => {
      setIsLoading(true);
      try {
        const monthStr = currentMonth.toISOString().slice(0, 7); // YYYY-MM
        const data = await fortuneService.getCalendar(zodiac, monthStr);
        setCalendarData(data);
      } catch (error) {
        console.error('Failed to fetch calendar:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalendar();
  }, [currentMonth, zodiac]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDate = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const getFortuneForDate = (dateStr: string) => {
    return calendarData.find(item => item.date === dateStr);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getAverageScore = (scores: FortuneScores) => {
    const values = Object.values(scores);
    return Math.round(values.reduce((a, b) => a + b, 0) / values.length);
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-white/70 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-pixel text-[#fbbf24]">运势日历</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Month Navigation */}
        <div className="flex items-center justify-between">
          <button onClick={prevMonth} className="p-2 text-white/70 hover:text-white">
            <ChevronLeft size={20} />
          </button>
          <h2 className="text-lg font-pixel text-white">
            {year}年{month + 1}月
          </h2>
          <button onClick={nextMonth} className="p-2 text-white/70 hover:text-white">
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Zodiac Info */}
        <div className="glass-card p-4 text-center">
          <p className="text-sm text-gray-400">当前星座</p>
          <p className="text-xl font-pixel text-[#fbbf24]">{zodiac}</p>
        </div>

        {/* Calendar Grid */}
        <div className="glass-card p-4">
          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '一', '二', '三', '四', '五', '六'].map(day => (
              <div key={day} className="text-center text-xs text-gray-400 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Days */}
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbbf24]"></div>
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {/* Empty cells for first week */}
              {Array.from({ length: firstDay }).map((_, index) => (
                <div key={`empty-${index}`} className="p-2" />
              ))}

              {/* Days of month */}
              {Array.from({ length: daysInMonth }).map((_, index) => {
                const day = index + 1;
                const dateStr = formatDate(year, month, day);
                const fortune = getFortuneForDate(dateStr);
                const avgScore = fortune ? getAverageScore(fortune.scores) : null;
                const isSelected = selectedDate === dateStr;
                const isToday = new Date().toISOString().split('T')[0] === dateStr;

                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDate(dateStr)}
                    className={`p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'border-[#fbbf24] bg-[#fbbf24]/10'
                        : isToday
                        ? 'border-white/30 bg-white/5'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="text-sm text-white">{day}</div>
                    {avgScore !== null && (
                      <div className={`text-xs ${getScoreColor(avgScore)}`}>
                        {avgScore}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected Date Detail */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4"
          >
            <h3 className="text-lg font-pixel text-white mb-3">{selectedDate}</h3>
            {(() => {
              const fortune = getFortuneForDate(selectedDate);
              if (!fortune) {
                return <p className="text-gray-400 text-sm">暂无运势数据</p>;
              }

              const scoreEntries = [
                { label: '健康', value: fortune.scores.health },
                { label: '爱情', value: fortune.scores.love },
                { label: '事业', value: fortune.scores.career },
                { label: '财运', value: fortune.scores.wealth },
                { label: '学业', value: fortune.scores.academic },
                { label: '社交', value: fortune.scores.social },
              ];

              return (
                <div className="space-y-3">
                  {scoreEntries.map(entry => (
                    <div key={entry.label} className="flex items-center gap-3">
                      <span className="text-sm text-gray-400 w-12">{entry.label}</span>
                      <div className="flex-1 bg-white/10 rounded-full h-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#8b5cf6] to-[#ec4899]"
                          style={{ width: `${entry.value}%` }}
                        />
                      </div>
                      <span className={`text-sm ${getScoreColor(entry.value)}`}>
                        {entry.value}
                      </span>
                    </div>
                  ))}
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* Legend */}
        <div className="glass-card p-4">
          <h3 className="text-sm font-pixel text-white mb-2">图例说明</h3>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="text-gray-400">80+ 大吉</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span className="text-gray-400">60-79 中吉</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <span className="text-gray-400">60以下 需注意</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FortuneCalendar;
