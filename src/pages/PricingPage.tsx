import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';
import { Plus, Minus, ArrowRight, Check } from 'lucide-react';

export function PricingPage() {
  const { t } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const marquees = (t('pricingPage.marquee', { returnObjects: true }) as string[]) || [];
  const faqItems = (t('pricingPage.faq.items', { returnObjects: true }) as any[]) || [];
  const featuresFreelance = (t('pricingPage.pricing.freelance.features', { returnObjects: true }) as string[]) || [];
  const featuresPermanent = (t('pricingPage.pricing.permanent.features', { returnObjects: true }) as string[]) || [];

  return (
    <div className="min-h-screen bg-[var(--color-tribu-bg)] text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)] font-sans">
      <div className="noise-overlay" />
      <Navbar />

      <main className="pt-[calc(8rem-75px)] overflow-hidden">
        
        {/* 1. HERO SECTION */}
        <motion.section 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto px-6 pt-20 md:pt-32 pb-24 text-center relative z-10"
        >
          <motion.div variants={itemVariants} className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a928a]">
              {t('pricingPage.hero.tagline')}
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-5xl sm:text-7xl md:text-[5rem] font-bold tracking-tight text-white leading-[1.05] mb-8">
            {t('pricingPage.hero.title')} <br />
            <span className="text-[#84A232] italic pr-4 pb-2 inline-block">
              {t('pricingPage.hero.titleItalic')}
            </span>
          </motion.h1>
          
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-[#8a928a] max-w-2xl mx-auto leading-relaxed mb-12">
            {t('pricingPage.hero.description')}
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/candidate-space" className="w-full sm:w-auto px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300">
              {t('pricingPage.hero.btnPrimary')}
            </Link>
            <Link to="/expertise" className="w-full sm:w-auto px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] text-white bg-[#4a7c59] hover:bg-[#3d6a4a] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(74,124,89,0.3)]">
              {t('pricingPage.hero.btnSecondary')}
            </Link>
          </motion.div>
        </motion.section>

        {/* 2. INFINITE MARQUEE */}
        <section className="relative w-full py-10 md:py-16 overflow-hidden border-y border-white/5 bg-white/[0.02]">
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[var(--color-tribu-bg)] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[var(--color-tribu-bg)] to-transparent z-10 pointer-events-none" />
          
          <motion.div 
            className="flex whitespace-nowrap items-center w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          >
            {/* Double the array for seamless loop */}
            {[...marquees, ...marquees].map((text, idx) => (
              <div key={idx} className="flex items-center">
                <span className="text-4xl md:text-6xl font-bold tracking-tighter text-white/10 uppercase px-8 md:px-16">
                  {text}
                </span>
                {idx !== [...marquees, ...marquees].length - 1 && (
                  <span className="text-white/20 text-3xl">✺</span>
                )}
              </div>
            ))}
          </motion.div>
        </section>

        {/* 3. QUOTE SECTION */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
          className="max-w-4xl mx-auto px-6 py-32 md:py-48 text-center"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-tight text-white mb-12">
            "{t('pricingPage.quote.text')} <span className="italic text-[#84A232]">{t('pricingPage.quote.italicWord')}</span>"
          </motion.h2>
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-2">
            <span className="text-lg font-bold text-white">{t('pricingPage.quote.author')}</span>
            <span className="text-sm font-medium uppercase tracking-widest text-[#8a928a]">{t('pricingPage.quote.role')}</span>
          </motion.div>
        </motion.section>

        {/* 4. PRICING CARDS */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
          className="max-w-6xl mx-auto px-6 pb-32"
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">{t('pricingPage.pricing.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            {/* Subtle glow behind cards */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1/2 bg-[#4a7c59]/20 blur-[120px] rounded-full pointer-events-none" />

            {/* Freelance Card */}
            <motion.div variants={itemVariants} className="glass-card rounded-[2rem] p-10 md:p-14 relative overflow-hidden group border-white/10 hover:border-white/20 transition-colors">
              <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/70">
                {t('pricingPage.pricing.freelance.badge')}
              </div>
              <h3 className="text-3xl mb-2 font-bold text-white">{t('pricingPage.pricing.freelance.title')}</h3>
              <div className="text-4xl font-black text-[#84A232] tracking-tight mb-8">
                {t('pricingPage.pricing.freelance.price')}
              </div>
              <p className="text-[#8a928a] leading-relaxed mb-10 min-h-[48px]">
                {t('pricingPage.pricing.freelance.description')}
              </p>
              
              <ul className="space-y-4 mb-12">
                {featuresFreelance.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-[#84A232] shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-white/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/candidate-space" className="w-full flex items-center justify-between px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-bold uppercase tracking-widest text-white mt-auto">
                {t('pricingPage.pricing.freelance.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Permanent Card */}
            <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-10 md:p-14 relative overflow-hidden group">
              {/* Green glow inside white card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#84A232]/10 blur-[80px] rounded-full pointer-events-none" />
              
              <div className="mb-6 inline-block px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-xs font-bold uppercase tracking-widest text-black/70">
                {t('pricingPage.pricing.permanent.badge')}
              </div>
              <h3 className="text-3xl mb-2 font-bold text-black">{t('pricingPage.pricing.permanent.title')}</h3>
              <div className="text-4xl font-black text-black tracking-tight mb-8">
                {t('pricingPage.pricing.permanent.price')}
              </div>
              <p className="text-black/60 leading-relaxed mb-10 min-h-[48px]">
                {t('pricingPage.pricing.permanent.description')}
              </p>
              
              <ul className="space-y-4 mb-12">
                {featuresPermanent.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <Check className="w-5 h-5 text-[#84A232] shrink-0 mt-0.5" />
                    <span className="text-[15px] font-medium text-black/80">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link to="/candidate-space" className="w-full flex items-center justify-between px-8 py-4 rounded-full bg-black text-white hover:bg-black/90 transition-colors text-sm font-bold uppercase tracking-widest mt-auto shadow-xl shadow-black/10">
                {t('pricingPage.pricing.permanent.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </motion.section>

        {/* 5. INTERACTIVE FAQ */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}
          className="max-w-4xl mx-auto px-6 py-24 border-t border-white/5"
        >
          <motion.div variants={itemVariants} className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white mb-2">{t('pricingPage.faq.title')}</h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <motion.div variants={itemVariants} key={idx} className="border border-white/10 rounded-2xl bg-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold text-white pr-8">{item.q}</span>
                  <div className="shrink-0 p-2 rounded-full border border-white/10 bg-white/5 text-white">
                    {openFaq === idx ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 md:px-8 pb-8 pt-0 text-[#8a928a] leading-relaxed text-[15px] max-w-3xl">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. PARTNER CTA */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
          className="py-32 text-center px-6 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#84A232]/5 to-transparent pointer-events-none" />
          
          <motion.h2 variants={itemVariants} className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-12">
            {t('pricingPage.cta.title')} <span className="italic text-[#84A232]">{t('pricingPage.cta.italic')}</span>
          </motion.h2>
          
          <motion.div variants={itemVariants}>
            <Link to="/candidate-space" className="inline-flex items-center px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs text-black bg-white hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              {t('pricingPage.cta.btn')}
            </Link>
          </motion.div>
        </motion.section>

      </main>

      <Footer />
    </div>
  );
}
