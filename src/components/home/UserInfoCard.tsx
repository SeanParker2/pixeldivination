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
    <div className="flex items-center justify-between py-4 px-2">
      <div className="flex items-center gap-3">
        {/* Avatar Circle */}
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/20 bg-white/10 flex items-center justify-center">
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
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-white text-lg font-sans font-medium">{displayName}</h2>
            <span className="text-pixel-gold text-xs border border-pixel-gold/30 px-1.5 py-0.5 rounded bg-pixel-gold/10 font-pixel">
              {zodiac}
            </span>
          </div>
          <span className="text-pixel-secondary text-sm font-sans">{displayDate}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={() => navigate('/profile/edit')}
          className="text-white text-sm font-sans hover:text-pixel-gold transition-colors"
        >
          编辑
        </button>
        <button className="text-white hover:text-pixel-gold transition-colors">
          <Ellipsis size={20} />
        </button>
      </div>
    </div>
  );
};
