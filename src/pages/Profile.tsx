import React, { useState } from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { ProfileMenu } from '../components/profile/ProfileMenu';
import { HistoryDrawer } from '../components/profile/HistoryDrawer';

export const Profile: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Scrollable Content */}
      <div className="flex flex-col pb-32">
        <ProfileHeader />
        
        {/* Main Content Area */}
        <StatsGrid />
        
        <ProfileMenu onHistoryClick={() => setIsHistoryOpen(true)} />
      </div>

      <HistoryDrawer isOpen={isHistoryOpen} onClose={() => setIsHistoryOpen(false)} />
    </MobileContainer>
  );
};
