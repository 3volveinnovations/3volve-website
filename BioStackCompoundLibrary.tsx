import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Camera, Search, Sparkles, BookOpen, Clock, ShieldCheck, Trash2, Edit3, X, Check, Save } from 'lucide-react';
import { Compound, PRESET_LIBRARY } from './data/biostackData';

interface BioStackCompoundLibraryProps {
  compounds: Compound[];
  onAddCompound: (newComp: Compound) => void;
  onUpdateCompound: (updated: Compound) => void;
  onDeleteCompound: (id: string) => void;
}

export default function BioStackCompoundLibrary({
  compounds,
  onAddCompound,
  onUpdateCompound,
  onDeleteCompound,
}: BioStackCompoundLibraryProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'custom' | 'presets' | 'scanner'>('presets');
  const [searchFilter, setSearchFilter] = useState('');
  const [editingCompoundId, setEditingCompoundId] = useState<string | null>(null);

  // New compound form state
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState<Compound['category']>('Supplement');
  const [newDose, setNewDose] = useState('');
  const [newRoute, setNewRoute] = useState('Oral');
  const [newTiming, setNewTiming] = useState('08:00 - Morning');
  const [newHalfLife, setNewHalfLife] = useState(4);
  const [newOverview, setNewOverview] = useState('');
  const [newMechanism, setNewMechanism] = useState('');
  const [newDays, setNewDays] = useState<string[]>(['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']);
  const [newColor, setNewColor] = useState('#38bdf8');
  const [scannerActive, setScannerActive] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);

  const colors = ['#38bdf8', '#10b981', '#a855f7', '#f59e0b', '#ec4899', '#06b6d4', '#6366f1', '#84cc16'];
  const dayOptions = ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'];

  const handleSelectPreset = (preset: typeof PRESET_LIBRARY[0]) => {
    setNewName(preset.name);
    setNewCategory(preset.category as Compound['category']);
    setNewDose(preset.defaultDose);
    setNewRoute(preset.route);
    setNewHalfLife(preset.halfLife);
    setNewOverview(preset.notes);
    setNewMechanism(`Pharmacokinetically optimized compound with verified elimination half-life of ${preset.halfLife} hours. Regulates target cellular cascades.`);
    setActiveTab('custom');
  };

  const handleSimulateScanner = (labelType: string) => {
    setScannerActive(true);
    setScannedResult(null);
    setTimeout(() => {
      setScannerActive(false);
      if (labelType === 'creatine') {
        setNewName('Creapure® Creatine Monohydrate');
        setNewCategory('Supplement');
        setNewDose('5 g (1 Rounded Scoop)');
        setNewRoute('Oral');
        setNewHalfLife(3.0);
        setNewOverview('Pure micronized creatine monohydrate supporting cellular ATP phosphocreatine regeneration.');
        setNewMechanism('Translocates across skeletal muscle membranes via SLC6A8; phosphorylation drives rapid ATP restoration.');
        setScannedResult('Creapure® Micronized Creatine (5g) parsed with 99.4% confidence!');
      } else if (labelType === 'liposomal_c') {
        setNewName('Liposomal Vitamin C (Sodium Ascorbate)');
        setNewCategory('Vitamin & Mineral');
        setNewDose('1000 mg (1 Liquid Pouch)');
        setNewRoute('Oral');
        setNewHalfLife(4.2);
        setNewOverview('Phospholipid encapsulated ascorbic acid bypassing intestinal SVCT1 saturable transport.');
        setNewMechanism('Bypasses carrier-mediated saturation, delivering high plasma AUC via lymphatic absorption.');
        setScannedResult('Liposomal Vitamin C 1000mg verified & calibrated!');
      } else if (labelType === 'nmn') {
        setNewName('β-Nicotinamide Mononucleotide (NMN)');
        setNewCategory('Longevity');
        setNewDose('500 mg');
        setNewRoute('Sublingual');
        setNewHalfLife(1.5);
        setNewOverview('Direct NAD+ biosynthetic precursor restoring intracellular NAD+ and mitochondrial sirtuin activation.');
        setNewMechanism('Transported via Slc12a8 into enterocytes and rapidly converted into NAD+ in cytoplasm.');
        setScannedResult('NMN 500mg parsed with biochemical half-life metrics!');
      }
      setActiveTab('custom');
    }, 1200);
  };

  const handleSaveNew = () => {
    if (!newName.trim()) return;
    const compound: Compound = {
      id: 'comp_' + Date.now(),
      name: newName,
      category: newCategory,
      dosage: newDose || '1 Serving',
      route: newRoute,
      timing: newTiming,
      halfLifeHours: Number(newHalfLife) || 4,
      doseDays: newDays,
      colorHex: newColor,
      overview: newOverview || 'Protocol research compound.',
      mechanism: newMechanism || 'Target cellular modulator.',
      takenToday: false,
    };
    onAddCompound(compound);
    setIsAddModalOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setNewName('');
    setNewDose('');
    setNewOverview('');
    setNewMechanism('');
    setScannedResult(null);
  };

  const filteredPresets = PRESET_LIBRARY.filter((p) =>
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="w-full space-y-6">
      {/* Top Banner and Add Button */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#0d131f] border border-[#1e293b] rounded-2xl p-5 sm:p-7 shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
              Compound Reference & Mechanism Inspector
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
              Deep biochemical mechanisms, half-life parameters, and protocol dosage specifications
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Compound to Protocol</span>
        </button>
      </div>

      {/* List of Active Protocol Compound Cards (Styled like Screenshot 5) */}
      <div className="space-y-4">
        {compounds.map((comp) => {
          const isEditing = editingCompoundId === comp.id;

          return (
            <div
              key={comp.id}
              className="bg-[#0e1626] border border-[#202f47] rounded-xl p-5 sm:p-6 transition-all hover:border-cyan-500/40 relative overflow-hidden"
            >
              {/* Left Color Accent Bar */}
              <div
                className="absolute left-0 top-0 bottom-0 w-1.5"
                style={{ backgroundColor: comp.colorHex }}
              />

              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h4 className="text-lg sm:text-xl font-bold text-white tracking-wide">
                    {comp.name}
                  </h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#18263d] text-slate-300 border border-[#263c5e]">
                    {comp.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2 py-0.5 rounded">
                    <Clock className="w-3 h-3" />
                    <span>HL: {comp.halfLifeHours}h</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingCompoundId(isEditing ? null : comp.id)}
                    className="p-1.5 text-slate-400 hover:text-cyan-400 rounded bg-[#142033] border border-[#223554] text-xs font-mono flex items-center gap-1 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{isEditing ? 'Close' : 'Deep Dive'}</span>
                  </button>
                  <button
                    onClick={() => onDeleteCompound(comp.id)}
                    aria-label={`Delete ${comp.name}`}
                    className="p-1.5 text-slate-400 hover:text-red-400 rounded bg-[#142033] border border-[#223554] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Badge Badges & Timing Row */}
              <div className="flex flex-wrap items-center gap-2 mb-3 text-xs font-mono">
                <span className="px-2.5 py-1 rounded bg-[#182842] text-cyan-300 font-semibold border border-[#233c63]">
                  {comp.timing}
                </span>
                <span className="px-2.5 py-1 rounded bg-[#201833] text-pink-300 font-semibold border border-[#3b275e]">
                  {comp.dosage}
                </span>
                <span className="px-2 py-1 rounded bg-[#131f33] text-slate-400">
                  {comp.route}
                </span>
              </div>

              {/* Overview text */}
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-3">
                {comp.overview}
              </p>

              {/* Dose Days row */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono">
                <span className="text-slate-400 mr-1 uppercase">DOSE DAYS:</span>
                {['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'].map((d) => (
                  <span
                    key={d}
                    className={`w-6 h-6 rounded flex items-center justify-center font-bold ${
                      comp.doseDays.includes(d)
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                        : 'bg-[#121c2e] text-slate-400 border border-[#1b2a42]'
                    }`}
                  >
                    {d}
                  </span>
                ))}
              </div>

              {/* Deep Dive Expanded Inspection Box (Screenshot 5 Match) */}
              <AnimatePresence>
                {isEditing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-5 pt-5 border-t border-[#20304c] space-y-4"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-cyan-400">
                      <span>EDIT COMPOUND SPECIFICATIONS</span>
                      <button className="flex items-center gap-1 text-purple-400 hover:underline">
                        <Sparkles className="w-3 h-3" />
                        <span>Auto-Gen AI Text</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <label className="text-slate-400 block mb-1">Compound Name</label>
                        <input
                          type="text"
                          value={comp.name}
                          onChange={(e) => onUpdateCompound({ ...comp, name: e.target.value })}
                          className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Timing</label>
                        <input
                          type="text"
                          value={comp.timing}
                          onChange={(e) => onUpdateCompound({ ...comp, timing: e.target.value })}
                          className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Dosage</label>
                        <input
                          type="text"
                          value={comp.dosage}
                          onChange={(e) => onUpdateCompound({ ...comp, dosage: e.target.value })}
                          className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg px-3 py-2 text-white"
                        />
                      </div>
                      <div>
                        <label className="text-slate-400 block mb-1">Half-Life (Hours)</label>
                        <input
                          type="number"
                          value={comp.halfLifeHours}
                          onChange={(e) => onUpdateCompound({ ...comp, halfLifeHours: Number(e.target.value) })}
                          className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg px-3 py-2 text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-slate-400 text-xs block mb-1">Biochemical Mechanism Deep Dive</label>
                      <textarea
                        rows={3}
                        value={comp.mechanism}
                        onChange={(e) => onUpdateCompound({ ...comp, mechanism: e.target.value })}
                        className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg p-3 text-xs text-slate-200 leading-relaxed"
                      />
                    </div>

                    {comp.absorptionNotes && (
                      <div>
                        <label className="text-slate-400 text-xs block mb-1">Absorption & Transport Notes</label>
                        <textarea
                          rows={2}
                          value={comp.absorptionNotes}
                          onChange={(e) => onUpdateCompound({ ...comp, absorptionNotes: e.target.value })}
                          className="w-full bg-[#0b121e] border border-[#1e2f4a] rounded-lg p-3 text-xs text-slate-200"
                        />
                      </div>
                    )}

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => setEditingCompoundId(null)}
                        className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold font-mono flex items-center gap-1.5"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Add Compound Modal (Screenshot 7 Match) */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-[#0b121e] border border-[#1f304d] rounded-2xl p-6 sm:p-8 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto relative"
            >
              {/* Modal Close */}
              <button
                onClick={() => setIsAddModalOpen(false)}
                aria-label="Close modal"
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                    Add Compound to Protocol
                  </h3>
                  <p className="text-xs text-slate-400 font-light">
                    Type compound details or scan a bottle photo with AI
                  </p>
                </div>
              </div>

              {/* Top Selector Grid: Preset Library vs AI Label Scanner */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setActiveTab('presets')}
                  className={`p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                    activeTab === 'presets'
                      ? 'bg-[#132035] border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                      : 'bg-[#0e1726] border-[#1f2f4a] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Preset Reference Library</div>
                      <div className="text-[11px] text-slate-400">Browse verified half-lives & protocols</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                    170 Items →
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('scanner')}
                  className={`p-4 rounded-xl border flex items-center justify-between text-left transition-all ${
                    activeTab === 'scanner'
                      ? 'bg-[#102924] border-emerald-500/60 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                      : 'bg-[#0e1726] border-[#1f2f4a] hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                      <Camera className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase">Fast AI Label Scanner</div>
                      <div className="text-[11px] text-slate-400">Snap label photo to auto-fill</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-600 text-white font-bold flex items-center gap-1">
                    <Camera className="w-3 h-3" />
                    <span>Take Photo</span>
                  </span>
                </button>
              </div>

              {/* Presets Tab View */}
              {activeTab === 'presets' && (
                <div className="space-y-4 mb-6">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search 170+ verified clinical reference compounds..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div className="max-h-56 overflow-y-auto space-y-2 pr-1">
                    {filteredPresets.map((item) => (
                      <div
                        key={item.name}
                        onClick={() => handleSelectPreset(item)}
                        className="p-3 rounded-lg bg-[#0e1726] border border-[#1e2f4a] hover:border-cyan-500/60 hover:bg-[#132035] cursor-pointer flex items-center justify-between text-xs transition-colors"
                      >
                        <div>
                          <div className="font-bold text-white">{item.name}</div>
                          <div className="text-[11px] text-slate-400">{item.notes}</div>
                        </div>
                        <div className="text-right font-mono text-[11px]">
                          <span className="text-cyan-300 block">{item.defaultDose}</span>
                          <span className="text-pink-300">HL: {item.halfLife}h</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Fast AI Label Scanner Tab View */}
              {activeTab === 'scanner' && (
                <div className="p-5 rounded-xl bg-[#080d17] border border-[#1b2b45] space-y-4 mb-6 text-center">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto">
                    <Camera className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Supplement Label OCR & PK Engine</h4>
                    <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                      BioStack computer vision detects compound purity, active milligram dosages, recommended route, and auto-calculates plasma half-life.
                    </p>
                  </div>

                  {scannerActive ? (
                    <div className="p-4 rounded-xl bg-[#0f1d1b] border border-emerald-500/50 text-xs text-emerald-300 flex items-center justify-center gap-2">
                      <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
                      <span>Scanning label photo, isolating active molecules & half-life...</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-400">Test with sample label scans:</div>
                      <div className="flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => handleSimulateScanner('creatine')}
                          className="px-3 py-1.5 rounded-lg bg-[#14231f] border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/20"
                        >
                          🧪 Creapure Creatine Label
                        </button>
                        <button
                          onClick={() => handleSimulateScanner('liposomal_c')}
                          className="px-3 py-1.5 rounded-lg bg-[#14231f] border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/20"
                        >
                          🍊 Liposomal Vitamin C
                        </button>
                        <button
                          onClick={() => handleSimulateScanner('nmn')}
                          className="px-3 py-1.5 rounded-lg bg-[#14231f] border border-emerald-500/40 text-emerald-300 text-xs hover:bg-emerald-500/20"
                        >
                          🧬 NMN 500mg Bottle
                        </button>
                      </div>
                    </div>
                  )}

                  {scannedResult && (
                    <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-xs text-emerald-300 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      <span>{scannedResult}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Custom Form Fields */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono uppercase text-cyan-400 font-bold">
                    COMPOUND / SUPPLEMENT NAME *
                  </label>
                  <button
                    onClick={() => {
                      if (!newName) setNewName('Nicotinamide Mononucleotide (NMN)');
                      setNewCategory('Longevity');
                      setNewDose('500 mg');
                      setNewRoute('Sublingual');
                      setNewHalfLife(1.5);
                      setNewOverview('Direct NAD+ precursor restoring cellular sirtuin activity.');
                      setNewMechanism('Enzymatically converted to NAD+ via NMNAT pathway.');
                    }}
                    className="text-[11px] font-mono text-purple-400 hover:underline flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>Auto-Fill with AI</span>
                  </button>
                </div>

                <input
                  type="text"
                  placeholder="e.g. Creatine Monohydrate, Ashwagandha, NMN, Berberine..."
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 font-medium"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="text-slate-400 block mb-1">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as Compound['category'])}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-3 py-2.5 text-white"
                    >
                      <option value="Supplement">Supplement</option>
                      <option value="Vitamin & Mineral">Vitamin & Mineral</option>
                      <option value="Nootropic">Nootropic</option>
                      <option value="Peptide">Peptide</option>
                      <option value="Amino Acid">Amino Acid</option>
                      <option value="Longevity">Longevity</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Dosage</label>
                    <input
                      type="text"
                      placeholder="e.g. 5 g, 1000 mg, 1 Scoop, 2 capsules"
                      value={newDose}
                      onChange={(e) => setNewDose(e.target.value)}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Administration Route</label>
                    <input
                      type="text"
                      placeholder="Oral, SubQ, Intranasal, Oral Shake..."
                      value={newRoute}
                      onChange={(e) => setNewRoute(e.target.value)}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Dosing Schedule / Time</label>
                    <input
                      type="text"
                      placeholder="08:00 - Morning, 20:00 - Evening..."
                      value={newTiming}
                      onChange={(e) => setNewTiming(e.target.value)}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-3 py-2.5 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Biological Half-Life (Hours)</label>
                    <input
                      type="number"
                      placeholder="e.g. 1, 4, 12, 24"
                      value={newHalfLife}
                      onChange={(e) => setNewHalfLife(Number(e.target.value))}
                      className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl px-3 py-2.5 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Card Color Theme</label>
                    <div className="flex items-center gap-1.5 pt-1">
                      {colors.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setNewColor(c)}
                          className={`w-6 h-6 rounded-full transition-transform ${
                            newColor === c ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                    <span>Active Dosing Days</span>
                    <div className="space-x-2 font-mono text-[10px]">
                      <button
                        type="button"
                        onClick={() => setNewDays([...dayOptions])}
                        className="text-cyan-400 hover:underline"
                      >
                        All
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewDays(['M', 'T', 'W', 'Th', 'F'])}
                        className="text-cyan-400 hover:underline"
                      >
                        M-F
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-1.5">
                    {dayOptions.map((d) => {
                      const active = newDays.includes(d);
                      return (
                        <button
                          key={d}
                          type="button"
                          onClick={() =>
                            setNewDays(active ? newDays.filter((x) => x !== d) : [...newDays, d])
                          }
                          className={`flex-1 py-1.5 rounded text-xs font-mono font-bold transition-colors ${
                            active
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                              : 'bg-[#080d17] text-slate-400 border border-[#1d2d47]'
                          }`}
                        >
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-xs block mb-1">Functional Overview / Mechanism</label>
                  <textarea
                    rows={2}
                    placeholder="Primary pharmacological mechanism or health benefits..."
                    value={newOverview}
                    onChange={(e) => setNewOverview(e.target.value)}
                    className="w-full bg-[#080d17] border border-[#1d2d47] rounded-xl p-3 text-xs text-white placeholder-slate-500"
                  />
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#1d2d47]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-[#141f30] hover:bg-[#1b2b42] text-slate-300 font-medium text-xs uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNew}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Save & Add to Stack</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
