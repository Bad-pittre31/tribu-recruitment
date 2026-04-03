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

            {/* Background Spline Visual - Full Width & Centered */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#FBFDFB]">
                <iframe
                    src="https://my.spline.design/reededliquidglassprismherosectionconcept-hzAqWz4flc21BZNyZvQOdVXh/?scroll=false&zoom=false"
                    frameBorder="0"
                    className="w-full h-full md:w-[150%] md:h-[120%] absolute top-1/2 left-1/2 md:left-[60%] -translate-x-1/2 -translate-y-1/2 border-none"
                    title="Liquid Glass Prism Transparency Concept"
                ></iframe>
            </div>

            {/* Foreground Text Block - Absolute over left side */}
            <div className="relative z-10 w-full px-6 md:px-20 lg:px-32 pointer-events-none">
                <div ref={leftColRef} className="max-w-4xl pointer-events-auto">

                    <h2 className="text-5xl md:text-7xl lg:text-[100px] font-bold tracking-tighter leading-[0.9] text-[#172008] mb-12">
                        <motion.span 
                            initial={{ filter: 'blur(10px)', opacity: 0.5 }}
                            whileHover={{ filter: 'blur(0px)', opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="block cursor-crosshair"
                        >
                            {t('transparency.titleHighlight')}
                        </motion.span>
                        <span className="block">{t('transparency.titlePrefix')}</span>
                        <span className="block opacity-40">{t('transparency.titleSuffix')}</span>
                    </h2>

                    <ul className="space-y-4 text-base md:text-lg text-[#172008]/70 tracking-tight leading-relaxed list-none p-0">
                        {[t('transparency.p1'), t('transparency.p2'), t('transparency.p3'), t('transparency.p4')].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#84A232]" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
