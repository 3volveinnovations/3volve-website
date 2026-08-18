import { useState } from 'react';
import { Moon } from 'lucide-react';

export default function MindMixer() {
  const [binauralEnabled, setBinauralEnabled] = useState(true);
  const [ambientEnabled, setAmbientEnabled] = useState(true);
  const [affirmationsEnabled, setAffirmationsEnabled] = useState(true);

  const [binauralVolume, setBinauralVolume] = useState(50);
  const [ambientVolume, setAmbientVolume] = useState(30);
  const [affirmationsVolume, setAffirmationsVolume] = useState(70);

  const [centerTone, setCenterTone] = useState(432);
  const [ambientType, setAmbientType] = useState('BROWN');

  return (
    <div className="flex flex-col px-6 py-8 pb-8">
      <div className="flex flex-col items-center mb-8">
        <Moon className="w-8 h-8 text-[#D88A53] mb-3 stroke-[1.5]" />
        <h2 className="text-xl font-light text-[#E5D5C5] mb-1 tracking-wide">
          Sleep Cycle Config
        </h2>
        <p className="text-[#8C461C] text-[10px] font-bold tracking-widest uppercase">
          Map frequencies to your brainwaves
        </p>
      </div>

      <div className="space-y-6">
        {/* Binaural Beats */}
        <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[#E5D5C5] text-sm font-medium">Binaural Beats</h3>
              <p className="text-[#D88A53] text-[10px] font-mono tracking-wider mt-1">
                {centerTone}Hz Base • 6BPS Difference
              </p>
            </div>
            <button 
              onClick={() => setBinauralEnabled(!binauralEnabled)}
              className={`w-11 h-6 rounded-full p-1 flex transition-colors ${
                binauralEnabled ? 'bg-[#E5D5C5] justify-end' : 'bg-[#3A2D25] justify-start'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${binauralEnabled ? 'bg-[#120F0D]' : 'bg-[#8C461C]'}`} />
            </button>
          </div>
          
          <div className="relative w-full h-1 bg-[#120F0D] rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-[#E5D5C5] rounded-full" 
              style={{ width: `${binauralVolume}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E5D5C5] rounded-full shadow"
              style={{ left: `calc(${binauralVolume}% - 6px)` }}
            />
          </div>
        </div>

        {/* Brainwave State */}
        <div>
          <h3 className="text-[#8C461C] text-[10px] font-bold tracking-widest uppercase mb-3 ml-1">
            BRAINWAVE STATE (BPS)
          </h3>
          <div className="h-20 bg-[#1A1512]/60 border border-[#2D231C] rounded-xl relative overflow-hidden flex items-center shadow-inner">
            {/* Fake sine wave using SVG */}
            <svg viewBox="0 0 400 100" className="w-full h-full opacity-60 preserve-3d" preserveAspectRatio="none">
              <path 
                d="M 0 50 Q 25 0 50 50 T 100 50 T 150 50 T 200 50 T 250 50 T 300 50 T 350 50 T 400 50" 
                fill="none" 
                stroke="#D88A53" 
                strokeWidth="4"
              />
            </svg>
            
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#120F0D]/80" />
            
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <span className="text-xl font-bold text-white tracking-wide">6.0 Hz </span>
              <span className="text-[#D88A53] text-xs font-bold tracking-widest">THETA</span>
            </div>

            {/* Slider track indicator */}
            <div className="absolute left-[30%] top-0 bottom-0 w-px bg-white/50" />
            <div className="absolute left-[30%] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] -translate-x-[5px]" />
          </div>
        </div>

        {/* Center Tone */}
        <div>
          <h3 className="text-[#8C461C] text-[10px] font-bold tracking-widest uppercase mb-3 ml-1">
            CENTER TONE (BASE FREQ)
          </h3>
          <div className="flex gap-2">
            {[108, 216, 432].map(freq => (
              <button
                key={freq}
                onClick={() => setCenterTone(freq)}
                className={`flex-1 py-3 rounded-xl border text-xs font-bold tracking-wider transition-all ${
                  centerTone === freq
                    ? 'bg-[#8C461C]/20 border-[#8C461C] text-[#E5D5C5]'
                    : 'bg-[#1A1512]/40 border-[#2D231C] text-[#6B5D55] hover:border-[#4A3B31]'
                }`}
              >
                {freq} HZ
              </button>
            ))}
          </div>
        </div>

        {/* Ambient Noise */}
        <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg mt-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[#E5D5C5] text-sm font-medium">Ambient Noise</h3>
              <p className="text-[#D88A53] text-[10px] font-mono tracking-wider mt-1">
                {ambientType === 'BROWN' ? 'Brown Noise' : `${ambientType.charAt(0) + ambientType.slice(1).toLowerCase()} Noise`}
              </p>
            </div>
            <button 
              onClick={() => setAmbientEnabled(!ambientEnabled)}
              className={`w-11 h-6 rounded-full p-1 flex transition-colors ${
                ambientEnabled ? 'bg-[#E5D5C5] justify-end' : 'bg-[#3A2D25] justify-start'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${ambientEnabled ? 'bg-[#120F0D]' : 'bg-[#8C461C]'}`} />
            </button>
          </div>
          
          <div className="relative w-full h-1 bg-[#120F0D] rounded-full mb-6">
            <div 
              className="absolute left-0 top-0 h-full bg-[#E5D5C5] rounded-full" 
              style={{ width: `${ambientVolume}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E5D5C5] rounded-full shadow"
              style={{ left: `calc(${ambientVolume}% - 6px)` }}
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {['STREAM', 'RAIN', 'BROWN', 'PINK', 'WHITE'].map(type => (
              <button
                key={type}
                onClick={() => setAmbientType(type)}
                className={`py-2 rounded-xl border text-[10px] font-bold tracking-wider transition-all ${
                  ambientType === type
                    ? 'bg-[#8C461C]/20 border-[#8C461C] text-[#E5D5C5]'
                    : 'bg-[#1A1512]/40 border-[#2D231C] text-[#6B5D55] hover:border-[#4A3B31]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Affirmations */}
        <div className="bg-[#1A1512]/60 border border-[#2D231C] rounded-2xl p-5 shadow-lg mt-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-[#E5D5C5] text-sm font-medium">Affirmations</h3>
              <p className="text-[#D88A53] text-[10px] font-mono tracking-wider mt-1">
                4 Active Tracks
              </p>
            </div>
            <button 
              onClick={() => setAffirmationsEnabled(!affirmationsEnabled)}
              className={`w-11 h-6 rounded-full p-1 flex transition-colors ${
                affirmationsEnabled ? 'bg-[#E5D5C5] justify-end' : 'bg-[#3A2D25] justify-start'
              }`}
            >
              <div className={`w-4 h-4 rounded-full ${affirmationsEnabled ? 'bg-[#120F0D]' : 'bg-[#8C461C]'}`} />
            </button>
          </div>
          
          <div className="relative w-full h-1 bg-[#120F0D] rounded-full">
            <div 
              className="absolute left-0 top-0 h-full bg-[#E5D5C5] rounded-full" 
              style={{ width: `${affirmationsVolume}%` }}
            />
            <div 
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#E5D5C5] rounded-full shadow"
              style={{ left: `calc(${affirmationsVolume}% - 6px)` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
