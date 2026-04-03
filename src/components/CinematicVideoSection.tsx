import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

export function CinematicVideoSection() {
    const { t } = useTranslation();
    const [showHeadline, setShowHeadline] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    
    // Check if the section is mostly visible before paying the video
    const isInView = useInView(sectionRef, { once: true, amount: 0.4 });

    useEffect(() => {
        if (isInView && videoRef.current) {
            // Play video only when in view
            videoRef.current.play().catch(e => console.log("Autoplay prevented:", e));
            
            // Trigger the headline 7.5 seconds AFTER the video actually starts
            const timer = setTimeout(() => {
                setShowHeadline(true);
            }, 7500);

            return () => clearTimeout(timer);
        }
    }, [isInView]);

    return (
        <section ref={sectionRef} className="relative w-full h-[50vh] lg:h-[75vh] max-h-[800px] overflow-hidden bg-black flex items-center justify-center border-y border-white/5">
            {/* Background Video */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    onEnded={(e) => {
                        // Freeze on last frame - video tag does this naturally if loop is false
                        console.log("Video ended, freezing on last frame.");
                    }}
                >
                    <source src="/video/subway-cinematic.mp4" type="video/mp4" />
                </video>
                
                {/* Immersive Overlay - slightly darker as requested */}
                <div className="absolute inset-0 bg-black/40 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none z-10" />
            </div>

            {/* Premium Headline Overlay */}
            <div className="relative z-20 px-6 text-center max-w-5xl mx-auto">
                <AnimatePresence>
                    {showHeadline && (
                        <motion.h2
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ 
                                duration: 1.5, 
                                ease: [0.16, 1, 0.3, 1] 
                            }}
                            className="font-sans font-bold text-5xl md:text-7xl lg:text-[90px] tracking-tighter leading-[1.1] drop-shadow-2xl"
                        >
                            <span className="bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
                                {t('cinematic.title')}
                            </span>
                        </motion.h2>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
