/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LegalModal from './components/LegalModal';
import BioStackShowcase from './components/biostack/BioStackShowcase';
import MindShowcase from './components/mind/MindShowcase';
import LabsTeaser from './components/labs/LabsTeaser';
import BetaPreview from './components/BetaPreview';
import wallpaperImg from './assets/images/hi_tech_wallpaper_original_style_1786835421179.jpg';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Home() {
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<'privacy' | 'terms'>('privacy');
  const [bioStackOpen, setBioStackOpen] = useState(false);
  const [bioStackTab, setBioStackTab] = useState<'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule'>('overview');
  const [mindOpen, setMindOpen] = useState(false);
  const [mindTab, setMindTab] = useState<'reflect' | 'record' | 'mixer'>('reflect');

  const handleOpenLegal = (tab: 'privacy' | 'terms') => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const handleCloseLegal = () => {
    setLegalModalOpen(false);
  };

  const handleOpenBioStack = (tab: 'overview' | 'pk' | 'ai' | 'clinical' | 'library' | 'schedule' = 'overview') => {
    setBioStackTab(tab);
    setBioStackOpen(true);
  };

  const handleCloseBioStack = () => {
    setBioStackOpen(false);
  };

  const handleOpenMind = (tab: 'reflect' | 'record' | 'mixer' = 'reflect') => {
    setMindTab(tab);
    setMindOpen(true);
  };

  const handleCloseMind = () => {
    setMindOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-slate-200 selection:bg-orange-500/30 font-sans overflow-x-hidden relative">
      {/* Hi-Tech 3D Wallpaper Background */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `url(${wallpaperImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.35 // Restored to a balanced opacity for the original lighter charcoal/obsidian style
        }}
      />
      {/* Optional radial dark gradient overlay to focus the center/top */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#030508_100%)] opacity-80" />

      {/* Main Content wrapper with z-index to sit above the background */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Portfolio onOpenBioStack={handleOpenBioStack} onOpenMind={handleOpenMind} />
          <About />
          <Contact />
        </main>
        <Footer onOpenLegal={handleOpenLegal} />
      </div>

      {/* Privacy Policy & Terms of Service Dialog */}
      <LegalModal
        isOpen={legalModalOpen}
        initialTab={legalModalTab}
        onClose={handleCloseLegal}
      />

      {/* BioStack Research Engine Interactive Showcase */}
      <BioStackShowcase
        isOpen={bioStackOpen}
        initialTab={bioStackTab}
        onClose={handleCloseBioStack}
      />

      {/* 3volve Mind Interactive Showcase */}
      <MindShowcase
        isOpen={mindOpen}
        initialTab={mindTab}
        onClose={handleCloseMind}
      />
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/labs" element={<LabsTeaser />} />
        <Route path="/preview/:portalId" element={<BetaPreview />} />
      </Routes>
    </>
  );
}
