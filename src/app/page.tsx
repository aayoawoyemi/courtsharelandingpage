'use client';

import React, { useState, useEffect } from 'react';
import PlayerCarousel from '../components/PlayerCarousel';
import WaitlistForm from '../components/WaitlistForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionChartBackground from '../components/SectionChartBackground';
import CourtShareLogo from '../components/CourtShareLogo';
import SocialMediaLinks from '../components/SocialMediaLinks';
import PulsingDots from '../components/PulsingDots';

export default function Home() {
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
    <main className="bg-background">
      <section className="relative h-screen w-full overflow-hidden">
        
        {/* Layer 1: Background Image - Right Aligned */}
        <div className="absolute top-0 right-0 h-full w-3/5 z-0">
          <img 
            src="/SGA Main hero.jpeg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-left"
            loading="eager"
          />
        </div>

        {/* Layer 2: Black Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/90 to-transparent"></div>

        {/* Layer 3: Content */}
        <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center">
          
                    {/* Top Content on Mobile, Left Column on Desktop */}
          <div className="flex flex-col gap-5 sm:gap-6 text-center md:text-left mb-6 md:mb-0 md:max-w-[50%] lg:max-w-[520px]">
            {/* Mobile Logo - Only visible on mobile */}
            <div className="flex justify-center md:hidden mb-4">
              <img 
                src="/Court Share Main Logo.png" 
                alt="CourtShare Logo" 
                className="h-24 w-auto"
              />
            </div>
            <h1 className="font-display font-extrabold text-5xl sm:text-6xl md:text-8xl text-text-display leading-[0.85] tracking-[-0.015em]">
              OWN THE NARRATIVE.
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-text-primary max-w-lg mx-auto md:mx-0 leading-relaxed font-medium opacity-0 animate-[fadeIn_0.6s_ease-out_0.1s_forwards]">
              Leverage your knowledge in the <span className="font-bold">first NBA stock exchange</span>—forget fantasy points. Invest, divest, and watch storylines pay off.
            </p>
            <WaitlistForm />
          </div>

          {/* Bottom Content on Mobile, Right Column on Desktop */}
          <div className="flex items-start justify-center mt-4 md:absolute md:right-8 md:top-[45%] md:-translate-y-1/2 md:w-[45%]">
            <PlayerCarousel />
          </div>
        </div>
      </section>

      {/* Section Separator / Spacer */}
      <div className="h-16 bg-gradient-to-b from-background to-surface"></div>

      {/* Section 2: Founding Trader Section */}
      <section className="relative bg-background text-text-primary py-20 sm:py-32 px-4 sm:px-6 md:px-16 overflow-hidden">
        {/* Animated Chart Background */}
        <SectionChartBackground opacity="opacity-20 sm:opacity-30" />
        
        {/* Content Layer */}
        <div className="relative z-10">
          {/* Heading & Subtitle */}
          <div className="text-center mb-12 sm:mb-20 max-w-4xl mx-auto px-2">
            <ScrollReveal>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-accent-primary mb-2 sm:mb-4">
                Become a Founding Trader
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-base sm:text-lg md:text-xl text-text-secondary">Help Shape the Future of Fan Engagement</p>
            </ScrollReveal>
          </div>

          {/* Content Grid */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
            {/* Left Copy Column */}
            <div className="space-y-10 sm:space-y-14 leading-relaxed">
              <ScrollReveal>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 text-text-display">Own the Narrative. Leverage Your IQ.</h3>
                  <p className="text-sm sm:text-base text-text-secondary">
                    We&apos;re building a new kind of fantasy market—one that moves based on real sentiment, not just daily stats.
                    This is for passionate fans who want to engage with the game on a deeper level, on a platform that is
                    transparent, fair, and a true vehicle to leverage your basketball IQ.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={100}>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 text-text-display">The Paper Trading Beta</h3>
                  <p className="text-sm sm:text-base text-text-secondary">
                    To perfect our market algorithms and user experience, we are launching an exclusive paper trading beta.
                    Each founding member will start with a set amount of paper cash to trade players, master the mechanics,
                    and help us build the future.
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2 sm:mb-3 text-text-display">Join the Community. Be Part of History.</h3>
                  <p className="text-sm sm:text-base text-text-secondary">
                    This is more than just an app; it&apos;s a community. Your feedback during this phase will be invaluable.
                    As a thank you, everyone admitted to the closed beta will receive a unique badge on their profile,
                    signifying them as a <span className="font-semibold text-text-display">Founding Trader</span>, along with other
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
          <div className="mt-16 sm:mt-24">
            <SocialMediaLinks />
          </div>

          {/* Decorative Pulsing Dots */}
          <PulsingDots count={isMobile ? 5 : 8} />
        </div>
      </section>

      {/* Section 3: Wembanyama Loading Page */}
      <section className="relative h-screen w-full overflow-hidden bg-background">
        
        {/* Layer 1: Background Image - Right Aligned */}
        <div className="absolute top-0 right-0 h-full w-3/5 z-0">
          <img 
            src="/download (3).jpeg"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-right"
            loading="lazy"
          />
        </div>

        {/* Layer 2: Black Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black via-black/90 to-transparent"></div>

        {/* Layer 3: Content */}
        <div className="relative z-20 h-full w-full max-w-7xl mx-auto px-4 sm:px-8 flex flex-col justify-center">
          
          {/* Left Column: Content & CTA */}
          <div className="flex flex-col gap-5 sm:gap-6 text-center md:text-left mb-6 md:mb-0 md:max-w-[50%] lg:max-w-[520px]">
            <ScrollReveal>
              <h2 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl text-text-display leading-[0.85] tracking-[-0.015em]">
                THE FUTURE IS LOADING...
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              {/* Animated Progress Bar */}
              <div className="w-full bg-surface/30 h-2 rounded-full overflow-hidden">
                <div className="h-full bg-accent-primary rounded-full w-0 animate-progress"></div>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl text-text-primary max-w-lg mx-auto md:mx-0 leading-relaxed font-medium mt-4">
                Be the first to know when Court Share launches. Early access members receive exclusive perks and founding trader status.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={300}>
              <div className="mt-4">
                <WaitlistForm />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}