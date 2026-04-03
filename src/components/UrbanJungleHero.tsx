import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

export function UrbanJungleHero() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"]
    });

    // Animate background zoom/opacity
    const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 1]);
    const bgOpacity = useTransform(scrollYProgress, [0.7, 1], [1, 0.4]);
    
    // Animate initial headline
    const headlineOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const headlineY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);

    // Animate glass panel
    const panelOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);
    const panelY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
    const panelScale = useTransform(scrollYProgress, [0.3, 0.6], [0.9, 1]);

    return (
        <section ref={sectionRef} className="relative w-full h-[200vh] bg-black overflow-hidden selection:bg-[#84A232] selection:text-white">
            
            {/* Sticky Container for the scene */}
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* Immersive Background Scene */}
                <motion.div 
                    style={{ 
                        scale: bgScale,
                        opacity: bgOpacity
                    }}
                    className="absolute inset-0 z-0"
                >
                    <img 
                        src="https://motionsites.ai/assets/hero-urban-jungle-preview-DUD-6bVK.gif" 
                        alt="Urban Jungle Subway" 
                        className="w-full h-full object-cover"
                    />
                    {/* Cinematic overlays */}
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
                </motion.div>

                {/* Initial Luxurious Editorial Headline */}
                <motion.div
                    style={{ 
                        opacity: headlineOpacity,
                        y: headlineY
                    }}
                    className="relative z-20 text-center px-6 max-w-5xl"
                >
                    <h1 className="text-5xl md:text-8xl lg:text-[120px] font-instrument font-normal text-white tracking-tight leading-[0.9]">
                        {t('urbanJungle.heroTitle')}
                        <span className="italic block mt-2">{t('urbanJungle.heroItalic')}</span>
                    </h1>
                </motion.div>

                {/* Transition State: Glassmorphism Panel */}
                <motion.div
                    style={{ 
                        opacity: panelOpacity,
                        y: panelY,
                        scale: panelScale
                    }}
                    className="absolute inset-0 z-30 flex items-center justify-center px-6"
                >
                    <div className="w-full max-w-4xl bg-[#172008]/40 backdrop-blur-[40px] rounded-[3rem] p-12 md:p-20 border border-white/10 shadow-2xl relative overflow-hidden">
                        {/* Organic internal glow */}
                        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-[#84A232]/10 blur-[120px] rounded-full pointer-events-none" />
                        
                        <div className="relative z-10 text-center space-y-8">
                            <h2 className="text-4xl md:text-6xl font-instrument italic text-white leading-tight">
                                {t('urbanJungle.panelTitle')}
                            </h2>
                            <p className="text-lg md:text-xl text-[#d0e0b8]/80 leading-relaxed font-light max-w-2xl mx-auto">
                                {t('urbanJungle.panelDescription')}
                            </p>
                            
                            {/* Potential subtle scroll indicator inside the panel */}
                            <div className="pt-8">
                                <div className="w-[1px] h-12 bg-gradient-to-b from-[#84A232] to-transparent mx-auto" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Minimal Top Navigation (Pill buttons) */}
                <div className="absolute top-8 left-0 w-full z-50 flex justify-center px-6 pointer-events-none">
                    <nav className="flex items-center gap-2 p-1.5 bg-black/20 backdrop-blur-xl rounded-full border border-white/5 pointer-events-auto">
                        {['Experience', 'Approach', 'Results'].map((item) => (
                            <button 
                                key={item} 
                                className="px-6 py-2.5 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition-colors duration-300"
                            >
                                {item}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Ambient Particles Layer (Simplified CSS) */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 balance-noise" />
                </div>
            </div>
            
        </section>
    );
}
