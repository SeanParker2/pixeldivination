import React, { useState, useEffect } from 'react';
import { BottomSheet } from './BottomSheet';

interface DatePickerProps {
  isOpen: boolean;
  onClose: () => void;
  initialDate: string; // ISO string
  onSelect: (date: string) => void;
}

// Generate ranges
const YEARS = Array.from({ length: 81 }, (_, i) => 1950 + i);
const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
// const DAYS = Array.from({ length: 31 }, (_, i) => i + 1); // Unused
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const MINUTES = Array.from({ length: 60 }, (_, i) => i);

export const DatePicker: React.FC<DatePickerProps> = ({ 
  isOpen, 
  onClose, 
  initialDate, 
  onSelect 
}) => {
  const date = new Date(initialDate);
  
  const [selected, setSelected] = useState({
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  });

  // Sync internal state when initialDate changes
  useEffect(() => {
    if (isOpen) {
      const d = new Date(initialDate);
      setSelected({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        hour: d.getHours(),
        minute: d.getMinutes(),
      });
    }
  }, [isOpen, initialDate]);

  const handleConfirm = () => {
    // Reconstruct ISO string
    const newDate = new Date(
      selected.year, 
      selected.month - 1, 
      selected.day, 
      selected.hour, 
      selected.minute
    );
    onSelect(newDate.toISOString());
    onClose();
  };

  // Basic max day check (simplified for MVP)
  const maxDays = new Date(selected.year, selected.month, 0).getDate();
  const currentDays = Array.from({ length: maxDays }, (_, i) => i + 1);

  return (
    <BottomSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      onConfirm={handleConfirm}
      title="选择出生时间"
    >
      <div className="flex h-48 relative">
        {/* Selection Highlight Bar */}
        <div className="absolute top-1/2 left-0 right-0 h-10 -mt-5 bg-white/10 rounded-lg pointer-events-none" />

        <PickerColumn 
          items={YEARS} 
          value={selected.year} 
          onChange={(v) => setSelected(s => ({ ...s, year: v }))} 
          label="年"
        />
        <PickerColumn 
          items={MONTHS} 
          value={selected.month} 
          onChange={(v) => setSelected(s => ({ ...s, month: v }))} 
          label="月"
        />
        <PickerColumn 
          items={currentDays} 
          value={selected.day > maxDays ? maxDays : selected.day} 
          onChange={(v) => setSelected(s => ({ ...s, day: v }))} 
          label="日"
        />
        <PickerColumn 
          items={HOURS} 
          value={selected.hour} 
          onChange={(v) => setSelected(s => ({ ...s, hour: v }))} 
          label="时"
        />
        <PickerColumn 
          items={MINUTES} 
          value={selected.minute} 
          onChange={(v) => setSelected(s => ({ ...s, minute: v }))} 
          label="分"
        />
      </div>
    </BottomSheet>
  );
};

const PickerColumn = ({ items, value, onChange }: {
  items: number[] | string[];
  value: number | string;
  onChange: (val: any) => void;
  label?: string; // Optional but unused in render
}) => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide snap-y snap-mandatory py-20 text-center relative group">
      {items.map(item => (
        <div 
          key={item}
          onClick={() => onChange(item)}
          className={`
            h-10 leading-10 snap-center cursor-pointer transition-all
            ${item === value ? 'text-white font-bold text-lg' : 'text-gray-600 text-sm'}
          `}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
