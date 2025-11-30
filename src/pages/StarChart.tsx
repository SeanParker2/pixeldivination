import React, { useState } from 'react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ChartHeader } from '../components/starchart/ChartHeader';
import { ChartInfoPanel } from '../components/starchart/ChartInfoPanel';
import { AstrologyWheel } from '../components/starchart/AstrologyWheel';
import { ReportActions } from '../components/starchart/ReportActions';

export const StarChart: React.FC = () => {
  const [activeTab, setActiveTab] = useState("合盘");

  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Custom Header */}
      <ChartHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-full pb-32">
        
        {/* Info Panel */}
        <ChartInfoPanel />

        {/* Visualizer */}
        <div className="flex-1 flex items-center justify-center my-4">
           <AstrologyWheel />
        </div>

        {/* Footer Actions */}
        <ReportActions />
      </div>
    </MobileContainer>
  );
};
