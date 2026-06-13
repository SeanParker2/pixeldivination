import React from 'react';
import { Settings, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { useHistoryStore } from '../../stores/useHistoryStore';

// 等级系统
const LEVELS = [
  { level: 1, title: '新手', minExp: 0 },
  { level: 2, title: '学徒', minExp: 5 },
  { level: 3, title: '探索者', minExp: 15 },
  { level: 4, title: '解读者', minExp: 30 },
  { level: 5, title: '占卜师', minExp: 50 },
  { level: 6, title: '预言者', minExp: 80 },
  { level: 7, title: '星象师', minExp: 120 },
  { level: 8, title: '大师', minExp: 180 },
  { level: 9, title: '先知', minExp: 250 },
  { level: 10, title: '神谕者', minExp: 500 },
];

function getLevelInfo(totalDivinations: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalDivinations >= LEVELS[i].minExp) {
      const current = LEVELS[i];
      const next = LEVELS[i + 1];
      const progress = next
        ? (totalDivinations - current.minExp) / (next.minExp - current.minExp)
        : 1;
      return {
        level: current.level,
        title: current.title,
        progress: Math.min(progress, 1),
        currentExp: totalDivinations - current.minExp,
        nextExp: next ? next.minExp - current.minExp : 0,
      };
    }
  }
  return { level: 1, title: '新手', progress: 0, currentExp: 0, nextExp: 5 };
}

export const ProfileHeader: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const stats = useHistoryStore(state => state.getStats());
  const levelInfo = getLevelInfo(stats.total);

  return (
    <div className="relative w-full h-[280px] mb-[60px]">
      {/* Background Image with Mask */}
      <img
        src="https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?auto=format&fit=crop&w=800&q=80"
        alt="Profile Background"
        className="w-full h-full object-cover contrast-[1.2] brightness-[0.8]"
        style={{
            maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#581c87]/20 mix-blend-overlay" />

      {/* Top Actions */}
      <div className="absolute top-5 left-0 w-full px-5 flex justify-between z-10">
        <button
          onClick={() => navigate('/profile/edit')}
          className="w-10 h-10 bg-black/40 backdrop-blur-[5px] rounded-full flex items-center justify-center border border-white/20 text-[#fbbf24] active:scale-90 active:bg-[#fbbf24]/20 transition-all"
        >
          <Settings size={20} />
        </button>
        <button
          onClick={() => navigate('/community')}
          className="w-10 h-10 bg-black/40 backdrop-blur-[5px] rounded-full flex items-center justify-center border border-white/20 text-[#fbbf24] active:scale-90 active:bg-[#fbbf24]/20 transition-all"
        >
          <Search size={20} />
        </button>
      </div>

      {/* User Identity */}
      <div className="absolute -bottom-10 right-5 flex flex-col items-end text-right z-20">
        {/* Avatar Container */}
        <div className="w-[100px] h-[100px] rounded-full border-4 border-[#09090b] shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-[#1e1b4b] relative overflow-hidden">
            <img
                src={profile.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix"}
                alt="User Avatar"
                className="w-full h-full object-cover"
            />
            {/* Equip Badge */}
            <div className="absolute bottom-0 right-0 w-8 h-8 bg-black border-2 border-[#fbbf24] rounded-full flex items-center justify-center text-base shadow-[0_0_10px_rgba(251,191,36,0.5)] z-20">
                💎
            </div>
        </div>

        {/* User Info */}
        <div className="mt-2.5 text-[32px] text-white font-pixel leading-none drop-shadow-[0_0_10px_rgba(139,92,246,0.8)] tracking-wider">
            {profile.nickname || '未命名'}
        </div>

        <div className="flex items-center gap-2 mt-1 text-sm text-[#94a3b8] font-pixel">
            <span>Lv.{levelInfo.level} {levelInfo.title}</span>
            <span className="opacity-30 mx-1">|</span>
            <button
              onClick={() => navigate('/profile/edit')}
              className="px-2 py-0.5 border border-white/10 rounded-xl text-[#fbbf24] text-xs hover:bg-white/5 transition-colors"
            >
                编辑资料
            </button>
        </div>

        {/* Level Progress Bar */}
        <div className="w-32 h-1.5 bg-white/10 rounded-full mt-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pixel-gold to-purple-500 rounded-full transition-all duration-500"
            style={{ width: `${levelInfo.progress * 100}%` }}
          />
        </div>
        <span className="text-[10px] text-gray-600 mt-0.5">
          {levelInfo.currentExp}/{levelInfo.nextExp} EXP
        </span>
      </div>
    </div>
  );
};
