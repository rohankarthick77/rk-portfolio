import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Camera, Aperture, Clock, Sliders } from 'lucide-react';
import { GalleryItem } from '../../types';
import { useSound } from '../../context/SoundContext';

interface LightboxModalProps {
  item: GalleryItem | null;
  items: GalleryItem[];
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  item,
  items,
  onClose,
  onSelect,
}) => {
  const { playClickSound, playSwitchSound } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!item) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        const idx = items.findIndex((i) => i.id === item.id);
        const next = items[(idx + 1) % items.length];
        onSelect(next);
      }
      if (e.key === 'ArrowLeft') {
        const idx = items.findIndex((i) => i.id === item.id);
        const prev = items[(idx - 1 + items.length) % items.length];
        onSelect(prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, items, onClose, onSelect]);

  if (!item) return null;

  const currentIndex = items.findIndex((i) => i.id === item.id);

  const handleNext = () => {
    playSwitchSound();
    onSelect(items[(currentIndex + 1) % items.length]);
  };

  const handlePrev = () => {
    playSwitchSound();
    onSelect(items[(currentIndex - 1 + items.length) % items.length]);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-black/95 backdrop-blur-2xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative z-10 w-full max-w-6xl max-h-[92vh] flex flex-col rounded-3xl bg-surface-elevated border border-white/10 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.9)]"
        >
          {/* Top Controls */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-canvas/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_#ff1e42]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
                {item.category} // {item.year}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500 mr-2">
                {currentIndex + 1} / {items.length}
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  onClose();
                }}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-crimson hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Visual Showcase Stage */}
          <div className="relative flex-1 bg-black/80 flex items-center justify-center p-4 sm:p-8 min-h-[350px] sm:min-h-[480px]">
            <img
              src={item.image}
              alt={item.title}
              className="max-h-[60vh] max-w-full object-contain rounded-xl shadow-2xl"
            />

            {/* Navigation Arrows */}
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-crimson text-white border border-white/20 backdrop-blur-md transition-all duration-300"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 hover:bg-crimson text-white border border-white/20 backdrop-blur-md transition-all duration-300"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Bottom Telemetry & Metadata Strip */}
          <div className="p-6 bg-surface border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-1">
                {item.title}
              </h3>
              <p className="font-sans text-xs text-neutral-400 max-w-xl">
                {item.description}
              </p>
            </div>

            {/* EXIF Camera Telemetry */}
            <div className="flex flex-wrap items-center gap-4 font-mono text-[11px] text-neutral-400 bg-white/[0.03] p-3 rounded-xl border border-white/5">
              {item.cameraInfo.lens && (
                <div className="flex items-center gap-1.5">
                  <Camera className="h-3.5 w-3.5 text-crimson" />
                  <span>{item.cameraInfo.lens}</span>
                </div>
              )}
              {item.cameraInfo.aperture && (
                <div className="flex items-center gap-1.5">
                  <Aperture className="h-3.5 w-3.5 text-cyan-400" />
                  <span>{item.cameraInfo.aperture}</span>
                </div>
              )}
              {item.cameraInfo.shutter && (
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-amber-400" />
                  <span>{item.cameraInfo.shutter}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
