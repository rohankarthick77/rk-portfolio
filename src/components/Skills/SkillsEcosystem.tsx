import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skillsData } from '../../data/skillsData';
import { SkillNode } from '../../types';
import { Sparkles, Code2, Network, Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

const CATEGORIES = [
  { id: 'all', label: 'All Ecosystem' },
  { id: 'frontend', label: 'Creative & Frontend' },
  { id: 'backend', label: 'Systems & Cloud' },
  { id: 'ai_ml', label: 'Machine Learning' },
  { id: 'systems_iot', label: 'Embedded & TinyML' },
  { id: 'creative_design', label: 'Visual & 3D' },
];

export const SkillsEcosystem: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSkill, setActiveSkill] = useState<SkillNode>(skillsData[0]);
  const { playHoverSound, playClickSound } = useSound();

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  const isConnected = (skillId: string) => {
    return activeSkill.connectedTo.includes(skillId) || activeSkill.id === skillId;
  };

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-crimson/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <span className="text-crimson font-bold">03 //</span>
              <span className="uppercase tracking-widest text-neutral-200">INTERACTIVE ECOSYSTEM</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Technology Neural Mesh
            </h2>
          </div>
          <p className="max-w-md font-sans text-sm text-neutral-400">
            A fluid network of engineering tools, architectural patterns, and creative frameworks interconnected in production.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-12">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat.id);
              }}
              onMouseEnter={playHoverSound}
              className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-crimson text-white shadow-[0_0_20px_rgba(255,30,66,0.4)] border border-crimson'
                  : 'bg-white/[0.03] text-neutral-400 border border-white/10 hover:border-white/25 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Main Grid: Interactive Nodes + Live Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left / Center: Interactive Nodes Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {filteredSkills.map((skill) => {
              const active = activeSkill.id === skill.id;
              const connected = isConnected(skill.id);

              return (
                <motion.div
                  key={skill.id}
                  layout
                  onClick={() => {
                    playClickSound();
                    setActiveSkill(skill);
                  }}
                  onMouseEnter={() => {
                    playHoverSound();
                    setActiveSkill(skill);
                  }}
                  data-cursor="link"
                  className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 overflow-hidden ${
                    active
                      ? 'bg-crimson/15 border-crimson shadow-[0_0_30px_rgba(255,30,66,0.25)]'
                      : connected
                      ? 'bg-white/[0.06] border-crimson/50 text-white'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 text-neutral-300'
                  }`}
                >
                  {/* Glowing Connection Pip */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 group-hover:text-neutral-200">
                      {skill.category.replace('_', ' ')}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-all duration-300 ${
                        active
                          ? 'bg-crimson shadow-[0_0_8px_#ff1e42] scale-125'
                          : connected
                          ? 'bg-cyan-400'
                          : 'bg-neutral-600'
                      }`}
                    />
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white mb-1 group-hover:text-crimson transition-colors">
                    {skill.name}
                  </h3>

                  <div className="flex items-center gap-1 font-mono text-[11px] text-neutral-400">
                    <span>{skill.experienceYears}y exp</span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-neutral-400 truncate">{skill.level}</span>
                  </div>

                  {/* Connected Indicator Bar */}
                  {connected && (
                    <motion.div
                      layoutId="connectBar"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-crimson to-transparent"
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Right: Deep Architectural Inspector */}
          <div className="lg:col-span-5 sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSkill.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="p-8 rounded-3xl bg-surface-elevated/90 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
              >
                {/* Header Tag */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-crimson shadow-[0_0_8px_#ff1e42]" />
                    <span className="font-mono text-xs text-crimson font-bold uppercase tracking-widest">
                      SYSTEM NODE INSPECTION
                    </span>
                  </div>
                  <span className="font-mono text-xs text-neutral-500">
                    LEVEL: {activeSkill.level}
                  </span>
                </div>

                {/* Title & Category */}
                <h3 className="font-display text-3xl font-extrabold text-white mb-2">
                  {activeSkill.name}
                </h3>
                <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-6">
                  {activeSkill.description}
                </p>

                {/* Code Snippet Highlight */}
                {activeSkill.highlightCode && (
                  <div className="mb-6 rounded-xl bg-canvas p-4 border border-white/10 font-mono text-xs text-neutral-300 overflow-x-auto">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 text-[10px] text-neutral-500">
                      <span className="flex items-center gap-1.5">
                        <Terminal className="h-3 w-3 text-crimson" />
                        <span>PRODUCTION SNIPPET</span>
                      </span>
                      <span>UTF-8</span>
                    </div>
                    <pre className="text-crimson/90 leading-relaxed font-mono">
                      {activeSkill.highlightCode}
                    </pre>
                  </div>
                )}

                {/* Connected Architecture Nodes */}
                <div>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-3 flex items-center gap-2">
                    <Network className="h-3.5 w-3.5 text-cyan-400" />
                    <span>INTERCONNECTED DEPENDENCY MESH:</span>
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeSkill.connectedTo.map((depId) => {
                      const dep = skillsData.find((s) => s.id === depId);
                      return (
                        <button
                          key={depId}
                          onClick={() => {
                            if (dep) {
                              playClickSound();
                              setActiveSkill(dep);
                            }
                          }}
                          onMouseEnter={playHoverSound}
                          className="px-3 py-1.5 rounded-lg bg-white/[0.04] hover:bg-crimson/20 border border-white/10 hover:border-crimson text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                        >
                          → {dep?.name || depId}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
