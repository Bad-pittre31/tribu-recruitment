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
    <section ref={containerRef} className="relative pt-20 pb-0 overflow-hidden bg-white">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <div className="order-2 lg:order-1 relative h-[600px] lg:h-[1000px] w-full z-0 flex items-center justify-center overflow-hidden">
            <iframe
              src="https://my.spline.design/interactiveaiwebsite-Rfv89PWmTh8h7T9pELuNWADT/"
              frameBorder="0"
              style={{
                width: '220%',
                height: '220%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="z-10 bg-transparent block"
              title="Interactive AI Website Candidate Delivery"
            ></iframe>
          </div>

          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight" ref={el => { if (el) elementsRef.current[0] = el; }}>
              <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent block">{t('aiLayer.titlePrefix')}</span>
              <span className="text-black">{t('aiLayer.titleSuffix')}</span>
            </h2>

            <p className="text-lg text-gray-500 mb-10 leading-relaxed" ref={el => { if (el) elementsRef.current[1] = el; }}>
              {t('aiLayer.description')}
            </p>

            <ul className="space-y-6" ref={el => { if (el) elementsRef.current[2] = el; }}>
              {[
                { title: t('aiLayer.item1.title'), desc: t('aiLayer.item1.desc') },
                { title: t('aiLayer.item2.title'), desc: t('aiLayer.item2.desc') },
                { title: t('aiLayer.item3.title'), desc: t('aiLayer.item3.desc') }
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 shadow-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-black" />
                  </div>
                  <div>
                    <h4 className="font-medium text-black mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
