// File Path: src/components/SectionChartBackground.tsx
// Purpose: Provides a full-section animated chart background using Lottie animations.
//          This component renders behind text content with low opacity for a subtle texture effect.
// Key Components/Logic:
//   - Uses lottie-react to display a continuously looping chart animation
//   - Positioned absolutely to fill parent container
//   - Low opacity and background z-index for subtle effect
// Role in Application: Background animation layer for the "Become a Founding Trader" section

"use client";

import React, { useEffect, useState } from 'react';

interface SectionChartBackgroundProps {
  opacity?: string;
}

export default function SectionChartBackground({ 
  opacity = "opacity-30" 
}: SectionChartBackgroundProps) {
  // State to track if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  // Update isMobile state on window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    // Set initial value
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Adjust stroke width and spacing for mobile
  const strokeWidth = isMobile ? 2 : 3;
  const candleSpacing = isMobile ? 100 : 150;
  const candleWidth = isMobile ? 8 : 12;

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${opacity}`}>
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Animated chart lines - optimized for mobile */}
        <path
          d="M0,400 Q200,500 400,350 T800,450 T1200,300"
          fill="none"
          stroke="#41B6B2"
          strokeWidth={strokeWidth}
          className="animate-chart-line-1"
        />
        <path
          d="M0,450 Q300,300 600,500 T1200,400"
          fill="none"
          stroke="#41B6B2"
          strokeWidth={strokeWidth} 
          className="animate-chart-line-2"
        />
        <path
          d="M0,350 Q400,450 800,300 T1200,450"
          fill="none"
          stroke="#41B6B2"
          strokeWidth={strokeWidth}
          className="animate-chart-line-3"
        />
        
        {/* Stock candles - reduced count on mobile */}
        {[...Array(isMobile ? 5 : 8)].map((_, i) => (
          <React.Fragment key={i}>
            <rect 
              x={100 + i * candleSpacing} 
              y={300 - Math.sin(i * 0.8) * 50} 
              width={candleWidth} 
              height={isMobile ? 80 : 100} 
              fill="#41B6B2" 
              className="animate-pulse-slow"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
            <line 
              x1={100 + candleWidth/2 + i * candleSpacing} 
              y1={270 - Math.sin(i * 0.8) * 50} 
              x2={100 + candleWidth/2 + i * candleSpacing} 
              y2={240 - Math.sin(i * 0.8) * 50}
              stroke="#41B6B2" 
              strokeWidth={strokeWidth}
            />
            <line 
              x1={100 + candleWidth/2 + i * candleSpacing} 
              y1={300 + (isMobile ? 80 : 100)} 
              x2={100 + candleWidth/2 + i * candleSpacing} 
              y2={330 + (isMobile ? 80 : 100) * 0.3}
              stroke="#41B6B2" 
              strokeWidth={strokeWidth}
            />
          </React.Fragment>
        ))}
      </svg>
    </div>
  );
} 