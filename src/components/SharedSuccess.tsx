import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTranslation } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export function SharedSuccess() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(cardsRef.current,
                { opacity: 0, scale: 0.95, y: 40 },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const cards = [
        {
            title: t('sharedSuccess.card1.title'),
            desc1: t('sharedSuccess.card1.desc1'),
            desc2: t('sharedSuccess.card1.desc2')
        },
        {
            title: t('sharedSuccess.card2.title'),
            desc1: t('sharedSuccess.card2.desc1'),
            desc2: t('sharedSuccess.card2.desc2')
        }
    ];

    return (
        <section ref={sectionRef} id="shared-success" className="relative z-[10000] py-32 bg-[#172008] overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">

                {/* Centered Header Block */}
                <div className="text-center max-w-4xl mx-auto mb-24">
                    <h5 className="text-sm md:text-base font-bold tracking-[0.4em] text-[#d0e0b8] uppercase mb-8 drop-shadow-sm">
                        {t('sharedSuccess.label')}
                    </h5>

                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter mb-8 leading-tight text-white">
                        {t('sharedSuccess.title')}<br />
                        <span className="text-[#a8b894]">{t('sharedSuccess.subtitle')}</span>
                    </h2>

                    <p className="text-lg md:text-xl text-[#94a382] leading-relaxed mx-auto max-w-2xl">
                        {t('sharedSuccess.description')}
                    </p>
                </div>

                {/* Deep Dual-Card Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">
                    {cards.map((item, index) => (
                        <div
                            key={index}
                            ref={el => { if (el) cardsRef.current[index] = el; }}
                            className="rounded-[3rem] p-10 md:p-14 flex flex-col transition-all duration-500 group cursor-pointer border border-[#d0e0b8]/10 bg-[#1e2a0a] hover:bg-white/5 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] hover:-translate-y-2 relative overflow-hidden"
                        >
                            {/* Subtle organic light bleed */}
                            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#d0e0b8]/5 rounded-full blur-3xl group-hover:bg-[#d0e0b8]/10 transition-colors duration-500 pointer-events-none" />

                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-white tracking-tight relative z-10 leading-tight">
                                {item.title}
                            </h3>

                            <div className="space-y-4 relative z-10">
                                <p className="text-[17px] text-[#a8b894] leading-relaxed">
                                    {item.desc1}
                                </p>
                                <p className="text-[17px] text-white/90 leading-relaxed font-medium">
                                    {item.desc2}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
