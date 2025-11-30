import React from 'react';

export const ShopBanner: React.FC = () => {
  return (
    <div className="w-full px-4 mb-6">
      <div className="relative w-full aspect-[2/1] rounded-xl overflow-hidden shadow-lg border border-white/10">
        <img 
          src="/images/shop/banner_featured.jpg" 
          alt="New Release" 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback
            (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgODAwIDQwMCI+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI0MDAiIGZpbGw9IiMxYTIwMmMiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9Im1vbm9zcGFjZSIgZm9udC1zaXplPSI0MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSI+TmV3IFJlbGVhc2U8L3RleHQ+PC9zdmc+';
          }}
        />
        <div className="absolute top-2 right-2 bg-white text-pixel-black text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
          首发
        </div>
      </div>
    </div>
  );
};
