import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bot, Sparkles, Zap, ArrowRight, CheckCircle, RefreshCw, Send, ShieldAlert, Cpu } from 'lucide-react';
import { Compound } from './data/biostackData';

interface BioStackAIConsultantProps {
  compounds: Compound[];
  onApplySwaps?: () => void;
}

export default function BioStackAIConsultant({ compounds: _compounds, onApplySwaps }: BioStackAIConsultantProps) {
  const [activeGoals, setActiveGoals] = useState<string[]>([
    'Longevity & Metabolic Health',
    'Focus & Neuroprotection',
    'Mitochondrial Repair',
    'Recovery & Joint Support',
    'Cardiovascular & Lipid Control',
  ]);
  const [swapsApplied, setSwapsApplied] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customResponse, setCustomResponse] = useState<string | null>(null);

  const goalOptions = [
    'Longevity & Metabolic Health',
    'Focus & Neuroprotection',
    'Mitochondrial Repair',
    'Recovery & Joint Support',
    'Cardiovascular & Lipid Control',
    'Hormonal Balance & Vitality',
  ];

  const toggleGoal = (goal: string) => {
    setActiveGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleApply = () => {
    setSwapsApplied(true);
    if (onApplySwaps) onApplySwaps();
    setTimeout(() => {
      // transient state feedback
    }, 1500);
  };

  const handlePromptClick = (promptText: string) => {
    setUserQuery(promptText);
    runAnalysis(promptText);
  };

  const runAnalysis = (query: string) => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setCustomResponse(null);

    setTimeout(() => {
      setIsAnalyzing(false);
      if (query.toLowerCase().includes('receptor') || query.toLowerCase().includes('competition')) {
        setCustomResponse(
          '**Receptor & Transporter Competition Analysis**:\n• **Zinc vs. Magnesium / Iron**: Divalent metal transporters (DMT-1) in the duodenum undergo competitive saturation. Staggering Zinc (morning) and Magnesium (bedtime) prevents 34% absorption inhibition.\n• **Large Neutral Amino Acids (LNAA)**: Tyrosine and Tryptophan compete for LAT1 blood-brain barrier transport. Take nootropics on empty stomach at least 45 min before protein-dense meals.\n• **SVCT1 Transporter Saturation**: Unbuffered Ascorbic Acid saturates intestinal sodium-dependent transporters at >200mg single bolus. Swapping to Liposomal encapsulation avoids saturation entirely.'
        );
      } else if (query.toLowerCase().includes('timing') || query.toLowerCase().includes('stagger')) {
        setCustomResponse(
          '**Pharmacokinetic Dosing Window Recommendations**:\n1. **08:00 (Post-Workout)**: Creatine (5g) + Whey Isolate (25g). Post-exercise hyperinsulinemia upregulates sarcolemmal CRT/SLC6A8 transporters, enhancing phosphocreatine loading by 28%.\n2. **08:30 (Morning Lipid Meal)**: Omega-3 (2-3g) + Vitamin D3/K2 (5000 IU) + Ubiquinol (200mg). Dietary lipid chylomicron formation increases fat-soluble vitamin AUC by 3.2x.\n3. **21:30 (Pre-Sleep)**: Magnesium L-Threonate (144mg elemental) + Apigenin (50mg). Reduces synaptic noise via allosteric GABA-A modulation and drops nocturnal core temperature.'
        );
      } else if (query.toLowerCase().includes('peptide') || query.toLowerCase().includes('retatrutide')) {
        setCustomResponse(
          '**Peptide & GLP-1/GIP/Glucagon PK Optimization (Retatrutide / Semaglutide)**:\n• **Elimination Half-Life**: Retatrutide exhibits an extended plasma elimination half-life of ~6 days. Administer subcutaneously on a fixed 7-day cadence (e.g. Sunday 08:00) to maintain steady-state trough concentrations >85% of peak.\n• **Delayed Gastric Emptying Notice**: Substantial deceleration of gastric transit time reduces the absorption rate ($k_a$) of oral supplements. Take fat-soluble vitamins and oral amino acids in liquid/liposomal forms to counteract delayed pyloric transit.'
        );
      } else {
        setCustomResponse(
          `**BioStack AI Analysis for: "${query}"**\n• **Pharmacodynamic Synergy**: Selected active targets (${activeGoals.slice(0, 2).join(', ')}) demonstrate high biochemical coherence with your active protocol.\n• **Suggested Modification**: Introduce 100mg active R-Alpha Lipoic Acid alongside Ubiquinol to regenerate endogenous intracellular glutathione and ascorbic acid pools in the mitochondrial matrix.`
        );
      }
    }, 700);
  };

  return (
    <div className="w-full bg-[#0d131f] border border-[#1e293b] rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(56,189,248,0.06),transparent_60%)] pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#1e293b]/80 pb-5 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-inner">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
                BioStack AI Consultant
              </h3>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/40 text-cyan-300 font-semibold">
                Gemini Powered
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
              Comprehensive pharmacokinetic analysis, stack optimization, and compound swap recommendations
            </p>
          </div>
        </div>

        {/* Optimize Stack Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => runAnalysis('Optimize timing & stagger doses')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(245,158,11,0.3)]"
          >
            <Zap className="w-4 h-4 fill-slate-950" />
            <span>Optimize Stack</span>
          </button>
        </div>
      </div>

      {/* Target Health Goals Selection Chips */}
      <div className="mb-6 relative z-10">
        <div className="flex items-center gap-2 mb-2.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-mono uppercase text-slate-400">AI Optimization Context Goals:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {goalOptions.map((goal) => {
            const isSelected = activeGoals.includes(goal);
            return (
              <button
                key={goal}
                onClick={() => toggleGoal(goal)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-cyan-950/60 text-cyan-300 border-cyan-500/50 shadow-sm'
                    : 'bg-[#101826]/70 text-slate-400 border-[#1e293b] hover:border-slate-700 opacity-60'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}
                {goal}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main AI Consultant Clinical Intelligence Dossier */}
      <div className="bg-[#090e17] border border-[#1a2538] rounded-xl p-5 sm:p-6 mb-6 space-y-6 relative z-10 text-xs sm:text-sm text-slate-200 leading-relaxed font-light">
        {/* Section 1: Biological Rationale */}
        <div>
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="text-cyan-400 font-mono">1.</span> Biological Rationale
          </h4>
          <p className="text-slate-300 mb-3">
            The primary objective of this protocol optimization is to maximize enterocyte transcellular transport, prevent carrier-mediated saturation, and capitalize on pharmacodynamic synergies across mitochondrial, neurological, and cardiovascular target tissues.
          </p>
          <div className="space-y-2 text-slate-300 pl-3 border-l-2 border-cyan-500/30">
            <p>
              <strong className="text-white font-semibold">Fat-Soluble Co-Ingestion & Micellar Solubilization:</strong> Vitamin D3/K2 and marine lipids (Omega-3) depend on bile acid emulsification and mixed micelle formation for enterocyte uptake via passive diffusion and scavenger receptor B1 (SR-B1). Co-ingesting Omega-3 with Vitamin D3/K2 and Ubiquinol creates an optimal lipid matrix, maximizing systemic bioavailability.
            </p>
            <p>
              <strong className="text-white font-semibold">SVCT1 Saturable Transport vs. Liposomal Delivery:</strong> Unformulated Ascorbic Acid utilizes Sodium-Dependent Vitamin C Transporter 1 (SVCT1) in the intestinal epithelium. SVCT1 saturates rapidly at doses above 200 mg, causing oral bioavailability to drop sharply and creating osmotic gradient shifts in the gut lumen. Liposomal encapsulation bypasses SVCT1 saturation by utilizing lymphatic endocytosis and lipid-bilayer fusion.
            </p>
            <p>
              <strong className="text-white font-semibold">Sarcolemmal Transport & Insulin Synergy:</strong> Creatine uptake via the Na+/Cl–-dependent creatine transporter (CRT/SLC6A8) is upregulated by insulin signal transduction (Akt/mTOR pathway). Aligning Creatine Monohydrate with post-workout Whey Protein Isolate triggers an acute amino acid-induced insulin response, driving maximal intracellular phosphocreatine loading.
            </p>
            <p>
              <strong className="text-white font-semibold">Enzymatic Cofactor Interdependence:</strong> Bioactive 1,25-dihydroxyvitamin D synthesis requires magnesium as an essential cofactor for hepatic 25-hydroxylase and renal 1-alpha-hydroxylase enzymes. Introducing Magnesium L-Threonate at night ensures optimal divalent cation availability for Vitamin D hydroxylase kinetics while crossing the blood-brain barrier to density-regulate NMDA receptors.
            </p>
          </div>
        </div>

        {/* Section 2: Itemized Schedule & Dose Adjustments */}
        <div className="pt-2 border-t border-[#1a2538]">
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="text-cyan-400 font-mono">2.</span> 📋 Itemized Schedule & Dose Adjustments
          </h4>
          <ul className="space-y-1.5 text-slate-300 pl-3 border-l-2 border-blue-500/30">
            <li>
              <strong className="text-white">Protein Powder (Whey / Isolate)</strong> (08:00, 25-30 g): Scheduled post-workout. Restored daysActive to full 7-day schedule to ensure consistent leucine-driven mTORC1 activation and repair.
            </li>
            <li>
              <strong className="text-white">Creatine Monohydrate</strong> (08:00, 5 g): Kept at post-workout morning mark alongside protein to utilize acute hyperinsulinemia for sarcolemmal CRT translocation.
            </li>
            <li>
              <strong className="text-white">Omega-3 (EPA / DHA)</strong> (08:30, 2-3 g): Synchronized with morning lipid-containing meal to act as a lipid carrier vehicle for fat-soluble compounds.
            </li>
            <li>
              <strong className="text-white">Vitamin D3 / K2 (MK-7)</strong> (08:30, 5000 IU / 100 mcg): Timed directly with Omega-3 and breakfast meal to ensure micellar incorporation and MGP/osteocalcin carboxylation synergy.
            </li>
            <li>
              <strong className="text-white">Liposomal Vitamin C</strong> (08:30, 1000 mg): Replaced unbuffered Ascorbic Acid to circumvent SVCT1 transporter rate-limiting kinetics and optimize plasma area-under-the-curve (AUC).
            </li>
          </ul>
        </div>

        {/* Section 3: Recommended Compound Swaps & Additions */}
        <div className="pt-2 border-t border-[#1a2538]">
          <h4 className="text-white font-bold text-sm sm:text-base uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <span className="text-cyan-400 font-mono">3.</span> 🔄 Recommended Compound Swaps & Additions
          </h4>
          <ul className="space-y-2 text-slate-300 pl-3 border-l-2 border-amber-500/30">
            <li>
              <strong className="text-amber-300 font-semibold">Replaced: Vitamin C (Ascorbic Acid) → Liposomal Vitamin C:</strong> Bypasses saturable intestinal SVCT1 transporters, preventing osmotic GI clearance and accelerating cellular membrane uptake.
            </li>
            <li>
              <strong className="text-cyan-300 font-semibold">Added: Ubiquinol (CoQ10) (200 mg at 08:30):</strong> Essential lipid-phase electron donor in inner mitochondrial membrane complex I/II, working synergistically with Omega-3 to suppress oxidative lipid peroxidation and restore cardiac ATP kinetics.
            </li>
            <li>
              <strong className="text-purple-300 font-semibold">Added: Magnesium L-Threonate (144 mg elemental Mg at 21:30):</strong> Crosses the blood-brain barrier to enhance CSF magnesium concentrations, support NMDA receptor modulation, and serve as an obligate enzymatic cofactor for Vitamin D activation.
            </li>
          </ul>
        </div>

        {/* Recommended Compound Replacement Card (Screenshot Match) */}
        <div className="bg-[#121c2d] border border-amber-500/30 rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recommended Compound Replacements (1):</span>
          </div>
          <div className="bg-[#0b121f] border border-[#1e2e47] rounded-lg p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-medium">
              <span className="line-through text-red-400">Vitamin C (Ascorbic Acid)</span>
              <ArrowRight className="w-4 h-4 text-amber-400 flex-shrink-0" />
              <span className="text-emerald-400 font-bold">Liposomal Vitamin C</span>
              <span className="px-2 py-0.5 rounded bg-[#18263d] text-slate-300 text-[11px] font-mono">
                1000 mg @ 08:30 - Morning
              </span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 italic mt-2">
            Ascorbic acid exhibits saturable SVCT1 transport; liposomal encapsulation bypasses transporter rate-limitation via lipid bilayer fusion.
          </p>
        </div>

        {/* Proposed Schedule & Dose Shifts (6 modified) */}
        <div className="bg-[#121c2d] border border-amber-500/30 rounded-xl p-4 mt-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Proposed Schedule & Dose Shifts (6 modified):</span>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-slate-200 font-sans font-semibold">Omega-3 (EPA / DHA):</span>
              <span className="text-slate-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">Timing: 08:30 → 08:30 - Morning Meal</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-slate-200 font-sans font-semibold">Vitamin D3 / K2 (MK-7):</span>
              <span className="text-slate-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">Timing: 08:30 → 08:30 - Morning Meal</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-emerald-300 font-sans font-semibold">Liposomal Vitamin C:</span>
              <span className="text-emerald-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">New in Stack: 08:30 - Morning (1000 mg)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-slate-200 font-sans font-semibold">Protein Powder (Whey / Isolate):</span>
              <span className="text-slate-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">Timing: 08:00 - Morning / Post-Workout</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-cyan-300 font-sans font-semibold">Ubiquinol:</span>
              <span className="text-cyan-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">New in Stack: 08:30 - Morning Meal (200 mg)</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-[#0b121f] border border-[#1e2e47]">
              <span className="text-purple-300 font-sans font-semibold">Magnesium L-Threonate:</span>
              <span className="text-purple-400 bg-[#18263d] px-2 py-0.5 rounded text-[11px]">New in Stack: 21:30 - Evening (144 mg Elemental)</span>
            </div>
          </div>
        </div>

        {/* Apply Swaps Button */}
        <button
          onClick={handleApply}
          className={`w-full py-3 px-6 rounded-xl font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
            swapsApplied
              ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
              : 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          }`}
        >
          {swapsApplied ? (
            <>
              <CheckCircle className="w-5 h-5 fill-slate-950 text-emerald-400" />
              <span>Optimizations Applied to Research Engine!</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-slate-950 text-slate-950" />
              <span>⚡ Apply AI Stack Optimization & Swaps</span>
            </>
          )}
        </button>
      </div>

      {/* Interactive Quick Prompts from Screenshot */}
      <div className="space-y-3 relative z-10">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handlePromptClick('Optimize timing & stagger doses')}
            className="px-3 py-1.5 rounded-full bg-[#141e30] border border-[#22324f] hover:border-cyan-500 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Zap className="w-3 h-3 text-amber-400" />
            <span>Optimize timing & stagger doses</span>
          </button>
          <button
            onClick={() => handlePromptClick('Recommend compound replacements or upgrades')}
            className="px-3 py-1.5 rounded-full bg-[#141e30] border border-[#22324f] hover:border-cyan-500 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3 text-cyan-400" />
            <span>Recommend compound replacements or upgrades</span>
          </button>
          <button
            onClick={() => handlePromptClick('Analyze my stack for potential receptor competition')}
            className="px-3 py-1.5 rounded-full bg-[#141e30] border border-[#22324f] hover:border-cyan-500 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <ShieldAlert className="w-3 h-3 text-pink-400" />
            <span>Analyze my stack for potential receptor competition</span>
          </button>
          <button
            onClick={() => handlePromptClick('How should I optimize the dosing timing for Retatrutide / Peptides?')}
            className="px-3 py-1.5 rounded-full bg-[#141e30] border border-[#22324f] hover:border-cyan-500 text-slate-300 text-xs font-mono transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3 h-3 text-purple-400" />
            <span>How should I optimize peptide timing?</span>
          </button>
        </div>

        {/* Dynamic AI Response box if query executed */}
        <AnimatePresence>
          {isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-[#0a101b] border border-cyan-500/40 flex items-center gap-3 text-xs text-cyan-300 font-mono"
            >
              <div className="w-4 h-4 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin" />
              <span>BioStack Gemini Engine parsing pharmacokinetics & metabolic pathways...</span>
            </motion.div>
          )}

          {customResponse && !isAnalyzing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="p-4 rounded-xl bg-[#0c1424] border border-cyan-500/50 text-xs sm:text-sm text-slate-200 leading-relaxed space-y-2 shadow-xl"
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono font-bold text-xs uppercase border-b border-[#1e2f4a] pb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>BioStack Live Pharmacokinetics Consultation</span>
              </div>
              <div className="whitespace-pre-line text-slate-300">
                {customResponse}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Prompt Input Form */}
        <div className="flex items-center gap-2 bg-[#090e17] border border-[#1e2e47] rounded-xl p-1.5 focus-within:border-cyan-500 transition-colors">
          <input
            type="text"
            value={userQuery}
            onChange={(e) => setUserQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') runAnalysis(userQuery);
            }}
            placeholder="Ask AI Consultant about stack, dosing, half-lives, compound replacements..."
            className="flex-grow bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={() => runAnalysis(userQuery)}
            aria-label="Send query to AI consultant"
            className="p-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition-colors flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
