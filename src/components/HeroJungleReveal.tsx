"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

const TOTAL_FRAMES = 192;
const FRAME_DIRECTORY = '/assets/logo-sequence';

// ─── Mobile: clean static hero, no canvas ────────────────────────────────────

function MobileHero() {
    const { t } = useTranslation();
    return (
        <section className="relative min-h-[100svh] bg-[rgb(248,247,242)] flex flex-col items-center justify-between px-6 pt-44 pb-14">
            {/* Subtle grain texture */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
            />

            {/* Logo — fades in with a gentle scale */}
            <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex items-center justify-center pt-12"
            >
                <img
                    src="/assets/tribu-logo-jungle.png"
                    alt="TRIBU"
                    className="w-[72vw] max-w-[300px] h-auto"
                    style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                />
            </motion.div>

            {/* Value proposition + scroll cue */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
            >
                <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-3 leading-[1.2]">
                    <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
                        {t('hero.title')}
                    </span>
                    <br />
                    {t('hero.subtitle')}
                </h2>

                <div className="mt-8 flex flex-col items-center gap-3">
                    <p className="text-[rgb(132,162,50)] text-[11px] font-bold tracking-[0.2em] uppercase">
                        {t('hero.scrollReveal')}
                    </p>
                    <div className="w-px h-10 bg-gradient-to-b from-[rgb(132,162,50)] to-transparent" />
                </div>
            </motion.div>
        </section>
    );
}

// ─── Desktop: full scroll canvas animation (pixel-identical to original) ──────

function DesktopHero() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Preload all 192 frames
    useEffect(() => {
        let loadedCount = 0;
        const tempImages: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = `${FRAME_DIRECTORY}/${String(i).padStart(5, '0')}.jpg`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === TOTAL_FRAMES) {
                    setIsLoading(false);
                }
            };
            tempImages.push(img);
        }
        setImages(tempImages);
    }, []);

    // Canvas drawing — unchanged from original
    useEffect(() => {
        if (!canvasRef.current || images.length < TOTAL_FRAMES) return;

        const context = canvasRef.current.getContext('2d');
        if (!context) return;

        const renderFrame = (index: number) => {
            const img = images[Math.floor(index) - 1];
            if (!img) return;

            const canvas = canvasRef.current!;
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            context.scale(dpr, dpr);

            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            const imgRatio = img.width / img.height;
            const canvasRatio = window.innerWidth / window.innerHeight;

            let drawWidth, drawHeight;
            if (canvasRatio > imgRatio) {
                drawHeight = window.innerHeight * 0.45;
                drawWidth = drawHeight * imgRatio;
            } else {
                drawWidth = window.innerWidth * 0.45;
                drawHeight = drawWidth / imgRatio;
            }

            const offsetX = (window.innerWidth - drawWidth) / 2;
            const offsetY = (window.innerHeight - drawHeight) * 0.62;

            const topCrop = img.height * 0.08;
            const bottomCrop = img.height * 0.12;
            const sideCrop = img.width * 0.05;
            const sourceWidth = img.width - (sideCrop * 2);
            const sourceHeight = img.height - topCrop - bottomCrop;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                sideCrop, topCrop, sourceWidth, sourceHeight,
                offsetX, offsetY, drawWidth, drawHeight * (sourceHeight / img.height)
            );
        };

        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        renderFrame(frameIndex.get());

        const handleResize = () => renderFrame(frameIndex.get());
        window.addEventListener('resize', handleResize);

        return () => {
            unsubscribe();
            window.removeEventListener('resize', handleResize);
        };
    }, [images, frameIndex]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-[rgb(248,247,242)]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-[rgb(248,247,242)]">

                {/* Canvas */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        className="block"
                        style={{ filter: 'contrast(1.05) saturate(1.1)' }}
                    />
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgb(248,247,242)]">
                        <div className="text-sm font-mono tracking-widest text-gray-400 uppercase">
                            {t('hero.preloading')}
                        </div>
                    </div>
                )}

                {/* Value Proposition Text — fades in at end of reveal */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
                        y: useTransform(scrollYProgress, [0.75, 0.9], [40, 0])
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pt-[60vh]"
                >
                    <h2 className="text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-5xl leading-[1.1]">
                        <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
                            {t('hero.title')}
                        </span>
                        <br />
                        {t('hero.subtitle')}
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
                        {t('hero.description')}
                    </p>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0, 0.15, 0.85, 0.95], [1, 0, 0, 0]),
                    }}
                    className="absolute bottom-12 z-20 flex flex-col items-center gap-4"
                >
                    <p className="text-[rgb(132,162,50)] text-sm font-medium tracking-widest uppercase mb-2">
                        {t('hero.scrollReveal')}
                    </p>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[rgb(132,162,50)] to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}

// ─── Entry point — detects mobile on mount, zero flicker ─────────────────────

export function HeroJungleReveal() {
    const [isMobile, setIsMobile] = useState(
        () => typeof window !== 'undefined' ? window.innerWidth < 768 : false
    );

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    return isMobile ? <MobileHero /> : <DesktopHero />;
}
