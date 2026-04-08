"use client";

import React, { useRef, useEffect, useState } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'motion/react';
import { useTranslation } from '../contexts/LanguageContext';

const TOTAL_FRAMES = 192;
const FRAME_DIRECTORY = '/assets/logo-sequence';

export function HeroJungleReveal() {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Track scroll progress through the section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Smooth out the scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Map scroll progress (0..1) to frame index (1..192)
    const frameIndex = useTransform(smoothProgress, [0, 1], [1, TOTAL_FRAMES]);

    // Preload images
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

    // Canvas drawing logic
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

            // Enable high-quality smoothing to prevent pixelation
            context.imageSmoothingEnabled = true;
            context.imageSmoothingQuality = 'high';

            const imgRatio = img.width / img.height;
            const canvasRatio = window.innerWidth / window.innerHeight;

            // Aim for 45% of viewport size for a more qualitative and sharper presence
            const scaleFactor = 0.45;
            let drawWidth, drawHeight;

            if (canvasRatio > imgRatio) {
                drawHeight = window.innerHeight * scaleFactor;
                drawWidth = drawHeight * imgRatio;
            } else {
                drawWidth = window.innerWidth * scaleFactor;
                drawHeight = drawWidth / imgRatio;
            }

            const offsetX = (window.innerWidth - drawWidth) / 2;
            const offsetY = (window.innerHeight - drawHeight) / 2;

            // Crop 8% from top, 12% from bottom, and 5% from each side
            const topCrop = img.height * 0.08;
            const bottomCrop = img.height * 0.12;
            const sideCrop = img.width * 0.05;

            const sourceWidth = img.width - (sideCrop * 2);
            const sourceHeight = img.height - topCrop - bottomCrop;

            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(
                img,
                sideCrop, topCrop, sourceWidth, sourceHeight, // Source rect (cropping all sides)
                offsetX, offsetY, drawWidth, drawHeight * (sourceHeight / img.height) // Dest rect
            );
        };

        // Subscribe to frame changes
        const unsubscribe = frameIndex.on("change", (latest) => {
            renderFrame(latest);
        });

        // Initial render
        renderFrame(frameIndex.get());

        // Handle resize
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
                {/* Main Canvas */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                    <canvas
                        ref={canvasRef}
                        className="block"
                        style={{
                            filter: 'contrast(1.05) saturate(1.1)', // Subtle cinematic pop
                        }}
                    />
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[rgb(248,247,242)]">
                        <div className="text-sm font-mono tracking-widest text-gray-400 uppercase">
                            {t('hero.preloading')}
                        </div>
                    </div>
                )}

                {/* Value Proposition Text - Fades in at the end of the reveal */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollYProgress, [0.75, 0.9], [0, 1]),
                        y: useTransform(scrollYProgress, [0.75, 0.9], [40, 0])
                    }}
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pt-[60vh]"
                >
                    <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-gray-900 mb-6 max-w-5xl leading-[1.1]">
                        <span className="bg-gradient-to-r from-[#4D6614] via-[#3A4D0F] to-[#2D3D0C] bg-clip-text text-transparent">
                            {t('hero.title')}
                        </span>
                        <br />
                        {t('hero.subtitle')}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
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
                    <p className="text-[rgb(132,162,50)] text-sm font-medium tracking-widest uppercase mb-2">{t('hero.scrollReveal')}</p>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-[rgb(132,162,50)] to-transparent" />
                </motion.div>
            </div>
        </section>
    );
}
