import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/utils/cn';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function MagneticButton({ children, className, variant = 'primary', ...props }: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = buttonRef.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const baseStyles = "relative inline-flex items-center justify-center overflow-hidden rounded-full font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-tribu-accent)] focus:ring-offset-2 focus:ring-offset-[var(--color-tribu-bg)]";
  
  const variants = {
    primary: "bg-[var(--color-tribu-text)] text-[var(--color-tribu-bg)] hover:bg-[var(--color-tribu-accent)] px-8 py-4 text-sm",
    secondary: "bg-transparent border border-[var(--color-tribu-border)] text-[var(--color-tribu-text)] hover:bg-[var(--color-tribu-surface-hover)] px-8 py-4 text-sm",
    ghost: "bg-transparent text-[var(--color-tribu-text)] hover:text-[var(--color-tribu-accent)] px-4 py-2 text-sm",
  };

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
