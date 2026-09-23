import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Building2, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  Layers,
  ChevronDown,
  ChevronUp,
  Award
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const exp = PORTFOLIO_DATA.experience;

  return (
    <motion.section 
      id="experience" 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-2">
          <Briefcase className="w-3.5 h-3.5" />
          <span>ENTERPRISE EXPERIENCE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
          Work History &amp; Impact
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          {exp.overview}
        </p>
      </motion.div>

      {/* Main Experience Card */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md"
      >
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs mb-1">
              <Building2 className="w-3.5 h-3.5" />
              <span>{exp.company}</span>
            </div>
            <h3 className="font-serif text-2xl text-white font-normal">
              {exp.role}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
            <span className="px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-indigo-400" />
              <span>{exp.period}</span>
            </span>
            <span className="px-3 py-1.5 rounded-full bg-slate-950 border border-slate-800 text-slate-300 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>{exp.location}</span>
            </span>
          </div>
        </div>

        {/* Quantified Outcome Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6">
          {exp.highlights.map((h, idx) => (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-indigo-500/40 transition-colors"
            >
              <div className="font-serif text-3xl text-indigo-400 font-semibold mb-1">
                {h.num}
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                {h.label}
              </div>
            </div>
          ))}
        </div>

        {/* Bullets List */}
        <div className="space-y-3 pt-2">
          {exp.bullets.slice(0, isExpanded ? exp.bullets.length : 5).map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
              <span className="leading-relaxed">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Expand / Collapse Button */}
        <div className="pt-6 mt-6 border-t border-slate-800/80 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-xs font-mono text-indigo-400 hover:text-indigo-300 cursor-pointer p-2"
          >
            <span>{isExpanded ? 'Collapse Full Responsibilities' : 'Show All Enterprise Scope (3 More Details)'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

      </motion.div>
    </motion.section>
  );
};
