import { motion } from 'motion/react';
import { Zap, Cpu, RefreshCw, ShieldCheck, Quote, Compass } from 'lucide-react';

export default function About() {
  const pillars = [
    {
      icon: Zap,
      title: 'RELENTLESS EFFICIENCY',
      desc: 'Pinpointing operational bottlenecks and everyday friction points, engineering clean, high-leverage solutions that make complex execution seamless.',
    },
    {
      icon: Cpu,
      title: 'PURPOSEFUL INNOVATION',
      desc: 'Rapidly architecting specialized software engines and high-utility systems that challenge existing limitations and solve real-world problems.',
    },
    {
      icon: RefreshCw,
      title: 'CONTINUOUS EVOLUTION',
      desc: 'Operating on iterative design and compounding refinement, our technologies actively adapt, advance, and scale alongside the user.',
    },
  ];

  return (
    <section id="about" className="w-full py-12 sm:py-16 md:py-24 px-6 sm:px-8 md:px-12 2xl:px-16 border-t border-[#2c3545]/40 relative scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest mb-4">
            <Compass className="w-3.5 h-3.5" />
            <span>About 3volve Innovations</span>
          </div>

          {/* Operating Standard Quote */}
          <div className="relative max-w-4xl mx-auto mb-6 px-4">
            <Quote className="w-8 h-8 text-[#FF5A1F]/30 mx-auto mb-2 rotate-180" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-tight">
              &ldquo;Evolution is not a single product—<br className="hidden sm:block" />
              <span className="text-[#FF5A1F]">it is an operating standard.</span>&rdquo;
            </h2>
          </div>

          {/* About Body Copy */}
          <p className="text-slate-300 text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl font-light leading-relaxed">
            We identify complex operational, cognitive, and biological challenges and engineer dedicated, high-precision engines to solve them—giving ambitious individuals maximum leverage over their biology, mind, and execution.
          </p>
        </div>

        {/* The Three Pillars Section Title */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="text-xs font-bold uppercase tracking-widest text-[#FF5A1F] mb-1">
            Core Foundations
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white uppercase tracking-wide">
            THE THREE PILLARS
          </h3>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {pillars.map((pillar, idx) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl bg-[#131B2A]/80 backdrop-blur-sm border border-[#2c3545] flex flex-col hover:border-[#FF5A1F]/40 hover:-translate-y-1.5 hover:shadow-[0_15px_30px_rgba(255,90,31,0.1)] transition-all duration-500"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] mb-5">
                <pillar.icon className="w-6 h-6" />
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white uppercase tracking-wide mb-2.5">
                {pillar.title}
              </h4>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light">
                {pillar.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust & Principle Banner */}
        <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#131B2A]/80 via-[#101826]/80 to-[#131B2A]/80 backdrop-blur-sm border border-[#2c3545] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#FF5A1F]" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm sm:text-base uppercase tracking-wider">
                High-Precision Engineering Standards
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm font-light">
                Operating on iterative design and compounding refinement to deliver maximum leverage.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FF5A1F] hover:text-white transition-all text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
          >
            Partner With Us
          </a>
        </div>
      </div>
    </section>
  );
}

