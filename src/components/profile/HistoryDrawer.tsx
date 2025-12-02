import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Trash2, Scroll, Sparkles, ChevronDown, ChevronUp, LayoutGrid, Dices, Heart, Compass, MoonStar, Lightbulb, Wind } from 'lucide-react';
import { useHistoryStore } from '../../stores/useHistoryStore';
import Markdown from 'react-markdown';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose }) => {
  const { history, removeEntry, clearHistory } = useHistoryStore();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'tarot': return { color: 'bg-purple-500/20 text-purple-400', icon: Scroll, label: '塔罗占卜' };
      case 'natal-chart':
      case 'starchart': return { color: 'bg-orange-500/20 text-orange-400', icon: Sparkles, label: '本命盘解读' };
      case 'lenormand': return { color: 'bg-cyan-500/20 text-cyan-400', icon: LayoutGrid, label: '雷诺曼指引' };
      case 'dice': return { color: 'bg-pink-500/20 text-pink-400', icon: Dices, label: '星象骰子' };
      case 'synastry': return { color: 'bg-rose-500/20 text-rose-400', icon: Heart, label: '双人合盘' };
      case 'transit': return { color: 'bg-blue-500/20 text-blue-400', icon: Compass, label: '行运盘推运' };
      case 'sky': return { color: 'bg-indigo-500/20 text-indigo-400', icon: MoonStar, label: '天象盘解读' };
      case 'insight': return { color: 'bg-yellow-500/20 text-yellow-400', icon: Lightbulb, label: '每日灵感' };
      case 'fengshui': return { color: 'bg-emerald-500/20 text-emerald-400', icon: Wind, label: '风水罗盘' };
      default: return { color: 'bg-gray-500/20 text-gray-400', icon: Sparkles, label: '未知记录' };
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[#1E1E2E] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Clock className="text-pixel-gold" size={20} />
                <h2 className="text-white font-bold text-lg">占卜历史</h2>
              </div>
              <div className="flex items-center gap-2">
                {history.length > 0 && (
                    <button 
                        onClick={() => {
                            if (confirm('确定要清空所有历史记录吗？')) {
                                clearHistory();
                            }
                        }}
                        className="text-xs text-gray-500 hover:text-red-400 transition-colors px-2"
                    >
                        清空
                    </button>
                )}
                <button 
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                >
                    <X size={20} />
                </button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {history.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <Scroll size={48} strokeWidth={1} />
                  <p>暂无历史记录</p>
                </div>
              ) : (
                history.map((item) => {
                  const { color, icon: Icon, label } = getTypeStyles(item.type);
                  return (
                    <div key={item.id} className="bg-white/5 rounded-xl border border-white/5 overflow-hidden">
                      <div 
                          onClick={() => toggleExpand(item.id)}
                          className="p-4 flex items-start gap-3 cursor-pointer hover:bg-white/5 transition-colors"
                      >
                          <div className={`p-2 rounded-lg ${color}`}>
                              <Icon size={20} />
                          </div>
                          <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start">
                                  <h3 className="text-white font-medium text-sm line-clamp-1 pr-2">{item.summary}</h3>
                                  <span className="text-xs text-gray-500 shrink-0">{formatDate(item.date)}</span>
                              </div>
                              <p className="text-xs text-gray-400 mt-1">
                                  {label}
                              </p>
                          </div>
                          <div className="text-gray-500">
                              {expandedId === item.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                      </div>

                      <AnimatePresence>
                          {expandedId === item.id && (
                              <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  className="border-t border-white/10 bg-black/20"
                              >
                                  <div className="p-4 prose prose-invert prose-sm max-w-none prose-p:text-gray-300 prose-headings:text-gray-200">
                                      <Markdown>{item.details?.result || item.details?.report || ''}</Markdown>
                                  </div>
                                  <div className="flex justify-end p-2 border-t border-white/5">
                                      <button 
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              removeEntry(item.id);
                                          }}
                                          className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded hover:bg-red-400/10 transition-colors"
                                      >
                                          <Trash2 size={14} />
                                          删除记录
                                      </button>
                                  </div>
                              </motion.div>
                          )}
                      </AnimatePresence>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
