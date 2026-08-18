import { useState, FormEvent } from 'react';
import { Lock, ShieldAlert, Terminal, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LabsTeaser() {
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
          inquiryType: 'Future Labs Venture',
          message: 'Requesting stealth access and joining the R&D waitlist for Future Labs.'
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

  return (
    <div className="min-h-screen bg-[#030508] text-slate-200 font-mono flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-[#030508] to-[#030508]" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 w-full max-w-2xl bg-[#0a0f1a]/80 backdrop-blur-md border border-[#2c3545] p-8 md:p-12 rounded-2xl shadow-2xl">
        <Link to="/" className="inline-flex items-center text-xs text-slate-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-3 h-3 mr-2 group-hover:-translate-x-1 transition-transform" />
          RETURN TO DIRECTORY
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-[#2c3545] pb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-white mb-2 font-sans">FUTURE LABS</h1>
            <p className="text-slate-300 text-xs md:text-sm tracking-widest uppercase font-mono">Next-Gen Execution & Analytical Utilities</p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/50 text-red-400 text-xs tracking-wider animate-pulse whitespace-nowrap self-start shadow-[0_0_15px_rgba(239,68,68,0.2)]">
            <Lock className="w-3.5 h-3.5" />
            <span>ACTIVE R&D / LOCKED</span>
          </div>
        </div>

        <div className="mb-10 p-5 md:p-6 bg-[#030508] border border-[#2c3545] rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/50" />
          <div className="flex items-center gap-2 mb-4 text-red-400">
            <Terminal className="w-4 h-4" />
            <span className="text-xs tracking-widest uppercase font-bold">System Message</span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed mb-4 font-sans font-light">
            Incubating specialized systems, pattern-recognition journals, and high-leverage tools designed for peak edge and execution.
          </p>
          <div className="mb-6 inline-block text-xs font-mono font-semibold tracking-wider uppercase px-3 py-1.5 rounded-lg border border-red-500/30 text-red-300 bg-red-950/40">
            Engineered to innovate the future.
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-[10px] md:text-xs">
            <ShieldAlert className="w-4 h-4 text-red-500/70" />
            <span>Encrypted Connection Established. Access restricted to cleared waitlist.</span>
          </div>
        </div>

        {submitted ? (
           <div className="p-6 border border-green-500/30 bg-green-500/10 rounded-lg text-center animate-in fade-in duration-500">
             <h3 className="text-green-400 font-bold mb-2 uppercase tracking-widest text-sm">Clearance Request Sent</h3>
             <p className="text-slate-300 text-xs font-sans">
               Your request has been securely routed to <span className="font-mono text-white">labs@3volveinnovations.com</span>. 
               We will review your application for the R&D waitlist.
             </p>
           </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              required
              placeholder="ENTER CREDENTIAL / EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-grow bg-[#030508] border border-[#2c3545] rounded-lg px-4 py-3.5 text-sm text-white focus:outline-none focus:border-red-500 transition-colors placeholder:text-slate-600 font-mono"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 bg-white hover:bg-slate-200 text-[#030508] rounded-lg text-xs font-bold tracking-widest uppercase transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.1)] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Transmitting...' : 'Request Access'}
            </button>
          </form>
        )}
        {errorMessage && (
          <p className="text-red-500 text-xs mt-3 font-mono">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
