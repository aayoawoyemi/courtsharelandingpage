'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SparklineChart = dynamic(() => import('./SparklineChart'), {
  ssr: false,
  loading: () => <div className="h-[40px] sm:h-[50px] w-[100px] sm:w-[120px]" />,
});

const PlayerHeroCard = ({ name, photoUrl, price, priceChange, changePercentage, chartData, team }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    checkMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // For development, use a default image if the player image is missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100';
  };

  return (
    <div className="bg-surface backdrop-blur-xl backdrop-saturate-150 p-2.5 sm:p-3 md:p-4 rounded-xl shadow-lg w-full max-w-[200px] sm:max-w-[240px] md:max-w-[280px] border border-border shadow-[0_0_0_0.5px_rgba(255,255,255,0.08)]">
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-border" 
          onError={handleImageError}
        />
        <div className="flex-1 min-w-0">
          <div className="text-text-secondary text-[10px] sm:text-xs font-medium mb-0.5 truncate">
            {team || ''}
          </div>
          <h2 className="text-text-display text-sm sm:text-base md:text-lg font-bold truncate">{name}</h2>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3">
        <div className="text-text-display text-xl sm:text-2xl font-semibold">${price.toFixed(2)}</div>
        <div className={`text-xs sm:text-sm font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({changePercentage.toFixed(2)}%)
        </div>
      </div>
      
      <div className="mt-1 sm:mt-2">
        <SparklineChart data={chartData} />
      </div>
    </div>
  );
};

export default PlayerHeroCard; 