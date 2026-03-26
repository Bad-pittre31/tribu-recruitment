import React from 'react';
import { motion } from 'motion/react';
import { Star } from 'lucide-react';

export function HeroLight() {
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
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }
    };

    return (
        <section className="relative w-full min-h-screen bg-white overflow-hidden flex flex-col items-center">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover [transform:scaleY(-1)]"
                    src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260302_085640_276ea93b-d7da-4418-a09b-2aa5b490e838.mp4"
                />
                {/* Soft elegant white gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,255,255,0)] via-[rgba(255,255,255,0.4)] to-white" />
            </div>

            {/* Subtle Tropical Leaf Intro (Top Left) */}
            <img
                src="/assets/monstera.png"
                alt=""
                className="absolute top-0 left-0 w-[400px] md:w-[600px] -translate-x-1/3 -translate-y-1/4 -rotate-12 opacity-[0.35] mix-blend-multiply pointer-events-none z-[1]"
            />

            {/* Content Container */}
            <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 lg:px-12 pt-[290px] pb-24 flex flex-col items-start gap-8">

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-start gap-8"
                >
                    {/* Premium Badge */}
                    <motion.div variants={itemVariants}>
                        <div className="inline-flex items-center rounded-full border border-black/10 bg-white/50 backdrop-blur-md px-4 py-1.5 shadow-sm">
                            <span className="text-[13px] font-medium text-black/70 uppercase tracking-wider">AI-powered recruitment</span>
                        </div>
                    </motion.div>

                    {/* Headline */}
                    <motion.h1 variants={itemVariants} className="font-geist font-medium tracking-[-0.04em] text-5xl md:text-6xl lg:text-[80px] leading-[1.05] text-black max-w-4xl">
                        Simple <span className="font-instrument italic text-[#222]">hiring</span> for modern teams
                    </motion.h1>

                    {/* Paragraph */}
                    <motion.p variants={itemVariants} className="max-w-[554px] text-[18px] text-[#373a46]/80 leading-relaxed">
                        TRIBU helps companies hire faster through premium tech recruitment and AI-enhanced candidate presentation.
                    </motion.p>

                    {/* CTA Block */}
                    <motion.div variants={itemVariants} className="flex flex-col gap-4 mt-4">
                        <div className="flex flex-col sm:flex-row sm:items-center p-2 rounded-[2rem] bg-[#fcfcfc] border border-black/5 shadow-[0_4px_24px_rgba(0,0,0,0.04)] gap-2 max-w-[400px]">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent outline-none px-4 sm:px-6 py-2 text-[15px] placeholder-black/40 text-black flex-1"
                            />
                            <button className="bg-[#111] hover:bg-black text-white px-8 py-3.5 rounded-full text-[15px] font-medium transition-colors shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] whitespace-nowrap self-stretch">
                                Book a call
                            </button>
                        </div>

                        {/* Social Proof */}
                        <div className="flex items-center gap-2 px-2 mt-2">
                            <div className="flex items-center gap-0.5">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} className="w-4 h-4 fill-[#F5A623] text-[#F5A623]" />
                                ))}
                            </div>
                            <span className="text-[14px] text-black/60 font-medium tracking-tight">1,020+ Reviews</span>
                        </div>
                    </motion.div>
                </motion.div>

            </div>
        </section>
    );
}
