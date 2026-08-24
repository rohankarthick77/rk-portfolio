import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'counting' | 'revealing' | 'exiting' | 'done'>('counting');

  useEffect(() => {
    // Smooth, realistic loading ramp
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('revealing');
          setTimeout(() => {
            setStage('exiting');
            setTimeout(() => {
              setStage('done');
              onComplete();
            }, 800);
          }, 600);
          return 100;
        }
        // Organic acceleration curve
        const step = prev < 30 ? 2 : prev < 70 ? 4 : prev < 90 ? 2 : 1;
        return Math.min(prev + step, 100);
      });
    }, 28);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'done' && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[10000] flex flex-col justify-between bg-canvas px-6 py-10 md:px-16 md:py-14 select-none overflow-hidden"
        >
          {/* Subtle Cybernetic Grid Background */}
          <div className="absolute inset-0 scanlines opacity-40 pointer-events-none" />

          {/* Top Metadata Header */}
          <div className="relative z-10 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-neutral-500">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-crimson animate-pulse" />
              <span>INITIALIZING SYSTEM // RK-2026</span>
            </div>
            <div className="hidden sm:block">
              <span>WARMTH // KINETIC ENGINE v4.8</span>
            </div>
            <div>
              <span>CHENNAI // GLOBAL [22:27 IST]</span>
            </div>
          </div>

          {/* Center Stage: Monumental Typography */}
          <div className="relative z-10 my-auto text-center">
            {/* Main Name Mask */}
            <div className="overflow-hidden mb-2">
              <motion.h1
                initial={{ y: 80, filter: 'blur(12px)', opacity: 0 }}
                animate={{ y: 0, filter: 'blur(0px)', opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight text-[#f4f4f8] leading-none"
              >
                ROHAN KARTHICK
              </motion.h1>
            </div>

            {/* Subtitle Stagger */}
            <div className="overflow-hidden flex justify-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-3 font-mono text-xs sm:text-sm tracking-[0.25em] text-neutral-400 uppercase"
              >
                <span className="text-crimson font-bold">CREATIVE DEVELOPER</span>
                <span className="text-neutral-700">/</span>
                <span>DESIGNER</span>
                <span className="text-neutral-700">/</span>
                <span>SYSTEMS BUILDER</span>
              </motion.div>
            </div>

            {/* Scanning Laser Beam */}
            <div className="relative mt-8 mx-auto w-48 sm:w-80 h-[1px] bg-neutral-800 overflow-hidden">
              <motion.div
                style={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-transparent via-crimson to-white shadow-[0_0_12px_#ff1e42]"
              />
            </div>
          </div>

          {/* Bottom Progress & Diagnostic Telemetry */}
          <div className="relative z-10 flex items-end justify-between font-mono">
            <div className="text-xs text-neutral-500 max-w-xs hidden sm:block">
              <p className="leading-relaxed">
                Loading WebGL shader pipelines, kinetic typography matrices & spatial acoustics.
              </p>
            </div>

            <div className="flex items-baseline gap-2">
              <motion.span
                className="font-display text-5xl sm:text-7xl font-bold tracking-tighter text-white"
              >
                {progress.toString().padStart(2, '0')}
              </motion.span>
              <span className="text-sm font-bold text-crimson">%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
