import React from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

export function Footer() {
  const { t } = useTranslation();
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const navLinks = [
    { label: t('nav.model'), href: '#model' },
    { label: t('nav.protocol'), href: '#protocol' },
    { label: t('nav.talent'), href: '#talent' },
    { label: t('nav.transparency'), href: '#transparency' },
    { label: t('nav.about'), href: '/about', isRoute: true },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (isLandingPage) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <footer className="bg-[#FFFFFF] border-t border-black/5 pt-24 pb-12 overflow-hidden relative z-[10001]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">
        
        {/* Main Single/Two Line Horizontal Layout Container */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          
          {/* Status & Logo */}
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img src="/assets/tribu-logo-jungle.png" alt="TRIBU" className="h-24 w-auto object-contain brightness-0" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#84A232] animate-pulse" />
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                {t('footer.status')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-bold uppercase tracking-widest text-gray-500">
            {navLinks.map((link) => (
              link.isRoute ? (
                <Link
                  key={link.href}
                  to={link.href}
                  className="hover:text-black transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={isLandingPage ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="hover:text-black transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

        </div>

        {/* Secondary Info / Legal Row */}
        <div className="mt-20 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <div>
            <span>© {new Date().getFullYear()} TRIBU — {t('footer.rights')}</span>
            <span className="hidden md:block mx-4">•</span>
            <span className="text-[#84A232]">{t('footer.systemsOperational')}</span>
          </div>

          <div className="flex items-center gap-8">
            <Link to="/legal" className="hover:text-black transition-colors">{t('footer.legalNotice')}</Link>
            <Link to="/privacy" className="hover:text-black transition-colors">{t('footer.privacyPolicy')}</Link>
            <Link to="/terms" className="hover:text-black transition-colors">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
