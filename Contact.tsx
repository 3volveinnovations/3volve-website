import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Send, CheckCircle2, Copy, Check, MessageSquare, Building2, User } from 'lucide-react';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    organization: '',
    subject: 'Partnership Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const getTargetEmail = (subject: string) => {
    switch (subject) {
      case 'BioStack Inquiry': return 'biostack@3volveinnovations.com';
      case '3volve Mind Inquiry': return 'mind@3volveinnovations.com';
      case 'Future Labs Venture': return 'labs@3volveinnovations.com';
      default: return 'info@3volveinnovations.com';
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.email || !formState.name || !formState.message) return;
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          company: formState.organization,
          inquiryType: formState.subject,
          message: formState.message
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitted(true);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@3volveinnovations.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full py-12 sm:py-16 md:py-24 px-6 sm:px-8 md:px-12 2xl:px-16 border-t border-[#2c3545]/40 scroll-mt-16 sm:scroll-mt-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-semibold uppercase tracking-widest">
              <Mail className="w-3.5 h-3.5" />
              <span>Get In Touch</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
              CONNECT WITH THE <br />
              <span className="text-[#FF5A1F]">3VOLVE TEAM</span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
              Whether you are an enterprise partner, scientific collaborator, or prospective investor, we invite inquiries across our protocol optimization, cognitive frequency, and next-gen execution engines.
            </p>

            {/* Email Direct Card */}
            <div className="p-5 rounded-2xl bg-[#131B2A]/80 backdrop-blur-sm border border-[#2c3545] space-y-3">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-medium">
                Direct Correspondence
              </div>
              <div className="flex items-center justify-between gap-3 bg-[#0a0f1a] p-3 rounded-xl border border-[#2c3545]">
                <a
                  href="mailto:info@3volveinnovations.com"
                  className="text-xs sm:text-sm font-mono text-white truncate hover:text-[#FF5A1F] transition-colors"
                >
                  info@3volveinnovations.com
                </a>
                <button
                  id="copy-contact-email-btn"
                  type="button"
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-lg bg-[#FF5A1F]/10 hover:bg-[#FF5A1F]/20 text-[#FF5A1F] border border-[#FF5A1F]/30 text-xs font-medium flex items-center gap-1.5 transition-colors flex-shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sub-brands badges */}
            <div className="pt-2">
              <div className="text-xs uppercase tracking-widest text-slate-400 mb-3 font-semibold">
                Ecosystem Portals
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link to="/preview/biostack" className="px-3 py-1.5 rounded-lg bg-[#131B2A] border border-[#2c3545] text-slate-300 hover:text-white hover:border-cyan-500/50 transition-colors cursor-pointer">
                  biostack.3volveinnovations.com
                </Link>
                <Link to="/preview/mind" className="px-3 py-1.5 rounded-lg bg-[#131B2A] border border-[#2c3545] text-slate-300 hover:text-white hover:border-[#FF5A1F]/50 transition-colors cursor-pointer">
                  mind.3volveinnovations.com
                </Link>
                <Link to="/labs" className="px-3 py-1.5 rounded-lg bg-[#131B2A] border border-[#2c3545] text-slate-300 hover:text-white hover:border-red-500/50 transition-colors cursor-pointer">
                  labs.3volveinnovations.com
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-[#131B2A]/80 backdrop-blur-sm border border-[#2c3545] rounded-2xl p-6 sm:p-8 shadow-xl">
            {submitted ? (
              <div className="py-12 flex flex-col items-center text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide">
                  Message Transmitted
                </h3>
                <p className="text-sm text-slate-300 max-w-md font-light">
                  Thank you for reaching out to 3volve Innovations. Your inquiry has been routed to <span className="text-[#FF5A1F] font-mono font-medium">{getTargetEmail(formState.subject)}</span> and our team will respond promptly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({ name: '', email: '', organization: '', subject: 'Partnership Inquiry', message: '' });
                  }}
                  className="mt-4 px-6 py-2 rounded-full border border-[#FF5A1F] text-[#FF5A1F] hover:bg-[#FF5A1F]/10 text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        id="contact-name"
                        type="text"
                        required
                        placeholder="Dr. Jordan Vance"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-[#2c3545] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F]"
                      />
                      <User className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Email Address *
                    </label>
                    <div className="relative">
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="jordan@domain.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-[#2c3545] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F]"
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact-organization" className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Organization / Institution
                    </label>
                    <div className="relative">
                      <input
                        id="contact-organization"
                        type="text"
                        placeholder="BioLabs International"
                        value={formState.organization}
                        onChange={(e) => setFormState({ ...formState, organization: e.target.value })}
                        className="w-full bg-[#0a0f1a] border border-[#2c3545] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F]"
                      />
                      <Building2 className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      id="contact-subject"
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-[#0a0f1a] border border-[#2c3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F]"
                    >
                      <option value="Partnership Inquiry">Partnership & Strategic Inquiries</option>
                      <option value="BioStack Inquiry">BioStack (Protocol & PK Engine)</option>
                      <option value="3volve Mind Inquiry">3volve Mind (Subconscious Engine)</option>
                      <option value="Future Labs Venture">Future Labs (Execution & Analytical Utilities)</option>
                      <option value="General Information">General Information</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                    Message / Project Brief *
                  </label>
                  <div className="relative">
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Detail your inquiry or collaboration proposal..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#0a0f1a] border border-[#2c3545] rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] resize-none"
                    />
                    <MessageSquare className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    id="submit-contact-form-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FF5A1F] hover:bg-[#e04e18] text-white text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[#FF5A1F]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Transmitting...' : 'Submit Inquiry'}</span>
                    <Send className="w-4 h-4" />
                  </button>
                  {errorMessage && (
                    <p className="text-red-400 text-xs sm:text-sm">{errorMessage}</p>
                  )}
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
