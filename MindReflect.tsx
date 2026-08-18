import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const AREAS = [
  'PHYSICAL', 'PSYCHOLOGICAL', 'EMOTIONAL', 
  'SOCIAL', 'PROFESSIONAL', 'SPIRITUAL',
  'FINANCIAL', 'RECREATIONAL', 'ROMANTIC',
  'PHYSICAL ENVIRONMENT'
];

const BELIEFS = [
  'I don’t have enough time',
  'I don’t have what it takes',
  'I don’t have the connections',
  'I don’t have the ability',
  'I don’t have the resources',
  'I don’t have the energy',
  'I feel stuck',
  'I deserve the life I’ve got'
];

const QUESTIONS = [
  'What is my purpose?',
  'What direction should I take in life?',
  'What is holding me back?',
  'What can I do to make more?'
];

export default function MindReflect() {
  const [phase, setPhase] = useState<1 | 2 | 3 | 4>(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedBeliefs, setSelectedBeliefs] = useState<string[]>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);

  const toggleArea = (area: string) => {
    setSelectedAreas(prev => 
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const toggleBelief = (belief: string) => {
    setSelectedBeliefs(prev => 
      prev.includes(belief) ? prev.filter(b => b !== belief) : [...prev, belief]
    );
  };

  const toggleQuestion = (question: string) => {
    setSelectedQuestions(prev => 
      prev.includes(question) ? prev.filter(q => q !== question) : [...prev, question]
    );
  };

  return (
    <div className="flex flex-col px-6 py-8 pb-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-[#FF8C42] text-xs font-bold tracking-widest uppercase mb-3">
          GUIDED SELF-REFLECTION
        </h2>
        <div className="flex items-center justify-between">
          <span className="text-[#D88A53] text-[10px] font-mono tracking-widest uppercase">
            PHASE 0{phase}
          </span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step} 
                className={`h-1 rounded-full transition-all duration-300 ${
                  step === phase 
                    ? 'w-6 bg-[#D88A53]' 
                    : step < phase
                    ? 'w-2 bg-[#8C461C]'
                    : 'w-2 bg-[#3A2D25]'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* PHASE 1: Open Ended */}
        {phase === 1 && (
          <motion.div
            key="phase1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg">
              <label className="block text-[#E5D5C5] text-sm font-medium mb-3">
                What is important to me?
              </label>
              <textarea 
                className="w-full bg-[#120F0D] border border-[#2D231C] rounded-xl p-4 text-[#A89F95] text-sm focus:outline-none focus:border-[#FF8C42]/50 focus:ring-1 focus:ring-[#FF8C42]/50 transition-all resize-none min-h-[100px]"
                placeholder="Enter your thoughts..."
              />
            </div>

            <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg">
              <label className="block text-[#E5D5C5] text-sm font-medium mb-3">
                What do I want to experience in life?
              </label>
              <textarea 
                className="w-full bg-[#120F0D] border border-[#2D231C] rounded-xl p-4 text-[#A89F95] text-sm focus:outline-none focus:border-[#FF8C42]/50 focus:ring-1 focus:ring-[#FF8C42]/50 transition-all resize-none min-h-[100px]"
                placeholder="Enter your thoughts..."
              />
            </div>

            <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg">
              <label className="block text-[#E5D5C5] text-sm font-medium mb-3">
                How do I want to show up in the world?
              </label>
              <textarea 
                className="w-full bg-[#120F0D] border border-[#2D231C] rounded-xl p-4 text-[#A89F95] text-sm focus:outline-none focus:border-[#FF8C42]/50 focus:ring-1 focus:ring-[#FF8C42]/50 transition-all resize-none min-h-[100px]"
                placeholder="Enter your thoughts..."
              />
            </div>

            <div className="flex justify-end pt-4">
              <button 
                onClick={() => setPhase(2)}
                className="px-6 py-3 border border-[#D88A53]/30 text-[#E5D5C5] text-xs font-bold tracking-wider rounded-xl hover:bg-[#D88A53]/10 transition-colors"
              >
                NEXT PHASE
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 2: Areas */}
        {phase === 2 && (
          <motion.div
            key="phase2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <p className="text-[#E5D5C5] text-sm">Select areas you want to improve:</p>
            
            <div className="flex flex-wrap gap-3">
              {AREAS.map(area => {
                const isSelected = selectedAreas.includes(area);
                return (
                  <button
                    key={area}
                    onClick={() => toggleArea(area)}
                    className={`px-5 py-3 rounded-full text-xs font-bold tracking-wider transition-all border ${
                      isSelected 
                        ? 'bg-[#2D231C] border-[#FF8C42]/40 text-[#FF8C42] shadow-[0_0_15px_rgba(255,140,66,0.15)]' 
                        : 'bg-[#1A1512]/40 border-[#2D231C] text-[#A89F95] hover:border-[#4A3B31]'
                    }`}
                  >
                    {area}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-8 border-t border-[#2D231C]/50">
              <button 
                onClick={() => setPhase(1)}
                className="px-6 py-3 text-[#A89F95] text-xs font-bold tracking-wider hover:text-[#E5D5C5] transition-colors"
              >
                BACK
              </button>
              <button 
                onClick={() => setPhase(3)}
                className="px-6 py-3 border border-[#D88A53] text-[#E5D5C5] text-xs font-bold tracking-wider rounded-xl hover:bg-[#D88A53]/10 transition-colors"
              >
                NEXT PHASE
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 3: Limiting Beliefs */}
        {phase === 3 && (
          <motion.div
            key="phase3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <p className="text-[#E5D5C5] text-sm">Select the limiting beliefs you resonate with:</p>
            
            <div className="space-y-3">
              {BELIEFS.map(belief => {
                const isSelected = selectedBeliefs.includes(belief);
                return (
                  <button
                    key={belief}
                    onClick={() => toggleBelief(belief)}
                    className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all border ${
                      isSelected 
                        ? 'bg-[#1E1A17] border-[#FF8C42]/30 text-[#FF8C42]' 
                        : 'bg-[#1A1512]/60 border-[#2D231C] text-[#A89F95] hover:bg-[#221C18]'
                    }`}
                  >
                    {belief}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#2D231C]/50">
              <button 
                onClick={() => setPhase(2)}
                className="px-6 py-3 text-[#A89F95] text-xs font-bold tracking-wider hover:text-[#E5D5C5] transition-colors"
              >
                BACK
              </button>
              <button 
                onClick={() => setPhase(4)}
                className="px-6 py-3 border border-[#D88A53] text-[#E5D5C5] text-xs font-bold tracking-wider rounded-xl hover:bg-[#D88A53]/10 transition-colors"
              >
                NEXT PHASE
              </button>
            </div>
          </motion.div>
        )}

        {/* PHASE 4: Questions */}
        {phase === 4 && (
          <motion.div
            key="phase4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <p className="text-[#E5D5C5] text-sm">Which unanswered questions are on your mind?</p>
            
            <div className="space-y-3">
              {QUESTIONS.map(question => {
                const isSelected = selectedQuestions.includes(question);
                return (
                  <button
                    key={question}
                    onClick={() => toggleQuestion(question)}
                    className={`w-full text-left px-5 py-4 rounded-xl text-sm transition-all border ${
                      isSelected 
                        ? 'bg-[#1E1A17] border-[#FF8C42]/30 text-[#FF8C42]' 
                        : 'bg-[#1A1512]/60 border-[#2D231C] text-[#A89F95] hover:bg-[#221C18]'
                    }`}
                  >
                    {question}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between items-center pt-6 border-t border-[#2D231C]/50">
              <button 
                onClick={() => setPhase(3)}
                className="px-6 py-3 text-[#A89F95] text-xs font-bold tracking-wider hover:text-[#E5D5C5] transition-colors"
              >
                BACK
              </button>
              <button 
                onClick={() => setPhase(1)}
                className="px-6 py-3 bg-[#FF8C42]/10 border border-[#FF8C42] text-[#FF8C42] shadow-[0_0_15px_rgba(255,140,66,0.15)] text-xs font-bold tracking-wider rounded-xl hover:bg-[#FF8C42] hover:text-black transition-colors"
              >
                GENERATE SET
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
