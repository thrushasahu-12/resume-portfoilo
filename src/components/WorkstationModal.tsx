import React from 'react';
import { X, Terminal, BarChart3, Workflow, FileText, Maximize2 } from 'lucide-react';
import { LiveSqlWorkbench } from './LiveSqlWorkbench';
import { CohortEngine } from './CohortEngine';
import { EtlPipelineSimulator } from './EtlPipelineSimulator';

interface WorkstationModalProps {
  type: 'sql' | 'cohort' | 'etl' | null;
  onClose: () => void;
}

export const WorkstationModal: React.FC<WorkstationModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const getTitle = () => {
    switch (type) {
      case 'sql':
        return {
          title: 'Dedicated SQL Execution Console',
          subtitle: 'Interactive query analyzer for ServiceNow 5,200 incident dataset',
          icon: Terminal
        };
      case 'cohort':
        return {
          title: 'Dedicated Cohort & Trend Studio',
          subtitle: '18-month customer retention matrix & Power BI DAX telemetry',
          icon: BarChart3
        };
      case 'etl':
        return {
          title: 'Dedicated Python ETL Pipeline Simulator',
          subtitle: 'Idempotent ingestion, multi-format timestamp normalization & SOX compliance audit',
          icon: Workflow
        };
    }
  };

  const info = getTitle();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-6xl w-full max-h-[94vh] flex flex-col shadow-2xl relative overflow-hidden">
        
        {/* Top bar */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600/90 text-white flex items-center justify-center">
              <info.icon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-white font-normal leading-tight">
                {info.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                {info.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="overflow-y-auto p-4 sm:p-6">
          {type === 'sql' && <LiveSqlWorkbench isModal onCloseModal={onClose} />}
          {type === 'cohort' && <CohortEngine />}
          {type === 'etl' && <EtlPipelineSimulator />}
        </div>

      </div>
    </div>
  );
};
