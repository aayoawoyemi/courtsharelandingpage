'use client';

import React from 'react';
import PlayerHeroCard from '../components/PlayerHeroCard';
import { mockPlayerData } from '../data/mockPlayerData';
import WaitlistForm from '../components/WaitlistForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PulsingDots from '../components/PulsingDots';
import CourtShareLogo from '../components/CourtShareLogo';
import SectionChartBackground from '../components/SectionChartBackground';
import SocialMediaLinks from '../components/SocialMediaLinks';

export default function Home() {
  // Create multiple columns of cards for the stream effect
  const columnCount = 5;
  const columns = Array.from({ length: columnCount }, (_, i) => {
    return mockPlayerData.map((player, index) => ({
      ...player,
      _internalKey: `${i}-${index}` // internal key separate from props
    }));
  });

  // Helper component for fade-in / slide-up reveal
  const ScrollReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({ children, delay = 0 }) => {
    const [ref, visible] = useScrollAnimation<HTMLDivElement>();
    return (
      <div
        ref={ref}
        style={{ transitionDelay: `${delay}ms` }}
        className={`transition-all duration-[1200ms] ease-out transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      >
        {children}
      </div>
    );
  };

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          <div className="absolute inset-0 transform rotate-[-15deg] scale-[1.25]">
            {columns.map((columnData, columnIndex) => (
              <div 
                key={columnIndex} 
                className="absolute"
                style={{
                  left: `${(columnIndex / columnCount) * 100}%`,
                  top: `-${columnIndex * 50}px`,
                  width: '280px', // Fixed width for cards
                }}
              >
                <div className="animate-scroll-stream" style={{animationDuration: `${80 + columnIndex * 20}s`, animationDelay: `${columnIndex * 6}s`, animationTimingFunction:'linear', willChange:'transform'}}>
                  {/* First set of cards */}
                  {columnData.map((p) => {
                    const { _internalKey, ...playerProps } = p;
                    return (
                      <div key={_internalKey} className="mb-4 transform hover:scale-105 transition-transform duration-300">
                        <PlayerHeroCard {...playerProps} team={playerProps.team || ''} />
                      </div>
                    );
                  })}
                  
                  {/* Duplicate the cards to create a seamless loop */}
                  {columnData.map((p) => {
                    const { _internalKey, ...playerProps } = p;
                    return (
                      <div key={`dup-${_internalKey}`} className="mb-4">
                        <PlayerHeroCard {...playerProps} team={playerProps.team || ''} />
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className="bg-gray-900/80 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-700 max-w-md mx-auto flex flex-col items-center gap-y-8">
            <p className="font-jakarta text-lg md:text-xl font-semibold italic tracking-widest uppercase text-brand-green">Own the Narrative</p>
            <h1 className="font-poppins font-extrabold text-white text-5xl md:text-6xl">Court Share</h1>
            <p className="font-sans text-gray-300 text-lg max-w-md mb-4">Join the Waitlist for Exclusive Early Access to the CourtShare Paper Trading Beta.</p>
            <WaitlistForm />
          </div>
        </div>
        {/* Fade Overlay at Bottom for Seamless Transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-black/80 to-black pointer-events-none"></div>
      </section>

      {/* Section Separator / Spacer */}
      <div className="h-16 bg-gradient-to-b from-transparent to-gray-900"></div>

      {/* Become a Founding Trader Section */}
      <section className="relative bg-black text-white py-32 px-6 md:px-16 overflow-hidden">
        {/* Animated Chart Background */}
        <SectionChartBackground opacity="opacity-30" />
        
        {/* Content Layer */}
        <div className="relative z-10">
          {/* Heading & Subtitle */}
          <div className="text-center mb-20 max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-jakarta text-3xl md:text-4xl lg:text-5xl font-semibold italic tracking-widest uppercase text-brand-green mb-4 whitespace-nowrap">Become a Founding Trader</h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="font-inter text-lg md:text-xl text-gray-300">Help Shape the Future of Fan Engagement</p>
            </ScrollReveal>
          </div>

          {/* Content Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left Copy Column */}
            <div className="space-y-14 leading-relaxed">
              <ScrollReveal>
                <div>
                  <h3 className="font-syne text-2xl md:text-3xl font-semibold mb-3">Own the Narrative. Leverage Your IQ.</h3>
                  <p className="font-inter text-gray-300">
                    We&apos;re building a new kind of fantasy market—one that moves based on real sentiment, not just daily stats.
                    This is for passionate fans who want to engage with the game on a deeper level, on a platform that is
                    transparent, fair, and a true vehicle to leverage your basketball IQ.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h3 className="font-syne text-2xl md:text-3xl font-semibold mb-3">The Paper Trading Beta</h3>
                  <p className="font-inter text-gray-300">
                    To perfect our market algorithms and user experience, we are launching an exclusive paper trading beta.
                    Each founding member will start with a set amount of paper cash to trade players, master the mechanics,
                    and help us build the future.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h3 className="font-syne text-2xl md:text-3xl font-semibold mb-3">Join the Community. Be Part of History.</h3>
                  <p className="font-inter text-gray-300">
                    This is more than just an app; it&apos;s a community. Your feedback during this phase will be invaluable.
                    As a thank you, everyone admitted to the closed beta will receive a unique badge on their profile,
                    signifying them as a <span className="font-semibold text-white">Founding Trader</span>, along with other
                    exclusive perks to be announced.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            {/* Right Visual Column – Logo */}
            <div className="flex items-center justify-center">
              <ScrollReveal delay={150}>
                <CourtShareLogo />
              </ScrollReveal>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mt-24">
            <SocialMediaLinks />
          </div>

          {/* Decorative Pulsing Dots */}
          <PulsingDots count={8} />
        </div>
      </section>
    </div>
  );
}
