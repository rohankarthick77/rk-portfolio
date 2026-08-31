import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ShieldCheck, CheckCircle2, Code2, MapPin, Terminal, Globe, Lock, Eye, Download, X, Sparkles, FileText } from 'lucide-react';
import { educationData, certificationsData } from '../../data/educationData';
import { useSound } from '../../context/SoundContext';
import { getAssetUrl } from '../../utils/assetPath';

const STATEMENT_WORDS = [
  'ENGINEERING', 'SCALABLE', 'SOFTWARE', 'SOLUTIONS',
  'THROUGH', 'INTUITIVE', 'DESIGN', 'AND', 'ROBUST', 'COMPUTATION.'
];

export const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const { playHoverSound, playClickSound } = useSound();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 85%', 'end 30%'],
  });

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-crimson/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-16 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-crimson font-bold">02 //</span>
            <span className="uppercase tracking-widest text-neutral-200">BIOGRAPHY & ACADEMICS</span>
          </div>
          <span className="hidden sm:inline uppercase tracking-widest text-neutral-500">
            COMPUTER SCIENCE AND DESIGN // B.E. 2023 – 2027
          </span>
        </div>

        {/* Monumental Scrubbed Editorial Statement */}
        <div className="my-10 max-w-5xl">
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold leading-[1.15] tracking-tight text-white flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2">
            {STATEMENT_WORDS.map((word, idx) => {
              const start = idx / STATEMENT_WORDS.length;
              const end = (idx + 1) / STATEMENT_WORDS.length;
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const wordOpacity = useTransform(scrollYProgress, [start * 0.7, end * 0.9], [0.2, 1]);
              // eslint-disable-next-line react-hooks/rules-of-hooks
              const wordBlur = useTransform(scrollYProgress, [start * 0.7, end * 0.9], ['8px', '0px']);

              return (
                <motion.span
                  key={idx}
                  style={{
                    opacity: wordOpacity,
                    filter: `blur(${wordBlur})`,
                  }}
                  className={`inline-block transition-colors ${
                    word === 'SCALABLE' || word === 'DESIGN'
                      ? 'text-crimson'
                      : word === 'ROBUST' || word === 'COMPUTATION.'
                      ? 'text-neutral-100 underline decoration-crimson/50 underline-offset-8'
                      : 'text-neutral-200'
                  }`}
                >
                  {word}
                </motion.span>
              );
            })}
          </h2>
        </div>

        {/* Profile Card & Bio Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Authentic Portrait Card with Strict Face Preservation */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 rounded-3xl bg-surface-elevated/90 border border-white/15 p-4 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 group">
                <img
                  src={getAssetUrl('rohan-photo.png')}
                  alt="Rohan Karthick P S"
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-canvas/90 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 font-mono text-xs">
                  <span className="block font-display text-lg font-bold text-white">
                    Rohan Karthick P S
                  </span>
                  <span className="text-crimson font-medium text-[11px]">
                    Computer Science & Design Engineer
                  </span>
                  <div className="flex items-center gap-1 text-neutral-400 mt-1 text-[11px]">
                    <MapPin className="h-3 w-3 text-crimson" />
                    <span>Pollachi, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>

              {/* Quick Contact & Languages Bar */}
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2 font-mono text-xs text-neutral-400">
                <div className="flex justify-between">
                  <span>LANGUAGES</span>
                  <span className="text-neutral-200">English, Tamil</span>
                </div>
                <div className="flex justify-between">
                  <span>PHONE</span>
                  <span className="text-neutral-200">+91 73391 22956</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL</span>
                  <a href="mailto:rohankarthick77@gmail.com" className="text-crimson font-medium hover:underline">rohankarthick77@gmail.com</a>
                </div>
                <div className="flex justify-between">
                  <span>LINKEDIN</span>
                  <a
                    href="https://www.linkedin.com/in/rohan-karthick-4aa9b72b2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#38bdf8] font-medium hover:underline"
                  >
                    rohan-karthick-4aa9b72b2
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Narrative: Resume Summary + Education + Verified Cybersecurity Suite */}
          <div className="lg:col-span-8 space-y-12">
            {/* Professional Summary */}
            <div className="p-8 rounded-3xl bg-surface-elevated/70 border border-white/10 backdrop-blur-xl">
              <span className="font-mono text-xs text-crimson font-bold uppercase tracking-wider block mb-3 flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                <span>EXECUTIVE SUMMARY</span>
              </span>
              <p className="font-sans text-base text-neutral-200 leading-relaxed mb-4">
                Aspiring Software Developer pursuing Computer Science and Design at Bannari Amman Institute of Technology, with a solid foundation in programming, problem-solving, and design principles. Experienced in building full-stack and data-driven applications using JavaScript, React, Node.js, Express, SQLite, Prisma ORM, and Python.
              </p>
              <p className="font-sans text-sm text-neutral-400 leading-relaxed">
                Passionate about developing efficient, scalable software solutions like AcousticPulse and continuously enhancing technical systems through competitive hackathons and engineering discipline.
              </p>

              {/* Areas of Interest Tags */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-neutral-400 mr-2">AREAS OF FOCUS:</span>
                {['Coding Practice', 'Exploring Software Tools', 'Learning New Technologies', 'Spatial Maps & GIS', 'Network Telemetry'].map((area) => (
                  <span
                    key={area}
                    className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-[11px] text-neutral-300"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Academic Trajectory */}
            <div>
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest mb-6 block flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-cyan-400" />
                <span>ACADEMIC TRAJECTORY</span>
              </span>

              <div className="space-y-4">
                {educationData.map((edu) => (
                  <div
                    key={edu.id}
                    onMouseEnter={playHoverSound}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-crimson/40 transition-all duration-300"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h3 className="font-display text-lg font-bold text-white">
                        {edu.institution}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-white/[0.05] font-mono text-xs text-neutral-400">
                        {edu.period}
                      </span>
                    </div>

                    <div className="font-mono text-xs text-crimson font-medium mb-3">
                      {edu.degree} • {edu.location}
                    </div>

                    <ul className="space-y-1.5 font-sans text-xs text-neutral-300">
                      {edu.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <span className="h-1 w-1 rounded-full bg-crimson shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Industry Certifications Suite */}
            <div className="space-y-6">
              <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest block flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>OFFICIAL INDUSTRY CERTIFICATIONS // CISCO & OPENEDG</span>
              </span>

              <div className="space-y-6">
                {certificationsData.map((cert) => {
                  const isPython = cert.id === 'cert-python';
                  return (
                    <div
                      key={cert.id}
                      onMouseEnter={playHoverSound}
                      className={`p-6 sm:p-8 rounded-3xl backdrop-blur-xl border transition-all duration-300 ${
                        isPython
                          ? 'bg-gradient-to-br from-amber-500/10 via-surface-elevated to-surface-elevated border-amber-500/30 hover:border-amber-400/60 shadow-[0_15px_50px_rgba(245,158,11,0.12)]'
                          : 'bg-gradient-to-br from-emerald-500/10 via-surface-elevated to-surface-elevated border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_15px_50px_rgba(16,185,129,0.12)]'
                      }`}
                    >
                      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
                        <div>
                          <div className="flex flex-wrap items-center gap-2.5 mb-2">
                            <span
                              className={`px-3 py-1 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border ${
                                isPython
                                  ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
                              }`}
                            >
                              <ShieldCheck className="h-3.5 w-3.5" />
                              <span>{cert.badge}</span>
                            </span>
                            <span className="font-mono text-xs text-neutral-400">
                              {cert.issuer} • {cert.date}
                            </span>
                          </div>
                          <h3 className="font-display text-xl sm:text-2xl font-extrabold text-white">
                            {cert.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-2">
                          {cert.image && (
                            <button
                              onClick={() => {
                                playClickSound();
                                setSelectedCert(cert);
                              }}
                              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold transition-all shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                              <span>VIEW CERTIFICATE</span>
                            </button>
                          )}
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-[11px] text-neutral-300">
                            <Lock className="h-3 w-3 text-neutral-400" />
                            <span>VERIFIED</span>
                          </div>
                        </div>
                      </div>

                      <p className="font-sans text-sm text-neutral-300 leading-relaxed mb-5">
                        {isPython
                          ? 'Official credential awarded by Cisco Networking Academy in partnership with OpenEDG Python Institute (Aug 29, 2026). Validates proficiency in writing, refactoring, and debugging algorithmic Python 3 programs, utilizing standard library modules, and understanding software engineering fundamentals aligned with PCEP certification standards.'
                          : 'Comprehensive industry credential issued by Cisco Networking Academy (Dec 2025). Validates core competencies in network defense architectures, threat modeling, cryptographic data protection, vulnerability assessment, and secure full-stack software development.'}
                      </p>

                      {/* Covered Skills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-white/10">
                        {cert.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 font-mono text-xs text-neutral-200 bg-white/[0.02] p-2.5 rounded-xl border border-white/5"
                          >
                            <CheckCircle2
                              className={`h-4 w-4 shrink-0 ${
                                isPython ? 'text-amber-400' : 'text-emerald-400'
                              }`}
                            />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Inspection Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/90 backdrop-blur-2xl"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-6 right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors"
              aria-label="Close certificate modal"
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
              {/* Certificate Image View */}
              <div className="w-full bg-white p-2 sm:p-4 flex items-center justify-center max-h-[70vh] overflow-auto">
                <img
                  src={getAssetUrl(selectedCert.image)}
                  alt={selectedCert.title}
                  className="max-h-[65vh] w-auto object-contain rounded-lg shadow-md"
                />
              </div>

              {/* Certificate Footer */}
              <div className="p-6 sm:p-8 bg-[#0d0d14] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 font-mono text-xs text-amber-400 mb-1">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>{selectedCert.issuer}</span>
                  </div>
                  <h4 className="font-display text-lg sm:text-xl font-bold text-white">
                    {selectedCert.title}
                  </h4>
                  <span className="font-mono text-xs text-neutral-400">
                    Issued to Rohan Karthick P S on {selectedCert.date}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href={getAssetUrl(selectedCert.pdfUrl || selectedCert.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 text-black font-mono text-xs font-bold uppercase tracking-wider hover:bg-amber-400 transition-all shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                  >
                    <Download className="h-4 w-4" />
                    <span>OPEN PDF / DOWNLOAD</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
