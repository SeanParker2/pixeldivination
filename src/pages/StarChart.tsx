import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ChartHeader } from '../components/starchart/ChartHeader';
import { ChartInfoPanel } from '../components/starchart/ChartInfoPanel';
import { AstrologyWheel } from '../components/starchart/AstrologyWheel';
import { ReportActions } from '../components/starchart/ReportActions';
import { useUserStore } from '../stores/useUserStore';
import { calculateChart, getLatLong } from '../lib/astrology';
import { fetchNatalChartReading } from '../services/aiService';
import { useHistoryStore } from '../stores/useHistoryStore';

export const StarChart: React.FC = () => {
  const { profile } = useUserStore();
  const [activeTab, setActiveTab] = useState("合盘");
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Load cached report
  useEffect(() => {
    const cached = localStorage.getItem('natal_chart_report');
    if (cached) {
      setReport(cached);
    }
  }, []);

  const handleGenerateReport = async () => {
    if (report) {
      // Already has report, maybe just scroll to it (optional)
      // Or allow clearing it? For now we follow "cache and avoid duplicate token usage"
      return;
    }

    if (!profile.birthDate) {
      alert('请先在“我的”页面完善出生信息');
      return;
    }

    setIsAnalyzing(true);

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

      // Save to history
      useHistoryStore.getState().addEntry({
        type: 'starchart',
        summary: '本命盘深度解读',
        fullResult: result,
        data: {
          planets: data.planets
        }
      });
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

        {/* Inline Report Section */}
        <AnimatePresence>
            {(isAnalyzing || report) && (
                <motion.div 
                    initial={{ opacity: 0, height: 0, y: 20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: 20 }}
                    className="px-4 mt-6 mb-8"
                >
                    <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-white/10 shadow-xl">
                        <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                             <div className="flex items-center gap-2">
                                <Sparkles className="text-orange-400" size={20} />
                                <h3 className="text-white font-bold text-lg">本命盘深度解读</h3>
                             </div>
                             {report && !isAnalyzing && (
                                <button 
                                    onClick={() => {
                                        if (confirm('确定要重新生成解读吗？这将消耗新的点数。')) {
                                            setReport(null);
                                            localStorage.removeItem('natal_chart_report');
                                            handleGenerateReport();
                                        }
                                    }}
                                    className="text-xs text-gray-500 hover:text-white transition-colors"
                                >
                                    重新解读
                                </button>
                             )}
                        </div>

                        {isAnalyzing ? (
                            <div className="flex flex-col items-center justify-center py-12 gap-4 text-gray-400">
                                <Loader2 className="animate-spin text-orange-500" size={32} />
                                <p className="animate-pulse text-sm">正在连接星象数据库...</p>
                                <p className="text-xs text-gray-600">分析行星相位与宫位能量</p>
                            </div>
                        ) : (
                            <div className="prose prose-invert prose-orange max-w-none text-sm leading-relaxed">
                                <Markdown>{report}</Markdown>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </MobileContainer>
  );
};
