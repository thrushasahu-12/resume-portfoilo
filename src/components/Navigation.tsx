import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Terminal, 
  BarChart3, 
  Workflow, 
  Briefcase, 
  FileText, 
  Mail, 
  Menu, 
  X,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';

interface NavigationProps {
  onOpenResume: () => void;
  isPlayingVoice: boolean;
  onToggleVoice: () => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenResume,
  isPlayingVoice,
  onToggleVoice,
  activeSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'overview', label: 'Overview', icon: Sparkles },
    { id: 'live-sql', label: 'SQL Console', icon: Terminal },
    { id: 'cohorts', label: 'Cohort Engine', icon: BarChart3 },
    { id: 'etl-pipeline', label: 'ETL Pipeline', icon: Workflow },
    { id: 'projects', label: 'Projects', icon: Database },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Database },
  ];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20 py-2.5' 
          : 'bg-transparent py-4 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Database className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold text-slate-200 tracking-wider flex items-center gap-1.5">
              TS.DATA
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-tight">Thrusha Sahu · Analyst</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1 shadow-inner">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-indigo-600/90 text-white shadow-sm shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Voice */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Voice Audio Toggle */}
          <button
            onClick={onToggleVoice}
            title={isPlayingVoice ? "Pause voice introduction" : "Play voice introduction"}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-full text-xs font-mono transition-all border cursor-pointer ${
              isPlayingVoice
                ? 'bg-indigo-950/80 border-indigo-500/50 text-indigo-300 shadow-sm shadow-indigo-500/20'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {isPlayingVoice ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                <span className="hidden sm:inline">Voice Playing</span>
                <span className="flex gap-0.5 items-center h-3">
                  <span className="w-0.5 h-3 bg-indigo-400 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 h-2 bg-indigo-400 animate-[pulse_0.8s_ease-in-out_infinite_0.1s]" />
                  <span className="w-0.5 h-3.5 bg-indigo-400 animate-[pulse_0.7s_ease-in-out_infinite_0.2s]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Voice Intro</span>
              </>
            )}
          </button>

          {/* Resume Modal Trigger */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all cursor-pointer shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-indigo-400" />
            <span>Resume</span>
          </button>

          {/* Contact Jump */}
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Connect</span>
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 backdrop-blur-xl px-4 py-3 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-900/80 rounded-lg text-left font-medium"
            >
              <item.icon className="w-4 h-4 text-indigo-400" />
              {item.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-800/80 flex gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium bg-slate-900 border border-slate-700 rounded-lg text-slate-200"
            >
              <FileText className="w-3.5 h-3.5 text-indigo-400" />
              View Resume
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium bg-indigo-600 text-white rounded-lg"
            >
              <Mail className="w-3.5 h-3.5" />
              Let's Connect
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
