import React, { useRef, useEffect } from 'react';
import Hls from 'hls.js';
import { BlurIn } from './ui/BlurIn';
import { SplitText } from './ui/SplitText';
import { Sparkles, ArrowRight } from 'lucide-react';

export function HeroVideo() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const videoSrc = "https://stream.mux.com/s8pMcOvMQXc4GD6AX4e1o01xFogFxipmuKltNfSYza0200.m3u8";

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported()) {
            const hls = new Hls({
                autoStartLoad: true,
                startLevel: -1,
                capLevelToPlayerSize: false,
                // Force a high initial bandwidth estimate (e.g., 50Mbps) so the first requested chunk is high-res
                abrEwmaDefaultEstimate: 50000000,
            });

            // Wait for manifest to be parsed, then force the highest available quality level
            hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                if (data.levels && data.levels.length > 0) {
                    // Force it to the highest level available in the manifest
                    hls.currentLevel = data.levels.length - 1;
                }
            });

            hls.loadSource(videoSrc);
            hls.attachMedia(video);
            return () => {
                hls.destroy();
            };
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = videoSrc;
        }
    }, [videoSrc]);

    return (
        <section className="relative w-full h-screen overflow-hidden bg-[#070612]">
            {/* Background Video Layer */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover translate-x-[200px] scale-[1.2] origin-left"
                />
            </div>

            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#070612] to-transparent z-10 pointer-events-none" />

            {/* Content Container */}
            <div className="relative z-20 w-full h-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center items-start">

                {/* Badge */}
                <BlurIn delay={0} duration={0.6}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 backdrop-blur-sm px-4 py-2 mb-6">
                        <Sparkles className="w-3 h-3 text-white/80" />
                        <span className="text-sm font-medium text-white/80">New AI Automation Ally</span>
                    </div>
                </BlurIn>

                {/* Main Heading (Three Lines) */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight lg:leading-[1.2] text-white flex flex-col items-start gap-1 mb-6">
                    <SplitText text="Unlock the Power of AI" delay={0} />
                    <SplitText text="for Your" delay={0.4} /> {/* 5 words * 0.08 = 0.4s */}
                    <SplitText text="Business." delay={0.56} className="font-serif italic" />
                </h1>

                {/* Subtitle */}
                <BlurIn delay={0.4} duration={0.6}>
                    <p className="text-white/80 text-lg font-normal leading-relaxed max-w-xl mb-12">
                        Our cutting-edge AI platform automates, analyzes, and accelerates your workflows so you can focus on what really matters.
                    </p>
                </BlurIn>

                {/* CTA Buttons */}
                <div className="flex flex-wrap items-center gap-4">
                    <BlurIn delay={0.6} duration={0.6}>
                        <a
                            href="/book-call"
                            className="inline-flex items-center justify-center gap-2 bg-white text-[#070612] rounded-full px-5 py-3 font-medium hover:bg-white/90 transition-colors"
                        >
                            Book A Free Call
                            <ArrowRight className="w-4 h-4" />
                        </a>
                    </BlurIn>

                    <BlurIn delay={0.6} duration={0.6}>
                        <button className="inline-flex items-center justify-center bg-white/20 backdrop-blur-sm text-white rounded-full px-8 py-3 font-medium hover:bg-white/30 transition-colors">
                            Learn now
                        </button>
                    </BlurIn>
                </div>

            </div>
        </section>
    );
}
