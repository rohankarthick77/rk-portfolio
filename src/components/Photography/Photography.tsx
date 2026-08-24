import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Aperture, X, ZoomIn, Camera } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface Photo {
  id: string;
  src: string;
  title: string;
  genre: string;
  location: string;
  description: string;
  accent: string;
  glow: string;
  overlay: string;
  tags: string[];
  mood: string;
}

const photos: Photo[] = [
  {
    id: 'monkeys',
    src: '/photo-monkeys.jpg',
    title: 'Jungle Vigil',
    genre: 'Wildlife & Nature',
    location: 'South India',
    description:
      'Two bonnet macaques rest together on ancient mossy roots inside a dense forest. The dappled amber light carves through the canopy, rendering their fur in rich gold and the foliage in deep cathedral green — a moment of quiet connection frozen in time.',
    accent: '#c17f2a',
    glow: 'rgba(193,127,42,0.55)',
    overlay: 'from-[#1a1200]/95 via-[#1a1200]/60 to-transparent',
    tags: ['Wildlife', 'Macro Moment', 'Forest', 'Golden Hour', 'Natural Light'],
    mood: 'EARTHY · WARM · INTIMATE',
  },
  {
    id: 'portrait',
    src: '/photo-portrait.jpg',
    title: 'Weight of Years',
    genre: 'Portraiture',
    location: 'Tamil Nadu',
    description:
      'A silver-haired man gazes into a distant horizon, the high-contrast monochromatic treatment stripping away all distraction. Every furrow in his face tells a story — an editorial portrait study in character, stillness, and time.',
    accent: '#d0d0d0',
    glow: 'rgba(200,200,200,0.45)',
    overlay: 'from-[#0a0a0a]/95 via-[#0a0a0a]/55 to-transparent',
    tags: ['Portrait', 'Black & White', 'Character Study', 'Editorial', 'Moody'],
    mood: 'MONOCHROMATIC · TIMELESS · CONTEMPLATIVE',
  },
  {
    id: 'rain-dog',
    src: '/photo-rain-dog.jpg',
    title: 'Waiting for the Rain',
    genre: 'Street Photography',
    location: 'Urban India',
    description:
      'A drenched street dog sits stoically in a monsoon downpour, a crimson umbrella blazing in the background bokeh. The cold blue-teal of wet asphalt and the single punch of red create a street composition of raw emotion and perfect contrast.',
    accent: '#0d7fa8',
    glow: 'rgba(13,127,168,0.55)',
    overlay: 'from-[#000d1a]/95 via-[#000d1a]/55 to-transparent',
    tags: ['Street', 'Monsoon', 'Bokeh', 'Emotion', 'Urban'],
    mood: 'CINEMATIC BLUE · RAW · EMOTIONAL',
  },
  {
    id: 'creative',
    src: '/photo-creative.jpg',
    title: 'Upside-Down Sunshine',
    genre: 'Creative / Experimental',
    location: 'Tamil Nadu',
    description:
      'An inverted close-up portrait bathed in warm afternoon sunlight. The unconventional angle and the interplay of shadow and golden light across the face turn an ordinary moment into a playful, editorial-quality composition full of joy and energy.',
    accent: '#f0a030',
    glow: 'rgba(240,160,48,0.5)',
    overlay: 'from-[#1a0d00]/95 via-[#1a0d00]/55 to-transparent',
    tags: ['Creative', 'Experimental', 'Close-up', 'Warm Light', 'Joyful'],
    mood: 'GOLDEN · PLAYFUL · EXPERIMENTAL',
  },
];

const PhotoCard: React.FC<{
  photo: Photo;
  index: number;
  onOpen: (p: Photo) => void;
}> = ({ photo, index, onOpen }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 50 : -50, index % 2 === 0 ? -50 : 50]);
  const { playHoverSound, playClickSound } = useSound();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1.1, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className="group relative cursor-pointer"
      onClick={() => { playClickSound(); onOpen(photo); }}
      onMouseEnter={playHoverSound}
      data-cursor="explore"
    >
      <div
        className="relative overflow-hidden rounded-2xl aspect-[2/3]"
        style={{ boxShadow: '0 30px 80px -20px ' + photo.glow }}
      >
        <motion.div className="absolute inset-[-10%] h-[120%] w-[120%]" style={{ y }}>
          <img
            src={photo.src}
            alt={photo.title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </motion.div>

        <div className={'absolute inset-0 bg-gradient-to-t ' + photo.overlay} />

        <div className="absolute top-4 left-4 z-10">
          <span
            className="px-3 py-1 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold"
            style={{ backgroundColor: photo.accent + '25', border: '1px solid ' + photo.accent + '60', color: photo.accent }}
          >
            {photo.genre}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md"
            style={{ backgroundColor: photo.accent + '30', border: '1px solid ' + photo.accent + '80' }}
          >
            <ZoomIn className="h-4 w-4" style={{ color: photo.accent }} />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 p-5 translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <p className="font-mono text-[9px] uppercase tracking-widest mb-1 font-bold" style={{ color: photo.accent }}>
            {photo.mood}
          </p>
          <h3 className="font-display text-xl font-extrabold text-white leading-tight mb-1">{photo.title}</h3>
          <p className="font-mono text-[10px] text-neutral-400">{photo.location}</p>
          <div className="mt-3 flex flex-wrap gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
            {photo.tags.map(tag => (
              <span key={tag} className="px-2 py-0.5 rounded-md bg-white/10 font-mono text-[9px] text-neutral-300">{tag}</span>
            ))}
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at 50% 100%, ' + photo.glow + ' 0%, transparent 65%)' }}
        />
      </div>
    </motion.div>
  );
};

const LightboxModal: React.FC<{ photo: Photo | null; onClose: () => void }> = ({ photo, onClose }) => {
  if (!photo) return null;
  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" />
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={e => e.stopPropagation()}
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 max-w-5xl w-full rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 40px 120px -20px ' + photo.glow + ', 0 0 0 1px rgba(255,255,255,0.08)' }}
      >
        <div className="relative aspect-[2/3] md:aspect-auto overflow-hidden">
          <img src={photo.src} alt={photo.title} className="h-full w-full object-cover" />
          <div className={'absolute inset-0 bg-gradient-to-t ' + photo.overlay} />
        </div>
        <div className="bg-[#0a0a0f]/95 backdrop-blur-2xl p-7 flex flex-col justify-center gap-5 border-l border-white/5">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-widest font-bold" style={{ color: photo.accent }}>
              {photo.genre} · {photo.location}
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white mt-1 leading-tight">{photo.title}</h2>
          </div>
          <div className="w-12 h-[2px] rounded-full" style={{ backgroundColor: photo.accent }} />
          <p className="font-sans text-sm text-neutral-300 leading-relaxed">{photo.description}</p>
          <div>
            <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-500 mb-1">Mood & Style</p>
            <p className="font-mono text-xs font-bold" style={{ color: photo.accent }}>{photo.mood}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {photo.tags.map(tag => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg font-mono text-[10px] font-medium"
                style={{ backgroundColor: photo.accent + '18', border: '1px solid ' + photo.accent + '35', color: photo.accent }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export const Photography: React.FC = () => {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);

  return (
    <>
      <section id="photography" className="relative w-full py-28 px-4 sm:px-8 md:px-16 overflow-hidden">
        {/* Ambient palette blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full blur-[120px] opacity-[0.12]" style={{ background: '#c17f2a' }} />
          <div className="absolute bottom-1/3 -right-20 h-80 w-80 rounded-full blur-[100px] opacity-[0.10]" style={{ background: '#0d7fa8' }} />
          <div className="absolute top-2/3 left-1/3 h-64 w-64 rounded-full blur-[90px] opacity-[0.08]" style={{ background: '#f0a030' }} />
        </div>

        {/* Header */}
        <div className="max-w-7xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2.5 font-mono text-xs text-crimson uppercase tracking-widest mb-4 font-bold">
                <Camera className="h-4 w-4 animate-pulse" />
                <span>// THROUGH THE LENS</span>
              </div>
              <h2 className="font-display text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
                FRAME<span className="text-crimson">S</span>
              </h2>
              <p className="mt-3 font-sans text-sm sm:text-base text-neutral-400 max-w-lg leading-relaxed">
                Beyond code — a collection of moments captured across wildlife encounters, candid street scenes, character portraits, and experimental compositions.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Aperture className="h-8 w-8 text-neutral-500 animate-spin" style={{ animationDuration: '8s' }} />
              <div className="font-mono text-xs text-neutral-500">
                <div className="text-neutral-300 font-bold">Rohan Karthick P S</div>
                <div>Amateur Photographer</div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px bg-gradient-to-r from-crimson via-white/20 to-transparent"
          />
        </div>

        {/* Masonry Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
            <div className="mt-0 lg:mt-16"><PhotoCard photo={photos[0]} index={0} onOpen={setActivePhoto} /></div>
            <div className="mt-0 lg:-mt-8"><PhotoCard photo={photos[1]} index={1} onOpen={setActivePhoto} /></div>
            <div className="mt-0 lg:mt-12"><PhotoCard photo={photos[2]} index={2} onOpen={setActivePhoto} /></div>
            <div className="mt-0 lg:-mt-4"><PhotoCard photo={photos[3]} index={3} onOpen={setActivePhoto} /></div>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 text-center font-mono text-[11px] text-neutral-600 uppercase tracking-wider"
          >
            Click any frame to explore · Shot on mobile · Unfiltered moments
          </motion.p>
        </div>
      </section>

      <AnimatePresence>
        {activePhoto && <LightboxModal photo={activePhoto} onClose={() => setActivePhoto(null)} />}
      </AnimatePresence>
    </>
  );
};
