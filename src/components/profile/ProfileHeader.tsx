import React from 'react';
import { Settings, Search } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';

export const ProfileHeader: React.FC = () => {
  const { profile } = useUserStore();

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
        <button className="w-10 h-10 bg-black/40 backdrop-blur-[5px] rounded-full flex items-center justify-center border border-white/20 text-[#fbbf24] active:scale-90 active:bg-[#fbbf24]/20 transition-all">
          <Settings size={20} />
        </button>
        <button className="w-10 h-10 bg-black/40 backdrop-blur-[5px] rounded-full flex items-center justify-center border border-white/20 text-[#fbbf24] active:scale-90 active:bg-[#fbbf24]/20 transition-all">
          <Search size={20} />
        </button>
      </div>

      {/* User Identity */}
      <div className="absolute -bottom-10 right-5 flex flex-col items-end text-right z-20">
        {/* Avatar Container */}
        <div className="w-[100px] h-[100px] rounded-full border-4 border-[#09090b] shadow-[0_0_20px_rgba(139,92,246,0.5)] bg-[#1e1b4b] relative overflow-hidden">
            <img 
                src={profile.avatar || "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix"} 
                alt="Avatar" 
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
            <span>Lv.9 先知</span>
            <span className="opacity-30 mx-1">|</span>
            <button className="px-2 py-0.5 border border-white/10 rounded-xl text-[#fbbf24] text-xs hover:bg-white/5 transition-colors">
                编辑资料
            </button>
        </div>
      </div>
    </div>
  );
};
