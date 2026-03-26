import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';

export function LegalNotice() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)]">
      <Navbar />
      <main className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 text-black">
          {t('legal.notice.title')}
        </h1>
        
        <div className="prose prose-lg prose-gray max-w-none text-gray-600">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.notice.editorTitle')}</h2>
            <p>{t('legal.notice.editorText')}</p>
            <ul className="list-none pl-0">
              <li><strong>{t('legal.notice.company')}</strong> TRIBU</li>
              <li><strong>{t('legal.notice.president')}</strong> Raphael Paya</li>
              <li><strong>{t('legal.notice.siren')}</strong> 935 185 660</li>
              <li><strong>{t('legal.notice.phone')}</strong> 09 70 70 16 90</li>
              <li><strong>{t('legal.notice.email')}</strong> contact@tribu-recruitment.com</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.notice.hostingTitle')}</h2>
            <p>{t('legal.notice.hostingText')}</p>
            <ul className="list-none pl-0">
              <li><strong>Vercel Inc.</strong></li>
              <li>440 N Barranca Ave #4133</li>
              <li>Covina, CA 91731</li>
              <li>États-Unis</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.notice.activityTitle')}</h2>
            <p>{t('legal.notice.activityText')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.notice.ipTitle')}</h2>
            <p>{t('legal.notice.ipText')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
