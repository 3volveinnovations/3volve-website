import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../assets/images/1786923450315.png';

const NAV_LINKS = [
  { href: '#core-vision', label: 'CORE VISION' },
  { href: '#portfolio', label: 'PORTFOLIO' },
  { href: '#about', label: 'ABOUT' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav id="main-navbar" className="w-full py-5 sm:py-7 px-6 sm:px-8 md:px-12 2xl:px-16 z-50 relative">
      <div className="flex items-center justify-between w-full">
        {/* Brand / Logo */}
        <a href="#" className="flex items-center group" onClick={closeMenu}>
          <img 
            src={logoImg} 
            alt="3VOLVE Innovations Logo" 
            className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-screen"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-7 text-[11px] font-medium uppercase tracking-widest text-slate-300">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors duration-200 py-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger Button */}
        <button
          id="mobile-menu-toggle"
          type="button"
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Collapsible Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-drawer"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden mt-3 rounded-xl bg-[#131B2A]/95 border border-[#2c3545] backdrop-blur-lg shadow-2xl"
          >
            <div className="flex flex-col px-5 py-5 space-y-4 text-xs font-medium uppercase tracking-widest text-slate-300">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between py-2 border-b border-[#2c3545]/50 last:border-none hover:text-white hover:pl-1 transition-all duration-200"
                >
                  <span>{link.label}</span>
                  <span className="text-[#FF5A1F] text-sm">→</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
