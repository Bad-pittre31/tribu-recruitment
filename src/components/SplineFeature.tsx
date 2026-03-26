import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
};

export function SplineFeature() {
    const { t } = useTranslation();
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    return (
        <section ref={sectionRef} className="relative w-full bg-[#FFFFFF] overflow-hidden z-10">

            <div className="flex flex-col lg:flex-row w-full min-h-[700px] lg:h-[85vh] relative z-20">

                {/* Left Side: 60% Width - Spline Visual (Sticky Anchored) */}
                <div className="w-full lg:w-[60%] h-[50vh] lg:h-full relative bg-[#FFFFFF] pointer-events-auto">
                    <div className="sticky top-0 h-full w-full flex items-center justify-center overflow-hidden">
                        <iframe
                            src="https://my.spline.design/interactivecolorblob-3n7wrUXYlkVucgwJQCarkGPF/"
                            frameBorder="0"
                            className="w-full h-full relative z-10 block pointer-events-none"
                            title="Interactive 3D Color Blob Candidate Dimension"
                        ></iframe>
                    </div>
                </div>

                {/* Right Side: 40% Width - Editable Text Block */}
                <div className="w-full lg:w-[40%] flex flex-col justify-center px-8 lg:px-24 xl:px-32 py-20 lg:py-0 bg-[#FFFFFF]">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                        className="flex flex-col items-start gap-8 max-w-xl"
                    >
                        {/* Headline */}
                        <motion.h2 variants={itemVariants} className="font-geist font-bold tracking-tight text-4xl lg:text-[44px] leading-[1.1] text-black">
                            {t('splineFeature.title')}<br />
                            <span className="font-instrument italic text-[#222] font-normal block mt-1">{t('splineFeature.italic')}</span>
                        </motion.h2>

                        {/* Paragraph */}
                        <motion.p variants={itemVariants} className="text-base lg:text-lg text-gray-600 leading-relaxed font-light">
                            {t('splineFeature.description')}
                        </motion.p>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
