import React from 'react';

/**
 * QuoteMarquee
 * Reusable, seamless infinite horizontal quote ticker.
 * Moves continuously from RIGHT to LEFT with zero jump or gap.
 * Styled in the monochrome Aman Portfolio visual language with subtle "✦" separators.
 */
export default function QuoteMarquee({ quotes, className = '' }) {
  if (!quotes || quotes.length === 0) return null;

  return (
    <div 
      className={`w-full overflow-hidden py-1 pointer-events-none select-none relative ${className}`}
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}
    >
      <div className="flex w-max animate-quote-marquee">
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8">
          {quotes.map((quote, idx) => (
            <div key={`q1-${idx}`} className="flex items-center gap-6 sm:gap-8">
              <span className="font-poppins text-[9.5px] sm:text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50 font-light whitespace-nowrap">
                {quote}
              </span>
              <span className="text-white/20 text-[9px] select-none">✦</span>
            </div>
          ))}
        </div>

        {/* Track 2 (Duplicate for Seamless Infinite Loop) */}
        <div className="flex items-center gap-6 sm:gap-8 shrink-0 pr-6 sm:pr-8" aria-hidden="true">
          {quotes.map((quote, idx) => (
            <div key={`q2-${idx}`} className="flex items-center gap-6 sm:gap-8">
              <span className="font-poppins text-[9.5px] sm:text-[10.5px] md:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/50 font-light whitespace-nowrap">
                {quote}
              </span>
              <span className="text-white/20 text-[9px] select-none">✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
