import { useState, useEffect, useRef } from 'react';

export interface MousePositionState {
  x: number;
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
  velocityX: number;
  velocityY: number;
  speed: number;
}

export function useMousePosition() {
  const [mousePos, setMousePos] = useState<MousePositionState>({
    x: 0,
    y: 0,
    normalizedX: 0,
    normalizedY: 0,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
  });

  const lastPos = useRef({ x: 0, y: 0, time: Date.now() });

  useEffect(() => {
    let animationFrameId: number = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const dt = Math.max((now - lastPos.current.time) / 1000, 0.001);
      
      const vx = (e.clientX - lastPos.current.x) / dt;
      const vy = (e.clientY - lastPos.current.y) / dt;
      const spd = Math.sqrt(vx * vx + vy * vy);

      lastPos.current = { x: e.clientX, y: e.clientY, time: now };

      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;

      setMousePos({
        x: e.clientX,
        y: e.clientY,
        normalizedX: normX,
        normalizedY: normY,
        velocityX: vx * 0.15,
        velocityY: vy * 0.15,
        speed: spd,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mousePos;
}
