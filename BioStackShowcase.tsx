import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  X,
  TrendingUp,
  Bot,
  FileCheck2,
  BookOpen,
  Calendar,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  RotateCw,
  HelpCircle,
  DownloadCloud,
  CheckCircle,
  Zap,
} from 'lucide-react';
import { Compound, INITIAL_COMPOUNDS } from './data/biostackData';
import BioStackOverview from './BioStackOverview';
import BioStackPKAccumulation from './BioStackPKAccumulation';
import BioStackAIConsultant from './BioStackAIConsultant';
import BioStackClinicalReport from './BioStackClinicalReport';
import BioStackCompoundLibrary from './BioStackCompoundLibrary';
import BioStackDosingSchedule from './BioStackDosingSchedule';
import biostackBg from '../../assets/images/1786849589167.png';

interface BioStackShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule';
}

export default function BioStackShowcase({
  isOpen,
  onClose,
  initialTab = 'overview',
}: BioStackShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule'>(
    initialTab
  );
  const [compounds, setCompounds] = useState<Compound[]>(INITIAL_COMPOUNDS);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [engineMode, setEngineMode] = useState<'essential' | 'research'>('research');

  if (!isOpen) return null;

  const handleToggleDose = (id: string) => {
    setCompounds((prev) =>
      prev.map((c) => (c.id === id ? { ...c, takenToday: !c.takenToday } : c))
    );
  };

  const handleAddCompound = (newComp: Compound) => {
    setCompounds((prev) => [newComp, ...prev]);
  };

  const handleUpdateCompound = (updated: Compound) => {
    setCompounds((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const handleDeleteCompound = (id: string) => {
    setCompounds((prev) => prev.filter((c) => c.id !== id));
  };

  const handleApplyAISwaps = () => {
    // Apply recommended swaps: Replace ascorbic acid with Liposomal C, add Ubiquinol & Magnesium L-Threonate if not present
    setCompounds((prev) => {
      let next = prev.map((c) => {
        if (c.name.includes('Ascorbic Acid')) {
          return {
            ...c,
            name: 'Liposomal Vitamin C',
            dosage: '1000 mg',
            timing: '08:30 - Morning',
            overview: 'Lipid-encapsulated ascorbic acid formulation designed to bypass saturable sodium-dependent vitamin C transporters.',
          };
        }
        return c;
      });

      // Ensure Ubiquinol and Mag Threonate exist
      const hasUbiquinol = next.some((c) => c.name.includes('Ubiquinol'));
      if (!hasUbiquinol) {
        next.push({
          id: 'ubiquinol_auto',
          name: 'Ubiquinol (Active CoQ10)',
          category: 'Supplement',
          dosage: '200 mg',
          route: 'Oral Softgel',
          timing: '08:30 - Morning Meal',
          halfLifeHours: 33,
          doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
          colorHex: '#ec4899',
          overview: 'Reduced active electron-donor form of CoQ10 targeting mitochondrial electron transport chain complex I/II.',
          mechanism: 'Acts directly in the inner mitochondrial lipid membrane as a mobile lipophilic electron carrier.',
          takenToday: false,
        });
      }
      return next;
    });
  };

  const handleSaveProtocol = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2500);
  };

  const navItems = [
    { id: 'overview', label: 'Product Tour', icon: Sparkles },
    { id: 'pk', label: '7-Day PK Model', icon: TrendingUp },
    { id: 'ai', label: 'AI Consultant', icon: Bot },
    { id: 'clinical', label: 'Clinical Report', icon: FileCheck2 },
    { id: 'library', label: 'Compound Library', icon: BookOpen },
    { id: 'schedule', label: 'Dosing Schedule', icon: Calendar },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#070b14]/95 backdrop-blur-xl flex flex-col text-slate-100 selection:bg-cyan-500/30">
      {/* Background Graphic */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `url(${biostackBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen'
        }}
      />
      
      {/* Top Application Header Ribbon (Faithfully matching BioStack screenshot) */}
      <header className="sticky top-0 z-40 bg-[#090e18]/90 border-b border-[#1b263b] backdrop-blur-md px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Sync Status */}
        <div className="flex items-center gap-3.5">
          <div className="flex items-center gap-2.5">
            {/* Cyan DNA Helix Graphic */}
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_12px_rgba(0,210,255,0.25)]">
              <span className="font-bold text-lg leading-none">🧬</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-sans">
                  BioStack
                </span>
                <span className="hidden sm:inline-block text-[9px] font-mono tracking-widest text-cyan-400 uppercase bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                  RESEARCH ENGINE
                </span>
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Cloud Synced</span>
          </div>
        </div>

        {/* Center Mode Switcher & Tools */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Mode Switcher */}
          <div className="flex items-center bg-[#111a2c] p-1 rounded-xl border border-[#202f4a] text-xs font-medium">
            <button
              onClick={() => setEngineMode('essential')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                engineMode === 'essential'
                  ? 'bg-slate-700 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Essential
            </button>
            <button
              onClick={() => setEngineMode('research')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                engineMode === 'research'
                  ? 'bg-cyan-600 text-white font-bold shadow-[0_0_10px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Research</span>
            </button>
          </div>

          {/* User Email Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111a2c] border border-[#202f4a] text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>admin@3volveinnovations.com</span>
          </div>

          {/* Save / Import Button */}
          <button
            onClick={handleSaveProtocol}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111a2c] hover:bg-[#18263f] border border-[#202f4a] text-xs font-medium text-slate-200 transition-colors"
          >
            <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Save Protocol</span>
          </button>

          {/* Safety Check Button */}
          <button
            onClick={() => setShowSafetyModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-medium transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Safety Check</span>
          </button>

          {/* Launch Live Link */}
          <Link
            to="/preview/biostack"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-mono transition-all shadow-sm"
          >
            <span className="hidden sm:inline">Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          {/* Close Showcase Modal */}
          <button
            onClick={onClose}
            aria-label="Close BioStack showcase"
            className="p-2 rounded-xl bg-[#182438] hover:bg-slate-700 text-slate-300 hover:text-white transition-colors ml-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Showcase Sub-Navigation Tabs */}
      <div className="relative z-10 bg-[#0b121e] border-b border-[#1b263b] px-4 sm:px-8 py-2.5 overflow-x-auto flex items-center gap-2 scrollbar-none">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as typeof activeTab)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_12px_rgba(6,182,212,0.25)]'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-[#121c2e] border border-transparent'
              }`}
            >
              <item.icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Viewport */}
      <main className="relative z-10 flex-grow w-full max-w-7xl mx-auto px-4 sm:px-8 py-8">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackOverview onSelectTab={(t) => setActiveTab(t)} />
            </motion.div>
          )}

          {activeTab === 'pk' && (
            <motion.div
              key="pk"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackPKAccumulation compounds={compounds} />
            </motion.div>
          )}

          {activeTab === 'ai' && (
            <motion.div
              key="ai"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackAIConsultant
                compounds={compounds}
                onApplySwaps={handleApplyAISwaps}
              />
            </motion.div>
          )}

          {activeTab === 'clinical' && (
            <motion.div
              key="clinical"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackClinicalReport compounds={compounds} />
            </motion.div>
          )}

          {activeTab === 'library' && (
            <motion.div
              key="library"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackCompoundLibrary
                compounds={compounds}
                onAddCompound={handleAddCompound}
                onUpdateCompound={handleUpdateCompound}
                onDeleteCompound={handleDeleteCompound}
              />
            </motion.div>
          )}

          {activeTab === 'schedule' && (
            <motion.div
              key="schedule"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
            >
              <BioStackDosingSchedule
                compounds={compounds}
                onToggleDose={handleToggleDose}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Safety Check Modal */}
      <AnimatePresence>
        {showSafetyModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-[#0d1524] border border-[#23354f] rounded-2xl p-6 shadow-2xl text-slate-100"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1e2f4a] mb-4">
                <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>BioStack Real-Time Safety & Contraindication Audit</span>
                </div>
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed">
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Transporter Competition Cleared:</strong> Staggered divalent mineral timings prevent intestinal DMT-1 saturation.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Hepatic Clearance Load:</strong> Total daily metabolism remains well below liver phase I/II enzyme saturation capacities.
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-start gap-2.5">
                  <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Lipid-Vehicle Optimization:</strong> Fat-soluble vitamins (D3, K2, CoQ10) are synchronized with meal fat matrix for 3x AUC.
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setShowSafetyModal(false)}
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase"
                >
                  Close Audit
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Save Toast */}
      <AnimatePresence>
        {showSaveToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 text-xs font-mono"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Protocol snapshot saved & synced to cloud!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
