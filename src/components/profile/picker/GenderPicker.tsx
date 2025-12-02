import React from 'react';
import { BottomSheet } from './BottomSheet';

interface GenderPickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: 'male' | 'female' | 'other';
  onConfirm: (val: 'male' | 'female' | 'other') => void;
}

export const GenderPicker: React.FC<GenderPickerProps> = ({
  isOpen,
  onClose,
  initialValue,
  onConfirm
}) => {
  const [selected, setSelected] = React.useState(initialValue);

  React.useEffect(() => {
    if (isOpen) setSelected(initialValue);
  }, [isOpen, initialValue]);

  const handleConfirm = () => {
    onConfirm(selected);
    onClose();
  };

  return (
    <BottomSheet
      isOpen={isOpen}
      onClose={onClose}
      onConfirm={handleConfirm}
      title="选择性别"
    >
      <div className="flex flex-col gap-2 py-4">
        <GenderOption 
          label="男性" 
          value="male" 
          selected={selected === 'male'} 
          onClick={() => setSelected('male')} 
        />
        <GenderOption 
          label="女性" 
          value="female" 
          selected={selected === 'female'} 
          onClick={() => setSelected('female')} 
        />
        <GenderOption 
          label="保密" 
          value="other" 
          selected={selected === 'other'} 
          onClick={() => setSelected('other')} 
        />
      </div>
    </BottomSheet>
  );
};

const GenderOption = ({ label, selected, onClick }: any) => (
  <button
    onClick={onClick}
    className={`
      w-full py-3 rounded-xl text-sm font-medium transition-colors
      ${selected 
        ? 'bg-pixel-gold text-black font-bold' 
        : 'bg-white/5 text-gray-400 hover:bg-white/10'}
    `}
  >
    {label}
  </button>
);
