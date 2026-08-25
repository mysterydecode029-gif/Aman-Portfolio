import React, { useState } from 'react';
import { NAVIGATION_LINKS, PERSONAL_INFO } from '../data/portfolioData';

/**
 * Navbar
 * Persistent monochrome glass navigation bar.
 * Clean, responsive header featuring:
 * [PHOTO] AMAN | WEB DESIGNER & DEVELOPER on top-left, and desktop pills / mobile drawer.
 */
export default function Navbar({ activeIndex, onSelectSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (idx) => {
    setMobileMenuOpen(false);
    onSelectSection(idx);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-3.5 sm:py-4 transition-all duration-300 pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Top-Left Branding: [PHOTO] AMAN | WEB DESIGNER & DEVELOPER */}
        <div 
          onClick={() => handleNavClick(0)}
          className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer select-none group min-w-0"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-white/25 bg-black p-0.5 shadow-lg group-hover:border-white/60 transition-all flex-shrink-0">
            <img
              src={PERSONAL_INFO.logoSrc}
              alt="Aman Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5 min-w-0">
            <span className="font-serif text-sm sm:text-base lg:text-lg font-bold tracking-wider text-white group-hover:text-white transition-colors flex-shrink-0">
              {PERSONAL_INFO.name}
            </span>
            <span className="text-white/30 text-xs sm:text-sm font-light flex-shrink-0">|</span>
            <span className="font-poppins text-[8.5px] xs:text-[10px] sm:text-[11px] lg:text-xs uppercase tracking-widest text-white/70 group-hover:text-white/90 transition-colors truncate">
              WEB DESIGNER & DEVELOPER
            </span>
          </div>
        </div>

        {/* Desktop Navigation Glass Pill */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-xl border border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex-shrink-0"
        >
          {NAVIGATION_LINKS.map((link, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(idx)}
                className={`relative px-4 py-1.5 text-xs uppercase tracking-widest font-poppins transition-all duration-200 rounded-full focus-visible:ring-1 focus-visible:ring-white cursor-pointer ${
                  isActive
                    ? 'text-black font-semibold bg-white shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Navigation Hamburger Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMobileMenuOpen(!mobileMenuOpen);
          }}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/15 text-white/80 hover:text-white focus:outline-none cursor-pointer flex-shrink-0"
        >
          <div className="w-4 h-3.5 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
          </div>
        </button>

      </div>

      {/* Mobile Navigation Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          onClick={(e) => e.stopPropagation()}
          className="fixed inset-x-3 top-16 z-50 p-5 rounded-2xl bg-black/95 border border-white/20 backdrop-blur-2xl md:hidden shadow-2xl flex flex-col gap-2.5 animate-fade-in"
        >
          {NAVIGATION_LINKS.map((link, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(idx)}
                className={`text-left py-2.5 px-4 rounded-xl text-xs uppercase tracking-widest font-poppins transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white text-black font-semibold'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
