import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Bot,
  FileCheck2,
  BookOpen,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Activity,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

interface BioStackOverviewProps {
  onSelectTab: (tab: 'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule') => void;
}

export default function BioStackOverview({ onSelectTab }: BioStackOverviewProps) {
  const features = [
    {
      id: 'pk',
      icon: TrendingUp,
      badge: 'Dynamic Modeling',
      title: '7-Day Pharmacokinetic Accumulation',
      desc: 'Simulate steady-state serum curves, peak accumulation spikes, and trough baselines based on compound elimination half-lives and oral absorption constants.',
      tab: 'pk' as const,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
    },
    {
      id: 'ai',
      icon: Bot,
      badge: 'Gemini Pharmacology',
      title: 'BioStack AI Consultant',
      desc: 'Understands enterocyte transport, micellar solubilization, transporter saturation (e.g. SVCT1 vs liposomal), and sarcolemmal CRT insulin synergy to generate precision stack swaps.',
      tab: 'ai' as const,
      color: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30 text-cyan-400',
    },
    {
      id: 'clinical',
      icon: FileCheck2,
      badge: 'Clinical Compliance',
      title: 'Physician Protocol Reports',
      desc: 'One-click generate structured medical disclosures formatted for primary care physicians, sports cardiologists, and endocrinologists with PDF print readiness.',
      tab: 'clinical' as const,
      color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-teal-400',
    },
    {
      id: 'library',
      icon: BookOpen,
      badge: '170+ Compounds & OCR',
      title: 'Reference Library & Label Scanner',
      desc: 'Browse curated supplements, peptides, nootropics, and longevity agents with verified half-lives, or snap a bottle photo with AI vision OCR to auto-fill kinetics.',
      tab: 'library' as const,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
    },
  ];

  const pillars = [
    {
      title: 'Eliminate Transporter Saturation',
      desc: 'Prevent gastrointestinal waste and osmotic distress by timing dosages below saturation thresholds and swapping to lipid-encapsulated formulations.',
      stat: '3.5x',
      statLabel: 'Bioavailability AUC Increase',
    },
    {
      title: 'Steady-State Trough Optimization',
      desc: 'Maintain therapeutic compound plasma concentrations within optimal target windows without toxic peak surges or sub-therapeutic troughs.',
      stat: '98.4%',
      statLabel: 'Steady-State Precision',
    },
    {
      title: 'Enzymatic Cofactor Interdependence',
      desc: 'Automatically pair fat-soluble compounds with lipid vehicles and obligate mineral cofactors (e.g. Magnesium for Vitamin D 25-hydroxylase kinetics).',
      stat: '100%',
      statLabel: 'Biochemical Coherence',
    },
  ];

  return (
    <div className="w-full space-y-12 text-slate-100">
      {/* Hero Showcase Banner */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#0c1424] via-[#090f1a] to-[#0a1120] border border-[#1e2f4a] p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl">
        {/* Background ambient lighting */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Engineered to optimize the body</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-tight leading-[1.1]">
            PROTOCOL OPTIMIZATION & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
              PHARMACOKINETICS RESEARCH ENGINE.
            </span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl">
            Streamlining biological modeling, research aggregation, and compound stack tracking into a single high-precision dashboard. Model serum accumulation half-lives, prevent transporter competition, optimize enterocyte absorption windows, and generate physician-ready clinical disclosures.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onSelectTab('pk')}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] flex items-center gap-2 transition-all"
            >
              <span>Explore Interactive PK Simulator</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              to="/preview/biostack"
              className="px-6 py-3 rounded-full bg-[#131f33] hover:bg-[#1a2b47] border border-[#273d61] text-cyan-300 font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Launch Live BioStack Web App</span>
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Interactive Feature Highlights */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-2">
            Platform Capabilities
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
            Engineered for Precision Human Performance
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, idx) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              onClick={() => onSelectTab(feat.tab)}
              className="p-6 sm:p-7 rounded-2xl bg-[#0e1626] border border-[#1e2f4a] hover:border-cyan-500/50 hover:bg-[#121c2e] transition-all cursor-pointer group flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center`}>
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded bg-[#162338] text-slate-300 border border-[#233857]">
                    {feat.badge}
                  </span>
                </div>

                <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2 group-hover:text-cyan-300 transition-colors">
                  {feat.title}
                </h4>

                <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                  {feat.desc}
                </p>
              </div>

              <div className="flex items-center text-xs font-mono font-bold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Test Live Interactive Demo</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Pharmacokinetics Pillars & Clinical Metrics */}
      <div className="rounded-2xl bg-[#0a101c] border border-[#19263c] p-6 sm:p-8 md:p-10 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1c2c45] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <Zap className="w-4 h-4" />
              <span>Scientific Rigor & Mechanism</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white uppercase">
              The Science of Pharmacokinetic Optimization
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Clinically Referenced Standards</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((p, idx) => (
            <div key={idx} className="p-5 rounded-xl bg-[#0e1626] border border-[#1e2f4a] space-y-3">
              <div className="text-2xl sm:text-3xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {p.stat}
              </div>
              <div className="text-[11px] font-mono text-cyan-300 uppercase tracking-wider">
                {p.statLabel}
              </div>
              <h4 className="text-sm font-bold text-white uppercase">
                {p.title}
              </h4>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Target User Personas */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 block mb-1">
            Who BioStack Is Built For
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
            From Individual Biohackers to Clinical Practices
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-xl bg-[#0d1524] border border-[#1d2d47] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white uppercase text-sm">Self-Optimizers & Biohackers</h4>
            <p className="text-slate-400 font-light leading-relaxed">
              Design complex multi-compound regimens, verify half-lives, and avoid accidental receptor antagonism or nutrient competition.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d1524] border border-[#1d2d47] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white uppercase text-sm">Longevity & Functional MDs</h4>
            <p className="text-slate-400 font-light leading-relaxed">
              Generate auditable, compliant supplement disclosures for patient charts, mitigating acute drug-supplement interactions.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d1524] border border-[#1d2d47] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-3">
              <Award className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white uppercase text-sm">Elite Athletes & Coaches</h4>
            <p className="text-slate-400 font-light leading-relaxed">
              Synchronize post-workout creatine and leucine-rich proteins with metabolic insulin windows for maximal phosphocreatine loading.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#0d1524] border border-[#1d2d47] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="font-bold text-white uppercase text-sm">Nootropic & Cognitive Researchers</h4>
            <p className="text-slate-400 font-light leading-relaxed">
              Stagger choline donors, L-Theanine, and racetam/adaptogen compounds across blood-brain barrier transport channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
