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
      <section className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 lg:px-24 pt-16 md:pt-24 pb-16">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          {/* Left: Content */}
          <div className="flex-1 max-w-2xl">
            {/* Social proof badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="liquid-glass rounded-full px-3 py-1.5 inline-flex items-center gap-2 mb-6"
            >
              <span className="text-xs font-medium text-black/70" style={font.body}>
                AI Recruitment, the TRIBU way
              </span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-[#FF801E] text-[#FF801E]" />
                ))}
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-[75px] text-black leading-[1.05] tracking-[-2px] mb-6"
              style={font.heading}
            >
              Human recruitment. Enhanced by intelligent systems.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-black/50 leading-relaxed tracking-[-1px] mb-8 max-w-lg"
              style={font.body}
            >
              TRIBU combines expert recruitment, AI-powered candidate presentation, workflow automation, and a smart talent experience to deliver faster, sharper, and more premium hiring outcomes.
            </motion.p>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap gap-6"
            >
              {['AI-enhanced candidate dossiers', 'Automated recruitment workflows', 'Smart candidate portal'].map((item) => (
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
            <Badge>Our approach</Badge>
            <Heading className="mb-6 max-w-3xl mx-auto">
              AI is not replacing recruitment. It is refining it.
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed mb-16" style={font.body}>
              TRIBU uses AI to improve precision, speed, clarity, candidate presentation, and follow-up quality — while keeping the recruiter's judgment, relationship-building, and hiring intuition at the center of every decision.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: 'Human decision-making stays central', desc: 'AI assists and enhances — it never replaces the recruiter\'s judgment, empathy, and strategic intuition.' },
              { icon: Zap, title: 'AI improves structure, consistency & speed', desc: 'From candidate evaluation to client presentation, every step becomes faster, cleaner, and more reliable.' },
              { icon: Star, title: 'Premium experience for everyone', desc: 'Both candidates and clients benefit from a more polished, transparent, and professional recruitment journey.' },
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
            <Badge>Miixeo inside</Badge>
            <Heading className="max-w-3xl mx-auto">
              Every candidate presented with more clarity, more depth, and more impact.
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
                Structured, client-ready candidate dossiers.
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6" style={font.body}>
                TRIBU uses the Miixeo engine to generate structured, client-ready candidate dossiers. Each dossier includes a clear summary, positioning, and competency presentation that goes far beyond a standard CV. AI-based matching and scoring highlight fit with the role, while DISC personality profiling brings behavioral insight.
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
                      98% match
                    </div>
                  </div>
                  <div className="h-px bg-black/5" />
                  <div className="grid grid-cols-3 gap-3">
                    {['Technical', 'Leadership', 'Culture fit'].map((label, i) => (
                      <div key={i} className="text-center">
                        <div className="text-xl font-bold text-black" style={font.heading}>
                          {['9.2', '8.7', '9.5'][i]}
                        </div>
                        <div className="text-[10px] text-black/40 uppercase tracking-wider" style={font.body}>{label}</div>
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
                It gets smarter. Automatically.
              </h3>
              <p className="text-black/50 text-sm leading-relaxed mb-6" style={font.body}>
                Dossiers can include direct interview booking options inside the presentation flow. The result is a cleaner, more convincing, more premium candidate submission that evolves and improves with every engagement.
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
                  { icon: FileText, label: 'Competency dossier' },
                  { icon: Target, label: 'Match scoring' },
                  { icon: Users, label: 'DISC profile' },
                  { icon: Calendar, label: 'Interview booking' },
                  { icon: Eye, label: 'Client-ready presentation' },
                  { icon: Sparkles, label: 'AI-powered insights' },
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
      <section id="automation" className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge>Automation layer</Badge>
            <Heading className="mb-4">
              Critical recruitment actions, intelligently automated.
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              TRIBU has automated key workflow steps to improve responsiveness, follow-up quality, market visibility, and consistency across every engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: MessageSquare, title: 'Client follow-up automation', desc: 'Automated reminders and follow-up flows to reduce missed opportunities and improve responsiveness.' },
              { icon: Users, title: 'DISC personality analysis', desc: 'AI-supported behavioral profiling to enrich candidate understanding with actionable personality insights.' },
              { icon: Eye, title: 'Market monitoring', desc: 'Ongoing talent market watch, demand signals, and positioning insights to stay ahead of hiring trends.' },
              { icon: Target, title: 'AI-powered positioning', desc: 'Better candidate framing and sharper presentation aligned to client expectations and role requirements.' },
              { icon: Zap, title: 'Workflow acceleration', desc: 'Less admin friction, more recruiter focus on relationships and decision-making where it matters most.' },
              { icon: Shield, title: 'Recruitment consistency', desc: 'Repeatable premium quality across submissions, updates, and communication at every touchpoint.' },
            ].map((item, i) => (
              <FeatureCard key={i} icon={item.icon} title={item.title} desc={item.desc} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════
          SECTION 5 — SMART CANDIDATE PORTAL
      ═════════════════════════════════════════════════════════════════ */}
      <section id="portal" className="relative z-10 py-24 px-6 md:px-16 lg:px-24">
        {/* Background accent */}
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #319AFF 0%, transparent 70%)' }} />

        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge>Candidate experience</Badge>
            <Heading className="mb-4">
              A smarter candidate space, built for real operational life.
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              TRIBU does not stop at candidate placement. It provides a smart operational candidate portal designed to make mission follow-up smoother, clearer, and more modern.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left column */}
            <div className="space-y-4">
              {[
                { icon: Calendar, title: 'Interactive timesheet calendar', desc: 'Day-by-day worked days submission with a visual calendar interface.' },
                { icon: Clock, title: 'Reduced payment delays', desc: 'Better timesheet clarity means faster processing and fewer delays.' },
                { icon: FileText, title: 'Secure document hub', desc: 'Contracts, NDAs, and mission documents always accessible.' },
                { icon: Bell, title: 'AI reminders & warnings', desc: 'Smart alerts for upcoming actions or missing steps to keep missions on track.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-black/50" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black mb-1" style={font.heading}>{item.title}</h4>
                    <p className="text-black/40 text-xs leading-relaxed" style={font.body}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right column */}
            <div className="space-y-4">
              {[
                { icon: Activity, title: 'Mission timeline visibility', desc: 'Track progress, milestones, and remaining days at a glance.' },
                { icon: TrendingUp, title: 'Revenue estimation', desc: 'See projected earnings based on your TJM and worked days.' },
                { icon: Layers, title: 'Better transparency', desc: 'Full visibility into economics, fees, and mission structure.' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="liquid-glass-card rounded-2xl p-5 flex items-start gap-4"
                >
                  <div className="liquid-glass rounded-full w-9 h-9 flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-black/50" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-black mb-1" style={font.heading}>{item.title}</h4>
                    <p className="text-black/40 text-xs leading-relaxed" style={font.body}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Mini feature cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { icon: CheckCircle2, label: 'Smooth follow-up' },
                  { icon: Send, label: 'Day-to-day clarity' },
                ].map((item, i) => (
                  <div key={i} className="liquid-glass rounded-xl p-3 flex items-center gap-2">
                    <item.icon className="w-3.5 h-3.5 text-black/40" />
                    <span className="text-[11px] text-black/50 font-medium" style={font.body}>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
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
            <Badge>Why it matters</Badge>
            <Heading>
              Better structure creates better recruitment outcomes.
            </Heading>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="liquid-glass-strong rounded-3xl p-8 md:p-12"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { value: 'Sharper', label: 'Candidate positioning' },
                { value: 'Faster', label: 'Submission workflows' },
                { value: 'Premium', label: 'Client experience' },
                { value: 'Less', label: 'Friction after placement' },
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
            TRIBU's AI layer improves the quality of delivery at multiple stages: candidate evaluation, presentation, follow-up, onboarding, and mission monitoring — creating compounding value throughout the entire recruitment lifecycle.
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
            <Badge>The TRIBU difference</Badge>
            <Heading className="mb-4">
              Not a traditional recruitment firm. Not a generic AI tool.
            </Heading>
            <p className="text-base text-black/50 max-w-2xl mx-auto leading-relaxed" style={font.body}>
              TRIBU sits at the intersection of premium recruitment, intelligent automation, and modern talent operations. The promise is not "more AI for the sake of AI". The promise is a better recruitment experience for both clients and candidates.
            </p>
          </motion.div>

          {/* 3 Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: FileText,
                title: 'Premium candidate presentation',
                desc: 'AI-powered competency dossiers that go far beyond raw CVs. Structured, scored, and client-ready from the first interaction.',
              },
              {
                icon: Zap,
                title: 'Smarter recruiter operations',
                desc: 'Automated follow-ups, market intelligence, and workflow acceleration that let recruiters focus on what humans do best — build relationships.',
              },
              {
                icon: Users,
                title: 'Better talent experience',
                desc: 'A dedicated candidate portal with mission tracking, timesheet management, document access, and AI-powered reminders for seamless operations.',
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
          SECTION 8 — FINAL CTA
      ═════════════════════════════════════════════════════════════════ */}
      <section id="cta" className="relative z-10 py-32 px-6 md:px-16 lg:px-24">
        {/* Background accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-15 pointer-events-none" style={{ background: 'radial-gradient(circle, #60B1FF 0%, transparent 60%)' }} />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <Heading className="mb-6">
              See how TRIBU turns recruitment into a smarter system.
            </Heading>
            <p className="text-base text-black/50 max-w-xl mx-auto leading-relaxed mb-10" style={font.body}>
              Discover how our AI-powered recruitment infrastructure helps present candidates better, automate key actions, and create a more fluid experience for clients and talent.
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-32 pt-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center text-black/30 text-xs" style={font.body}>
          <span>© 2025 TRIBU — All rights reserved.</span>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-black/50 transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-black/50 transition-colors">Terms</Link>
            <Link to="/legal-notice" className="hover:text-black/50 transition-colors">Contact</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
