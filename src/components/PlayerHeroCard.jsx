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
    <div className="bg-surface backdrop-blur-xl backdrop-saturate-150 p-3 sm:p-4 rounded-xl shadow-lg w-full max-w-[240px] sm:max-w-[280px] border border-border shadow-[0_0_0_0.5px_rgba(255,255,255,0.08)]">
      <div className="flex items-center gap-3">
        <img 
          src={photoUrl} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover border-2 border-border" 
          onError={handleImageError}
        />
        <div className="flex-1 min-w-0">
          <div className="text-text-secondary text-xs font-medium mb-0.5 truncate">
            {team || ''}
          </div>
          <h2 className="text-text-display text-lg font-bold truncate">{name}</h2>
        </div>
      </div>
      
      <div className="mt-3">
        <div className="text-text-display text-2xl font-semibold">${price.toFixed(2)}</div>
        <div className={`text-sm font-medium ${priceChange >= 0 ? 'text-semantic-green' : 'text-semantic-red'}`}>
          {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)} ({changePercentage.toFixed(2)}%)
        </div>
      </div>
      
      <SparklineChart data={chartData} />
    </div>
  );
};

export default PlayerHeroCard; 