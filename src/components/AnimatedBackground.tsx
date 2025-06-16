// File Path: src/components/AnimatedBackground.tsx
// Purpose: Full-screen, subtle animated background consisting of slowly pulsing vertical bars reminiscent of a green candlestick chart.
// Key Components/Logic:
//  - Renders 20 bar <span> elements.
//  - Each bar has a slightly different animation delay to create a wave effect.
//  - Uses Tailwind utility classes for sizing, positioning, and coloring.
// Role in Application: Placed in the global layout, this component lives behind all content (fixed, z-[-10]) to add depth without distracting.

"use client";

import React, { useState, useEffect } from 'react';

const barCount = 20;

/** AnimatedBackground – subtle chart bar animation behind the page */
export default function AnimatedBackground() {
  const [bars, setBars] = useState<Array<{ height: string; delay: string; duration: string }>>([]);
  
  // Generate random heights on client-side only to avoid hydration mismatch
  useEffect(() => {
    const newBars = Array.from({ length: barCount }).map((_, idx) => ({
      height: `${Math.random() * 60 + 40}%`,
      delay: `${idx * 0.3}s`,
      duration: `${8 + (idx % 5)}s`,
    }));
    setBars(newBars);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 flex items-end justify-center space-x-2 opacity-20 md:opacity-25 select-none">
      {bars.map((bar, idx) => (
        <span
          key={idx}
          className="bg-brand-green/80 w-1.5 md:w-2 rounded-sm animate-chart-bar"
          style={{
            height: bar.height,
            animationDelay: bar.delay,
            animationDuration: bar.duration,
          }}
        />
      ))}
    </div>
  );
} 