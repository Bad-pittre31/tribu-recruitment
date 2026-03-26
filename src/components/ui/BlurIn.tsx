import { motion } from 'motion/react';
import React from 'react';

interface BlurInProps {
    children: React.ReactNode;
    delay?: number;
    duration?: number;
    className?: string;
}

export function BlurIn({ children, delay = 0, duration = 0.6, className = "" }: BlurInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
