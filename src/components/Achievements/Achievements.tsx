import React from 'react';
import { motion } from 'framer-motion';
import { achievementsData } from '../../data/achievementsData';
import { Award, Trophy, Sparkles, CheckCircle2, GitBranch, Star } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

export const Achievements: React.FC = () => {
  const { playHoverSound } = useSound();

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
              <span className="text-crimson font-bold">06 //</span>
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
              03+
            </span>
            <span className="font-mono text-xs text-crimson uppercase mt-2 font-bold">
              Hackathons & Competitions
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
        <div className="space-y-6">
          {achievementsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHoverSound}
              className="group relative p-6 sm:p-8 rounded-3xl bg-surface-elevated/70 border border-white/10 hover:border-crimson/40 backdrop-blur-xl transition-all duration-300"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
