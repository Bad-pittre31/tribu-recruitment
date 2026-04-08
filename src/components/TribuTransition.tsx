import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

export function TribuTransition() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Desktop: Spline 3D forest — full WebGL */}
            <div className="hidden lg:block absolute inset-0 z-0">
                <iframe
                    src="https://my.spline.design/3dforestscene-q6RNvTjYLPmsg5uagQEYZ2lM/?scroll=false&zoom=false"
                    frameBorder="0"
                    className="w-full h-full"
                    title="Interactive Tribal Forest Scene"
                ></iframe>
            </div>

            {/* Mobile: CSS-only dark forest — no WebGL, no crash */}
            <div className="lg:hidden absolute inset-0 z-0"
                style={{ background: 'linear-gradient(180deg, #000000 0%, #050e02 30%, #0a1a05 60%, #0f2508 100%)' }}
            >
                {/* Tree silhouettes as pure CSS */}
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-around opacity-30">
                    {[60, 90, 75, 110, 65, 95, 80].map((h, i) => (
                        <div key={i}
                            style={{
                                width: '14%',
                                height: `${h}%`,
                                background: 'linear-gradient(to top, #0a1a05, #050e02)',
                                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                                opacity: 0.4 + i * 0.08,
                            }}
                        />
                    ))}
                </div>
                {/* Misty glow */}
                <div className="absolute inset-0 opacity-15"
                    style={{ backgroundImage: 'radial-gradient(ellipse at 50% 80%, #2a5a20 0%, transparent 60%)' }}
                />
            </div>

            {/* Overlay — same on both */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/40" />

            {/* Centered Headline */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 pointer-events-none"
            >
                <h2 className="font-sans text-5xl md:text-7xl lg:text-[100px] font-bold uppercase tracking-widest text-white drop-shadow-2xl">
                    {t('transition.title')}
                </h2>
            </motion.div>
        </section>
    );
}
