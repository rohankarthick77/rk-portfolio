import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, Play, CornerDownLeft, RotateCcw, ShieldCheck, Trophy, FolderGit2, Cpu } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
  time: string;
}

const INITIAL_COMMANDS = ['help', 'whoami', 'skills --top', 'status'];

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'init system --user rohankarthick77',
      output: (
        <div className="space-y-1 text-neutral-300">
          <div className="text-emerald-400 font-bold flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            [SYSTEM READY] RK-OS Core v2.4.0 (arm64-darwin) Initialized
          </div>
          <div className="text-neutral-400 text-[11px]">
            Type <span className="text-crimson font-bold">help</span> to list available commands or click quick-actions below.
          </div>
        </div>
      ),
      time: '00:00:01',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { playClickSound, playHoverSound } = useSound();

  const getTime = () => {
    const d = new Date();
    return d.toTimeString().split(' ')[0];
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase();
    if (!cmd) return;

    playClickSound();
    setCommandHistory((prev) => [...prev, cmdStr]);
    setHistoryIndex(-1);

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1.5 text-neutral-300">
            <div className="text-crimson font-bold text-xs uppercase tracking-wider">// AVAILABLE COMMAND MATRIX</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs">
              <div><span className="text-cyan-400 font-bold">whoami</span> — Display engineer identity & trajectory</div>
              <div><span className="text-cyan-400 font-bold">skills</span> — List full technical stack matrix</div>
              <div><span className="text-cyan-400 font-bold">projects</span> — Summary of core engineering projects</div>
              <div><span className="text-cyan-400 font-bold">hackathon</span> — Sathyabama 2026 Winner details</div>
              <div><span className="text-cyan-400 font-bold">cisco</span> — Verified Cybersecurity credential</div>
              <div><span className="text-cyan-400 font-bold">contact</span> — Get direct contact endpoints</div>
              <div><span className="text-cyan-400 font-bold">github</span> — Quick link to github.com/rohankarthick77</div>
              <div><span className="text-cyan-400 font-bold">clear</span> — Flush terminal output buffer</div>
            </div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-200">
            <div className="text-white font-bold text-sm">Rohan Karthick P S</div>
            <div className="text-neutral-400">Pursuing B.E. Computer Science and Design at Bannari Amman Institute of Technology (BIT '27).</div>
            <div className="text-crimson font-mono text-[11px]">Specialization: Full-Stack Systems, Spatial GIS Telemetry, Python Networking & Cyber Defense.</div>
          </div>
        );
        break;

      case 'skills':
      case 'skills --top':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-emerald-400 font-bold">// TECH ECOSYSTEM BREAKDOWN</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-crimson font-bold block mb-1">Frontend & Spatial</span>
                <span className="text-neutral-300">React.js, TypeScript, Vite, Tailwind CSS, Leaflet GIS, Chart.js, GSAP</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-cyan-400 font-bold block mb-1">Backend & Systems</span>
                <span className="text-neutral-300">Node.js, Express.js, SQLite, Prisma ORM, JWT Auth, Python Sockets</span>
              </div>
              <div className="p-2 rounded-lg bg-white/[0.03] border border-white/10">
                <span className="text-amber-400 font-bold block mb-1">Security & Telemetry</span>
                <span className="text-neutral-300">Cisco Cyber Defense, Network Packet Benchmarking, WHO Auditing</span>
              </div>
            </div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-cyan-400 font-bold">// PRODUCTION REPOSITORIES</div>
            <div className="space-y-1.5">
              <div className="border-l-2 border-crimson pl-2">
                <span className="font-bold text-white">1. AcousticPulse</span> — Urban noise pollution spatial mapping & WHO acoustic telemetry (React, Leaflet, Node, Prisma).
              </div>
              <div className="border-l-2 border-cyan-400 pl-2">
                <span className="font-bold text-white">2. Internet Speed Analyzer</span> — Precision multi-threaded Python socket diagnostics client with SQLite historical logging.
              </div>
              <div className="border-l-2 border-purple-400 pl-2">
                <span className="font-bold text-white">3. Smart Study Planner</span> — Dynamic cognitive scheduling with spaced repetition algorithm.
              </div>
            </div>
          </div>
        );
        break;

      case 'hackathon':
        outputNode = (
          <div className="p-2.5 rounded-xl bg-crimson/10 border border-crimson/30 text-xs space-y-1 text-neutral-200">
            <div className="text-crimson font-bold flex items-center gap-1.5">
              <Trophy className="h-4 w-4 text-crimson" />
              <span>1ST PLACE WINNER // SATHYABAMA INNOVATION HACKATHON 2026</span>
            </div>
            <div>Category: Software Domain • Sathyabama University</div>
            <div className="text-neutral-400 text-[11px]">Engineered award-winning software architecture recognized by national technical jury.</div>
          </div>
        );
        break;

      case 'cisco':
        outputNode = (
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1 text-neutral-200">
            <div className="text-emerald-400 font-bold flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>OFFICIAL CISCO CYBERSECURITY CREDENTIAL</span>
            </div>
            <div>Issued by: Cisco Networking Academy (Dec 2025)</div>
            <div className="text-neutral-400 text-[11px]">Covers network defense, cryptographic security protocols, threat mitigation & vulnerability assessment.</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs font-mono text-neutral-300">
            <div>Email: <a href="mailto:rohankarthick77@gmail.com" className="text-crimson underline">rohankarthick77@gmail.com</a></div>
            <div>Phone: <a href="tel:+917339122956" className="text-emerald-400 underline">+91 73391 22956</a></div>
            <div>LinkedIn: <a href="https://www.linkedin.com/in/rohan-karthick-4aa9b72b2/" target="_blank" rel="noreferrer" className="text-cyan-400 underline">rohan-karthick-4aa9b72b2</a></div>
            <div>Location: Pollachi / Erode, Tamil Nadu, India</div>
          </div>
        );
        break;

      case 'github':
        window.open('https://github.com/rohankarthick77', '_blank');
        outputNode = (
          <div className="text-xs text-neutral-300">
            Opening <a href="https://github.com/rohankarthick77" target="_blank" rel="noreferrer" className="text-cyan-400 underline">https://github.com/rohankarthick77</a> in a new tab...
          </div>
        );
        break;

      case 'status':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">HOST:</span>
              <span className="text-white font-mono">Bannari Amman Institute of Tech (BIT '27)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">DEGREE:</span>
              <span className="text-white font-mono">B.E. Computer Science and Design</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-neutral-500">AVAILABILITY:</span>
              <span className="text-emerald-400 font-bold font-mono">OPEN FOR ENGINEERING ROLES & COLLABORATIONS</span>
            </div>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      default:
        outputNode = (
          <div className="text-xs text-rose-400 font-mono">
            zsh: command not found: <span className="text-white font-bold">{cmdStr}</span>. Type <span className="text-cyan-400 font-bold underline cursor-pointer" onClick={() => executeCommand('help')}>help</span> for valid commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: cmdStr,
        output: outputNode,
        time: getTime(),
      },
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section id="terminal" className="relative w-full py-28 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5 bg-canvas">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-crimson/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-white/10 pb-6 mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <TerminalIcon className="h-4 w-4 text-cyan-400 animate-pulse" />
              <span className="text-cyan-400 font-bold">// INTERACTIVE SHELL</span>
              <span className="uppercase tracking-widest text-neutral-200">DEVELOPER CONSOLE</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Live Systems Terminal
            </h2>
          </div>
          <p className="max-w-md font-sans text-xs sm:text-sm text-neutral-400">
            Interactive command-line interface directly inspecting Rohan's background, system capabilities, and engineering records.
          </p>
        </div>

        {/* Terminal Window Card */}
        <div
          onClick={() => inputRef.current?.focus()}
          className="relative w-full rounded-3xl bg-[#09090d]/95 border border-white/15 overflow-hidden backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.9),0_0_50px_rgba(0,240,255,0.15)] font-mono cursor-text"
        >
          {/* Top Titlebar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-white/[0.03] border-b border-white/10 select-none">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-rose-500/80 border border-rose-600/50 inline-block" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 border border-amber-600/50 inline-block" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 border border-emerald-600/50 inline-block" />
              <span className="ml-3 text-xs text-neutral-400 font-bold hidden sm:inline">rohan@bit-darwin: ~ (zsh)</span>
            </div>

            <div className="flex items-center gap-3 text-[11px] text-neutral-400">
              <span className="text-emerald-400 flex items-center gap-1 font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                ONLINE
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  playClickSound();
                  executeCommand('clear');
                }}
                className="hover:text-white flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10"
              >
                <RotateCcw className="h-3 w-3" />
                CLEAR
              </button>
            </div>
          </div>

          {/* Quick Suggestions Strip */}
          <div className="px-5 py-2.5 bg-black/40 border-b border-white/5 flex flex-wrap items-center gap-2 text-xs select-none">
            <span className="text-neutral-500 text-[11px] uppercase tracking-wider mr-1 font-bold">QUICK:</span>
            {INITIAL_COMMANDS.map((cmd) => (
              <button
                key={cmd}
                onClick={(e) => {
                  e.stopPropagation();
                  executeCommand(cmd);
                }}
                onMouseEnter={playHoverSound}
                className="px-2.5 py-1 rounded-md bg-white/[0.04] hover:bg-crimson/20 border border-white/10 hover:border-crimson/50 text-neutral-300 hover:text-white transition-all text-[11px]"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="p-5 sm:p-7 min-h-[300px] max-h-[460px] overflow-y-auto space-y-4 text-xs sm:text-sm">
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 text-neutral-400">
                  <span className="text-crimson font-bold">rohan@bit</span>
                  <span className="text-neutral-600">:</span>
                  <span className="text-cyan-400">~</span>
                  <span className="text-neutral-500">$</span>
                  <span className="text-white font-bold">{item.command}</span>
                  <span className="ml-auto text-[10px] text-neutral-600 font-mono hidden sm:inline">{item.time}</span>
                </div>
                <div className="pl-4 border-l border-white/10 py-0.5">{item.output}</div>
              </div>
            ))}

            {/* Current Input Row */}
            <div className="flex items-center gap-2 text-neutral-400 pt-1">
              <span className="text-crimson font-bold">rohan@bit</span>
              <span className="text-neutral-600">:</span>
              <span className="text-cyan-400">~</span>
              <span className="text-neutral-500">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="type 'help' or command..."
                className="flex-1 bg-transparent text-white outline-none font-mono text-xs sm:text-sm placeholder:text-neutral-600"
                autoComplete="off"
                spellCheck="false"
              />
              <button
                onClick={() => executeCommand(inputVal)}
                className="text-neutral-500 hover:text-crimson transition-colors"
                aria-label="Submit command"
              >
                <CornerDownLeft className="h-4 w-4" />
              </button>
            </div>

            <div ref={terminalEndRef} />
          </div>
        </div>
      </div>
    </section>
  );
};
