'use client';

import React, { useState, useEffect } from 'react';
import PlayerCarousel from '../components/PlayerCarousel';
import WaitlistForm from '../components/WaitlistForm';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import SectionChartBackground from '../components/SectionChartBackground';
import CourtShareLogo from '../components/CourtShareLogo';
import SocialMediaLinks from '../components/SocialMediaLinks';
import PulsingDots from '../components/PulsingDots';
import CustomVideoPlayer from '../components/CustomVideoPlayer';

// Scroll Arrow Component
const ScrollArrow = () => (
  <div className="absolute bottom-8 left-0 right-0 flex justify-center z-30 animate-bounce-slow">
    <div className="h-12 w-6 flex justify-center">
      <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path 
          d="M12 2L12 33M12 33L22 23M12 33L2 23" 
          stroke="#00b3b0" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

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
        
        {/* Scroll indicator */}
        <ScrollArrow />
      </section>

      {/* Section Separator / Spacer */}
      <div className="h-16 bg-gradient-to-b from-background to-surface"></div>

      {/* Section 3: Future is Loading with CourtShare Beta Challenge */}
      <section className="relative min-h-screen w-full flex items-center">
        {/* Background Image: Victor Wembanyama */}
        <div className="absolute top-0 right-0 h-full w-full md:w-3/5 lg:w-1/2">
          <img 
            src="/download (3).jpeg" 
            alt="An atmospheric photo of Victor Wembanyama"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/70 to-black"></div>
        </div>

        {/* Left-Aligned Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-16">
          <div className="max-w-xl">
            <ScrollReveal>
              {/* Main Headline */}
              <h2 className="font-display font-extrabold text-6xl md:text-8xl text-text-display leading-tight">
                THE FUTURE IS LOADING...
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={100}>
              {/* Sub-headline */}
              <h3 className="font-display font-bold text-3xl md:text-4xl text-text-primary mt-12 whitespace-nowrap">
                Introducing: Own the Off-Season Challenge
              </h3>
            </ScrollReveal>
            
            <ScrollReveal delay={150}>
              {/* Explanatory Paragraph */}
              <p className="mt-4 text-lg text-text-secondary max-w-lg">
                This is your chance to prove your basketball IQ during the most speculative time of the year. The challenge is simple: build the most valuable portfolio by trading on the narratives, rumors, and hype of the NBA Draft, Free Agency, and Summer League.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              {/* Game Plan Section */}
              <div className="mt-12 space-y-6">
                <h4 className="font-bold text-xl text-text-display mb-4">Here&apos;s the game plan:</h4>
                
                {/* Step 1 */}
                <div>
                  <h5 className="font-display font-bold text-lg text-accent-primary">1. Your Stake</h5>
                  <p className="text-text-secondary">Every member of the Founding Trader cohort will receive $1,000 in paper trading cash to get started.</p>
                </div>
                
                {/* Step 2 */}
                <div>
                  <h5 className="font-display font-bold text-lg text-accent-primary">2. The Timeline</h5>
                  <p className="text-text-secondary">The challenge officially kicks off on NBA Draft Night (June 26th) and will run through the entire off-season with monthly competitive sprints.</p>
                </div>

                {/* Step 3 */}
                <div>
                  <h5 className="font-display font-bold text-lg text-accent-primary">3. The Goal</h5>
                  <p className="text-text-secondary">Climb the leaderboard, earn your permanent &quot;Founding Trader&quot; badge, and help shape the future of the platform.</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              {/* Final Details and Link */}
              <div className="mt-12 border-t border-gray-800 pt-6">
                <p className="text-text-secondary">
                  Full details, rules, and live discussion will be shared exclusively in our private Discord community.
                </p>
                <div className="inline-block mt-4 text-lg text-accent-primary font-bold hover:text-accent-primary/80 transition-colors cursor-pointer">
                  See the Briefing & Get Your Invite →
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <ScrollArrow />
      </section>

      {/* Section 5: The Future is Now with Email CTA */}
      <section className="bg-black min-h-screen w-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
        {/* Main content container */}
        <div className="w-full max-w-4xl">
          <ScrollReveal>
            {/* Headline */}
            <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-text-display mb-12 whitespace-nowrap">
                THE FUTURE IS <span className="text-accent-primary inline-block">NOW</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            {/* Custom Video Player */}
            <div className="mb-12 shadow-2xl rounded-xl border border-gray-800">
                <CustomVideoPlayer src="/tiktok 2.mp4" />
                <div className="text-center mt-3">
                  <p className="text-xs text-text-secondary/80 italic">
                    Video courtesy of <a href="https://www.tiktok.com/@ballgamebagle" target="_blank" rel="noopener noreferrer" className="underline hover:text-accent-primary transition-colors">ballgamebagel</a>
                  </p>
                </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            {/* Final CTA Section */}
            <div className="w-full max-w-lg mx-auto">
                <p className="text-lg text-text-primary mb-6">
                    Join the exclusive community of Founding Traders and be part of the evolution of NBA fandom.
                </p>
                <WaitlistForm />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founding Trader Section */}
      <section className="relative bg-background text-text-primary py-20 sm:py-32 px-4 sm:px-6 md:px-16 overflow-hidden">
        <SectionChartBackground opacity="opacity-20 sm:opacity-30" />
        <div className="relative z-10">
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

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16">
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

            <div className="flex items-center justify-center">
              <ScrollReveal delay={150}>
                <CourtShareLogo />
              </ScrollReveal>
            </div>
          </div>

          <div className="mt-16 sm:mt-24">
            <SocialMediaLinks />
          </div>

          <PulsingDots count={isMobile ? 5 : 8} />
        </div>
      </section>
    </main>
  );
}