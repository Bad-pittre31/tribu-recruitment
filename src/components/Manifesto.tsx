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
    <section ref={sectionRef} className="relative py-40 bg-[#172008] overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#d0e0b8]/5 rounded-full blur-[200px] opacity-20 -translate-y-1/2 translate-x-1/3" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight text-white">
            {t('manifesto.title')}
          </h2>
        </div>

        <div className="space-y-16 md:space-y-24">
          {manifestoItems.map((num, index) => (
            <div
              key={num}
              ref={el => { if (el) itemsRef.current[index] = el; }}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 group"
            >
              <div className="md:w-5/12">
                <span className="text-xs font-bold tracking-[0.3em] opacity-40 mb-2 block uppercase text-white">Traditional</span>
                <p className="text-lg md:text-xl text-white/60 mb-2">
                  {t(`manifesto.item${num}.trad`)}
                </p>
              </div>

              <div className="hidden md:flex w-2/12 justify-center">
                <div className="w-[1px] h-16 bg-white/20 transition-colors duration-500 group-hover:bg-[#d0e0b8]" />
              </div>

              <div className="md:w-5/12">
                <span className="text-xs font-bold tracking-[0.3em] text-[#d0e0b8] mb-2 block uppercase">TRIBU Model</span>
                <p className="text-2xl md:text-3xl font-bold text-white">
                  {t(`manifesto.item${num}.tribu`)}
                  <span className="text-[#d0e0b8] italic ml-2">{t(`manifesto.item${num}.highlight`)}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
