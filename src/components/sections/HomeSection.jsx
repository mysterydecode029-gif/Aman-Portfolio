import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

/**
 * HomeSection
 * Minimal, restrained typography hero.
 * Features:
 * 1. Prominent static "AMAN" title.
 * 2. Continuous, seamless infinite horizontal marquee for "WEB DESIGNER & DEVELOPER".
 * 3. Continuous, seamless infinite horizontal marquee for "SCROLL DOWN ↓".
 */
export default function HomeSection() {
  const marqueeItems = [
    PERSONAL_INFO.title,
    PERSONAL_INFO.title,
    PERSONAL_INFO.title,
    PERSONAL_INFO.title,
  ];

  const scrollItems = [
    'SCROLL DOWN',
    'SCROLL DOWN',
    'SCROLL DOWN',
    'SCROLL DOWN',
  ];

  return (
    <section 
      id="home"
      className="w-full h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 pt-16 sm:pt-20 pb-6 sm:pb-8 bg-transparent select-none overflow-hidden"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center my-auto w-full px-2">
        
        {/* Central Primary Identity — Static, majestic editorial serif */}
        <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10.5rem] font-bold tracking-tight text-white leading-none mb-4 sm:mb-6 select-none">
          {PERSONAL_INFO.name}
        </h1>

        {/* 1. Continuous Seamless Infinite Horizontal Marquee for Subtitle */}
        <div 
          className="w-full max-w-sm xs:max-w-md sm:max-w-xl lg:max-w-2xl overflow-hidden py-1 pointer-events-none select-none relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-marquee">
            {/* Track 1 */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
              {marqueeItems.map((item, idx) => (
                <div key={`m1-${idx}`} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-poppins text-[11px] sm:text-xs md:text-sm lg:text-base uppercase tracking-ultra text-white/80 font-medium whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-white/30 text-xs sm:text-sm select-none">/</span>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for Seamless Loop) */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
              {marqueeItems.map((item, idx) => (
                <div key={`m2-${idx}`} className="flex items-center gap-6 sm:gap-8">
                  <span className="font-poppins text-[11px] sm:text-xs md:text-sm lg:text-base uppercase tracking-ultra text-white/80 font-medium whitespace-nowrap">
                    {item}
                  </span>
                  <span className="text-white/30 text-xs sm:text-sm select-none">/</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Continuous Seamless Infinite Horizontal Marquee for SCROLL DOWN ↓ */}
        <div 
          className="w-full max-w-xs xs:max-w-sm sm:max-w-md overflow-hidden py-1 mt-3 sm:mt-4 pointer-events-none select-none relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          }}
        >
          <div className="flex w-max animate-marquee-slow">
            {/* Track 1 */}
            <div className="flex items-center gap-5 sm:gap-7 shrink-0 pr-5 sm:pr-7">
              {scrollItems.map((item, idx) => (
                <div key={`s1-${idx}`} className="flex items-center gap-5 sm:gap-7">
                  <span className="font-poppins text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-white/60 font-light whitespace-nowrap flex items-center gap-1.5">
                    <span>{item}</span>
                    <span className="text-white text-[11px] sm:text-xs font-normal">↓</span>
                  </span>
                  <span className="text-white/20 text-[9px] select-none">•</span>
                </div>
              ))}
            </div>

            {/* Track 2 (Duplicate for Seamless Loop) */}
            <div className="flex items-center gap-5 sm:gap-7 shrink-0 pr-5 sm:pr-7" aria-hidden="true">
              {scrollItems.map((item, idx) => (
                <div key={`s2-${idx}`} className="flex items-center gap-5 sm:gap-7">
                  <span className="font-poppins text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.25em] text-white/60 font-light whitespace-nowrap flex items-center gap-1.5">
                    <span>{item}</span>
                    <span className="text-white text-[11px] sm:text-xs font-normal">↓</span>
                  </span>
                  <span className="text-white/20 text-[9px] select-none">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
