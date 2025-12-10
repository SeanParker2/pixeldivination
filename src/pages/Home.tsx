import { useState } from 'react';
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
    <div className="mobile-container">
      <HomeHeader />
      
      <UserInfoCard />
      
      <DashboardGrid />
      
      <ServiceBanner />
      
      {/* InsightCard was not in the main flow of homedemo.html as a separate block, 
          but referenced in code. The user request says "Visual presentation must be 100% consistent".
          homedemo.html structure: Header -> UserCard -> DashboardGrid -> Banner -> QuickNav.
          It does NOT show an InsightCard separately.
          However, the DashboardGrid in homedemo.html contains a "Tarot Entry" which looks like the InsightCard.
          I need to check DashboardGrid.tsx to see if it includes the Tarot card.
      */}
      
      <QuickNavGrid />

      {/* Modals */}
      <InsightModal isOpen={showInsight} onClose={() => setShowInsight(false)} />
    </div>
  );
}
