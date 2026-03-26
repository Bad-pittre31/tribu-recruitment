import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Target, BrainCircuit, Search, CircleDollarSign, Handshake } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Protocol() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const steps = [
    {
      id: '01',
      title: t('protocol.step1.title'),
      description: t('protocol.step1.description'),
      icon: Target,
    },
    {
      id: '02',
      title: t('protocol.step2.title'),
      description: t('protocol.step2.description'),
      icon: BrainCircuit,
    },
    {
      id: '03',
      title: t('protocol.step3.title'),
      description: t('protocol.step3.description'),
      icon: Search,
    },
    {
      id: '04',
      title: t('protocol.step4.title'),
      description: t('protocol.step4.description'),
      icon: CircleDollarSign,
    },
    {
      id: '05',
      title: t('protocol.step5.title'),
      description: t('protocol.step5.description'),
      icon: Handshake,
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Re-initialize cards array in case of fast refresh
      const validCards = cardsRef.current.filter(Boolean);

      validCards.forEach((card, index) => {
        gsap.to(card, {
          scale: 1 - (validCards.length - index - 1) * 0.05,
          y: (validCards.length - index - 1) * -20,
          opacity: 1 - (validCards.length - index - 1) * 0.1,
          scrollTrigger: {
            trigger: card,
            start: "top 20%",
            endTrigger: containerRef.current,
            end: "bottom bottom",
            scrub: true,
            pin: true,
            pinSpacing: false
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="protocol" className="relative pt-0 pb-20 bg-white overflow-hidden">

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="mb-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 text-black">
            <span className="text-gray-400 block">{t('protocol.titlePrefix')}</span>
            <span>{t('protocol.titleSuffix')}</span>
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            {t('protocol.description')}
          </p>
        </div>

        <div className="relative flex flex-col items-center gap-10 pb-[40vh]">
          {steps.map((step, index) => (
            <div
              key={step.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="w-full max-w-3xl rounded-3xl p-10 md:p-16 flex flex-col md:flex-row gap-10 items-start sticky top-[20vh] bg-white/80 backdrop-blur-xl border border-gray-100 shadow-[0_8px_32px_rgba(0,0,0,0.06)]"
              style={{ zIndex: index }}
            >
              <div className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                <step.icon className="w-8 h-8 text-black" />
              </div>

              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-sm font-mono text-gray-400 tracking-widest">{t('common.step')} {step.id}</span>
                  <div className="h-[1px] w-12 bg-gray-200" />
                </div>
                <h3 className="text-3xl font-bold mb-6 tracking-tight text-black">{step.title}</h3>
                <p className="text-lg text-gray-500 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
