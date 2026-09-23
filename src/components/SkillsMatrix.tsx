import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Terminal, 
  Sparkles, 
  Database, 
  BarChart, 
  Cloud, 
  Cpu, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { PORTFOLIO_DATA, SkillCategory } from '../data/portfolioData';

export const SkillsMatrix: React.FC = () => {
  const [selectedSkill, setSelectedSkill] = useState<{
    name: string;
    useCase: string;
    category: string;
  } | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories = activeCategory === 'all'
    ? PORTFOLIO_DATA.skills
    : PORTFOLIO_DATA.skills.filter(cat => cat.title.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <motion.section 
      id="skills" 
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
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>TECHNICAL PROFICIENCIES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Skills &amp; Analytical Toolkit
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
            A full-stack enterprise data analyst capability matrix — from raw SQL extraction to stakeholder-ready executive dashboards.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
          {[
            { id: 'all', label: 'All Domains' },
            { id: 'query', label: 'SQL' },
            { id: 'python', label: 'Python' },
            { id: 'bi', label: 'BI & Power BI' },
            { id: 'cloud', label: 'Cloud' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                activeCategory === tab.id
                  ? 'bg-indigo-600 text-white font-medium'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Grid of Skill Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((cat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <span className="font-mono text-xs font-semibold text-indigo-400 tracking-wider uppercase">
                  {cat.title}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {cat.skills.length} TOOLS
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-4 leading-relaxed">
                {cat.description}
              </p>

              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setSelectedSkill({
                      name: skill.name,
                      useCase: skill.useCase,
                      category: cat.title
                    })}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all cursor-pointer flex items-center gap-1 ${
                      skill.highlight
                        ? 'bg-indigo-950/90 text-indigo-300 border border-indigo-500/40 hover:border-indigo-400 hover:bg-indigo-900/90 font-medium'
                        : 'bg-slate-950 text-slate-400 border border-slate-800/80 hover:border-slate-600 hover:text-slate-200'
                    }`}
                  >
                    <span>{skill.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>Click any skill to inspect usage</span>
              <Info className="w-3.5 h-3.5" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pop-Up Modal for Clicked Skill */}
      {selectedSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedSkill(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="font-mono text-xs text-indigo-400 mb-1 uppercase">
              {selectedSkill.category}
            </div>
            <h3 className="font-serif text-2xl text-white font-normal mb-3">
              {selectedSkill.name}
            </h3>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-4">
              <span className="font-mono text-indigo-400 block mb-1 text-[11px] uppercase tracking-wider">
                Production Implementation at ServiceNow:
              </span>
              {selectedSkill.useCase}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setSelectedSkill(null)}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
