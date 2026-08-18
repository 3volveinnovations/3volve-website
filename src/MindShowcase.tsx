import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ListChecks,
  Mic,
  SlidersHorizontal,
} from 'lucide-react';
import MindReflect from './MindReflect';
import MindRecord from './MindRecord';
import MindMixer from './MindMixer';
import mindBg from '../../assets/images/image.png';

interface MindShowcaseProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: 'reflect' | 'record' | 'mixer';
}

export default function MindShowcase({
  isOpen,
  onClose,
  initialTab = 'reflect',
}: MindShowcaseProps) {
  const [activeTab, setActiveTab] = useState<'reflect' | 'record' | 'mixer'>(initialTab);

  if (!isOpen) return null;

  const navItems = [
    { id: 'reflect', label: 'REFLECT', icon: ListChecks },
    { id: 'record', label: 'RECORD', icon: Mic },
    { id: 'mixer', label: 'MIXER', icon: SlidersHorizontal },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col text-[#F0E6D2] font-sans selection:bg-[#FF5A1F]/30">
      
      {/* Background Graphic (abstract wireframe like in screenshots) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `url(${mindBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'screen'
        }}
      />
      <div className="fixed inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#18110D]/80 via-[#0A0A0A]/90 to-[#050505]/95" />

      {/* Main Container constrained to mobile app dimensions for the demo look */}
      <div className="relative z-10 flex flex-col w-full max-w-md mx-auto my-auto min-h-screen sm:min-h-[850px] sm:max-h-[90vh] bg-[#120F0D]/80 sm:border border-[#3A2D25] sm:rounded-2xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* App Header */}
        <header className="flex items-center justify-between px-6 py-5 bg-gradient-to-b from-[#1E1611] to-transparent border-b border-[#3A2D25]/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#E2955A] to-[#8C461C] shadow-[0_0_15px_rgba(226,149,90,0.3)]" />
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-light tracking-[0.2em] text-[#E5D5C5]">
                3VOLVE MIND
              </span>
              <span className="text-xs font-mono text-[#D88A53] tracking-widest">
                V1.0
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close 3volve Mind demo"
            className="p-1.5 rounded-full bg-[#2A1F18] hover:bg-[#3A2D25] text-[#A89F95] hover:text-[#E5D5C5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        {/* Dynamic Main Content */}
        <main className="flex-grow overflow-y-auto scrollbar-none relative z-10">
          <AnimatePresence mode="wait">
            {activeTab === 'reflect' && (
              <motion.div
                key="reflect"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MindReflect />
              </motion.div>
            )}
            {activeTab === 'record' && (
              <motion.div
                key="record"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MindRecord />
              </motion.div>
            )}
            {activeTab === 'mixer' && (
              <motion.div
                key="mixer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <MindMixer />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="flex justify-around items-center px-6 py-4 bg-[#0A0A0A]/90 border-t border-[#3A2D25] backdrop-blur-xl z-20">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as typeof activeTab)}
                className={`flex flex-col items-center gap-1.5 transition-all duration-300 ${
                  isActive ? 'text-[#FF8C42]' : 'text-[#6B5D55] hover:text-[#A89F95]'
                }`}
              >
                <item.icon className="w-6 h-6" strokeWidth={isActive ? 2 : 1.5} />
                <span className="text-[10px] font-bold tracking-widest uppercase">
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
