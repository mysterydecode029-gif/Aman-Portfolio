import React from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';

/**
 * AboutSection
 * Clean vertical stacking on mobile (375px, 390px, 412px) and balanced grid on desktop.
 * Displays user photograph in original natural colors and signature in identity plate.
 */
export default function AboutSection() {
  return (
    <section 
      id="about" 
      className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pt-16 sm:pt-24 pb-6 sm:pb-8 bg-transparent select-none overflow-y-auto lg:overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Section Heading — Safely separated from header */}
        <div className="mb-2 sm:mb-4 lg:mb-5">
          <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
            ABOUT
          </h2>
          <div className="w-8 sm:w-10 h-[1px] bg-white/30 mt-1.5 sm:mt-2" />
        </div>

        {/* Responsive Content Grid: Vertical stack on mobile, Side-by-side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-10 items-center">
          
          {/* Text Column: Personal Introduction & Description */}
          <div className="lg:col-span-7 space-y-2 sm:space-y-3.5">
            <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl text-white font-normal leading-snug">
              {PERSONAL_INFO.greeting}
            </h3>

            <div className="space-y-1.5 sm:space-y-2.5 font-poppins text-[11px] sm:text-xs md:text-sm text-white/75 leading-relaxed font-light">
              <p>
                {PERSONAL_INFO.bioParagraph1}
              </p>
              <p className="hidden xs:block">
                {PERSONAL_INFO.bioParagraph2}
              </p>
            </div>
          </div>

          {/* Media Column: Photograph in Original Colors & Identity Plate */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center pt-1 sm:pt-0">
            
            {/* Actual Personal Photograph in Original Natural Colors */}
            <div className="relative w-full max-w-[150px] xs:max-w-[175px] sm:max-w-[210px] aspect-[4/5] rounded-2xl overflow-hidden glass-panel border border-white/20 p-1 shadow-2xl">
              <div className="w-full h-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={PERSONAL_INFO.photoSrc}
                  alt="Aman"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Refined Rectangular Monochrome Glass-Style Identity Plate */}
            <div className="w-full max-w-[150px] xs:max-w-[175px] sm:max-w-[210px] -mt-3 z-20 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-black/95 backdrop-blur-2xl border border-white/20 shadow-[0_15px_35px_rgba(0,0,0,0.9)] flex items-center justify-between">
              <div>
                <span className="font-serif text-xs sm:text-sm font-bold text-white tracking-wider block leading-tight">
                  {PERSONAL_INFO.name}
                </span>
                <span className="font-poppins text-[8.5px] sm:text-[9.5px] text-white/60 block mt-0.5">
                  {PERSONAL_INFO.location}
                </span>
              </div>

              {/* Actual Signature Image */}
              <div className="text-right pl-2 sm:pl-3 border-l border-white/10 flex flex-col items-end">
                <img
                  src={PERSONAL_INFO.signatureSrc}
                  alt="Aman Signature"
                  className="h-5 sm:h-6.5 w-auto object-contain brightness-0 invert opacity-90"
                />
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
