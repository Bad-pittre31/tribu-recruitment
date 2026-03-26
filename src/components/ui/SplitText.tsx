import { motion } from 'motion/react';
import React from 'react';

interface SplitTextProps {
    text: string;
    delay?: number;
    staggerDelay?: number;
    duration?: number;
    className?: string;
}

export function SplitText({ text, delay = 0, staggerDelay = 0.08, duration = 0.6, className = "" }: SplitTextProps) {
    const words = text.split(' ');

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 40 },
        show: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="show"
            className={className}
            style={{ display: 'inline-block' }}
        >
            {words.map((word, index) => (
                <motion.span key={index} variants={item} style={{ display: 'inline-block', whiteSpace: 'pre' }}>
                    {word}{" "}
                </motion.span>
            ))}
        </motion.span>
    );
}
