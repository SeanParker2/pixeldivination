import React from 'react';

export const ShopBanner: React.FC = () => {
  return (
    <div className="px-5 pt-5">
      <div 
        className="h-40 rounded-2xl relative overflow-hidden border border-white/20 shadow-[0_0_20px_rgba(139,92,246,0.2)] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1568003450095-249d97034c54?auto=format&fit=crop&w=800&q=80')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-5 flex flex-col justify-center">
          <span className="bg-[#fbbf24] text-black px-2 py-0.5 rounded text-xs font-bold w-fit mb-2">NEW ARRIVAL</span>
          <h3 className="text-2xl leading-[1.1] text-white font-pixel drop-shadow-[0_0_10px_rgba(0,0,0,0.8)]">
            一念的乐章<br/>四季疗愈音钵
          </h3>
        </div>
      </div>
    </div>
  );
};
