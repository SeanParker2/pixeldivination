import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import { calculateChart, getLatLong } from '../../lib/astrology';

const ZODIAC_SIGNS = [
  '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'
];

const RADIUS = 160;
const CENTER = 200;

const PLANET_COLORS: Record<string, string> = {
  '太阳': '#fbbf24', // Gold
  '月亮': '#e2e8f0', // Silver
  '火星': '#ef4444', // Red
  '金星': '#f472b6', // Pink
  '水星': '#a8a29e', // Mercury (Grayish)
  '木星': '#fbbf24', // Gold
  '土星': '#fbbf24', // Gold
  '天王星': '#38bdf8', // Sky Blue
  '海王星': '#818cf8', // Indigo
  '冥王星': '#94a3b8', // Slate
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
        <div className="w-full aspect-square flex items-center justify-center text-[#fbbf24] font-pixel animate-pulse">
            CALCULATING...
        </div>
    );
  }

  // Rotation to place ASC at 180 degrees (Left)
  // This sets the initial orientation
  const rotation = 180 + chartData.ascendant;

  // Helper to get coordinates for a given longitude
  const getPos = (longitude: number, r: number) => {
    const rad = (-longitude * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <div className="w-full aspect-square relative flex items-center justify-center mb-5">
      <motion.svg 
        viewBox="0 0 400 400" 
        className="w-[90%] h-[90%]"
        style={{ overflow: 'visible' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
      >
        {/* Decorative Background Circles - Matching Demo */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 30} stroke="#8b5cf6" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS + 25} stroke="#8b5cf6" strokeWidth="4" fill="none" opacity="0.2" strokeDasharray="10 5" />

        {/* Cross Lines - Matching Demo */}
        <line x1={CENTER} y1={CENTER} x2={CENTER} y2="10" stroke="rgba(255,255,255,0.2)" />
        <line x1={CENTER} y1={CENTER} x2="390" y2={CENTER} stroke="rgba(255,255,255,0.2)" />
        <line x1={CENTER} y1={CENTER} x2={CENTER} y2="390" stroke="rgba(255,255,255,0.2)" />
        {/* The line pointing to Left (ASC direction in visualizer) */}
        <line x1={CENTER} y1={CENTER} x2="10" y2={CENTER} stroke="rgba(255,255,255,0.5)" strokeWidth="2" />

        {/* Chart Data Group - Rotated to align ASC to Left initially */}
        <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: 'center' }}>
            {/* Zodiac Ring */}
            {ZODIAC_SIGNS.map((sign, index) => {
                const startAngle = index * 30;
                
                // Label Position
                const midAngle = startAngle + 15;
                const labelPos = getPos(midAngle, RADIUS + 20);
                const linePos = getPos(startAngle, RADIUS);

                return (
                    <g key={sign}>
                        <line 
                            x1={CENTER} y1={CENTER} 
                            x2={linePos.x} y2={linePos.y} 
                            stroke="#2D2D3A" 
                            strokeWidth="1" 
                            opacity="0.3"
                        />
                        <text
                            x={labelPos.x}
                            y={labelPos.y}
                            fill="#94a3b8"
                            fontSize="20"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            style={{ 
                                transform: `rotate(${-rotation}deg)`, 
                                transformBox: 'fill-box', 
                                transformOrigin: 'center' 
                            }}
                        >
                            {sign}
                        </text>
                    </g>
                );
            })}

            {/* House Cusps */}
            {chartData.houses.map((house) => {
                const pos = getPos(house.angle, RADIUS);
                const isAngle = [1, 4, 7, 10].includes(house.id);
                return (
                    <line
                        key={`h-${house.id}`}
                        x1={CENTER} y1={CENTER}
                        x2={pos.x} y2={pos.y}
                        stroke={isAngle ? "#FFFFFF" : "#2D2D3A"}
                        strokeWidth={isAngle ? 2 : 1}
                        opacity={isAngle ? 0.8 : 0.4}
                    />
                );
            })}

            {/* Planets */}
            {chartData.planets.map((planet, i) => {
                const r = RADIUS * 0.7 + (i % 2) * 15; // Stagger slightly
                const pos = getPos(planet.longitude, r);
                const color = PLANET_COLORS[planet.name] || '#fbbf24';
                
                return (
                    <g key={planet.name}>
                        <line 
                            x1={CENTER} y1={CENTER} 
                            x2={pos.x} y2={pos.y} 
                            stroke={color} 
                            strokeWidth="1" 
                            opacity="0.3" 
                        />
                        <circle cx={pos.x} cy={pos.y} r="8" fill={color} />
                        <text
                            x={pos.x}
                            y={pos.y}
                            fill="#000"
                            fontSize="10"
                            fontWeight="bold"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            dy="1"
                            style={{ 
                                transform: `rotate(${-rotation}deg)`, 
                                transformBox: 'fill-box', 
                                transformOrigin: 'center' 
                            }}
                        >
                            {planet.symbol}
                        </text>
                    </g>
                );
            })}
        </g>
      </motion.svg>

      {/* Static ASC Marker */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 text-xs text-white drop-shadow-[0_0_5px_rgba(255,255,255,1)]">
         ASC
      </div>
    </div>
  );
};
