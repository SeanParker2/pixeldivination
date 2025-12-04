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
    <div className="flex flex-col relative p-4 space-y-6">
      {/* Header Section */}
      <HomeHeader />
      
      {/* Main Content */}
      <div className="space-y-6">
          <UserInfoCard />
          <DashboardGrid />
          <ServiceBanner />
          <div onClick={() => setShowInsight(true)} className="cursor-pointer active:scale-[0.98] transition-transform">
            <InsightCard />
          </div>
          <QuickNavGrid />
      </div>

      {/* Modals */}
      <InsightModal 
        isOpen={showInsight} 
        onClose={() => setShowInsight(false)} 
      />
    </div>
  );
}
