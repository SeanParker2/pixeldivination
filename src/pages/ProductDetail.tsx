import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ShoppingCart, Headphones } from 'lucide-react';
import { MobileContainer } from '../components/layout/MobileContainer';
import { PRODUCTS } from '../data/products';
import { useCartStore } from '../stores/useCartStore';
import { useToastStore } from '../stores/useToastStore';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore(state => state.addItem);
  const totalItems = useCartStore(state => state.getTotalItems());
  const addToast = useToastStore(state => state.addToast);
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id);
      addToast('已加入购物车', 'success');
    }
  };

  const handleBuyNow = () => {
    if (product) {
      addItem(product.id);
      addToast('正在跳转结算页面...', 'info');
      // TODO: Navigate to Checkout
    }
  };

  if (!product) {
    return (
      <div className="w-full max-w-md mx-auto pt-20 px-4 text-center">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="mb-4 text-white">未找到商品</p>
            <button 
              onClick={() => navigate('/shop')}
              className="px-4 py-2 bg-pixel-gold text-black rounded-lg font-pixel"
            >
              返回商城
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto pt-0 pb-32 relative min-h-screen">
      <div className="min-h-full text-white font-pixel relative">
        
        {/* Navbar */}
        <div className="absolute top-4 left-4 z-50">
          <button 
            onClick={() => navigate(-1)}
            className="w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/10 transition-colors"
            aria-label="返回"
          >
            <ChevronLeft size={24} />
          </button>
        </div>

        {/* Hero Image */}
        <div className="w-full h-[360px] relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxZjFmMjMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>

        {/* Floating Info Card */}
        <div className="mx-5 -mt-10 relative z-10 glass-card p-5 mb-6">
          <div className="text-[#F43F5E] text-3xl font-bold font-pixel mb-2 neon-text-red">
            ¥ {product.price}
          </div>
          <h2 className="text-2xl font-medium leading-snug text-white mb-3">
            {product.title}
          </h2>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#FBBF24]/10 border border-[#FBBF24]/30 rounded text-xs text-[#FBBF24]">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-[#FBBF24]/10 border border-[#FBBF24]/30 rounded text-xs text-[#FBBF24]">
              {product.buff}
            </span>
            <span className="px-3 py-1 bg-[#FBBF24]/10 border border-[#FBBF24]/30 rounded text-xs text-[#FBBF24]">
              正品保证
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="px-5 space-y-6">
          <div>
            <h3 className="text-lg text-white mb-3 border-l-[3px] border-pixel-gold pl-3 font-pixel">
              商品详情
            </h3>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              {product.description || "暂无详细介绍。"}
            </p>
          </div>
          
          <div>
            <p className="text-base text-slate-400 leading-relaxed font-sans">
              温馨提示：天然水晶/矿石内部可能存在冰裂、棉絮、矿缺等自然现象，非质量问题。请避免接触化学物品，定期消磁净化。
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-16 bg-[#1E1E2E] border-t border-white/10 flex items-center px-2 z-50 pb-safe">
        {/* Left Icons */}
        <div className="flex items-center mr-2">
          <button className="flex flex-col items-center justify-center w-12 h-full gap-1 text-gray-400 hover:text-white">
            <Headphones size={20} />
            <span className="text-[10px]">客服</span>
          </button>
          <button className="relative flex flex-col items-center justify-center w-12 h-full gap-1 text-gray-400 hover:text-white">
            <ShoppingCart size={20} />
            <span className="text-[10px]">购物车</span>
            {totalItems > 0 && (
               <div className="absolute top-1 right-2 bg-red-500 text-white text-[8px] font-bold w-3 h-3 flex items-center justify-center rounded-full border border-[#1E1E2E]">
                 {totalItems}
               </div>
            )}
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex-1 flex items-center gap-2 pr-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 h-10 bg-[#EAB308] text-black font-bold text-sm rounded-full hover:bg-[#FACC15] transition-colors active:scale-95 transform"
          >
            加入购物车
          </button>
          <button 
            onClick={handleBuyNow}
            className="flex-1 h-10 bg-[#FF4D4F] text-white font-bold text-sm rounded-full hover:bg-[#ff7875] transition-colors active:scale-95 transform"
          >
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
