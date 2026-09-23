import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Workflow, 
  Play, 
  RotateCw, 
  CheckCircle2, 
  AlertTriangle, 
  FileCode, 
  Terminal, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Database
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { INITIAL_ETL_STAGES, EtlStageMetric } from '../data/mockDatasets';

export const EtlPipelineSimulator: React.FC = () => {
  const [stages, setStages] = useState<EtlStageMetric[]>(INITIAL_ETL_STAGES);
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(4); // Completed by default
  const [logs, setLogs] = useState<string[]>([
    "[10:42:01.120] Initializing ServiceNow Change Request Ingestion Worker...",
    "[10:42:01.450] Ingested 5,600 raw records from 'change_request_export_2024.csv'.",
    "[10:42:01.890] Executing deduplication: Found 301 duplicate change_ids. Deduplicating on primary hash key.",
    "[10:42:02.110] Multi-format date parsing: Normalized 4 heterogeneous timestamp formats across 5,299 records.",
    "[10:42:02.540] SOX Compliance Check: 2,674 records flagged with missing approver_id (HIGH SEVERITY).",
    "[10:42:02.980] Idempotent load to SQLite database table 'dim_change_requests' committed. DQ Score: 98.4%."
  ]);
  const [showCode, setShowCode] = useState(false);

  const handleRunPipeline = () => {
    setIsRunning(true);
    setActiveStep(0);
    setLogs(["[00:00.000] Pipeline triggered manually by analyst..."]);

    const stageTimeouts = [
      { step: 0, delay: 400, log: "[00:00.400] Stage 1: Ingesting 5,600 raw CSV rows from ServiceNow ITSM..." },
      { step: 1, delay: 1000, log: "[00:01.000] Stage 2: Deduplication running... 301 duplicates identified & dropped." },
      { step: 2, delay: 1600, log: "[00:01.600] Stage 3: Normalizing mixed date formats (ISO, epoch, US slash) to UTC." },
      { step: 3, delay: 2200, log: "[00:02.200] Stage 4: High-severity compliance audit... 2,674 missing approvers flagged." },
      { step: 4, delay: 2800, log: "[00:02.800] Stage 5: Writing clean dataset to SQLite 'dim_change_requests' table." }
    ];

    stageTimeouts.forEach(({ step, delay, log }) => {
      setTimeout(() => {
        setActiveStep(step);
        setLogs(prev => [...prev, log]);

        if (step === 4) {
          setIsRunning(false);
          setLogs(prev => [...prev, "[00:03.100] Pipeline complete! 100% idempotent audit trail generated."]);
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#6366f1', '#a855f7', '#10b981']
          });
        }
      }, delay);
    });
  };

  return (
    <motion.section 
      id="etl-pipeline" 
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
        className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-xs text-indigo-400 mb-2">
            <Workflow className="w-3.5 h-3.5" />
            <span>INTERACTIVE WORKBENCH · PROJECT 02</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Automated Python ETL Pipeline
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
            Simulate Thrusha's end-to-end Python pipeline that replaced a 3-hour monthly manual review process. Normalizes 5,600 raw records, flags 2,674 compliance risks, and guarantees warehouse idempotency.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCode(!showCode)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-indigo-400" />
            <span>{showCode ? 'Hide Python Code' : 'View Pipeline Script'}</span>
          </button>

          <button
            onClick={handleRunPipeline}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-mono text-xs font-semibold flex items-center gap-2 shadow-md shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Simulate Pipeline Run</span>
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Code Drawer */}
      {showCode && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 font-mono text-xs text-slate-300 space-y-2 animate-in fade-in duration-300">
          <div className="flex justify-between items-center text-indigo-400 font-semibold border-b border-slate-800 pb-2">
            <span>ETL_CHANGE_PIPELINE.PY</span>
            <span className="text-slate-500 text-[11px]">Pandas + SQLite3 + Idempotent Ingestion</span>
          </div>
          <pre className="text-slate-300 text-[11px] overflow-x-auto p-2 bg-slate-900 rounded-lg">
{`import pandas as pd
import sqlite3
import numpy as np

def run_change_etl(raw_csv_path: str, db_path: str = 'warehouse.db'):
    # Step 1: Ingest
    df = pd.read_csv(raw_csv_path, dtype=str)
    
    # Step 2: Deduplication on natural key
    df = df.drop_duplicates(subset=['change_id'], keep='last')
    
    # Step 3: Multi-format date parsing
    df['planned_start_dt'] = pd.to_datetime(df['planned_start'], format='mixed', errors='coerce')
    df['closed_dt'] = pd.to_datetime(df['closed_at'], format='mixed', errors='coerce')
    
    # Step 4: Tiered Compliance Flags
    missing_approver = df['approver_id'].isna() | (df['approver_id'].str.strip() == '')
    df['compliance_severity'] = np.where(missing_approver, 'HIGH_RISK', 'COMPLIANT')
    
    # Step 5: Idempotent Warehouse Load
    with sqlite3.connect(db_path) as conn:
        df.to_sql('dim_change_requests', conn, if_exists='replace', index=False)
        print("Pipeline finished successfully with 100% idempotency.")`}
          </pre>
        </div>
      )}

      {/* Pipeline Stages Stepper */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
        {stages.map((stage, idx) => {
          const isCurrent = activeStep === idx && isRunning;
          const isDone = activeStep >= idx;

          return (
            <div
              key={stage.stage}
              className={`p-4 rounded-xl border transition-all ${
                isCurrent 
                  ? 'bg-indigo-950/80 border-indigo-400 shadow-lg shadow-indigo-500/20 scale-[1.02]' 
                  : isDone
                  ? 'bg-slate-900/90 border-slate-800'
                  : 'bg-slate-950/60 border-slate-900 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between font-mono text-xs mb-2">
                <span className="text-indigo-400 font-semibold">{stage.stage}</span>
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-700" />
                )}
              </div>
              <h4 className="text-xs font-semibold text-white mb-1 leading-snug">
                {stage.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-tight mb-2">
                {stage.details}
              </p>
              <div className="font-mono text-[10px] text-indigo-300 bg-slate-950/80 px-2 py-1 rounded border border-slate-800">
                {stage.auditFlag}
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Log Console & Quality Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal Output */}
        <div className="lg:col-span-2 bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
            <span className="text-slate-400 flex items-center gap-1.5 text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              STDOUT / PIPELINE AUDIT TRAIL
            </span>
            <span className="text-[10px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              DAEMON READY
            </span>
          </div>
          <div className="h-44 overflow-y-auto space-y-1.5 text-slate-300 text-[11px] pr-2">
            {logs.map((log, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-slate-600 select-none">&gt;</span>
                <span className={log.includes("HIGH SEVERITY") ? "text-rose-400" : log.includes("Deduplicating") ? "text-amber-300" : "text-slate-300"}>
                  {log}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Scorecard */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="font-mono text-xs text-indigo-400 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                DATA QUALITY SCORECARD
              </span>
              <span className="font-mono text-xs text-slate-400">v2.4</span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between items-center text-slate-300">
                <span>Deduplication Efficacy:</span>
                <span className="text-emerald-400 font-semibold">100% (301 dropped)</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Timestamp Consistency:</span>
                <span className="text-emerald-400 font-semibold">100% UTC</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Missing Approvers Isolated:</span>
                <span className="text-rose-400 font-semibold">2,674 Records</span>
              </div>
              <div className="flex justify-between items-center text-slate-300">
                <span>Manual Cycle Reduction:</span>
                <span className="text-indigo-400 font-semibold">3 hrs → 45 sec</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Calculated Health Index:</span>
            <span className="text-xl font-serif font-bold text-emerald-400">98.4%</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
