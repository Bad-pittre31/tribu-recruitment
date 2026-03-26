import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'motion/react';
import { Check, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const models = [
  {
    title: 'Classic',
    description: 'Traditional placement structure for immediate hiring needs.',
    features: ['Standard recruitment process', 'One-time placement fee', 'Basic guarantee period', 'Standard candidate presentation'],
    highlight: false
  },
  {
    title: 'Pay As They Stay™',
    description: 'Progressive, milestone-based payment aligned with real retention.',
    features: ['Upfront milestone', 'Month 1 milestone', 'Month 3 milestone', 'Retention-based progression', 'AI-powered competency dossier'],
    highlight: true
  },
  {
    title: 'Strategic Partnership',
    description: 'A more embedded, long-term talent collaboration model.',
    features: ['Dedicated talent advisory', 'Volume-based economics', 'Custom integration protocol', 'Full Miixeo AI suite access'],
    highlight: false
  }
];

export function ClientModel() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
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
    <section ref={sectionRef} id="clients" className="relative py-32 bg-[var(--color-tribu-surface)] border-t border-[var(--color-tribu-border)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            <span className="text-[var(--color-tribu-muted)] block">Commercial structure built on</span>
            <span className="text-[var(--color-tribu-text)]">Alignment.</span>
          </h2>
          <p className="text-lg text-[var(--color-tribu-muted)] max-w-2xl mx-auto">
            We don't optimize for placement fees. We optimize for durable hiring success. Our models reflect this commitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {models.map((model, index) => (
            <div
              key={index}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className={`relative rounded-3xl p-8 flex flex-col h-full transition-all duration-500 ${
                model.highlight 
                  ? 'glass-card border-[var(--color-tribu-accent)]/30 shadow-[0_0_40px_rgba(230,242,230,0.05)] md:-translate-y-4' 
                  : 'bg-[var(--color-tribu-bg)] border border-[var(--color-tribu-border)] hover:border-[var(--color-tribu-muted)]'
              }`}
            >
              {model.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--color-tribu-accent)] text-[var(--color-tribu-bg)] text-xs font-bold uppercase tracking-widest py-1.5 px-4 rounded-full flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Signature Model
                </div>
              )}
              
              <div className="mb-8 mt-4">
                <h3 className={`text-2xl font-bold mb-3 tracking-tight ${model.highlight ? 'text-[var(--color-tribu-accent)]' : ''}`}>
                  {model.title}
                </h3>
                <p className="text-sm text-[var(--color-tribu-muted)] leading-relaxed h-12">
                  {model.description}
                </p>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {model.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 shrink-0 mt-0.5 ${model.highlight ? 'text-[var(--color-tribu-accent)]' : 'text-[var(--color-tribu-muted)]'}`} />
                    <span className="text-sm text-[var(--color-tribu-text)]">{feature}</span>
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-full text-sm font-semibold uppercase tracking-wider transition-colors ${
                model.highlight
                  ? 'bg-[var(--color-tribu-text)] text-[var(--color-tribu-bg)] hover:bg-[var(--color-tribu-accent)]'
                  : 'bg-[var(--color-tribu-surface)] text-[var(--color-tribu-text)] border border-[var(--color-tribu-border)] hover:bg-[var(--color-tribu-surface-hover)]'
              }`}>
                Explore Model
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
