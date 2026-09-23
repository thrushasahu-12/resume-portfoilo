import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Github, 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2,
  Terminal
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export const ContactTerminal: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(PORTFOLIO_DATA.personal.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <motion.section 
      id="contact" 
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
          <Mail className="w-3.5 h-3.5" />
          <span>INITIATE CONTACT · HYDERABAD &amp; REMOTE</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
          Let's Build Impactful Data Systems
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
          Open to Data Analyst, BI Developer, and SQL Analyst opportunities across enterprise SaaS, healthcare, and high-scale operational environments.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Contact Method Cards (Direct) */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 space-y-4"
        >
          
          {/* Email card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group">
            <a 
              href={`mailto:${PORTFOLIO_DATA.personal.email}`}
              className="flex items-center gap-4 min-w-0"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-950/80 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Direct Email
                </span>
                <span className="text-sm font-medium text-white group-hover:text-indigo-300 transition-colors truncate block">
                  {PORTFOLIO_DATA.personal.email}
                </span>
              </div>
            </a>
            <button
              onClick={handleCopyEmail}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
              title="Copy Email"
            >
              {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* Phone card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group">
            <a 
              href={`tel:${PORTFOLIO_DATA.personal.phone}`}
              className="flex items-center gap-4 min-w-0"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-950/80 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Phone className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  Direct Mobile / WhatsApp
                </span>
                <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors truncate block">
                  {PORTFOLIO_DATA.personal.phone}
                </span>
              </div>
            </a>
            <button
              onClick={handleCopyPhone}
              className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0 ml-2"
              title="Copy Phone"
            >
              {copiedPhone ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>

          {/* LinkedIn card */}
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group block"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-blue-950/80 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Linkedin className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  LinkedIn Profile
                </span>
                <span className="text-sm font-medium text-white group-hover:text-blue-300 transition-colors truncate block">
                  in/{PORTFOLIO_DATA.personal.linkedinHandle}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
          </a>

          {/* GitHub card */}
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all flex items-center justify-between group block"
          >
            <div className="flex items-center gap-4 min-w-0">
              <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Github className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider block">
                  GitHub Repositories
                </span>
                <span className="text-sm font-medium text-white group-hover:text-slate-200 transition-colors truncate block">
                  github.com/{PORTFOLIO_DATA.personal.githubHandle}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors shrink-0" />
          </a>

        </motion.div>

        {/* Message Transmission Form */}
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-md"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6 font-mono text-xs">
            <span className="text-indigo-400 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>DIRECT DISPATCH CONSOLE</span>
            </span>
            <span className="text-slate-500">256-BIT ENCRYPTED</span>
          </div>

          {isSent ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl text-white">
                Inquiry Transmitted Successfully
              </h3>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out! Thrusha typically responds within 12 hours. You can also reach out directly via phone or LinkedIn.
              </p>
              <button
                onClick={() => {
                  setIsSent(false);
                  setFormData({ name: '', email: '', company: '', message: '' });
                }}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono transition-colors cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[11px]">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Lin"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[11px]">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. ServiceNow, Enterprise Tech"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1.5 uppercase tracking-wider text-[11px]">
                  Message / Role Scope *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Hi Thrusha, we are expanding our data team and loved your SQL incident and cohort retention analysis..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs font-mono flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
              </button>
            </form>
          )}

        </motion.div>

      </div>

      {/* Footer copyright */}
      <footer className="mt-20 pt-8 border-t border-slate-800/80 text-center font-mono text-xs text-slate-500 space-y-2">
        <p>
          <span className="text-indigo-400">Thrusha Sahu</span> · Senior Data Analyst · Hyderabad, India · Rebuilt with High-Fancy Telemetry
        </p>
        <p className="text-[11px] text-slate-600">
          SQL · Python · Pandas · Power BI · DAX · AWS Redshift · BigQuery
        </p>
      </footer>
    </motion.section>
  );
};
