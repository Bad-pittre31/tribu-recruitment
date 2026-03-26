import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function FinalCTA() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-[10000] py-40 bg-[#172008] overflow-hidden flex flex-col items-center justify-center min-h-[800px] gap-24">
      
      {/* Top Content Block */}
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center w-full mt-10">
        <h2 className="text-5xl md:text-7xl lg:text-[80px] font-bold tracking-tighter mb-10 leading-tight text-white" ref={el => { if (el) elementsRef.current[0] = el; }}>
          <span className="text-[#a8b894] block">{t('finalCTA.titleHighlight')}</span>
          <span>{t('finalCTA.titleSuffix')}</span>
        </h2>

        <p className="text-xl md:text-2xl text-[#c4d4b4] mb-16 max-w-3xl mx-auto leading-relaxed" ref={el => { if (el) elementsRef.current[1] = el; }}>
          {t('finalCTA.description')}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6" ref={el => { if (el) elementsRef.current[2] = el; }}>
          {/* Candidate CTA */}
          <Link 
            to="/candidate-space"
            className="w-full sm:w-auto relative group overflow-hidden rounded-[2rem] bg-white text-[#172008] px-12 py-5 font-semibold tracking-wide transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105"
          >
            <span className="relative z-10">{t('finalCTA.ctaCandidate')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-100 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </Link>

          {/* Client CTA */}
          <button className="w-full sm:w-auto flex items-center justify-center gap-3 relative group overflow-hidden rounded-[2rem] border border-[#a8b894]/50 bg-transparent text-white px-12 py-5 font-semibold tracking-wide transition-all duration-500 hover:bg-[#a8b894]/10 hover:border-[#a8b894] hover:shadow-[0_0_30px_rgba(168,184,148,0.2)] hover:scale-105">
            <span className="relative z-10">{t('finalCTA.ctaClient')}</span>
          </button>
        </div>
      </div>

      {/* Bottom Video Block */}
      <div className="relative w-full max-w-7xl mx-auto px-6 h-[400px] md:h-[600px] rounded-[3rem] overflow-hidden shadow-2xl z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-80 select-none pointer-events-none"
        >
          <source src="/video/forest-sequence.mp4" type="video/mp4" />
        </video>
        {/* Subtle dark overlay to integrate the video seamlessly into the dark background */}
        <div className="absolute inset-0 bg-[#172008]/40 mix-blend-multiply pointer-events-none" />
        <div className="absolute inset-0 ring-1 ring-white/10 rounded-[3rem] pointer-events-none" />
      </div>
    </section>
  );
}
