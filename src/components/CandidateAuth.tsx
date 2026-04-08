import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from '../contexts/LanguageContext';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Loader2, CheckCircle2 } from 'lucide-react';

export function CandidateAuth() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { signIn, user, loading: authLoading } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotLoading, setForgotLoading] = useState(false);
    const [forgotSent, setForgotSent] = useState(false);
    const [forgotError, setForgotError] = useState<string | null>(null);

    // If already authenticated, redirect
    React.useEffect(() => {
        if (!authLoading && user) {
            navigate('/candidate-space/dashboard', { replace: true });
        }
    }, [authLoading, user, navigate]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-[#F7F9F5] flex items-center justify-center font-[Inter,ui-sans-serif,system-ui,sans-serif]">
                <div className="text-sm font-medium text-gray-400 uppercase tracking-widest animate-pulse">Loading...</div>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        const { error: err } = await signIn(email, password);

        if (err) {
            setError(err);
            setLoading(false);
        } else {
            navigate('/candidate-space/dashboard');
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setForgotError(null);
        setForgotLoading(true);
        const { error: err } = await supabase.auth.resetPasswordForEmail(forgotEmail, {
            redirectTo: `${window.location.origin}/candidate-space/reset-password`,
        });
        setForgotLoading(false);
        if (err) {
            setForgotError(err.message);
        } else {
            setForgotSent(true);
        }
    };

    return (
        <div className="min-h-screen flex font-[Inter,ui-sans-serif,system-ui,sans-serif]">
            {/* LEFT — Branding Side */}
            <div className="hidden lg:flex lg:w-[45%] relative overflow-hidden flex-col justify-between p-12"
                style={{ background: 'linear-gradient(160deg, #172008 0%, #2a3a12 35%, #1a2b0a 70%, #0f1a05 100%)' }}
            >
                {/* Subtle organic shapes */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
                    style={{ background: 'radial-gradient(circle, rgba(166,184,148,0.5) 0%, transparent 70%)' }}
                />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.03]"
                    style={{ background: 'radial-gradient(circle, rgba(200,220,180,0.5) 0%, transparent 70%)' }}
                />

                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-3 group mb-12">
                        <ArrowLeft className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                        <span className="text-white/40 text-xs font-medium uppercase tracking-widest group-hover:text-white/70 transition-colors">{t('common.backToTribu')}</span>
                    </Link>
                    
                    <img src="/assets/tribu-logo-jungle.png" alt="TRIBU" className="h-16 w-auto mb-16 brightness-0 invert opacity-90" />

                    <div>
                        <div className="text-white/20 text-[11px] font-bold uppercase tracking-[0.3em] mb-6">{t('common.candidateSpace')}</div>
                        <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                            {t('common.yourTribu')}<br />
                            <span className="bg-gradient-to-r from-[#caff04] to-[#a8b894] bg-clip-text text-transparent">{t('common.candidateSpace')}</span>
                        </h1>
                        <p className="mt-6 text-white/50 text-lg leading-relaxed max-w-md">
                            {t('dashboard.description')}
                        </p>
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-3">
                                {[
                                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100",
                                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100&h=100",
                                    "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
                                ].map((url, i) => (
                                    <div key={i} className="w-9 h-9 rounded-full border-2 border-[#172008] overflow-hidden">
                                        <img src={url} alt="User" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-white/40 text-sm italic">{t('common.trustedBy')} <span className="text-white/70 font-medium">700+ {t('common.consultants')}</span></p>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT — Auth Form */}
            <div className="flex-1 flex items-center justify-center p-5 md:p-8 bg-[#FAFBFA] min-h-screen lg:min-h-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md"
                >
                    {/* Mobile logo */}
                    <div className="lg:hidden mb-6">
                        <Link to="/" className="text-xs font-medium text-gray-400 uppercase tracking-widest hover:text-gray-600 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-3.5 h-3.5" />
                            {t('common.backToTribu')}
                        </Link>
                        <div className="flex items-center gap-3 mt-5 mb-1">
                            <img src="/assets/tribu-logo-jungle.png" alt="TRIBU" className="h-8 w-auto brightness-0" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 tracking-tight">{t('common.yourTribuCandidateSpace')}</h2>
                    </div>

                    <div className="bg-white rounded-2xl border border-gray-100 shadow-[0_2px_20px_rgba(0,0,0,0.04)] p-6 md:p-10">
                        <div className="mb-8">
                            <h3 className="text-xl font-bold text-gray-900 tracking-tight">{t('common.welcomeBack')}</h3>
                            <p className="mt-1.5 text-sm text-gray-400">{t('common.signInToYourSpace')}</p>
                        </div>

                        {error && (
                            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-100 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{t('common.email')}</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="name@company.com"
                                    required
                                    className="w-full px-4 py-3 bg-[#F6F8F6] border border-gray-100 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#172008]/10 focus:border-[#172008]/20 transition-all"
                                />
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider">{t('common.password')}</label>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgot(true)}
                                        className="text-[11px] text-gray-400 hover:text-[#172008] transition-colors font-medium"
                                    >
                                        Mot de passe oublié ?
                                    </button>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-[#F6F8F6] border border-gray-100 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#172008]/10 focus:border-[#172008]/20 transition-all"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 bg-[#172008] text-white hover:bg-[#1e2a0e] active:scale-[0.98] shadow-[0_2px_12px_rgba(23,32,8,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                                {loading ? t('common.signingIn') : t('common.signIn')}
                            </button>
                        </form>

                        {/* Forgot Password Modal */}
                        {showForgot && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                                onClick={(e) => { if (e.target === e.currentTarget) setShowForgot(false); }}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                                    className="bg-white rounded-2xl border border-gray-100 shadow-2xl p-8 w-full max-w-sm"
                                >
                                    {forgotSent ? (
                                        <div className="text-center">
                                            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-bold text-gray-900 mb-2">Email envoyé !</h3>
                                            <p className="text-sm text-gray-400 mb-6">Vérifiez votre boîte mail pour réinitialiser votre mot de passe.</p>
                                            <button onClick={() => { setShowForgot(false); setForgotSent(false); setForgotEmail(''); }} className="w-full py-2.5 rounded-xl text-sm font-semibold bg-[#172008] text-white hover:bg-[#1e2a0e] transition-colors">Fermer</button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleForgotPassword}>
                                            <h3 className="text-lg font-bold text-gray-900 mb-1">Réinitialiser le mot de passe</h3>
                                            <p className="text-sm text-gray-400 mb-6">Entrez votre email pour recevoir un lien de réinitialisation.</p>
                                            {forgotError && <p className="mb-4 text-sm text-red-500">{forgotError}</p>}
                                            <div className="mb-4">
                                                <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                                <input
                                                    type="email"
                                                    value={forgotEmail}
                                                    onChange={e => setForgotEmail(e.target.value)}
                                                    placeholder="name@company.com"
                                                    required
                                                    className="w-full px-4 py-3 bg-[#F6F8F6] border border-gray-100 rounded-xl text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-[#172008]/10 transition-all"
                                                />
                                            </div>
                                            <div className="flex gap-3">
                                                <button type="button" onClick={() => setShowForgot(false)} className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors">Annuler</button>
                                                <button type="submit" disabled={forgotLoading} className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-[#172008] text-white hover:bg-[#1e2a0e] disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                                                    {forgotLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                                                    Envoyer
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </motion.div>
                            </motion.div>
                        )}
                    </div>

                    <p className="mt-6 text-center text-[11px] text-gray-300">
                        {t('common.inviteOnly')}
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
