// Preserved old Spline hero for future reactivation
import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { MagneticButton } from './ui/MagneticButton';
import { ArrowRight } from 'lucide-react';
import Spline from '@splinetool/react-spline';

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse glow effect for text overlay interaction if desired (minimalistic)
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePosition({ x, y });
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col items-center justify-between overflow-hidden pt-32 pb-20 bg-[var(--color-tribu-bg)]"
    >
      {/* Spline 3D Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <Spline scene="/spline/scene.splinecode" />
      </div>

      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-t from-[var(--color-tribu-bg)] via-transparent to-transparent opacity-80" />

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full flex-1 max-w-7xl mx-auto px-6 flex flex-col items-center justify-between pointer-events-none">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-tribu-border)] bg-[var(--color-tribu-surface)]/30 backdrop-blur-md pointer-events-auto"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--color-tribu-accent)] animate-pulse" />
          <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-tribu-muted)] drop-shadow-sm">Powered by Miixeo</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto mb-8"
        >
          <MagneticButton variant="primary" className="w-full sm:w-auto text-sm font-semibold uppercase tracking-wider backdrop-blur-sm">
            Book a strategic call
          </MagneticButton>
          <MagneticButton variant="ghost" className="w-full sm:w-auto group text-white border-white/20 hover:border-white/40 bg-white/5 backdrop-blur-sm">
            <span className="text-sm font-semibold uppercase tracking-wider">Explore the model</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </MagneticButton>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </motion.div>
    </section>
  );
}
