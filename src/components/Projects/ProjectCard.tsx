import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Project } from '../../types';
import { useSound } from '../../context/SoundContext';

interface ProjectCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
  variant?: 'horizontal' | 'grid';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
  onSelect,
  variant = 'horizontal',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { playHoverSound, playClickSound } = useSound();

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { damping: 20, stiffness: 200 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { damping: 20, stiffness: 200 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const indexString = (index + 1).toString().padStart(2, '0');

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => {
        playClickSound();
        onSelect(project);
      }}
      onMouseEnter={playHoverSound}
      data-cursor="project"
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={`group relative rounded-3xl bg-surface-elevated/90 border border-white/15 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_25px_80px_rgba(255,30,66,0.3)] hover:border-crimson/60 ${
        variant === 'horizontal'
          ? 'w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[760px] shrink-0 min-h-[600px] flex flex-col justify-between p-6 sm:p-8'
          : 'w-full min-h-[580px] flex flex-col justify-between p-6 sm:p-8'
      }`}
    >
      {/* Background Cinematic Visual & Gradient Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover opacity-25 scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/90 to-transparent" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-canvas/70" />
      </div>

      {/* Top Bar Header */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-crimson font-bold">
            // {indexString}
          </span>
          <span className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 font-mono text-[11px] text-neutral-200 uppercase tracking-widest font-medium">
            {project.category}
          </span>
          {project.timeline && (
            <span className="hidden sm:inline font-mono text-[11px] text-neutral-400 font-medium">
              {project.timeline}
            </span>
          )}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white transition-transform duration-300 group-hover:scale-110 group-hover:bg-crimson group-hover:border-crimson">
          <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Bottom Content Area with Typographic Precision */}
      <div className="relative z-10 space-y-4">
        <div>
          <span className="font-mono text-xs text-crimson uppercase tracking-wider block mb-1 font-bold">
            {project.subtitle}
          </span>
          <h3 className="font-display text-2xl sm:text-4xl font-extrabold text-white tracking-tight group-hover:text-crimson transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="font-sans text-xs sm:text-sm text-neutral-200 line-clamp-3 leading-relaxed font-normal">
          {project.description}
        </p>

        {/* Key System Highlights Box */}
        <div className="p-3.5 rounded-2xl bg-black/60 border border-white/10 space-y-1.5 font-mono text-xs text-neutral-300">
          <div className="text-crimson font-bold flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>ENGINEERED CAPABILITIES:</span>
          </div>
          {project.keyFeatures.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-cyan-400 shrink-0 mt-0.5" />
              <span className="truncate text-neutral-200 font-sans text-xs">{feat}</span>
            </div>
          ))}
        </div>

        {/* Live Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-white/10">
          {project.metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold text-white">
                {metric.value}
              </span>
              <span className="font-mono text-[10px] text-neutral-400 uppercase tracking-wider truncate">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

        {/* Technology Stack Pills */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-lg bg-white/[0.06] border border-white/10 font-mono text-[10px] text-neutral-200 font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg bg-white/[0.04] font-mono text-[10px] text-neutral-400 font-medium">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
