import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/useUserStore';
import { calculateChart, getLatLong, type AstrologyData } from '../../lib/astrology';

const ZODIAC_SIGNS = [
  '♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'
];

const RADIUS = 160;
const CENTER = 200;

interface AstrologyWheelProps {
  date?: Date;
  location?: string;
}

export const AstrologyWheel: React.FC<AstrologyWheelProps> = ({ date: propDate, location: propLocation }) => {
  const { profile } = useUserStore();
  const [chartData, setChartData] = useState<AstrologyData | null>(null);

  useEffect(() => {
    const targetDate = propDate || (profile?.birthDate ? new Date(profile.birthDate) : null);
    
    const targetLocation = propLocation || (
      profile?.birthLocation 
        ? (typeof profile.birthLocation === 'string' ? profile.birthLocation : (profile.birthLocation as any).city)
        : null
    );

    if (targetDate && targetLocation) {
      const city = targetLocation || '北京';
      const coords = getLatLong(city);
      const data = calculateChart(targetDate, coords);
      setChartData(data);
    }
  }, [profile, propDate, propLocation]);

  if (!chartData) {
    return (
        <div className="w-full aspect-square flex items-center justify-center text-pixel-gold font-pixel animate-pulse">
            CALCULATING...
        </div>
    );
  }

  // Rotation to place ASC at 180 degrees (Left)
  // SVG Angle for Longitude L is -L (to make it CCW)
  // We want -ASC + Rotation = 180
  // Rotation = 180 + ASC
  const rotation = 180 + chartData.ascendant;

  // Helper to get coordinates for a given longitude
  const getPos = (longitude: number, r: number) => {
    // SVG Angle = -Longitude (CCW)
    const rad = (-longitude * Math.PI) / 180;
    return {
      x: CENTER + r * Math.cos(rad),
      y: CENTER + r * Math.sin(rad),
    };
  };

  return (
    <div className="w-full aspect-square relative">
      <svg 
        viewBox="0 0 400 400" 
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Decorative Background Circles */}
        <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#2D2D3A" strokeWidth="1" fill="none" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.85} stroke="#2D2D3A" strokeWidth="1" fill="none" opacity="0.5" />
        <circle cx={CENTER} cy={CENTER} r={RADIUS * 0.4} stroke="#2D2D3A" strokeWidth="1" fill="none" opacity="0.3" />

        {/* Rotating Group */}
        <motion.g
            initial={{ rotate: rotation - 30, opacity: 0 }}
            animate={{ rotate: rotation, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ originX: "200px", originY: "200px" }}
        >
            {/* Zodiac Ring */}
            {ZODIAC_SIGNS.map((sign, index) => {
                const startAngle = index * 30;
                
                // Label Position (middle of sign)
                const midAngle = startAngle + 15;
                const labelPos = getPos(midAngle, RADIUS + 20);
                const linePos = getPos(startAngle, RADIUS);

                return (
                    <g key={sign}>
                        {/* Divider Line */}
                        <line 
                            x1={CENTER} y1={CENTER} 
                            x2={linePos.x} y2={linePos.y} 
                            stroke="#2D2D3A" 
                            strokeWidth="1" 
                            opacity="0.3"
                        />
                        {/* Sign Label */}
                        {/* We need to counter-rotate text so it stays upright? Or let it rotate?
                            Usually chart text rotates with the chart or is upright.
                            For MVP, let it rotate with the wheel is easier, but upright is readable.
                            To make it upright: rotate text by -rotation around its own center.
                        */}
                        <text
                            x={labelPos.x}
                            y={labelPos.y}
                            fill="#A1A1AA"
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
                // Simple collision avoidance (very basic): just push radius out if crowded?
                // For now, standard radius.
                const r = RADIUS * 0.7 + (i % 2) * 15; // Stagger slightly
                const pos = getPos(planet.longitude, r);
                
                return (
                    <g key={planet.name}>
                        <line 
                            x1={CENTER} y1={CENTER} 
                            x2={pos.x} y2={pos.y} 
                            stroke="#FFD700" 
                            strokeWidth="1" 
                            opacity="0.1" 
                        />
                        <circle cx={pos.x} cy={pos.y} r="12" fill="#1E1E2E" stroke="#FFD700" strokeWidth="1" />
                        <text
                            x={pos.x}
                            y={pos.y}
                            fill="#FFD700"
                            fontSize="14"
                            textAnchor="middle"
                            dominantBaseline="middle"
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
        </motion.g>

        {/* Static Overlay (optional, e.g., center point) */}
        <circle cx={CENTER} cy={CENTER} r="4" fill="#FFFFFF" />
        
        {/* ASC/MC Markers (Static relative to screen? No, they are specific degrees on the wheel) */}
        {/* Since we rotated the wheel so ASC is at 180 (Left), we can draw a static marker at Left to indicate ASC */}
        <text x="20" y={CENTER} fill="#FFFFFF" fontSize="12" fontWeight="bold" dominantBaseline="middle">ASC</text>
        
      </svg>
    </div>
  );
};
