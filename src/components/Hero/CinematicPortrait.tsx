import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ShieldCheck, Trophy, Sparkles, MapPin, Code2, Terminal, ArrowUpRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { getAssetUrl } from '../../utils/assetPath';

export const CinematicPortrait: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound } = useSound();

  // Mouse tilt tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { damping: 25, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { damping: 25, stiffness: 200 });
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['30%', '70%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['30%', '70%']);

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

  // Scroll parallax & reaching hand depth transformation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Reaching pose optical zoom & dynamic perspective
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.08, 1.16]);
  const imageY = useTransform(scrollYProgress, [0, 1], [20, -30]);
  const handZ = useTransform(scrollYProgress, [0, 0.6], [0, 30]);

  // Floating metric cards parallax offsets
  const card1Y = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const card2Y = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const card3Y = useTransform(scrollYProgress, [0, 1], [40, -30]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-xl mx-auto lg:max-w-none flex items-center justify-center py-4 select-none"
      style={{ perspective: 1200 }}
    >
      {/* Dynamic Red Neon Ambient Glow Behind Silhouette */}
      <motion.div
        className="absolute w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full blur-[100px] sm:blur-[140px] pointer-events-none opacity-40 sm:opacity-55"
        style={{
          background: 'radial-gradient(circle, #ff1e42 0%, #ff0055 40%, transparent 70%)',
          left: glowX,
          top: glowY,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* Main 3D Card Stage */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-[4/5] sm:aspect-[16/14] md:aspect-[16/13] max-w-lg sm:max-w-xl rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#0a0a0f] to-[#050507] shadow-[0_30px_100px_rgba(0,0,0,0.9),0_0_60px_rgba(255,30,66,0.25)] group"
      >
        {/* Subtle Cyber Grid & Laser Scan Overlay */}
        <div className="absolute inset-0 scanlines opacity-25 z-10 pointer-events-none" />

        {/* The Reaching Hand Portrait (Deep Perspective Zoom on Scroll) */}
        <motion.div
          style={{
            scale: imageScale,
            y: imageY,
            z: handZ,
          }}
          className="absolute inset-0 h-full w-full will-change-transform"
        >
          <img
            src={getAssetUrl('rohan-photo.png')}
            alt="Rohan Karthick P S — Systems Architect & Creative Developer"
            className="h-full w-full object-cover object-center filter contrast-[1.08] brightness-[1.02] group-hover:contrast-115 transition-all duration-700"
          />

          {/* Seamless bottom & edge vignette blending into pure canvas */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-85" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-[#050507]/80" />
        </motion.div>

        {/* Ambient Red Rim Light Flares */}
        <div className="absolute -left-10 top-1/4 w-32 h-64 bg-crimson/30 rounded-full blur-[50px] pointer-events-none mix-blend-screen" />

        {/* Corner Cyber Accents */}
        <div className="absolute top-4 left-4 h-4 w-4 border-t-2 border-l-2 border-crimson rounded-tl z-20" />
        <div className="absolute top-4 right-4 h-4 w-4 border-t-2 border-r-2 border-crimson rounded-tr z-20" />
        <div className="absolute bottom-4 left-4 h-4 w-4 border-b-2 border-l-2 border-crimson rounded-bl z-20" />
        <div className="absolute bottom-4 right-4 h-4 w-4 border-b-2 border-r-2 border-crimson rounded-br z-20" />

        {/* Top Status Header inside image */}
        <div className="absolute top-5 inset-x-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 font-mono text-[10px] text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson" />
            </span>
            <span className="font-bold text-white tracking-wider">ROHAN KARTHICK P S</span>
          </div>

          <div className="px-3 py-1 rounded-full bg-crimson/20 backdrop-blur-md border border-crimson/40 font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
            LIVE // ONLINE
          </div>
        </div>

        {/* Bottom Editorial Caption */}
        <div className="absolute bottom-5 inset-x-6 z-20 flex flex-col sm:flex-row sm:items-end justify-between gap-2 p-4 rounded-2xl bg-black/70 backdrop-blur-xl border border-white/10 font-mono text-xs">
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

      {/* Floating 3D Frosted Glass Metric Badge 1: Sathyabama Winner (Top Right) */}
      <motion.div
        style={{ y: card1Y, translateZ: 60 }}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        onMouseEnter={playHoverSound}
        className="absolute -top-4 -right-2 sm:-right-6 z-30 hidden sm:flex items-center gap-3 p-3.5 rounded-2xl bg-[#0e0e14]/90 backdrop-blur-2xl border border-crimson/40 shadow-[0_20px_50px_rgba(255,30,66,0.3)] cursor-pointer"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-crimson/20 border border-crimson/40 text-crimson">
          <Trophy className="h-5 w-5 animate-bounce" />
        </div>
        <div>
          <span className="font-mono text-[9px] uppercase tracking-widest text-crimson font-bold block">
            1ST PLACE // WINNER
          </span>
          <span className="font-display text-xs font-bold text-white block">
            Sathyabama Hackathon '26
          </span>
          <span className="font-mono text-[9px] text-neutral-400">
            Software Domain Winner
          </span>
        </div>
      </motion.div>

      {/* Floating 3D Frosted Glass Metric Badge 2: Cisco Cybersecurity (Bottom Left) */}
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

      {/* Floating 3D Frosted Glass Metric Badge 3: AcousticPulse Architecture (Bottom Right) */}
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
