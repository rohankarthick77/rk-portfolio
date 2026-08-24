import React from 'react';
import { ArrowUp, MapPin } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const Footer: React.FC = () => {
  const { playHoverSound, playClickSound } = useSound();

  const scrollToTop = () => {
    playClickSound();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative w-full bg-canvas-deep py-12 px-4 sm:px-8 md:px-16 border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 font-mono text-xs text-neutral-400">
        {/* Left Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-crimson" />
            <span className="font-display text-base font-bold text-white tracking-tight">
              ROHAN KARTHICK P S
            </span>
          </div>
          <span className="text-[11px] text-neutral-500">
            BANNARI AMMAN INSTITUTE OF TECHNOLOGY // CS & DESIGN '27
          </span>
        </div>

        {/* Center Live Availability Badge */}
        <div className="flex items-center gap-2 bg-white/[0.03] border border-white/10 px-4 py-2 rounded-full text-neutral-300">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px]">
            POLLACHI / ERODE, TN • WINNER SATHYABAMA HACKATHON '26
          </span>
        </div>

        {/* Right Controls & Scroll to Top */}
        <div className="flex items-center gap-6">
          <span className="text-neutral-500">
            © {new Date().getFullYear()} ROHAN KARTHICK P S
          </span>

          <button
            onClick={scrollToTop}
            onMouseEnter={playHoverSound}
            aria-label="Elevator to top of page"
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-white/5 hover:bg-crimson border border-white/10 hover:border-crimson text-neutral-300 hover:text-white transition-all duration-300"
          >
            <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
