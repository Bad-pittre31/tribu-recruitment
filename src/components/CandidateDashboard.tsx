import React, { useState, useCallback, useMemo, useRef } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, FileText, Download, Clock, CheckCircle2, AlertCircle,
    Send, Phone, ChevronRight, TrendingUp, Upload, Loader2, LogOut,
    Calculator, Lock, Briefcase, CreditCard, Shield, CheckCircle, Activity, MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMission } from '../hooks/useMission';
import { useDocuments } from '../hooks/useDocuments';
import { useCRA } from '../hooks/useCRA';
import { useContact } from '../hooks/useContact';
import { useTranslation } from '../contexts/LanguageContext';

const cn = (...classes: (string | boolean | undefined)[]) => classes.filter(Boolean).join(' ');

// ─── Utilities ───────────────────────────────────────────────────────────────

function formatDate(d: string) {
    return new Date(d).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function daysBetween(a: string, b: string) {
    return Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / (1000 * 60 * 60 * 24)));
}

// ─── Card Shell ──────────────────────────────────────────────────────────────

function DashCard({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
            className={`bg-white rounded-2xl border border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-8 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${className}`}
        >
            {children}
        </motion.div>
    );
}

function CardLabel({ children }: { children: React.ReactNode }) {
    return <div className="text-[11px] font-bold uppercase tracking-[0.15em] text-gray-400 mb-5">{children}</div>;
}

function EmptyState({ text }: { text: string }) {
    return <div className="text-sm text-gray-300 italic py-4">{text}</div>;
}

// ─── Mission Timeline ───────────────────────────────────────────────────────

function MissionTimeline() {
    const { mission, loading } = useMission();
    const { t } = useTranslation();

    if (loading) return <DashCard className="lg:col-span-2" delay={0.1}><CardLabel>{t('dashboard.activeMission')}</CardLabel><div className="animate-pulse h-24 bg-gray-50 rounded-xl" /></DashCard>;
    if (!mission) return <DashCard className="lg:col-span-2" delay={0.1}><CardLabel>{t('dashboard.activeMission')}</CardLabel><EmptyState text={t('dashboard.noActiveMission')} /></DashCard>;

    const today = new Date().toISOString().split('T')[0];
    const totalDays = daysBetween(mission.start_date, mission.end_date);
    const elapsed = daysBetween(mission.start_date, today);
    const remaining = daysBetween(today, mission.end_date);
    const progress = Math.min(1, Math.max(0, elapsed / totalDays));

    return (
        <DashCard className="lg:col-span-2" delay={0.1}>
            <CardLabel>{t('dashboard.activeMission')}</CardLabel>
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
                <div>
                    <div className="text-sm text-gray-400 mb-1">{t('dashboard.missionWith')} <span className="text-[#172008] font-semibold">{mission.client_name}</span></div>
                    <h3 className="text-2xl font-bold text-gray-900 tracking-tight">{mission.job_title}</h3>
                    <div className="mt-2 text-sm text-gray-400">{formatDate(mission.start_date)} → {formatDate(mission.end_date)}</div>
                </div>
                <div className="flex gap-6">
                    <div className="text-right">
                        <div className="text-2xl font-bold text-[#172008]">{elapsed}</div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{t('dashboard.daysCompleted')}</div>
                    </div>
                    <div className="w-px bg-gray-100" />
                    <div className="text-right">
                        <div className="text-2xl font-bold text-gray-400">{remaining}</div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-0.5">{t('dashboard.daysRemaining')}</div>
                    </div>
                </div>
            </div>

            {/* Timeline Bar */}
            <div className="relative">
                <div className="h-3 bg-[#F2F4F0] rounded-full overflow-hidden relative">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                        className="h-full rounded-full relative"
                        style={{ background: 'linear-gradient(90deg, #2a3a12 0%, #4a6a24 50%, #6a9a36 100%)' }}
                    >
                        <div className="absolute inset-0 rounded-full opacity-30"
                            style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)', backgroundSize: '200% 100%', animation: 'shimmer 2.5s infinite' }}
                        />
                    </motion.div>
                </div>
                <div className="flex justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#172008]" />
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{t('dashboard.start')}</span>
                    </div>
                    <div className="flex items-center gap-1.5" style={{ position: 'absolute', left: `${progress * 100}%`, transform: 'translateX(-50%)', top: '20px' }}>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#4a6a24] ring-4 ring-[#4a6a24]/10" />
                        <span className="text-[10px] font-semibold text-[#4a6a24] uppercase tracking-wider">{t('dashboard.today')}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">{t('dashboard.end')}</span>
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                    </div>
                </div>
            </div>
        </DashCard>
    );
}

// ─── Economics Card ───────────────────────────────────────────────────────────

function EconomicsCard() {
    const { mission, updateAvgDays } = useMission();
    const [avgDays, setAvgDays] = useState<number>(mission?.average_worked_days_per_month ?? 20);
    const [showSim, setShowSim] = useState(false);
    const { t } = useTranslation();

    const rate = mission?.mission_daily_rate ?? 550;
    const fee = mission?.tribu_daily_fee ?? 80;
    const netDaily = rate - fee;
    const monthlyGross = rate * avgDays;
    const monthlyNet = netDaily * avgDays;

    // Simulation estimates
    const urssaf = monthlyNet * 0.22;
    const incomeTax = monthlyNet * 0.10;
    const approximateNet = monthlyNet - urssaf - incomeTax;

    const handleAvgDaysChange = (val: string) => {
        const n = parseInt(val) || 0;
        setAvgDays(n);
        if (n > 0 && n <= 25) updateAvgDays(n);
    };

    return (
        <DashCard delay={0.2}>
            <CardLabel>{t('dashboard.economics')}</CardLabel>
            <div className="space-y-5">
                <div className="flex justify-between items-end">
                    <div>
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{t('dashboard.dailyRate')}</div>
                        <div className="text-3xl font-bold text-gray-900 tracking-tight">{rate}€</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-1">{t('dashboard.fee')}</div>
                        <div className="text-lg font-semibold text-gray-500">{fee}€</div>
                    </div>
                </div>

                <div className="h-px bg-gray-50" />

                <div>
                    <div className="text-[11px] text-gray-400 uppercase tracking-wider mb-2">{t('dashboard.avgDays')}</div>
                    <input
                        type="number"
                        min={1}
                        max={25}
                        value={avgDays}
                        onChange={e => handleAvgDaysChange(e.target.value)}
                        className="w-20 px-3 py-2 bg-[#F6F8F6] border border-gray-100 rounded-lg text-sm font-semibold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#172008]/10"
                    />
                </div>

                <div className="bg-[#F8FAF6] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#4a6a24]" />
                        <span className="text-[11px] text-gray-400 uppercase tracking-wider">{t('dashboard.monthlyGross')}</span>
                    </div>
                    <div className="text-3xl font-bold text-[#172008] tracking-tight">{monthlyGross.toLocaleString('fr-FR')}€</div>
                </div>

                <button
                    onClick={() => setShowSim(!showSim)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-medium text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                >
                    <Calculator className="w-3.5 h-3.5" />
                    {showSim ? t('dashboard.hideNet') : t('dashboard.showNet')}
                </button>

                {showSim && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="space-y-3 pt-2"
                    >
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{t('dashboard.monthlyNet')}</span>
                            <span className="font-semibold text-gray-700">{monthlyNet.toLocaleString('fr-FR')}€</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{t('dashboard.urssaf')}</span>
                            <span className="font-medium text-red-400">-{Math.round(urssaf).toLocaleString('fr-FR')}€</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">{t('dashboard.incomeTax')}</span>
                            <span className="font-medium text-red-400">-{Math.round(incomeTax).toLocaleString('fr-FR')}€</span>
                        </div>
                        <div className="h-px bg-gray-100" />
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500 font-medium">{t('dashboard.approxNet')}</span>
                            <span className="font-bold text-[#172008]">~{Math.round(approximateNet).toLocaleString('fr-FR')}€</span>
                        </div>
                        <div className="text-[10px] text-gray-300 italic">{t('dashboard.simOnly')}</div>
                    </motion.div>
                )}
            </div>
        </DashCard>
    );
}

// ─── Document Center ─────────────────────────────────────────────────────────

function DocumentCenter() {
    const { documents, loading, uploading, uploadDocument, downloadDocument } = useDocuments();
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation();

    const statusConfig: Record<string, { icon: any; color: string; bg: string; label: string }> = {
        signed: { icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50', label: t('dashboard.signed') },
        available: { icon: Download, color: 'text-blue-500', bg: 'bg-blue-50', label: t('dashboard.available') },
        pending: { icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', label: t('dashboard.pending') },
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = Array.from(e.dataTransfer.files) as File[];
        files.forEach(f => uploadDocument(f));
    }, [uploadDocument]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []) as File[];
        files.forEach(f => uploadDocument(f));
    };

    return (
        <DashCard delay={0.3}>
            <CardLabel>{t('dashboard.docCenter')}</CardLabel>

            <div
                onDragOver={e => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-5 text-center mb-5 transition-all cursor-pointer ${isDragOver ? 'border-[#4a6a24] bg-[#F6F8F4]' : 'border-gray-100 hover:border-gray-200'}`}
                onClick={() => fileInputRef.current?.click()}
            >
                {uploading ? (
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('dashboard.uploading')}
                    </div>
                ) : (
                    <>
                        <Upload className="w-5 h-5 text-gray-300 mx-auto mb-2" />
                        <div className="text-xs text-gray-400">{t('dashboard.dropFiles')}</div>
                    </>
                )}
                <input type="file" multiple className="hidden" onChange={handleFileSelect} ref={fileInputRef} />
            </div>

            {loading ? (
                <div className="animate-pulse space-y-3">
                    {[0, 1, 2].map(i => <div key={i} className="h-12 bg-gray-50 rounded-xl" />)}
                </div>
            ) : documents.length === 0 ? (
                <EmptyState text={t('dashboard.noDocs')} />
            ) : (
                <div className="space-y-2">
                    {documents.map((doc) => {
                        const cfg = statusConfig[doc.status] || statusConfig.available;
                        const Icon = cfg.icon;
                        return (
                            <div key={doc.id} className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-[#F8FAF6] transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center`}>
                                        {doc.type === 'contract' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900">{doc.document_name}</div>
                                        <div className="text-[11px] text-gray-400">{new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-[10px] font-semibold uppercase tracking-wider ${cfg.color}`}>{cfg.label}</span>
                                    <button
                                        onClick={() => downloadDocument(doc)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-gray-100"
                                    >
                                        <Download className="w-3.5 h-3.5 text-gray-400" />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </DashCard>
    );
}

// ─── CRA Submission ──────────────────────────────────────────────────────────

function CRACard() {
    const { submission, days, loading, submitting, currentMonth, currentYear, toggleDay, submitCRA } = useCRA();
    const { t } = useTranslation();

    if (loading) return <DashCard delay={0.35}><CardLabel>{t('dashboard.timeSubmission')}</CardLabel><div className="animate-pulse h-48 bg-gray-50 rounded-xl" /></DashCard>;

    const monthName = new Date(currentYear, currentMonth - 1).toLocaleDateString(t('common.locale') === 'fr' ? 'fr-FR' : 'en-US', { month: 'long', year: 'numeric' });
    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
    const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
    const firstDayMon = firstDay === 0 ? 6 : firstDay - 1;

    const workedDates = new Set(days.filter(d => d.day_status === 'worked').map(d => d.day_date));
    const workedCount = workedDates.size;
    const expected = submission?.expected_days ?? 20;
    const progress = expected > 0 ? workedCount / expected : 0;
    const isSubmitted = submission?.status === 'submitted';

    return (
        <DashCard delay={0.35}>
            <CardLabel>{t('dashboard.timeSubmission')}</CardLabel>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold text-gray-900 uppercase tracking-tight">{monthName}</div>
                        {isSubmitted && <Lock className="w-3.5 h-3.5 text-emerald-500" />}
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">
                        <span className="text-[#172008] font-semibold">{workedCount}</span> {t('dashboard.workedDays')} / {expected} {t('dashboard.expected')}
                    </div>
                </div>
                <div className="relative w-14 h-14">
                    <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#F2F4F0" strokeWidth="4" />
                        <motion.circle
                            cx="28" cy="28" r="24" fill="none" stroke={isSubmitted ? '#10b981' : '#4a6a24'} strokeWidth="4"
                            strokeDasharray={`${2 * Math.PI * 24}`}
                            initial={{ strokeDashoffset: 2 * Math.PI * 24 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 24 * (1 - progress) }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-[#172008]">{Math.round(progress * 100)}%</div>
                </div>
            </div>

            <div className="bg-[#F8FAF6] rounded-xl p-4 mb-6">
                <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} className="text-[9px] font-semibold text-gray-300 uppercase">{d}</div>
                    ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: firstDayMon }).map((_, i) => <div key={`e-${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const dateStr = `${currentYear}-${String(currentMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                        const isWorked = workedDates.has(dateStr);
                        const dayOfWeek = (firstDayMon + i) % 7;
                        const isWeekend = dayOfWeek >= 5;

                        return (
                            <button
                                key={day}
                                disabled={isWeekend || isSubmitted}
                                onClick={() => !isWeekend && toggleDay(dateStr)}
                                className={`w-6 h-6 rounded-md text-[10px] font-medium flex items-center justify-center mx-auto transition-all ${isWorked
                                    ? 'bg-[#172008] text-white shadow-sm'
                                    : isWeekend
                                        ? 'text-gray-200 cursor-default'
                                        : isSubmitted
                                            ? 'text-gray-300 bg-white border border-gray-50 cursor-default'
                                            : 'text-gray-400 bg-white border border-gray-100 hover:border-[#172008]/30 hover:bg-[#F6F8F4] cursor-pointer'
                                    }`}
                            >
                                {day}
                            </button>
                        );
                    })}
                </div>
            </div>

            {isSubmitted ? (
                <div className="w-full py-3 rounded-xl text-sm font-semibold bg-emerald-50 text-emerald-600 text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {t('dashboard.submitted')}
                </div>
            ) : (
                <button
                    onClick={submitCRA}
                    disabled={submitting || workedCount === 0}
                    className="w-full py-3 rounded-xl text-sm font-semibold bg-[#172008] text-white hover:bg-[#1e2a0e] transition-colors active:scale-[0.98] shadow-[0_2px_12px_rgba(23,32,8,0.2)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                    {submitting ? t('dashboard.submitting') : t('dashboard.submit')}
                </button>
            )}
        </DashCard>
    );
}

// ─── Next Actions ────────────────────────────────────────────────────────────

function NextActions() {
    const { submission } = useCRA();
    const { documents } = useDocuments();
    const { t } = useTranslation();

    const actions = useMemo(() => {
        const items: { text: string; urgent: boolean }[] = [];

        if (submission && submission.status !== 'submitted') {
            const monthName = new Date(0, submission.month - 1).toLocaleString(t('common.locale') === 'fr' ? 'fr-FR' : 'en-US', { month: 'long' });
            items.push({ text: t('dashboard.submitCRA') + " (" + monthName + ")", urgent: true });
        }

        const unsignedDocs = documents.filter(d => d.status === 'pending');
        unsignedDocs.forEach(d => {
            items.push({ text: t('dashboard.reviewPending') + ": " + d.document_name, urgent: false });
        });

        const availableDocs = documents.filter(d => d.status === 'available');
        if (availableDocs.length > 0) {
            items.push({ text: availableDocs.length + " " + t('dashboard.docsAvailable'), urgent: false });
        }

        if (items.length === 0) {
            items.push({ text: t('dashboard.allCaughtUp'), urgent: false });
        }

        return items;
    }, [submission, documents, t]);

    return (
        <DashCard delay={0.4}>
            <CardLabel>{t('dashboard.nextActions')}</CardLabel>
            <div className="space-y-3">
                {actions.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 py-2">
                        {a.urgent ? (
                            <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                        ) : (
                            <ChevronRight className="w-4 h-4 text-gray-300 mt-0.5 shrink-0" />
                        )}
                        <span className={`text-sm ${a.urgent ? 'font-medium text-gray-900' : 'text-gray-500'}`}>{a.text}</span>
                    </div>
                ))}
            </div>
        </DashCard>
    );
}

// ─── TRIBU Contact ───────────────────────────────────────────────────────────

function TribuContactCard() {
    const { contact, loading } = useContact();
    const { t } = useTranslation();

    if (loading) return <DashCard delay={0.45}><CardLabel>{t('dashboard.contact')}</CardLabel><div className="animate-pulse h-24 bg-gray-50 rounded-xl" /></DashCard>;
    if (!contact) return <DashCard delay={0.45}><CardLabel>{t('dashboard.contact')}</CardLabel><EmptyState text={t('dashboard.noContact')} /></DashCard>;

    const initials = contact.contact_name.split(' ').map(n => n[0]).join('');

    return (
        <DashCard delay={0.45}>
            <CardLabel>{t('dashboard.contact')}</CardLabel>
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: 'linear-gradient(135deg, #2a3a12 0%, #4a6a24 100%)' }}
                >
                    {initials}
                </div>
                <div>
                    <div className="font-semibold text-gray-900">{contact.contact_name}</div>
                    <div className="text-xs text-gray-400">{contact.contact_role}</div>
                </div>
            </div>
            <div className="text-sm text-gray-500 mb-6">{contact.contact_email}</div>
            <div className="flex gap-3">
                <a
                    href={`mailto:${contact.contact_email}`}
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[#172008] text-white hover:bg-[#1e2a0e] transition-colors flex items-center justify-center gap-2"
                >
                    <Send className="w-3.5 h-3.5" />
                    {t('dashboard.sendMessage')}
                </a>
                {contact.contact_phone && (
                    <a href={`tel:${contact.contact_phone}`} className="py-2.5 px-4 rounded-xl text-sm font-medium border border-gray-100 text-gray-500 hover:bg-[#F8FAF6] transition-colors">
                        <Phone className="w-3.5 h-3.5" />
                    </a>
                )}
            </div>
        </DashCard>
    );
}

// ─── Dashboard Page ──────────────────────────────────────────────────────────

export function CandidateDashboard() {
    const { t } = useTranslation();
    const { profile: candidate, signOut } = useAuth();
    const navigate = useNavigate();

    const firstName = candidate?.first_name || 'there';
    const initials = candidate ? `${candidate.first_name?.[0] || ''}${candidate.last_name?.[0] || ''}`.toUpperCase() : '??';

    const handleSignOut = async () => {
        await signOut();
        navigate('/candidate-space');
    };

    return (
        <div className="min-h-screen bg-[#F7F9F5] font-[Inter,ui-sans-serif,system-ui,sans-serif]">
            <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>

            <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <Link to="/" className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-xs font-medium uppercase tracking-widest">TRIBU</span>
                        </Link>
                        <div className="h-5 w-px bg-gray-100" />
                        <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">{t('common.candidateSpace')}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleSignOut}
                            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <LogOut className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">{t('common.signOut')}</span>
                        </button>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                            style={{ background: 'linear-gradient(135deg, #2a3a12 0%, #4a6a24 100%)' }}
                        >
                            {initials}
                        </div>
                    </div>
                </div>
            </nav>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7 }}
                className="relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #172008 0%, #2a3a12 40%, #1e2b0c 100%)' }}
            >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.05]"
                    style={{ background: 'radial-gradient(circle, rgba(166,184,148,0.8) 0%, transparent 70%)' }}
                />
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h1 className="text-4xl lg:text-5xl font-bold text-white tracking-tight">
                            {t('dashboard.hello')}, <span className="bg-gradient-to-r from-[#a8b894] to-[#cde0b8] bg-clip-text text-transparent">{firstName}</span>
                        </h1>
                        <p className="mt-3 text-white/50 text-lg max-w-lg">
                            {t('dashboard.description')}
                        </p>
                    </motion.div>
                </div>
            </motion.div>

            <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10 lg:py-14">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <MissionTimeline />
                    <EconomicsCard />
                    <DocumentCenter />
                    <CRACard />
                    <div className="flex flex-col gap-6">
                        <NextActions />
                        <TribuContactCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
