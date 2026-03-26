import React from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';

export function PrivacyPolicy() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)]">
      <Navbar />
      <main className="pt-40 pb-32 max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-12 text-black">
          {t('legal.privacy.title')}
        </h1>
        
        <div className="prose prose-lg prose-gray max-w-none text-gray-600">
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.privacy.gdprTitle')}</h2>
            <p>{t('legal.privacy.gdprText')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.privacy.dataTitle')}</h2>
            <p>{t('legal.privacy.dataText')}</p>
            <ul className="list-disc pl-6 mb-4">
              <li>{t('legal.privacy.dataList1')}</li>
              <li>{t('legal.privacy.dataList2')}</li>
              <li>{t('legal.privacy.dataList3')}</li>
            </ul>
            <p>
              <strong>{t('legal.privacy.aiTitle')}</strong> {t('legal.privacy.aiText')}
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.privacy.candidateSpaceTitle')}</h2>
            <p>{t('legal.privacy.candidateSpaceText')}</p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold text-black mb-4 tracking-tight">{t('legal.privacy.rightsTitle')}</h2>
            <p>{t('legal.privacy.rightsText1')}</p>
            <p>
              {t('legal.privacy.rightsText2')}<br />
              <a href="mailto:contact@tribu-recruitment.com" className="text-black font-semibold hover:underline">contact@tribu-recruitment.com</a>
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
