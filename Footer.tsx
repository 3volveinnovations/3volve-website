interface FooterProps {
  onOpenLegal?: (tab: 'privacy' | 'terms') => void;
}

export default function Footer({ onOpenLegal }: FooterProps) {
  return (
    <footer id="main-footer" className="w-full py-8 sm:py-12 px-6 sm:px-8 md:px-12 2xl:px-16 border-t border-slate-800/50 mt-8 sm:mt-12 bg-slate-950">
      <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 tracking-wider font-light gap-4 md:gap-0 text-center md:text-left">
        <p>&copy; {new Date().getFullYear()} 3VOLVE INNOVATIONS. ALL RIGHTS RESERVED.</p>
        <div className="flex items-center gap-6">
          <button
            id="footer-privacy-btn"
            type="button"
            onClick={() => onOpenLegal?.('privacy')}
            className="hover:text-[#FF5A1F] transition-colors uppercase py-1 cursor-pointer focus:outline-none focus:underline"
          >
            Privacy
          </button>
          <button
            id="footer-terms-btn"
            type="button"
            onClick={() => onOpenLegal?.('terms')}
            className="hover:text-[#FF5A1F] transition-colors uppercase py-1 cursor-pointer focus:outline-none focus:underline"
          >
            Terms
          </button>
        </div>
      </div>
    </footer>
  );
}
