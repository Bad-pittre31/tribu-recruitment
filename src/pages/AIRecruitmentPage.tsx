import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import {
  Star, Brain, Zap, Shield,
  Users, Target, FileText, Calendar, Clock, Bell,
  Activity, TrendingUp, Layers, MessageSquare, Eye,
  Sparkles, CheckCircle2, Send
} from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

// ─── Shared Styles ──────────────────────────────────────────────────────────

const font = {
  heading: { fontFamily: "'Fustat', sans-serif", fontWeight: 700 },
  body: { fontFamily: "'Inter', sans-serif" },
};

// ─── Badge Component ────────────────────────────────────────────────────────

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="liquid-glass rounded-full px-4 py-1.5 text-xs font-medium text-black/70 inline-block mb-5 tracking-wide"
      style={font.body}
    >
      {children}
    </div>
  );
}

// ─── Section Heading ────────────────────────────────────────────────────────

function Heading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-4xl md:text-5xl lg:text-[3.5rem] text-black tracking-[-2px] leading-[1.05] ${className}`}
      style={font.heading}
    >
      {children}
    </h2>
  );
}

// ─── Feature Card ───────────────────────────────────────────────────────────

function FeatureCard({ icon: Icon, title, desc, delay = 0 }: { icon: any; title: string; desc: string; delay?: number; key?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="liquid-glass-card rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300"
    >
      <div className="liquid-glass rounded-full w-10 h-10 flex items-center justify-center mb-4">
        <Icon className="w-[18px] h-[18px] text-black/60" />
      </div>
      <h3 className="text-lg text-black mb-2" style={font.heading}>
        {title}
      </h3>
      <p className="text-black/50 text-sm leading-relaxed" style={font.body}>
        {desc}
      </p>
    </motion.div>
  );
}



// ═══════════════════════════════════════════════════════════════════════════
// AI RECRUITMENT PAGE
// ═══════════════════════════════════════════════════════════════════════════

export function AIRecruitmentPage() {
  const { t } = useTranslation();
  return (
    <div
      className="bg-white text-black overflow-x-hidden relative"
      style={{ ...font.body, WebkitFontSmoothing: 'antialiased' }}
    >
      {/* ── Background Glow ──────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, #60B1FF 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-20 left-40 w-[400px] h-[400px] rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #319AFF 0%, transparent 70%)' }}
        />
      </div>

      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 pt-40 md:pt-60 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left: Content */}
          <div className="flex-1 max-w-2xl">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[75px] leading-[1.05] tracking-[-2px] mb-6"
              style={font.heading}
            >
              <span className="bg-gradient-to-r from-[#19200B] via-[#4a6a24] to-[#19200B] bg-clip-text text-transparent bold">
                {t('aiRecruitmentPage.hero.title')}
              </span>
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-black/50 leading-relaxed tracking-[-1px] mb-8 max-w-lg"
              style={font.body}
            >
              {t('aiRecruitmentPage.hero.description')}
            </motion.p>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {[
                t('aiRecruitmentPage.hero.trust.item1'),
                t('aiRecruitmentPage.hero.trust.item2'),
                t('aiRecruitmentPage.hero.trust.item3')
              ].map((item) => (
                <span key={item} className="liquid-glass rounded-full px-3 py-1 text-[11px] font-medium text-black/50">
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Glassy Orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex-1 flex justify-center items-center relative"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-[550px] scale-125"
              style={{
                mixBlendMode: 'multiply',
                filter: 'invert(1) hue-rotate(90deg) saturate(250%) brightness(1.1)',
              }}
            >
              <source src="https://future.co/images/homepage/glassy-orb/orb-purple.webm" type="video/webm" />
            </video>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 2 — INTRO / POSITIONING
      ═════════════════════════════════════════════════════════════════ */}
      <section id="approach" className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <Heading className="mb-6 max-w-3xl mx-auto">
              <span className="bg-gradient-to-r from-[#19200B] to-[#4a6a24] bg-clip-text text-transparent">
                {t('aiRecruitmentPage.approach.title')}
              </span>
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed mb-16" style={font.body}>
              {t('aiRecruitmentPage.approach.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: t('aiRecruitmentPage.approach.card1.title'), desc: t('aiRecruitmentPage.approach.card1.desc') },
              { icon: Zap, title: t('aiRecruitmentPage.approach.card2.title'), desc: t('aiRecruitmentPage.approach.card2.desc') },
              { icon: Star, title: t('aiRecruitmentPage.approach.card3.title'), desc: t('aiRecruitmentPage.approach.card3.desc') },
            ].map((item, i) => (
              <FeatureCard key={i} icon={item.icon} title={item.title} desc={item.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 3 — MIIXEO ENGINE / CANDIDATE PRESENTATION
      ═════════════════════════════════════════════════════════════════ */}
      <section id="miixeo" className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #60B1FF 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Heading className="max-w-3xl mx-auto">
              <span className="bg-gradient-to-r from-[#19200B] to-[#4a6a24] bg-clip-text text-transparent">
                {t('aiRecruitmentPage.miixeo.title')}
              </span>
            </Heading>
          </motion.div>

          {/* Row 1: Text left, Dossier mockup right */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl md:text-3xl text-black mb-4 tracking-[-1px]" style={font.heading}>
                {t('aiRecruitmentPage.miixeo.dossier.title')}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6" style={font.body}>
                {t('aiRecruitmentPage.miixeo.dossier.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="liquid-glass-card rounded-2xl p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/20 flex items-center justify-center text-xs font-semibold text-blue-700">SC</div>
                      <div>
                        <div className="text-sm font-medium text-black">Sarah Chen</div>
                        <div className="text-xs text-black/40">Senior React Engineer</div>
                      </div>
                    </div>
                    <div className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200">
                      {t('aiRecruitmentPage.miixeo.dossier.match')}
                    </div>
                  </div>
                  <div className="h-px bg-black/5" />
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: t('aiRecruitmentPage.miixeo.dossier.tech'), value: '9.2' },
                      { label: t('aiRecruitmentPage.miixeo.dossier.lead'), value: '8.7' },
                      { label: t('aiRecruitmentPage.miixeo.dossier.culture'), value: '9.5' }
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold text-black" style={font.heading}>
                          {item.value}
                        </div>
                        <div className="text-[10px] text-black/40 uppercase tracking-wider" style={font.body}>{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="h-px bg-black/5" />
                  <div className="flex flex-wrap gap-2">
                    {['React', 'TypeScript', 'Node.js', 'System Design', 'Team Lead'].map((tag) => (
                      <span key={tag} className="liquid-glass rounded-full px-2.5 py-1 text-[10px] text-black/50 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Row 2: Mini-cards left, Text right */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex-1"
            >
              <h3 className="text-2xl md:text-3xl text-black mb-4 tracking-[-1px]" style={font.heading}>
                {t('aiRecruitmentPage.miixeo.automation.title')}
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6" style={font.body}>
                {t('aiRecruitmentPage.miixeo.automation.description')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex-1 w-full"
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { icon: FileText, label: t('aiRecruitmentPage.miixeo.grid.item1') },
                  { icon: Target, label: t('aiRecruitmentPage.miixeo.grid.item2') },
                  { icon: Users, label: t('aiRecruitmentPage.miixeo.grid.item3') },
                  { icon: Calendar, label: t('aiRecruitmentPage.miixeo.grid.item4') },
                  { icon: Eye, label: t('aiRecruitmentPage.miixeo.grid.item5') },
                  { icon: Sparkles, label: t('aiRecruitmentPage.miixeo.grid.item6') },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="liquid-glass-card rounded-xl p-4 flex flex-col items-center text-center gap-2"
                  >
                    <div className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center">
                      <item.icon className="w-4 h-4 text-black/50" />
                    </div>
                    <span className="text-[11px] text-black/50 font-medium" style={font.body}>{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 4 — AUTOMATION LAYER
      ═════════════════════════════════════════════════════════════════ */}
      <section id="automation" className="relative z-[10000] py-32 md:py-48 px-6 md:px-16 lg:px-24 bg-tribu-brand-green overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Heading className="mb-4 text-white">
              <span className="bg-gradient-to-r from-[#caff04] via-white to-[#caff04] bg-clip-text text-transparent">
                {t('aiRecruitmentPage.automation.title')}
              </span>
            </Heading>
            <p className="text-base text-white/60 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              {t('aiRecruitmentPage.automation.description')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
            {[
              { icon: MessageSquare, title: t('aiRecruitmentPage.automation.card1.title'), desc: t('aiRecruitmentPage.automation.card1.desc') },
              { icon: Users, title: t('aiRecruitmentPage.automation.card2.title'), desc: t('aiRecruitmentPage.automation.card2.desc') },
              { icon: Eye, title: t('aiRecruitmentPage.automation.card3.title'), desc: t('aiRecruitmentPage.automation.card3.desc') },
              { icon: Target, title: t('aiRecruitmentPage.automation.card4.title'), desc: t('aiRecruitmentPage.automation.card4.desc') },
              { icon: Zap, title: t('aiRecruitmentPage.automation.card5.title'), desc: t('aiRecruitmentPage.automation.card5.desc') },
              { icon: Shield, title: t('aiRecruitmentPage.automation.card6.title'), desc: t('aiRecruitmentPage.automation.card6.desc') },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-all duration-300 group"
              >
                <div className="bg-[#F2F4F0] rounded-full w-10 h-10 flex items-center justify-center mb-4 group-hover:bg-[#172008] transition-colors duration-300">
                  <item.icon className="w-[18px] h-[18px] text-[#4a6a24] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="text-lg text-black mb-2" style={font.heading}>
                  {item.title}
                </h3>
                <p className="text-black/50 text-sm leading-relaxed" style={font.body}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ═════════════════════════════════════════════════════════════════
          SECTION 6 — WHY IT MATTERS
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >

            <Heading>
              {t('aiRecruitmentPage.why.title')}
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="liquid-glass-strong rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center text-white">
              {[
                { value: t('aiRecruitmentPage.why.stat1.value'), label: t('aiRecruitmentPage.why.stat1.label') },
                { value: t('aiRecruitmentPage.why.stat2.value'), label: t('aiRecruitmentPage.why.stat2.label') },
                { value: t('aiRecruitmentPage.why.stat3.value'), label: t('aiRecruitmentPage.why.stat3.label') },
                { value: t('aiRecruitmentPage.why.stat4.value'), label: t('aiRecruitmentPage.why.stat4.label') },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                >
                  <div
                    className="text-4xl md:text-5xl lg:text-6xl text-black mb-2 tracking-[-2px]"
                    style={font.heading}
                  >
                    {stat.value}
                  </div>
                  <div className="text-black/40 text-sm" style={font.body}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-center text-black/40 text-sm max-w-2xl mx-auto leading-relaxed mt-10"
            style={font.body}
          >
            {t('aiRecruitmentPage.why.description')}
          </motion.p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 7 — DIFFERENTIATION / TRIBU METHOD
      ═════════════════════════════════════════════════════════════════ */}
      <section id="method" className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Heading className="mb-4">
              <span className="bg-gradient-to-r from-[#19200B] to-[#4a6a24] bg-clip-text text-transparent">
                {t('aiRecruitmentPage.difference.title')}
              </span>
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              {t('aiRecruitmentPage.difference.description')}
            </p>
          </motion.div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: t('aiRecruitmentPage.difference.card1.title'),
                desc: t('aiRecruitmentPage.difference.card1.desc'),
              },
              {
                icon: Zap,
                title: t('aiRecruitmentPage.difference.card2.title'),
                desc: t('aiRecruitmentPage.difference.card2.desc'),
              },
              {
                icon: Users,
                title: t('aiRecruitmentPage.difference.card3.title'),
                desc: t('aiRecruitmentPage.difference.card3.desc'),
              },
            ].map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="liquid-glass-card rounded-2xl p-8 text-center group hover:shadow-xl transition-all duration-300"
              >
                <div className="liquid-glass-strong rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <pillar.icon className="w-6 h-6 text-black/50" />
                </div>
                <h3 className="text-xl text-black mb-3 tracking-[-1px]" style={font.heading}>
                  {pillar.title}
                </h3>
                <p className="text-black/50 text-sm leading-relaxed" style={font.body}>
                  {pillar.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 8 — FOOTER
      ═════════════════════════════════════════════════════════════════ */}
      <section id="footer" className="relative z-10 py-10 px-6 md:px-16 lg:px-24 border-t border-black/5">
        {/* Footer */}
        <div className="relative z-10 pt-4 flex flex-col md:flex-row justify-between items-center text-black/30 text-xs" style={font.body}>
          <span>{t('aiRecruitmentPage.footer.copy')}</span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-black/50 transition-colors">{t('aiRecruitmentPage.footer.privacy')}</Link>
            <Link to="/terms" className="hover:text-black/50 transition-colors">{t('aiRecruitmentPage.footer.terms')}</Link>
            <Link to="/legal-notice" className="hover:text-black/50 transition-colors">{t('aiRecruitmentPage.footer.contact')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
