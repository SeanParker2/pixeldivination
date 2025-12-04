import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Ellipsis } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { getZodiacSign, formatDate } from '../../lib/dateUtils';

interface UserInfoProps {
  avatarUrl?: string;
}

export const UserInfoCard: React.FC<UserInfoProps> = ({ 
  avatarUrl = "/images/home/avatar_user.png"
}) => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  
  const zodiac = getZodiacSign(profile.birthDate);
  const displayDate = formatDate(profile.birthDate).split(' ')[0];
  const displayName = profile.nickname || '未设置昵称';

  return (
    <div className="flex items-center justify-between px-4 pt-3 pb-5 relative">
      {/* Left: Avatar and Info */}
      <div className="flex items-center gap-3.5">
        {/* Avatar Circle */}
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/20 bg-white/10 flex items-center justify-center relative shrink-0">
            <img 
                src={avatarUrl} 
                alt="User Avatar" 
                className="w-full h-full object-cover"
                onError={(e) => {
                    // Fallback if image fails
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjgiIHI9IjUiPjwvY2lyY2xlPjxwYXRoIGQ9Ik0yMCAyMWE4IDggMCAwIDAtMTYgMCI+PC9wYXRoPjwvc3ZnPg==';
                }}
            />
        </div>
        
        {/* Info */}
        <div className="flex flex-col justify-center h-10">
          <h2 className="text-[#e4ded7] text-lg font-medium font-sans leading-tight">{displayName}</h2>
          <span className="text-[#e4ded7] text-xs font-normal font-sans mt-0.5">{displayDate}</span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/profile/edit')}
          className="text-[#e4ded7] text-sm font-normal font-sans hover:text-pixel-gold transition-colors"
        >
          编辑
        </button>
        <button className="text-[#e4ded7] hover:text-pixel-gold transition-colors flex items-center justify-center">
          <Ellipsis size={16} />
        </button>
      </div>
    </div>
  );
};
