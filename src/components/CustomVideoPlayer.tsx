'use client';

import React, { useEffect, useRef } from 'react';

interface CustomVideoPlayerProps {
  src: string;
}

export default function CustomVideoPlayer({ src }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

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
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-xl overflow-hidden shadow-2xl border border-gray-800">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        src={src}
        autoPlay
        loop
        muted
        controls
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
} 