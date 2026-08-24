import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorState, setCursorState] = useState<{
    type: 'default' | 'link' | 'project' | 'view' | 'explore' | 'drag' | 'sound';
    label: string;
    hidden: boolean;
  }>({
    type: 'default',
    label: '',
    hidden: true,
  });

  const [isTouch, setIsTouch] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for trailing luxury feel
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { damping: 45, stiffness: 800, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (cursorState.hidden) {
        setCursorState((prev) => ({ ...prev, hidden: false }));
      }
    };

    const handleMouseLeave = () => {
      setCursorState((prev) => ({ ...prev, hidden: true }));
    };

    const handleMouseEnter = () => {
      setCursorState((prev) => ({ ...prev, hidden: false }));
    };

    // Global event delegation for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (cursorTarget) {
        const type = (cursorTarget.getAttribute('data-cursor') || 'default') as typeof cursorState.type;
        setCursorState({
          type,
          label: customLabel || (type === 'project' ? 'EXPLORE' : type === 'view' ? 'VIEW' : type === 'drag' ? 'DRAG' : ''),
          hidden: false,
        });
        return;
      }

      if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorState({
          type: 'link',
          label: '',
          hidden: false,
        });
        return;
      }

      setCursorState({
        type: 'default',
        label: '',
        hidden: false,
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, cursorState.hidden]);

  if (isTouch) return null;

  const isExpanded = cursorState.type !== 'default';
  const hasLabel = Boolean(cursorState.label);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring / Morphing Pill */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: cursorState.hidden ? 0 : 1,
          scale: hasLabel ? 1 : isExpanded ? 1.6 : 1,
          width: hasLabel ? 'auto' : isExpanded ? 48 : 36,
          height: hasLabel ? 32 : isExpanded ? 48 : 36,
          borderRadius: hasLabel ? 16 : 9999,
          backgroundColor: hasLabel 
            ? 'rgba(255, 30, 66, 0.95)' 
            : isExpanded 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'transparent',
          borderColor: hasLabel
            ? 'rgba(255, 255, 255, 0.4)'
            : isExpanded
              ? 'rgba(255, 30, 66, 0.8)'
              : 'rgba(255, 255, 255, 0.3)',
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className={`flex items-center justify-center border backdrop-blur-[2px] transition-colors duration-200 ${
          hasLabel ? 'px-3.5 shadow-[0_0_20px_rgba(255,30,66,0.6)] text-white' : ''
        }`}
      >
        {hasLabel && (
          <span className="font-mono text-[10px] font-bold tracking-widest uppercase">
            {cursorState.label}
          </span>
        )}
      </motion.div>

      {/* Center Core Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: cursorState.hidden || hasLabel ? 0 : 1,
          scale: isExpanded ? 0.4 : 1,
        }}
        transition={{ duration: 0.15 }}
        className="h-1.5 w-1.5 rounded-full bg-crimson shadow-[0_0_10px_#ff1e42]"
      />
    </div>
  );
};
