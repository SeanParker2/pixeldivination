import React from 'react';
import { Ellipsis } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { formatDate } from '../../lib/dateUtils';

interface UserInfoProps {
  avatarUrl?: string;
}

export const UserInfoCard: React.FC<UserInfoProps> = ({ 
  avatarUrl = "/images/home/avatar_user.png"
}) => {
  const { profile } = useUserStore();
  
  const displayDate = formatDate(profile.birthDate).split(' ')[0];
  const displayName = profile.nickname || '未设置昵称';

  return (
    <div className="glass-card flex items-center justify-between px-4 py-4 relative mb-4">
      {/* Left: Avatar and Info */}
      <div className="flex items-center gap-4">
        {/* Avatar Circle */}
        <div 
            className="w-14 h-14 rounded-full overflow-hidden flex items-center justify-center relative shrink-0 bg-[#333]"
            style={{
                border: '2px solid var(--text-gold)',
                boxShadow: '0 0 15px rgba(251, 191, 36, 0.4)'
            }}
        >
            <img 
                src={avatarUrl} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYgMCI+PC9wYXRoPjwvc3ZnPg==';
                }}
            />
        </div>
        
        {/* Info */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-[20px] font-sans font-medium leading-none m-0">{displayName}</h2>
            <span 
                className="text-[12px] px-2 py-0.5 rounded border font-sans"
                style={{
                    background: 'rgba(251, 191, 36, 0.1)',
                    color: 'var(--text-gold)',
                    borderColor: 'rgba(251, 191, 36, 0.3)'
                }}
            >
                LV.9
            </span>
          </div>
          <p className="text-[#94a3b8] text-[14px] font-sans mt-1 m-0">{displayDate} | 运势加载中...</p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center">
        <button className="text-[#64748b] hover:text-[#fbbf24] transition-colors flex items-center justify-center">
          <Ellipsis size={24} />
        </button>
      </div>
    </div>
  );
};
