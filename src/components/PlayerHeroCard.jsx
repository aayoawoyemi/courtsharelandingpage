'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SparklineChart = dynamic(() => import('./SparklineChart'), {
  ssr: false,
  loading: () => <div className="h-[40px] sm:h-[50px] w-[100px] sm:w-[120px]" />,
});

const PlayerHeroCard = ({ name, photoUrl, price, priceChange, changePercentage, chartData, team }) => {
  // For development, use a default image if the player image is missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100';
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-lg w-full max-w-[220px] sm:max-w-[280px] border border-gray-700">
      <div className="flex items-center gap-2 sm:gap-3">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-gray-700" 
          onError={handleImageError}
        />
        <div className="flex-1 min-w-0">
          <div className="text-gray-400 text-xs font-medium mb-0.5 truncate">
            NBA • {team}
          </div>
          <h2 className="text-white text-base sm:text-lg font-bold truncate">{name}</h2>
        </div>
      </div>
      
      <div className="mt-2 sm:mt-3">
        <div className="text-white text-xl sm:text-2xl font-semibold">${price.toFixed(2)}</div>
        <div className={`text-xs sm:text-sm font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({changePercentage.toFixed(2)}%)
        </div>
      </div>
      
      <SparklineChart data={chartData} />
    </div>
  );
};

export default PlayerHeroCard; 