import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  count?: number;
}

const shimmerAnimation = {
  initial: { backgroundPosition: '-200% 0' },
  animate: { 
    backgroundPosition: '200% 0',
    transition: {
      duration: 1.5,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

export const Skeleton: React.FC<SkeletonProps> = ({ 
  className = '', 
  variant = 'text',
  width,
  height,
  count = 1,
}) => {
  const baseClasses = "bg-gradient-to-r from-white/5 via-white/10 to-white/5 bg-[length:200%_100%]";
  
  const variantClasses = {
    text: 'rounded h-4',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  const style = {
    width: width || (variant === 'circular' ? 40 : '100%'),
    height: height || (variant === 'text' ? 16 : variant === 'circular' ? 40 : 100),
  };

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          {...shimmerAnimation}
          className={`${baseClasses} ${variantClasses[variant]} ${className}`}
          style={style}
        />
      ))}
    </>
  );
};

// Pre-built skeleton layouts
export const CardSkeleton: React.FC = () => (
  <div className="glass-card p-4 space-y-3">
    <div className="flex items-center gap-3">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1 space-y-2">
        <Skeleton width="60%" />
        <Skeleton width="40%" height={12} />
      </div>
    </div>
    <Skeleton variant="rectangular" height={80} />
    <div className="flex gap-2">
      <Skeleton width={60} height={24} className="rounded-full" />
      <Skeleton width={60} height={24} className="rounded-full" />
    </div>
  </div>
);

export const ListSkeleton: React.FC<{ count?: number }> = ({ count = 3 }) => (
  <div className="space-y-3">
    {Array.from({ length: count }).map((_, i) => (
      <CardSkeleton key={i} />
    ))}
  </div>
);

export const StatSkeleton: React.FC = () => (
  <div className="glass-card p-4 space-y-4">
    <Skeleton width="40%" height={20} />
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <div className="flex justify-between">
            <Skeleton width={40} height={12} />
            <Skeleton width={30} height={12} />
          </div>
          <Skeleton variant="rectangular" height={6} />
        </div>
      ))}
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-4">
      <Skeleton variant="circular" width={64} height={64} />
      <div className="flex-1 space-y-2">
        <Skeleton width="50%" height={24} />
        <Skeleton width="30%" />
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="glass-card p-3 text-center space-y-2">
          <Skeleton width={40} height={24} className="mx-auto" />
          <Skeleton width={60} height={12} className="mx-auto" />
        </div>
      ))}
    </div>
  </div>
);
