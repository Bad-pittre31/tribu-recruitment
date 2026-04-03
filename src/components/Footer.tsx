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
    { label: t('nav.expertise'), href: '/expertise', isRoute: true },
    { label: t('nav.pricing'), href: '/pricing', isRoute: true },
    { label: t('nav.candidates'), href: '/candidates', isRoute: true },
    { label: t('nav.transparency'), href: '#transparency' },
    { label: t('nav.about'), href: '/about', isRoute: true },
    { label: t('nav.aiRecruitment'), href: '/ai-recruitment', isRoute: true },
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
    <footer className="bg-[#F7F6F1] border-t border-black/5 pt-16 pb-12 overflow-hidden relative z-[10001]">
      <div className="max-w-7xl mx-auto px-8 lg:px-12">

        {/* Main Horizontal Layout */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Logo & Status */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <Link to="/" className="inline-block">
              <img src="/assets/tribu-logo-jungle.png" alt="TRIBU" className="h-10 w-auto object-contain brightness-0" />
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-1.5 rounded-full bg-[#84A232] animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">
                {t('footer.status')}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-3 text-[10px] font-bold uppercase tracking-widest text-gray-500 max-w-2xl">
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
        <div className="mt-12 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          <div>
            <span>© {new Date().getFullYear()} TRIBU — {t('footer.rights')}</span>
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
