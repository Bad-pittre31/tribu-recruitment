import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Eye, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export function Transparency() {
  const sectionRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(elementsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 bg-[var(--color-tribu-bg)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="order-2 lg:order-1 flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-tribu-border)] bg-[var(--color-tribu-surface)]/50 backdrop-blur-md" ref={el => { if (el) elementsRef.current[0] = el; }}>
              <Eye className="w-4 h-4 text-[var(--color-tribu-muted)]" />
              <span className="text-xs font-medium tracking-widest uppercase text-[var(--color-tribu-muted)]">Open Economics</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-8 leading-tight" ref={el => { if (el) elementsRef.current[1] = el; }}>
              <span className="text-[var(--color-tribu-muted)] block">Transparency is not a promise.</span>
              <span className="text-[var(--color-tribu-text)]">It is part of the model.</span>
            </h2>
            
            <p className="text-lg text-[var(--color-tribu-muted)] mb-10 leading-relaxed" ref={el => { if (el) elementsRef.current[2] = el; }}>
              Clients know exactly what TRIBU earns. Talent can access a transparent relationship model. The economics are not based on opacity. Transparency is part of the trust architecture.
            </p>

            <div className="space-y-6" ref={el => { if (el) elementsRef.current[3] = el; }}>
              <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--color-tribu-border)] bg-[var(--color-tribu-surface)]">
                <div>
                  <h4 className="font-semibold text-[var(--color-tribu-text)] mb-1">Client Visibility</h4>
                  <p className="text-sm text-[var(--color-tribu-muted)]">Full breakdown of placement fees and margins.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-tribu-muted)]" />
              </div>
              <div className="flex items-center justify-between p-6 rounded-2xl border border-[var(--color-tribu-border)] bg-[var(--color-tribu-surface)]">
                <div>
                  <h4 className="font-semibold text-[var(--color-tribu-text)] mb-1">Talent Visibility</h4>
                  <p className="text-sm text-[var(--color-tribu-muted)]">Clear view of mission rates and success bonuses.</p>
                </div>
                <ArrowRight className="w-5 h-5 text-[var(--color-tribu-muted)]" />
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative h-[500px] w-full flex items-center justify-center perspective-1000">
            {/* Abstract Transparent Margin Indicator */}
            <motion.div 
              animate={{ rotateY: [0, 10, 0], rotateX: [0, 5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-md aspect-square"
              ref={el => { if (el) elementsRef.current[4] = el; }}
            >
              <div className="absolute inset-0 rounded-full border border-[var(--color-tribu-border)] border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-[var(--color-tribu-border)] animate-[spin_40s_linear_infinite_reverse]" />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="glass-panel w-64 h-64 rounded-full flex flex-col items-center justify-center border-[var(--color-tribu-border)] shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-tribu-accent)] to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-1000" />
                  <span className="text-sm font-mono text-[var(--color-tribu-muted)] tracking-widest uppercase mb-2">Margin</span>
                  <span className="text-5xl font-light tracking-tighter text-[var(--color-tribu-text)]">100%</span>
                  <span className="text-xs text-[var(--color-tribu-accent)] mt-2 font-mono uppercase tracking-widest">Visible</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
