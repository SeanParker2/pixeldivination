import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, Heart, X, Compass, MoonStar } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { ChartHeader } from '../components/starchart/ChartHeader';
import { ChartInfoPanel } from '../components/starchart/ChartInfoPanel';
import { AstrologyWheel } from '../components/starchart/AstrologyWheel';
import { ReportActions } from '../components/starchart/ReportActions';
import { PartnerInputForm, type PartnerData } from '../components/starchart/PartnerInputForm';
import { useUserStore } from '../stores/useUserStore';
import { calculateChart, getLatLong } from '../lib/astrology';
import { fetchNatalChartReading, fetchSynastryReading, fetchTransitReading, fetchSkyReading } from '../services/aiService';
import { useHistoryStore } from '../stores/useHistoryStore';

export const StarChart: React.FC = () => {
  const { profile } = useUserStore();
  const [activeTab, setActiveTab] = useState("本命盘");
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);

  // Load cached report
  useEffect(() => {
    if (activeTab === "本命盘") {
        const cached = localStorage.getItem('natal_chart_report');
        if (cached) setReport(cached);
        else setReport(null);
    } else {
        setReport(null); 
    }
  }, [activeTab]);

  const handleNatalReport = async () => {
    if (report && activeTab === "本命盘") return;

    if (!profile.birthDate) {
      alert('请先在“我的”页面完善出生信息');
      return;
    }

    setIsAnalyzing(true);

    try {
      const city = typeof profile.birthLocation === 'string' 
        ? profile.birthLocation 
        : (profile.birthLocation as any).city || '北京'; 
      const coords = getLatLong(city);
      const date = new Date(profile.birthDate);
      const data = calculateChart(date, coords);

      const result = await fetchNatalChartReading(data.planets);
      setReport(result);
      localStorage.setItem('natal_chart_report', result);

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

  const handleSynastryReport = async () => {
      if (!partnerData) return;
      
      setIsAnalyzing(true);
      try {
          const userCity = typeof profile.birthLocation === 'string' ? profile.birthLocation : (profile.birthLocation as any).city || '北京';
          const userCoords = getLatLong(userCity);
          const userDate = new Date(profile.birthDate!);
          const userData = calculateChart(userDate, userCoords);

          const partnerCoords = getLatLong(partnerData.birthCity);
          const partnerDateObj = new Date(`${partnerData.birthDate}T${partnerData.birthTime}`);
          const partnerChartData = calculateChart(partnerDateObj, partnerCoords);

          const result = await fetchSynastryReading(userData.planets, partnerChartData.planets, partnerData.name);
          setReport(result);
          
          useHistoryStore.getState().addEntry({
              type: 'synastry',
              summary: `与 ${partnerData.name} 的合盘分析`,
              fullResult: result,
              data: {
                  planets: userData.planets,
                  partner: {
                      name: partnerData.name,
                      planets: partnerChartData.planets
                  }
              }
          });
      } catch (error) {
          console.error(error);
          setReport('合盘解读生成失败，请稍后再试。');
      } finally {
          setIsAnalyzing(false);
      }
  };

  const handleTransitReport = async () => {
    if (!profile.birthDate) {
      alert('请先在“我的”页面完善出生信息');
      return;
    }
    setIsAnalyzing(true);
    try {
      // Natal
      const city = typeof profile.birthLocation === 'string' ? profile.birthLocation : (profile.birthLocation as any).city || '北京';
      const coords = getLatLong(city);
      const birthDate = new Date(profile.birthDate);
      const natalData = calculateChart(birthDate, coords);

      // Transit (Now)
      const now = new Date();
      const transitData = calculateChart(now, coords);

      const result = await fetchTransitReading(natalData.planets, transitData.planets);
      setReport(result);

      useHistoryStore.getState().addEntry({
        type: 'transit',
        summary: '近期行运推演',
        fullResult: result,
        data: {
          planets: natalData.planets,
          transitPlanets: transitData.planets
        }
      });
    } catch (error) {
      console.error(error);
      setReport('行运解读生成失败');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSkyReport = async () => {
    setIsAnalyzing(true);
    try {
      // Sky (Now, Default Location or User Location)
      const city = profile.birthLocation ? (typeof profile.birthLocation === 'string' ? profile.birthLocation : (profile.birthLocation as any).city) : '北京';
      const coords = getLatLong(city);
      const now = new Date();
      const skyData = calculateChart(now, coords);

      const result = await fetchSkyReading(skyData.planets);
      setReport(result);

      useHistoryStore.getState().addEntry({
        type: 'sky',
        summary: '今日天象解读',
        fullResult: result,
        data: {
          planets: skyData.planets
        }
      });
    } catch (error) {
      console.error(error);
      setReport('天象解读生成失败');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getReportIcon = () => {
      switch (activeTab) {
          case '合盘': return Heart;
          case '行运盘': return Compass;
          case '天象盘': return MoonStar;
          default: return Sparkles;
      }
  };

  const getReportColor = () => {
      switch (activeTab) {
          case '合盘': return 'text-pink-400';
          case '行运盘': return 'text-blue-400';
          case '天象盘': return 'text-indigo-400';
          default: return 'text-orange-400';
      }
  };
  
  const getReportTitle = () => {
    switch (activeTab) {
        case '合盘': return '双人合盘深度解读';
        case '行运盘': return '近期行运推演';
        case '天象盘': return '今日天象解读';
        default: return '本命盘深度解读';
    }
  };

  const getProseColor = () => {
    switch (activeTab) {
        case '合盘': return 'prose-pink';
        case '行运盘': return 'prose-blue';
        case '天象盘': return 'prose-indigo';
        default: return 'prose-orange';
    }
  };

  return (
    <MobileContainer hideHeader={true} hideFooter={true} className="bg-[#161622]">
      {/* Custom Header */}
      <ChartHeader activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content Area */}
      <div className="flex flex-col min-h-full pb-32">
        
        {activeTab === '合盘' && !partnerData ? (
            <div className="flex-1 flex flex-col items-center justify-center px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <PartnerInputForm 
                    onSubmit={(data) => setPartnerData(data)} 
                    onCancel={() => setActiveTab('本命盘')} 
                />
                <p className="mt-6 text-xs text-gray-500 max-w-xs text-center leading-relaxed">
                    请输入对方的出生信息。我们将对比双方的星盘配置，解读你们的灵魂契合度与缘分走向。
                </p>
            </div>
        ) : (
            <>
                {/* Info Panel */}
                <ChartInfoPanel />

                {/* Visualizer */}
                <div className="flex-1 flex items-center justify-center my-4 relative">
                   <AstrologyWheel 
                        date={activeTab === '行运盘' || activeTab === '天象盘' ? new Date() : undefined}
                   />
                   
                   {/* Overlays for different modes */}
                   {activeTab === '合盘' && partnerData && (
                       <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-4 right-4 bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-2 shadow-lg shadow-pink-500/10"
                        >
                            <Heart size={12} className="fill-pink-500 text-pink-500" />
                            <span>与 {partnerData.name} 合盘中</span>
                            <button 
                                onClick={() => setPartnerData(null)}
                                className="ml-1 hover:text-white"
                            >
                                <X size={12} />
                            </button>
                       </motion.div>
                   )}

                    {activeTab === '行运盘' && (
                       <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-4 right-4 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-2"
                        >
                            <Compass size={12} />
                            <span>行运模式 (Transit)</span>
                       </motion.div>
                   )}

                    {activeTab === '天象盘' && (
                       <motion.div 
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="absolute top-4 right-4 bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs px-3 py-1.5 rounded-full backdrop-blur flex items-center gap-2"
                        >
                            <MoonStar size={12} />
                            <span>实时天象 (Now)</span>
                       </motion.div>
                   )}
                </div>

                {/* Footer Actions */}
                <ReportActions 
                    activeTab={activeTab}
                    onNatalReading={() => {
                        setActiveTab('本命盘');
                        handleNatalReport();
                    }} 
                    onSynastryReading={() => {
                        setActiveTab('合盘');
                        handleSynastryReport();
                    }}
                    onTransitReading={handleTransitReport}
                    onSkyReading={handleSkyReport}
                />
            </>
        )}

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
                                {React.createElement(getReportIcon(), { 
                                    className: getReportColor(),
                                    size: 20 
                                })}
                                <h3 className="text-white font-bold text-lg">
                                    {getReportTitle()}
                                </h3>
                             </div>
                             {report && !isAnalyzing && (
                                <button 
                                    onClick={() => {
                                        if (confirm('确定要重新生成解读吗？这将消耗新的点数。')) {
                                            setReport(null);
                                            if (activeTab === '本命盘') localStorage.removeItem('natal_chart_report');
                                            
                                            if (activeTab === '合盘') handleSynastryReport();
                                            else if (activeTab === '行运盘') handleTransitReport();
                                            else if (activeTab === '天象盘') handleSkyReport();
                                            else handleNatalReport();
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
                                <p className="text-xs text-gray-600">
                                    {activeTab === '合盘' ? '分析双方行星相位与能量交互...' : 
                                     activeTab === '行运盘' ? '推演当前星象对本命盘的影响...' :
                                     activeTab === '天象盘' ? '解读当下宇宙能量场...' :
                                     '分析行星相位与宫位能量...'}
                                </p>
                            </div>
                        ) : (
                            <div className={`prose prose-invert max-w-none text-sm leading-relaxed ${getProseColor()}`}>
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
