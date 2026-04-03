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
    <div className="min-h-screen bg-white text-[#172008] selection:bg-[#84A232] selection:text-white">
      <Navbar />
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] w-full flex flex-col items-center justify-center text-center px-6 pt-24 overflow-hidden">
        
        {/* Video Background Layer with loop logic */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100 ease-linear"
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

        {/* Dark Overlay for Text Readability - slightly adjusted for white transition */}
        <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

        {/* Smooth Gradient Overlay linking video to white background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-80 z-0 pointer-events-none" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          
          <h1 className="text-5xl sm:text-7xl md:text-[5.5rem] font-bold tracking-tight text-[#172008] leading-[0.95] max-w-4xl animate-fade-rise">
            {t('expertisePage.hero.headlineStart')} <br/>
            <span className="bg-gradient-to-r from-[#7dd3fc] via-[#4a7c59] to-[#172008] bg-clip-text text-transparent italic block mt-2">
              {t('expertisePage.hero.italic')}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mt-12 leading-relaxed animate-fade-rise-delay font-medium tracking-wide">
            {t('expertisePage.hero.description')}
          </p>
        </div>
      </section>

      {/* Grid Pillars Layout */}
      <section className="relative z-10 py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="bg-[#172008] rounded-[2.5rem] p-10 md:p-12 transition-all duration-500 group flex flex-col h-full shadow-xl shadow-black/5"
              >
                <div className="mb-8 p-4 rounded-full bg-white/10 w-fit border border-white/20 group-hover:scale-110 transition-transform duration-500">
                  <div className="text-[#84A232]">
                    {getPillarIcon(pillar.title || '')}
                  </div>
                </div>
                
                <h3 className="text-3xl font-bold tracking-tight text-white mb-6">
                  {pillar.title}
                </h3>
                
                <p className="text-[15px] font-medium leading-relaxed text-gray-300 mb-10 flex-grow">
                  {pillar.description}
                </p>

                <div className="space-y-4 mt-auto">
                  {(pillar.roles || []).map((role: string, rIdx: number) => (
                    <div key={rIdx} className="flex items-center gap-3 text-[13px] font-bold text-white/90">
                      <CheckCircle2 className="w-4 h-4 text-[#84A232]" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sectors Feature */}
          <div className="mt-48 text-center">
            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-[#172008]/40 mb-12">
              {t('expertisePage.sectors.title')}
            </h4>
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 overflow-hidden">
              <div className="flex flex-wrap justify-center gap-10">
                {(t('expertisePage.sectors.list', { returnObjects: true }) as string[] || []).map((sector, sIdx) => (
                   <span key={sIdx} className="text-lg md:text-3xl font-bold tracking-tighter text-[#172008] hover:text-[#84A232] transition-colors duration-300">
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
