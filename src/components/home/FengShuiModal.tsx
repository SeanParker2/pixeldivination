import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bookmark, Check } from 'lucide-react';
import { useUserStore } from '../../stores/useUserStore';
import { useHistoryStore } from '../../stores/useHistoryStore';
import { calculateKua } from '../../lib/fengshui';
import type { FengShuiResult, Direction, FengShuiType } from '../../lib/fengshui';

interface FengShuiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DIRECTIONS: Direction[] = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
const DIRECTION_LABELS: Record<Direction, string> = {
  N: '北', NE: '东北', E: '东', SE: '东南',
  S: '南', SW: '西南', W: '西', NW: '西北'
};

// Helper to describe an SVG arc
const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  const d = [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
    "L", x, y,
    "L", start.x, start.y
  ].join(" ");
  return d;
};

const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
};

export const FengShuiModal: React.FC<FengShuiModalProps> = ({ isOpen, onClose }) => {
  const { profile } = useUserStore();
  
  // Use useMemo for result to avoid state in useEffect
  const result = React.useMemo(() => {
    if (!isOpen) return null;
    const birthYear = profile.birthDate ? new Date(profile.birthDate).getFullYear() : 2000;
    const gender = profile.gender === 'male' ? 'male' : 'female';
    return calculateKua(birthYear, gender);
  }, [isOpen, profile]);

  const [isSaved, setIsSaved] = useState(false);

  // Reset isSaved when modal opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setIsSaved(false);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!result || !isOpen) return null;

  // Auspicious types
  const isAuspicious = (type: FengShuiType) => ['生气', '延年', '天医', '伏位'].includes(type);

  // Colors
  const getColor = (type: FengShuiType) => {
    if (isAuspicious(type)) return 'rgba(234, 179, 8, 0.3)'; // Gold/Amber with opacity
    return 'rgba(107, 114, 128, 0.1)'; // Gray/Transparent
  };

  const getTextColor = (type: FengShuiType) => {
    if (isAuspicious(type)) return '#EAB308'; // Gold
    return '#9CA3AF'; // Gray
  };

  // Best direction description
  const getAdvice = (res: FengShuiResult) => {
    const dirName = DIRECTION_LABELS[res.bestDirection];
    return `你的财位在【${dirName}方】，宜摆放绿植或水晶聚气。`;
  };

  const handleSave = () => {
    if (isSaved || !result) return;
    
    useHistoryStore.getState().addEntry({
        type: 'fengshui',
        summary: '办公风水罗盘',
        details: {
            result: getAdvice(result),
            kua: {
                name: result.kuaName,
                group: result.group,
                bestDirection: DIRECTION_LABELS[result.bestDirection]
            }
        }
    });
    setIsSaved(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-md bg-[#0f0f13] border border-yellow-900/30 rounded-2xl p-6 shadow-2xl flex flex-col items-center"
          >
            {/* Header */}
            <div className="w-full flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500">
                办公风水罗盘
              </h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Compass Visualization */}
            <div className="relative w-64 h-64 mb-8">
              {/* Rotating Compass Ring */}
              <motion.div
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="w-full h-full relative"
              >
                <svg viewBox="0 0 300 300" className="w-full h-full">
                  {/* Outer Ring */}
                  <circle cx="150" cy="150" r="148" fill="none" stroke="#EAB308" strokeWidth="2" strokeOpacity="0.3" />
                  <circle cx="150" cy="150" r="140" fill="none" stroke="#EAB308" strokeWidth="1" strokeOpacity="0.2" />
                  
                  {/* Sectors */}
                  {DIRECTIONS.map((dir, index) => {
                    const startAngle = index * 45 - 22.5;
                    const endAngle = startAngle + 45;
                    const type = result.directions[dir];
                    const auspicious = isAuspicious(type);
                    
                    // Calculate label position (radius 120)
                    const labelAngle = index * 45; // Center of sector
                    const labelPos = polarToCartesian(150, 150, 110, labelAngle);
                    const textPos = polarToCartesian(150, 150, 80, labelAngle);

                    return (
                      <g key={dir}>
                        {/* Wedge */}
                        <path
                          d={describeArc(150, 150, 140, startAngle, endAngle)}
                          fill={getColor(type)}
                          stroke="#EAB308"
                          strokeWidth="0.5"
                          strokeOpacity="0.2"
                        />
                        
                        {/* Direction Label (N, NE...) */}
                        <text
                          x={labelPos.x}
                          y={labelPos.y}
                          fill="#EAB308"
                          fontSize="12"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${labelAngle}, ${labelPos.x}, ${labelPos.y})`} // Rotate text to match
                          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                        >
                          {dir}
                        </text>

                        {/* Type Label (吉/凶 or specific type) */}
                        <text
                          x={textPos.x}
                          y={textPos.y}
                          fill={getTextColor(type)}
                          fontSize="10"
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          {auspicious ? '吉' : '凶'}
                        </text>
                      </g>
                    );
                  })}

                  {/* Center Decoration */}
                  <circle cx="150" cy="150" r="40" fill="#1E1E2E" stroke="#EAB308" strokeWidth="2" />
                  <circle cx="150" cy="150" r="35" fill="none" stroke="#EAB308" strokeWidth="1" strokeDasharray="4 2" />
                </svg>

                {/* Center Text (HTML overlay for easier styling) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-lg">{result.kuaName}</div>
                    <div className="text-yellow-500/70 text-xs">{result.group === 'East' ? '东四命' : '西四命'}</div>
                  </div>
                </div>
              </motion.div>
              
              {/* Needle/Pointer Animation (Simulated) */}
              <motion.div
                 className="absolute top-0 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 16 }}
                 transition={{ delay: 1 }}
              />
            </div>

            {/* Info / Advice */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center space-y-4 w-full"
            >
              <div className="space-y-2">
                <p className="text-white font-medium text-lg">
                  {getAdvice(result)}
                </p>
                <p className="text-gray-400 text-sm">
                  命卦算法源自《八宅明镜》，仅供办公布局参考。
                </p>
              </div>
              
              <button 
                onClick={handleSave}
                disabled={isSaved}
                className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl transition-all ${
                  isSaved 
                    ? 'bg-yellow-500/20 text-yellow-500 cursor-default' 
                    : 'bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white'
                }`}
              >
                {isSaved ? (
                    <>
                        <Check size={16} />
                        <span>已保存到历史</span>
                    </>
                ) : (
                    <>
                        <Bookmark size={16} />
                        <span>保存测试结果</span>
                    </>
                )}
              </button>
            </motion.div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
