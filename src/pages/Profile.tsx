import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { MenuSection, MenuItem } from '../components/profile/ProfileMenu';
import { CartDrawer } from '../components/shop/CartDrawer';
import { HistoryDrawer } from '../components/profile/HistoryDrawer';
import { PersonaDrawer } from '../components/profile/PersonaDrawer';
import { useUserStore } from '../stores/useUserStore';
import { PERSONAS } from '../types/ai';

export const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isPersonaOpen, setIsPersonaOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { activePersona } = useUserStore();

  const currentPersona = PERSONAS[activePersona];

  return (
    <div className="w-full max-w-md mx-auto pt-4 pb-32 px-4 flex flex-col h-full relative">
      <ProfileHeader />

      {/* Main Content Area */}
      <StatsGrid
          onCartClick={() => setIsCartOpen(true)}
          onHistoryClick={() => setIsHistoryOpen(true)}
      />

      {/* Menu Sections */}
      <MenuSection title="我的旅程">
          <MenuItem
              variant="persona"
              icon="🧙‍♀️"
              label={`AI 占卜师人格`}
              rightElement={<span className="bg-[#8b5cf6] text-white px-1.5 py-0.5 rounded text-[10px] ml-2">{currentPersona.name}</span>}
              subLabel={`当前风格：${currentPersona.desc}`}
              onClick={() => setIsPersonaOpen(true)}
          />

          <MenuItem
              icon="📜"
              label="占卜历史"
              subLabel="查看所有占卜记录"
              onClick={() => setIsHistoryOpen(true)}
          />

          <MenuItem
              icon="⭐"
              label="我的星盘"
              subLabel="查看本命盘、合盘"
              onClick={() => navigate('/starchart')}
          />

          <MenuItem
              icon="🔮"
              label="每日运势"
              subLabel="查看今日运势"
              onClick={() => navigate('/daily-fortune')}
          />
      </MenuSection>

      <MenuSection title="商城" className="pt-0">
          <MenuItem
              icon="🎒"
              label="灵性道具商城"
              subLabel="水晶、塔罗牌、占卜工具"
              onClick={() => navigate('/shop')}
          />

          <MenuItem
              icon="📦"
              label="我的订单"
              subLabel="查看订单状态"
              onClick={() => navigate('/orders')}
          />

          <MenuItem
              icon="🛒"
              label="购物车"
              onClick={() => setIsCartOpen(true)}
          />
      </MenuSection>

      <MenuSection title="系统" className="pt-0">
          <MenuItem
              icon="⚙️"
              label="个人设置"
              subLabel="编辑昵称、出生信息"
              onClick={() => navigate('/profile/edit')}
          />

          <MenuItem
              icon="💬"
              label="星座圈"
              subLabel="与其他用户交流"
              onClick={() => navigate('/community')}
          />

          <MenuItem
              icon="💕"
              label="星座配对"
              subLabel="测试你与 TA 的缘分"
              onClick={() => navigate('/match')}
          />
      </MenuSection>

      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
      <PersonaDrawer isOpen={isPersonaOpen} onClose={() => setIsPersonaOpen(false)} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
