import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowLeft, Home, Building, Bed, DoorOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { calculateKua, type Direction, type FengShuiResult } from '../lib/fengshui';
import { useUserStore } from '../stores/useUserStore';
import { useHistoryStore } from '../stores/useHistoryStore';

const DIRECTION_LABELS: Record<Direction, string> = {
  'N': '北',
  'NE': '东北',
  'E': '东',
  'SE': '东南',
  'S': '南',
  'SW': '西南',
  'W': '西',
  'NW': '西北',
};

const TYPE_COLORS: Record<string, string> = {
  '生气': 'text-green-400 bg-green-500/20 border-green-500/30',
  '延年': 'text-blue-400 bg-blue-500/20 border-blue-500/30',
  '天医': 'text-purple-400 bg-purple-500/20 border-purple-500/30',
  '伏位': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
  '五鬼': 'text-red-400 bg-red-500/20 border-red-500/30',
  '六煞': 'text-orange-400 bg-orange-500/20 border-orange-500/30',
  '祸害': 'text-pink-400 bg-pink-500/20 border-pink-500/30',
  '绝命': 'text-gray-400 bg-gray-500/20 border-gray-500/30',
};

const TYPE_DESCRIPTIONS: Record<string, { desc: string; advice: string; icon: React.ReactNode }> = {
  '生气': { 
    desc: '大吉方位，主财运、事业、成功', 
    advice: '适合放置办公桌、收银台、保险柜。此方位宜动不宜静，可摆放绿植或水晶增强能量。',
    icon: <Building size={14} />
  },
  '延年': { 
    desc: '吉方位，主长寿、健康、和谐', 
    advice: '适合卧室、休息区。此方位宜静，可放置床铺或沙发，有助于身心健康。',
    icon: <Bed size={14} />
  },
  '天医': { 
    desc: '吉方位，主健康、贵人、疗愈', 
    advice: '适合卧室、药柜、饮水机。此方位有助于康复和获得贵人相助。',
    icon: <Home size={14} />
  },
  '伏位': { 
    desc: '小吉方位，主稳定、平安', 
    advice: '适合大门、座位、神位。此方位宜保持整洁，可增强家庭稳定。',
    icon: <DoorOpen size={14} />
  },
  '五鬼': { 
    desc: '凶方位，主小人、是非、破财', 
    advice: '避免放置重要物品、办公桌。可放置铜器或蓝色物品化解。',
    icon: null
  },
  '六煞': { 
    desc: '凶方位，主桃花劫、口舌', 
    advice: '避免卧室、书房。可放置陶瓷或黄色物品化解。',
    icon: null
  },
  '祸害': { 
    desc: '凶方位，主疾病、意外', 
    advice: '避免厨房、卧室。可放置铜葫芦或金属物品化解。',
    icon: null
  },
  '绝命': { 
    desc: '大凶方位，主严重灾祸', 
    advice: '务必避免重要活动、床位、办公桌。可放置大叶植物或水养植物化解。',
    icon: null
  },
};

export const FengShui: React.FC = () => {
  const navigate = useNavigate();
  const { profile } = useUserStore();
  const addHistoryEntry = useHistoryStore(state => state.addEntry);
  const [result, setResult] = useState<FengShuiResult | null>(null);
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);

  const handleCalculate = () => {
    if (!profile.birthDate) {
      alert('请先在"我的"页面完善出生信息');
      return;
    }

    const birthYear = new Date(profile.birthDate).getFullYear();
    const kuaResult = calculateKua(birthYear, gender);
    setResult(kuaResult);
    
    // Save to history
    addHistoryEntry({
      type: 'fengshui',
      summary: '风水命卦计算',
      details: {
        kuaNumber: kuaResult.kuaNumber,
        kuaName: kuaResult.kuaName,
        group: kuaResult.group,
        bestDirection: DIRECTION_LABELS[kuaResult.bestDirection]
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#09090b] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-[#09090b]/80 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-white/70 hover:text-white"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-pixel text-[#fbbf24]">风水命卦</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="px-4 pt-6 space-y-6">
        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-5"
        >
          <h2 className="text-lg font-pixel text-white mb-2">计算你的命卦</h2>
          <p className="text-xs text-gray-400 mb-4">命卦源自《八宅明镜》，用于判断个人与方位的吉凶关系</p>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">性别</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    gender === 'male'
                      ? 'border-[#fbbf24] bg-[#fbbf24]/10 text-[#fbbf24]'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  男
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-2 rounded-lg border transition-colors ${
                    gender === 'female'
                      ? 'border-[#ec4899] bg-[#ec4899]/10 text-[#ec4899]'
                      : 'border-white/10 text-gray-400'
                  }`}
                >
                  女
                </button>
              </div>
            </div>

            <button
              onClick={handleCalculate}
              className="w-full py-3 bg-[#fbbf24] text-black font-bold rounded-lg hover:bg-[#facc15] transition-colors"
            >
              开始计算
            </button>
          </div>
        </motion.div>

        {/* Result Section */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {/* Kua Info */}
            <div className="glass-card p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#fbbf24]/20 flex items-center justify-center">
                  <Compass className="text-[#fbbf24]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-pixel text-white">{result.kuaName}</h3>
                  <p className="text-sm text-gray-400">
                    {result.group === 'East' ? '东四命' : '西四命'} · 命卦数 {result.kuaNumber}
                  </p>
                </div>
              </div>
              
              <div className="p-3 bg-[#fbbf24]/10 rounded-lg border border-[#fbbf24]/30">
                <p className="text-sm text-[#fbbf24]">
                  最佳方位：<span className="font-bold text-lg">{DIRECTION_LABELS[result.bestDirection]}</span>
                </p>
                <p className="text-xs text-[#fbbf24]/70 mt-1">
                  {TYPE_DESCRIPTIONS[result.directions[result.bestDirection]]?.advice}
                </p>
              </div>
            </div>

            {/* Direction Grid */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-pixel text-white mb-4">八方位吉凶</h3>
              <p className="text-xs text-gray-400 mb-3">点击方位查看详细解读</p>
              
              <div className="grid grid-cols-3 gap-2">
                {/* Top row */}
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {(['NW', 'N', 'NE'] as Direction[]).map(dir => (
                    <DirectionCard
                      key={dir}
                      direction={dir}
                      type={result.directions[dir]}
                      isSelected={selectedDirection === dir}
                      onClick={() => setSelectedDirection(dir)}
                    />
                  ))}
                </div>
                
                {/* Middle row */}
                <DirectionCard 
                  direction="W" 
                  type={result.directions['W']} 
                  isSelected={selectedDirection === 'W'}
                  onClick={() => setSelectedDirection('W')}
                />
                <div className="flex items-center justify-center p-4 bg-purple-500/20 rounded-lg border border-purple-500/30">
                  <div className="text-center">
                    <Compass className="text-purple-400 mx-auto" size={20} />
                    <span className="text-[10px] text-purple-400 mt-1 block">命卦</span>
                  </div>
                </div>
                <DirectionCard 
                  direction="E" 
                  type={result.directions['E']} 
                  isSelected={selectedDirection === 'E'}
                  onClick={() => setSelectedDirection('E')}
                />
                
                {/* Bottom row */}
                <div className="col-span-3 grid grid-cols-3 gap-2">
                  {(['SW', 'S', 'SE'] as Direction[]).map(dir => (
                    <DirectionCard
                      key={dir}
                      direction={dir}
                      type={result.directions[dir]}
                      isSelected={selectedDirection === dir}
                      onClick={() => setSelectedDirection(dir)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Direction Detail */}
            <AnimatePresence>
              {selectedDirection && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="glass-card p-5 overflow-hidden"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-pixel text-white">
                      {DIRECTION_LABELS[selectedDirection]}方 · {result.directions[selectedDirection]}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs ${TYPE_COLORS[result.directions[selectedDirection]]}`}>
                      {['生气', '延年', '天医', '伏位'].includes(result.directions[selectedDirection]) ? '吉' : '凶'}
                    </span>
                  </div>
                  
                  <p className="text-sm text-gray-300 mb-2">
                    {TYPE_DESCRIPTIONS[result.directions[selectedDirection]]?.desc}
                  </p>
                  <p className="text-xs text-gray-400">
                    {TYPE_DESCRIPTIONS[result.directions[selectedDirection]]?.advice}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Legend */}
            <div className="glass-card p-5">
              <h3 className="text-lg font-pixel text-white mb-3">方位含义</h3>
              <div className="space-y-3">
                {Object.entries(TYPE_DESCRIPTIONS).map(([type, data]) => (
                  <div key={type} className="flex items-start gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs ${TYPE_COLORS[type]}`}>
                      {type}
                    </span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-300">{data.desc}</p>
                      <p className="text-[10px] text-gray-500 mt-0.5">{data.advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Disclaimer */}
            <div className="text-center text-[10px] text-gray-500 pb-4">
              命卦算法源自《八宅明镜》，仅供办公家居布局参考
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const DirectionCard: React.FC<{ 
  direction: Direction; 
  type: string; 
  isSelected?: boolean;
  onClick?: () => void;
}> = ({ direction, type, isSelected, onClick }) => {
  const isAuspicious = ['生气', '延年', '天医', '伏位'].includes(type);
  
  return (
    <button 
      onClick={onClick}
      className={`p-3 rounded-lg border text-center transition-all ${
        isSelected ? 'ring-2 ring-[#fbbf24] scale-105' : ''
      } ${TYPE_COLORS[type]}`}
    >
      <div className="text-xs opacity-70">{DIRECTION_LABELS[direction]}</div>
      <div className="text-sm font-medium mt-1">{type}</div>
      <div className="text-xs mt-1">{isAuspicious ? '✓ 吉' : '✗ 凶'}</div>
    </button>
  );
};

export default FengShui;
