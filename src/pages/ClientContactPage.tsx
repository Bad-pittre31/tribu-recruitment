import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';

export function ClientContactPage() {
  const { t } = useTranslation();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    needs: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error("Server API Error details:", errorText);
        throw new Error(`API Error: ${errorText}`);
      }
      
      setStatus('success');
      setFormData({ firstName: '', lastName: '', email: '', company: '', needs: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-[var(--color-tribu-bg)] text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)] font-sans flex flex-col">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#84A232]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative z-10">
          
          {/* Left: Copy */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 w-fit">
              <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8a928a]">
                {t('contactPage.hero.tagline')}
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-6">
              {t('contactPage.hero.title')} <br />
              <span className="text-[#84A232] italic pr-4">
                {t('contactPage.hero.titleItalic')}
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-[#8a928a] leading-relaxed max-w-md">
              {t('contactPage.hero.description')}
            </p>
          </motion.div>

          {/* Right: Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-[2rem] -m-px pointer-events-none p-px">
              <div className="absolute inset-0 bg-black/40 backdrop-blur-3xl rounded-[2rem]" />
            </div>
            
            <div className="relative glass-card rounded-[2rem] p-8 md:p-12 border border-white/10 shadow-2xl bg-black/40 backdrop-blur-md">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="flex flex-col items-center justify-center text-center py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-[#84A232]/20 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10 text-[#84A232]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Brief reçu !</h3>
                  <p className="text-[#8a928a] leading-relaxed">
                    {t('contactPage.form.success')}
                  </p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 text-sm uppercase tracking-widest font-bold text-white/50 hover:text-white transition-colors"
                  >
                    Envoyer un autre brief
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#8a928a] ml-1">{t('contactPage.form.firstName')}</label>
                      <input 
                        required name="firstName" value={formData.firstName} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#84A232]/50 transition-colors" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-[#8a928a] ml-1">{t('contactPage.form.lastName')}</label>
                      <input 
                        required name="lastName" value={formData.lastName} onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#84A232]/50 transition-colors" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8a928a] ml-1">{t('contactPage.form.email')}</label>
                    <input 
                      type="email" required name="email" value={formData.email} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#84A232]/50 transition-colors" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8a928a] ml-1">{t('contactPage.form.company')}</label>
                    <input 
                      required name="company" value={formData.company} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-[#84A232]/50 transition-colors" 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-[#8a928a] ml-1">{t('contactPage.form.needs')}</label>
                    <textarea 
                      required name="needs" value={formData.needs} onChange={handleChange} rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-white resize-none focus:outline-none focus:border-[#84A232]/50 transition-colors" 
                    />
                  </div>
                  
                  {status === 'error' && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                      {t('contactPage.form.error')}
                    </div>
                  )}

                  <button 
                    disabled={status === 'loading'}
                    type="submit" 
                    className="w-full flex items-center justify-center gap-3 px-8 py-5 rounded-xl uppercase tracking-widest text-xs font-bold text-black bg-white hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {t('contactPage.form.submitting')}
                      </>
                    ) : (
                      <>
                        {t('contactPage.form.submit')}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
