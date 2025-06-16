'use client';

import React, { useState, useEffect } from 'react';
import PlayerHeroCard from '../components/PlayerHeroCard';
import WaitlistForm from '../components/WaitlistForm';
import SentimentPopup from '../components/SentimentPopup';
import { mockPlayerData } from '../data/mockPlayerData';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import PulsingDots from '../components/PulsingDots';
import CourtShareLogo from '../components/CourtShareLogo';
import SectionChartBackground from '../components/SectionChartBackground';
import SocialMediaLinks from '../components/SocialMediaLinks';

interface Sentiment {
  text: string;
  source: 'tweet' | 'news';
  position: string;
}

const sentiments: Sentiment[] = [
  { text: "Sources say he's in the best shape of his life.", source: 'news', position: 'top-1/4 right-1/4 sm:top-[20%] sm:right-[20%]' },
  { text: 'Another off night. Overrated.', source: 'tweet', position: 'bottom-1/4 left-1/4 sm:bottom-[20%] sm:left-[20%]' },
  { text: 'Dominant 40-point performance.', source: 'news', position: 'top-1/3 left-1/4 sm:top-[30%] sm:left-[20%]' },
  { text: 'Just hit a clutch game-winner!', source: 'tweet', position: 'bottom-1/3 right-1/4 sm:bottom-[30%] sm:right-[20%]' },
];

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const featuredPlayer = mockPlayerData.find(p => p.name === 'Luka Dončić') || mockPlayerData[4];
  const [currentSentimentIndex, setCurrentSentimentIndex] = useState(0);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [playerPrice, setPlayerPrice] = useState(featuredPlayer.price);

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

  useEffect(() => {
    const FADE_MS = 500;
    const ROTATE_MS = 4000;

    let fadeTimeout: NodeJS.Timeout;
    const rotate = () => {
      setIsPopupVisible(false);
      fadeTimeout = setTimeout(() => {
        // After fade out, update to the next sentiment
        setCurrentSentimentIndex(i => (i + 1) % sentiments.length);
        
        // Simulate price change based on sentiment with variability
        const dir = Math.random() < 0.5 ? 1 : -1;
        // Slightly bias based on source type but allow for variability
        const sourceMultiplier = sentiments[currentSentimentIndex].source === 'news' ? 
          (Math.random() > 0.7 ? -1 : 1) : (Math.random() > 0.7 ? 1 : -1);
        const priceChange = Math.random() * 5 * dir * sourceMultiplier;
        
        setPlayerPrice(prevPrice => parseFloat((prevPrice + priceChange).toFixed(2)));
        
        // Fade in the new one
        setIsPopupVisible(true);
      }, FADE_MS);
    };

    const interval = setInterval(rotate, ROTATE_MS);
    // First popup display
    fadeTimeout = setTimeout(() => setIsPopupVisible(true), FADE_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimeout);
    };
  }, [sentiments.length, currentSentimentIndex]);

  // Create multiple columns of cards for the stream effect
  const columnCount = isMobile ? 3 : 5; // Fewer columns on mobile
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
    <main className="bg-background w-full">
      {/* Section 1: New Dynamic Hero */}
      <section className="relative h-screen min-h-[800px] w-full flex flex-col items-center justify-center p-4">
        
        {/* Sentiment Popups Layer - with pointer-events-none */}
        <div className="absolute inset-0 pointer-events-none">
          {sentiments.map((sentiment, index) => (
            <div key={index} className={`absolute ${sentiment.position}`}>
              <SentimentPopup
                text={sentiment.text}
                source={sentiment.source as 'tweet' | 'news'}
                isVisible={currentSentimentIndex === index && isPopupVisible}
                role="status" 
                aria-live="polite"
              />
            </div>
          ))}
        </div>

        {/* Main Content Layer */}
        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <h1 className="font-display font-extrabold text-5xl md:text-7xl text-text-display">
            OWN THE NARRATIVE.
          </h1>

          <PlayerHeroCard
            name={featuredPlayer.name}
            photoUrl={featuredPlayer.photoUrl}
            price={playerPrice} // Use the dynamic price state
            priceChange={playerPrice - featuredPlayer.price} // Calculate change
            changePercentage={((playerPrice - featuredPlayer.price) / featuredPlayer.price) * 100}
            chartData={featuredPlayer.chartData}
            team={featuredPlayer.team || ''}
          />
          
          <div className="flex flex-col items-center gap-6 mt-4">
            <p className="text-lg md:text-xl text-text-primary max-w-2xl">
              Leverage your knowledge in the premier NBA stock market. The first platform where player values are driven by real-time market sentiment.
            </p>
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* Section 2: Streaming Player Cards */}
      <section className="relative h-screen overflow-hidden bg-background">
        <div className="absolute inset-0">
          <div className="absolute inset-0 transform rotate-[-15deg] scale-[1.1] sm:scale-[1.3]">
            {columns.map((columnData, columnIndex) => (
              <div 
                key={columnIndex} 
                className="absolute"
                style={{
                  left: `${(columnIndex / columnCount) * 100}%`,
                  top: `-${columnIndex * (isMobile ? 35 : 55)}px`,
                  width: isMobile ? '220px' : '280px', // Smaller width on mobile
                }}
              >
                <div 
                  className="animate-scroll-stream" 
                  style={{
                    animationDuration: `${80 + columnIndex * (isMobile ? 10 : 20)}s`, 
                    animationDelay: `${columnIndex * (isMobile ? 3 : 6)}s`, 
                    animationTimingFunction: 'linear', 
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)' // Force GPU acceleration
                  }}
                >
                  {/* First set of cards */}
                  {columnData.map((p) => {
                    const { _internalKey, ...playerProps } = p;
                    return (
                      <div key={_internalKey} className="mb-3 sm:mb-5 transform hover:scale-105 transition-transform duration-300">
                        <PlayerHeroCard {...playerProps} team={playerProps.team || ''} />
                      </div>
                    );
                  })}
                  
                  {/* Duplicate the cards to create a seamless loop */}
                  {columnData.map((p) => {
                    const { _internalKey, ...playerProps } = p;
                    return (
                      <div key={`dup-${_internalKey}`} className="mb-3 sm:mb-5">
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
          <div className="bg-surface/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-xl border border-border max-w-[90%] sm:max-w-md mx-auto flex flex-col items-center gap-y-4 sm:gap-y-8">
            <p className="font-display text-base sm:text-lg md:text-xl font-semibold italic tracking-widest uppercase text-accent-primary">Own the Narrative</p>
            <h1 className="font-display font-extrabold text-text-display text-4xl sm:text-5xl md:text-6xl">Court Share</h1>
            <p className="text-text-primary text-base sm:text-lg max-w-md mb-2 sm:mb-4">Join the Waitlist for Exclusive Early Access to the CourtShare Paper Trading Beta.</p>
            <WaitlistForm />
          </div>
        </div>
        {/* Fade Overlay at Bottom for Seamless Transition */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent via-background/80 to-background pointer-events-none"></div>
      </section>

      {/* Section Separator / Spacer */}
      <div className="h-16 bg-gradient-to-b from-background to-surface"></div>

      {/* Section 3: Founding Trader Section */}
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
    </main>
  );
}
