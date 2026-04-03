import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function AILayer() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Re-filter valid elements to avoid null refs during fast refresh
      const validElements = elementsRef.current.filter(Boolean);

      gsap.fromTo(validElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="ai-layer" className="relative py-48 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="order-2 lg:order-1 relative h-[600px] lg:h-[800px] w-full z-0 flex items-center justify-center overflow-hidden rounded-[3rem]">
            <iframe
              src="https://my.spline.design/interactiveaiwebsite-Rfv89PWmTh8h7T9pELuNWADT/?antialiasing=1&quality=high"
              frameBorder="0"
              style={{
                width: '320%',
                height: '320%',
                position: 'absolute',
                top: '50%',
                left: '75%', // Shifted even further right to allow a massive size without clipping the left edge
                transform: 'translate(-50%, -50%)',
              }}
              className="z-10 bg-transparent block"
              title="Interactive AI Website Candidate Delivery"
            ></iframe>
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-10 leading-[1.05]" ref={el => { if (el) elementsRef.current[0] = el; }}>
              <span className="bg-gradient-to-r from-[#172008] via-[#4a7c59] to-[#172008] bg-clip-text text-transparent block">{t('aiLayer.titlePrefix')}</span>
              <span className="text-black">{t('aiLayer.titleSuffix')}</span>
            </h2>

            <p className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl" ref={el => { if (el) elementsRef.current[1] = el; }}>
              {t('aiLayer.description')}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 w-full" ref={el => { if (el) elementsRef.current[2] = el; }}>
              {[
                { title: t('aiLayer.item1.title'), desc: t('aiLayer.item1.desc') },
                { title: t('aiLayer.item4.title'), desc: t('aiLayer.item4.desc') },
                { title: t('aiLayer.item2.title'), desc: t('aiLayer.item2.desc') },
                { title: t('aiLayer.item3.title'), desc: t('aiLayer.item3.desc') }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#effae8] flex items-center justify-center shrink-0 shadow-sm border border-[#84A232]/10 transition-transform group-hover:scale-110">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="#84A232" fillOpacity="0.2" stroke="#84A232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" stroke="#84A232" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2 text-lg">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
