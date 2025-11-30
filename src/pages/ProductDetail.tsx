import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Share2, ShoppingCart, Headphones } from 'lucide-react';
import { PRODUCTS } from '../data/products';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const product = PRODUCTS.find(p => p.id === Number(id));

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#161622] text-white flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">未找到商品</p>
          <button 
            onClick={() => navigate('/shop')}
            className="px-4 py-2 bg-pixel-gold text-black rounded-lg"
          >
            返回商城
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#161622] text-white font-pixel pb-24 relative">
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-[#161622]/80 backdrop-blur-md flex items-center justify-between px-4 border-b border-white/5">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 flex items-center justify-center -ml-2 text-white/80 hover:text-white"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-base font-medium">商品详情</h1>
        <button className="w-10 h-10 flex items-center justify-center -mr-2 text-white/80 hover:text-white">
          <Share2 size={20} />
        </button>
      </div>

      {/* Content */}
      <div className="pt-14">
        {/* Image Gallery */}
        <div className="w-full aspect-square bg-white/5 relative">
          <img 
            src={product.image} 
            alt={product.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNDAwIDQwMCI+PHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxZjFmMjMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiM2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=';
            }}
          />
        </div>

        {/* Info Section */}
        <div className="px-4 py-6 space-y-4">
          {/* Price & Title */}
          <div>
            <div className="text-[#FF4D4F] text-2xl font-bold font-sans mb-2">
              ¥ {product.price}
            </div>
            <h2 className="text-xl font-medium leading-snug text-white">
              {product.title}
            </h2>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
              {product.category}
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-[#EAB308] border border-[#EAB308]/30">
              {product.buff}
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
              正品保证
            </span>
            <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-300 border border-white/10">
              极速发货
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/10 my-2" />

          {/* Description */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white/90">商品详情</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {product.description || "暂无详细介绍。"}
            </p>
            
            {/* Mock Long Content */}
            <p className="text-sm text-gray-400 leading-relaxed">
              温馨提示：天然水晶/矿石内部可能存在冰裂、棉絮、矿缺等自然现象，非质量问题。请避免接触化学物品，定期消磁净化。
            </p>
            <div className="w-full h-40 bg-white/5 rounded-lg flex items-center justify-center text-gray-600 text-xs mt-4">
              [商品实拍图展示区域]
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-[#1E1E2E] border-t border-white/10 flex items-center px-2 z-50 pb-safe">
        {/* Left Icons */}
        <div className="flex items-center mr-2">
          <button className="flex flex-col items-center justify-center w-12 h-full gap-1 text-gray-400 hover:text-white">
            <Headphones size={20} />
            <span className="text-[10px]">客服</span>
          </button>
          <button className="flex flex-col items-center justify-center w-12 h-full gap-1 text-gray-400 hover:text-white">
            <ShoppingCart size={20} />
            <span className="text-[10px]">购物车</span>
          </button>
        </div>

        {/* Right Buttons */}
        <div className="flex-1 flex items-center gap-2 pr-2">
          <button className="flex-1 h-10 bg-[#EAB308] text-black font-bold text-sm rounded-full hover:bg-[#FACC15] transition-colors">
            加入购物车
          </button>
          <button className="flex-1 h-10 bg-[#FF4D4F] text-white font-bold text-sm rounded-full hover:bg-[#ff7875] transition-colors">
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
