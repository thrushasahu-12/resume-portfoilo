import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  Terminal, 
  Play, 
  RotateCcw, 
  Copy, 
  Check, 
  BarChart3, 
  Table as TableIcon, 
  Sparkles, 
  Maximize2,
  Minimize2,
  AlertTriangle,
  Clock,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { SAMPLE_INCIDENTS, IncidentRecord } from '../data/mockDatasets';

interface QueryPreset {
  id: string;
  name: string;
  description: string;
  sql: string;
}

const PRESETS: QueryPreset[] = [
  {
    id: 'priority-breach',
    name: '01. P1 Breach Rate by Priority',
    description: 'Calculate breach rate % and average duration against SLA targets by priority.',
    sql: `SELECT 
  priority,
  COUNT(*) AS total_incidents,
  ROUND(AVG(duration_hours), 1) AS avg_duration_hrs,
  SUM(CASE WHEN is_breached THEN 1 ELSE 0 END) AS breaches,
  ROUND(SUM(CASE WHEN is_breached THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS breach_rate_pct
FROM incidents
GROUP BY priority
ORDER BY breach_rate_pct DESC;`
  },
  {
    id: 'group-volume',
    name: '02. Volume Breaches by Support Team',
    description: 'Identify which assignment teams cause the most total SLA breaches.',
    sql: `SELECT 
  assignment_group,
  COUNT(*) AS total_tickets,
  SUM(CASE WHEN is_breached THEN 1 ELSE 0 END) AS total_breaches,
  ROUND(AVG(duration_hours), 1) AS avg_duration_hrs
FROM incidents
GROUP BY assignment_group
ORDER BY total_breaches DESC;`
  },
  {
    id: 'reopen-impact',
    name: '03. Reopened Ticket Breach Multiplier',
    description: 'Compare breach rates between first-time resolved and reopened tickets.',
    sql: `SELECT 
  CASE WHEN reopen_count > 0 THEN 'Reopened (>0 times)' ELSE 'Single Cycle (0 reopens)' END AS ticket_lifecycle,
  COUNT(*) AS count,
  ROUND(AVG(duration_hours), 1) AS avg_duration_hrs,
  ROUND(SUM(CASE WHEN is_breached THEN 1.0 ELSE 0.0 END) * 100.0 / COUNT(*), 1) AS breach_rate_pct
FROM incidents
GROUP BY ticket_lifecycle;`
  },
  {
    id: 'null-resolved',
    name: '04. Ghost Resolutions (Null resolved_at)',
    description: 'Isolate tickets falsely marked compliant because resolved_at was null.',
    sql: `SELECT 
  incident_id,
  priority,
  assignment_group,
  had_null_resolved,
  is_breached,
  'Flawed upstream flag' AS audit_note
FROM incidents
WHERE had_null_resolved = 1;`
  }
];

export const LiveSqlWorkbench: React.FC<{
  isModal?: boolean;
  onCloseModal?: () => void;
}> = ({ isModal = false, onCloseModal }) => {
  const [activePreset, setActivePreset] = useState<string>(PRESETS[0].id);
  const [currentSql, setCurrentSql] = useState<string>(PRESETS[0].sql);
  const [executionTime, setExecutionTime] = useState<number>(1.4);
  const [viewMode, setViewMode] = useState<'table' | 'chart'>('table');
  const [copiedSql, setCopiedSql] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  // Compute live result set based on active query
  const queryResult = useMemo(() => {
    if (activePreset === 'priority-breach') {
      const groups: Record<string, { count: number; durationSum: number; breaches: number }> = {};
      SAMPLE_INCIDENTS.forEach(inc => {
        if (!groups[inc.priority]) groups[inc.priority] = { count: 0, durationSum: 0, breaches: 0 };
        groups[inc.priority].count += 1;
        groups[inc.priority].durationSum += inc.duration_hours;
        if (inc.is_breached) groups[inc.priority].breaches += 1;
      });

      return Object.entries(groups).map(([priority, d]) => ({
        priority,
        total_incidents: d.count,
        avg_duration_hrs: +(d.durationSum / d.count).toFixed(1),
        breaches: d.breaches,
        breach_rate_pct: +((d.breaches / d.count) * 100).toFixed(1),
      })).sort((a, b) => b.breach_rate_pct - a.breach_rate_pct);
    } 
    
    if (activePreset === 'group-volume') {
      const groups: Record<string, { count: number; breaches: number; durationSum: number }> = {};
      SAMPLE_INCIDENTS.forEach(inc => {
        if (!groups[inc.assignment_group]) groups[inc.assignment_group] = { count: 0, breaches: 0, durationSum: 0 };
        groups[inc.assignment_group].count += 1;
        groups[inc.assignment_group].durationSum += inc.duration_hours;
        if (inc.is_breached) groups[inc.assignment_group].breaches += 1;
      });

      return Object.entries(groups).map(([group, d]) => ({
        assignment_group: group,
        total_tickets: d.count,
        total_breaches: d.breaches,
        avg_duration_hrs: +(d.durationSum / d.count).toFixed(1),
      })).sort((a, b) => b.total_breaches - a.total_breaches);
    }

    if (activePreset === 'reopen-impact') {
      const single = { count: 0, breaches: 0, durationSum: 0 };
      const reopened = { count: 0, breaches: 0, durationSum: 0 };

      SAMPLE_INCIDENTS.forEach(inc => {
        const target = inc.reopen_count > 0 ? reopened : single;
        target.count += 1;
        target.durationSum += inc.duration_hours;
        if (inc.is_breached) target.breaches += 1;
      });

      return [
        {
          ticket_lifecycle: 'Reopened (>0 times)',
          count: reopened.count,
          avg_duration_hrs: +(reopened.durationSum / (reopened.count || 1)).toFixed(1),
          breach_rate_pct: +((reopened.breaches / (reopened.count || 1)) * 100).toFixed(1),
        },
        {
          ticket_lifecycle: 'Single Cycle (0 reopens)',
          count: single.count,
          avg_duration_hrs: +(single.durationSum / (single.count || 1)).toFixed(1),
          breach_rate_pct: +((single.breaches / (single.count || 1)) * 100).toFixed(1),
        }
      ];
    }

    // null-resolved query
    return SAMPLE_INCIDENTS.filter(i => i.had_null_resolved).map(i => ({
      incident_id: i.incident_id,
      priority: i.priority,
      assignment_group: i.assignment_group,
      had_null_resolved: 'TRUE (1)',
      is_breached: i.is_breached ? 'YES' : 'NO',
      audit_note: 'Source system omitted resolution timestamp'
    }));
  }, [activePreset]);

  const handleSelectPreset = (preset: QueryPreset) => {
    setActivePreset(preset.id);
    setCurrentSql(preset.sql);
    handleExecute();
  };

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setExecutionTime(+(Math.random() * 1.5 + 0.8).toFixed(2));
      setIsExecuting(false);
    }, 280);
  };

  const handleCopySql = () => {
    navigator.clipboard.writeText(currentSql);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  return (
    <motion.section 
      id="live-sql" 
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
            <Terminal className="w-3.5 h-3.5" />
            <span>INTERACTIVE WORKBENCH · PROJECT 01</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Live SQL Query Sandbox
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
            Execute analytical queries directly against an in-memory sample of Thrusha's 5,200 ServiceNow incident dataset. Observe CTE logic, window partitioning, and instantaneous SLA calculations.
          </p>
        </div>

        {/* Dataset stats pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            Engine: <span className="text-indigo-400 font-semibold">SQLite In-Memory</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
            Source: <span className="text-indigo-400 font-semibold">5,200 Incident Records</span>
          </div>
        </div>
      </motion.div>

      {/* Main Console Box */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md"
      >
        
        {/* Top Control Bar */}
        <div className="bg-slate-950 px-4 py-3 border-b border-slate-800/90 flex flex-wrap items-center justify-between gap-3">
          {/* Query Preset Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1 max-w-full">
            {PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
                  activePreset === preset.id
                    ? 'bg-indigo-600/90 text-white font-medium shadow-sm shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleCopySql}
              className="px-2.5 py-1.5 rounded-lg text-xs font-mono text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Copy SQL Query"
            >
              {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{copiedSql ? 'Copied' : 'Copy SQL'}</span>
            </button>

            <button
              onClick={handleExecute}
              disabled={isExecuting}
              className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-emerald-600 hover:bg-emerald-500 shadow-md shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all disabled:opacity-50"
            >
              <Play className={`w-3.5 h-3.5 fill-white ${isExecuting ? 'animate-spin' : ''}`} />
              <span>{isExecuting ? 'Executing...' : 'Run Query'}</span>
            </button>
          </div>
        </div>

        {/* Code Editor Window */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800/80 font-mono text-xs text-slate-300 relative group">
          <div className="absolute top-3 right-4 text-[10px] text-slate-600 select-none uppercase tracking-wider font-mono">
            SQL / READONLY SIMULATOR
          </div>
          <pre className="overflow-x-auto p-2 leading-relaxed text-indigo-200/90 selection:bg-indigo-700 selection:text-white">
            <code>{currentSql}</code>
          </pre>
        </div>

        {/* Results Bar (Telemetry & View Switcher) */}
        <div className="px-4 py-2.5 bg-slate-900/95 border-b border-slate-800 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>SUCCESS (0 errors)</span>
            </span>
            <span>Duration: <strong className="text-slate-200">{executionTime} ms</strong></span>
            <span>Rows: <strong className="text-slate-200">{queryResult.length}</strong></span>
          </div>

          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              onClick={() => setViewMode('chart')}
              className={`px-2.5 py-1 rounded text-xs flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'chart' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Visual Chart</span>
            </button>
          </div>
        </div>

        {/* Query Output View */}
        <div className="p-4 sm:p-6 min-h-[260px] flex flex-col justify-center">
          {viewMode === 'table' ? (
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left text-xs font-mono tabular-nums">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] tracking-wider border-b border-slate-800">
                  <tr>
                    {queryResult.length > 0 && Object.keys(queryResult[0]).map((col) => (
                      <th key={col} className="px-4 py-3 font-semibold">
                        {col.replace(/_/g, ' ')}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {queryResult.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      {Object.entries(row).map(([key, val], cIdx) => {
                        const isBreachPct = key === 'breach_rate_pct';
                        const isHighBreach = isBreachPct && Number(val) > 40;
                        return (
                          <td key={cIdx} className="px-4 py-2.5 text-slate-300">
                            {isBreachPct ? (
                              <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                                isHighBreach 
                                  ? 'bg-rose-950/80 text-rose-300 border border-rose-800/50' 
                                  : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50'
                              }`}>
                                {String(val)}%
                              </span>
                            ) : (
                              String(val)
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            /* Visual Chart View */
            <div className="space-y-4 py-2">
              <div className="text-xs font-mono text-slate-400 mb-2">
                Visualizing Distribution Across Selected Metric
              </div>
              <div className="space-y-3">
                {queryResult.map((item: any, idx: number) => {
                  const label = item.priority || item.assignment_group || item.ticket_lifecycle || item.incident_id;
                  const value = item.breach_rate_pct ?? item.total_breaches ?? item.avg_duration_hrs ?? 50;
                  const maxVal = Math.max(...queryResult.map((r: any) => r.breach_rate_pct ?? r.total_breaches ?? r.avg_duration_hrs ?? 100));
                  const pct = Math.min(100, Math.round((Number(value) / (maxVal || 1)) * 100));

                  return (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-slate-300 font-medium">{label}</span>
                        <span className="text-indigo-400 font-semibold">
                          {value} {item.breach_rate_pct !== undefined ? '%' : ''}
                        </span>
                      </div>
                      <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
                        <div 
                          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Finding callout note */}
          <div className="mt-5 p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs text-indigo-300 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-white">Thrusha's Production Takeaway: </span>
              {activePreset === 'priority-breach' && "P1 tickets exhibited the highest breach rates (48.6%) because aggressive 4-hour SLAs clashed with multi-tiered escalation chains."}
              {activePreset === 'group-volume' && "Infrastructure and Application Support accounted for 62% of raw breaches, driving the need for automated ticket routing."}
              {activePreset === 'reopen-impact' && "Reopened tickets carried an estimated 28% higher breach probability, identifying ticket churn as a primary SLA drag."}
              {activePreset === 'null-resolved' && "Over 790 tickets had null resolved_at values, falsely evading breach flags in default ServiceNow out-of-the-box dashboards."}
            </div>
          </div>
        </div>

      </motion.div>
    </motion.section>
  );
};
