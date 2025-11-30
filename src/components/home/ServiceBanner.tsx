import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ServiceBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="px-2 mt-4">
      <div 
        onClick={() => navigate('/shop')}
        className="bg-pixel-card border border-pixel-border rounded-2xl p-4 flex items-center justify-between relative overflow-hidden group cursor-pointer"
      >
        <div className="w-1/2 z-10">
          <h3 className="text-xl text-white font-sans font-bold leading-tight">
            占卜歌者<br />
            <span className="text-white/80">100%的</span><br />
            灵魂传递
          </h3>
        </div>
        
        <div className="w-1/2 flex justify-end z-10">
          <img 
            src="/images/home/banner_wizards.png" 
            alt="Wizards Banner" 
            className="w-32 h-24 object-cover rounded-lg transform group-hover:scale-105 transition-transform"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUgMTJoMTRNMTIgNXYxNCI+PC9wYXRoPjwvc3ZnPg==';
            }}
          />
        </div>
        
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};
