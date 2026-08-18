export interface Compound {
  id: string;
  name: string;
  category: 'Supplement' | 'Vitamin & Mineral' | 'Nootropic' | 'Peptide' | 'Amino Acid' | 'Longevity';
  dosage: string;
  route: string;
  timing: string;
  halfLifeHours: number;
  doseDays: string[]; // e.g. ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su']
  colorHex: string;
  overview: string;
  mechanism: string;
  absorptionNotes?: string;
  takenToday?: boolean;
}

export interface HealthGoal {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  color: string;
  active: boolean;
}

export interface AIRecommendation {
  type: 'swap' | 'timing' | 'addition' | 'caution';
  originalCompound?: string;
  suggestedCompound: string;
  suggestedDose: string;
  timing: string;
  rationale: string;
  biochemicalMechanism: string;
}

export const INITIAL_COMPOUNDS: Compound[] = [
  {
    id: 'omega3',
    name: 'Omega-3 (EPA / DHA)',
    category: 'Supplement',
    dosage: '2 - 3 g',
    route: 'Oral Liquid',
    timing: '08:30 - Morning Meal',
    halfLifeHours: 48,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#f59e0b',
    overview: 'Purified marine lipid supplement providing concentrated EPA/DHA to modulate inflammatory eicosanoid pathways.',
    mechanism: 'Incorporates into cell membrane phospholipid bilayers, displacing arachidonic acid and downregulating COX-2 / 5-LOX inflammatory cascade synthesis. Enhances endothelial nitric oxide synthase (eNOS) phosphorylation and improves membrane fluidity across cardiomyocytes and cerebrovascular endothelium.',
    absorptionNotes: 'Co-ingest with dietary lipids or emulsified fat vehicles to stimulate cholecystokinin (CCK) and bile acid micellization, multiplying lymphatic absorption 3-fold.',
    takenToday: true,
  },
  {
    id: 'vitd3k2',
    name: 'Vitamin D3 / K2 (MK-7)',
    category: 'Vitamin & Mineral',
    dosage: '5000 IU / 100 mcg',
    route: 'Oral Tincture',
    timing: '08:30 - Morning Meal',
    halfLifeHours: 360,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#38bdf8',
    overview: 'Synergistic fat-soluble vitamins regulating systemic calcium homeostasis, bone mineralization, and cardiovascular health.',
    mechanism: 'Cholecalciferol (D3) undergoes hepatic 25-hydroxylation to calcifediol and renal 1-alpha-hydroxylation to calcitriol, binding nuclear vitamin D receptors (VDR) to upregulate intestinal calcium absorption. Simultaneously, Menaquinone-7 (MK-7) serves as an obligate cofactor for gamma-glutamyl carboxylase, activating osteocalcin for bone matrix mineralization while carboxylating Matrix Gla Protein (MGP) to prevent soft-tissue and vascular ectopic calcification.',
    absorptionNotes: 'Administer alongside dietary lipids to maximize lymphatic chylomicron absorption. Co-ingestion with bioavailable magnesium is recommended.',
    takenToday: false,
  },
  {
    id: 'liposomal_vitc',
    name: 'Liposomal Vitamin C',
    category: 'Vitamin & Mineral',
    dosage: '1000 mg',
    route: 'Oral',
    timing: '08:30 - Morning',
    halfLifeHours: 4,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#f97316',
    overview: 'Lipid-encapsulated ascorbic acid formulation designed to bypass saturable sodium-dependent vitamin C transporters.',
    mechanism: 'Phospholipid bilayer nano-vesicles fuse directly with intestinal enterocyte cell membranes and enter systemic circulation via the thoracic lymphatic duct. This bypasses the saturable intestinal SVCT1 transporter (which caps unbuffered ascorbic acid bioavailability at doses >200mg), yielding 3.5x higher area-under-the-curve (AUC) plasma concentrations without osmotic gastrointestinal distress.',
    absorptionNotes: 'Take on empty stomach or light meal. Avoid hot beverages within 15 minutes to protect lipid vesicle integrity.',
    takenToday: false,
  },
  {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'Supplement',
    dosage: '5 g',
    route: 'Oral',
    timing: '08:00 - Post-Workout',
    halfLifeHours: 3,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#38bdf8',
    overview: 'Skeletal muscle phosphocreatine pool donor accelerating ATP resynthesis and neural stamina.',
    mechanism: 'Transported across sarcolemmal membranes via SLC6A8 (CRT) transporter. Phosphorylated into phosphocreatine by creatine kinase, donating high-energy phosphate groups directly to ADP to rapidly regenerate ATP during cellular energy depletion in skeletal muscle myofibrils and cerebral cortical neurons.',
    absorptionNotes: 'Co-ingestion with 25-30g Whey protein or fast-acting carbohydrate triggers acute post-prandial hyperinsulinemia, upregulating SLC6A8 sarcolemmal translocation.',
    takenToday: true,
  },
  {
    id: 'protein_whey',
    name: 'Protein Powder (Whey / Isolate)',
    category: 'Supplement',
    dosage: '25 - 30 g',
    route: 'Oral Shake',
    timing: '08:00 - Post-Workout',
    halfLifeHours: 2,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#10b981',
    overview: 'High-yield amino acid substrate triggering muscle protein synthesis and post-workout nitrogen retention.',
    mechanism: 'Rapid gastric emptying and peptidolysis delivers a rapid surge of essential amino acids (specifically L-Leucine >2.7g), binding Sestrin2 to activate the Rag GTPase heterodimer, stimulating mTORC1 translocation to the lysosomal membrane and initiating translation initiation factors (4E-BP1, p70S6K).',
    absorptionNotes: 'Ideal within 60 minutes post-resistance training to maximize the post-exercise muscle protein synthetic response.',
    takenToday: true,
  },
  {
    id: 'ubiquinol',
    name: 'Ubiquinol (Active CoQ10)',
    category: 'Supplement',
    dosage: '200 mg',
    route: 'Oral Softgel',
    timing: '08:30 - Morning Meal',
    halfLifeHours: 33,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#ec4899',
    overview: 'Reduced active electron-donor form of CoQ10 targeting mitochondrial electron transport chain complex I/II.',
    mechanism: 'Acts directly in the inner mitochondrial lipid membrane as a mobile lipophilic electron carrier shuttling electrons from Complex I (NADH dehydrogenase) and Complex II (succinate dehydrogenase) to Complex III (cytochrome bc1). Directly neutralizes lipid peroxyl radicals in cellular membranes.',
    absorptionNotes: 'Lipophilic molecule requiring presence of dietary fats or MCTs for mixed micelle solubilization.',
    takenToday: false,
  },
  {
    id: 'magnesium_threonate',
    name: 'Magnesium L-Threonate',
    category: 'Nootropic',
    dosage: '144 mg (Elemental Mg)',
    route: 'Oral',
    timing: '21:30 - Evening',
    halfLifeHours: 12,
    doseDays: ['M', 'T', 'W', 'Th', 'F', 'Sa', 'Su'],
    colorHex: '#8b5cf6',
    overview: 'Highly bioavailable blood-brain barrier permeable magnesium chelate targeting synaptic density and neuroprotection.',
    mechanism: 'L-Threonate chelation utilizes transport pathways capable of efficiently crossing the blood-brain barrier, significantly raising CSF magnesium concentrations. Blocks excessive basal NMDA receptor open-probability while facilitating long-term potentiation (LTP) and upregulating NR2B subunit expression in the hippocampus.',
    absorptionNotes: 'Take 45-60 minutes prior to target sleep latency. Avoid co-ingestion with high-dose phytic acid or calcium supplements.',
    takenToday: false,
  }
];

export const HEALTH_GOALS: HealthGoal[] = [
  {
    id: 'longevity',
    title: 'Longevity & Metabolic Health',
    subtitle: 'Autophagy, AMPK activation, intracellular NAD+ & glucose regulation',
    iconName: 'Sparkles',
    color: '#10b981',
    active: true,
  },
  {
    id: 'mitochondrial',
    title: 'Mitochondrial Repair',
    subtitle: 'ATP resynthesis, electron transport, ROS scavenging & biogenesis',
    iconName: 'Zap',
    color: '#f59e0b',
    active: true,
  },
  {
    id: 'neuroprotection',
    title: 'Focus & Neuroprotection',
    subtitle: 'BDNF expression, acetylcholine, synaptic plasticity & executive focus',
    iconName: 'Brain',
    color: '#38bdf8',
    active: true,
  },
  {
    id: 'recovery',
    title: 'Recovery & Joint Support',
    subtitle: 'Collagen synthesis, angiogenesis, tendon remodeling & gut lining',
    iconName: 'Dumbbell',
    color: '#6366f1',
    active: true,
  },
  {
    id: 'hormonal',
    title: 'Hormonal Balance & Vitality',
    subtitle: 'Endogenous GH release, androgen receptor density & HPTA recovery',
    iconName: 'Flame',
    color: '#ec4899',
    active: true,
  },
  {
    id: 'cardiovascular',
    title: 'Cardiovascular & Lipid Control',
    subtitle: 'Nitric oxide synthesis, lipid particle clearance & endothelial repair',
    iconName: 'HeartPulse',
    color: '#ef4444',
    active: true,
  }
];

export const PRESET_LIBRARY = [
  { name: 'NMN (Nicotinamide Mononucleotide)', category: 'Longevity', defaultDose: '500 mg', route: 'Sublingual', halfLife: 1.5, notes: 'Direct NAD+ intermediate elevating sirtuin (SIRT1/SIRT3) activity.' },
  { name: 'Berberine HCl', category: 'Supplement', defaultDose: '500 mg', route: 'Oral', halfLife: 3.5, notes: 'Potent AMPK activator regulating GLUT4 translocation and lipid metabolism.' },
  { name: 'Ashwagandha (KSM-66)', category: 'Nootropic', defaultDose: '600 mg', route: 'Oral', halfLife: 6.0, notes: 'Withanolide-rich adaptogen modulating HPA axis and systemic cortisol.' },
  { name: 'L-Theanine', category: 'Nootropic', defaultDose: '200 mg', route: 'Oral', halfLife: 3.0, notes: 'Crosses blood-brain barrier, elevates alpha wave activity and GABA.' },
  { name: 'Alpha-GPC', category: 'Nootropic', defaultDose: '300 mg', route: 'Oral', halfLife: 4.5, notes: 'High-yield choline donor driving acetylcholine neurotransmission.' },
  { name: 'Sulforaphane (Broccoli Sprout Extract)', category: 'Longevity', defaultDose: '20 mg', route: 'Oral', halfLife: 2.2, notes: 'Keap1 inhibitor and master Nrf2 phase II antioxidant pathway activator.' },
  { name: 'Apigenin', category: 'Longevity', defaultDose: '50 mg', route: 'Oral', halfLife: 12.0, notes: 'Natural CD38 inhibitor preserving intracellular NAD+ and supporting sleep architecture.' },
  { name: 'Glycine', category: 'Amino Acid', defaultDose: '3 - 5 g', route: 'Oral Powder', halfLife: 1.0, notes: 'Inhibitory neurotransmitter promoting core body temperature reduction for deep sleep.' },
  { name: 'L-Glutamine', category: 'Amino Acid', defaultDose: '5 g', route: 'Oral Powder', halfLife: 1.2, notes: 'Primary fuel source for enterocytes, restoring intestinal tight junction integrity.' },
  { name: 'Zinc Picolinate', category: 'Vitamin & Mineral', defaultDose: '15 - 25 mg', route: 'Oral', halfLife: 14.0, notes: 'Essential cofactor for >300 metalloenzymes and testosterone synthesis.' },
  { name: 'Resveratrol (Trans-Resveratrol)', category: 'Longevity', defaultDose: '500 mg', route: 'Oral with Fat', halfLife: 9.0, notes: 'Stilbenoid compound with SIRT1 allosteric activation potential.' },
  { name: 'CoQ10 (Ubiquinone)', category: 'Supplement', defaultDose: '100 - 200 mg', route: 'Oral', halfLife: 33.0, notes: 'Mitochondrial redox carrier.' },
  { name: 'Taurine', category: 'Amino Acid', defaultDose: '1 - 3 g', route: 'Oral', halfLife: 1.5, notes: 'Osmoregulator, bile acid conjugator, and cardiac muscle calcium modulator.' },
  { name: 'Lion\'s Mane Mushroom (Hericium erinaceus)', category: 'Nootropic', defaultDose: '1000 mg', route: 'Oral', halfLife: 5.0, notes: 'Hericenones and erinacines stimulating Nerve Growth Factor (NGF) synthesis.' },
  { name: 'Creatine Monohydrate', category: 'Supplement', defaultDose: '5 g', route: 'Oral', halfLife: 3.0, notes: 'Skeletal muscle phosphocreatine pool donor.' },
  { name: 'Omega-3 (EPA/DHA)', category: 'Supplement', defaultDose: '2000 mg', route: 'Oral', halfLife: 48.0, notes: 'Anti-inflammatory marine lipid.' },
  { name: 'Vitamin D3/K2', category: 'Vitamin & Mineral', defaultDose: '5000 IU', route: 'Oral', halfLife: 360.0, notes: 'Calcium homeostasis and arterial elasticity.' },
  { name: 'B-Complex Active (Methylated)', category: 'Vitamin & Mineral', defaultDose: '1 Capsule', route: 'Oral', halfLife: 8.0, notes: 'Methylfolate (5-MTHF) and Methylcobalamin supporting 1-carbon methylation cycle.' },
];
