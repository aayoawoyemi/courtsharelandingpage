// File Path: src/components/PulsingDots.tsx
// Purpose: Renders a configurable number of randomly positioned pulsing dots for decorative purposes.
// Key Components/Logic:
//   - Generates positions with useMemo to ensure consistency during the client session.
//   - Adds pointer-events-none and negative z-index so dots don't interfere.
// Role in Application: Used within sections to add subtle dynamic accents without hydration warnings.

"use client";

import React, { useState, useEffect } from 'react';

interface PulsingDotsProps {
  count?: number;
  className?: string;
}

export default function PulsingDots({ count = 6, className = '' }: PulsingDotsProps) {
  const [dots, setDots] = useState<Array<{top: string, left: string, delay: string}>>([]);
  
  // Generate positions on client-side only to avoid hydration mismatch
  useEffect(() => {
    const newDots = Array.from({ length: count }).map(() => ({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
      delay: `${Math.random() * 3}s`,
    }));
    setDots(newDots);
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 ${className}`}>
      {dots.map((dot, i) => (
        <span
          key={i}
          className="absolute w-2 h-2 bg-brand-green rounded-full animate-pulse"
          style={{
            top: dot.top,
            left: dot.left,
            animationDelay: dot.delay,
          }}
        />
      ))}
    </div>
  );
} 