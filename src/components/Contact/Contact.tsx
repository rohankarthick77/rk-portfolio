import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Copy, Check, Mail, Send, Github, Linkedin, Phone, MapPin, Sparkles, MessageCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSound } from '../../context/SoundContext';

const EMAIL = 'rohankarthick77@gmail.com';
const PHONE = '+91 73391 22956';
const PHONE_RAW = '+917339122956';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const { playHoverSound, playClickSound, playSuccessSound } = useSound();

  const handleCopyEmail = () => {
    playSuccessSound();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.85 },
      colors: ['#ff1e42', '#ffffff', '#00f0ff'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSuccessSound();
    setFormSubmitted(true);
    confetti({
      particleCount: 110,
      spread: 85,
      origin: { y: 0.8 },
      colors: ['#ff1e42', '#ff2d55', '#ffffff'],
    });
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full bg-canvas py-32 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5"
    >
      {/* Dynamic Crimson Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-crimson/15 rounded-full blur-[200px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-16 font-mono text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="text-crimson font-bold">07 //</span>
            <span className="uppercase tracking-widest text-neutral-200">GET IN TOUCH</span>
          </div>
          <span className="uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            OPEN FOR OPPORTUNITIES
          </span>
        </div>

        {/* Monumental Kinetic Headline */}
        <div className="my-10 select-none">
          <h2 className="font-display text-[11vw] sm:text-[9vw] font-black tracking-tight text-white leading-[0.88] uppercase">
            <span className="block hover:text-crimson transition-colors">LET'S BUILD</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-300 to-neutral-600">
              SOMETHING
            </span>
            <span className="block text-crimson glow-crimson">
              UNFORGETTABLE.
            </span>
          </h2>
        </div>

        {/* Dual Interaction Columns: Direct Email Copy + Interactive Inquiry Form */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Social Matrix */}
          <div className="lg:col-span-6 space-y-6">
            <p className="font-sans text-base sm:text-lg text-neutral-300 leading-relaxed">
              Available for full-stack engineering roles, software development opportunities, and high-impact technical collaborations.
            </p>

            {/* Direct Transmission Card */}
            <div className="p-6 rounded-3xl bg-surface-elevated/80 border border-white/10 backdrop-blur-xl space-y-4">
              {/* Email Copy */}
              <div>
                <span className="block font-mono text-xs uppercase tracking-wider text-neutral-400 mb-2">
                  DIRECT EMAIL:
                </span>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <span className="font-mono text-sm sm:text-base font-bold text-white select-all">
                    {EMAIL}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={playHoverSound}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-crimson hover:bg-crimson-glow text-white font-mono text-xs uppercase tracking-wider font-bold shadow-[0_0_20px_rgba(255,30,66,0.4)] transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        <span>COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>COPY EMAIL</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Phone & Location */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-neutral-500 block mb-1">CALL / WHATSAPP</span>
                  <a
                    href={`tel:${PHONE_RAW}`}
                    className="text-white hover:text-crimson font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Phone className="h-3.5 w-3.5 text-crimson" />
                    <span>{PHONE}</span>
                  </a>
                </div>
                <div>
                  <span className="text-neutral-500 block mb-1">LOCATION</span>
                  <div className="text-neutral-300 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-cyan-400" />
                    <span>Pollachi, Tamil Nadu, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
              <a
                href="https://github.com/rohankarthick77"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/30 hover:bg-white/[0.05] transition-all"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="h-4 w-4 text-neutral-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://www.linkedin.com/in/rohan-karthick-4aa9b72b2/"
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between p-4 rounded-2xl bg-[#0077b5]/10 border border-[#0077b5]/30 hover:border-[#0077b5] hover:bg-[#0077b5]/20 transition-all text-[#38bdf8]"
              >
                <span className="font-bold">LINKEDIN</span>
                <ArrowUpRight className="h-4 w-4 text-[#38bdf8] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`https://wa.me/917339122956`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHoverSound}
                className="group flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-emerald-500 hover:bg-emerald-500/10 transition-all col-span-2 sm:col-span-1"
              >
                <span className="text-emerald-400 font-bold">WHATSAPP</span>
                <MessageCircle className="h-4 w-4 text-emerald-400" />
              </a>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-6 p-8 rounded-3xl bg-surface-elevated border border-white/15 backdrop-blur-2xl">
            {formSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="h-12 w-12 rounded-full bg-crimson/20 border border-crimson flex items-center justify-center mx-auto text-crimson">
                  <Check className="h-6 w-6" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Message Transmitted
                </h3>
                <p className="font-sans text-sm text-neutral-400 max-w-sm mx-auto">
                  Thank you for reaching out! Rohan will respond to your transmission within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    TRANSMISSION FORM
                  </span>
                  <Sparkles className="h-4 w-4 text-crimson" />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-400 uppercase">
                    Your Name / Organization
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Recruiters / Engineering Team"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-canvas border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-400 uppercase">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. team@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-canvas border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson transition-colors font-sans text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-xs text-neutral-400 uppercase">
                    Message / Opportunity Scope
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the role, project vision, or technical requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-canvas border border-white/10 text-white placeholder-neutral-600 focus:outline-none focus:border-crimson transition-colors font-sans text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  onMouseEnter={playHoverSound}
                  className="w-full py-4 rounded-xl bg-crimson hover:bg-crimson-glow text-white font-mono text-xs uppercase tracking-widest font-bold shadow-[0_0_25px_rgba(255,30,66,0.4)] flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <span>TRANSMIT MESSAGE</span>
                  <Send className="h-4 w-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
