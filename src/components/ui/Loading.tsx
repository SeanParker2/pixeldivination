import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: 'w-4 h-4',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text,
  fullScreen = false 
}) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-3">
      <Loader2 className={`animate-spin text-[#fbbf24] ${sizeMap[size]}`} />
      {text && (
        <span className="text-sm text-gray-400 animate-pulse font-pixel">
          {text}
        </span>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
        {content}
      </div>
    );
  }

  return (
    <div className="min-h-[200px] flex items-center justify-center">
      {content}
    </div>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const EmptyState: React.FC<EmptyStateProps> = ({ 
  icon, 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="glass-card p-8 text-center">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-white font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-gray-400 text-sm mb-4">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2 bg-[#fbbf24] text-black rounded-lg font-medium hover:bg-[#facc15] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
};
