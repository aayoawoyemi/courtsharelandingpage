'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const SparklineChart = dynamic(() => import('./SparklineChart'), {
  ssr: false,
  loading: () => <div className="h-[50px] w-[120px]" />,
});

const PlayerHeroCard = ({ name, photoUrl, price, priceChange, changePercentage, chartData, team }) => {
  // For development, use a default image if the player image is missing
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/100';
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-full max-w-[280px] border border-gray-700">
      <div className="flex items-center gap-3">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-700" 
          onError={handleImageError}
        />
        <div className="flex-1">
          <div className="text-gray-400 text-xs font-medium mb-0.5">
            NBA • {team}
          </div>
          <h2 className="text-white text-lg font-bold">{name}</h2>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-white text-2xl font-semibold">${price.toFixed(2)}</div>
        <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({changePercentage.toFixed(2)}%)
        </div>
      </div>
      
      <SparklineChart data={chartData} />
    </div>
  );
};

export default PlayerHeroCard; 