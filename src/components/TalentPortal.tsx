import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, FileText, Clock, CreditCard } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function TalentPortal() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="talent" className="relative z-[10000] py-32 bg-tribu-brand-green">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24">
          <div className="max-w-4xl">
            <h5 className="text-sm md:text-base font-bold tracking-[0.4em] text-[#d0e0b8] uppercase mb-6 drop-shadow-sm">
              {t('talentPortal.label')}
            </h5>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 leading-tight text-white">
              {t('talentPortal.title')}
              <span className="block text-[#d0e0b8]">{t('talentPortal.titleHighlight')}</span>
            </h2>
            <p className="text-lg md:text-xl text-[#94a382] leading-relaxed max-w-2xl">
              {t('talentPortal.description')}
            </p>
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Briefcase, title: t('talentPortal.card1.title'), desc: t('talentPortal.card1.desc') },
            { icon: FileText, title: t('talentPortal.card2.title'), desc: t('talentPortal.card2.desc') },
            { icon: Clock, title: t('talentPortal.card3.title'), desc: t('talentPortal.card3.desc') },
            { icon: CreditCard, title: t('talentPortal.card4.title'), desc: t('talentPortal.card4.desc') }
          ].map((item, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="rounded-3xl p-8 flex flex-col transition-all duration-300 group cursor-pointer border border-[#d0e0b8]/10 bg-[#1e2a0a] hover:bg-[#25330c] shadow-[0_4px_24px_-8px_rgba(0,0,0,0.5)] hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full bg-[#172008] border border-[#d0e0b8]/20 flex items-center justify-center mb-8 group-hover:bg-[#d0e0b8] transition-colors duration-300">
                <item.icon className="w-5 h-5 text-[#d0e0b8] group-hover:text-[#172008] transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">{item.title}</h3>
              <p className="text-[15px] text-[#a8b894] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
