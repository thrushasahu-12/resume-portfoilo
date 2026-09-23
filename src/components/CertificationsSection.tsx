import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles,
  FileCheck,
  X
} from 'lucide-react';
import { PORTFOLIO_DATA, Certification } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <motion.section 
      id="certifications" 
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
          <Award className="w-3.5 h-3.5" />
          <span>VERIFIED CREDENTIALS</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
          Professional Certifications
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          Industry-validated credentials reinforcing enterprise analytical rigor, advanced spreadsheet modeling, and cloud data architectures.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PORTFOLIO_DATA.certifications.map((cert, idx) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between shadow-xl group"
          >
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <FileCheck className="w-5 h-5" />
              </div>

              <div className="font-mono text-[11px] text-amber-400/90 mb-1 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{cert.issuer}</span>
              </div>

              <h3 className="font-serif text-lg text-white font-normal mb-3 leading-snug">
                {cert.title}
              </h3>

              {/* Skills gained */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {cert.skillsGained.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="font-mono text-[11px] text-slate-500">
                {cert.date}
              </span>
              <button
                onClick={() => setActiveCert(cert)}
                className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View Certificate</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Verification Pop-Up */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>OFFICIALLY VERIFIED CREDENTIAL</span>
            </div>

            <h3 className="font-serif text-2xl text-white font-normal mb-2 pr-6">
              {activeCert.title}
            </h3>

            <p className="text-xs text-slate-400 font-mono mb-4">
              Issued by: <strong className="text-slate-200">{activeCert.issuer}</strong>
            </p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs space-y-2 mb-4">
              <div className="flex justify-between text-slate-400">
                <span>Credential Identifier:</span>
                <span className="text-indigo-400 font-semibold">{activeCert.credentialId}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Status:</span>
                <span className="text-emerald-400 font-semibold">Active &amp; Verified</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Candidate:</span>
                <span className="text-slate-200">Thrusha Sahu</span>
              </div>
            </div>

            <div className="space-y-1.5 mb-6">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                Validated Competencies:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeCert.skillsGained.map((s, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 text-xs font-mono">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setActiveCert(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs cursor-pointer"
              >
                Close Verification
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.section>
  );
};
