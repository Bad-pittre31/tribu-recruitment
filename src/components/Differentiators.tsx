import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Differentiators() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      title: t('differentiators.item1.title'),
      description: t('differentiators.item1.description'),
      tags: t('differentiators.item1.tags')
    },
    {
      title: t('differentiators.item2.title'),
      description: t('differentiators.item2.description'),
      tags: t('differentiators.item2.tags')
    },
    {
      title: t('differentiators.item3.title'),
      description: t('differentiators.item3.description'),
      tags: t('differentiators.item3.tags')
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: index * 0.15,
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="model" className="relative py-40 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-[#19200B] via-[#4a7c59] to-[#19200B] bg-clip-text text-transparent">
              {t('differentiators.title')}
            </h2>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed mx-auto font-medium">
              {t('differentiators.description')}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-[2.5rem] p-10 md:p-12 flex flex-col h-full border border-gray-100 shadow-[0_5px_40px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.04)] transition-all duration-700 ease-out group hover:-translate-y-2"
            >
              <h3 className="text-2xl font-bold mb-6 tracking-tight text-black">
                {feature.title}
              </h3>
              
              <p className="text-gray-500 mb-10 text-[17px] leading-relaxed font-medium flex-grow">
                {feature.description}
              </p>

              <div className="mt-auto pt-8 border-t border-gray-50">
                <div className="flex flex-wrap gap-2.5">
                  {Array.isArray(feature.tags) && feature.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-4 py-2 rounded-full bg-gray-50 text-[13px] text-gray-400 font-bold tracking-tight border border-gray-100 group-hover:bg-black group-hover:text-white group-hover:border-black transition-all duration-500"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
