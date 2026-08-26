import React, { useEffect, useRef } from 'react';

/**
 * CodeCanvasBackground
 * Original main-website binary 0/1 vertical falling-code animation.
 * 
 * Features:
 * 1. Features 0 and 1 characters flowing vertically from TOP to BOTTOM.
 * 2. Calm, relaxed speeds (0.16 - 0.52 px/frame) with fading trails.
 * 3. Subtle monochrome palette (black, dark gray, medium gray, soft light gray).
 * 4. ABSOLUTELY NO GREEN.
 * 5. Positioned as the global background layer behind main website sections (z-[1]).
 */
export default function CodeCanvasBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Original binary characters 0 and 1
    const chars = ['0', '1'];

    const isMobile = width < 768;
    const fontSize = isMobile ? 12 : 14;
    const colSpacing = isMobile ? 22 : 24;
    let numCols = Math.floor(width / colSpacing);

    // Initialize continuous streams with calm, relaxed speeds
    const initStream = (initialScatter = false) => {
      const streamLength = 12 + Math.floor(Math.random() * 22); // 12 - 34 characters long
      const speed = 0.16 + Math.random() * 0.36; // calm, relaxed downward flow (~0.16 - 0.52)
      const startY = initialScatter
        ? Math.random() * (height / fontSize + streamLength) - streamLength
        : -streamLength - Math.random() * 15;

      return {
        y: startY,
        speed,
        length: streamLength,
        chars: Array.from({ length: streamLength }, () => chars[Math.floor(Math.random() * chars.length)]),
        mutationTimer: 0,
        mutationThreshold: 16 + Math.floor(Math.random() * 30),
      };
    };

    let streams = Array.from({ length: numCols }, () => initStream(true));

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      numCols = Math.floor(width / colSpacing);
      streams = Array.from({ length: numCols }, () => initStream(true));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.font = `${fontSize}px 'Poppins', monospace`;
      ctx.textAlign = 'center';

      for (let c = 0; c < streams.length; c++) {
        const stream = streams[c];
        const x = c * colSpacing + colSpacing / 2;

        // Advance stream vertically at calm speed
        stream.y += stream.speed;

        // Mutate random character in stream for live subtle flicker
        stream.mutationTimer++;
        if (stream.mutationTimer > stream.mutationThreshold) {
          const randIdx = Math.floor(Math.random() * stream.length);
          stream.chars[randIdx] = chars[Math.floor(Math.random() * chars.length)];
          stream.mutationTimer = 0;
        }

        // Draw each 0/1 character in the vertical stream
        for (let i = 0; i < stream.length; i++) {
          const charY = (stream.y - i) * fontSize;

          // Only render visible characters
          if (charY > -fontSize && charY < height + fontSize) {
            let opacity;
            let grayValue;

            if (i === 0) {
              // Leading character: crisp, noticeable light gray highlight
              opacity = 0.26;
              grayValue = 240;
            } else if (i < 4) {
              // Upper body: medium light gray
              opacity = 0.18 - i * 0.02;
              grayValue = 200;
            } else {
              // Fading tail: smooth gradual fade down to 0.02
              const tailProgress = (i - 4) / (stream.length - 4);
              opacity = Math.max(0.02, 0.12 * (1 - tailProgress));
              grayValue = 160;
            }

            ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${opacity})`;
            ctx.fillText(stream.chars[i] || '0', x, charY);
          }
        }

        // Recycle stream once its tail exits the bottom of the viewport
        if ((stream.y - stream.length) * fontSize > height) {
          streams[c] = initStream(false);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
