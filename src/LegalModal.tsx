import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldCheck, FileText, CheckCircle2, Copy, Check } from 'lucide-react';

interface LegalModalProps {
  isOpen: boolean;
  initialTab?: 'privacy' | 'terms';
  onClose: () => void;
}

export default function LegalModal({ isOpen, initialTab = 'privacy', onClose }: LegalModalProps) {
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>(initialTab);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      // Prevent background scrolling
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('info@3volveinnovations.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          id="legal-modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
        >
          <motion.div
            id="legal-modal-container"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0e1626] border border-[#2c3545] rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-200"
          >
            {/* Modal Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between px-6 py-5 border-b border-[#2c3545] bg-[#131d2e] gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF5A1F]/10 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F]">
                  {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                </div>
                <div>
                  <h2 id="legal-modal-title" className="text-lg sm:text-xl font-bold uppercase tracking-wider text-white">
                    {activeTab === 'privacy' ? 'Privacy Policy' : 'Terms of Service'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    3volve Innovations Legal Framework &bull; Last updated: August 2026
                  </p>
                </div>
              </div>

              {/* Tab Selector & Close Button */}
              <div className="flex items-center gap-3 justify-between sm:justify-end">
                <div className="flex bg-[#0a101d] p-1 rounded-lg border border-[#2c3545]">
                  <button
                    id="privacy-tab-btn"
                    type="button"
                    onClick={() => setActiveTab('privacy')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      activeTab === 'privacy'
                        ? 'bg-[#FF5A1F] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Privacy
                  </button>
                  <button
                    id="terms-tab-btn"
                    type="button"
                    onClick={() => setActiveTab('terms')}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                      activeTab === 'terms'
                        ? 'bg-[#FF5A1F] text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Terms
                  </button>
                </div>

                <button
                  id="close-legal-modal-btn"
                  type="button"
                  onClick={onClose}
                  aria-label="Close dialog"
                  className="w-9 h-9 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-700 focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body / Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-sm text-slate-300 leading-relaxed font-light">
              {activeTab === 'privacy' ? (
                <div id="privacy-policy-content" className="space-y-6">
                  {/* Overview Card */}
                  <div className="p-4 rounded-xl bg-[#131d2e]/70 border border-[#2c3545]">
                    <h3 className="font-semibold text-white uppercase text-xs tracking-widest text-[#FF5A1F] mb-1">
                      Summary Notice
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      3volve Innovations (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to safeguarding your personal data, intellectual property, and research telemetry. This policy explains how we collect, handle, protect, and use data across our websites, applications (including BioStack, 3volve Mind, and Future Labs), and associated services.
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">1.</span> Information We Collect
                    </h4>
                    <p>
                      Depending on your engagement with our platform and specialized portals, we may collect the following classes of data:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                      <li>
                        <strong className="text-slate-100">Direct Information:</strong> Name, professional email address, organization name, and inquiry notes submitted via our contact and partnership forms.
                      </li>
                      <li>
                        <strong className="text-slate-100">Technical & Telemetry Data:</strong> Browser types, operating system specifications, IP addresses, referring URLs, session durations, and interaction metrics.
                      </li>
                      <li>
                        <strong className="text-slate-100">Specialized Portal Data:</strong> Query parameters and computational job configurations submitted to our proprietary research applications (e.g., BioStack Pharmacokinetics queries and 3volve Mind Subconscious Reprogramming modules).
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">2.</span> How We Use Information
                    </h4>
                    <p>
                      Collected data is used strictly to power, protect, and refine our intelligent systems:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                      <li>Facilitating enterprise inquiries, partnership proposals, and customer support.</li>
                      <li>Conducting computational benchmarking, error diagnosis, and server capacity optimization.</li>
                      <li>Ensuring network security, preventing fraudulent access, and enforcing our terms.</li>
                      <li>Iterating upon algorithmic models in compliance with applicable ethical and data protection standards.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">3.</span> Data Protection & Security Architecture
                    </h4>
                    <p>
                      We enforce defense-in-depth security measures, including Transport Layer Security (TLS 1.3), AES-256 data encryption at rest, tokenized authentication, and strict role-based access control. We never sell or rent your personal information to third parties.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">4.</span> Your Rights & Choices (GDPR & CCPA/CPRA)
                    </h4>
                    <p>
                      Regardless of your location, you have the right to request access to your personal data, request correction of inaccuracies, object to processing, or request permanent deletion of your records. To exercise any of these rights, contact us at{' '}
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="text-[#FF5A1F] underline hover:text-[#ff7847] inline-flex items-center gap-1 font-mono text-xs ml-1"
                      >
                        info@3volveinnovations.com
                        {copied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">5.</span> Policy Modifications
                    </h4>
                    <p>
                      We reserve the right to revise this Privacy Policy periodically. Substantial modifications will be reflected by the &ldquo;Last updated&rdquo; timestamp at the top of this notice. Continued interaction with our digital properties constitutes acceptance of updated terms.
                    </p>
                  </section>
                </div>
              ) : (
                <div id="terms-of-service-content" className="space-y-6">
                  {/* Overview Card */}
                  <div className="p-4 rounded-xl bg-[#131d2e]/70 border border-[#2c3545]">
                    <h3 className="font-semibold text-white uppercase text-xs tracking-widest text-[#FF5A1F] mb-1">
                      Agreement Summary
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm">
                      By accessing or utilizing the digital properties, portals, and proprietary innovations provided by 3volve Innovations (&ldquo;Company,&rdquo; &ldquo;we,&rdquo; &ldquo;us&rdquo;), you acknowledge and agree to be bound by these Terms of Service.
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">1.</span> Intellectual Property & Proprietary Rights
                    </h4>
                    <p>
                      All intellectual property, proprietary models, computational workflows, algorithmic architectures, trademarks, designs, and content across 3volve Innovations (including BioStack, 3volve Mind, and Future Labs) are the exclusive property of 3volve Innovations and its licensors.
                    </p>
                    <p>
                      You may not decompile, reverse-engineer, mirror, extract source code, or commercially redistribute any assets or system APIs without explicit written consent.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">2.</span> Acceptable Use & Conduct
                    </h4>
                    <p>
                      When utilizing our platforms and communications channels, you agree not to:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
                      <li>Engage in automated scraping, denial-of-service attacks, or malicious server penetration tests.</li>
                      <li>Use our computational models or research prototypes for unlawful, hazardous, or biosecurity-violating activities.</li>
                      <li>Misrepresent identity or affiliation when submitting enterprise inquiries or accessing partner sandboxes.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">3.</span> Research & Computational Disclaimers
                    </h4>
                    <p>
                      Bioinformatics insights, pharmacokinetics modeling, and subconscious cognitive reprogramming frameworks presented on our exploratory portals are developed for scientific advancement and research evaluation. They do not constitute formal medical diagnoses, clinical prescriptions, or regulatory-certified therapeutic guidance.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">4.</span> Limitation of Liability
                    </h4>
                    <p>
                      To the maximum extent permitted by applicable law, 3volve Innovations and its directors, employees, and affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use our services or computational outputs.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="text-base font-semibold text-white uppercase tracking-wide flex items-center gap-2">
                      <span className="text-[#FF5A1F]">5.</span> Governing Law & Contact
                    </h4>
                    <p>
                      These Terms are governed by and construed in accordance with applicable corporate laws without regard to conflict of law principles. For legal inquiries, please contact:
                    </p>
                    <div className="mt-2 p-3 rounded-lg bg-[#0a101d] border border-[#2c3545] flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-300">info@3volveinnovations.com</span>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-2.5 py-1 text-xs bg-[#131d2e] hover:bg-[#1a263c] text-[#FF5A1F] rounded border border-[#2c3545] flex items-center gap-1.5 transition-colors"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                            <span>Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </section>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-[#2c3545] bg-[#131d2e]">
              <span className="text-xs text-slate-400">
                Official document for 3volve Innovations Inc.
              </span>
              <button
                id="modal-confirm-btn"
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-[#FF5A1F] hover:bg-[#e04e18] text-white text-xs font-semibold tracking-wider uppercase transition-colors shadow-md"
              >
                Close & Return
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
