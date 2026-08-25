import React, { useState } from 'react';
import { PROJECTS } from '../../data/portfolioData';

/**
 * WorkSection
 * Desktop: Clean 5x2 grid (all 10 project cards visible in one viewport).
 * Mobile: Spacious, readable Single Project Card Presenter with numbered tabs and next/prev controls.
 */
export default function WorkSection() {
  const [mobileActiveIndex, setMobileActiveIndex] = useState(0);

  const activeProject = PROJECTS[mobileActiveIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev > 0 ? prev - 1 : PROJECTS.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setMobileActiveIndex((prev) => (prev < PROJECTS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section 
      id="work" 
      className="w-full h-full flex flex-col justify-center items-center px-4 sm:px-8 pt-16 sm:pt-24 pb-6 sm:pb-8 bg-transparent select-none overflow-hidden"
    >
      <div className="max-w-5xl mx-auto w-full my-auto flex flex-col justify-center">
        
        {/* Section Heading */}
        <div className="mb-3 sm:mb-4 lg:mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-none">
              WORK
            </h2>
            <div className="w-8 sm:w-10 h-[1px] bg-white/30 mt-1.5 sm:mt-2" />
          </div>
          <span className="font-poppins text-[10px] sm:text-xs uppercase tracking-widest text-white/40">
            {mobileActiveIndex + 1} of 10
          </span>
        </div>

        {/* 1. DESKTOP ONLY: 5 Columns x 2 Rows Grid (lg+) */}
        <div className="hidden lg:grid grid-cols-5 gap-3.5">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="group relative rounded-xl glass-panel border border-white/10 p-4 hover:border-white/30 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg min-h-[140px]"
            >
              {/* Top Row: Index & Status */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="font-serif text-lg font-bold text-white/40 group-hover:text-white transition-colors">
                  {project.id}
                </span>
                <span className="text-[9.5px] uppercase tracking-wider font-poppins text-white/40 border border-white/10 px-2 py-0.5 rounded-full">
                  SOON
                </span>
              </div>

              {/* Central Title */}
              <div>
                <h3 className="font-poppins text-xs font-semibold tracking-wide text-white mb-0.5">
                  {project.title}
                </h3>
                <span className="font-poppins text-[9.5px] uppercase tracking-widest text-white/40 block">
                  {project.status}
                </span>
              </div>

              {/* Bottom Subtle Hover Line */}
              <div className="w-0 group-hover:w-full h-[1px] bg-white/40 transition-all duration-500 mt-2" />
            </div>
          ))}
        </div>

        {/* 2. MOBILE ONLY: Spacious Single Project Card Presenter (< lg) */}
        <div className="flex lg:hidden flex-col items-center w-full">
          
          {/* Numbered Selector Tabs for Mobile */}
          <div className="flex items-center justify-center gap-1.5 w-full mb-3.5 overflow-x-auto py-1 no-scrollbar">
            {PROJECTS.map((p, idx) => (
              <button
                key={p.id}
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
                {p.id}
              </button>
            ))}
          </div>

          {/* Active Project Card Display */}
          <div 
            className="w-full rounded-2xl glass-panel border border-white/20 p-6 sm:p-8 bg-black/90 shadow-2xl flex flex-col justify-between min-h-[200px] sm:min-h-[220px] transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="font-serif text-3xl font-bold text-white/30">
                  {activeProject.id}
                </span>
                <span className="text-[10px] uppercase tracking-widest font-poppins text-white/40 border border-white/10 px-2.5 py-0.5 rounded-full">
                  Upcoming
                </span>
              </div>

              <h3 className="font-poppins text-lg sm:text-xl font-semibold tracking-wide text-white mb-1.5">
                {activeProject.title}
              </h3>

              <p className="font-poppins text-xs sm:text-sm text-white/60 tracking-wider uppercase font-medium">
                {activeProject.status}
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
                {activeProject.id} / 10
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
