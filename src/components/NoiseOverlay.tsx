import React, { useEffect, useRef } from 'react';

export const NoiseOverlay: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = 256);
    const height = (canvas.height = 256);

    const imgData = ctx.createImageData(width, height);
    const buffer = new Uint32Array(imgData.data.buffer);

    let frame = 0;
    const render = () => {
      frame++;
      // Render every 2 frames for performance & authentic grain flicker
      if (frame % 2 === 0) {
        const len = buffer.length;
        for (let i = 0; i < len; i++) {
          const noise = (Math.random() * 255) | 0;
          // Alpha channel ~ 12-16 out of 255 (ultra-subtle ~ 5-6% opacity)
          buffer[i] = (15 << 24) | (noise << 16) | (noise << 8) | noise;
        }
        ctx.putImageData(imgData, 0, 0);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Dynamic grain canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-40 mix-blend-overlay"
        style={{
          backgroundRepeat: 'repeat',
        }}
      />
      {/* Cinema vignette & ambient lighting */}
      <div 
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,7,0.4)_70%,rgba(5,5,7,0.85)_100%)]"
      />
    </>
  );
};
