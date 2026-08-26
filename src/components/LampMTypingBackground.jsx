import React, { useEffect, useRef } from 'react';

/**
 * LampMTypingBackground
 * Subtle, continuous hacker-style typing/flow animation created EXCLUSIVELY with the single capital letter "M".
 * 
 * Tuned to exact specifications:
 * 1. Noticeably slower, calm, smooth continuous motion.
 * 2. Clearly recognizable "M" characters with 65-70% visual intensity/opacity.
 * 3. Slightly larger font size (13px mobile / 15px desktop) for clear letter definition.
 * 4. Left-to-Right typing progression wave that triggers Top-to-Bottom vertical flow of "M" characters.
 * 5. Strictly monochrome (white, soft light gray, medium gray) — ABSOLUTELY NO GREEN.
 * 6. Scoped exclusively to the cute hanging lamp intro page.
 */
export default function LampMTypingBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = width < 768;
    const fontSize = isMobile ? 13 : 15;
    const colSpacing = isMobile ? 22 : 26;
    let numCols = Math.floor(width / colSpacing);

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    setupCanvas();

    // Horizontal left-to-right typing scan wave tracker (calm, steady speed)
    let typingScanX = 0;
    const scanSpeed = isMobile ? 1.8 : 2.4; // smooth, relaxed left-to-right typing scan

    // Create stream structure for each column
    const initColumnStream = (colIndex, initialScatter = false) => {
      const streamLength = 10 + Math.floor(Math.random() * 14); // 10 - 24 M characters
      const speed = 0.18 + Math.random() * 0.22; // noticeably slower, calm downward flow
      const opacityScale = 0.92 + Math.random() * 0.16; // 65-70% visual intensity
      const startY = initialScatter
        ? Math.random() * (height / fontSize + streamLength) - streamLength
        : -streamLength - Math.random() * 8;

      return {
        colIndex,
        x: colIndex * colSpacing + colSpacing / 2,
        y: startY,
        speed,
        length: streamLength,
        opacityScale,
        isActive: initialScatter,
      };
    };

    let columns = Array.from({ length: numCols }, (_, i) => initColumnStream(i, true));

    const handleResize = () => {
      setupCanvas();
      numCols = Math.floor(width / colSpacing);
      columns = Array.from({ length: numCols }, (_, i) => initColumnStream(i, true));
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Advance Left-to-Right typing progression wave
      typingScanX += scanSpeed;
      if (typingScanX > width + 120) {
        typingScanX = 0;
      }

      ctx.font = `700 ${fontSize}px 'Courier New', 'Fira Code', monospace`;
      ctx.textAlign = 'center';

      for (let c = 0; c < columns.length; c++) {
        const stream = columns[c];

        // Activate / re-trigger stream as the Left-to-Right typing wave sweeps across its X position
        if (!stream.isActive && typingScanX >= stream.x && typingScanX <= stream.x + scanSpeed * 2) {
          stream.isActive = true;
          stream.y = 0;
        }

        if (!stream.isActive) continue;

        // Flow Top-to-Bottom at calm, relaxed speed
        stream.y += stream.speed;

        // Draw the vertical stream of clearly visible capital 'M' characters
        for (let i = 0; i < stream.length; i++) {
          const charY = (stream.y - i) * fontSize;

          if (charY > -fontSize && charY < height + fontSize) {
            let opacity;
            let grayValue;

            if (i === 0) {
              // Leading newly typed M: bright crisp white highlight (~70% intensity)
              opacity = 0.70 * stream.opacityScale;
              grayValue = 255;
            } else if (i < 4) {
              // Upper stream body: clear light gray (~66-68% intensity)
              opacity = (0.68 - i * 0.015) * stream.opacityScale;
              grayValue = 235;
            } else {
              // Fading stream tail: soft gray (~45-55% intensity)
              const tailProgress = (i - 4) / (stream.length - 4);
              opacity = Math.max(0.30, 0.58 * (1 - tailProgress * 0.55)) * stream.opacityScale;
              grayValue = 200;
            }

            ctx.fillStyle = `rgba(${grayValue}, ${grayValue}, ${grayValue}, ${Math.min(0.72, opacity)})`;
            ctx.fillText('M', stream.x, charY);
          }
        }

        // Reset stream once it exits the bottom of the viewport; ready for next left-to-right scan
        if ((stream.y - stream.length) * fontSize > height) {
          columns[c] = initColumnStream(c, false);
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
      className="absolute inset-0 pointer-events-none z-0 w-full h-full overflow-hidden select-none"
      aria-hidden="true"
    />
  );
}
