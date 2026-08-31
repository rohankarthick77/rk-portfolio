import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { achievementsData } from '../../data/achievementsData';
import { Award, Trophy, Sparkles, CheckCircle2, GitBranch, Star, ZoomIn, X, Download, Eye, ExternalLink } from 'lucide-react';
import { useSound } from '../../context/SoundContext';
import { getAssetUrl } from '../../utils/assetPath';

export const Achievements: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    caption: string;
    title: string;
    pdfUrl?: string;
  } | null>(null);
  const { playHoverSound, playClickSound } = useSound();

  return (
    <section
      id="achievements"
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <Trophy className="h-4 w-4 text-crimson animate-pulse" />
              <span className="text-crimson font-bold">08 //</span>
              <span className="uppercase tracking-widest text-neutral-200">VERIFIED DISTINCTIONS</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Milestones & Recognition
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-neutral-400">
            Hackathons, technical honors, and open-source contributions evaluated by industry engineering standards.
          </p>
        </div>

        {/* Highlight Stats Ribbon */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-black text-white">
              Winners
            </span>
            <span className="font-mono text-xs text-crimson uppercase mt-2 font-bold">
              Industry Hackathon '26
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-black text-white">
              1,500+
            </span>
            <span className="font-mono text-xs text-cyan-400 uppercase mt-2 font-bold">
              Open Source Commits
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-black text-white">
              Top 3%
            </span>
            <span className="font-mono text-xs text-amber-400 uppercase mt-2 font-bold">
              National Sprint Finalist
            </span>
          </div>

          <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 flex flex-col">
            <span className="font-display text-4xl sm:text-5xl font-black text-white">
              100%
            </span>
            <span className="font-mono text-xs text-emerald-400 uppercase mt-2 font-bold">
              Verified Production Code
            </span>
          </div>
        </div>

        {/* Milestone Timeline List */}
        <div className="space-y-8">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHoverSound}
              className="group relative p-6 sm:p-8 rounded-3xl bg-surface-elevated/70 border border-white/10 hover:border-crimson/40 backdrop-blur-xl transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                {/* Left Info */}
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-crimson/15 border border-crimson/30 font-mono text-[10px] font-bold text-crimson uppercase tracking-widest">
                      {item.badge}
                    </span>
                    <span className="font-mono text-xs text-neutral-500">
                      {item.year} // {item.organization}
                    </span>
                  </div>

                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white group-hover:text-crimson transition-colors">
                    {item.title}
                  </h3>

                  <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 font-mono text-xs text-emerald-400">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>{item.impactMetrics}</span>
                  </div>
                </div>

                {/* Right Tags */}
                <div className="flex flex-wrap md:flex-col md:items-end gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-lg bg-white/[0.04] border border-white/10 font-mono text-[11px] text-neutral-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hackathon Images Showcase Strip */}
              {item.images && item.images.length > 0 && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-crimson font-bold uppercase tracking-wider flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>OFFICIAL DOCUMENTATION // 2 FRAMES</span>
                    </span>
                    <span className="font-mono text-[11px] text-neutral-500 hidden sm:inline">
                      CLICK IMAGE TO ENLARGE & INSPECT
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.images.map((img, imgIdx) => (
                      <div
                        key={imgIdx}
                        onClick={() => {
                          playClickSound();
                          setSelectedImage({
                            src: img.src,
                            caption: img.caption,
                            title: item.title,
                            pdfUrl: item.pdfUrl,
                          });
                        }}
                        className="group/img relative aspect-[16/11] rounded-2xl overflow-hidden border border-white/15 bg-black cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.7)]"
                      >
                        <img
                          src={getAssetUrl(img.src)}
                          alt={img.caption}
                          className="h-full w-full object-cover group-hover/img:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />

                        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full bg-crimson/30 backdrop-blur-md border border-crimson/50 font-mono text-[10px] text-crimson font-bold uppercase tracking-wider">
                          {img.type === 'certificate' ? 'OFFICIAL CERTIFICATE' : 'LIVE JURY DEFENSE'}
                        </div>

                        <div className="absolute top-3 right-3 z-10 opacity-0 group-hover/img:opacity-100 transition-opacity">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 backdrop-blur-md text-white border border-white/20">
                            <ZoomIn className="h-4 w-4" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 left-3 right-3 z-10">
                          <p className="font-sans text-xs font-semibold text-neutral-200 line-clamp-1 group-hover/img:text-white transition-colors">
                            {img.caption}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal for Hackathon Images */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 25 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 25 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full rounded-3xl overflow-hidden bg-[#0d0d14] border border-white/20 shadow-[0_30px_90px_rgba(0,0,0,0.95)]"
            >
              <div className="w-full bg-black flex items-center justify-center max-h-[70vh] overflow-hidden">
                <img
                  src={getAssetUrl(selectedImage.src)}
                  alt={selectedImage.caption}
                  className="max-h-[65vh] w-auto object-contain"
                />
              </div>

              <div className="p-6 sm:p-8 bg-[#0d0d14] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-crimson mb-1">
                    <Trophy className="h-3.5 w-3.5" />
                    <span>{selectedImage.title}</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                    {selectedImage.caption}
                  </h4>
                </div>

                {selectedImage.pdfUrl && (
                  <div className="flex items-center gap-3">
                    <a
                      href={getAssetUrl(selectedImage.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-crimson text-white font-mono text-xs font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,30,66,0.4)]"
                    >
                      <Download className="h-4 w-4" />
                      <span>OPEN CERTIFICATE PDF</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
