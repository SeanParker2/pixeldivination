import React from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { StatsGrid } from '../components/profile/StatsGrid';
import { ProfileMenu } from '../components/profile/ProfileMenu';

export const Profile: React.FC = () => {
  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Scrollable Content */}
      <div className="flex flex-col pb-32">
        <ProfileHeader />
        
        {/* Main Content Area */}
        <StatsGrid />
        
        <ProfileMenu />
      </div>
    </MobileContainer>
  );
};
