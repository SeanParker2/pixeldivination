import React from 'react';
import { motion } from 'framer-motion';

interface NeonBorderProps {
  children: React.ReactNode;
  color?: 'gold' | 'purple' | 'pink' | 'blue';
  className?: string;
  animate?: boolean;
}

const colorMap = {
  gold: {
    border: 'border-yellow-500/30',
    shadow: 'shadow-yellow-500/20',
    glow: 'rgba(234, 179, 8, 0.3)',
    text: 'text-yellow-500',
  },
  purple: {
    border: 'border-purple-500/30',
    shadow: 'shadow-purple-500/20',
    glow: 'rgba(168, 85, 247, 0.3)',
    text: 'text-purple-500',
  },
  pink: {
    border: 'border-pink-500/30',
    shadow: 'shadow-pink-500/20',
    glow: 'rgba(236, 72, 153, 0.3)',
    text: 'text-pink-500',
  },
  blue: {
    border: 'border-blue-500/30',
    shadow: 'shadow-blue-500/20',
    glow: 'rgba(59, 130, 246, 0.3)',
    text: 'text-blue-500',
  },
};

export const NeonBorder: React.FC<NeonBorderProps> = ({ 
  children, 
  color = 'gold', 
  className = '',
  animate = false 
}) => {
  const colors = colorMap[color];

  return (
    <motion.div
      className={`relative ${className}`}
      animate={animate ? {
        boxShadow: [
          `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
          `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}`,
          `0 0 5px ${colors.glow}, 0 0 10px ${colors.glow}`,
        ],
      } : undefined}
      transition={animate ? {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      } : undefined}
    >
      {children}
    </motion.div>
  );
};

interface GlowTextProps {
  children: React.ReactNode;
  color?: 'gold' | 'purple' | 'pink' | 'blue';
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
}

export const GlowText: React.FC<GlowTextProps> = ({ 
  children, 
  color = 'gold', 
  className = '',
  intensity = 'medium'
}) => {
  const glowIntensity = {
    low: '0 0 5px',
    medium: '0 0 10px',
    high: '0 0 20px',
  };

  const colors = colorMap[color];
  const shadow = `${glowIntensity[intensity]} ${colors.glow}`;

  return (
    <span 
      className={`${colors.text} ${className}`}
      style={{ textShadow: shadow }}
    >
      {children}
    </span>
  );
};

interface PulseDotProps {
  color?: 'gold' | 'purple' | 'pink' | 'blue';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export const PulseDot: React.FC<PulseDotProps> = ({ 
  color = 'gold', 
  size = 'md',
  className = '' 
}) => {
  const colors = colorMap[color];

  return (
    <div className={`relative ${className}`}>
      <div className={`${sizeMap[size]} rounded-full ${colors.text} bg-current`} />
      <motion.div
        className={`absolute inset-0 ${sizeMap[size]} rounded-full ${colors.text} bg-current`}
        animate={{
          scale: [1, 2, 1],
          opacity: [1, 0, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

interface ScanlineOverlayProps {
  className?: string;
  opacity?: number;
}

export const ScanlineOverlay: React.FC<ScanlineOverlayProps> = ({ 
  className = '',
  opacity = 0.1 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-50 ${className}`}
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          rgba(0, 0, 0, ${opacity}) 2px,
          rgba(0, 0, 0, ${opacity}) 4px
        )`,
      }}
    />
  );
};

interface VignetteOverlayProps {
  className?: string;
  intensity?: number;
}

export const VignetteOverlay: React.FC<VignetteOverlayProps> = ({ 
  className = '',
  intensity = 0.5 
}) => {
  return (
    <div 
      className={`fixed inset-0 pointer-events-none z-40 ${className}`}
      style={{
        background: `radial-gradient(ellipse at center, transparent 50%, rgba(0, 0, 0, ${intensity}) 100%)`,
      }}
    />
  );
};
