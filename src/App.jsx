import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LampIntro from './components/LampIntro';
import CodeCanvasBackground from './components/CodeCanvasBackground';
import Navbar from './components/Navbar';
import HomeSection from './components/sections/HomeSection';
import AboutSection from './components/sections/AboutSection';
import WorkSection from './components/sections/WorkSection';
import ServicesSection from './components/sections/ServicesSection';
import ProcessSection from './components/sections/ProcessSection';
import ContactSection from './components/sections/ContactSection';

const SECTIONS = [
  { id: 'home', Component: HomeSection },
  { id: 'about', Component: AboutSection },
  { id: 'work', Component: WorkSection },
  { id: 'services', Component: ServicesSection },
  { id: 'process', Component: ProcessSection },
  { id: 'contact', Component: ContactSection },
];

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle'); // 'idle' | 'covering' | 'revealing'
  const isTransitioningRef = useRef(false);
  const touchStartYRef = useRef(0);

  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const goToSection = useCallback((newIndex) => {
    if (isTransitioningRef.current) return;
    if (newIndex === currentIndex || newIndex < 0 || newIndex >= SECTIONS.length) return;

    isTransitioningRef.current = true;

    // Instant / short transition for reduced motion
    if (prefersReducedMotion) {
      setCurrentIndex(newIndex);
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 150);
      return;
    }

    // Step 1: Trigger Circular Transition Expansion (0ms - 450ms)
    setIsTransitioning(true);
    setTransitionPhase('covering');

    // Step 2: At full coverage (450ms), switch the section under the circular curtain
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setTransitionPhase('revealing');
    }, 450);

    // Step 3: Transition completes (950ms), reset curtain and release lock
    setTimeout(() => {
      setIsTransitioning(false);
      setTransitionPhase('idle');
      isTransitioningRef.current = false;
    }, 950);
  }, [currentIndex, prefersReducedMotion]);

  useEffect(() => {
    // Wheel Listener (1 Gesture = 1 Section, Debounced)
    const handleWheel = (e) => {
      if (isTransitioningRef.current) return;
      if (Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        if (currentIndex < SECTIONS.length - 1) {
          goToSection(currentIndex + 1);
        }
      } else {
        if (currentIndex > 0) {
          goToSection(currentIndex - 1);
        }
      }
    };

    // Keyboard Navigation
    const handleKeyDown = (e) => {
      if (isTransitioningRef.current) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentIndex < SECTIONS.length - 1) {
          goToSection(currentIndex + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentIndex > 0) {
          goToSection(currentIndex - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSection(SECTIONS.length - 1);
      }
    };

    // Mobile / Tablet Touch Swipe
    const handleTouchStart = (e) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isTransitioningRef.current) return;
      const touchEndY = e.changedTouches[0].clientY;
      const diffY = touchStartYRef.current - touchEndY;

      if (Math.abs(diffY) < 40) return;

      if (diffY > 0) {
        if (currentIndex < SECTIONS.length - 1) {
          goToSection(currentIndex + 1);
        }
      } else {
        if (currentIndex > 0) {
          goToSection(currentIndex - 1);
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentIndex, goToSection]);

  const CurrentComponent = SECTIONS[currentIndex].Component;

  return (
    <div className="relative w-full h-[100dvh] bg-black text-white font-poppins selection:bg-white selection:text-black overflow-hidden select-none">
      
      {/* Interactive Cute Lamp Intro Experience (Appears on every open, z-50) */}
      <LampIntro />

      {/* Live 0/1 Code Animation Canvas for Main Website (z-[1]) */}
      <CodeCanvasBackground />

      {/* Persistent Header (z-40) */}
      <Navbar 
        activeIndex={currentIndex} 
        onSelectSection={(idx) => goToSection(idx)} 
      />

      {/* Cinematic Circular Page Transition Layer (z-30) */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 pointer-events-none z-30 flex items-center justify-center overflow-hidden">
            <motion.div
              key="circular-transition-disc"
              initial={{ scale: 0, opacity: 0.95 }}
              animate={
                transitionPhase === 'covering'
                  ? {
                      scale: 2.8,
                      opacity: 1,
                      transition: {
                        duration: 0.45,
                        ease: [0.76, 0, 0.24, 1], // Requested smooth cubic-bezier easing
                      },
                    }
                  : {
                      scale: 3.8,
                      opacity: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.76, 0, 0.24, 1],
                      },
                    }
              }
              exit={{ opacity: 0 }}
              className="w-[100vmax] h-[100vmax] rounded-full bg-black border border-white/20 shadow-[0_0_120px_rgba(0,0,0,1)]"
            />
          </div>
        )}
      </AnimatePresence>

      {/* Controlled Full-Screen Active Section Viewport (z-10) */}
      <main className="relative z-10 w-full h-full overflow-hidden bg-transparent pointer-events-auto">
        <div key={SECTIONS[currentIndex].id} className="w-full h-full bg-transparent overflow-hidden">
          <CurrentComponent />
        </div>
      </main>

    </div>
  );
}
