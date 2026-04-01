import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { useTranslation } from '../contexts/LanguageContext';
import { Code2, Database, MessageSquare, BrainCircuit, CheckCircle2 } from 'lucide-react';

export function ExpertisePage() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);

    let animationFrameId: number;
    const fadeDuration = 0.5; // seconds

    const checkVideo = () => {
      const video = videoRef.current;
      if (!video) return;

      const duration = video.duration;
      const current = video.currentTime;

      if (!isNaN(duration) && duration > 0) {
        if (current < fadeDuration) {
          // Fade in
          setOpacity(current / fadeDuration);
        } else if (current > duration - fadeDuration) {
          // Fade out
          const timeUntilEnd = duration - current;
          setOpacity(Math.max(0, timeUntilEnd / fadeDuration));
        } else {
          // Full opacity
          setOpacity(1);
        }
      }

      animationFrameId = requestAnimationFrame(checkVideo);
    };

    animationFrameId = requestAnimationFrame(checkVideo);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleVideoEnded = () => {
    const video = videoRef.current;
    if (video) {
        setOpacity(0);
        setTimeout(() => {
          video.currentTime = 0;
          video.play().catch(e => console.log("Play failed on loop", e));
        }, 100);
    }
  };

  const getPillarIcon = (title: string) => {
    if (title.includes('Engineering') || title.includes('Architecture')) return <Code2 className="w-8 h-8 text-[#84A232]" />;
    if (title.includes('Data')) return <Database className="w-8 h-8 text-[#84A232]" />;
    if (title.includes('Salesforce') || title.includes('CRM')) return <MessageSquare className="w-8 h-8 text-[#84A232]" />;
    if (title.includes('Intelligence') || title.includes('AI') || title.includes('Artificielle')) return <BrainCircuit className="w-8 h-8 text-[#84A232]" />;
    return <Code2 className="w-8 h-8 text-[#84A232]" />;
  };

  // We fallback to manual strings if translations aren't perfectly shaped as arrays in some languages yet, 
  // but we know we structured them exactly.
  const pillars = [
    t('expertisePage.pillars.engineering', { returnObjects: true }) as any,
    t('expertisePage.pillars.data', { returnObjects: true }) as any,
    t('expertisePage.pillars.crm', { returnObjects: true }) as any,
    t('expertisePage.pillars.ai', { returnObjects: true }) as any,
  ];

  return (
    <div className="min-h-screen bg-[var(--color-tribu-bg)] text-[var(--color-tribu-text)] selection:bg-[var(--color-tribu-accent)] selection:text-[var(--color-tribu-bg)]">
      <div className="noise-overlay" />
      <Navbar />
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center text-center px-6 pt-[calc(8rem-75px)] overflow-hidden">
        
        {/* Video Background Layer with loop logic */}
        <div 
          className="absolute inset-[300px_0_0_0] z-0 pointer-events-none transition-opacity duration-100 ease-linear"
          style={{ opacity: opacity }}
        >
          <video
            ref={videoRef}
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
            muted
            playsInline
            autoPlay
            onEnded={handleVideoEnded}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Gradient Overlay linking video to background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-tribu-bg)] via-[var(--color-tribu-bg)]/20 to-[var(--color-tribu-bg)] z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight text-white leading-[0.95] max-w-4xl animate-fade-rise">
            {t('expertisePage.hero.headlineStart')} <br/>
            <span className="text-[#8a928a] animate-pulse">
              {t('expertisePage.hero.italic')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#8a928a] max-w-2xl mt-12 leading-relaxed animate-fade-rise-delay font-medium tracking-wide">
            {t('expertisePage.hero.description')}
          </p>

          <Link
            to="/candidate-space"
            className="mt-14 inline-flex items-center px-10 py-4 rounded-full font-bold uppercase tracking-widest text-[11px] text-white bg-[#4a7c59] hover:bg-[#3d6a4a] hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(74,124,89,0.3)] animate-fade-rise-delay-2"
          >
            {t('expertisePage.hero.cta')}
          </Link>
        </div>
      </section>

      {/* Grid Pillars Layout */}
      <section className="relative z-10 py-32 bg-[var(--color-tribu-bg)]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="glass-card rounded-[2rem] p-10 md:p-12 hover:border-[var(--color-tribu-border)] transition-all duration-500 group flex flex-col h-full"
              >
                <div className="mb-8 p-4 rounded-full bg-white/5 w-fit border border-white/10 group-hover:scale-110 transition-transform duration-500">
                  {getPillarIcon(pillar.title || '')}
                </div>
                
                <h3 className="text-3xl font-bold tracking-tight text-white mb-6">
                  {pillar.title}
                </h3>
                
                <p className="text-[15px] font-medium leading-relaxed text-[#8a928a] mb-10 flex-grow">
                  {pillar.description}
                </p>

                <div className="space-y-3 mt-auto">
                  {(pillar.roles || []).map((role: string, rIdx: number) => (
                    <div key={rIdx} className="flex items-center gap-3 text-[13px] font-semibold text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-[#84A232]/80" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sectors Feature */}
          <div className="mt-40 text-center">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#8a928a] mb-8">
              {t('expertisePage.sectors.title')}
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-80">
              <div className="flex flex-wrap justify-center gap-6">
                {(t('expertisePage.sectors.list', { returnObjects: true }) as string[] || []).map((sector, sIdx) => (
                   <span key={sIdx} className="text-lg md:text-2xl font-bold tracking-tight text-white hover:text-[#84A232] transition-colors duration-300">
                     {sector}
                   </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>
      
      <Footer />
    </div>
  );
}
