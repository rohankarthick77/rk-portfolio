import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react';
import { useSound } from '../context/SoundContext';
import { getAssetUrl } from '../utils/assetPath';

const NAV_LINKS = [
  { name: 'Works', href: '#work', label: '01' },
  { name: 'About & Edu', href: '#about', label: '02' },
  { name: 'Skills', href: '#skills', label: '03' },
  { name: 'Terminal', href: '#terminal', label: '04' },
  { name: 'Telemetry', href: '#telemetry', label: '05' },
  { name: 'APU Visit', href: '#experience', label: '06' },
  { name: 'Frames', href: '#photography', label: '07' },
  { name: 'Awards', href: '#achievements', label: '08' },
  { name: 'Contact', href: '#contact', label: '09' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [timeString, setTimeString] = useState('');
  const { isMuted, toggleMute, playHoverSound, playClickSound, playSwitchSound } = useSound();

  // Local IST Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeString(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  // Scroll listener for floating header state and active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 60);

      const sections = ['work', 'about', 'skills', 'terminal', 'telemetry', 'experience', 'photography', 'achievements', 'contact'];
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.4) {
            setActiveSection(section);
            break;
          }
        }
      }
      if (scrollY < 300) {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    playClickSound();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 sm:py-4'
            : 'py-6 sm:py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <nav
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled
                ? 'bg-canvas/75 backdrop-blur-xl border border-white/10 px-4 sm:px-6 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
                : 'bg-transparent'
            }`}
          >
            {/* Logo with User Avatar */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              onMouseEnter={playHoverSound}
              className="group flex items-center gap-2.5"
            >
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full overflow-hidden border border-white/15 transition-transform duration-300 group-hover:scale-105 group-hover:border-crimson">
                <img
                  src={getAssetUrl('rohan-photo.png')}
                  alt="Rohan"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-sm font-bold tracking-tight text-white group-hover:text-crimson transition-colors">
                  ROHAN KARTHICK
                </span>
                <span className="font-mono text-[9px] text-neutral-400 tracking-wider hidden sm:block">
                  CS & DESIGN // BIT '27
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.href.replace('#', '');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    onMouseEnter={playHoverSound}
                    className={`relative px-3 py-1.5 font-mono text-xs font-medium tracking-wider uppercase transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute inset-0 rounded-full bg-white/[0.08] border border-crimson/40"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <span className="text-[9px] text-crimson font-mono opacity-80">{link.label}</span>
                      <span>{link.name}</span>
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Right Controls: IST Clock, Sound Toggle, Mobile Hamburger */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Live IST Clock */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5 font-mono text-[11px] text-neutral-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>IST {timeString || '22:27'}</span>
              </div>

              {/* Sound Synthesizer Mute Toggle */}
              <button
                onClick={() => {
                  playSwitchSound();
                  toggleMute();
                }}
                onMouseEnter={playHoverSound}
                aria-label={isMuted ? 'Unmute Audio Experience' : 'Mute Audio Experience'}
                data-cursor="sound"
                className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono transition-all duration-300 ${
                  !isMuted
                    ? 'border-crimson/60 bg-crimson/10 text-white shadow-[0_0_15px_rgba(255,30,66,0.3)]'
                    : 'border-white/10 bg-white/[0.03] text-neutral-400 hover:text-white'
                }`}
              >
                {!isMuted ? (
                  <>
                    <Volume2 className="h-3.5 w-3.5 text-crimson" />
                    <span className="hidden sm:inline text-[10px] tracking-wider uppercase text-crimson font-bold">
                      SOUND ON
                    </span>
                    <div className="flex items-end gap-0.5 h-3">
                      <span className="w-0.5 bg-crimson animate-[pulse_0.6s_ease-in-out_infinite] h-2.5" />
                      <span className="w-0.5 bg-crimson animate-[pulse_0.9s_ease-in-out_infinite] h-3.5" />
                      <span className="w-0.5 bg-crimson animate-[pulse_0.4s_ease-in-out_infinite] h-1.5" />
                    </div>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-3.5 w-3.5 text-neutral-400" />
                    <span className="hidden sm:inline text-[10px] tracking-wider uppercase">
                      MUTE
                    </span>
                  </>
                )}
              </button>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => {
                  playClickSound();
                  setIsMobileMenuOpen((prev) => !prev);
                }}
                aria-label="Toggle Navigation Menu"
                className="md:hidden flex h-9 w-9 items-center justify-center rounded-full bg-white/10 border border-white/15 text-white"
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Full-Screen Cinematic Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-canvas/95 backdrop-blur-2xl px-6 py-28 md:hidden overflow-y-auto"
          >
            <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

            <div className="relative z-10 flex flex-col gap-6">
              <span className="font-mono text-xs text-crimson tracking-widest uppercase">
                // NAVIGATION MATRIX
              </span>
              <div className="flex flex-col gap-4">
                {NAV_LINKS.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="group flex items-baseline justify-between border-b border-white/10 pb-3"
                  >
                    <div className="flex items-baseline gap-4">
                      <span className="font-mono text-xs text-crimson font-bold">{link.label}</span>
                      <span className="font-display text-3xl font-extrabold text-white group-hover:text-crimson transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <ArrowUpRight className="h-5 w-5 text-neutral-500 group-hover:text-crimson transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="relative z-10 pt-8 flex flex-col gap-4 font-mono text-xs text-neutral-400 border-t border-white/10">
              <div className="flex justify-between">
                <span>EDUCATION</span>
                <span className="text-white">B.E. CS & Design (BIT '27)</span>
              </div>
              <div className="flex justify-between">
                <span>LOCATION</span>
                <span className="text-emerald-400 font-bold">POLLACHI / ERODE, TN</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
