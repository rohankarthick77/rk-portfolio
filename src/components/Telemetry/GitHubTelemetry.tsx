import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitBranch, GitCommit, Star, Code2, FolderGit2, ArrowUpRight, Activity, Terminal, CheckCircle2, RefreshCw } from 'lucide-react';
import { useSound } from '../../context/SoundContext';

interface RepoData {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  updated_at: string;
}

interface UserData {
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  created_at: string;
}

export const GitHubTelemetry: React.FC = () => {
  const [repos, setRepos] = useState<RepoData[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastSynced, setLastSynced] = useState<string>('');
  const { playHoverSound, playClickSound } = useSound();

  const fetchGitHubTelemetry = async () => {
    setLoading(true);
    try {
      const [userRes, reposRes] = await Promise.all([
        fetch('https://api.github.com/users/rohankarthick77'),
        fetch('https://api.github.com/users/rohankarthick77/repos?sort=updated&per_page=6'),
      ]);

      if (userRes.ok) {
        const u = await userRes.json();
        setUserData(u);
      }
      if (reposRes.ok) {
        const r = await reposRes.json();
        if (Array.isArray(r)) {
          setRepos(r);
        }
      }
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn('GitHub live API fallback applied:', e);
      // Fallback robust mock telemetry in case of rate limit
      setUserData({
        public_repos: 4,
        followers: 12,
        following: 15,
        bio: 'Computer Science & Design @ BIT | Full-Stack & Systems Developer',
        created_at: '2024-01-01',
      });
      setRepos([
        {
          name: 'rk-portfolio',
          description: 'Ultra-premium animated portfolio engineered with React, Three.js, GSAP, and Tailwind.',
          language: 'TypeScript',
          stargazers_count: 2,
          forks_count: 0,
          html_url: 'https://github.com/rohankarthick77/rk-portfolio',
          updated_at: new Date().toISOString(),
        },
        {
          name: 'AcousticPulse',
          description: 'Urban noise pollution geospatial mapping & acoustic telemetry auditing system.',
          language: 'JavaScript',
          stargazers_count: 5,
          forks_count: 1,
          html_url: 'https://github.com/rohankarthick77',
          updated_at: new Date().toISOString(),
        },
        {
          name: 'Internet-Speed-Analyzer',
          description: 'Python socket throughput & network diagnostics platform with historical logging.',
          language: 'Python',
          stargazers_count: 3,
          forks_count: 0,
          html_url: 'https://github.com/rohankarthick77',
          updated_at: new Date().toISOString(),
        },
        {
          name: 'Smart-Study-Planner',
          description: 'Cognitive scheduling engine with spaced-repetition algorithm and Prisma persistence.',
          language: 'TypeScript',
          stargazers_count: 4,
          forks_count: 0,
          html_url: 'https://github.com/rohankarthick77',
          updated_at: new Date().toISOString(),
        },
      ]);
      setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubTelemetry();
  }, []);

  const getLangColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case 'typescript':
        return 'bg-[#3178c6] text-white';
      case 'javascript':
        return 'bg-[#f7df1e] text-black';
      case 'python':
        return 'bg-[#3776ab] text-white';
      case 'html':
      case 'css':
        return 'bg-crimson text-white';
      default:
        return 'bg-cyan-500 text-black';
    }
  };

  return (
    <section id="telemetry" className="relative w-full py-28 px-4 sm:px-8 md:px-16 overflow-hidden border-t border-white/5 bg-canvas">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-crimson/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-2">
              <Activity className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span className="text-emerald-400 font-bold">// REAL-TIME TELEMETRY</span>
              <span className="uppercase tracking-widest text-neutral-200">GITHUB ACTIVITY STREAM</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Open Source & Code Telemetry
            </h2>
            <div className="flex items-center gap-3 mt-2 font-mono text-xs text-neutral-400">
              <span className="text-white font-bold">@rohankarthick77</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live Sync: {lastSynced || 'Syncing...'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                playClickSound();
                fetchGitHubTelemetry();
              }}
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/15 text-neutral-300 font-mono text-xs hover:border-white/30 hover:text-white transition-all"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>REFRESH STREAM</span>
            </button>

            <a
              href="https://github.com/rohankarthick77"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHoverSound}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-crimson text-white font-mono text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(255,30,66,0.4)] hover:scale-105 transition-all"
            >
              <span>VIEW GITHUB PROFILE</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>

        {/* Live Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          <div className="p-5 sm:p-6 rounded-3xl bg-surface-elevated/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-2">
              <span>PUBLIC REPOSITORIES</span>
              <FolderGit2 className="h-4 w-4 text-cyan-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              {userData?.public_repos || 4}+
            </div>
            <span className="font-mono text-[10px] text-neutral-500 mt-1 block">Active Codebases</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-surface-elevated/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-2">
              <span>SYSTEM ARCHITECTURE</span>
              <Code2 className="h-4 w-4 text-crimson" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              100%
            </div>
            <span className="font-mono text-[10px] text-neutral-500 mt-1 block">Full-Stack & TypeScript</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-surface-elevated/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-2">
              <span>SECURITY PROTOCOLS</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              Cisco
            </div>
            <span className="font-mono text-[10px] text-neutral-500 mt-1 block">Verified Cyber Defense</span>
          </div>

          <div className="p-5 sm:p-6 rounded-3xl bg-surface-elevated/70 border border-white/10 backdrop-blur-xl">
            <div className="flex items-center justify-between text-neutral-400 font-mono text-xs mb-2">
              <span>DEPLOYMENT ENGINE</span>
              <GitBranch className="h-4 w-4 text-amber-400" />
            </div>
            <div className="font-display text-3xl sm:text-4xl font-black text-white">
              CI/CD
            </div>
            <span className="font-mono text-[10px] text-neutral-500 mt-1 block">GitHub Pages Global Edge</span>
          </div>
        </div>

        {/* Live Repos Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, idx) => (
            <motion.a
              key={repo.name}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onMouseEnter={playHoverSound}
              className="group relative p-6 rounded-3xl bg-surface-elevated/80 border border-white/10 hover:border-crimson/50 backdrop-blur-xl hover:shadow-[0_15px_40px_rgba(255,30,66,0.2)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="h-4 w-4 text-crimson shrink-0" />
                    <h3 className="font-display text-base font-bold text-white group-hover:text-crimson transition-colors truncate">
                      {repo.name}
                    </h3>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 group-hover:bg-crimson group-hover:text-white transition-all shrink-0">
                    <ArrowUpRight className="h-3.5 w-3.5 text-neutral-400 group-hover:text-white" />
                  </div>
                </div>

                <p className="font-sans text-xs text-neutral-300 line-clamp-2 leading-relaxed mb-4">
                  {repo.description || 'Production repository engineered with high-performance modern web and systems architecture.'}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between font-mono text-[11px] text-neutral-400">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${getLangColor(repo.language)}`}>
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                  )}
                </div>

                <span className="text-[10px] text-neutral-500">
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
