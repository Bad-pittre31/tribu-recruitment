import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/src/utils/cn';
import { useTranslation } from '../contexts/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { t } = useTranslation();
  const { scrollY } = useScroll();
  const location = useLocation();

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
    { label: t('nav.home'), href: '/', isRoute: true },
    { label: t('nav.candidates'), href: '/candidates', isRoute: true },
    { label: t('nav.about'), href: '/about', isRoute: true },
    { label: t('nav.aiRecruitment'), href: '/ai-recruitment', isRoute: true },
  ];

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

      {/* Main Container */}
      <div className="w-full max-w-5xl relative pointer-events-none flex justify-end md:justify-center">
        <div className={cn(
          "relative flex items-center justify-between rounded-full px-8 py-3 transition-all duration-700 pointer-events-auto overflow-hidden",
          "backdrop-blur-2xl border shadow-[0_8px_32_rgba(0,0,0,0.1)]",
          isScrolled ? "bg-white/10 md:bg-white/10 border-white/30 py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.15)]" : "bg-white/5 md:bg-white/5 border-white/20"
        )}>
          {/* Glossy Reflection Overlay */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

          {/* Spacer for logo gap on desktop */}
          <div className="hidden md:block w-12 md:w-20" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-[13px] font-semibold tracking-wide uppercase text-white md:text-black/70">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={cn(
                  "hover:text-black transition-colors duration-300 whitespace-nowrap",
                  location.pathname === link.href && "text-black"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side: Language Switcher + Green CTA */}
          <div className="flex items-center gap-4 ml-auto md:ml-0 md:pl-6">
            <LanguageSwitcher className="hidden sm:flex" />

            {/* Green ESPACE CANDIDAT CTA */}
            <Link
              to="/candidate-space"
              className="hidden sm:flex items-center px-5 py-2 text-[10px] font-bold uppercase tracking-[0.1em] text-white bg-[#4a7c59] hover:bg-[#3d6a4a] rounded-full transition-all duration-300 shadow-md hover:shadow-lg whitespace-nowrap"
            >
              {t('common.candidateSpace')}
            </Link>

            {/* Mobile Hamburger */}
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
                <Link
                  key={link.label}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "py-3 border-b border-white/10 hover:text-white transition-colors",
                    location.pathname === link.href && "text-white"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 flex flex-col gap-4">
                {/* Language switcher in mobile menu */}
                <div className="flex justify-center py-2">
                  <LanguageSwitcher className="!text-white/70 [&_button]:!text-white/50 [&_button.text-black]:!text-white [&_span]:!text-white/30" />
                </div>
                <Link
                  to="/candidate-space"
                  className="py-3 text-center bg-[#4a7c59] text-white rounded-full font-bold uppercase text-[12px] tracking-wider hover:bg-[#3d6a4a] transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t('common.candidateSpace')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
