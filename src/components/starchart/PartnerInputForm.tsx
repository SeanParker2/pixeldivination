import React, { useState } from 'react';
import { X } from 'lucide-react';

export interface PartnerData {
  name: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthCity: string;
}

interface PartnerInputFormProps {
  onSubmit: (data: PartnerData) => void;
  onCancel: () => void;
  initialData?: PartnerData | null;
}

export const PartnerInputForm: React.FC<PartnerInputFormProps> = ({ onSubmit, onCancel, initialData }) => {
  const [formData, setFormData] = useState<PartnerData>(initialData || {
    name: '',
    birthDate: '',
    birthTime: '',
    birthCity: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-[#1E1E2E] rounded-2xl p-6 border border-white/10 shadow-xl w-full max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold text-lg">输入伴侣/对方信息</h3>
        <button onClick={onCancel} className="text-gray-400 hover:text-white">
          <X size={20} />
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="space-y-1">
          <label className="text-xs text-gray-400">姓名/昵称</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50"
            placeholder="对方的称呼"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-xs text-gray-400">出生日期</label>
            <input
              type="date"
              required
              value={formData.birthDate}
              onChange={e => setFormData({...formData, birthDate: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs text-gray-400">出生时间</label>
            <input
              type="time"
              required
              value={formData.birthTime}
              onChange={e => setFormData({...formData, birthTime: e.target.value})}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs text-gray-400">出生城市</label>
          <input
            type="text"
            required
            value={formData.birthCity}
            onChange={e => setFormData({...formData, birthCity: e.target.value})}
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-pink-500/50"
            placeholder="例如：上海"
          />
        </div>

        <button
          type="submit"
          className="mt-2 w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-pink-500/20"
        >
          开始合盘分析
        </button>
      </form>
    </div>
  );
};
