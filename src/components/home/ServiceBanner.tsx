import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ServiceBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/shop')}
      className="px-4 mt-4 cursor-pointer"
    >
      <div 
        className="w-full h-[138px] relative rounded-lg overflow-hidden flex items-center"
      >
        {/* Text Content */}
        <div className="absolute left-0 top-[44px] z-10 pl-0">
           <h3 className="text-[#e4ded7] text-lg font-medium leading-7 font-sans">
            占卜歌者<span className="text-[#e4ded7]">100%的</span><br />
            灵魂传递
          </h3>
        </div>

        {/* Image */}
        <div className="absolute right-0 top-0 h-full w-[165px]">
           <img 
            src="/images/home/banner_wizards.png" 
            alt="Wizards Banner" 
            className="w-full h-full object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZkNzAwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0iTTUgMTJoMTRNMTIgNXYxNCI+PC9wYXRoPjwvc3ZnPg==';
            }}
          />
        </div>
        
        {/* Background (if needed, or handled by image?) */}
        {/* home.html doesn't explicitly show a background color rect, maybe it's transparent or part of the container? */}
      </div>
    </div>
  );
};
