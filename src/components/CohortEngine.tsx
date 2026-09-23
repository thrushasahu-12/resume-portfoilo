import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingDown, 
  TrendingUp, 
  HelpCircle, 
  Code2, 
  Layers, 
  SlidersHorizontal,
  ChevronRight,
  Info
} from 'lucide-react';
import { COHORT_DATA, CohortRow } from '../data/mockDatasets';

export const CohortEngine: React.FC = () => {
  const [selectedCohort, setSelectedCohort] = useState<CohortRow>(COHORT_DATA[10]); // Nov 2023 (Best)
  const [hoveredCell, setHoveredCell] = useState<{ cohort: string; monthIndex: number; value: number | null } | null>(null);
  const [filterYear, setFilterYear] = useState<'all' | '2023' | '2024'>('all');
  const [showDaxModal, setShowDaxModal] = useState(false);

  const filteredData = COHORT_DATA.filter((row) => {
    if (filterYear === '2023') return row.cohortMonth.includes('2023');
    if (filterYear === '2024') return row.cohortMonth.includes('2024');
    return true;
  });

  const getHeatmapColor = (val: number | null) => {
    if (val === null) return 'bg-slate-950/40 text-slate-700';
    if (val >= 85) return 'bg-indigo-600/90 text-white font-semibold';
    if (val >= 70) return 'bg-indigo-700/80 text-white';
    if (val >= 60) return 'bg-indigo-800/70 text-indigo-100';
    if (val >= 50) return 'bg-indigo-900/60 text-indigo-200';
    if (val >= 40) return 'bg-purple-950/70 text-purple-200';
    return 'bg-rose-950/70 text-rose-300';
  };

  return (
    <motion.section 
      id="cohorts" 
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
            <BarChart3 className="w-3.5 h-3.5" />
            <span>INTERACTIVE WORKBENCH · PROJECT 03</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal">
            Cohort Retention &amp; Trend Engine
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mt-2 leading-relaxed">
            Interactive retention matrix and Power BI telemetry simulator across 18 onboarding cohorts. Hover any period cell to inspect user decay curves and systemic SLA breach baselines.
          </p>
        </div>

        {/* Action button: DAX Formula popup */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDaxModal(!showDaxModal)}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-indigo-300 border border-slate-700 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Code2 className="w-4 h-4 text-indigo-400" />
            <span>{showDaxModal ? 'Hide DAX Formulas' : 'Inspect Power BI DAX'}</span>
          </button>
        </div>
      </motion.div>

      {/* DAX Formula Drawer (Collapsible) */}
      {showDaxModal && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-950 border border-indigo-500/30 font-mono text-xs text-slate-300 space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex justify-between items-center text-indigo-400 font-semibold border-b border-slate-800 pb-2">
            <span>CORE DAX MEASURES (Power BI Semantic Model)</span>
            <span className="text-[11px] text-slate-500">ServiceNow Enterprise Dataset</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-purple-300 font-semibold block mb-1">Retention Rate %:</span>
              <pre className="text-slate-400 text-[11px] overflow-x-auto whitespace-pre-wrap">
{`Retention Rate % = 
VAR ActiveCount = DISTINCTCOUNT(Fact_Activity[User_ID])
VAR CohortSize = CALCULATE(
    DISTINCTCOUNT(Dim_User[User_ID]), 
    ALLEXCEPT(Dim_User, Dim_User[Cohort_Month])
)
RETURN DIVIDE(ActiveCount, CohortSize, 0)`}
              </pre>
            </div>
            <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
              <span className="text-purple-300 font-semibold block mb-1">MoM Drop-Off Rate:</span>
              <pre className="text-slate-400 text-[11px] overflow-x-auto whitespace-pre-wrap">
{`MoM Retention Delta = 
VAR CurrentRetention = [Retention Rate %]
VAR PriorRetention = CALCULATE([Retention Rate %], DATEADD(Dim_Date[Date], -1, MONTH))
RETURN IF(NOT ISBLANK(PriorRetention), CurrentRetention - PriorRetention)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Main Matrix Dashboard Card */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
        
        {/* Filter bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Filter Cohorts:</span>
            <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
              {(['all', '2023', '2024'] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setFilterYear(yr)}
                  className={`px-3 py-1 rounded cursor-pointer transition-colors ${
                    filterYear === yr ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {yr === 'all' ? 'All (18 Mo)' : yr}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Best: Nov 2023 (75% M6)</span>
            </div>
            <div className="flex items-center gap-2 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Worst: Oct 2023 (40% M6)</span>
            </div>
          </div>
        </div>

        {/* Heatmap Matrix Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-800 mb-6">
          <table className="w-full text-center text-xs font-mono tabular-nums border-collapse">
            <thead>
              <tr className="bg-slate-950 text-slate-400 text-[11px] border-b border-slate-800">
                <th className="text-left px-3 py-2.5 sticky left-0 bg-slate-950 z-10">Cohort</th>
                <th className="px-2 py-2.5">Size</th>
                {['M0', 'M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9', 'M10', 'M11', 'M12'].map((m) => (
                  <th key={m} className="px-2 py-2.5">{m}</th>
                ))}
                <th className="px-3 py-2.5 text-right">SLA Breach</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredData.map((row) => {
                const isSelected = selectedCohort.cohortMonth === row.cohortMonth;
                return (
                  <tr 
                    key={row.cohortMonth}
                    onClick={() => setSelectedCohort(row)}
                    className={`transition-colors cursor-pointer ${
                      isSelected ? 'bg-indigo-950/40' : 'hover:bg-slate-850/50'
                    }`}
                  >
                    <td className="text-left px-3 py-2 sticky left-0 bg-slate-900 font-semibold text-slate-200 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {row.highlight === 'best' && <span className="text-emerald-400 text-xs">★</span>}
                        {row.highlight === 'worst' && <span className="text-rose-400 text-xs">▼</span>}
                        <span>{row.cohortMonth}</span>
                      </div>
                    </td>
                    <td className="px-2 py-2 text-slate-400 text-[11px]">
                      {row.cohortSize}
                    </td>
                    {row.retentionByMonth.map((val, mIdx) => (
                      <td
                        key={mIdx}
                        onMouseEnter={() => setHoveredCell({ cohort: row.cohortMonth, monthIndex: mIdx, value: val })}
                        onMouseLeave={() => setHoveredCell(null)}
                        className="p-1"
                      >
                        <div className={`py-1.5 px-1 rounded text-[11px] transition-transform ${getHeatmapColor(val)} ${val !== null ? 'hover:scale-105 shadow-xs' : ''}`}>
                          {val !== null ? `${val}%` : '—'}
                        </div>
                      </td>
                    ))}
                    <td className="px-3 py-2 text-right">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        row.avgSlaBreachRate > 45 ? 'text-rose-400 bg-rose-950/60' : 'text-slate-300'
                      }`}>
                        {row.avgSlaBreachRate}%
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Cohort Detail & Key Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
          {/* Cohort Profile */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 font-mono text-xs">
            <span className="text-indigo-400 font-semibold block text-[11px] uppercase tracking-wider">
              Selected Cohort: {selectedCohort.cohortMonth}
            </span>
            <div className="flex justify-between text-slate-400">
              <span>Onboarded Users:</span>
              <span className="text-slate-200 font-semibold">{selectedCohort.cohortSize}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Month 6 (M6) Retention:</span>
              <span className="text-emerald-400 font-semibold">
                {selectedCohort.retentionByMonth[6] ? `${selectedCohort.retentionByMonth[6]}%` : 'In Progress'}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Mean SLA Breach Rate:</span>
              <span className="text-rose-400 font-semibold">{selectedCohort.avgSlaBreachRate}%</span>
            </div>
          </div>

          {/* Finding 1: Nov vs Oct Variance */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-emerald-400 font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>November 2023 Cohort Surge</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Achieved <strong className="text-white">75% M6 retention</strong> due to streamlined onboarding workflows and lower SLA breaches (34.2%).
            </p>
          </div>

          {/* Finding 2: Systemic SLA Bottleneck */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5 font-mono text-indigo-400 font-semibold">
              <Info className="w-4 h-4" />
              <span>42.3% Baseline SLA Breach</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              SLA breach rates remained consistent at <strong className="text-white">42.3% across 18 months</strong>, demonstrating that breaches stem from architectural bottlenecks rather than seasonal spikes.
            </p>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
