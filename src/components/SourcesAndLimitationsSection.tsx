import React, { useState } from 'react';
import { ARCHITECTURE_DECLARATION, SOURCE_LEDGER, type SourceLedgerEntry } from '../data/sourceLedger';

export const SourcesAndLimitationsSection: React.FC = () => {
  const [filterAspect, setFilterAspect] = useState<string>('ALL');

  const aspects = ['ALL', 'Context & Taxonomy', 'Attachment', 'Load Transfer', 'Alignment', 'Sensing & Actuation', 'Variability'];

  const filteredEntries: SourceLedgerEntry[] =
    filterAspect === 'ALL'
      ? SOURCE_LEDGER
      : SOURCE_LEDGER.filter((e) => e.aspect === filterAspect);

  return (
    <section
      id="sources"
      aria-labelledby="sources-heading"
      className="py-14 bg-[#0B1019]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span>Evidence &amp; Epistemic Ledger</span>
              <span>•</span>
              <span>Zero Unverified Claims</span>
            </div>
            <h2 id="sources-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Sources, Claim-to-Source Ledger &amp; Scientific Limitations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
              Every material claim and depicted relationship in the interactive explainer, diagrams, mind map, and article is mapped below to its primary publication or review source, with explicit documentation of visual simplifications and unresolved details.
            </p>
          </div>
        </div>

        {/* Architecture & Scientific/Safety Limits Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
            <span className="text-xs font-mono uppercase text-cyan-300 font-bold">
              Selected Architecture Declaration
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1 mb-2">
              {ARCHITECTURE_DECLARATION.deviceName}
            </h3>
            <p className="text-xs font-mono text-amber-300 mb-3">
              {ARCHITECTURE_DECLARATION.approach}
            </p>
            <div className="space-y-2 text-xs sm:text-sm text-slate-300">
              <p>
                <strong>Primary Hardware &amp; Optimization Documentation:</strong>{' '}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline"
                >
                  {ARCHITECTURE_DECLARATION.primaryDeviceSource}
                </a>
              </p>
              <p>
                <strong>Industry Taxonomy &amp; Clinical Review Context:</strong>{' '}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline"
                >
                  {ARCHITECTURE_DECLARATION.generalContextSource}
                </a>
              </p>
              <p>
                <strong>NIH Starting Summary:</strong>{' '}
                <a
                  href="https://www.nih.gov/news-events/nih-research-matters/robotic-exoskeleton-helps-people-walk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline"
                >
                  {ARCHITECTURE_DECLARATION.nihSummarySource}
                </a>
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 rounded-2xl bg-slate-900/70 border border-purple-500/40 p-6">
            <span className="text-xs font-mono uppercase text-purple-300 font-bold">
              Scientific, Clinical &amp; Safety Limits Statement
            </span>
            <h3 className="text-lg font-bold text-slate-100 mt-1 mb-3">
              What This Educational Experience Does Not Establish
            </h3>
            <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300">
              {ARCHITECTURE_DECLARATION.scientificAndSafetyLimits.map((limit, idx) => (
                <li key={idx}>{limit}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Aspect Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-slate-400 mr-2">Filter Ledger by Aspect:</span>
          {aspects.map((asp) => (
            <button
              key={asp}
              type="button"
              onClick={() => setFilterAspect(asp)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                filterAspect === asp
                  ? 'bg-cyan-400 text-slate-950 border-cyan-400 font-bold'
                  : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
              }`}
            >
              {asp}
            </button>
          ))}
        </div>

        {/* Claim-to-Source Ledger Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/80 overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 font-mono text-xs text-slate-300">
                <th className="py-3.5 px-4">ID / Aspect</th>
                <th className="py-3.5 px-4">Claim or Depicted Relationship</th>
                <th className="py-3.5 px-4">Source &amp; Passage</th>
                <th className="py-3.5 px-4">Support</th>
                <th className="py-3.5 px-4">Simplifications &amp; Limitations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-slate-900/40 transition align-top">
                  <td className="py-4 px-4 font-mono whitespace-nowrap">
                    <div className="text-cyan-300 font-bold">{entry.id}</div>
                    <div className="text-slate-400 text-xs mt-0.5">{entry.aspect}</div>
                  </td>
                  <td className="py-4 px-4 text-slate-200 max-w-md leading-relaxed">
                    {entry.claimOrRelationship}
                  </td>
                  <td className="py-4 px-4 text-slate-300 max-w-xs">
                    <a
                      href={entry.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:underline font-medium block mb-1"
                    >
                      {entry.authorsAndYear}
                    </a>
                    <span className="text-xs text-slate-400 font-mono block">
                      {entry.sectionFigureOrPassage}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded font-mono text-xs border ${
                        entry.supportType === 'Direct'
                          ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                          : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                      }`}
                    >
                      {entry.supportType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-400 max-w-sm leading-relaxed">
                    {entry.simplificationsAndLimitations}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
