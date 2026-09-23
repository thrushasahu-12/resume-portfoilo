import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  BarChart3, 
  Workflow, 
  FileText, 
  ChevronUp, 
  Sparkles, 
  Maximize2,
  Database,
  Layers,
  ArrowRight
} from 'lucide-react';

interface ScrollTelemetryHUDProps {
  activeSection: string;
  onOpenWorkstation: (type: 'sql' | 'cohort' | 'etl' | 'resume') => void;
}

export const ScrollTelemetryHUD: React.FC<ScrollTelemetryHUDProps> = ({
  activeSection,
  onOpenWorkstation
}) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [lastSection, setLastSection] = useState(activeSection);

  useEffect(() => {
    const handleScroll = () => {
      const winHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight - winHeight;
      const scrolled = Math.max(0, Math.min(100, (window.scrollY / (docHeight || 1)) * 100));
      setScrollPercent(Math.round(scrolled));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pop up an interactive notification badge when section changes on scroll
  useEffect(() => {
    if (activeSection !== lastSection) {
      setLastSection(activeSection);
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 4500);
      return () => clearTimeout(timer);
    }
  }, [activeSection, lastSection]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionAction = () => {
    switch (activeSection) {
      case 'live-sql':
        return {
          label: 'Pop-Up SQL Console',
          sub: 'Execute live queries against 5,200 records',
          icon: Terminal,
          action: () => onOpenWorkstation('sql')
        };
      case 'cohorts':
        return {
          label: 'Pop-Up Cohort Studio',
          sub: 'Inspect DAX measures & 18 cohort heatmaps',
          icon: BarChart3,
          action: () => onOpenWorkstation('cohort')
        };
      case 'etl-pipeline':
        return {
          label: 'Pop-Up ETL Visualizer',
          sub: 'Run idempotent Python pipeline simulator',
          icon: Workflow,
          action: () => onOpenWorkstation('etl')
        };
      default:
        return {
          label: 'Pop-Up Resume Dossier',
          sub: 'Print or export Thrusha Sahu\'s CV',
          icon: FileText,
          action: () => onOpenWorkstation('resume')
        };
    }
  };

  const action = getSectionAction();

  return (
    <div className="fixed bottom-5 right-4 sm:right-6 z-40 flex flex-col items-end gap-2.5 pointer-events-none">
      
      {/* Dynamic Pop-Up Interface Trigger that pops up as the user scrolls into each section */}
      {showNotification && (
        <div className="pointer-events-auto max-w-sm p-3.5 rounded-2xl bg-slate-900/95 border border-indigo-500/50 shadow-2xl backdrop-blur-xl text-left animate-in slide-in-from-bottom-3 fade-in duration-300">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600/90 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-600/30">
              <action.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-indigo-400 font-semibold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-indigo-300" />
                <span>Scroll Triggered Interface</span>
              </div>
              <div className="text-xs font-semibold text-white truncate">
                {action.label}
              </div>
              <div className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                {action.sub}
              </div>
              <button
                onClick={action.action}
                className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <span>Launch Pop-Up Interface</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Mini Telemetry HUD Pill */}
      <div className="pointer-events-auto flex items-center gap-2 p-1.5 bg-slate-950/85 border border-slate-800 rounded-full shadow-2xl backdrop-blur-md">
        
        {/* Quick Pop-up trigger button */}
        <button
          onClick={action.action}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 hover:bg-indigo-950/80 border border-slate-700/80 hover:border-indigo-500/50 text-slate-200 text-xs font-mono transition-all cursor-pointer group"
          title="Open interactive pop-up tool"
        >
          <action.icon className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline font-medium">{action.label}</span>
          <Maximize2 className="w-3 h-3 text-slate-400" />
        </button>

        {/* Scroll percentage indicator */}
        <div className="px-2.5 py-1 text-[11px] font-mono tabular-nums text-slate-400 flex items-center gap-1 border-l border-slate-800">
          <span className="text-indigo-400 font-semibold">{scrollPercent}%</span>
        </div>

        {/* Scroll back to top */}
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          title="Scroll to top"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
