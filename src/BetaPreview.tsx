import { useState, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Activity, Network, ArrowLeft, Terminal, AlertTriangle, Send } from 'lucide-react';

const portalConfig = {
  biostack: {
    title: 'BIOSTACK',
    subtitle: 'Protocol Optimization & Pharmacokinetics Research Engine',
    tagline: 'Engineered to optimize the body.',
    description: 'Streamlining biological modeling, research aggregation, and compound stack tracking into a single high-precision dashboard.',
    email: 'biostack@3volveinnovations.com',
    color: 'cyan',
    icon: Network,
    features: [
      'Interactive Pharmacokinetic Accumulation Curves',
      'AI-Assisted Compound Synergy & Transporter Screening',
      'Longitudinal Dosing Schedules & Clinical Disclosures'
    ],
  },
  mind: {
    title: '3VOLVE MIND',
    subtitle: 'Subconscious Optimization & Frequency Engine',
    tagline: 'Engineered to reprogram reality.',
    description: 'Leveraging prime hypnagogic and hypnopompic theta windows with targeted auditory frequencies to rewire subconscious neural patterns.',
    email: 'mind@3volveinnovations.com',
    color: 'orange',
    icon: Activity,
    features: [
      'Hypnagogic & Hypnopompic Theta Frequency Synthesis',
      'Subliminal Affirmation & Neural Pattern Mixing',
      'Reflective Journaling & Subconscious Calibration'
    ],
  }
};

export default function BetaPreview() {
  const { portalId } = useParams<{ portalId: string }>();
  const navigate = useNavigate();
  const config = portalId === 'mind' ? portalConfig.mind : portalConfig.biostack;
  
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Anonymous/Waitlist',
          email: email,
          company: 'N/A',
          inquiryType: `Waitlist: ${config.title}`,
          message: `I would like to join the early-access waitlist for ${config.title} (${config.subtitle}).`
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to request access. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ColorIcon = config.icon;
  const isCyan = config.color === 'cyan';
  
  return (
    <div className="min-h-screen bg-[#030508] text-slate-200 font-mono flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030508] to-[#030508]" />
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 w-full max-w-2xl bg-[#0a0f1a]/80 backdrop-blur-md border border-[#2c3545] p-8 md:p-12 rounded-2xl shadow-2xl">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
          RETURN
        </button>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6 border-b border-[#2c3545] pb-6">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center ${isCyan ? 'bg-cyan-500/10 border-cyan-500/50' : 'bg-orange-500/10 border-[#FF5A1F]/50'}`}>
              <ColorIcon className={`w-6 h-6 ${isCyan ? 'text-cyan-400' : 'text-[#FF5A1F]'}`} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-white mb-1 font-sans">{config.title}</h1>
              <p className="text-slate-400 text-xs md:text-sm tracking-widest uppercase">{config.subtitle}</p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 text-[10px] tracking-wider animate-pulse whitespace-nowrap self-start shadow-[0_0_15px_rgba(234,179,8,0.15)]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>APP IN ACTIVE DEVELOPMENT / CLOSED BETA</span>
          </div>
        </div>

        <div className="mb-6 space-y-3">
          <p className="text-slate-300 text-sm font-sans font-light leading-relaxed">
            {config.description}
          </p>
          <div className={`inline-block text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg border ${isCyan ? 'border-cyan-500/30 text-cyan-300 bg-cyan-950/40' : 'border-[#FF5A1F]/30 text-[#FF5A1F] bg-orange-950/40'}`}>
            {config.tagline}
          </div>
        </div>

        <div className="mb-10 p-5 md:p-6 bg-[#030508] border border-[#2c3545] rounded-lg relative overflow-hidden">
          <div className={`absolute top-0 left-0 w-1 h-full ${isCyan ? 'bg-cyan-500/50' : 'bg-orange-500/50'}`} />
          <div className={`flex items-center gap-2 mb-4 ${isCyan ? 'text-cyan-400' : 'text-[#FF5A1F]'}`}>
            <Terminal className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase font-bold">Upcoming Features</span>
          </div>
          <ul className="text-slate-300 text-sm leading-relaxed mb-6 font-sans font-light space-y-3">
            {config.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className={`mt-0.5 ${isCyan ? 'text-cyan-500' : 'text-orange-500'}`}>▹</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {submitted ? (
           <div className="p-6 border border-green-500/30 bg-green-500/10 rounded-lg text-center animate-in fade-in duration-500">
             <h3 className="text-green-400 font-bold mb-2 uppercase tracking-widest text-sm">Waitlist Request Sent</h3>
             <p className="text-slate-300 text-xs font-sans">
               Your request has been securely routed to <span className="font-mono text-white">{config.email}</span>. 
               We will notify you when early access opens.
             </p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="text-xs text-slate-400 tracking-wider uppercase">Join the Early Access Waitlist</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                required
                placeholder="ENTER EMAIL ADDRESS"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`flex-grow bg-[#030508] border border-[#2c3545] rounded-lg px-4 py-3 text-sm text-white focus:outline-none transition-colors placeholder:text-slate-600 font-mono ${isCyan ? 'focus:border-cyan-500' : 'focus:border-orange-500'}`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-3 text-[#030508] rounded-lg text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap flex items-center justify-center gap-2 ${isCyan ? 'bg-cyan-500 hover:bg-cyan-400' : 'bg-orange-500 hover:bg-orange-400'} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <span>{isSubmitting ? 'Transmitting...' : 'Request Access'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-xs font-mono">{errorMessage}</p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
