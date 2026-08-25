import React from 'react';
import { PROCESS_STAGES } from '../../data/portfolioData';

/**
 * ProcessSection
 * Desktop: Clean 5-column progression grid.
 * Mobile: Clean, readable vertical sequence of the 5 stages.
 */
export default function ProcessSection() {
  return (
    <section 
      id="process" 
      className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pt-16 sm:pt-24 pb-6 sm:pb-8 bg-transparent select-none overflow-y-auto lg:overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="mb-3 sm:mb-4 lg:mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
              PROCESS
            </h2>
            <div className="w-8 sm:w-10 h-[1px] bg-white/30 mt-1.5 sm:mt-2" />
          </div>
          <span className="font-poppins text-[10px] sm:text-xs uppercase tracking-widest text-white/40">
            5 Stages
          </span>
        </div>

        {/* 1. DESKTOP ONLY: 5-Column Grid (lg+) */}
        <div className="hidden lg:grid grid-cols-5 gap-3.5">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="group relative rounded-xl glass-panel border border-white/10 p-4 flex flex-col justify-between hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-serif text-lg font-bold text-white/40 group-hover:text-white transition-colors">
                    {stage.step}
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full bg-white/30 group-hover:bg-white transition-all" />
                </div>

                <h3 className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide mb-1">
                  {stage.title}
                </h3>
                
                <p className="font-poppins text-[11px] text-white/70 font-light leading-relaxed mb-2">
                  {stage.summary}
                </p>
              </div>

              {/* Step Detail */}
              <div className="pt-2 border-t border-white/5 text-[10px] font-poppins text-white/50 leading-relaxed font-light">
                {stage.detail}
              </div>
            </div>
          ))}
        </div>

        {/* 2. MOBILE ONLY: Clean Vertical Sequence (< lg) */}
        <div className="flex lg:hidden flex-col gap-2 w-full">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.step}
              className="rounded-xl glass-panel border border-white/15 p-3 sm:p-3.5 bg-black/80 flex items-center justify-between gap-3 shadow-md"
            >
              <div className="flex items-center gap-3">
                <span className="font-serif text-base sm:text-lg font-bold text-white/40 w-6">
                  {stage.step}
                </span>
                <div>
                  <h3 className="font-poppins text-xs sm:text-sm font-semibold text-white tracking-wide">
                    {stage.title}
                  </h3>
                  <p className="font-poppins text-[10px] sm:text-[11px] text-white/60 font-light leading-tight mt-0.5">
                    {stage.summary}
                  </p>
                </div>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/30 flex-shrink-0" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
