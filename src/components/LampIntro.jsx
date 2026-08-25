import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LampIntro
 * Cute, friendly animated lamp with:
 * 1. Infinite RIGHT -> LEFT marquee for AMAN at top.
 * 2. Gentle hanging swing animation.
 * 3. Soft irregular eye blinking.
 * 4. Real downward drag/pull interaction (requires >= 35px drag, no click/hover activation).
 * 5. Warm, elegant amber light cone originating from the lamp base spreading downward.
 * 6. Zero "ENTER DIRECTLY" button.
 */
export default function LampIntro({ onComplete }) {
  const [isTurnedOn, setIsTurnedOn] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const audioContextRef = useRef(null);
  const speechAttemptedRef = useRef(false);
  const hasTriggeredRef = useRef(false);

  // Check for prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Synthesize a crisp mechanical switch click sound
  const playSwitchClick = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.35, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {
      // Graceful silent fallback
    }
  };

  // Speaks immediately when the lamp appears
  const speakWelcomeImmediately = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    if (speechAttemptedRef.current) return;
    speechAttemptedRef.current = true;

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("Welcome to our site. Pull my rope.");
      utterance.rate = 0.95;
      utterance.pitch = 1.15;
      utterance.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const friendlyVoice = voices.find(
        v => v.lang.includes('en') && (v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Daniel'))
      );
      if (friendlyVoice) {
        utterance.voice = friendlyVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      // Graceful fallback
    }
  };

  useEffect(() => {
    speakWelcomeImmediately();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        if (!speechAttemptedRef.current) {
          speakWelcomeImmediately();
        }
      };
    }

    // Irregular soft blinking cycle
    let blinkTimeout;
    const scheduleNextBlink = () => {
      const delay = 2200 + Math.random() * 2800; // between 2.2s and 5.0s
      blinkTimeout = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 180);
      }, delay);
    };

    if (!prefersReducedMotion) {
      scheduleNextBlink();
    }

    return () => {
      clearTimeout(blinkTimeout);
    };
  }, [prefersReducedMotion]);

  // Triggered ONLY by actual downward dragging >= 35px
  const handleRopeDragTrigger = () => {
    if (hasTriggeredRef.current || isTurnedOn) return;
    hasTriggeredRef.current = true;

    playSwitchClick();
    setIsTurnedOn(true);

    // Warm amber illumination and smooth cinematic transition into portfolio
    setTimeout(() => {
      setIsDismissed(true);
      onComplete?.();
    }, 850);
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {!isDismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-black text-white select-none overflow-hidden pointer-events-auto"
          role="dialog"
          aria-label="Welcome Introduction"
        >
          {/* 1. Top "AMAN" Infinite Right -> Left Marquee */}
          <div 
            className="w-full max-w-sm pt-6 overflow-hidden select-none pointer-events-none relative"
            style={{
              maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%)',
            }}
          >
            <div className="flex w-max animate-marquee">
              {/* Set 1 */}
              <div className="flex items-center gap-8 shrink-0 pr-8">
                {['AMAN', 'AMAN', 'AMAN', 'AMAN'].map((name, idx) => (
                  <div key={`lh-1-${idx}`} className="flex items-center gap-8">
                    <span className="font-poppins text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
                      {name}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                  </div>
                ))}
              </div>

              {/* Set 2 (Duplicate for Seamless Loop) */}
              <div className="flex items-center gap-8 shrink-0 pr-8" aria-hidden="true">
                {['AMAN', 'AMAN', 'AMAN', 'AMAN'].map((name, idx) => (
                  <div key={`lh-2-${idx}`} className="flex items-center gap-8">
                    <span className="font-poppins text-xs sm:text-sm font-semibold uppercase tracking-[0.35em] text-white/50">
                      {name}
                    </span>
                    <span className="text-white/20 text-xs">•</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Lamp Character Container with Gentle Hanging Swing */}
          <div className="relative flex flex-col items-center justify-center flex-1 w-full max-w-md px-4">
            
            {/* Hanging Cord with Pivot at Top */}
            <motion.div
              animate={prefersReducedMotion ? {} : { rotate: [-1.2, 1.2, -1.2] }}
              transition={{ repeat: Infinity, duration: 5.5, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="flex flex-col items-center"
            >
              {/* Cord */}
              <div className="w-[1.5px] h-20 sm:h-28 bg-gradient-to-b from-white/20 via-white/40 to-white/70" />

              {/* Lamp Fixture */}
              <motion.div 
                animate={isTurnedOn ? { y: -6, scale: 1.03 } : {}}
                transition={{ duration: 0.3 }}
                className="relative flex flex-col items-center -mt-1"
              >
                {/* Lamp Top Cap */}
                <div className="w-9 h-3 bg-white/70 rounded-t-sm border border-white/30" />

                {/* Cute Dome Lampshade with Friendly Face */}
                <div className="relative w-36 h-22 sm:w-42 sm:h-26 bg-gradient-to-b from-white/15 to-white/5 rounded-t-full border-t border-x border-white/30 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl overflow-hidden">
                  
                  {/* Cute Eyes & Expression */}
                  <div className="flex items-center justify-center gap-7 mt-3">
                    {/* Left Eye */}
                    <div className="relative flex flex-col items-center">
                      {isTurnedOn ? (
                        <div className="w-4 h-2.5 border-t-2 border-r-2 border-white transform -rotate-45" />
                      ) : isBlinking ? (
                        <div className="w-3.5 h-0.5 bg-white/90 rounded-full" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] relative">
                          <div className="w-1 h-1 bg-black rounded-full absolute top-0.5 right-0.5" />
                        </div>
                      )}
                    </div>

                    {/* Right Eye */}
                    <div className="relative flex flex-col items-center">
                      {isTurnedOn ? (
                        <div className="w-4 h-2.5 border-t-2 border-l-2 border-white transform rotate-45" />
                      ) : isBlinking ? (
                        <div className="w-3.5 h-0.5 bg-white/90 rounded-full" />
                      ) : (
                        <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] relative">
                          <div className="w-1 h-1 bg-black rounded-full absolute top-0.5 right-0.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cheek Accents */}
                  <div className="flex items-center justify-between w-24 mt-1.5 px-1 opacity-40">
                    <div className="w-2.5 h-1 rounded-full bg-white" />
                    <div className="w-2.5 h-1 rounded-full bg-white" />
                  </div>

                  {/* Internal Bulb */}
                  <div 
                    className={`w-7 h-7 rounded-full mt-1.5 transition-all duration-400 ${
                      isTurnedOn 
                        ? 'bg-amber-100 shadow-[0_0_60px_30px_rgba(255,170,60,0.95)]' 
                        : 'bg-white/10 border border-white/20'
                    }`} 
                  />
                </div>

                {/* Base Rim of Shade */}
                <div className="w-40 sm:w-46 h-2.5 bg-white/60 rounded-full shadow-lg border border-white/30 relative z-10" />

                {/* 5. Warm Amber Light Cone (Originating directly from Lamp Base spreading downward) */}
                <motion.div
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={isTurnedOn ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  style={{ transformOrigin: 'top center' }}
                  className="absolute top-[100%] w-[380px] sm:w-[480px] h-[380px] pointer-events-none z-0"
                >
                  {/* Amber Cone Beam */}
                  <div 
                    className="w-full h-full"
                    style={{
                      background: 'conic-gradient(from 180deg at 50% 0%, transparent 62deg, rgba(255, 140, 30, 0.12) 75deg, rgba(255, 175, 65, 0.42) 90deg, rgba(255, 140, 30, 0.12) 105deg, transparent 118deg)',
                      filter: 'blur(10px)',
                    }}
                  />
                  {/* Soft Radial Ambient Glow */}
                  <div 
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 0%, rgba(255, 160, 50, 0.45) 0%, rgba(255, 120, 20, 0.18) 45%, transparent 75%)',
                      filter: 'blur(16px)',
                    }}
                  />
                </motion.div>

                {/* 4. Hanging Rope with REAL Downward Drag / Pull Interaction */}
                <div className="relative flex flex-col items-center mt-0 z-20">
                  {/* Switch Bead */}
                  <div className="w-2 h-2 bg-white/40 rounded-full" />

                  {/* Drag-enabled Pull Cord & Handle */}
                  <motion.div
                    drag={isTurnedOn ? false : "y"}
                    dragConstraints={{ top: 0, bottom: 60 }}
                    dragElastic={0.15}
                    onDrag={(e, info) => {
                      if (info.offset.y >= 35) {
                        handleRopeDragTrigger();
                      }
                    }}
                    onDragEnd={(e, info) => {
                      if (info.offset.y >= 35) {
                        handleRopeDragTrigger();
                      }
                    }}
                    style={{ touchAction: 'none' }}
                    className="flex flex-col items-center cursor-grab active:cursor-grabbing select-none"
                    onClick={(e) => {
                      // Prevent simple click/tap from activating
                      e.stopPropagation();
                    }}
                  >
                    {/* Cord line */}
                    <div className="w-[1.5px] h-20 sm:h-24 bg-white/40 group-hover:bg-white transition-colors" />

                    {/* Pull Handle (Ball) */}
                    <div
                      aria-label="Drag and pull the rope downward to enter portfolio"
                      className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.4)] border border-white/80 -mt-1 group-hover:shadow-[0_0_25px_rgba(255,255,255,0.9)] transition-all pointer-events-auto"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-black/80" />
                    </div>
                  </motion.div>
                </div>

              </motion.div>
            </motion.div>

            {/* Instruction Banner */}
            <motion.div 
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-10 text-center pointer-events-none select-none"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/15 text-xs tracking-widest uppercase font-poppins text-white/60">
                <span>Pull rope down</span>
                <span className="inline-block animate-bounce">↓</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom spacing (No Enter Directly button) */}
          <div className="pb-8" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
