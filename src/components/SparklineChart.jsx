'use client';

import React, { useEffect, useState } from 'react';
import { LineChart, Line, YAxis } from 'recharts';

const SparklineChart = ({ data }) => {
  const [chartWidth, setChartWidth] = useState(120);
  const [chartHeight, setChartHeight] = useState(40);
  
  // Responsive chart sizing
  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 640;
      setChartWidth(isMobile ? 100 : 120);
      setChartHeight(isMobile ? 35 : 40);
    };
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Convert number array to object array expected by Recharts
  const chartData = data.map(value => ({ value }));
  
  // Determine if the trend is positive (for color)
  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = isPositive ? '#4ade80' : '#f87171'; // Using Tailwind green-400 and red-400 colors
  
  return (
    <div className="mt-1 sm:mt-2 h-[35px] sm:h-[50px]">
      <LineChart 
        width={chartWidth} 
        height={chartHeight} 
        data={chartData} 
        margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
      >
        <YAxis domain={['dataMin', 'dataMax']} hide />
        <Line 
          type="monotone" 
          dataKey="value" 
          stroke={lineColor} 
          strokeWidth={1.5}
          dot={false} 
          isAnimationActive={true}
        />
      </LineChart>
    </div>
  );
};

export default SparklineChart; 