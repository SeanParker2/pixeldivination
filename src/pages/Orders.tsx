import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, ArrowLeft, Clock, CheckCircle, XCircle, RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { shopService } from '../services/shopService';

interface Order {
  id: string;
  orderType: string;
  productId: string;
  productName: string;
  amount: number;
  status: string;
  paymentMethod: string;
  paidAt?: string;
  createdAt: string;
}

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
  pending: { label: '待支付', color: 'text-yellow-400', bg: 'bg-yellow-500/20 border-yellow-500/30', icon: <Clock size={14} /> },
  paid: { label: '已支付', color: 'text-green-400', bg: 'bg-green-500/20 border-green-500/30', icon: <CheckCircle size={14} /> },
  failed: { label: '支付失败', color: 'text-red-400', bg: 'bg-red-500/20 border-red-500/30', icon: <XCircle size={14} /> },
  refunded: { label: '已退款', color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30', icon: <RefreshCw size={14} /> },
  cancelled: { label: '已取消', color: 'text-gray-400', bg: 'bg-gray-500/20 border-gray-500/30', icon: <XCircle size={14} /> },
};

const ORDER_TYPE_LABELS: Record<string, string> = {
  subscription: '订阅服务',
  reading: 'AI解读',
  crystal: '水晶饰品',
  tarot_deck: '塔罗牌',
  audio: '音频课程',
};

export const Orders: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await shopService.getOrders(page, 20);
      setOrders(result.items);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
      setError('获取订单失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusTimeline = (order: Order) => {
    const timeline = [
      { label: '创建订单', time: order.createdAt, done: true },
      { label: '支付成功', time: order.paidAt, done: order.status === 'paid' },
      { label: '服务完成', time: null, done: order.status === 'paid' && order.orderType !== 'subscription' },
    ];
    return timeline;
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
          <h1 className="text-lg font-pixel text-[#fbbf24]">我的订单</h1>
          <button
            onClick={fetchOrders}
            className="p-2 text-white/70 hover:text-white"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      <div className="px-4 pt-6 space-y-4">
        {/* Error State */}
        {error && (
          <div className="glass-card p-4 border-red-500/30 bg-red-500/10">
            <p className="text-red-400 text-sm">{error}</p>
            <button 
              onClick={fetchOrders}
              className="mt-2 text-xs text-red-300 hover:text-red-200"
            >
              重试
            </button>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#fbbf24]"></div>
          </div>
        ) : orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-8 text-center"
          >
            <Package className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-400 mb-2">暂无订单记录</p>
            <p className="text-xs text-gray-500 mb-4">去商城选购一些开运好物吧</p>
            <button
              onClick={() => navigate('/shop')}
              className="px-6 py-2 bg-[#fbbf24] text-black rounded-lg font-medium hover:bg-[#facc15] transition-colors"
            >
              去商城逛逛
            </button>
          </motion.div>
        ) : (
          <>
            {/* Order Stats */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="glass-card p-3 text-center">
                <p className="text-2xl font-bold text-[#fbbf24]">{orders.length}</p>
                <p className="text-xs text-gray-400">总订单</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="text-2xl font-bold text-green-400">{orders.filter(o => o.status === 'paid').length}</p>
                <p className="text-xs text-gray-400">已完成</p>
              </div>
              <div className="glass-card p-3 text-center">
                <p className="text-2xl font-bold text-yellow-400">{orders.filter(o => o.status === 'pending').length}</p>
                <p className="text-xs text-gray-400">待支付</p>
              </div>
            </div>

            {/* Order List */}
            {orders.map((order, index) => {
              const statusConfig = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
              const isExpanded = expandedOrder === order.id;
              
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass-card overflow-hidden"
                >
                  {/* Order Header */}
                  <div 
                    className="p-4 cursor-pointer"
                    onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{ORDER_TYPE_LABELS[order.orderType] || order.orderType}</span>
                          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${statusConfig.bg} ${statusConfig.color}`}>
                            {statusConfig.icon}
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="text-white font-medium mt-1">{order.productName}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-[#f43f5e]">¥{order.amount.toFixed(2)}</span>
                        {isExpanded ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>订单号：{order.id.slice(0, 8)}...</span>
                      <span>{formatDate(order.createdAt)}</span>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-white/10"
                      >
                        <div className="p-4 space-y-3">
                          {/* Timeline */}
                          <div className="space-y-2">
                            {getStatusTimeline(order).map((step, i) => (
                              <div key={i} className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${step.done ? 'bg-green-400' : 'bg-gray-600'}`} />
                                <div className="flex-1">
                                  <span className={`text-xs ${step.done ? 'text-gray-300' : 'text-gray-500'}`}>{step.label}</span>
                                </div>
                                <span className="text-[10px] text-gray-500">
                                  {step.time ? formatDate(step.time) : '--'}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Actions */}
                          <div className="flex gap-2 pt-2">
                            {order.status === 'pending' && (
                              <button
                                className="flex-1 py-2 bg-[#fbbf24] text-black rounded-lg font-medium text-sm hover:bg-[#facc15] transition-colors"
                                onClick={async (e) => {
                                  e.stopPropagation();
                                  try {
                                    await shopService.initiatePayment(order.id);
                                    // Refresh orders
                                    fetchOrders();
                                  } catch {
                                    // Silent fail
                                  }
                                }}
                              >
                                立即支付
                              </button>
                            )}
                            <button
                              className="flex-1 py-2 border border-white/10 text-white rounded-lg text-sm hover:bg-white/5 transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setExpandedOrder(isExpanded ? null : order.id);
                              }}
                            >
                              {isExpanded ? '收起' : '查看详情'}
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded border border-white/10 text-white disabled:opacity-30 hover:bg-white/5 transition-colors"
                >
                  上一页
                </button>
                <span className="text-sm text-gray-400">
                  {page} / {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded border border-white/10 text-white disabled:opacity-30 hover:bg-white/5 transition-colors"
                >
                  下一页
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
