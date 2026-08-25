import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDownRight, Sparkles, Terminal, Layers, Trophy, MapPin, Zap, ShieldCheck, Waves, ArrowUpRight } from 'lucide-react';
import { HeroCanvas } from './HeroCanvas';
import { CinematicPortrait } from './CinematicPortrait';
import { useMousePosition } from '../../hooks/useMousePosition';
import { useScrambleText } from '../../hooks/useScrambleText';
import { useSound } from '../../context/SoundContext';

const FIRST_NAME = 'ROHAN';
const LAST_NAME = 'KARTHICK';

const CAPABILITIES = [
  { num: '#01', label: 'Spatial Noise Analytics' },
  { num: '#02', label: 'Network Socket Telemetry' },
  { num: '#03', label: 'Full-Stack Architecture' },
  { num: '#04', label: 'Cybersecurity Defense' },
];

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMousePosition();
  const { playHoverSound, playClickSound } = useSound();
  const { displayText: subtitleText } = useScrambleText('COMPUTER SCIENCE & DESIGN // FULL-STACK DEVELOPER', 22, true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 0.75], [0, 60]);

  // Subtle 3D tilt calculation
  const rotateX = mouse.normalizedY * -3;
  const rotateY = mouse.normalizedX * 4;

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden pt-28 pb-12 px-4 sm:px-8 md:px-16"
      style={{ perspective: 1200 }}
    >
      {/* 3D WebGL Three.js Spatial Decibel Core */}
      <HeroCanvas mouse={{ normalizedX: mouse.normalizedX, normalizedY: mouse.normalizedY }} />

      {/* Top Ambient HUD / Status Line */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs text-neutral-400 max-w-7xl mx-auto w-full"
      >
        {/* Status Pill */}
        <div className="flex items-center gap-3 bg-white/[0.04] border border-white/10 px-4 py-2 rounded-full backdrop-blur-xl shadow-[0_0_25px_rgba(255,30,66,0.2)]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-crimson" />
          </span>
          <span className="text-xs font-bold text-neutral-200 tracking-wider">
            ROHAN KARTHICK P S // BIT '27
          </span>
        </div>

        {/* Top Right Badges: Hackathon Winner & Cisco Certified */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/40 px-3.5 py-1.5 rounded-full backdrop-blur-xl text-emerald-400 font-mono text-[11px] font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>CISCO CYBERSECURITY CERTIFIED</span>
          </div>

          <div className="flex items-center gap-2 bg-crimson/15 border border-crimson/40 px-3.5 py-1.5 rounded-full backdrop-blur-xl text-crimson font-mono text-[11px] font-bold shadow-[0_0_20px_rgba(255,30,66,0.25)]">
            <Trophy className="h-3.5 w-3.5 animate-bounce" />
            <span>WINNER // SATHYABAMA HACKATHON '26</span>
          </div>
        </div>
      </motion.div>

      {/* Main Hero Showcase */}
      <motion.div
        style={{
          opacity: heroOpacity,
          scale: heroScale,
          y: heroY,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 my-auto max-w-7xl mx-auto w-full select-none pointer-events-auto py-4 sm:py-6"
      >
        {/* Scramble Tagline & 3D Meaning HUD */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3 sm:mb-4">
          <div className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold tracking-[0.2em] text-crimson uppercase">
            <Zap className="h-4 w-4 animate-pulse text-crimson" />
            <span>{subtitleText}</span>
          </div>

          {/* Meaning of the 3D Sphere Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 font-mono text-[10px] text-neutral-400">
            <Waves className="h-3 w-3 text-cyan-400 animate-pulse" />
            <span>3D CORE: SPATIAL ACOUSTIC DECIBEL & CYBER NETWORK SIMULATION</span>
          </div>
        </div>

        {/* Monumental Typography: ROHAN */}
        <div className="overflow-hidden">
          <h1 className="font-display text-[15vw] sm:text-[12vw] md:text-[10vw] font-black tracking-tighter text-[#f8f8fa] leading-[0.88] flex">
            {FIRST_NAME.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.9,
                  delay: 0.1 + index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{
                  y: -12,
                  color: '#ff1e42',
                  transition: { duration: 0.2 },
                }}
                onMouseEnter={playHoverSound}
                className="inline-block transition-colors cursor-default"
              >
                {char}
              </motion.span>
            ))}
          </h1>
        </div>

        {/* Monumental Typography: KARTHICK P S (Single Row, No Wrap) */}
        <div className="overflow-hidden">
          <div className="flex items-baseline gap-0">
            <h1 className="font-display text-[15vw] sm:text-[12vw] md:text-[10vw] font-black tracking-tighter leading-[0.88] flex text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-500">
              {LAST_NAME.split('').map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.9,
                    delay: 0.28 + index * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  whileHover={{
                    y: -12,
                    color: '#ff2d55',
                    transition: { duration: 0.2 },
                  }}
                  onMouseEnter={playHoverSound}
                  className="inline-block transition-colors cursor-default"
                >
                  {char}
                </motion.span>
              ))}
            </h1>
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.95, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-[10vw] sm:text-[8vw] md:text-[6.5vw] font-extrabold text-crimson ml-3 sm:ml-5 tracking-tight leading-none self-end pb-1 shrink-0"
            >
              P S
            </motion.span>
          </div>
        </div>

        {/* Lower Main Stage: Editorial Bio + Animated Reaching Portrait Presentation */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-6 sm:pt-8 border-t border-white/10">
          {/* Left Column: Narrative, CTA & Capabilities */}
          <div className="lg:col-span-6 space-y-6 text-center sm:text-left">
            <p className="font-sans text-base sm:text-lg text-neutral-200 leading-relaxed">
              Pursuing Computer Science and Design at <span className="text-white font-bold">Bannari Amman Institute of Technology</span>. Engineering real-time spatial GIS mapping dashboards, Leaflet analytics engines, Node.js & Express backends, and Python telemetry systems.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-2">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  playClickSound();
                  document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
                data-cursor="explore"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-crimson text-white font-mono text-xs uppercase tracking-wider font-bold overflow-hidden shadow-[0_0_35px_rgba(255,30,66,0.5)] transition-transform duration-300 hover:scale-105"
              >
                <span className="relative z-10">EXPLORE ACOUSTICPULSE & WORKS</span>
                <ArrowDownRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </a>

              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  playClickSound();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                onMouseEnter={playHoverSound}
                data-cursor="link"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/[0.04] border border-white/15 text-neutral-200 font-mono text-xs uppercase tracking-wider hover:bg-white/10 hover:border-white/30 transition-all duration-300"
              >
                <span>ACADEMIC PROFILE</span>
              </a>
            </div>

            {/* Editorial Capabilities Bar (Inspired by Studio References) */}
            <div className="grid grid-cols-2 gap-2.5 pt-6 border-t border-white/10">
              {CAPABILITIES.map((cap, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-[11px] text-neutral-300"
                >
                  <span className="text-crimson font-bold">{cap.num}</span>
                  <span className="truncate">{cap.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Cinematic Animated Reaching Portrait */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <CinematicPortrait />
          </div>
        </div>
      </motion.div>

      {/* Bottom Kinetic Scroll Cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="relative z-10 flex items-center justify-between font-mono text-[11px] text-neutral-500 max-w-7xl mx-auto w-full pt-6 border-t border-white/5"
      >
        <span className="tracking-widest uppercase">SCROLL DOWN TO INSPECT WORKS</span>
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-crimson" />
          <span className="tracking-wider uppercase">BANNARI AMMAN INSTITUTE OF TECHNOLOGY</span>
        </div>
      </motion.div>
    </section>
  );
};
