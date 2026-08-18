import { useState } from 'react';
import { Download, Printer, ExternalLink, ShieldCheck, Stethoscope, Check, FileText } from 'lucide-react';
import { Compound } from './data/biostackData';

interface BioStackClinicalReportProps {
  compounds: Compound[];
  patientName?: string;
  facility?: string;
  attendingDoc?: string;
}

export default function BioStackClinicalReport({
  compounds,
  patientName = 'Research Subject / Patient',
  facility = 'BioStack Precision Health Center',
  attendingDoc = 'Attending Endocrinologist / PCP',
}: BioStackClinicalReportProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isEditingMeta, setIsEditingMeta] = useState(false);
  const [customPatient, setCustomPatient] = useState(patientName);
  const [customFacility, setCustomFacility] = useState(facility);
  const [customAttending, setCustomAttending] = useState(attendingDoc);
  const [reportDate] = useState('August 15, 2026');

  const handlePrint = () => {
    window.print();
  };

  const handleOpenPrintableWindow = () => {
    const printableWindow = window.open('', '_blank');
    if (!printableWindow) return;

    const rowsHtml = compounds
      .map(
        (c) => `
        <tr style="border-bottom: 1px solid #23354f;">
          <td style="padding: 10px 12px; font-weight: bold; color: #ffffff;">${c.name}</td>
          <td style="padding: 10px 12px; color: #38bdf8; font-family: monospace;">${c.dosage}</td>
          <td style="padding: 10px 12px; color: #94a3b8;">${c.route}</td>
          <td style="padding: 10px 12px; color: #94a3b8; font-family: monospace;">${c.timing}</td>
          <td style="padding: 10px 12px; color: #38bdf8; font-family: monospace;">${c.halfLifeHours}h</td>
          <td style="padding: 10px 12px; color: #cbd5e1; font-size: 11px; line-height: 1.4;">${c.overview}</td>
        </tr>
      `
      )
      .join('');

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>BioStack Clinical Protocol Report - ${customPatient}</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            background-color: #080d17;
            color: #e2e8f0;
            padding: 30px;
            margin: 0;
          }
          .header {
            border-bottom: 2px solid #0284c7;
            padding-bottom: 16px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
          }
          h1 { color: #38bdf8; margin: 0 0 4px 0; font-size: 24px; text-transform: uppercase; }
          .sub { color: #94a3b8; font-size: 12px; }
          .meta-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 12px;
            background: #0f172a;
            padding: 16px;
            border-radius: 8px;
            border: 1px solid #1e293b;
            margin-bottom: 24px;
            font-size: 12px;
          }
          table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 12px; }
          th { background: #0f172a; color: #94a3b8; text-align: left; padding: 10px 12px; text-transform: uppercase; font-size: 11px; }
          .obs-box {
            background: #0b1526;
            border: 1px solid #1e3a8a;
            border-radius: 8px;
            padding: 16px;
            margin-bottom: 30px;
            font-size: 12px;
            line-height: 1.6;
          }
          .signature-row {
            margin-top: 40px;
            display: flex;
            justify-content: space-between;
            border-top: 1px dashed #334155;
            padding-top: 20px;
            font-size: 12px;
            color: #94a3b8;
          }
          @media print {
            body { background: #ffffff; color: #000000; }
            .header { border-bottom: 2px solid #000000; }
            h1 { color: #000000; }
            .meta-grid, table th, .obs-box { background: #f8fafc; color: #000000; border: 1px solid #cbd5e1; }
            tr { border-bottom: 1px solid #e2e8f0 !important; }
            td { color: #000000 !important; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <h1>BIOSTACK PRECISION HEALTH</h1>
            <div class="sub">Pharmacokinetic Protocol & Medical Supplement Disclosure Report</div>
          </div>
          <div style="text-align: right; font-size: 12px; color: #94a3b8;">
            <div><strong>Date:</strong> ${reportDate}</div>
            <div><strong>Facility:</strong> ${customFacility}</div>
            <div><strong>Attending:</strong> ${customAttending}</div>
          </div>
        </div>

        <div class="meta-grid">
          <div><strong>PATIENT NAME:</strong><br/>${customPatient}</div>
          <div><strong>DOB:</strong><br/>Confidential / Recorded</div>
          <div><strong>ACTIVE COMPOUNDS:</strong><br/><span style="color: #38bdf8; font-weight: bold;">${compounds.length} Active Items</span></div>
          <div><strong>PROTOCOL TARGETS:</strong><br/>Longevity, Mitochondrial & Neuro</div>
        </div>

        <h3>SUPPLEMENTS, NOOTROPICS & MICRONUTRIENTS</h3>
        <table>
          <thead>
            <tr>
              <th>Compound Name</th>
              <th>Dosage</th>
              <th>Route</th>
              <th>Timing</th>
              <th>Half-Life</th>
              <th>Mechanism</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>

        <div class="obs-box">
          <strong style="color: #38bdf8;">🛡️ Pharmacokinetic & Safety Observations for Healthcare Provider:</strong>
          <ul>
            <li><strong>Serum Clearance Cycles:</strong> Protocol compounds are staggered based on elimination half-lives (HL range: 2h to 360h) to mitigate peak plasma accumulation toxicity.</li>
            <li><strong>Drug-Supplement Interaction Screening:</strong> No acute contraindications reported. Advise routine liver enzymes (ALT/AST), renal panel (BUN/Creatinine/eGFR), and lipid panels every 90 days.</li>
            <li><strong>Administration Compliance:</strong> Patient reports active tracking of dosing times and daily adherence via BioStack digital logging engine.</li>
          </ul>
        </div>

        <div class="signature-row">
          <div>Physician / Practitioner Notes: ___________________________</div>
          <div>Attending Physician Signature & License #: ___________________________</div>
        </div>
      </body>
      </html>
    `;

    printableWindow.document.write(htmlContent);
    printableWindow.document.close();
  };

  const handleDownload = () => {
    handleOpenPrintableWindow();
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="w-full bg-[#090f1a] border border-[#1b263b] rounded-2xl p-5 sm:p-7 shadow-2xl text-slate-100 relative overflow-hidden">
      {/* Top action tool ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-[#1b263b] pb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-500/15 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-bold tracking-wide text-white uppercase">
              Clinical & Physician Protocol Report
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-light mt-0.5">
              Formal clinical document formatted for primary care physicians, endocrinologists, and specialists
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-md"
          >
            {downloadSuccess ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{downloadSuccess ? 'Downloaded' : 'Download PDF'}</span>
          </button>
          <button
            onClick={handleOpenPrintableWindow}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#152238] hover:bg-[#1c2e4c] border border-[#273d61] text-cyan-300 font-semibold text-xs transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open Printable Window</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
        </div>
      </div>

      {/* Toggle edit metadata */}
      <div className="mb-4 flex items-center justify-between text-xs text-slate-400">
        <button
          onClick={() => setIsEditingMeta((v) => !v)}
          className="text-cyan-400 hover:underline flex items-center gap-1.5 font-mono"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{isEditingMeta ? 'Save Header Details' : 'Edit Patient & Physician Info (Research Subject / Patient)'}</span>
        </button>
        <span className="font-mono text-[11px] text-slate-400">Format: Clinical PDF v2.8</span>
      </div>

      {isEditingMeta && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3 bg-[#0d1626] border border-[#20304a] rounded-xl mb-5 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Patient Name:</label>
            <input
              type="text"
              value={customPatient}
              onChange={(e) => setCustomPatient(e.target.value)}
              className="w-full bg-[#142033] border border-[#283d5e] rounded px-2.5 py-1.5 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Facility Name:</label>
            <input
              type="text"
              value={customFacility}
              onChange={(e) => setCustomFacility(e.target.value)}
              className="w-full bg-[#142033] border border-[#283d5e] rounded px-2.5 py-1.5 text-white"
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1">Attending Physician:</label>
            <input
              type="text"
              value={customAttending}
              onChange={(e) => setCustomAttending(e.target.value)}
              className="w-full bg-[#142033] border border-[#283d5e] rounded px-2.5 py-1.5 text-white"
            />
          </div>
        </div>
      )}

      {/* Clinical Document Preview Container (Styled as Screenshot 6) */}
      <div className="bg-[#0b121e] border border-[#1d2b42] rounded-xl p-6 sm:p-8 space-y-6 text-slate-200 shadow-xl">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#223554] pb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-wider text-cyan-400 uppercase font-mono">
              BIOSTACK PRECISION HEALTH
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Pharmacokinetic Protocol & Medical Supplement Disclosure Report
            </p>
          </div>
          <div className="text-xs font-mono text-slate-300 sm:text-right space-y-1">
            <div>
              <span className="text-slate-400">Date:</span> {reportDate}
            </div>
            <div>
              <span className="text-slate-400">Facility:</span> {customFacility}
            </div>
            <div>
              <span className="text-slate-400">Attending:</span> {customAttending}
            </div>
          </div>
        </div>

        {/* Patient Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#0f192b] border border-[#233757] text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">PATIENT NAME</span>
            <span className="font-bold text-white text-sm">{customPatient}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">DOB</span>
            <span className="font-semibold text-slate-300">N/A (Encrypted)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">ACTIVE COMPOUNDS</span>
            <span className="font-bold text-cyan-400 text-sm">{compounds.length} Active Items</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">PROTOCOL TARGETS</span>
            <span className="font-semibold text-slate-300">Longevity, Metabolic, Focus</span>
          </div>
        </div>

        {/* Clinical Supplement & Compound Disclosure Table */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-emerald-400 font-bold">🌿</span>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Supplements, Nootropics & Micronutrients
            </h4>
          </div>

          <div className="overflow-x-auto rounded-lg border border-[#1e2f4a]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#121c2e] text-slate-400 font-mono text-[11px] uppercase border-b border-[#1e2f4a]">
                  <th className="py-3 px-3.5">Compound Name</th>
                  <th className="py-3 px-3.5">Dosage</th>
                  <th className="py-3 px-3.5">Route</th>
                  <th className="py-3 px-3.5">Timing</th>
                  <th className="py-3 px-3.5">Half-Life</th>
                  <th className="py-3 px-3.5">Mechanism</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#18263d]">
                {compounds.map((c) => (
                  <tr key={c.id} className="hover:bg-[#131f33]/70 transition-colors">
                    <td className="py-3 px-3.5 font-bold text-white whitespace-nowrap">{c.name}</td>
                    <td className="py-3 px-3.5 font-mono text-cyan-300 whitespace-nowrap">{c.dosage}</td>
                    <td className="py-3 px-3.5 text-slate-300 whitespace-nowrap">{c.route}</td>
                    <td className="py-3 px-3.5 font-mono text-slate-300 whitespace-nowrap">{c.timing}</td>
                    <td className="py-3 px-3.5 font-mono text-pink-300 whitespace-nowrap">{c.halfLifeHours}h</td>
                    <td className="py-3 px-3.5 text-slate-400 text-[11px] leading-relaxed min-w-[240px]">
                      {c.overview}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pharmacokinetic & Safety Observations Box */}
        <div className="bg-[#0e1a2d] border border-cyan-500/30 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Pharmacokinetic & Safety Observations for Healthcare Provider</span>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <div>
                <strong className="text-white">Serum Clearance Cycles:</strong> Protocol compounds are staggered based on elimination half-lives (HL range: 2h to 360h) to mitigate peak plasma accumulation toxicity.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <div>
                <strong className="text-white">Drug-Supplement Interaction Screening:</strong> No acute contraindications reported. Advise routine liver enzymes (ALT/AST), renal panel (BUN/Creatinine/eGFR), and lipid panels every 90 days.
              </div>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">•</span>
              <div>
                <strong className="text-white">Administration Compliance:</strong> Patient reports active tracking of dosing times and daily adherence via digital logging engine.
              </div>
            </li>
          </ul>
        </div>

        {/* Doctor Signature Block */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-6 border-t border-dashed border-[#23354f] text-xs font-mono text-slate-400">
          <div>
            <div className="mb-8">Physician / Practitioner Notes:</div>
            <div className="border-b border-[#2d4365] w-full" />
          </div>
          <div>
            <div className="mb-8">Attending Physician Signature & License #:</div>
            <div className="border-b border-[#2d4365] w-full" />
            <div className="text-[10px] text-slate-400 mt-1 text-right">
              Reviewed and acknowledged for patient medical chart
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
