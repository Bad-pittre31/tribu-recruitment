import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

export function TribuTransition() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

    // Extended section height to allow natural user scrolling down the page
    // Using sticky on the iframe wrapper so the Spline scene stays fixed in view
    // while the user scrolls through the 150vh section, giving it time to play its 3D depth sequence.
    return (
        <section ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">

            {/* Spline Background Layer (Edge-to-Edge) */}
            <div className="absolute inset-0 z-0 flex items-center justify-center">
                <iframe
                    src="https://my.spline.design/3dforestscene-q6RNvTjYLPmsg5uagQEYZ2lM/?scroll=false&zoom=false"
                    frameBorder="0"
                    className="w-full h-full relative z-0"
                    title="Interactive Tribal Forest Scene"
                ></iframe>
            </div>

            {/* Protective Dark Gradient Overlay for Typography Contrast */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-black/40" />

            {/* Centered HTML Typography Overlay */}
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
