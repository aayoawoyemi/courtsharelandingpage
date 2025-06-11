'use client';

import React from 'react';
import { LineChart, Line, YAxis } from 'recharts';

const SparklineChart = ({ data }) => {
  // Convert number array to object array expected by Recharts
  const chartData = data.map(value => ({ value }));
  
  // Determine if the trend is positive (for color)
  const isPositive = data[data.length - 1] >= data[0];
  const lineColor = isPositive ? '#00FF00' : '#FF0000';
  
  return (
    <div className="mt-2 h-[50px]">
      <LineChart width={120} height={40} data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
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