import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useInView } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function TransparencyEconomics() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const leftColRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(leftColRef.current,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
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
        <section ref={sectionRef} id="transparency" className="relative w-full min-h-[900px] bg-white overflow-hidden flex items-center">

            {/* Background Spline Visual - Full Width */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <iframe
                    src="https://my.spline.design/reededliquidglassprismherosectionconcept-hzAqWz4flc21BZNyZvQOdVXh/?scroll=false&zoom=false"
                    frameBorder="0"
                    className="w-[150%] h-[110%] absolute top-1/2 left-[70%] -translate-x-1/2 -translate-y-1/2 border-none"
                    title="Liquid Glass Prism Transparency Concept"
                ></iframe>
            </div>

            {/* Foreground Text Block - Absolute over left side */}
            <div className="relative z-10 w-full max-w-7xl mx-auto px-8 lg:px-12 pointer-events-none">
                <div ref={leftColRef} className="max-w-2xl pointer-events-auto bg-white/10 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-6 md:p-0 rounded-3xl md:rounded-none">

                    <h2 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter leading-[0.9] text-[#172008] mb-12">
                        <span className="opacity-10 block">{t('transparency.titleHighlight')}</span>
                        <span className="block">{t('transparency.titlePrefix')}</span>
                        <span className="block opacity-40">{t('transparency.titleSuffix')}</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xl md:text-2xl text-[#172008]/60 tracking-tight leading-snug max-w-4xl">
                        <p>{t('transparency.p1')}</p>
                        <p>{t('transparency.p2')}</p>
                        <p>{t('transparency.p3')}</p>
                        <p>{t('transparency.p4')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
