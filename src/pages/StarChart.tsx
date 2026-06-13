import React, { useState, useEffect, useRef } from 'react';
import Markdown from 'react-markdown';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Compass, MoonStar, Share2, Download } from 'lucide-react';
import { ChartHeader } from '../components/starchart/ChartHeader';
import { ChartInfoPanel } from '../components/starchart/ChartInfoPanel';
import { AstrologyWheel } from '../components/starchart/AstrologyWheel';
import { ReportActions } from '../components/starchart/ReportActions';
import { PartnerInputForm, type PartnerData } from '../components/starchart/PartnerInputForm';
import { useUserStore } from '../stores/useUserStore';
import { calculateChart, getLatLong } from '../lib/astrology';
import { chartService } from '../services/chartService';
import { generateNatalInterpretation, generateTransitInterpretation, generateSkyInterpretation, generateSynastryInterpretation } from '../lib/chartInterpreter';
import { useHistoryStore } from '../stores/useHistoryStore';
import { ShareCard } from '../components/share/ShareCard';

export const StarChart: React.FC = () => {
  const { profile, activePersona } = useUserStore();
  const [activeTab, setActiveTab] = useState("本命盘");
  const [report, setReport] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAiReading, setHasAiReading] = useState(false);
  const [chartData, setChartData] = useState<{
    planets: { name: string; symbol: string; longitude: number }[];
    ascendant: number;
    midheaven: number;
  } | null>(null);
  
  const [partnerData, setPartnerData] = useState<PartnerData | null>(null);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const [showShareModal, setShowShareModal] = useState(false);
  const [shareImage, setShareImage] = useState<string | null>(null);
  const shareCardRef = useRef<HTMLDivElement>(null);

  // Load cached report and compute chart data
  useEffect(() => {
    if (activeTab === "本命盘") {
        const cached = localStorage.getItem('natal_chart_report');
        if (cached) setReport(cached);
        else setReport(null);
    } else {
        setReport(null);
    }

    // Compute chart data for info panel
    if (profile.birthDate) {
      try {
        const city = typeof profile.birthLocation === 'string'
          ? profile.birthLocation
          : profile.birthLocation?.city || '北京';
        const coords = getLatLong(city);
        const date = activeTab === '行运盘' || activeTab === '天象盘'
          ? new Date()
          : new Date(profile.birthDate);
        const data = calculateChart(date, coords);
        setChartData(data);
      } catch (e) {
        console.error('Chart calculation failed:', e);
      }
    }
  }, [activeTab, profile.birthDate, profile.birthLocation]);

  const handleShare = async () => {
    if (!shareCardRef.current) return;
    
    try {
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const html2canvas = (await import('html2canvas')).default;
      
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#18181b',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      
      setShareImage(canvas.toDataURL('image/png'));
      setShowShareModal(true);
    } catch (error) {
      console.error('Failed to generate share card:', error);
    }
  };

  const handleDownload = async () => {
    if (!shareCardRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(shareCardRef.current, {
        backgroundColor: '#18181b',
        scale: 2,
        useCORS: true,
        allowTaint: true,
      });
      const link = document.createElement('a');
      link.download = `pixel-starchart-${new Date().getTime()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to download:', error);
    }
  };

  const handleMainAction = async () => {
    if (activeTab === '合盘') {
        if (partnerData) await handleSynastry(partnerData);
        else setShowPartnerModal(true);
    } else {
        await handleNatalReport();
    }
  };

  const handleNatalReport = async () => {
    if (activeTab !== "本命盘") setActiveTab("本命盘");
    if (report && activeTab === "本命盘") return;

    if (!profile.birthDate) {
      alert('请先在"我的"页面完善出生信息');
      return;
    }

    setIsAnalyzing(true);

    try {
      const city = typeof profile.birthLocation === 'string'
        ? profile.birthLocation
        : profile.birthLocation.city || '北京';
      const coords = getLatLong(city);

      const birthTimeStr = profile.birthDate.includes('T')
        ? profile.birthDate.split('T')[1].slice(0, 5)
        : '12:00';

      // 先生成客户端静态解读（即时显示）
      const birthDate = new Date(profile.birthDate);
      const chartData = calculateChart(birthDate, coords);
      const staticReading = generateNatalInterpretation(chartData.planets);
      setReport(staticReading);
      setHasAiReading(false);

      // 保存星盘到后端（后台）
      const chart = await chartService.createNatal({
        birthDate: profile.birthDate,
        birthTime: birthTimeStr,
        birthCity: city,
        birthLat: coords.lat,
        birthLng: coords.lng,
        name: '我的本命盘',
      });

      // 保存 chartId 供 AI 升级使用
      localStorage.setItem('natal_chart_id', chart.id);
      localStorage.setItem('natal_chart_report', staticReading);

      useHistoryStore.getState().addEntry({
        type: 'natal-chart',
        summary: '本命盘解读',
        details: {
          report: staticReading,
          planets: chart.planets,
          chartId: chart.id,
        }
      });
    } catch (error) {
      console.error(error);
      setReport('解读生成失败，请稍后再试。');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // AI 深度解读
  const handleAiReading = async () => {
    const chartId = localStorage.getItem('natal_chart_id');
    if (!chartId) return;

    setIsAnalyzing(true);
    try {
      const result = await chartService.generateReading(chartId, activePersona);
      setReport(result);
      setHasAiReading(true);
      localStorage.setItem('natal_chart_report', result);
    } catch (error) {
      console.error('AI reading failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSynastry = async (data: PartnerData) => {
      setPartnerData(data);
      setShowPartnerModal(false);
      setIsAnalyzing(true);

      try {
          const userCity = typeof profile.birthLocation === 'string' ? profile.birthLocation : profile.birthLocation.city || '北京';
          const userCoords = getLatLong(userCity);
          const partnerCoords = getLatLong(data.birthCity);

          // 先生成客户端静态解读
          const userBirthDate = new Date(profile.birthDate!);
          const partnerBirthDate = new Date(data.birthDate);
          const natalA = calculateChart(userBirthDate, userCoords);
          const natalB = calculateChart(partnerBirthDate, partnerCoords);

          const userName = profile.nickname || '我';
          const staticReading = generateSynastryInterpretation(natalA.planets, natalB.planets, userName, data.name);
          setReport(staticReading);
          setHasAiReading(false);

          // 后台保存到后端
          const userBirthTime = profile.birthDate!.includes('T')
            ? profile.birthDate!.split('T')[1].slice(0, 5)
            : '12:00';

          const chart = await chartService.createSynastry({
            birthDateA: profile.birthDate!,
            birthTimeA: userBirthTime,
            birthCityA: userCity,
            birthLatA: userCoords.lat,
            birthLngA: userCoords.lng,
            birthDateB: data.birthDate,
            birthTimeB: data.birthTime,
            birthCityB: data.birthCity,
            birthLatB: partnerCoords.lat,
            birthLngB: partnerCoords.lng,
            partnerName: data.name,
            name: `与${data.name}的合盘`,
          });

          localStorage.setItem('synastry_chart_id', chart.id);

          useHistoryStore.getState().addEntry({
              type: 'synastry',
              summary: `与 ${data.name} 的合盘分析`,
              details: {
                  result: staticReading,
                  chartId: chart.id,
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
      alert('请先在”我的”页面完善出生信息');
      return;
    }
    setIsAnalyzing(true);
    try {
      const city = typeof profile.birthLocation === 'string' ? profile.birthLocation : profile.birthLocation.city || '北京';
      const coords = getLatLong(city);
      const birthDate = new Date(profile.birthDate);
      const natalData = calculateChart(birthDate, coords);
      const now = new Date();
      const transitData = calculateChart(now, coords);

      // 先生成客户端静态解读
      const staticReading = generateTransitInterpretation(natalData.planets, transitData.planets);
      setReport(staticReading);
      setHasAiReading(false);

      useHistoryStore.getState().addEntry({
        type: 'transit',
        summary: '近期行运推演',
        details: {
          result: staticReading,
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
      const city = profile.birthLocation ? (typeof profile.birthLocation === 'string' ? profile.birthLocation : profile.birthLocation.city) : '北京';
      const coords = getLatLong(city);
      const now = new Date();
      const skyData = calculateChart(now, coords);

      // 先生成客户端静态解读
      const staticReading = generateSkyInterpretation(skyData.planets);
      setReport(staticReading);
      setHasAiReading(false);

      useHistoryStore.getState().addEntry({
        type: 'sky',
        summary: '今日天象解读',
        details: {
          result: staticReading,
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

  const ReportIcon = getReportIcon();

  return (
    <div className="min-h-full pb-24 px-4 pt-6 relative">
      <ChartHeader activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content */}
      <div className="space-y-6">
        
        {/* Info Panel */}
        <ChartInfoPanel
          planets={chartData?.planets}
          ascendant={chartData?.ascendant}
          midheaven={chartData?.midheaven}
          activeTab={activeTab}
        />

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
                                aria-label="移除合盘对象"
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
                    onGenerate={handleMainAction}
                    isLoading={isAnalyzing}
                    onTransitReading={handleTransitReport}
                    onSkyReading={handleSkyReport}
                    onSynastry={() => setShowPartnerModal(true)}
                />

        {/* Inline Report Section */}
        <AnimatePresence>
            {report && !isAnalyzing && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className={`w-full mt-5 bg-black/60 border rounded-lg p-5 shadow-[0_0_20px_rgba(0,0,0,0.3)] relative ${activeTab === '合盘' ? 'border-pink-500/30' : activeTab === '行运盘' ? 'border-blue-500/30' : activeTab === '天象盘' ? 'border-indigo-500/30' : 'border-[#fbbf24]/30'}`}
                >
                    {/* AI Badge */}
                    <div className="absolute -top-2.5 left-5 bg-[#09090b] px-2 flex items-center gap-2">
                        <ReportIcon size={14} className={getReportColor()} />
                        <span className={`text-xs tracking-[2px] ${getReportColor()}`}>
                            {getReportTitle()}
                        </span>
                    </div>

                    {/* Content */}
                    <div className={`prose prose-invert max-w-none text-sm leading-relaxed ${getProseColor()}`}>
                        <Markdown>{report}</Markdown>
                        <span className={`inline-block w-1.5 h-3.5 animate-pulse ml-1 align-middle ${activeTab === '合盘' ? 'bg-pink-500' : activeTab === '行运盘' ? 'bg-blue-500' : activeTab === '天象盘' ? 'bg-indigo-500' : 'bg-[#fbbf24]'}`}></span>
                    </div>
                    
                    {/* Divider */}
                    <div className="h-px bg-white/10 my-4"></div>
                    
                    {/* Footer info */}
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-xs text-[#64748b]">
                            {hasAiReading ? '[AI 深度解读]' : '[专业解读]'}
                        </p>
                        {!hasAiReading && activeTab === '本命盘' && (
                            <button
                                onClick={handleAiReading}
                                disabled={isAnalyzing}
                                className="flex items-center gap-1.5 text-xs text-pixel-gold hover:text-pixel-gold/80 transition-colors disabled:opacity-50"
                            >
                                <Sparkles size={12} />
                                {isAnalyzing ? 'AI 解读中...' : 'AI 深度解读'}
                            </button>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-2">
                        <button 
                            onClick={handleShare}
                            className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white px-3 py-1.5 rounded border border-white/10 transition-colors"
                        >
                            <Share2 size={14} />
                            分享报告
                        </button>
                        <button 
                            onClick={handleDownload}
                            className="flex items-center gap-1 text-xs text-[#94a3b8] hover:text-white px-3 py-1.5 rounded border border-white/10 transition-colors"
                        >
                            <Download size={14} />
                            保存图片
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {showPartnerModal && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
                onClick={(e) => {
                    if (e.target === e.currentTarget) setShowPartnerModal(false);
                }}
            >
                <PartnerInputForm 
                    onSubmit={handleSynastry} 
                    onCancel={() => setShowPartnerModal(false)}
                    initialData={partnerData}
                />
            </motion.div>
        )}
      </AnimatePresence>

      <ShareCard 
        ref={shareCardRef}
        activeTab={activeTab}
        report={report}
        partnerData={partnerData}
        onClose={() => setShowShareModal(false)}
        isOpen={showShareModal}
        shareImage={shareImage}
      />
    </div>
  );
};
