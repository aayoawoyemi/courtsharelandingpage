'use client';

import React, { useEffect, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import PlayerHeroCard from './PlayerHeroCard';
import { mockPlayerData } from '../data/mockPlayerData';

export default function PlayerCarousel() {
  const [prefersReduced, setPrefersReduced] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReduced(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      duration: prefersReduced ? 60 : 30,
      startIndex: 0,
      skipSnaps: true
    },
    [Autoplay({ delay: prefersReduced ? 6000 : 4000, stopOnInteraction: false })]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="embla overflow-hidden" ref={emblaRef}>
      <div className="embla__container flex">
        {mockPlayerData.map((player, index) => {
          const isActive = index === selectedIndex;
          return (
            <div 
              key={index} 
              className={`embla__slide flex-none w-full flex justify-center transition-all duration-1000 ease-out ${
                isActive 
                  ? 'opacity-100 scale-100 blur-0 brightness-100' 
                  : 'opacity-20 scale-90 blur-sm brightness-75'
              }`}
              style={{
                transform: isActive 
                  ? 'translateY(0px) rotateY(0deg) translateX(0px)' 
                  : 'translateY(8px) rotateY(2deg) translateX(-8px)',
                filter: isActive 
                  ? 'saturate(1) contrast(1)' 
                  : 'saturate(0.7) contrast(0.8)',
                transition: 'all 1000ms cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <PlayerHeroCard
                name={player.name}
                photoUrl={player.photoUrl}
                price={player.price}
                priceChange={player.priceChange}
                changePercentage={player.changePercentage}
                chartData={player.chartData}
                team={player.team || ''}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
} 