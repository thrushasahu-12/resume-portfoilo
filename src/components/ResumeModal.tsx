import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  Copy, 
  Check, 
  FileText, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink 
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
THRUSHA SAHU — DATA ANALYST
Hyderabad, India | +91 9502033252 | thrusha.sahu96@gmail.com
LinkedIn: ${PORTFOLIO_DATA.personal.linkedin}
GitHub: ${PORTFOLIO_DATA.personal.github}

PROFESSIONAL SUMMARY
Data Analyst with 3+ years of experience turning messy enterprise datasets into actionable executive decisions. Specialized in advanced SQL (CTEs, Window Functions), Python automation pipelines (Pandas), and Power BI executive dashboards.

EXPERIENCE
Data Analyst | ServiceNow (Client) · Magnit Global Pvt Ltd | 2022 – 2025 (Hyderabad)
- Analyzed millions of enterprise ITSM records to surface trends, anomalies, and business opportunities.
- Reduced manual reporting effort by 40% using automated Python and Power Query pipelines.
- Reduced repeat production incidents by 30% via root cause analysis (RCA).
- Engineered advanced SQL queries (Joins, CTEs, Window Functions) for data quality audits across AWS Redshift and BigQuery.

SELECTED PROJECTS
1. Incident SLA Breach Analysis (SQL, SQLite)
2. Change Management ETL Pipeline (Python, Pandas, SQLite)
3. Cohort Retention & Trend Analysis (SQL, Python, Power BI, DAX)

EDUCATION & CERTIFICATIONS
- Microsoft Professional Certification: Advanced Functions and Data Analysis in Excel
- edX Verified Professional Certificate: Enabling Technologies for Data Science and Analytics
- Microsoft Certified Application Specialist: Enterprise Data Tracking
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs">
            <FileText className="w-4 h-4" />
            <span>EXECUTIVE DOSSIER / RESUME VIEW</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="px-3 py-1.5 rounded-lg text-xs font-mono text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied Text' : 'Copy Text'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Canvas */}
        <div className="p-6 sm:p-10 overflow-y-auto bg-slate-950/50 space-y-8 text-slate-200 font-sans">
          
          {/* Header */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <div>
                <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
                  Thrusha Sahu
                </h1>
                <div className="text-indigo-400 font-mono text-sm mt-1">
                  Senior Data Analyst · BI &amp; SQL Specialist
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400 sm:text-right space-y-1">
                <div>Hyderabad, India · Open to Remote</div>
                <div>thrusha.sahu96@gmail.com · +91 9502033252</div>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-slate-800/60 font-mono text-xs text-slate-400">
              <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>linkedin.com/in/{PORTFOLIO_DATA.personal.linkedinHandle}</span>
              </a>
              <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="hover:text-indigo-400 flex items-center gap-1">
                <Github className="w-3.5 h-3.5" />
                <span>github.com/{PORTFOLIO_DATA.personal.githubHandle}</span>
              </a>
            </div>
          </div>

          {/* Summary */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-400 mb-2 font-semibold">
              Executive Summary
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {PORTFOLIO_DATA.personal.bio}
            </p>
          </div>

          {/* Technical Stack */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-400 mb-2 font-semibold">
              Technical Core Competencies
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-indigo-300 font-semibold block mb-1">Querying &amp; Modeling:</span>
                <span className="text-slate-400">Advanced SQL, Chained CTEs, Window Functions (ROW_NUMBER, RANK, LAG), Query Tuning, Star Schema, Kimball Modeling</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-indigo-300 font-semibold block mb-1">Scripting &amp; ETL:</span>
                <span className="text-slate-400">Python 3 (Pandas, NumPy), SQLite3, Multi-format Date Parsing, Automated Data Quality Audits, Idempotent Pipelines</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-indigo-300 font-semibold block mb-1">BI &amp; Analytics:</span>
                <span className="text-slate-400">Power BI (DAX Measures, Cohort Heatmaps), Tableau, Power Query (M-Code), Executive KPI Dashboards</span>
              </div>
              <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                <span className="text-indigo-300 font-semibold block mb-1">Cloud Warehouses:</span>
                <span className="text-slate-400">Amazon Redshift, Google BigQuery, AWS S3 Data Lakes, Snowflake, ServiceNow ITSM Tables</span>
              </div>
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-400 mb-3 font-semibold">
              Professional Work History
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-indigo-500/50 pl-4 py-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                  <h3 className="text-base font-semibold text-white">
                    Data Analyst
                  </h3>
                  <span className="font-mono text-xs text-slate-400">2022 – 2025 · Hyderabad</span>
                </div>
                <div className="text-xs text-indigo-400 font-mono mb-2">
                  ServiceNow (Client) · Magnit Global Pvt Ltd
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
                  <li>Analyzed millions of enterprise ITSM records to uncover operational bottlenecks and surface high-conviction decision data for leadership.</li>
                  <li>Slashed manual weekly reporting effort by 40% through custom Python and Power Query automation pipelines.</li>
                  <li>Decreased repeat production defect tickets by 30% through disciplined Root Cause Analysis (RCA) frameworks.</li>
                  <li>Authored scalable SQL queries with multi-level CTEs and window partitions across AWS Redshift and BigQuery databases.</li>
                  <li>Engineered 3-page interactive Power BI dashboards tracking SLA adherence, team resolution times, and cohort retention.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Selected Projects */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-400 mb-3 font-semibold">
              Key Analyst Portfolio Projects
            </h2>
            <div className="space-y-3">
              {PORTFOLIO_DATA.projects.map((p) => (
                <div key={p.id} className="bg-slate-900/40 p-3 rounded-lg border border-slate-800/80">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs font-semibold text-white">{p.title}</span>
                    <span className="font-mono text-[11px] text-indigo-400">{p.type}</span>
                  </div>
                  <p className="text-xs text-slate-400 mb-1">{p.summary}</p>
                  <div className="font-mono text-[10px] text-slate-500">
                    Repository: {p.githubUrl}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="font-mono text-xs uppercase tracking-wider text-indigo-400 mb-2 font-semibold">
              Certifications &amp; Credentials
            </h2>
            <div className="space-y-2 text-xs">
              {PORTFOLIO_DATA.certifications.map((c) => (
                <div key={c.id} className="flex justify-between text-slate-300">
                  <span>• {c.title} — <strong className="text-white">{c.issuer}</strong></span>
                  <span className="font-mono text-slate-500">{c.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
