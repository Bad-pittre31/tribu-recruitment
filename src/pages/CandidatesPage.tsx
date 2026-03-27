import React from 'react';
import { motion } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { DashboardPreview } from '../components/DashboardPreview';
import {
  Calendar, FileText, Bell, CreditCard, MessageSquare,
  Activity, CheckCircle2
} from 'lucide-react';

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
  return (
    <h2
      className={`text-4xl md:text-5xl lg:text-6xl tracking-[-1px] leading-[1.05] ${className}`}
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
      className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-[#4a6a24]/30 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-[#F8FAF6] flex items-center justify-center mb-6 group-hover:bg-[#172008] transition-colors duration-300">
        <Icon className="w-5 h-5 text-[#4a6a24] group-hover:text-[#caff04] transition-colors duration-300" />
      </div>
      <h3 className="text-xl text-[#172008] mb-3 tracking-tight font-semibold" style={font.body}>
        {title}
      </h3>
      <p className="text-gray-500 text-sm leading-relaxed" style={font.body}>
        {desc}
      </p>
    </motion.div>
  );
}

export function CandidatesPage() {
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
              Candidate Experience
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-[84px] text-[#172008] italic leading-[0.95] tracking-tight"
              style={font.heading}
            >
              A smarter space for candidates
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed mb-16 font-medium"
            style={font.body}
          >
            TRIBU gives candidates and freelancers a premium operational space to manage missions, submit worked days, access documents, follow timelines, and stay aligned every step of the way.
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
            <Badge className="border-gray-200 bg-gray-50 text-gray-500 mb-6">Built for real life</Badge>
            <SectionHeading className="mb-6 mx-auto max-w-3xl text-[#172008]">
              More than recruitment.<br />A better day-to-day experience.
            </SectionHeading>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              TRIBU supports candidates not only during the recruitment phase, but throughout their entire mission lifecycle with a smart, structured, and premium operational experience.
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
            <Badge className="mb-6 border-[#caff04]/20 bg-[#caff04]/10 text-[#caff04]">Inside the portal</Badge>
            <SectionHeading className="mb-6 text-white">
              A candidate dashboard designed to make missions smoother.
            </SectionHeading>
            <p className="text-lg text-white/60 leading-relaxed max-w-lg mb-8" style={font.body}>
              The portal is designed to simplify operational follow-up, reduce admin friction, and give candidates complete visibility over their ecosystem.
            </p>
            <ul className="space-y-4">
              {['Interactive worked days calendar', 'Centralized documents & contracts', 'Live payment estimates', 'Automated alert center'].map((item, i) => (
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
                  <div className="text-2xl text-white mb-1" style={font.heading}>Timesheets</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>Submission made easy</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#2a3a12] to-[#4a6a24] p-6 backdrop-blur-md shadow-lg">
                  <CreditCard className="w-6 h-6 text-white mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>11,000€</div>
                  <div className="text-xs text-white/70 font-medium tracking-wide uppercase" style={font.body}>Estimated Revenue</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <FileText className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>Documents</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>Always secure</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <Activity className="w-6 h-6 text-white/60 mb-4" />
                  <div className="text-2xl text-white mb-1" style={font.heading}>Timeline</div>
                  <div className="text-xs text-white/50 font-medium tracking-wide uppercase" style={font.body}>Mission tracking</div>
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
            <Badge className="border-[#4a6a24]/20 bg-[#caff04]/20 text-[#4a6a24] mb-6">Why it matters</Badge>
            <SectionHeading className="text-[#172008]">
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
                className="rounded-2xl border border-gray-100 bg-white p-6 py-10 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow"
              >
                <div className="text-xs text-gray-400 font-medium uppercase tracking-widest mb-2" style={font.body}>{stat.label}</div>
                <div className="text-3xl lg:text-4xl text-[#172008] tracking-tight" style={font.heading}>{stat.value}</div>
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
            This candidate experience reflects TRIBU's broader philosophy: better systems create better relationships and better outcomes. We don't just place candidates — we partner with them long-term.
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
            <Badge className="border-gray-200 bg-gray-50 text-gray-500 mb-6">Join TRIBU</Badge>
            <h2
              className="text-5xl md:text-7xl text-[#172008] leading-[1.05] tracking-tight mb-6"
              style={font.heading}
            >
              A more modern candidate experience starts here.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              From mission follow-up to documents, reminders, and worked-day submission, TRIBU gives candidates a smarter space to operate with confidence.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
