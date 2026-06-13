import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import { calculateChart, getLatLong } from '../../lib/astrology';

const ZODIAC_SIGNS = [
  { symbol: '♈', name: '白羊', color: '#ef4444' },
  { symbol: '♉', name: '金牛', color: '#22c55e' },
  { symbol: '♊', name: '双子', color: '#eab308' },
  { symbol: '♋', name: '巨蟹', color: '#e2e8f0' },
  { symbol: '♌', name: '狮子', color: '#f97316' },
  { symbol: '♍', name: '处女', color: '#a855f7' },
  { symbol: '♎', name: '天秤', color: '#ec4899' },
  { symbol: '♏', name: '天蝎', color: '#991b1b' },
  { symbol: '♐', name: '射手', color: '#7c3aed' },
  { symbol: '♑', name: '摩羯', color: '#78716c' },
  { symbol: '♒', name: '水瓶', color: '#06b6d4' },
  { symbol: '♓', name: '双鱼', color: '#818cf8' },
];

const RADIUS = 150;
const CENTER = 190;

const PLANET_COLORS: Record<string, string> = {
  '太阳': '#fbbf24',
  '月亮': '#e2e8f0',
  '火星': '#ef4444',
  '金星': '#f472b6',
  '水星': '#a8a29e',
  '木星': '#a855f7',
  '土星': '#78716c',
  '天王星': '#38bdf8',
  '海王星': '#818cf8',
  '冥王星': '#94a3b8',
};

const PLANET_SYMBOLS: Record<string, string> = {
  '太阳': '☉',
  '月亮': '☽',
  '火星': '♂',
  '金星': '♀',
  '水星': '☿',
  '木星': '♃',
  '土星': '♄',
  '天王星': '♅',
  '海王星': '♆',
  '冥王星': '♇',
};

interface AstrologyWheelProps {
  date?: Date;
  location?: string;
}

export const AstrologyWheel: React.FC<AstrologyWheelProps> = ({ date: propDate, location: propLocation }) => {
  const { profile } = useUserStore();

  const chartData = useMemo(() => {
    const targetDate = propDate || (profile?.birthDate ? new Date(profile.birthDate) : null);
    const targetLocation = propLocation || (
      profile?.birthLocation 
        ? (typeof profile.birthLocation === 'string' ? profile.birthLocation : profile.birthLocation.city)
        : null
    );

    if (targetDate && targetLocation) {
      const city = targetLocation || '北京';
      const coords = getLatLong(city);
      return calculateChart(targetDate, coords);
    }
    return null;
  }, [profile, propDate, propLocation]);

  if (!chartData) {
    return (
      <div className="w-full aspect-square flex flex-col items-center justify-center gap-4">
        <motion.div
          className="w-16 h-16 border-2 border-yellow-500/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <div className="w-full h-full border-t-2 border-yellow-500 rounded-full" />
        </motion.div>
        <span className="text-yellow-500/60 text-sm font-pixel animate-pulse">
          正在计算星盘...
        </span>
      </div>
    );
  }

  const rotation = 180 + chartData.ascendant;

  const getPos = (longitude: number, r: number) => {
    const rad = (-longitude * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <div className="w-full aspect-square relative flex items-center justify-center">
      {/* 外层光晕 */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      <motion.svg 
        viewBox="0 0 380 380" 
        className="w-[95%] h-[95%] relative z-10"
        style={{ overflow: 'visible' }}
      >
        {/* 背景装饰圆环 */}
        <defs>
          <radialGradient id="wheelGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.1)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 35} fill="url(#wheelGlow)" />
        
        {/* 外圈装饰 */}
        <motion.circle 
          cx={CENTER} cy={CENTER} r={RADIUS + 30} 
          stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.3"
          animate={{ strokeDashoffset: [0, 100] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          strokeDasharray="5 3"
        />
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 25} stroke="#fbbf24" strokeWidth="0.5" fill="none" opacity="0.2" />
        
        {/* 中心发光点 */}
        <motion.circle 
          cx={CENTER} cy={CENTER} r="4" 
          fill="#fbbf24" 
          filter="url(#glow)"
          animate={{ opacity: [0.5, 1, 0.5], r: [3, 5, 3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* 十字线 */}
        <line x1={CENTER} y1={CENTER} x2={CENTER} y2={CENTER - RADIUS - 20} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1={CENTER} y1={CENTER} x2={CENTER + RADIUS + 20} y2={CENTER} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1={CENTER} y1={CENTER} x2={CENTER} y2={CENTER + RADIUS + 20} stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        <line x1={CENTER} y1={CENTER} x2={CENTER - RADIUS - 20} y2={CENTER} stroke="rgba(255,255,255,0.3)" strokeWidth="1" />

        {/* 星盘数据组 - 旋转 */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}>
          {/* 星座环 */}
          {ZODIAC_SIGNS.map((sign, index) => {
            const startAngle = index * 30;
            const midAngle = startAngle + 15;
            const labelPos = getPos(midAngle, RADIUS + 18);
            const linePos1 = getPos(startAngle, RADIUS - 5);
            const linePos2 = getPos(startAngle, RADIUS + 25);

            return (
              <g key={sign.symbol}>
                {/* 分隔线 */}
                <line 
                  x1={linePos1.x} y1={linePos1.y}
                  x2={linePos2.x} y2={linePos2.y}
                  stroke={sign.color} 
                  strokeWidth="0.5" 
                  opacity="0.3"
                />
                
                {/* 星座符号 */}
                <text
                  x={labelPos.x}
                  y={labelPos.y}
                  fill={sign.color}
                  fontSize="18"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  style={{ 
                    transform: `rotate(${-rotation}deg)`, 
                    transformBox: 'fill-box', 
                    transformOrigin: 'center',
                    filter: `drop-shadow(0 0 3px ${sign.color}40)`,
                  }}
                >
                  {sign.symbol}
                </text>
              </g>
            );
          })}

          {/* 宫位线 */}
          {chartData.houses.map((house) => {
            const pos = getPos(house.angle, RADIUS);
            const isAngle = [1, 4, 7, 10].includes(house.id);
            return (
              <line
                key={`h-${house.id}`}
                x1={CENTER} y1={CENTER}
                x2={pos.x} y2={pos.y}
                stroke={isAngle ? "#fbbf24" : "#2D2D3A"}
                strokeWidth={isAngle ? 1.5 : 0.5}
                opacity={isAngle ? 0.6 : 0.3}
              />
            );
          })}

          {/* 行星 */}
          {chartData.planets.map((planet, i) => {
            const r = RADIUS * 0.65 + (i % 3) * 12;
            const pos = getPos(planet.longitude, r);
            const color = PLANET_COLORS[planet.name] || '#fbbf24';
            const symbol = PLANET_SYMBOLS[planet.name] || planet.symbol;
            
            return (
              <g key={planet.name}>
                {/* 连接线 */}
                <line 
                  x1={CENTER} y1={CENTER} 
                  x2={pos.x} y2={pos.y} 
                  stroke={color} 
                  strokeWidth="0.5" 
                  opacity="0.2" 
                />
                
                {/* 行星光晕 */}
                <circle cx={pos.x} cy={pos.y} r="12" fill={color} opacity="0.1" />
                
                {/* 行星圆点 */}
                <circle cx={pos.x} cy={pos.y} r="8" fill="#0a0a1a" stroke={color} strokeWidth="1.5" />
                
                {/* 行星符号 */}
                <text
                  x={pos.x}
                  y={pos.y}
                  fill={color}
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  dy="1"
                  style={{ 
                    transform: `rotate(${-rotation}deg)`, 
                    transformBox: 'fill-box', 
                    transformOrigin: 'center',
                    filter: `drop-shadow(0 0 3px ${color})`,
                  }}
                >
                  {symbol}
                </text>
              </g>
            );
          })}
        </g>

        {/* ASC标记 */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}>
          <polygon 
            points={`${CENTER - RADIUS - 25},${CENTER} ${CENTER - RADIUS - 15},${CENTER - 5} ${CENTER - RADIUS - 15},${CENTER + 5}`}
            fill="#fbbf24" 
            opacity="0.8"
          />
        </g>
      </motion.svg>

      {/* ASC标签 */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <span className="text-yellow-500 text-xs font-pixel drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]">
          ASC
        </span>
      </div>
      
      {/* MC标签 */}
      <div className="absolute left-1/2 -translate-x-1/2 top-2 flex items-center gap-1">
        <span className="text-yellow-500/60 text-[10px] font-pixel">
          MC
        </span>
      </div>
    </div>
  );
};
