import { useState } from 'react';
import { Calendar, CheckCircle2, Flame, Sparkles, Check, ChevronUp } from 'lucide-react';
import { Compound } from './data/biostackData';

interface BioStackDosingScheduleProps {
  compounds: Compound[];
  onToggleDose: (id: string) => void;
}

export default function BioStackDosingSchedule({ compounds, onToggleDose }: BioStackDosingScheduleProps) {
  const [streakDays, setStreakDays] = useState(14);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const morningCompounds = compounds.filter(
    (c) => c.timing.includes('08:') || c.timing.includes('Morning') || c.timing.includes('Post-Workout')
  );
  const eveningCompounds = compounds.filter(
    (c) => c.timing.includes('20:') || c.timing.includes('21:') || c.timing.includes('Evening') || c.timing.includes('Bedtime')
  );

  const completedCount = compounds.filter((c) => c.takenToday).length;
  const totalCount = compounds.length;
  const percentComplete = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const handleMarkAll = () => {
    compounds.forEach((c) => {
      if (!c.takenToday) onToggleDose(c.id);
    });
    setStreakDays((prev) => prev + 1);
  };

  return (
    <div className="w-full bg-[#0d131f] border border-[#1e293b] rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.04),transparent_60%)] pointer-events-none" />

      {/* Header Container */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#1e293b]/80 pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
                Today’s Dosing Schedule
              </h3>
              <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#18263d] text-cyan-300 border border-cyan-500/40">
                Saturday, Aug 15
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
              Log doses taken today to maintain protocol adherence & steady-state serum levels
            </p>
          </div>
        </div>

        {/* Top Right Badges: Streak & Completion */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono text-xs font-bold shadow-sm">
            <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span>{streakDays}d Streak</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-[#141f33] border border-[#223352] font-mono text-xs text-cyan-300 font-bold">
            {completedCount}/{totalCount} Done ({percentComplete}%)
          </div>
          <button
            onClick={() => setIsCollapsed((v) => !v)}
            aria-label="Toggle collapse dosing schedule"
            className="p-1.5 rounded-lg bg-[#141f33] border border-[#223352] text-slate-400 hover:text-white"
          >
            <ChevronUp className={`w-4 h-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {!isCollapsed && (
        <div className="space-y-6 relative z-10">
          {/* Adherence Progress Bar */}
          <div className="p-4 rounded-xl bg-[#090e17] border border-[#1a2538] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-grow max-w-xl">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300 whitespace-nowrap">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Adherence Progress:</span>
              </div>
              <div className="w-full bg-[#131d2e] rounded-full h-2.5 overflow-hidden border border-[#223049]">
                <div
                  className="bg-gradient-to-r from-cyan-500 via-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>

            <button
              onClick={handleMarkAll}
              className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#142338] hover:bg-[#1a2e4a] border border-cyan-500/40 text-cyan-300 text-xs font-mono font-semibold transition-all whitespace-nowrap"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark All Done</span>
            </button>
          </div>

          {/* Morning Dosing Block (Screenshot 1 Match) */}
          <div className="bg-[#090e17] border border-[#192438] rounded-xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-cyan-400 font-bold border-b border-[#162033] pb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>08:00 - 11:30 (Breakfast / Morning)</span>
            </div>

            <div className="space-y-2.5">
              {morningCompounds.map((comp) => {
                const isTaken = comp.takenToday;

                return (
                  <div
                    key={comp.id}
                    onClick={() => onToggleDose(comp.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isTaken
                        ? 'bg-[#0f1d2e]/80 border-cyan-500/40 text-slate-200 shadow-sm'
                        : 'bg-[#0c121e] border-[#18263d] hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Checkbox circle */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                          isTaken
                            ? 'bg-cyan-500 border-cyan-400 text-slate-950 shadow-[0_0_8px_rgba(6,182,212,0.6)]'
                            : 'border-slate-600 bg-slate-900/50'
                        }`}
                      >
                        {isTaken && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      {/* Compound Name and Dosage */}
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: comp.colorHex }}
                          />
                          <span className={`font-bold text-sm sm:text-base ${isTaken ? 'text-white' : 'text-slate-200'}`}>
                            {comp.name}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                          <span>{comp.dosage}</span>
                          <span>•</span>
                          <span>{comp.route}</span>
                        </div>
                      </div>
                    </div>

                    {/* Timing Badge */}
                    <div className="flex items-center gap-2 sm:self-center">
                      <span className="font-mono text-xs px-3 py-1 rounded bg-[#141f33] text-slate-300 border border-[#21324f]">
                        {comp.timing}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Evening Dosing Block (if any evening compounds exist) */}
          {eveningCompounds.length > 0 && (
            <div className="bg-[#090e17] border border-[#192438] rounded-xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-purple-400 font-bold border-b border-[#162033] pb-2.5">
                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                <span>20:00 - 22:30 (Evening / Pre-Sleep)</span>
              </div>

              <div className="space-y-2.5">
                {eveningCompounds.map((comp) => {
                  const isTaken = comp.takenToday;

                  return (
                    <div
                      key={comp.id}
                      onClick={() => onToggleDose(comp.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isTaken
                          ? 'bg-[#15142e]/80 border-purple-500/40 text-slate-200 shadow-sm'
                          : 'bg-[#0c121e] border-[#18263d] hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                            isTaken
                              ? 'bg-purple-500 border-purple-400 text-slate-950 shadow-[0_0_8px_rgba(168,85,247,0.6)]'
                            : 'border-slate-600 bg-slate-900/50'
                          }`}
                        >
                          {isTaken && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0"
                              style={{ backgroundColor: comp.colorHex }}
                            />
                            <span className={`font-bold text-sm sm:text-base ${isTaken ? 'text-white' : 'text-slate-200'}`}>
                              {comp.name}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 font-mono mt-0.5 flex items-center gap-2">
                            <span>{comp.dosage}</span>
                            <span>•</span>
                            <span>{comp.route}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:self-center">
                        <span className="font-mono text-xs px-3 py-1 rounded bg-[#1f1633] text-purple-200 border border-[#372759]">
                          {comp.timing}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
