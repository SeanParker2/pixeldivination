import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../../stores/useUserStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { formatDate } from '../../lib/dateUtils';

interface UserInfoProps {
  avatarUrl?: string;
}

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

function getLevelTitle(totalDivinations: number): string {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalDivinations >= LEVELS[i].minExp) {
      return `Lv.${LEVELS[i].level} ${LEVELS[i].title}`;
    }
  }
  return 'Lv.1 新手';
}

export const UserInfoCard: React.FC<UserInfoProps> = ({
  avatarUrl = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Felix"
}) => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const stats = useHistoryStore(state => state.getStats());

  const displayDate = formatDate(profile.birthDate).split(' ')[0];
  const displayName = profile.nickname || '未命名';
  const levelTitle = getLevelTitle(stats.total);

  return (
    <div
      className="glass-card user-card cursor-pointer hover:border-white/20 transition-colors"
      onClick={() => navigate('/profile/edit')}
    >
        <div className="avatar">
            <img src={avatarUrl} width="100%" height="100%" alt="avatar" />
        </div>
        <div className="user-info">
            <div style={{display:'flex', alignItems:'center', gap:'8px'}}>
                <h2>{displayName}</h2>
                <span className="tag">{levelTitle}</span>
            </div>
            <p>{displayDate} | 点击编辑个人资料</p>
        </div>
        <div style={{marginLeft:'auto', fontSize:'20px', color:'#64748b'}}>⋮</div>
    </div>
  );
};
