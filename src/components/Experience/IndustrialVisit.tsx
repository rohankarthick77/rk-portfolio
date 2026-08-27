import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Plane, Building2, Cpu, Award, Sparkles, MapPin, ZoomIn, X, CheckCircle2, ChevronRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { getAssetUrl } from '../../utils/assetPath';

interface VisitPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  description: string;
  accent: string;
  glow: string;
}

const VISIT_PHOTOS: VisitPhoto[] = [
  {
    id: 'apu-atrium',
    src: getAssetUrl('apu-campus-atrium.jpg'),
    title: 'Iconic Multi-Tier Campus Atrium',
    category: 'Global Campus Architecture',
    description: 'The futuristic central atrium of Asia Pacific University of Technology & Innovation (APU), Kuala Lumpur, decorated with flags from over 130 nations representing a vibrant global technology community.',
    accent: '#ff1e42',
    glow: 'rgba(255,30,66,0.45)',
  },
  {
    id: 'apu-logo',
    src: getAssetUrl('apu-logo-wall.jpg'),
    title: 'APU Technology & Innovation Headquarters',
    category: 'Institutional Accreditation',
    description: 'The official emblem and global certification registry at APU, recognized as one of Malaysia’s highest-rated Premier Digital Tech Institutions.',
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.45)',
  },
  {
    id: 'apu-lab',
    src: getAssetUrl('apu-tech-lab-daikin.jpg'),
    title: 'Daikin Collaboration Research Center',
    category: 'IoT & Systems Engineering',
    description: 'Interactive session inside APU’s advanced research laboratories exploring smart HVAC telemetry, IoT sensor integration, and industrial automation.',
    accent: '#00f0ff',
    glow: 'rgba(0,240,255,0.45)',
  },
  {
    id: 'apu-seminar',
    src: getAssetUrl('apu-seminar-presentation.jpg'),
    title: 'Academic Keynote & Global Tech Ecosystem',
    category: 'Knowledge Exchange',
    description: 'Delegation seminar delving into international software architectures, research methodologies, and technological development frameworks.',
    accent: '#a855f7',
    glow: 'rgba(168,85,247,0.45)',
  },
  {
    id: 'apu-delegation',
    src: getAssetUrl('apu-delegation-discussion.jpg'),
    title: 'Industry Delegation & Faculty Interaction',
    category: 'Technical Discourse',
    description: 'Engaging in technical dialogue with international faculty and engineering researchers regarding industry standards, computer science, and software paradigms.',
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.45)',
  },
];

const HIGHLIGHTS = [
  {
    icon: Globe,
    title: 'Global Academic Immersion',
    desc: 'Engaged with international faculty at APU Malaysia, experiencing world-class research facilities and diverse software engineering perspectives.',
    accent: 'text-crimson',
    border: 'border-crimson/30',
    bg: 'bg-crimson/10',
  },
  {
    icon: Cpu,
    title: 'Advanced Tech & IoT Labs',
    desc: 'Explored specialized Industry 4.0 centers, including Daikin IoT testbeds and smart system telemetry infrastructure.',
    accent: 'text-cyan-400',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
  },
  {
    icon: Building2,
    title: 'Cross-Border Tech Culture',
    desc: 'Gained firsthand exposure to Southeast Asia’s booming digital technology hub and international software innovation practices.',
    accent: 'text-amber-400',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
  },
];

export const IndustrialVisit: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<VisitPhoto | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound } = useSound();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20 });
  const yParallax = useTransform(smoothProgress, [0, 1], [40, -40]);

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Lighting */}
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-crimson/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <Plane className="h-4 w-4 text-crimson animate-pulse" />
              <span className="text-crimson font-bold">INTERNATIONAL DELEGATION //</span>
              <span className="uppercase tracking-widest text-neutral-200">GLOBAL EXPOSURE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Asia Pacific University <span className="text-crimson">(APU)</span>
            </h2>
            <div className="flex items-center gap-2 mt-2 font-mono text-xs sm:text-sm text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-cyan-400" />
              <span>Kuala Lumpur, Malaysia • Industrial Immersion</span>
            </div>
          </div>

          <p className="max-w-md font-sans text-sm text-neutral-300 leading-relaxed">
            International academic visit to Malaysia’s premier digital technology institution, exploring Industry 4.0 research, IoT testbeds, and global software engineering culture.
          </p>
        </div>

        {/* 3 Key Takeaways Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
                onMouseEnter={playHoverSound}
                className={`p-6 rounded-3xl bg-surface-elevated/80 border ${item.border} backdrop-blur-xl hover:scale-[1.02] transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]`}
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.bg} ${item.accent} mb-4`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Gallery Showcase Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-crimson font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>VISUAL DOCUMENTATION // 5 FRAMES</span>
            </span>
            <span className="font-mono text-[11px] text-neutral-500 hidden sm:inline">
              CLICK ANY IMAGE TO ENLARGE & INSPECT DETAILS
            </span>
          </div>

          {/* Dynamic Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Main Featured Photo (Campus Atrium) - Span 7 */}
            <motion.div
              style={{ y: yParallax }}
              onClick={() => { playClickSound(); setSelectedPhoto(VISIT_PHOTOS[0]); }}
              onMouseEnter={playHoverSound}
              className="md:col-span-7 group relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-[0_20px_60px_rgba(255,30,66,0.2)]"
            >
              <img
                src={VISIT_PHOTOS[0].src}
                alt={VISIT_PHOTOS[0].title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-crimson/30 backdrop-blur-md border border-crimson/50 font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                {VISIT_PHOTOS[0].category}
              </div>

              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20">
                  <ZoomIn className="h-4 w-4" />
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 p-2">
                <h4 className="font-display text-xl sm:text-2xl font-extrabold text-white mb-1 group-hover:text-crimson transition-colors">
                  {VISIT_PHOTOS[0].title}
                </h4>
                <p className="font-sans text-xs text-neutral-300 line-clamp-2">{VISIT_PHOTOS[0].description}</p>
              </div>
            </motion.div>

            {/* Photo 2: APU Headquarters Logo - Span 5 */}
            <motion.div
              onClick={() => { playClickSound(); setSelectedPhoto(VISIT_PHOTOS[1]); }}
              onMouseEnter={playHoverSound}
              className="md:col-span-5 group relative aspect-[16/10] md:aspect-auto rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-[0_20px_60px_rgba(245,158,11,0.15)]"
            >
              <img
                src={VISIT_PHOTOS[1].src}
                alt={VISIT_PHOTOS[1].title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-amber-500/20 backdrop-blur-md border border-amber-500/40 font-mono text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                {VISIT_PHOTOS[1].category}
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-10 p-2">
                <h4 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {VISIT_PHOTOS[1].title}
                </h4>
              </div>
            </motion.div>

            {/* Remaining 3 Photos in 3 Equal Columns */}
            {VISIT_PHOTOS.slice(2).map((photo) => (
              <motion.div
                key={photo.id}
                onClick={() => { playClickSound(); setSelectedPhoto(photo); }}
                onMouseEnter={playHoverSound}
                className="md:col-span-4 group relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.7)]"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 font-mono text-[10px] text-neutral-300 uppercase tracking-wider">
                  {photo.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-10 p-2">
                  <h4 className="font-display text-base font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {photo.title}
                  </h4>
                  <p className="font-sans text-xs text-neutral-400 line-clamp-1">{photo.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-[#0d0d14] border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.9)]"
            >
              <div className="aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black">
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 border-t border-white/10">
                <div className="flex flex-wrap items-center gap-2 mb-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-crimson/20 border border-crimson/40 text-crimson font-bold uppercase tracking-wider">
                    {selectedPhoto.category}
                  </span>
                  <span className="text-neutral-400">Asia Pacific University, Malaysia</span>
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mb-3">
                  {selectedPhoto.title}
                </h3>
                <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
