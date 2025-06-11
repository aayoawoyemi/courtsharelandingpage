"use client"

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [email, setEmail] = useState('');
  const [dots, setDots] = useState<Array<{left: string, top: string, duration: number}>>([]);
  
  useEffect(() => {
    // Generate dots only on client side to avoid hydration mismatch
    const newDots = [...Array(50)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3
    }));
    setDots(newDots);
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this to a backend
    console.log('Email submitted:', email);
    alert(`Thanks for joining our waitlist with ${email}! We'll be in touch soon.`);
    setEmail('');
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Grid background with pulsing dots */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-10">
          {/* Grid lines */}
          <div className="h-full w-full grid grid-cols-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-full border-r border-green-500/20" />
            ))}
          </div>
          <div className="h-full w-full grid grid-rows-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full border-b border-green-500/20" />
            ))}
          </div>
        </div>
        
        {/* Pulsing dots */}
        {dots.map((dot, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-green-500"
            style={{
              left: dot.left,
              top: dot.top,
              opacity: 0.7,
              animation: `pulse ${dot.duration}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Content section */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-green-500 font-syne">
          Court Share
        </h1>
        
        <p className="text-xl sm:text-2xl text-center mb-8 text-white/80 max-w-2xl font-inter">
          The first sentiment-driven marketplace for NBA player shares. Trade like a pro, without the pros.
        </p>
        
        {/* Waitlist Form */}
        <div className="w-full max-w-md bg-gray-900 p-6 rounded-lg shadow-lg border border-green-500/30">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold font-syne">Join the Waitlist</h3>
              <p className="text-sm text-white/60 font-inter">Be a founding member when we launch</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-2 rounded-md bg-black border border-white/20 focus:border-green-500 focus:outline-none font-inter"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 text-black font-medium rounded-md hover:bg-green-500/90 transition-colors font-syne"
              >
                Join Waitlist
              </button>
            </div>
          </form>
        </div>

        <p className="mt-6 text-sm text-white/60 text-center font-inter">
          No real money involved. Paper trading coming soon.
        </p>
      </div>
    </div>
  );
};

export default Hero; 