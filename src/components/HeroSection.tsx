import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Pause, 
  Sparkles, 
  ArrowDown, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Terminal, 
  Database,
  BarChart,
  CheckCircle2,
  TrendingUp,
  Clock,
  Layers
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  isPlayingVoice: boolean;
  onToggleVoice: () => void;
  voiceProgress: number; // 0 to 100
  onScrollTo: (id: string) => void;
  onOpenLiveSqlModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  isPlayingVoice,
  onToggleVoice,
  voiceProgress,
  onScrollTo,
  onOpenLiveSqlModal,
}) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <motion.section 
      id="overview" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative min-h-[92vh] flex flex-col justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Decorative gradient backdrops & grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Availability Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-mono mb-8 tracking-wide shadow-sm shadow-indigo-900/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{PORTFOLIO_DATA.personal.status}</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-400">Hyderabad / Remote</span>
        </motion.div>

        {/* Main Title & Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-8">
          <div className="lg:col-span-8">
            <motion.h1 
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight text-white leading-[1.08] mb-4"
            >
              Thrusha <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200">
                Sahu
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed mb-6"
            >
              Senior Data Analyst with <span className="text-white font-medium">3+ years</span> converting messy enterprise data into high-conviction decisions. From raw ITSM SQL queries and Python ETL pipelines to board-ready Power BI telemetry.
            </motion.p>

            {/* Voice Introduction Widget */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-2 pr-4 bg-slate-900/90 border border-slate-800 rounded-2xl sm:rounded-full shadow-lg shadow-black/20 mb-8 max-w-xl"
            >
              <button
                onClick={onToggleVoice}
                className="w-12 h-12 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-md shadow-indigo-600/30 cursor-pointer"
                aria-label={isPlayingVoice ? "Pause voice overview" : "Play audio overview"}
              >
                {isPlayingVoice ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0 px-2 sm:px-0">
                <div className="flex items-center justify-between text-xs mb-1 font-mono">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{isPlayingVoice ? "Narrating Professional Summary..." : "Hear Thrusha's 30s Audio Intro"}</span>
                  </span>
                  <span className="text-slate-400 tabular-nums">
                    {isPlayingVoice ? `${Math.round(voiceProgress)}%` : "0:28"}
                  </span>
                </div>

                {/* Animated Waveform Bars */}
                <div className="flex items-center gap-1 h-4">
                  {[4, 8, 14, 6, 12, 16, 10, 14, 8, 12, 16, 10, 14, 6, 12, 8, 4].map((h, i) => (
                    <span
                      key={i}
                      style={{
                        height: isPlayingVoice ? `${Math.max(4, (h * (0.6 + Math.sin((voiceProgress * 0.1) + i) * 0.4)))}px` : `${Math.min(h, 6)}px`,
                        transition: 'height 0.15s ease',
                      }}
                      className={`w-1 rounded-full ${
                        isPlayingVoice ? 'bg-indigo-400' : 'bg-slate-700'
                      }`}
                    />
                  ))}
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden ml-2 flex-1">
                    <div 
                      className="bg-indigo-500 h-full transition-all duration-200"
                      style={{ width: `${voiceProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-wrap items-center gap-3"
            >
              <button
                onClick={() => onScrollTo('projects')}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <span>View Portfolio Projects</span>
                <ArrowDown className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLiveSqlModal}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-indigo-500/50 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <Terminal className="w-4 h-4 text-indigo-400" />
                <span>Pop-Up SQL Sandbox</span>
              </button>

              <a
                href={PORTFOLIO_DATA.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-medium text-xs flex items-center gap-1.5 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>

              <a
                href={PORTFOLIO_DATA.personal.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-800 font-medium text-xs flex items-center gap-1.5 transition-all"
              >
                <Github className="w-4 h-4 text-slate-200" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </motion.div>

          </div>

          {/* Quick Analyst Console Card (Side Anchor) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="font-mono text-xs text-indigo-400 font-medium flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                TS_PROFILE_METRICS
              </span>
              <span className="text-[11px] font-mono text-slate-500">v2026.09</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="text-slate-400">Current Role</span>
                <span className="text-slate-200 font-semibold">Data Analyst</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="text-slate-400">Primary Domain</span>
                <span className="text-indigo-300">ServiceNow ITSM & BI</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="text-slate-400">Core Stack</span>
                <span className="text-slate-300">SQL · Python · Power BI</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/60">
                <span className="text-slate-400">Email</span>
                <button 
                  onClick={handleCopyEmail}
                  className="text-xs text-indigo-400 hover:underline cursor-pointer flex items-center gap-1"
                >
                  {copiedEmail ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Copied!
                    </span>
                  ) : (
                    <span>thrusha.sahu96@gmail.com</span>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <span>Embedded in ServiceNow workflows via Magnit Global</span>
            </div>
          </motion.div>
        </div>

        {/* Quantifiable Impact Stats Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-slate-800/80"
        >
          {PORTFOLIO_DATA.stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.08 }}
              className="p-4 rounded-xl bg-slate-900/50 hover:bg-slate-900/80 border border-slate-800/80 hover:border-indigo-500/40 transition-all group"
            >
              <div className="font-serif text-3xl sm:text-4xl text-indigo-400 group-hover:text-indigo-300 transition-colors font-medium">
                {stat.value}
              </div>
              <div className="text-xs text-slate-400 mt-1.5 leading-snug">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};
