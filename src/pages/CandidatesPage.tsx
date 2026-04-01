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

const font = {
  heading: { fontFamily: "'Instrument Serif', serif" },
  body: { fontFamily: "'Barlow', sans-serif" },
};

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium tracking-wider uppercase ${className}`}
      style={font.body}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const cleanClassName = className.replace(/text-\[#[a-fA-F0-9]+\]|text-white/g, '').trim();
  return (
    <h2
      className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent ${cleanClassName}`}
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
      className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#4a6a24]/30 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#F8FAF6] flex items-center justify-center mb-6 group-hover:bg-[#172008] transition-colors duration-300">
        <Icon className="w-5 h-5 text-[#4a6a24] group-hover:text-[#caff04] transition-colors duration-300" />
      </div>
      <h3 className="text-xl text-[#172008] mb-3 tracking-tight font-bold">
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed" style={font.body}>
        {desc}
      </p>
    </motion.div>
  );
}

export function CandidatesPage() {
  const { t } = useTranslation();

  const features = [
    { icon: Calendar, title: t('candidatesPage.features.cras.title'), desc: t('candidatesPage.features.cras.desc') },
    { icon: Activity, title: t('candidatesPage.features.timeline.title'), desc: t('candidatesPage.features.timeline.desc') },
    { icon: Bell, title: t('candidatesPage.features.reminders.title'), desc: t('candidatesPage.features.reminders.desc') },
    { icon: FileText, title: t('candidatesPage.features.documents.title'), desc: t('candidatesPage.features.documents.desc') },
    { icon: CreditCard, title: t('candidatesPage.features.finance.title'), desc: t('candidatesPage.features.finance.desc') },
    { icon: MessageSquare, title: t('candidatesPage.features.support.title'), desc: t('candidatesPage.features.support.desc') },
  ];

  return (
    <div className="min-h-screen bg-white text-[#172008] selection:bg-[#caff04] selection:text-[#172008] overflow-x-hidden">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[95vh] flex flex-col justify-center items-center pt-32 pb-24 overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260228_065522_522e2295-ba22-457e-8fdb-fbcd68109c73.mp4"
            type="video/mp4"
          />
        </video>

        {/* Removed heavy dark grey overlay, replaced with a very subtle fade to white at the bottom */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/30 via-transparent to-white" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <div
              className="text-[#172008]/60 font-medium uppercase text-sm md:text-base mb-4 tracking-[4px]"
              style={font.body}
            >
              {t('candidatesPage.hero.badge')}
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-[84px] font-bold tracking-tight leading-[1.05] pb-2"
            >
              <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
                {t('candidatesPage.hero.title')}
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-16 font-medium"
            style={font.body}
          >
            {t('candidatesPage.hero.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="rounded-2xl p-3 md:p-4 bg-white/40 border border-white/60 backdrop-blur-xl shadow-[0_25px_80px_-12px_rgba(0,0,0,0.08)] relative">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-none rounded-2xl" />
                  <DashboardPreview />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 2 — INTRO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 bg-white z-20">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionHeading className="mb-6 mx-auto max-w-3xl text-[#172008]">
              {t('candidatesPage.intro.title')}
            </SectionHeading>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              {t('candidatesPage.intro.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 3 — FEATURE BLOCKS
      ═════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-24 md:py-32 px-6 bg-[#F8FAF6]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 4 — CANDIDATE DASHBOARD EXPERIENCE
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-[#172008] text-white overflow-hidden relative border-y border-[#2a3a12]">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#caff04] opacity-5 blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <SectionHeading className="mb-6 text-white">
              {t('candidatesPage.dashboard.title')}
            </SectionHeading>
            <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-8" style={font.body}>
              {t('candidatesPage.dashboard.description')}
            </p>
            <ul className="space-y-4">
              {[
                t('candidatesPage.dashboard.list.item1'),
                t('candidatesPage.dashboard.list.item2'),
                t('candidatesPage.dashboard.list.item3'),
                t('candidatesPage.dashboard.list.item4')
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/80 text-sm" style={font.body}>
                  <CheckCircle2 className="w-5 h-5 text-[#caff04]" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Cards showcasing the portal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Calendar className="w-6 h-6 text-[#caff04] mb-4" />
                  <div className="text-2xl text-white mb-1 font-bold tracking-tight">{t('candidatesPage.dashboard.cards.timesheets.title')}</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>{t('candidatesPage.dashboard.cards.timesheets.subtitle')}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a3a12] to-[#4a6a24] p-6 backdrop-blur-md shadow-lg">
                  <CreditCard className="w-6 h-6 text-white mb-4" />
                  <div className="text-2xl text-white mb-1 font-bold tracking-tight">{t('candidatesPage.dashboard.cards.revenue.title')}</div>
                  <div className="text-xs text-white/70 font-medium tracking-wide uppercase" style={font.body}>{t('candidatesPage.dashboard.cards.revenue.subtitle')}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <FileText className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1 font-bold tracking-tight">{t('candidatesPage.dashboard.cards.documents.title')}</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>{t('candidatesPage.dashboard.cards.documents.subtitle')}</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Activity className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1 font-bold tracking-tight">{t('candidatesPage.dashboard.cards.timeline.title')}</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>{t('candidatesPage.dashboard.cards.timeline.subtitle')}</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 5 — WHY IT MATTERS
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 bg-[#F8FAF6]">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <SectionHeading className="text-[#172008]">
              {t('candidatesPage.why.title')}
            </SectionHeading>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: t('candidatesPage.why.stats.label1'), value: t('candidatesPage.why.stats.value1') },
              { label: t('candidatesPage.why.stats.label2'), value: t('candidatesPage.why.stats.value2') },
              { label: t('candidatesPage.why.stats.label3'), value: t('candidatesPage.why.stats.value3') },
              { label: t('candidatesPage.why.stats.label4'), value: t('candidatesPage.why.stats.value4') },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-gray-100 bg-white p-6 py-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-2" style={font.body}>{stat.label}</div>
                <div className="text-3xl lg:text-4xl text-[#172008] tracking-tight font-bold">{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-500 text-sm max-w-2xl mx-auto leading-relaxed"
            style={font.body}
          >
            {t('candidatesPage.why.description')}
          </motion.p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 6 — CLOSING
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 relative bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6 pb-2"
            >
              <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
                {t('candidatesPage.closing.title')}
              </span>
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              {t('candidatesPage.closing.description')}
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
