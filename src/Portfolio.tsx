import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Network, Activity, Cpu, Layers } from 'lucide-react';
import biostackImg from '../assets/images/1786849589167.png';
import mindImg from '../assets/images/image.png';
import labsImg from '../assets/images/labs_graphic_1786752989318.jpg';

const projects = [
  {
    id: 'biostack',
    title: 'BIOSTACK',
    subtitle: 'Protocol Optimization & Pharmacokinetics Research Engine',
    description: 'Streamlining biological modeling, research aggregation, and compound stack tracking into a single high-precision dashboard.',
    hook: 'Engineered to optimize the body.',
    subdomain: 'biostack.3volveinnovations.com',
    icon: Network,
    image: biostackImg,
    badgeColor: 'border-cyan-500/30 text-cyan-300 bg-cyan-950/50',
  },
  {
    id: 'mind',
    title: '3VOLVE MIND',
    subtitle: 'Subconscious Optimization & Frequency Engine',
    description: 'Leveraging prime hypnagogic and hypnopompic theta windows with targeted auditory frequencies to rewire subconscious neural patterns.',
    hook: 'Engineered to reprogram reality.',
    subdomain: 'mind.3volveinnovations.com',
    icon: Activity,
    image: mindImg,
    badgeColor: 'border-[#FF5A1F]/30 text-[#FF5A1F] bg-orange-950/50',
  },
  {
    id: 'labs',
    title: 'FUTURE LABS',
    subtitle: 'Next-Gen Execution & Analytical Utilities',
    description: 'Incubating specialized systems, pattern-recognition journals, and high-leverage tools designed for peak edge and execution.',
    hook: 'Engineered to innovate the future.',
    subdomain: 'labs.3volveinnovations.com',
    icon: Cpu,
    image: labsImg,
    badgeColor: 'border-red-500/30 text-red-300 bg-red-950/50',
  }
];

interface PortfolioProps {
  onOpenBioStack?: (tab?: 'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule') => void;
  onOpenMind?: (tab?: 'reflect' | 'record' | 'mixer') => void;
}

export default function Portfolio({ onOpenBioStack, onOpenMind }: PortfolioProps) {
  const navigate = useNavigate();

  const handleCardAction = (projectId: string, subdomain: string) => {
    if (projectId === 'biostack' && onOpenBioStack) {
      onOpenBioStack('overview');
    } else if (projectId === 'mind' && onOpenMind) {
      onOpenMind('reflect');
    } else if (projectId === 'labs') {
      navigate('/labs');
    } else {
      window.open(`https://${subdomain}`, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="portfolio" className="w-full py-10 sm:py-14 md:py-20 px-6 sm:px-8 md:px-12 2xl:px-16 scroll-mt-16 sm:scroll-mt-20">
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14 md:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest mb-4">
          <Layers className="w-3.5 h-3.5" />
          <span>Portfolio & Ecosystem</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">
          A DIVERSE ECOSYSTEM OF <br className="hidden sm:block" />
          <span className="text-[#FF5A1F]">HIGH-PRECISION ENGINES</span>
        </h2>
      </div>

      {/* Fluid Responsive Grid: 1 col on mobile (<768px), 2 cols on tablet (md), 3 cols on wide screens (xl) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8 2xl:gap-10 w-full">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            id={`portfolio-card-${project.id}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col w-full bg-[#131B2A]/80 backdrop-blur-sm border border-[#2c3545] rounded-2xl overflow-hidden p-4 sm:p-5 md:p-6 lg:p-7 group hover:border-[#FF5A1F]/50 hover:-translate-y-2 hover:shadow-[0_15px_40px_rgba(255,90,31,0.15)] transition-all duration-500 shadow-xl cursor-pointer"
            onClick={() => handleCardAction(project.id, project.subdomain)}
          >
            {/* The Image Area - 1:1 Square Aspect Ratio so all card posters fit at 1:1 */}
            <div className="aspect-square w-full rounded-xl relative flex items-center justify-center overflow-hidden mb-4 sm:mb-6 bg-[#0B0F17]">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              
              {/* Corner Icon */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[#131B2A]/80 border border-[#2c3545] flex items-center justify-center backdrop-blur-md">
                <project.icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
              </div>

              {project.id === 'biostack' && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/50 text-cyan-300 text-[10px] font-mono font-bold tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Interactive Engine</span>
                </div>
              )}
              {project.id === 'mind' && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-orange-950/80 border border-[#FF5A1F]/50 text-[#FF5A1F] text-[10px] font-mono font-bold tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
                  <span>Interactive Demo</span>
                </div>
              )}
              {project.id === 'labs' && (
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full bg-red-950/80 border border-red-500/50 text-red-400 text-[10px] font-mono font-bold tracking-wider backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  <span>R&D Incubator</span>
                </div>
              )}
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow px-1">
              <div className="flex items-center gap-2 mb-2.5 opacity-75">
                <div className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
                <button 
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.id === 'labs') {
                      navigate('/labs');
                    } else {
                      navigate(`/preview/${project.id}`);
                    }
                  }}
                  className="text-[10px] sm:text-xs font-mono text-slate-300 hover:text-white hover:underline tracking-wider"
                >
                  {project.subdomain}
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wide mb-1">
                {project.title}
              </h3>

              <div className="text-xs sm:text-sm font-medium text-slate-300 mb-3 tracking-normal">
                {project.subtitle}
              </div>

              <p className="text-slate-300 font-light text-xs sm:text-sm leading-relaxed mb-4 flex-grow">
                {project.description}
              </p>

              {/* Punchy Brand Hook Badge */}
              <div className={`text-[11px] font-mono font-semibold tracking-wider uppercase mb-5 px-3 py-2 rounded-lg border text-center ${project.badgeColor}`}>
                {project.hook}
              </div>

              {/* Button */}
              <div className="flex justify-center mt-auto">
                <button
                  id={`explore-btn-${project.id}`}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCardAction(project.id, project.subdomain);
                  }}
                  className={`inline-flex items-center justify-center px-6 py-3 sm:py-3.5 border rounded-full transition-all duration-300 font-medium text-xs sm:text-sm tracking-wider uppercase w-full ${
                    project.id === 'biostack'
                      ? 'border-cyan-500 text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500 hover:text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                      : project.id === 'mind'
                      ? 'border-[#FF5A1F] text-[#FF5A1F] bg-[#FF5A1F]/10 hover:bg-[#FF5A1F] hover:text-slate-950 shadow-[0_0_15px_rgba(255,90,31,0.25)]'
                      : 'border-red-500 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-slate-950 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                  }`}
                >
                  <span>EXPLORE {project.title}</span>
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

