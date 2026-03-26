import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { ArrowUpRight, ShieldCheck, Activity, BrainCircuit } from 'lucide-react';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function Differentiators() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  const features = [
    {
      id: '01',
      title: t('differentiators.item1.title'),
      description: t('differentiators.item1.description'),
      icon: ShieldCheck,
      tags: t('differentiators.item1.tags'),
      visual: 'Diagnostic Shuffler'
    },
    {
      id: '02',
      title: t('differentiators.item2.title'),
      description: t('differentiators.item2.description'),
      icon: Activity,
      tags: t('differentiators.item2.tags'),
      visual: 'Telemetry Typewriter'
    },
    {
      id: '03',
      title: t('differentiators.item3.title'),
      description: t('differentiators.item3.description'),
      icon: BrainCircuit,
      tags: t('differentiators.item3.tags'),
      visual: 'Cursor Protocol Scheduler'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        gsap.fromTo(card,
          { opacity: 0, y: 100, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="model" className="relative py-32 bg-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-32 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6">
            <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
              {t('differentiators.title')}
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed mx-auto">
            {t('differentiators.description')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              ref={el => {
                if (el) cardsRef.current[index] = el;
              }}
              className="bg-white rounded-3xl p-8 flex flex-col h-full group hover:border-gray-300 border border-gray-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-sm font-mono text-gray-400 tracking-widest">{feature.id}</span>
                <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100 group-hover:bg-gray-100 group-hover:text-black text-gray-400 transition-colors duration-500">
                  <feature.icon className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 tracking-tight text-black">{feature.title}</h3>
              <p className="text-gray-500 mb-8 flex-grow leading-relaxed">
                {feature.description}
              </p>

              <div className="space-y-3 mb-8">
                {feature.tags.map((tag, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-black transition-colors duration-500" />
                    <span>{tag}</span>
                  </div>
                ))}
              </div>

              {/* Abstract Visual Representation Placeholder */}
              <div className="mt-auto pt-8 border-t border-gray-100">
                <div className="h-24 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden relative flex items-center justify-center group/visual">
                  <span className="text-xs font-mono text-gray-400 uppercase tracking-widest opacity-60 z-10 transition-opacity duration-500 group-hover/visual:opacity-100">
                    {feature.visual}
                  </span>
                  {/* Simulate activity */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover/visual:opacity-100 group-hover/visual:animate-[pulse_2s_ease-in-out_infinite] transition-opacity duration-1000" />

                  {/* Scanning line effect */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-black/10 opacity-0 group-hover/visual:opacity-100 group-hover/visual:animate-[scan_3s_linear_infinite]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
