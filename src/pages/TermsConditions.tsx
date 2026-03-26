import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';

export function TermsConditions() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)]">
      <Navbar />
      <main className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 text-black">
          {t('legal.terms.title')}
        </h1>
        
        <div className="prose prose-lg prose-gray max-w-none text-gray-600">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.terms.serviceTitle')}</h2>
            <p>{t('legal.terms.serviceText')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.terms.accessTitle')}</h2>
            <p>{t('legal.terms.accessText')}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('legal.terms.accessList1')}</li>
              <li>{t('legal.terms.accessList2')}</li>
              <li>{t('legal.terms.accessList3')}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.terms.tribuTitle')}</h2>
            <p>{t('legal.terms.tribuText')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.terms.platformTitle')}</h2>
            <p>{t('legal.terms.platformText')}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('legal.terms.platformList1')}</li>
              <li>{t('legal.terms.platformList2')}</li>
              <li>{t('legal.terms.platformList3')}</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.terms.modTitle')}</h2>
            <p>{t('legal.terms.modText')}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
