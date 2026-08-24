import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projectsData } from '../../data/projectsData';
import { Project } from '../../types';
import { ProjectCard } from './ProjectCard';
import { ProjectModal } from './ProjectModal';
import { LayoutGrid, Rows3, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

gsap.registerPlugin(ScrollTrigger);

export const ProjectsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<'horizontal' | 'grid'>('horizontal');
  const { playHoverSound, playClickSound, playSwitchSound } = useSound();

  useEffect(() => {
    if (viewMode !== 'horizontal') return;

    const track = trackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    // Calculate total horizontal scroll width
    const totalWidth = track.scrollWidth - window.innerWidth + 120;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [viewMode]);

  return (
    <>
      <section id="work" ref={sectionRef} className="relative w-full bg-canvas py-16 overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-crimson/10 rounded-full blur-[180px] pointer-events-none" />
        <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

        {/* Section Top Header & View Mode Switcher */}
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/10 pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <span className="text-crimson font-bold">01 //</span>
              <span className="uppercase tracking-widest text-neutral-200">CASE STUDIES SHOWCASE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Selected Works & Systems
            </h2>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-neutral-500 hidden md:inline uppercase mr-2">
              VIEWPORT:
            </span>
            <button
              onClick={() => {
                playSwitchSound();
                setViewMode('horizontal');
              }}
              onMouseEnter={playHoverSound}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'horizontal'
                  ? 'bg-crimson text-white shadow-[0_0_15px_rgba(255,30,66,0.4)]'
                  : 'bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white'
              }`}
            >
              <Rows3 className="h-3.5 w-3.5" />
              <span>PINNED 3D DECK</span>
            </button>
            <button
              onClick={() => {
                playSwitchSound();
                setViewMode('grid');
              }}
              onMouseEnter={playHoverSound}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                viewMode === 'grid'
                  ? 'bg-crimson text-white shadow-[0_0_15px_rgba(255,30,66,0.4)]'
                  : 'bg-white/[0.04] text-neutral-400 border border-white/10 hover:text-white'
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>GRID VIEW</span>
            </button>
          </div>
        </div>

        {/* View Mode 1: Horizontal Pinned Experience */}
        {viewMode === 'horizontal' ? (
          <div ref={triggerRef} className="relative h-screen w-full flex items-center overflow-hidden">
            <div
              ref={trackRef}
              className="flex items-center gap-8 pl-4 sm:pl-8 md:pl-16 pr-24 will-change-transform"
            >
              {/* Intro Title Card for Horizontal Stream */}
              <div className="w-[75vw] sm:w-[360px] md:w-[420px] shrink-0 p-8 rounded-3xl bg-surface-elevated/40 border border-white/10 flex flex-col justify-between h-[560px] sm:h-[580px]">
                <div className="font-mono text-xs text-crimson uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>SECTOR BENCHMARKS</span>
                </div>
                <div className="space-y-4">
                  <h3 className="font-display text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                    Engineered with Precision & Passion.
                  </h3>
                  <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                    Scroll downward to navigate through the horizontal pinned gallery of 7 complete case studies. Click any project to inspect the full architectural breakdown.
                  </p>
                </div>
                <div className="font-mono text-xs text-neutral-500 flex items-center gap-2">
                  <span>SCROLL HORIZONTALLY</span>
                  <ChevronRight className="h-4 w-4 text-crimson animate-pulse" />
                </div>
              </div>

              {/* Pinned Project Cards */}
              {projectsData.map((project, idx) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={idx}
                  onSelect={setSelectedProject}
                  variant="horizontal"
                />
              ))}
            </div>
          </div>
        ) : (
          /* View Mode 2: Multi-Column Responsive Grid View */
          <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projectsData.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onSelect={setSelectedProject}
                variant="grid"
              />
            ))}
          </div>
        )}
      </section>

      {/* Fullscreen Case Study Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
