import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ChartHeader } from '../components/starchart/ChartHeader';
import { ChartInfoPanel } from '../components/starchart/ChartInfoPanel';
import { AstrologyWheel } from '../components/starchart/AstrologyWheel';
import { ReportActions } from '../components/starchart/ReportActions';
import { useUserStore } from '../stores/useUserStore';
import { calculateChart, getLatLong } from '../lib/astrology';
import { fetchNatalChartReading } from '../services/aiService';

export const StarChart: React.FC = () => {
  const { profile } = useUserStore();
  const [activeTab, setActiveTab] = useState("合盘");
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Load cached report
  useEffect(() => {
    const cached = localStorage.getItem('natal_chart_report');
    if (cached) {
      setReport(cached);
    }
  }, []);

  const handleGenerateReport = async () => {
    if (report) {
      setShowReport(true);
      return;
    }

    if (!profile.birthDate) {
      alert('请先在“我的”页面完善出生信息');
      return;
    }

    setIsAnalyzing(true);
    setShowReport(true); // Show modal immediately to show loading state

    try {
      // Calculate chart data
      const city = typeof profile.birthLocation === 'string' 
        ? profile.birthLocation 
        : (profile.birthLocation as any).city || '北京'; 
      const coords = getLatLong(city);
      const date = new Date(profile.birthDate);
      const data = calculateChart(date, coords);

      // Fetch reading
      const result = await fetchNatalChartReading(data.planets);
      setReport(result);
      localStorage.setItem('natal_chart_report', result);
    } catch (error) {
      console.error(error);
      setReport('解读生成失败，请稍后再试。');
    } finally {
      setIsAnalyzing(false);
    }
  };

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
        <ReportActions onNatalReading={handleGenerateReport} />
      </div>

      {/* Report Modal */}
      <AnimatePresence>
        {showReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 500 }}
              className="w-full max-w-md h-[80vh] bg-[#1E1E2E] rounded-t-2xl sm:rounded-2xl flex flex-col overflow-hidden border-t border-white/10 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#1E1E2E] z-10">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-orange-400" size={20} />
                  <h3 className="text-white font-bold text-lg">本命盘深度解读</h3>
                </div>
                <button 
                  onClick={() => setShowReport(false)}
                  className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/10"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                {isAnalyzing ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
                    <Loader2 className="animate-spin text-orange-500" size={40} />
                    <p className="animate-pulse">正在连接星象数据库...</p>
                    <p className="text-xs text-gray-600">分析行星相位与宫位能量</p>
                  </div>
                ) : (
                  <div className="prose prose-invert prose-orange max-w-none">
                    <Markdown>{report}</Markdown>
                  </div>
                )}
              </div>
              
              {/* Bottom Bar */}
              {!isAnalyzing && (
                 <div className="p-4 border-t border-white/10 bg-[#1E1E2E]">
                    <button 
                        onClick={() => {
                            setReport(null);
                            localStorage.removeItem('natal_chart_report');
                            handleGenerateReport();
                        }}
                        className="w-full py-3 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl text-sm transition-colors"
                    >
                        重新解读
                    </button>
                 </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MobileContainer>
  );
};
