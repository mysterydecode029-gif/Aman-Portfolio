import React, { useState } from 'react';
import { SERVICES, SECTION_QUOTES } from '../../data/portfolioData';
import QuoteMarquee from '../QuoteMarquee';

/**
 * ServicesSection
 * Desktop: Clean 3x3 compact grid (all 9 cards visible simultaneously in one viewport).
 * Mobile: Spacious, readable Single Service Card Presenter with numbered tabs and next/prev controls.
 * Features seamless motivational quote marquee under section heading.
 */
export default function ServicesSection() {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const activeService = SERVICES[mobileActiveIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev > 0 ? prev - 1 : SERVICES.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev < SERVICES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section 
      id="services" 
      className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pt-16 sm:pt-24 pb-6 sm:pb-8 bg-transparent select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Section Heading with Quote Marquee */}
        <div className="mb-3 sm:mb-4 lg:mb-5">
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
            SERVICES
          </h2>

          {/* Motivational Quote Marquee replacing static line */}
          <div className="mt-1.5 sm:mt-2">
            <QuoteMarquee quotes={SECTION_QUOTES.services} />
          </div>
        </div>

        {/* 1. DESKTOP ONLY: 3 Columns x 3 Rows Grid (lg+) */}
        <div className="hidden lg:grid grid-cols-3 gap-3.5">
          {SERVICES.map((service) => (
            <div
              key={service.id}
              className="group relative rounded-xl glass-panel border border-white/10 p-4 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Top: Index */}
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-serif text-sm font-bold text-white/40 group-hover:text-white transition-colors">
                  {service.id}
                </span>
              </div>

              {/* Service Title & Concise Body */}
              <div className="space-y-1">
                <h3 className="font-poppins text-sm font-semibold tracking-tight text-white">
                  {service.title}
                </h3>
                <p className="font-poppins text-xs text-white/60 leading-snug font-light">
                  {service.description}
                </p>
              </div>

              {/* Bottom Accent Line */}
              <div className="w-0 group-hover:w-full h-[1px] bg-white/40 transition-all duration-500 mt-2" />
            </div>
          ))}
        </div>

        {/* 2. MOBILE ONLY: Spacious Single Service Card Presenter (< lg) */}
        <div className="flex lg:hidden flex-col items-center w-full">
          
          {/* Numbered Selector Tabs for Mobile */}
          <div className="flex items-center justify-center gap-1.5 w-full mb-3.5 overflow-x-auto py-1 no-scrollbar">
            {SERVICES.map((s, idx) => (
              <button
                key={s.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setMobileActiveIndex(idx);
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-poppins font-medium transition-all cursor-pointer ${
                  mobileActiveIndex === idx
                    ? 'bg-white text-black font-semibold shadow-[0_0_10px_rgba(255,255,255,0.4)]'
                    : 'bg-white/5 text-white/50 border border-white/10 hover:text-white'
                }`}
              >
                {s.id}
              </button>
            ))}
          </div>

          {/* Active Service Card Display */}
          <div 
            className="w-full rounded-2xl glass-panel border border-white/20 p-6 sm:p-8 bg-black/90 shadow-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[220px] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-serif text-3xl font-bold text-white/30">
                  {activeService.id}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-poppins text-white/40 border border-white/10 px-2.5 py-0.5 rounded-full">
                  Discipline
                </span>
              </div>

              <h3 className="font-poppins text-lg sm:text-xl font-semibold tracking-tight text-white mb-2">
                {activeService.title}
              </h3>

              <p className="font-poppins text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                {activeService.description}
              </p>
            </div>

            {/* Next / Prev Navigation Controls for Mobile */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10 mt-4">
              <button
                onClick={handlePrev}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all font-poppins cursor-pointer"
              >
                ← Prev
              </button>
              
              <span className="font-poppins text-[10px] uppercase tracking-widest text-white/40">
                {activeService.id} / 09
              </span>

              <button
                onClick={handleNext}
                className="px-3.5 py-1.5 rounded-lg bg-white/5 border border-white/15 text-xs text-white/70 hover:text-white hover:bg-white/10 transition-all font-poppins cursor-pointer"
              >
                Next →
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
