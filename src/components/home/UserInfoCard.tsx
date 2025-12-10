import React from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { formatDate } from '../../lib/dateUtils';

interface UserInfoProps {
  avatarUrl?: string;
}

export const UserInfoCard: React.FC<UserInfoProps> = ({ 
  avatarUrl = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix"
}) => {
  const { profile } = useUserStore();
  
  const displayDate = formatDate(profile.birthDate).split(' ')[0];
  const displayName = profile.nickname || '白羊座';

  return (
    <div className="glass-card user-card">
        <div className="avatar">
            <img src={avatarUrl} width="100%" height="100%" alt="avatar" />
        </div>
        <div className="user-info">
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <h2>{displayName}</h2>
                <span className="tag">LV.9</span>
            </div>
            <p>{displayDate} | 运势加载中...</p>
        </div>
        <div style={{marginLeft:'auto', fontSize:'20px', color:'#64748b'}}>⋮</div>
    </div>
  );
};
