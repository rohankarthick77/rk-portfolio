import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ShieldCheck, Trophy, Sparkles, MapPin, Zap } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { getAssetUrl } from '../../utils/assetPath';

export const CinematicPortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHoverSound } = useSound();

  // Interactive mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const mouseRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { damping: 25, stiffness: 220 });
  const mouseRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { damping: 25, stiffness: 220 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Continuous Scroll Motion (Smooth scrubbed spring physics)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Spring configurations for ultra-smooth physical motion
  const smoothConfig = { stiffness: 110, damping: 22, mass: 0.6 };

  // 1. Zoom into the face & reaching perspective
  const rawScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.12, 1.25]);
  const smoothScale = useSpring(rawScale, smoothConfig);

  // 2. Vertical kinetic travel tracking the reaching arm
  const rawY = useTransform(scrollYProgress, [0, 0.5, 1], [40, 0, -50]);
  const smoothY = useSpring(rawY, smoothConfig);

  // 3. Dynamic tilt following the diagonal arm gesture
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], [-2, 0, 2.5]);
  const smoothRotateZ = useSpring(rawRotateZ, smoothConfig);

  // 4. Perspective forward pitch (leans closer to user on scroll)
  const rawPitchX = useTransform(scrollYProgress, [0, 0.5, 1], [4, 0, -6]);
  const smoothPitchX = useSpring(rawPitchX, smoothConfig);

  // 5. Red Rim-Light Aura Expansion on scroll
  const rawGlowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.9]);
  const smoothGlowOpacity = useSpring(rawGlowOpacity, smoothConfig);

  const rawGlowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.15, 1.4]);
  const smoothGlowScale = useSpring(rawGlowScale, smoothConfig);

  // 6. Light sweep beam traversing from hand to face on scroll
  const lightSweepY = useTransform(scrollYProgress, [0, 1], ['120%', '-40%']);

  // Parallax offsets for floating cards
  const card1Y = useSpring(useTransform(scrollYProgress, [0, 1], [40, -60]), smoothConfig);
  const card2Y = useSpring(useTransform(scrollYProgress, [0, 1], [-30, 50]), smoothConfig);
  const card3Y = useSpring(useTransform(scrollYProgress, [0, 1], [50, -40]), smoothConfig);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:max-w-none flex items-center justify-center py-4 select-none"
      style={{ perspective: 1400 }}
    >
      {/* Scroll-Reactive Red Neon Ambient Aura */}
      <motion.div
        className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-[110px] sm:blur-[150px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #ff1e42 0%, #ff0055 45%, transparent 70%)',
          opacity: smoothGlowOpacity,
          scale: smoothGlowScale,
        }}
      />

      {/* Main 3D Card Stage with Dynamic Pitch & Tilt */}
      <motion.div
        style={{
          rotateX: mouseRotateX,
          rotateY: mouseRotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-[4/5] sm:aspect-[16/14] md:aspect-[16/13] max-w-lg sm:max-w-xl rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0a0a0f] to-[#050507] shadow-[0_35px_110px_rgba(0,0,0,0.95),0_0_70px_rgba(255,30,66,0.3)] group"
      >
        {/* Cinematic Scanline Texture */}
        <div className="absolute inset-0 scanlines opacity-20 z-10 pointer-events-none" />

        {/* Dynamic Light Sweep Beam moving across arm and face on scroll */}
        <motion.div
          style={{ top: lightSweepY }}
          className="absolute inset-x-0 h-28 bg-gradient-to-b from-transparent via-crimson/20 to-transparent z-15 pointer-events-none blur-md mix-blend-screen"
        />

        {/* THE ANIMATED REACHING PORTRAIT (Full Smooth Continuous Scroll Animation) */}
        <motion.div
          style={{
            scale: smoothScale,
            y: smoothY,
            rotateZ: smoothRotateZ,
            rotateX: smoothPitchX,
          }}
          className="absolute inset-0 h-full w-full will-change-transform transform-gpu"
        >
          <img
            src={getAssetUrl('rohan-photo.png')}
            alt="Rohan Karthick P S — Systems Architect & Creative Developer"
            className="h-full w-full object-cover object-center filter contrast-[1.1] brightness-[1.03] group-hover:contrast-120 transition-all duration-700"
          />

          {/* Vignette blending edges seamlessly into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050507]/80" />
        </motion.div>

        {/* Ambient Red Rim Light Flare */}
        <div className="absolute -left-12 top-1/4 w-36 h-72 bg-crimson/35 rounded-full blur-[55px] pointer-events-none mix-blend-screen" />

        {/* Corner Cyber Brackets */}
        <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-crimson rounded-tl z-20" />
        <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-crimson rounded-tr z-20" />
        <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-crimson rounded-bl z-20" />
        <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-crimson rounded-br z-20" />

        {/* Top Live Status Pill */}
        <div className="absolute top-5 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
            </span>
            <span className="font-bold text-white tracking-wider">ROHAN KARTHICK P S</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-crimson/20 backdrop-blur-md border border-crimson/40 font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
            <Zap className="h-3 w-3" />
            <span>KINETIC PORTRAIT</span>
          </div>
        </div>

        {/* Bottom Information Overlay */}
        <div className="absolute bottom-5 inset-x-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2 p-4 rounded-2xl bg-black/75 backdrop-blur-xl border border-white/10 font-mono text-xs">
          <div>
            <span className="text-crimson font-bold block text-[10px] uppercase tracking-widest mb-0.5">
              CS & DESIGN // B.E. 2023 – 2027
            </span>
            <h4 className="font-display text-base font-extrabold text-white">
              Bannari Amman Institute of Technology
            </h4>
          </div>
          <div className="flex items-center gap-1.5 text-neutral-400 text-[11px]">
            <MapPin className="h-3.5 w-3.5 text-cyan-400" />
            <span>Pollachi, Tamil Nadu</span>
          </div>
        </div>
      </motion.div>

      {/* Floating Glass Metric Card 1: Hackathon Winner */}
      <motion.div
        style={{ y: card1Y, translateZ: 60 }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={playHoverSound}
        className="absolute -top-4 -right-2 sm:-right-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-2xl border border-crimson/40 shadow-[0_20px_50px_rgba(255,30,66,0.35)] cursor-pointer"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/20 border border-crimson/40 text-crimson">
          <Trophy className="h-5 w-5 animate-bounce" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-crimson font-bold block">
            HACKATHON // WINNERS
          </span>
          <span className="font-display text-xs font-bold text-white block">
            Sathyabama Hackathon '26
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            Software Domain Winners
          </span>
        </div>
      </motion.div>

      {/* Floating Glass Metric Card 2: Cisco Cybersecurity */}
      <motion.div
        style={{ y: card2Y, translateZ: 50 }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={playHoverSound}
        className="absolute -bottom-6 -left-2 sm:-left-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_20px_50px_rgba(16,185,129,0.25)] cursor-pointer"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400">
          <ShieldCheck className="h-5 w-5" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-400 font-bold block">
            OFFICIAL CERTIFICATION
          </span>
          <span className="font-display text-xs font-bold text-white block">
            Cisco Cybersecurity
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            Network Defense & Systems
          </span>
        </div>
      </motion.div>

      {/* Floating Glass Metric Card 3: AcousticPulse Architecture */}
      <motion.div
        style={{ y: card3Y, translateZ: 70 }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={playHoverSound}
        className="absolute bottom-24 -right-4 sm:-right-8 z-30 hidden md:flex items-center gap-3 p-3 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-2xl border border-cyan-500/40 shadow-[0_20px_50px_rgba(6,182,212,0.25)] cursor-pointer"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-bold block">
            LEAD ARCHITECT
          </span>
          <span className="font-display text-xs font-bold text-white block">
            AcousticPulse & GIS
          </span>
        </div>
      </motion.div>
    </div>
  );
};
