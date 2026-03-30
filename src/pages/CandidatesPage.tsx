import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DashboardPreview } from '../components/DashboardPreview';
import {
  Calendar, FileText, Bell, CreditCard, MessageSquare,
  Activity, CheckCircle2
} from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';
import { cn } from '@/src/utils/cn';

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        "text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter leading-tight italic font-instrument",
        "bg-gradient-to-r from-[#19200B] via-[#4a7c59] to-[#19200B] bg-clip-text text-transparent",
        className
      )}
    >
      {children}
    </h2>
  );
}

const FeatureCard: React.FC<{ icon: any; title: string; desc: string; delay?: number }> = ({ icon: Icon, title, desc, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="rounded-3xl border border-gray-100 bg-white p-8 md:p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:border-tribu-brand-green/10 transition-all duration-500 group"
    >
      <div className="w-14 h-14 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:bg-tribu-brand-green group-hover:border-tribu-brand-green transition-all duration-500">
        <Icon className="w-6 h-6 text-tribu-brand-green group-hover:text-white transition-colors duration-500" />
      </div>
      <h3 className="text-2xl text-tribu-brand-green mb-4 tracking-tight font-bold font-sans">
        {title}
      </h3>
      <p className="text-gray-500 text-[15px] leading-relaxed font-sans">
        {desc}
      </p>
    </motion.div>
  );
}

export function CandidatesPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Calendar, title: t('candidatesPage.features.card1.title'), desc: t('candidatesPage.features.card1.desc') },
    { icon: Activity, title: t('candidatesPage.features.card2.title'), desc: t('candidatesPage.features.card2.desc') },
    { icon: Bell, title: t('candidatesPage.features.card3.title'), desc: t('candidatesPage.features.card3.desc') },
    { icon: FileText, title: t('candidatesPage.features.card4.title'), desc: t('candidatesPage.features.card4.desc') },
    { icon: CreditCard, title: t('candidatesPage.features.card5.title'), desc: t('candidatesPage.features.card5.desc') },
    { icon: MessageSquare, title: t('candidatesPage.features.card6.title'), desc: t('candidatesPage.features.card6.desc') },
  ];

  return (
    <div className="min-h-screen bg-white text-tribu-brand-green selection:bg-tribu-brand-green selection:text-white overflow-x-hidden font-sans">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-24 overflow-hidden bg-[#19200B]">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 mix-blend-overlay"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
            type="video/mp4"
          />
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#19200B]/80 via-[#19200B]/20 to-[#19200B]" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="mb-8"
          >
            <div className="text-white/40 font-bold uppercase text-xs md:text-sm mb-6 tracking-[0.4em] font-sans">
              {t('candidatesPage.hero.label')}
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] text-white font-bold italic leading-[0.9] tracking-tighter font-instrument">
              {t('candidatesPage.hero.title')}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "circOut" }}
            className="text-white/60 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-16 font-sans"
          >
            {t('candidatesPage.hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="rounded-[2.5rem] p-2 md:p-3 bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl relative">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-white/10 relative">
                  <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 2 — INTRO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative py-32 md:py-48 px-6 bg-white z-20">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
          >
            <SectionHeading className="mb-10 mx-auto max-w-4xl italic">
              {t('candidatesPage.intro.title')}<br />{t('candidatesPage.intro.subtitle')}
            </SectionHeading>
            <p className="text-xl md:text-2xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-sans">
              {t('candidatesPage.intro.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 3 — FEATURE BLOCKS
      ═════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-32 md:py-48 px-6 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {features.map((feature, i) => (
              <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 4 — CANDIDATE DASHBOARD EXPERIENCE
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 px-6 bg-tribu-brand-green text-white overflow-hidden relative border-y border-white/5">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full bg-white opacity-5 blur-[150px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="flex flex-col items-start"
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight italic font-instrument mb-8 text-white">
              {t('candidatesPage.portal.title')}
            </h2>
            <p className="text-lg md:text-xl text-white/60 leading-relaxed max-w-lg mb-12 font-sans">
              {t('candidatesPage.portal.description')}
            </p>
            <ul className="space-y-6">
              {[
                t('candidatesPage.portal.item1'),
                t('candidatesPage.portal.item2'),
                t('candidatesPage.portal.item3'),
                t('candidatesPage.portal.item4')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white/90 text-base font-medium font-sans">
                  <CheckCircle2 className="w-6 h-6 text-[#4a7c59]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cards showcasing the portal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-6 md:gap-8">
              <div className="space-y-6 md:space-y-8 pt-12">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                  <Calendar className="w-8 h-8 text-[#4a7c59] mb-6" />
                  <div className="text-3xl text-white mb-2 font-bold italic font-instrument">{t('candidatesPage.portal.visual1.title')}</div>
                  <div className="text-sm text-white/50 font-bold tracking-widest uppercase font-sans">{t('candidatesPage.portal.visual1.subtitle')}</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-[#4a7c59]/40 to-[#4a7c59]/10 p-8 backdrop-blur-2xl shadow-2xl">
                  <CreditCard className="w-8 h-8 text-white mb-6" />
                  <div className="text-3xl text-white mb-2 font-bold italic font-instrument">{t('candidatesPage.portal.visual2.title')}</div>
                  <div className="text-sm text-white/70 font-bold tracking-widest uppercase font-sans">{t('candidatesPage.portal.visual2.subtitle')}</div>
                </div>
              </div>
              <div className="space-y-6 md:space-y-8">
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                  <FileText className="w-8 h-8 text-white/40 mb-6" />
                  <div className="text-3xl text-white mb-2 font-bold italic font-instrument">{t('candidatesPage.portal.visual3.title')}</div>
                  <div className="text-sm text-white/50 font-bold tracking-widest uppercase font-sans">{t('candidatesPage.portal.visual3.subtitle')}</div>
                </div>
                <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl">
                  <Activity className="w-8 h-8 text-white/40 mb-6" />
                  <div className="text-3xl text-white mb-2 font-bold italic font-instrument">{t('candidatesPage.portal.visual4.title')}</div>
                  <div className="text-sm text-white/50 font-bold tracking-widest uppercase font-sans">{t('candidatesPage.portal.visual4.subtitle')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 5 — WHY IT MATTERS
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-32 md:py-48 px-6 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "circOut" }}
            className="mb-24"
          >
            <SectionHeading className="text-tribu-brand-green italic mb-8 mx-auto max-w-4xl">
              {t('candidatesPage.whyItMatters.title')}
            </SectionHeading>
            <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed font-sans">
               {t('candidatesPage.whyItMatters.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
            {[
              { label: t('candidatesPage.whyItMatters.statLabel1'), value: t('candidatesPage.whyItMatters.statValue1') },
              { label: t('candidatesPage.whyItMatters.statLabel2'), value: t('candidatesPage.whyItMatters.statValue2') },
              { label: t('candidatesPage.whyItMatters.statLabel3'), value: t('candidatesPage.whyItMatters.statValue3') },
              { label: t('candidatesPage.whyItMatters.statLabel4'), value: t('candidatesPage.whyItMatters.statValue4') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: "circOut" }}
                className="rounded-3xl border border-gray-100 bg-gray-50/50 p-10 flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-500"
              >
                <div className="text-xs text-tribu-brand-green/40 font-bold uppercase tracking-[0.3em] mb-4 font-sans">{stat.label}</div>
                <div className="text-2xl lg:text-3xl text-tribu-brand-green font-bold italic font-instrument group-hover:scale-110 transition-transform duration-500">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 6 — CLOSING
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-40 md:py-56 px-6 relative bg-tribu-brand-green">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "circOut" }}
          >
            <h2 className="text-5xl md:text-8xl text-white font-bold italic leading-[0.95] tracking-tighter font-instrument mb-12">
              {t('candidatesPage.closing.title')}
            </h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-16 font-sans">
              {t('candidatesPage.closing.description')}
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-6 rounded-full bg-white text-tribu-brand-green font-bold uppercase tracking-widest text-sm shadow-2xl hover:shadow-white/10 transition-all duration-300"
            >
              {t('talentPortal.cta')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
