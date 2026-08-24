import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { galleryData } from '../../data/galleryData';
import { GalleryItem } from '../../types';
import { LightboxModal } from './LightboxModal';
import { Eye, Sparkles, SlidersHorizontal } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const GALLERY_CATEGORIES = [
  'All',
  'Visual Architecture',
  'Generative 3D',
  'Hardware Labs',
  'Cinematography',
  'Editorial',
] as const;

export const CreativeGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const { playHoverSound, playClickSound } = useSound();

  const filteredItems = selectedCategory === 'All'
    ? galleryData
    : galleryData.filter((i) => i.category === selectedCategory);

  return (
    <>
      <section
        id="creative"
        className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
                <span className="text-crimson font-bold">05 //</span>
                <span className="uppercase tracking-widest text-neutral-200">EDITORIAL VISUAL LAB</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Visual Art & Creative Direction
              </h2>
            </div>
            <p className="max-w-md font-sans text-sm text-neutral-400">
              Editorial photography, generative 3D caustics, and hardware macro explorations capturing atmospheric mood and precision geometry.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-12">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClickSound();
                  setSelectedCategory(cat);
                }}
                onMouseEnter={playHoverSound}
                className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,30,66,0.4)] border border-crimson'
                    : 'bg-white/[0.03] text-neutral-400 border border-white/10 hover:border-white/25 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Masonry Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                onClick={() => {
                  playClickSound();
                  setSelectedItem(item);
                }}
                onMouseEnter={playHoverSound}
                data-cursor="view"
                className={`group relative rounded-3xl bg-surface-elevated overflow-hidden border border-white/10 cursor-pointer transition-all duration-500 hover:border-crimson/50 hover:shadow-[0_20px_50px_rgba(255,30,66,0.15)] ${
                  item.aspect === 'portrait' ? 'row-span-2' : ''
                }`}
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] sm:aspect-auto sm:h-80 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-canvas/20 to-transparent" />
                </div>

                {/* Floating Meta Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
                  <span className="font-mono text-[10px] text-crimson font-bold uppercase tracking-widest mb-1">
                    {item.category} // {item.year}
                  </span>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-crimson transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Hover Eye Pill */}
                <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Eye className="h-4 w-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <LightboxModal
        item={selectedItem}
        items={filteredItems}
        onClose={() => setSelectedItem(null)}
        onSelect={setSelectedItem}
      />
    </>
  );
};
