import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router-dom';
import {
    Users, Target, Briefcase, TrendingUp, Sparkles, ArrowRight,
    Calendar, FileText, CreditCard, Activity, Clock, CheckCircle2,
    Bell, Home, ListTodo, BarChart3, Shield, Send, Phone, ChevronRight,
    Star, Zap, Globe, Award
} from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';
import { LogoLoop } from '../components/ui/LogoLoop';

const companyLogos = [
  { src: "https://logo.clearbit.com/wmgpharma.de", alt: "WMG PHARMA", href: "https://wmgpharma.de" },
  { src: "https://logo.clearbit.com/barongo.com", alt: "BARONGO", href: "https://barongo.com" },
  { src: "https://logo.clearbit.com/lectra.com", alt: "LECTRA", href: "https://lectra.com" },
  { src: "https://logo.clearbit.com/go7.io", alt: "GO7", href: "https://go7.io" },
  { src: "https://logo.clearbit.com/criteo.com", alt: "CRITEO", href: "https://criteo.com" },
  { src: "https://logo.clearbit.com/cgi.com", alt: "CGI", href: "https://cgi.com" },
  { src: "https://logo.clearbit.com/lvmh.com", alt: "LVMH", href: "https://lvmh.com" },
  { src: "https://logo.clearbit.com/ag2rlamondiale.fr", alt: "AG2R", href: "https://ag2rlamondiale.fr" },
];

// ─── Timeline Data ──────────────────────────────────────────────────────────

const timelineItems = [
    {
        year: '2019',
        title: 'The Beginning',
        description: 'Raphael enters the world of consulting and recruitment in the French tech ecosystem, working across startups and scale-ups to place senior engineering and product talent.',
        icon: Briefcase,
        accent: '#4a6a24',
    },
    {
        year: '2021',
        title: 'Scaling Expertise',
        description: 'After two years of deep involvement in the recruitment industry, Raphael identifies critical inefficiencies: opaque pricing, commoditized CVs, and a broken trust model between agencies, clients, and candidates.',
        icon: Target,
        accent: '#3a5a18',
    },
    {
        year: '2023',
        title: 'The Vision Takes Shape',
        description: 'With over 1,000 candidates qualified, 20+ client partnerships, and years spent studying what makes recruitment fail—or succeed—the blueprint for a radically transparent model begins to crystallize.',
        icon: Sparkles,
        accent: '#2d4a0f',
    },
    {
        year: 'FEB 2025',
        title: 'TRIBU is Born',
        description: 'After 6 years of learning what the industry gets wrong, Raphael launches TRIBU — a premium, transparent tech recruitment agency powered by AI candidate intelligence, clear economics, and a belief that recruitment should reward everyone.',
        icon: Zap,
        accent: '#172008',
    },
    {
        year: 'TODAY',
        title: 'Building the Future',
        description: 'TRIBU now serves 20+ clients across France, with 10+ freelancers on active missions. Every placement is delivered through AI-powered competency dossiers, transparent pricing, and the Pay As They Stay™ model.',
        icon: Globe,
        accent: '#4a6a24',
    },
];

// ─── Stats ──────────────────────────────────────────────────────────────────

const stats = [
    { number: '6+', label: 'Years of Recruitment Experience', labelFr: "Ans d'expérience en recrutement" },
    { number: '20+', label: 'Client Partners in France', labelFr: 'Clients partenaires en France' },
    { number: '1000+', label: 'Candidates Qualified', labelFr: 'Candidats qualifiés' },
    { number: '10+', label: 'Freelancers on Active Missions', labelFr: 'Freelances en mission active' },
];

// ─── Values ─────────────────────────────────────────────────────────────────

const values = [
    {
        icon: Shield,
        title: 'Radical Transparency',
        titleFr: 'Transparence Radicale',
        desc: 'No hidden margins, no opaque pricing. Clients and talent know exactly how the economics work from day one.',
        descFr: 'Pas de marges cachées, pas de tarification opaque. Clients et talents savent exactement comment fonctionne l\'économie dès le premier jour.',
    },
    {
        icon: Award,
        title: 'Precision over Volume',
        titleFr: 'La précision plutôt que le volume',
        desc: 'We don\'t flood inboxes with CVs. Every candidate is carefully evaluated and delivered as a structured AI-powered competency dossier.',
        descFr: 'Nous n\'inondons pas les boîtes mail de CV. Chaque candidat est soigneusement évalué et livré sous forme de dossier de compétences structuré par l\'IA.',
    },
    {
        icon: Users,
        title: 'Long-term Alignment',
        titleFr: 'Alignement à long terme',
        desc: 'Recruitment doesn\'t end at placement. We stay aligned with both clients and talent to build relationships that actually last.',
        descFr: 'Le recrutement ne s\'arrête pas au placement. Nous restons alignés avec les clients et les talents pour construire des relations qui durent.',
    },
    {
        icon: Star,
        title: 'Shared Success',
        titleFr: 'Succès partagé',
        desc: 'When missions succeed, everyone benefits. Freelancers earn collaboration bonuses and permanent hires receive success rewards.',
        descFr: 'Quand les missions réussissent, tout le monde en bénéficie. Les freelances reçoivent des bonus de collaboration et les CDI des primes de succès.',
    },
];

// ─── About Page ─────────────────────────────────────────────────────────────

export function AboutPage() {
    const { t, language } = useTranslation();
    const isFr = language === 'fr';
    const timelineRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start end', 'end start'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    return (
        <div className="min-h-screen bg-white text-[hsl(210,14%,17%)] selection:bg-[hsl(239,84%,67%)] selection:text-white">
            <Navbar />

            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION — Full viewport, video background
            ═══════════════════════════════════════════════════════════════ */}
            <section className="h-screen flex flex-col overflow-hidden relative" id="about-hero">
                {/* Video Background */}
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover z-0"
                >
                    <source
                        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260319_015952_e1deeb12-8fb7-4071-a42a-60779fc64ab6.mp4"
                        type="video/mp4"
                    />
                </video>

                {/* Gradient overlay */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-white/60 via-white/30 to-white/80" />

                {/* Content */}
                <div className="relative z-10 flex flex-col items-center w-full flex-1 justify-center pt-24 pb-0">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-[hsl(0,0%,90%)] bg-white px-4 py-1.5 text-sm text-[hsl(184,5%,55%)] mb-6"
                        style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}
                    >
                        {isFr ? 'Notre histoire depuis 2019 ✨' : 'Our story since 2019 ✨'}
                    </motion.div>

                    {/* Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-center text-5xl md:text-6xl lg:text-[5rem] leading-[1.05] tracking-tight font-bold max-w-xl pb-2"
                    >
                        <span className="bg-gradient-to-r from-[#2D3D0C] via-[#4D6614] to-[#84a232] bg-clip-text text-transparent">
                            {isFr ? 'L\'histoire de' : 'The Future of'}{' '}
                            <em>{isFr ? 'TRIBU' : 'Recruitment'}</em>
                        </span>
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="mt-4 text-center text-base md:text-lg text-[hsl(184,5%,55%)] max-w-[650px] leading-relaxed px-6"
                        style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}
                    >
                        {isFr
                            ? 'Un partenaire de talent premium combinant expertise en recrutement, précision par l\'IA et modèles d\'affaires transparents pour créer des relations de recrutement qui durent.'
                            : 'A premium talent partner combining human recruitment expertise, AI-powered precision, and transparent business models to create hiring relationships that actually last.'}
                    </motion.p>


                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                FOUNDER STORY SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center"
                    >
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(184,5%,55%)] mb-6">
                            {isFr ? 'L\'HISTOIRE DU FONDATEUR' : 'THE FOUNDER\'S STORY'}
                        </div>
                        <h2
                            className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight font-bold mb-8 pb-2"
                        >
                            <span className="bg-gradient-to-r from-[#1f2937] via-[#111827] to-[#3a5a18] bg-clip-text text-transparent">
                                {isFr ? (
                                    <>6 ans d'expérience. <br className="hidden md:block" />Une <em>conviction</em>.</>
                                ) : (
                                    <>6 years of experience. <br className="hidden md:block" />One <em>conviction</em>.</>
                                )}
                            </span>
                        </h2>
                        <p className="text-base md:text-lg text-[hsl(184,5%,55%)] max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}>
                            {isFr
                                ? 'Après 6 ans passés dans le conseil et le recrutement tech, Raphael Paya a vu de l\'intérieur ce qui ne fonctionnait pas : des modèles opaques, des CV non structurés, et des agences qui disparaissent après le placement. En février 2025, il a décidé de construire quelque chose de meilleur.'
                                : 'After 6 years spent in consulting and tech recruitment, Raphael Paya saw firsthand what was broken: opaque models, unstructured CVs, and agencies that disappear after placement. In February 2025, he decided something better had to be built.'}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                STATS SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-16 md:py-20 bg-[#F8FAF6] border-y border-gray-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold tracking-tight mb-2 pb-1 bg-gradient-to-b from-[#4a6a24] to-[#172008] bg-clip-text text-transparent">
                                    {stat.number}
                                </div>
                                <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-[hsl(184,5%,55%)]">
                                    {isFr ? stat.labelFr : stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                TIMELINE SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section ref={timelineRef} className="py-24 md:py-32 bg-white">
                <div className="max-w-4xl mx-auto px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-20"
                    >
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(184,5%,55%)] mb-6">
                            {isFr ? 'LE PARCOURS' : 'THE JOURNEY'}
                        </div>
                        <h2
                            className="text-3xl md:text-5xl leading-[1.1] tracking-tight font-bold pb-2"
                        >
                            <span className="bg-gradient-to-r from-[#0f172a] via-[#1e3a8a] to-[#0f172a] bg-clip-text text-transparent">
                                {isFr ? (
                                    <>De la première embauche <br className="hidden md:block" />à un nouveau <em>modèle</em></>
                                ) : (
                                    <>From the first hire <br className="hidden md:block" />to a new <em>model</em></>
                                )}
                            </span>
                        </h2>
                    </motion.div>

                    {/* Timeline */}
                    <div className="relative">
                        {/* Animated vertical line */}
                        <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-100">
                            <motion.div
                                className="w-full bg-gradient-to-b from-[#4a6a24] to-[#172008] origin-top"
                                style={{ height: lineHeight }}
                            />
                        </div>

                        <div className="space-y-16 md:space-y-20">
                            {timelineItems.map((item, i) => {
                                const Icon = item.icon;
                                const isEven = i % 2 === 0;

                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-50px' }}
                                        transition={{ duration: 0.6, delay: 0.1 }}
                                        className={`relative flex items-start gap-6 md:gap-0 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                                    >
                                        {/* Dot on timeline */}
                                        <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg"
                                                style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}dd)` }}
                                            >
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                        </div>

                                        {/* Content card */}
                                        <div className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${isEven ? 'md:pr-0 md:text-right' : 'md:pl-0 md:text-left'}`}>
                                            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-shadow duration-300">
                                                <div
                                                    className="inline-block text-[11px] font-bold uppercase tracking-[0.15em] mb-2 px-3 py-1 rounded-full"
                                                    style={{ backgroundColor: `${item.accent}10`, color: item.accent }}
                                                >
                                                    {item.year}
                                                </div>
                                                <h3 className="text-xl font-bold text-[hsl(210,14%,17%)] mb-2 tracking-tight">
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-[hsl(184,5%,55%)] leading-relaxed" style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Spacer for alignment */}
                                        <div className="hidden md:block md:w-[calc(50%-3rem)]" />
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                VALUES SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-[#FAFBF8] border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-6 lg:px-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                        className="text-center mb-16"
                    >
                        <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[hsl(184,5%,55%)] mb-6">
                            {isFr ? 'NOS PRINCIPES' : 'OUR PRINCIPLES'}
                        </div>
                        <h2
                            className="text-3xl md:text-5xl leading-[1.1] tracking-tight font-bold pb-2"
                        >
                            <span className="bg-gradient-to-r from-[#172008] via-[#4a6a24] to-[#172008] bg-clip-text text-transparent">
                                {isFr ? (
                                    <>Construit sur des <em>valeurs</em>,<br className="hidden md:block" /> pas des mots-clés</>
                                ) : (
                                    <>Built on <em>values</em>,<br className="hidden md:block" /> not buzzwords</>
                                )}
                            </span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {values.map((val, i) => {
                            const Icon = val.icon;
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: i * 0.1 }}
                                    className="bg-white rounded-2xl border border-gray-100 p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-2xl bg-[#F2F4F0] flex items-center justify-center mb-5 group-hover:bg-[#172008] transition-colors duration-300">
                                        <Icon className="w-5 h-5 text-[#4a6a24] group-hover:text-white transition-colors duration-300" />
                                    </div>
                                    <h3 className="text-lg font-bold text-[hsl(210,14%,17%)] mb-2 tracking-tight">
                                        {isFr ? val.titleFr : val.title}
                                    </h3>
                                    <p className="text-sm text-[hsl(184,5%,55%)] leading-relaxed" style={{ fontFamily: "var(--font-body, 'Inter', sans-serif)" }}>
                                        {isFr ? val.descFr : val.desc}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                QUOTE / CTA SECTION
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-24 md:py-32 bg-white">
                <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-100px' }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2a3a12] to-[#4a6a24] flex items-center justify-center text-xl font-bold text-white mx-auto mb-8">
                            RP
                        </div>
                        <blockquote
                            className="text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.3] tracking-tight text-[hsl(210,14%,17%)] mb-8"
                        >
                            {isFr
                                ? '"J\'ai vu pendant 6 ans ce qui ne fonctionnait pas. TRIBU est la réponse : un modèle où la transparence, la précision et le partage du succès ne sont pas des promesses marketing — mais le système lui-même."'
                                : '"I spent 6 years seeing what was broken. TRIBU is my answer: a model where transparency, precision, and shared success aren\'t marketing promises — they are the system itself."'}
                        </blockquote>
                        <p className="text-sm text-[hsl(184,5%,55%)] font-medium uppercase tracking-widest mb-12">
                            — Raphael Paya, {isFr ? 'Fondateur de TRIBU' : 'Founder of TRIBU'}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/"
                                className="px-8 py-3.5 rounded-full text-sm font-semibold bg-[#172008] text-white hover:bg-[#1e2a0e] transition-all duration-300 shadow-[0_2px_12px_rgba(23,32,8,0.2)] flex items-center gap-2"
                            >
                                {isFr ? 'Découvrir le modèle' : 'Discover the model'}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link
                                to="/candidate-space"
                                className="px-8 py-3.5 rounded-full text-sm font-semibold border border-gray-200 text-[hsl(210,14%,17%)] hover:bg-[#F8FAF6] transition-all duration-300 flex items-center gap-2"
                            >
                                {isFr ? 'Espace Candidat' : 'Candidate Space'}
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════════════
                TRUSTED BY SECTION / LOGO LOOP
            ═══════════════════════════════════════════════════════════════ */}
            <section className="py-20 md:py-28 bg-[#F8FAF6] overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 mb-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 pb-1">
                        <span className="bg-gradient-to-r from-[#334155] to-[#0f172a] bg-clip-text text-transparent">
                            {isFr ? "Ils nous font confiance" : "They trust us"}
                        </span>
                    </h2>
                </div>
                
                <LogoLoop 
                    logos={companyLogos}
                    speed={40}
                    direction="left"
                    logoHeight={50}
                    gap={80}
                    fadeOut={true}
                    fadeOutColor="#F8FAF6"
                    className="opacity-80 grayscale hover:grayscale-0 transition-all duration-500"
                />
            </section>

            <Footer />
        </div>
    );
}
