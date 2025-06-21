'use client';

import React, { useEffect, useRef, useState } from 'react';

interface CustomVideoPlayerProps {
  src: string;
}

export default function CustomVideoPlayer({ src }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Enable sound after the first user interaction (click/touch/key)
  useEffect(() => {
    const enableSound = () => {
      if (videoRef.current) {
        videoRef.current.muted = false;
        // Some browsers require calling play again after unmuting
        videoRef.current.play().catch(() => {/* ignore */});
      }
      // Remove listeners after first interaction
      window.removeEventListener('click', enableSound);
      window.removeEventListener('touchstart', enableSound);
      window.removeEventListener('keydown', enableSound);
    };

    window.addEventListener('click', enableSound, { once: true });
    window.addEventListener('touchstart', enableSound, { once: true });
    window.addEventListener('keydown', enableSound, { once: true });

    // Handle video loading state
    const handleLoadedData = () => {
      setIsLoading(false);
    };

    if (videoRef.current) {
      videoRef.current.addEventListener('loadeddata', handleLoadedData);
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener('loadeddata', handleLoadedData);
      }
      window.removeEventListener('click', enableSound);
      window.removeEventListener('touchstart', enableSound);
      window.removeEventListener('keydown', enableSound);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-800 relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
          <div className="w-12 h-12 border-4 border-accent-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        loop
        muted
        controls
        playsInline
        preload="auto"
        poster="/social-card.png"
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 