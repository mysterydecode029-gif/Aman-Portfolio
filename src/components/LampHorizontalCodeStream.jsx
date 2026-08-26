import React, { useEffect, useRef } from 'react';

/**
 * LampHorizontalCodeStream
 * Subtle, continuous HORIZONTAL (Right -> Left) hacker/terminal code stream animation
 * designed exclusively for the cute hanging lamp intro screen.
 * 
 * Features:
 * 1. Horizontal movement from RIGHT to LEFT.
 * 2. Multi-tier horizontal code lines at varying vertical positions.
 * 3. 60-70% visual intensity with layered monochrome brightness (white, light gray, dark gray).
 * 4. ABSOLUTELY NO GREEN.
 * 5. Seamless infinite looping with high-DPI retina rendering.
 * 6. Full prefers-reduced-motion accessibility support.
 */
export default function LampHorizontalCodeStream() {
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

    // Code snippet generators with realistic hacker/terminal syntax & character sets
    const codeSnippets = [
      'const sys = { core: 0x7F, buffer: [1, 0, 1, 1], state: "READY", key: "0xAF_92" }; // SYS_INIT',
      'function compileKernel(stream, mask) { return (stream ^ 0x3E) << 2; } /* PROTOCOL_V4 */',
      'import { socket, dispatch, cipher } from "sys.runtime"; if (socket.active) { syncBuffer(); }',
      '01001001 01001110 01010100 01010010 01001111 // 0x8F92 : { port: 8080, status: 200 }',
      'while (stream.active) { buffer.push(chars[idx++ % 32]); renderPipeline(); } // KERNEL_OK',
      'export const HASH_MAP = { a: 0x1, b: 0x2, x: 0x9, z: 0xF, checksum: "SHA256_ACTIVE" };',
      'matrix.transform({ scale: 1.0, rotate: 0.0, alpha: 0.65 }); // STREAM_SYNC_09 [OK]',
      '<Kernel.Node id="x09" cipher="AES_GCM" debug={false} latency="0.12ms" queue={8} />',
      '{ header: 0xFF, payload: "STREAM_DATA_SYNC", auth: true, timestamp: 1771987200 }',
      'const runtime = async () => { await loadModules(["crypto", "render", "io"]); };',
      '01100001 01101101 01100001 01101110 // AMAN.SYS // BUFFER_STREAM [STATUS: ONLINE]',
      'for (let i = 0; i < 64; i++) { chunk[i] = (raw[i] & 0x0F) | (seed >> 4); }',
    ];

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

    const isMobile = width < 768;
    const fontSize = isMobile ? 11 : 13;
    const rowSpacing = isMobile ? 38 : 46;
    const numRows = Math.floor(height / rowSpacing);

    // Initialize horizontal stream rows
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      const text = codeSnippets[i % codeSnippets.length] + '   ✦   ' + codeSnippets[(i + 4) % codeSnippets.length] + '   ✦   ';
      ctx.font = `500 ${fontSize}px 'Courier New', 'Fira Code', monospace`;
      const textMetrics = ctx.measureText(text);
      const textWidth = Math.max(textMetrics.width, width * 1.2);

      rows.push({
        y: (i + 0.8) * rowSpacing,
        text,
        textWidth,
        x: Math.random() * textWidth, // scattered initial horizontal offset
        speed: 0.45 + (i % 4) * 0.22 + Math.random() * 0.25, // steady, varied right-to-left speeds
        opacity: 0.55 + (i % 3) * 0.07, // 60-70% visual intensity target
      });
    }

    const handleResize = () => {
      setupCanvas();
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.font = `500 ${fontSize}px 'Courier New', 'Fira Code', monospace`;
      ctx.textBaseline = 'middle';

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Move horizontally from RIGHT to LEFT
        row.x -= row.speed;

        // Wrap seamlessly once one full block passes
        if (row.x <= -row.textWidth) {
          row.x += row.textWidth;
        }

        ctx.fillStyle = `rgba(220, 220, 220, ${row.opacity})`;

        // Draw primary string and adjacent duplicate for 100% seamless wrap
        ctx.fillText(row.text, row.x, row.y);
        ctx.fillText(row.text, row.x + row.textWidth, row.y);
        if (row.x + row.textWidth < width) {
          ctx.fillText(row.text, row.x + row.textWidth * 2, row.y);
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
