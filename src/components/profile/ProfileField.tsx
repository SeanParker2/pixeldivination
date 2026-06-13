import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ProfileFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onClick?: () => void;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({ 
  label, 
  value, 
  placeholder = '请选择', 
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        flex items-center justify-between py-4 border-b border-white/5
        ${onClick ? 'cursor-pointer active:bg-white/5 transition-colors' : ''}
      `}
    >
      <span className="text-gray-400 text-sm font-pixel">{label}</span>
      
      <div className="flex items-center gap-2">
        <span className={`text-sm font-medium ${value ? 'text-white' : 'text-gray-600'}`}>
          {value || placeholder}
        </span>
        {onClick && <ChevronRight size={16} className="text-gray-500" />}
      </div>
    </div>
  );
};
