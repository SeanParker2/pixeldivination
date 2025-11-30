import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../../stores/useCartStore';
import { PRODUCTS } from '../../data/products';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { items, addItem, removeItem, decreaseItem } = useCartStore();

  // Calculate totals
  const cartProducts = items.map(item => {
    const product = PRODUCTS.find(p => p.id === item.productId);
    return { ...item, product };
  }).filter(item => item.product !== undefined);

  const totalPrice = cartProducts.reduce((sum, item) => {
    // Use Number() to ensure price is treated as a number if it's a string
    const price = typeof item.product!.price === 'string' 
      ? parseFloat(item.product!.price as unknown as string) 
      : item.product!.price;
    return sum + (price * item.quantity);
  }, 0);

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
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-[#1E1E2E] border-l border-white/10 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ShoppingBag className="text-pixel-gold" size={20} />
                <h2 className="text-white font-bold text-lg">购物车</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p>购物车是空的</p>
                </div>
              ) : (
                cartProducts.map(({ productId, quantity, product }) => (
                  <div key={productId} className="flex gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
                    <div className="w-20 h-20 bg-black/20 rounded-lg overflow-hidden shrink-0">
                      <img src={product!.image} alt={product!.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-white font-medium text-sm line-clamp-1">{product!.title}</h3>
                        <p className="text-[#FF4D4F] font-bold text-sm mt-1">¥ {product!.price}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 bg-black/20 rounded-lg px-2 py-1">
                          <button 
                            onClick={() => decreaseItem(productId)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-white text-sm font-mono w-4 text-center">{quantity}</span>
                          <button 
                            onClick={() => addItem(productId)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeItem(productId)}
                          className="text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartProducts.length > 0 && (
              <div className="p-4 border-t border-white/10 bg-[#161622]">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400 text-sm">总计</span>
                  <span className="text-[#FF4D4F] text-xl font-bold font-sans">¥ {totalPrice}</span>
                </div>
                <button className="w-full py-3 bg-gradient-to-r from-[#EAB308] to-[#F59E0B] text-black font-bold rounded-xl shadow-lg hover:brightness-110 transition-all active:scale-95">
                  立即结算 ({cartProducts.reduce((a, c) => a + c.quantity, 0)})
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
