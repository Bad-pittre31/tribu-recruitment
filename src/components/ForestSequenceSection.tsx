import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';

const cards = [
    {
        title: "AI-powered recruitment",
        text: "Smarter candidate evaluation, structured competency dossiers, and better hiring decisions powered by Miixeo."
    },
    {
        title: "Shared value with talent",
        text: "A partnership model designed to reward alignment, trust, and long-term collaboration."
    },
    {
        title: "Transparent economics",
        text: "Clear models, visible margins, and a hiring relationship built on trust from day one."
    },
    {
        title: "Pay As They Stay™",
        text: "A progressive hiring model where payment follows real integration and success."
    }
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.6, // Slower, more elegant stagger sequence
            delayChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    show: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] } // Very slow float to match the slowed timing logic
    }
};

export function ForestSequenceSection() {
    const [showCards, setShowCards] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Track when the section enters the viewport (trigger when 50% visible)
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const currentTime = videoRef.current.currentTime;

            // Wait deeply into the video until it visually settles on the end frame
            if (currentTime > 6.0 && !showCards) {
                setShowCards(true);
            }
        }
    };

    // Skip the empty beginning by setting currentTime gracefully
    const handleLoadedMetadata = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 2.0; // Skip ~2 seconds to jump faster into the action
        }
    }

    // Play video only when it scrolls into view
    useEffect(() => {
        const playVideo = async () => {
            if (isInView && videoRef.current) {
                try {
                    await videoRef.current.play();
                } catch (e) {
                    console.log("Autoplay blocked, showing cards immediately as fallback.");
                    setShowCards(true);
                }
            }
        };
        playVideo();
    }, [isInView]);

    return (
        <section
            ref={containerRef}
            className="relative w-full min-h-screen bg-white py-24 lg:py-32 flex flex-col items-center justify-center overflow-x-hidden"
        >

            {/* Cinematic Container - Widened Slightly to max-w-screen-2xl (1536px) */}
            <div className="relative w-full max-w-[1536px] mx-auto px-4 md:px-8">

                {/* The Video Frame */}
                <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] border border-gray-100 group">
                    <video
                        ref={videoRef}
                        src="/video/forest-sequence.mp4"
                        onTimeUpdate={handleTimeUpdate}
                        onLoadedMetadata={handleLoadedMetadata}
                        muted
                        playsInline
                        // No loop -- freeze on the final frame
                        className="w-full h-full object-cover pointer-events-none opacity-[0.85] transition-opacity duration-1000 mix-blend-multiply"
                    />

                    {/* Subtle internal shadows to blend the video edges into the light frame */}
                    <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/10 to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-r from-white/50 via-transparent to-white/50 pointer-events-none" />


                    {/* Floating Cards Overlay - constrained inside the cinematic frame */}
                    <div className="absolute inset-x-0 bottom-0 z-10 w-full px-6 pb-10 md:pb-16 h-full flex flex-col justify-end">
                        <AnimatePresence>
                            {showCards && (
                                <motion.div
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="show"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full max-w-[1400px] mx-auto"
                                >
                                    {cards.map((card, idx) => (
                                        <motion.div
                                            key={idx}
                                            variants={itemVariants}
                                            className="relative group/card p-8 rounded-2xl bg-white/70 md:bg-white/80 border border-gray-200 shadow-[0_4px_24px_rgba(0,0,0,0.04)] overflow-hidden hover:bg-white transition-colors duration-700 backdrop-blur-xl"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-br from-black/[0.02] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                            {/* Extra light glass border */}
                                            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-50" />

                                            <div className="relative z-10">
                                                <h3 className="text-lg md:text-xl font-semibold text-black mb-3 tracking-tight">
                                                    {card.title}
                                                </h3>
                                                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                                    {card.text}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Decorative outer glow for the frame - adapted to light theme */}
                <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/[0.02] to-transparent blur-[100px] opacity-100 transform scale-105" />
            </div>
        </section>
    );
}
