import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DashboardPreview } from '../components/DashboardPreview';
import {
  Calendar, FileText, Bell, CreditCard, MessageSquare,
  Clock, Activity, Eye, Zap, Shield, ChevronRight, CheckCircle2
} from 'lucide-react';

const font = {
  heading: { fontFamily: "'Instrument Serif', serif" },
  body: { fontFamily: "'Barlow', sans-serif" },
};

function Badge({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/70 backdrop-blur-md tracking-wider uppercase ${className}`}
      style={font.body}
    >
      {children}
    </div>
  );
}

function SectionHeading({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={`text-4xl md:text-5xl lg:text-6xl text-white tracking-[-1px] leading-[1.05] ${className}`}
      style={font.heading}
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
      className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 border border-white/5 group-hover:border-white/10 transition-colors">
        <Icon className="w-5 h-5 text-white/70" />
      </div>
      <h3 className="text-xl text-white mb-2 tracking-tight" style={font.body}>
        {title}
      </h3>
      <p className="text-white/50 text-sm leading-relaxed" style={font.body}>
        {desc}
      </p>
    </motion.div>
  );
}

export function CandidatesPage() {
  return (
    <div className="min-h-screen bg-[#0a0c0a] text-white selection:bg-[#e6f2e6] selection:text-[#0a0c0a] overflow-x-hidden">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-24 overflow-hidden">
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

        {/* Dark subtle overlay to ensure text readability */}
        <div className="absolute inset-0 z-[1] bg-black/40 bg-gradient-to-b from-black/80 via-black/20 to-black/80" />

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div
              className="text-white/80 font-medium uppercase text-sm md:text-base mb-4 tracking-[4px]"
              style={font.body}
            >
              Candidate Experience
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-[84px] text-white italic leading-[0.95] tracking-tight"
              style={font.heading}
            >
              A smarter space for candidates
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/60 text-lg max-w-3xl mx-auto leading-relaxed mb-10 font-medium"
            style={font.body}
          >
            TRIBU gives candidates and freelancers a premium operational space to manage missions, submit worked days, access documents, follow timelines, and stay aligned every step of the way.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 mb-20"
          >
            <Link
              to="/candidate-space"
              className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-300"
              style={font.body}
            >
              Access candidate space
            </Link>
            <button
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-3.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
              style={font.body}
            >
              See how it works
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full max-w-5xl mx-auto"
          >
            <div className="rounded-2xl p-3 md:p-4 bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none rounded-2xl" />
              <DashboardPreview />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 2 — INTRO
      ═════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 px-6 border-t border-white/5">
        <div className="absolute inset-x-0 top-0 h-[500px] bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge>Built for real life</Badge>
            <SectionHeading className="mb-6 mx-auto max-w-3xl">
              More than recruitment.<br />A better day-to-day experience.
            </SectionHeading>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              TRIBU supports candidates not only during the recruitment phase, but throughout their entire mission lifecycle with a smart, structured, and premium operational experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 3 — FEATURE BLOCKS
      ═════════════════════════════════════════════════════════════════ */}
      <section id="features" className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Calendar, title: 'Intuitive CRA submission', desc: 'Candidates can submit worked days directly through a clear interactive calendar, reducing friction and avoiding late timesheet validation.' },
              { icon: Activity, title: 'Mission timeline', desc: 'A visual timeline helps candidates track mission progress, key dates, and upcoming steps with more clarity.' },
              { icon: Bell, title: 'Smart reminders', desc: 'Automated reminders and AI-powered alerts help candidates stay on top of important actions, deadlines, and missing steps.' },
              { icon: FileText, title: 'Document hub', desc: 'All important documents are centralized in one place, including contracts, NDAs, and mission-related files.' },
              { icon: CreditCard, title: 'Payment simulation', desc: 'Candidates can access revenue or payment estimations based on their mission setup, helping them project more clearly.' },
              { icon: MessageSquare, title: 'Direct contact and support', desc: 'A clearer line to the right contact person for operational follow-up, documents, mission updates, and questions.' },
            ].map((feature, i) => (
              <FeatureCard key={i} icon={feature.icon} title={feature.title} desc={feature.desc} delay={i * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 4 — CANDIDATE DASHBOARD EXPERIENCE
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 border-y border-white/5 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-start"
          >
            <Badge>Inside the portal</Badge>
            <SectionHeading className="mb-6">
              A candidate dashboard designed to make missions smoother.
            </SectionHeading>
            <p className="text-lg text-white/50 leading-relaxed max-w-lg mb-8" style={font.body}>
              The portal is designed to simplify operational follow-up, reduce admin friction, and give candidates complete visibility over their ecosystem.
            </p>
            <ul className="space-y-4">
              {['Interactive worked days calendar', 'Centralized documents & contracts', 'Live payment estimates', 'Automated alert center'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/70 text-sm" style={font.body}>
                  <CheckCircle2 className="w-4 h-4 text-white/40" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Calendar className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>Timesheets</div>
                  <div className="text-xs text-white/40 font-medium tracking-wide uppercase" style={font.body}>Submission made easy</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-[#172008]/40 p-6 backdrop-blur-sm">
                  <CreditCard className="w-6 h-6 text-[#caff04] mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>11,000€</div>
                  <div className="text-xs text-white/40 font-medium tracking-wide uppercase" style={font.body}>Estimated Revenue</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <FileText className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>Documents</div>
                  <div className="text-xs text-white/40 font-medium tracking-wide uppercase" style={font.body}>Always secure</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                  <Activity className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>Timeline</div>
                  <div className="text-xs text-white/40 font-medium tracking-wide uppercase" style={font.body}>Mission tracking</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 5 — WHY IT MATTERS
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <Badge>Why it matters</Badge>
            <SectionHeading>
              Less friction. More clarity. Better follow-up.
            </SectionHeading>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {[
              { label: 'Fewer', value: 'delays' },
              { label: 'Clearer', value: 'operations' },
              { label: 'Better', value: 'visibility' },
              { label: 'Premium', value: 'experience' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 py-10 flex flex-col items-center justify-center text-center hover:bg-white/[0.04] transition-colors"
              >
                <div className="text-xs text-white/50 font-medium uppercase tracking-widest mb-2" style={font.body}>{stat.label}</div>
                <div className="text-3xl lg:text-4xl text-white tracking-tight" style={font.heading}>{stat.value}</div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-white/40 text-sm max-w-2xl mx-auto leading-relaxed"
            style={font.body}
          >
            This candidate experience reflects TRIBU's broader philosophy: better systems create better relationships and better outcomes. We don't just place candidates — we partner with them long-term.
          </motion.p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 6 — FINAL CTA
      ═════════════════════════════════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 relative border-t border-white/5">
        <div className="absolute inset-x-0 bottom-0 h-[500px] bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#172008] border-[#caff04]/20 text-[#caff04]">Join TRIBU</Badge>
            <h2
              className="text-5xl md:text-7xl text-white leading-[1.05] tracking-tight mb-6"
              style={font.heading}
            >
              A more modern candidate experience starts here.
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto leading-relaxed mb-10" style={font.body}>
              From mission follow-up to documents, reminders, and worked-day submission, TRIBU gives candidates a smarter space to operate with confidence.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/candidate-space"
                className="bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold hover:bg-white/90 transition-all duration-300"
                style={font.body}
              >
                Join the candidate space
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full text-sm font-medium border border-white/20 text-white hover:bg-white/5 transition-all duration-300"
                style={font.body}
              >
                Contact TRIBU
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
