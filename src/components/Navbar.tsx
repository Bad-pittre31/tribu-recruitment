import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { MagneticButton } from './ui/MagneticButton';
import { cn } from '@/src/utils/cn';
import { useTranslation } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !mobileMenuOpen) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { label: t('nav.model'), href: isLandingPage ? '#model' : '/#model' },
    { label: t('nav.protocol'), href: isLandingPage ? '#protocol' : '/#protocol' },
    { label: t('nav.talent'), href: isLandingPage ? '#talent' : '/#talent' },
    { label: t('nav.transparency'), href: isLandingPage ? '#transparency' : '/#transparency' },
    { label: t('nav.about'), href: '/about', isRoute: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false);

    // For smooth scrolling on the current landing page
    if (isLandingPage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed top-6 inset-x-0 z-[100] flex justify-center px-6 transition-all duration-500 pointer-events-none",
        isScrolled ? "top-4" : "top-6"
      )}
    >
      {/* Independent Branding Logo (Top Left) - Clickable */}
      <Link to="/" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="absolute top-0 left-6 z-50 pointer-events-auto transition-transform hover:scale-[1.02] active:scale-[0.98]">
        <img
          src="/assets/tribu-logo-jungle.png"
          alt="TRIBU Branding"
          className="h-[120px] md:h-[180px] w-auto object-contain"
        />
      </Link>

      {/* Main Container tailored for centering the navbar correctly */}
      <div className="w-full max-w-5xl relative pointer-events-none flex justify-end md:justify-center">
        <div className={cn(
          "relative flex items-center justify-between rounded-full px-8 py-3 transition-all duration-700 pointer-events-auto overflow-hidden",
          "backdrop-blur-2xl border shadow-[0_8px_32_rgba(0,0,0,0.1)]",
          isScrolled ? "bg-white/10 md:bg-white/10 border-white/30 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)]" : "bg-white/5 md:bg-white/5 border-white/20"
        )}>
          {/* Glossy Reflection Overlay */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Adjusted spacing div for logo gap on desktop */}
          <div className="hidden md:block w-12 md:w-20" />

          <div className="hidden md:flex items-center gap-10 text-[13px] font-semibold tracking-wide uppercase text-white md:text-black/70">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="hover:text-black transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-black transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="flex items-center gap-6 ml-auto md:ml-0">
            <div className="flex items-center gap-4">
              <LanguageSwitcher className="hidden sm:flex" />
              <Link to="/candidate-space" className="hidden sm:flex px-5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white md:text-black/70 hover:text-white md:hover:text-black border border-white/20 md:border-black/10 rounded-full transition-all duration-300 hover:border-white/40 md:hover:border-black/20 hover:bg-white/10 md:hover:bg-black/5">
                {t('common.candidateSpace')}
              </Link>
            </div>
            <MagneticButton variant="primary" className="hidden sm:flex px-6 py-2 text-[10px] font-bold uppercase tracking-[0.1em] bg-white text-black border-none hover:bg-white/90 shadow-xl transition-all">
              {t('common.bookCall')}
            </MagneticButton>

            <button
              className="md:hidden text-white md:text-black p-2 relative z-50 pointer-events-auto flex items-center justify-center bg-black/40 md:bg-transparent rounded-full backdrop-blur-md"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" x2="20" y1="12" y2="12" />
                  <line x1="4" x2="20" y1="6" y2="6" />
                  <line x1="4" x2="20" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-24 left-6 right-6 p-6 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col gap-6 md:hidden pointer-events-auto z-50"
          >
            <div className="flex flex-col gap-4 text-base font-semibold tracking-wide text-white/90">
              {navLinks.map((link) => (
                link.isRoute ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 border-b border-white/10 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="py-3 border-b border-white/10 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                )
              ))}
              <div className="pt-2 flex flex-col gap-4">
                <Link
                  to="/candidate-space"
                  className="py-2 text-center border font-bold border-white/20 rounded-full hover:bg-white/10 transition-colors uppercase text-[12px] tracking-wider text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Candidate Space
                </Link>
                <a
                  href="#"
                  className="py-3 text-center bg-white text-black rounded-full font-bold uppercase text-[12px] tracking-wider"
                  onClick={(e) => { e.preventDefault(); setMobileMenuOpen(false); }}
                >
                  Book a strategic call
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
