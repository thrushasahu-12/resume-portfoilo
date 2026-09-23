import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  ArrowUpRight, 
  Sparkles, 
  Code, 
  X, 
  Copy, 
  Check, 
  BarChart, 
  CheckCircle2,
  Database,
  Layers,
  Terminal
} from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';

interface ProjectsSectionProps {
  onSelectProjectForWorkbench?: (projectId: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProjectForWorkbench }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <motion.section 
      id="projects" 
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08, margin: '0px 0px -50px 0px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-2">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>PRODUCTION WORK &amp; CASE STUDIES</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
          Selected Analytical Projects
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          End-to-end analytical initiatives grounded in ServiceNow enterprise telemetry — transforming messy operational logs into executive clarity.
        </p>
      </motion.div>

      {/* Projects List Grid */}
      <div className="space-y-8">
        {PORTFOLIO_DATA.projects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 sm:p-8 rounded-2xl bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all duration-300 shadow-xl group relative overflow-hidden"
          >
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Header info & GitHub link */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs px-2.5 py-1 rounded-md bg-indigo-950/80 text-indigo-400 border border-indigo-500/30 font-semibold">
                  {project.num}
                </span>
                <span className="font-mono text-xs text-slate-400">
                  {project.type}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-all flex items-center gap-1.5 text-xs font-mono"
                  title="View repository on GitHub"
                >
                  <Github className="w-4 h-4" />
                  <span className="hidden sm:inline">Source Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>

                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-3 py-2 rounded-xl bg-indigo-600/90 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-indigo-600/20 cursor-pointer"
                >
                  <span>Pop-Up Case Study</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Title & Summary */}
            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3 group-hover:text-indigo-200 transition-colors">
              {project.title}
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-6 max-w-4xl">
              {project.summary}
            </p>

            {/* Key Findings List */}
            <div className="mb-6 space-y-2.5 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Validated Findings &amp; Outliers:
              </span>
              {project.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                  <span className="leading-normal">{finding}</span>
                </div>
              ))}
            </div>

            {/* Metrics & Tech Stack */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
              {/* Quantified Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="font-mono text-sm text-indigo-400 font-semibold">{m.value}</div>
                    <div className="text-[11px] text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>
        ))}
      </div>

      {/* Pop-Up Detailed Case Study Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal header */}
            <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-2">
              <span className="px-2 py-0.5 rounded bg-indigo-950 border border-indigo-500/30">
                {selectedProject.num}
              </span>
              <span>{selectedProject.type}</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-3 pr-10">
              {selectedProject.title}
            </h3>

            {/* Context */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Operational Context &amp; Challenge</h4>
              <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                {selectedProject.detailedContext}
              </p>
            </div>

            {/* Dataset dimensions */}
            <div className="grid grid-cols-3 gap-3 mb-6 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">RECORD VOLUME</span>
                <span className="text-slate-200 font-semibold">{selectedProject.datasetStats.rows}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">DIMENSIONS</span>
                <span className="text-slate-200 font-semibold">{selectedProject.datasetStats.columns}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 block text-[10px]">DATA SOURCE</span>
                <span className="text-slate-200 font-semibold">{selectedProject.datasetStats.source}</span>
              </div>
            </div>

            {/* Findings */}
            <div className="mb-6 space-y-2">
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Validated Root Cause &amp; Outcomes</h4>
              {selectedProject.keyFindings.map((f, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <span className="leading-relaxed">{f}</span>
                </div>
              ))}
            </div>

            {/* Code Snippet */}
            {selectedProject.sqlSnippet && (
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2 font-mono text-xs">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5 text-indigo-400" />
                    Production Transformation Logic
                  </span>
                  <button
                    onClick={() => handleCopyCode(selectedProject.sqlSnippet!)}
                    className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 overflow-x-auto text-[11px] font-mono text-indigo-200 leading-relaxed max-h-52">
                  <code>{selectedProject.sqlSnippet}</code>
                </pre>
              </div>
            )}

            {/* External Links */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center gap-2 shadow-sm transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Open Full GitHub Repository</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>
      )}
    </motion.section>
  );
};
