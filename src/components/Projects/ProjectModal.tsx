import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Cpu, CheckCircle2, BarChart2, ShieldCheck, Radio } from 'lucide-react';
import { Project } from '../../types';
import { useSound } from '../../context/SoundContext';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const { playClickSound } = useSound();

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playClickSound();
            onClose();
          }}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 30 }}
          transition={{ type: 'spring', damping: 30, stiffness: 320 }}
          className="relative z-10 w-full max-w-5xl rounded-3xl bg-[#0b0b10] border border-white/15 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden max-h-[90vh] flex flex-col my-auto"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-canvas/80 backdrop-blur-md sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_#ff1e42]" />
              <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-300">
                CASE STUDY // {project.category}
              </span>
            </div>
            <button
              onClick={() => {
                playClickSound();
                onClose();
              }}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-crimson hover:text-white transition-colors text-neutral-300"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-10">
            {/* Header Title Section */}
            <div>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-crimson mb-3">
                <span>YEAR: {project.year}</span>
                <span>•</span>
                <span>ROLE: {project.role}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight">
                {project.title}
              </h2>
              <p className="mt-2 font-mono text-sm sm:text-base text-neutral-400">
                {project.subtitle}
              </p>
            </div>

            {/* Hero Image Showcase */}
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/10">
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-xs text-neutral-300 bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                <span>SYSTEM STATUS: VERIFIED & OPERATIONAL</span>
                <span className="text-crimson font-bold">100% PRODUCTION BENCHMARK</span>
              </div>
            </div>

            {/* Performance Metrics Grid */}
            <div>
              <span className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                <BarChart2 className="h-4 w-4 text-crimson" />
                <span>MEASURED TELEMETRY & SYSTEM BENCHMARKS:</span>
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col"
                  >
                    <span className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                      {m.value}
                    </span>
                    <span className="font-mono text-[11px] text-neutral-400 uppercase mt-1">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deep Technical Deep-Dive: Problem vs Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Problem */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-red-500/20">
                <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <ShieldCheck className="h-4 w-4" />
                  <span>THE ENGINEERING CHALLENGE</span>
                </div>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {project.problemStatement}
                </p>
              </div>

              {/* Architectural Solution */}
              <div className="p-6 rounded-2xl bg-white/[0.02] border border-emerald-500/20">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase tracking-wider mb-3">
                  <Cpu className="h-4 w-4" />
                  <span>THE ARCHITECTURAL SOLUTION</span>
                </div>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed">
                  {project.architecturalSolution}
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div>
              <span className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
                <Layers className="h-4 w-4 text-cyan-400" />
                <span>CORE SYSTEM CAPABILITIES:</span>
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.keyFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/5"
                  >
                    <CheckCircle2 className="h-4 w-4 text-crimson shrink-0 mt-0.5" />
                    <span className="font-sans text-xs sm:text-sm text-neutral-200">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technology Stack Tags */}
            <div>
              <span className="block font-mono text-xs uppercase tracking-widest text-neutral-400 mb-3">
                TECHNOLOGY STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 font-mono text-xs text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA External Links */}
            <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/10">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-mono text-xs uppercase tracking-wider font-bold transition-all"
                >
                  <Github className="h-4 w-4" />
                  <span>VIEW REPOSITORY</span>
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson hover:bg-crimson-glow text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,30,66,0.4)] transition-all"
                >
                  <span>LIVE REPO / DEMO</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
