// File Path: src/components/SocialMediaLinks.tsx
// Purpose: Displays social media icons with elegant "Coming Soon" overlay and hover effects.
// Key Components/Logic:
//   - Uses react-icons for clean SVG social media icons
//   - Implements hover effects with smooth transitions
//   - Shows "Coming Soon" text with modern glass-morphism effect
// Role in Application: Social media engagement section for the Founding Trader area

"use client";

import React, { useState } from 'react';
import { FaDiscord, FaTiktok, FaReddit } from 'react-icons/fa';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface SocialLinkProps {
  icon: React.ReactNode;
  name: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Container */}
      <div className="relative flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 transition-all duration-500 group-hover:border-brand-green group-hover:bg-gray-800/80 group-hover:scale-105">
        <div className="text-2xl md:text-3xl text-gray-400 transition-colors duration-500 group-hover:text-brand-green">
          {icon}
        </div>
        
        {/* Coming Soon Overlay */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm rounded-xl border border-brand-green/30 transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-brand-green font-syne text-xs md:text-sm font-semibold tracking-wider">
            COMING
          </span>
          <span className="text-white font-syne text-xs md:text-sm font-light">
            SOON
          </span>
        </div>
      </div>
      
      {/* Platform Name */}
      <div className="mt-3 text-center">
        <span className="text-gray-400 font-inter text-sm transition-colors duration-300 group-hover:text-white">
          {name}
        </span>
      </div>
    </div>
  );
};

export default function SocialMediaLinks() {
  const [ref, visible] = useScrollAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="flex flex-col items-center space-y-8">
        {/* Section Header */}
        <div className="text-center">
          <h4 className="font-syne text-xl md:text-2xl font-semibold text-white mb-2">
            Join the Community
          </h4>
          <p className="font-inter text-gray-400 text-sm md:text-base">
            Connect with fellow traders and stay updated
          </p>
        </div>
        
        {/* Social Icons */}
        <div className="flex items-center justify-center space-x-6 md:space-x-8">
          <SocialLink 
            icon={<FaDiscord />} 
            name="Discord" 
          />
          <SocialLink 
            icon={<FaTiktok />} 
            name="TikTok" 
          />
          <SocialLink 
            icon={<FaReddit />} 
            name="Reddit" 
          />
        </div>
      </div>
    </div>
  );
} 