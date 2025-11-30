import { useState } from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { HomeHeader } from '../components/home/HomeHeader';
import { UserInfoCard } from '../components/home/UserInfoCard';
import { DashboardGrid } from '../components/home/DashboardGrid';
import { ServiceBanner } from '../components/home/ServiceBanner';
import { InsightCard } from '../components/home/InsightCard';
import { InsightModal } from '../components/home/InsightModal';
import { QuickNavGrid } from '../components/home/QuickNavGrid';

export default function Home() {
  const [showInsight, setShowInsight] = useState(false);

  return (
    <MobileContainer 
      className="bg-pixel-midnight" 
      hideHeader 
      hideFooter
    >
      <div className="flex flex-col min-h-screen pb-24 relative">
        {/* Header Section */}
        <HomeHeader />
        
        {/* Main Content Scrollable Area */}
        <div className="flex-1 space-y-2">
            <UserInfoCard />
            <DashboardGrid />
            <ServiceBanner />
            <InsightCard onClick={() => setShowInsight(true)} />
            <QuickNavGrid />
        </div>

        {/* Modals */}
        <InsightModal 
          isOpen={showInsight} 
          onClose={() => setShowInsight(false)} 
        />
      </div>
    </MobileContainer>
  );
}
