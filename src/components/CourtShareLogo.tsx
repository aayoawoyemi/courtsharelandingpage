"use client";

import React from 'react';
import Image from 'next/image';

interface CourtShareLogoProps {
  className?: string;
}

export default function CourtShareLogo({ className = '' }: CourtShareLogoProps) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="bg-black relative w-full max-w-xs md:max-w-sm p-4 rounded-xl shadow-lg flex flex-col items-center">
        {/* Use next/image for optimized image loading */}
        <div className="relative w-64 h-64">
          <Image
            src="/courtshare-logo.svg"
            alt="CourtShare Logo"
            fill
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
      </div>
    </div>
  );
} 