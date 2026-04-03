import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Manifesto() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const manifestoItems = [1, 2, 3, 4];

  return (
    <section ref={sectionRef} className="relative z-[10000] py-60 overflow-hidden" style={{ backgroundColor: 'rgb(252, 254, 250)' }}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-black/5 rounded-full blur-[200px] opacity-10 -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl lg:text-[80px] font-instrument italic font-normal tracking-tight leading-[1.1]">
            <span className="bg-gradient-to-r from-[#172008] via-[#4a7c59] to-[#172008] bg-clip-text text-transparent">
              {t('manifesto.title')}
            </span>
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {manifestoItems.map((num, index) => (
            <div
              key={num}
              ref={el => { if (el) itemsRef.current[index] = el; }}
              className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr] items-center gap-8 group"
            >
              {/* Left Column (Traditional) - Right align on desktop */}
              <div className="md:text-right">
                <span className="text-xs font-bold tracking-[0.3em] opacity-40 mb-2 block uppercase text-black">Traditional</span>
                <p className="text-lg md:text-xl text-black/60 font-medium">
                  {t(`manifesto.item${num}.trad`)}
                </p>
              </div>

              {/* Vertical Dash - Perfectly Centered Grid Cell */}
              <div className="hidden md:flex justify-center items-center">
                <div className="w-[1px] h-20 bg-black/10 transition-colors duration-500 group-hover:bg-[#84A232]" />
              </div>

              {/* Right Column (TRIBU) */}
              <div className="md:text-left">
                <span className="text-xs font-bold tracking-[0.3em] text-[#84A232] mb-2 block uppercase">TRIBU Model</span>
                <p className="text-2xl md:text-3xl font-bold text-black leading-tight">
                  {t(`manifesto.item${num}.tribu`)}
                  <span className="text-[#84A232] italic ml-2">{t(`manifesto.item${num}.highlight`)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
