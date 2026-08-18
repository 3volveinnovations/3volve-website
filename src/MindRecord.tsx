import { useState } from 'react';
import { Mic, Check } from 'lucide-react';

const AFFIRMATIONS = [
  "I am the master of my time and energy, directing them toward my highest priorities with ease.",
  "I am constantly attracting the right resources, connections, and opportunities into my life.",
  "I am clear in my vision, effortlessly taking simple and powerful steps forward every day.",
  "I am resilient, capable, and fully equipped to turn any challenge into an opportunity for growth."
];

export default function MindRecord() {
  const [checkedItems, setCheckedItems] = useState<number[]>([0, 1, 2, 3]);

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="flex flex-col px-6 py-8 pb-8">
      <div className="mb-6">
        <h2 className="text-[#FF8C42] text-xs font-bold tracking-widest uppercase">
          VOICE AFFIRMATIONS
        </h2>
      </div>

      <div className="space-y-4">
        {AFFIRMATIONS.map((text, idx) => {
          const isChecked = checkedItems.includes(idx);
          return (
            <div 
              key={idx} 
              className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg flex flex-col gap-4"
            >
              <div className="flex items-start gap-3">
                <button 
                  onClick={() => toggleCheck(idx)}
                  className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded flex items-center justify-center transition-colors ${
                    isChecked 
                      ? 'bg-[#E2955A] text-black' 
                      : 'bg-[#120F0D] border border-[#3A2D25]'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </button>
                <p className="text-[#E5D5C5] text-sm leading-relaxed font-medium">
                  {text}
                </p>
              </div>

              <div className="pl-8 flex items-center gap-4">
                <button className="w-9 h-9 rounded-full bg-[#2A1512] border border-[#4A201A] flex items-center justify-center text-[#FF5A1F] hover:bg-[#3A1D1A] transition-colors">
                  <Mic className="w-4 h-4" />
                </button>
                {/* Simulated wave or just empty space */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
