import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { ZoomIn, ZoomOut, RotateCcw, Layers, Info, Sparkles, TrendingUp } from 'lucide-react';
import { Compound } from './data/biostackData';

interface BioStackPKAccumulationProps {
  compounds: Compound[];
}

export default function BioStackPKAccumulation({ compounds }: BioStackPKAccumulationProps) {
  const [selectedCompounds, setSelectedCompounds] = useState<string[]>(() =>
    compounds.slice(0, 5).map((c) => c.id)
  );
  const [showTotalCurve, setShowTotalCurve] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [hoveredPoint, setHoveredPoint] = useState<{
    timeLabel: string;
    total: number;
    compounds: { name: string; value: number; color: string }[];
  } | null>(null);

  const toggleCompound = (id: string) => {
    setSelectedCompounds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    setSelectedCompounds(compounds.map((c) => c.id));
  };

  const clearAll = () => {
    setSelectedCompounds([]);
  };

  // Generate 7-day pharmacokinetic simulation data points (e.g. 7 days * 24h = 168 points, sampled every 2h -> 84 points)
  const simulationPoints = useMemo(() => {
    const totalHours = 168; // 7 days
    const step = 2; // every 2 hours
    const points: {
      hour: number;
      label: string;
      day: string;
      timeStr: string;
      compoundLevels: Record<string, number>;
      total: number;
    }[] = [];

    const days = ['Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon'];

    for (let h = 0; h <= totalHours; h += step) {
      const dayIndex = Math.floor(h / 24) % 7;
      const hourOfDay = h % 24;
      const dayStr = days[dayIndex];
      const timeStr = `${dayStr} ${String(hourOfDay).padStart(2, '0')}:00`;

      let totalSerum = 0;
      const compLevels: Record<string, number> = {};

      compounds.forEach((comp) => {
        if (!selectedCompounds.includes(comp.id)) {
          compLevels[comp.id] = 0;
          return;
        }

        // Half life and elimination rate
        const hl = Math.max(comp.halfLifeHours, 1);
        const k = Math.LN2 / hl;
        let compConcentration = 0;

        // Sum contributions from each daily dose at 8:00 (hour 8, 32, 56, 80, 104, 128, 152)
        // plus previous steady state history
        for (let doseDay = -5; doseDay <= 7; doseDay++) {
          const doseHour = doseDay * 24 + 8.5; // 08:30 morning dose
          if (h >= doseHour) {
            const timeSinceDose = h - doseHour;
            // standard 1-compartment oral absorption model: C(t) = C0 * (e^-ke*t - e^-ka*t)
            const ka = 1.8; // rapid absorption constant
            const oralFactor = Math.max(0, Math.exp(-k * timeSinceDose) - Math.exp(-ka * timeSinceDose));
            const baseDoseScale = comp.id === 'vitd3k2' ? 240 : comp.id === 'omega3' ? 180 : 100;
            compConcentration += baseDoseScale * oralFactor;
          }
        }

        compLevels[comp.id] = Math.round(compConcentration);
        totalSerum += compConcentration;
      });

      points.push({
        hour: h,
        label: timeStr,
        day: dayStr,
        timeStr,
        compoundLevels: compLevels,
        total: Math.round(totalSerum),
      });
    }

    return points;
  }, [compounds, selectedCompounds]);

  // Derived metrics
  const activeCount = selectedCompounds.length;
  const maxTotal = useMemo(() => {
    return Math.max(...simulationPoints.map((p) => p.total), 100);
  }, [simulationPoints]);

  const peakSerumLoad = Math.round((maxTotal / 100) * 100);
  const troughBaseline = useMemo(() => {
    // trough around hour 150 before dose
    const troughPoint = simulationPoints[simulationPoints.length - 10];
    return troughPoint ? Math.round(troughPoint.total * 0.9) : 227;
  }, [simulationPoints]);

  // SVG Chart Dimensions
  const svgWidth = 900;
  const svgHeight = 280;
  const paddingX = 40;
  const paddingY = 30;
  const chartW = svgWidth - paddingX * 2;
  const chartH = svgHeight - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (simulationPoints.length - 1)) * chartW;
  const getY = (val: number) => {
    const effectiveMax = Math.max(maxTotal * 1.15, 350);
    return svgHeight - paddingY - (val / effectiveMax) * chartH;
  };

  // Build SVG Path for Total Curve
  const totalPathD = useMemo(() => {
    if (simulationPoints.length === 0) return '';
    return simulationPoints.reduce((acc, pt, idx) => {
      const x = getX(idx);
      const y = getY(pt.total);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [simulationPoints, maxTotal]);

  return (
    <div className="w-full bg-[#0d131f] border border-[#1e293b] rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Background glow and subtle matrix grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,210,255,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10 border-b border-[#1e293b]/80 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-inner">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
                7-Day Accumulation Model
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                PK Engine v3.4
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
              Interactive PK serum trough & steady-state accumulation simulation
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center px-3 py-1.5 rounded-lg bg-[#141d2e] border border-[#223049] text-[11px] font-mono text-slate-300">
            PINCH TO ZOOM
          </div>
          <div className="flex items-center bg-[#141d2e] border border-[#223049] rounded-lg p-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
              aria-label="Zoom out chart"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/50 transition-colors"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
              aria-label="Zoom in chart"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/50 transition-colors"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(1)}
              aria-label="Reset chart zoom"
              className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-700/50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={() => setShowTotalCurve((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
              showTotalCurve
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,210,255,0.2)]'
                : 'bg-[#141d2e] text-slate-400 border border-[#223049] hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Total Curve</span>
          </button>
        </div>
      </div>

      {/* 4 Key Metric Tiles from Screenshot */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 mb-6 relative z-10">
        <div className="bg-[#131d2e]/90 border border-[#223049] rounded-xl p-3.5">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
            VISIBLE ACTIVE
          </span>
          <span className="text-lg sm:text-xl font-bold text-cyan-400 font-mono">
            {activeCount} {activeCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="bg-[#131d2e]/90 border border-[#223049] rounded-xl p-3.5">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
            ESTIMATED PEAK TIME
          </span>
          <span className="text-lg sm:text-xl font-bold text-emerald-400 font-mono">
            Sun 08:00
          </span>
        </div>

        <div className="bg-[#131d2e]/90 border border-[#223049] rounded-xl p-3.5">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
            PEAK SERUM LOAD
          </span>
          <span className="text-lg sm:text-xl font-bold text-pink-400 font-mono">
            {peakSerumLoad}% relative
          </span>
        </div>

        <div className="bg-[#131d2e]/90 border border-[#223049] rounded-xl p-3.5">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-slate-400 block mb-1">
            TROUGH BASELINE
          </span>
          <span className="text-lg sm:text-xl font-bold text-purple-400 font-mono">
            {troughBaseline}% baseline
          </span>
        </div>
      </div>

      {/* Compound Selector Chips Row */}
      <div className="flex flex-wrap items-center gap-2 mb-5 relative z-10">
        <span className="text-xs font-mono text-slate-400 mr-1">Chart View:</span>
        <button
          onClick={selectAll}
          className="text-xs font-mono text-cyan-400 hover:underline px-1"
        >
          Select All
        </button>
        <button
          onClick={clearAll}
          className="text-xs font-mono text-slate-400 hover:text-slate-200 hover:underline px-1 mr-2"
        >
          Clear
        </button>

        {compounds.map((comp) => {
          const isSelected = selectedCompounds.includes(comp.id);
          return (
            <button
              key={comp.id}
              onClick={() => toggleCompound(comp.id)}
              className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${
                isSelected
                  ? 'bg-[#182438] text-white border-cyan-500/50 shadow-sm'
                  : 'bg-[#101826]/70 text-slate-400 border-slate-800 hover:border-slate-700 opacity-60'
              }`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: comp.colorHex }}
              />
              <span className="truncate max-w-[150px] sm:max-w-[200px]">{comp.name}</span>
            </button>
          );
        })}
      </div>

      {/* Chart Canvas Area */}
      <div className="relative w-full bg-[#0a0f18] border border-[#192438] rounded-xl p-3 sm:p-4 overflow-hidden">
        {/* Y Axis percentage markers */}
        <div className="absolute left-3 top-3 bottom-8 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none z-10">
          <span>350%</span>
          <span>300%</span>
          <span>250%</span>
          <span>200%</span>
          <span>150%</span>
          <span>100%</span>
          <span>50%</span>
          <span>0%</span>
        </div>

        {/* Hovered point tooltip overlay */}
        {hoveredPoint && (
          <div className="absolute top-4 right-4 z-30 bg-[#131f33]/95 border border-cyan-500/40 backdrop-blur-md p-3 rounded-xl shadow-2xl text-xs max-w-xs pointer-events-none">
            <div className="font-mono text-cyan-300 font-bold mb-1 border-b border-[#223049] pb-1 flex justify-between">
              <span>{hoveredPoint.timeLabel}</span>
              <span>Total: {hoveredPoint.total}%</span>
            </div>
            <div className="space-y-1 mt-1.5 max-h-32 overflow-y-auto">
              {hoveredPoint.compounds.map((c, i) => (
                <div key={i} className="flex items-center justify-between gap-3 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color }} />
                    <span className="truncate max-w-[140px]">{c.name}</span>
                  </div>
                  <span className="font-mono font-semibold text-white">{c.value}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Responsive Scaled SVG */}
        <div
          className="w-full overflow-x-auto"
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'left center' }}
        >
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full h-56 sm:h-72 select-none"
            onMouseLeave={() => setHoveredPoint(null)}
          >
            {/* Grid lines */}
            {[0, 50, 100, 150, 200, 250, 300, 350].map((val) => {
              const y = getY(val);
              return (
                <line
                  key={val}
                  x1={paddingX}
                  y1={y}
                  x2={svgWidth - paddingX}
                  y2={y}
                  stroke="#1c283d"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
              );
            })}

            {/* Individual Compound Curves */}
            {compounds.map((comp) => {
              if (!selectedCompounds.includes(comp.id)) return null;

              const compPathD = simulationPoints.reduce((acc, pt, idx) => {
                const x = getX(idx);
                const val = pt.compoundLevels[comp.id] || 0;
                const y = getY(val);
                return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
              }, '');

              return (
                <g key={comp.id}>
                  <path
                    d={compPathD}
                    fill="none"
                    stroke={comp.colorHex}
                    strokeWidth="2"
                    strokeOpacity="0.85"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
              );
            })}

            {/* Total Aggregate Pharmacokinetic Curve (Gold / Neon Cyan Highlight) */}
            {showTotalCurve && totalPathD && (
              <g>
                {/* Glow filter underlay */}
                <path
                  d={totalPathD}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="drop-shadow-[0_0_10px_rgba(251,191,36,0.6)]"
                />
              </g>
            )}

            {/* Interactive hover detection columns */}
            {simulationPoints.map((pt, idx) => {
              const x = getX(idx);
              return (
                <rect
                  key={idx}
                  x={x - 6}
                  y={paddingY}
                  width={12}
                  height={chartH}
                  fill="transparent"
                  className="cursor-crosshair hover:fill-cyan-400/10"
                  onMouseEnter={() => {
                    setHoveredPoint({
                      timeLabel: pt.timeStr,
                      total: pt.total,
                      compounds: compounds
                        .filter((c) => selectedCompounds.includes(c.id))
                        .map((c) => ({
                          name: c.name,
                          value: pt.compoundLevels[c.id] || 0,
                          color: c.colorHex,
                        })),
                    });
                  }}
                />
              );
            })}

            {/* X-Axis Day Markers */}
            {simulationPoints
              .filter((_, idx) => idx % 8 === 0)
              .map((pt, idx) => {
                const pointIdx = idx * 8;
                const x = getX(pointIdx);
                return (
                  <g key={idx} transform={`translate(${x}, ${svgHeight - 10})`}>
                    <text
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="monospace"
                      transform="rotate(-40)"
                    >
                      {pt.label}
                    </text>
                  </g>
                );
              })}
          </svg>
        </div>

        {/* Footer Note */}
        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono pt-3 border-t border-[#1a2538] mt-2">
          <div className="flex items-center gap-1.5 text-cyan-400">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Interactive PK steady state accumulation calculated via 1-compartment oral kinetic equations</span>
          </div>
          <span className="hidden sm:inline text-slate-400">Pinch/Scroll to inspect timeline</span>
        </div>
      </div>
    </div>
  );
}
